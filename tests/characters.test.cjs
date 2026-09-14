const test=require('node:test'),assert=require('node:assert/strict');
const C=require('../src/core.js'),R=require('../src/characters.js');
function memory(){const data=new Map();return{data,getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v)};}
function setup(world=C.fresh()){const m=memory();m.setItem(C.KEY,JSON.stringify(world));const store=new R.Store(m);const loaded=store.load();store.writer=true;return{m,store,world:loaded.state};}
const visitor=name=>({name,skin:2,cloak:3,hair:1});
function add(s,w,name='New walker'){return s.command('create',{visitor:visitor(name)},w,s.revision);}

test('legacy load leaves every stored byte untouched until explicit character creation',()=>{
 const w=C.fresh();w.adventure.xp=9999;w.notes=[{text:'Keep this original notebook',day:1}];w.visitor.name='Returning';const {m,store,world}=setup(w),before=JSON.stringify([...m.data]);
 assert.equal(store.managed,false);assert.equal(store.describe(world).slots[0].id,'legacy');assert.equal(JSON.stringify([...m.data]),before);
 const r=add(store,world);assert.equal(r.ok,true,r.error);assert.equal(store.managed,true);assert.equal(store.active,'character-2');assert.equal(m.getItem(C.KEY),JSON.stringify(w));assert.equal(r.state.visitor.name,'New walker');assert.equal(r.state.adventure.started,false);assert.equal(r.state.adventure.xp,0);assert.deepEqual(r.state.notes,[]);
 const original=store.describe(r.state).slots.find(s=>s.id==='character-1');assert.deepEqual(original.world,world);
});

test('switching saves outgoing state and restores complete independent characters',()=>{
 const {m,store,world}=setup();let r=add(store,world,'River');assert.equal(r.ok,true);let current=r.state;current.notes.push({text:'River only',day:1});current.settings.cameraMode='tactical';current.retreat.wall='rose';
 r=store.command('switch',{id:'character-1'},current,store.revision);assert.equal(r.ok,true,r.error);assert.deepEqual(r.state.notes,[]);assert.notEqual(r.state.retreat.wall,'rose');assert.equal(r.state.settings.cameraMode,'adventure');
 r=store.command('switch',{id:'character-2'},r.state,store.revision);assert.equal(r.ok,true);assert.equal(r.state.notes[0].text,'River only');assert.equal(r.state.settings.cameraMode,'tactical');assert.equal(r.state.retreat.wall,'rose');
 const cold=new R.Store(m),loaded=cold.load();assert.equal(cold.active,'character-2');assert.deepEqual(loaded.state,r.state);
});

test('quota failures never switch identity, spend state, or create partial slots',()=>{
 const {m,store,world}=setup();let r=add(store,world);const current=r.state,stored=m.getItem(R.KEY),active=store.active,revision=store.revision;
 m.setItem=()=>{throw Error('quota');};r=store.command('switch',{id:'character-1'},current,revision);assert.equal(r.ok,false);assert.match(r.error,/quota/i);assert.equal(store.active,active);assert.equal(store.revision,revision);assert.equal(m.getItem(R.KEY),stored);
 r=add(store,current,'Refused');assert.equal(r.ok,false);assert.equal(m.getItem(R.KEY),stored);assert.equal(store.describe(current).slots.length,2);
});

test('imports copy a validated character into a new slot and full capacity is atomic',()=>{
 const {m,store,world}=setup();let r=add(store,world);const imported=C.fresh();imported.visitor.name='Imported';imported.notes=[{text:'Imported only',day:1}];r=store.command('import',{world:imported},r.state,store.revision);assert.equal(r.ok,true,r.error);assert.equal(store.active,'character-3');assert.deepEqual(r.state,imported);
 const bytes=m.getItem(R.KEY),rev=store.revision;const refused=add(store,r.state,'Fourth');assert.equal(refused.ok,false);assert.equal(m.getItem(R.KEY),bytes);assert.equal(store.revision,rev);
 assert.deepEqual(JSON.parse(store.export('character-3',r.state)),imported);
});

test('deletion requires the exact inactive target name and never reuses its identity',()=>{
 const {m,store,world}=setup();let r=add(store,world,'River');const current=r.state,bytes=m.getItem(R.KEY);
 for(const p of [{id:'character-2',confirmName:'River'},{id:'character-1',confirmName:'wrong'},{id:'missing',confirmName:'Visitor'}])assert.equal(store.command('delete',p,current,store.revision).ok,false);
 assert.equal(m.getItem(R.KEY),bytes);r=store.command('delete',{id:'character-1',confirmName:'Visitor'},current,store.revision);assert.equal(r.ok,true,r.error);assert.equal(store.describe(current).slots.length,1);assert.equal(store.active,'character-2');
 r=add(store,current,'Third identity');assert.equal(r.ok,true);assert.equal(store.active,'character-3');assert.ok(m.getItem(C.KEY));
});

test('stale UI revisions and external storage changes refuse mutations',()=>{
 const {m,store,world}=setup();const revision=store.revision;let r=add(store,world),current=r.state;const bytes=m.getItem(R.KEY);
 assert.equal(store.command('switch',{id:'character-1'},current,revision).ok,false);assert.equal(m.getItem(R.KEY),bytes);
 const other=JSON.parse(bytes);other.revision++;m.setItem(R.KEY,JSON.stringify(other));assert.equal(store.save(current).ok,false);assert.equal(store.command('switch',{id:'character-1'},current,store.revision).ok,false);assert.equal(m.getItem(R.KEY),JSON.stringify(other));
});

test('a present corrupt library cannot silently restore or overwrite an old world',()=>{
 const m=memory();m.setItem(C.KEY,JSON.stringify(C.fresh()));m.setItem(R.KEY,'{unreadable');const store=new R.Store(m),r=store.load();assert.equal(r.preserveExisting,true);assert.equal(store.describe(r.state).mode,'blocked');store.writer=true;
 assert.equal(store.save(r.state).ok,false);assert.equal(add(store,r.state).ok,false);assert.equal(m.getItem(R.KEY),'{unreadable');
});

test('managed writes require ownership of the browser editing lock',()=>{
 const {m,store,world}=setup();const r=add(store,world);store.writer=false;const bytes=m.getItem(R.KEY);assert.equal(store.save(r.state).ok,false);assert.equal(store.command('switch',{id:'character-1'},r.state,store.revision).ok,false);assert.equal(m.getItem(R.KEY),bytes);
});

test('a legacy tab detects another writer before save, migration, or explicit replacement',()=>{
 const {m,store,world}=setup();const newer=C.fresh();newer.visitor.name='Newer external save';m.setItem(C.KEY,JSON.stringify(newer));const bytes=m.getItem(C.KEY);
 assert.equal(add(store,world).ok,false);assert.equal(store.save(world).ok,false);assert.equal(store.replaceLegacy(world).ok,false);assert.equal(m.getItem(C.KEY),bytes);assert.equal(m.getItem(R.KEY),null);
});

test('invalid imported state and invalid library identities reject before any write',()=>{
 const {m,store,world}=setup();const r=add(store,world),before=m.getItem(R.KEY);const bad=C.fresh();bad.adventure.xp=-1;
 assert.equal(store.command('import',{world:bad},r.state,store.revision).ok,false);assert.equal(m.getItem(R.KEY),before);
 for(const mutate of [x=>x.version=2,x=>x.active='missing',x=>x.nextId=2,x=>x.slots[0].id=x.slots[1].id,x=>x.slots[0].world.adventure.xp=-1]){const raw=JSON.parse(before);mutate(raw);assert.throws(()=>R.validate(raw));}
});

test('failed legacy replacement retains the loaded runtime and original bytes',()=>{
 const {m,store,world}=setup();const before=m.getItem(C.KEY);m.setItem=()=>{throw Error('quota fixture');};const candidate=C.fresh();candidate.visitor.name='Refused replacement';
 assert.equal(store.replaceLegacy(candidate).ok,false);assert.equal(m.getItem(C.KEY),before);assert.equal(world.visitor.name,'Visitor');assert.equal(store.managed,false);
});

test('editing lock is held until release and a competing owner must retry explicitly',async()=>{
 let held=false;const manager={request:async(_name,options,callback)=>{assert.equal(options.ifAvailable,true);if(held)return callback(null);held=true;try{return await callback({name:'editor'});}finally{held=false;}}};
 const first=new R.WriterLock(manager),second=new R.WriterLock(manager);
 assert.equal(await first.acquire(),true);assert.equal(await second.acquire(),false);assert.equal(first.owned,true);first.release();await new Promise(resolve=>setImmediate(resolve));assert.equal(await second.acquire(),true);second.release();
 const unavailable=new R.WriterLock(null);assert.equal(await unavailable.acquire(),false);assert.match(unavailable.error,/Web Locks/);
});
