/* Independent local character worlds. One bounded write commits state and selection together. */
(function(G){'use strict';
const C=G.RealmCore||(typeof require==='function'?require('./core.js'):null);
const X=G.RealmCreative||(typeof require==='function'?require('./creative.js'):null);
const VERSION=1,KEY='eternities.realm10.characters.v1',MAX_SLOTS=3,MAX_CHARS=1500000;
const clone=o=>JSON.parse(JSON.stringify(o));
const object=o=>o&&typeof o==='object'&&!Array.isArray(o);
const sequence=n=>Number.isSafeInteger(n)&&n>=1&&n<1e9;
const fail=error=>({ok:false,error:String(error)});

function validate(raw){
 const bad=why=>{throw Error('Invalid character library: '+why);};
 if(!object(raw)||raw.version!==VERSION)bad('version');
 if(!sequence(raw.revision)||!sequence(raw.nextId)||raw.nextId<2)bad('sequence');
 if(!Array.isArray(raw.slots)||!raw.slots.length||raw.slots.length>MAX_SLOTS)bad('character count');
 const ids=new Set(),slots=raw.slots.map(slot=>{
  if(!object(slot)||typeof slot.id!=='string'||!/^character-[1-9][0-9]{0,8}$/.test(slot.id))bad('character identity');
  const n=Number(slot.id.slice(10));if(n>=raw.nextId||ids.has(slot.id))bad('duplicate or reused identity');ids.add(slot.id);
  return{id:slot.id,world:C.validate(slot.world)};
 });
 if(!ids.has(raw.active))bad('selected character');
 return{version:VERSION,revision:raw.revision,nextId:raw.nextId,active:raw.active,slots};
}

class Store{
 constructor(storage){this.storage=storage;this.record=null;this.source=undefined;this.legacySource=undefined;this.writer=false;this.blocked=false;this.error=null;}
 get managed(){return !!this.record;}
 get revision(){return this.record?.revision||0;}
 get active(){return this.record?.active||'legacy';}
 load(){
  try{
   this.source=this.storage.getItem(KEY);
   if(this.source!==null){
    if(typeof this.source!=='string'||this.source.length>MAX_CHARS)throw Error('Character library exceeds its storage limit.');
    this.record=validate(JSON.parse(this.source));
    return{state:clone(this.record.slots.find(s=>s.id===this.active).world),status:'loaded',characters:true};
   }
   this.legacySource=this.storage.getItem(C.KEY);
   const loaded=C.load(this.storage);this.blocked=!!loaded.preserveExisting;this.error=loaded.error||null;return loaded;
  }catch(e){this.blocked=true;this.error=e.message;return{state:C.fresh(),status:'unavailable-or-corrupt',preserveExisting:true,error:e.message};}
 }
 describe(current){
  const slots=this.record?this.record.slots.map(s=>({id:s.id,active:s.id===this.active,world:clone(s.id===this.active?current:s.world)})):[{id:'legacy',active:true,world:clone(current)}];
  return{mode:this.blocked?'blocked':this.managed?'managed':'legacy',revision:this.revision,active:this.active,limit:MAX_SLOTS,slots,writable:!this.blocked&&this.writer,error:this.error};
 }
 checkSource(){
  if(this.blocked)return fail(this.error||'Existing character data could not be read. Export your current world and reload.');
  try{
   if(this.storage.getItem(KEY)!==this.source){this.blocked=true;this.error='Another tab changed the character library. Export any unsaved play, then reload the saved characters.';return fail(this.error);}
   if(!this.managed&&this.storage.getItem(C.KEY)!==this.legacySource){this.blocked=true;this.error='Another tab changed the original world. Export any unsaved play, then reload before creating a character library.';return fail(this.error);}
   return{ok:true};
  }catch(e){return fail('Character storage could not be read: '+e.message);}
 }
 write(candidate){
  if(!this.writer)return fail('The character library is open in another tab, or this browser cannot lock it. Export your current world and reload in the editing tab.');
  const check=this.checkSource();if(!check.ok)return check;
  try{
   const record=validate(candidate),text=JSON.stringify(record);
   if(text.length>MAX_CHARS)return fail('The character library is full. Export and remove an inactive character before adding more data.');
   this.storage.setItem(KEY,text);
   this.record=record;this.source=text;this.error=null;
   return{ok:true};
  }catch(e){return fail('Character save refused: '+e.message);}
 }
 save(current){
  const check=this.checkSource();if(!check.ok)return check;
  try{
   const state=C.validate(current);
   if(!this.managed){const text=JSON.stringify(state);this.storage.setItem(C.KEY,text);this.legacySource=text;return{ok:true};}
   if(!this.writer)return fail('This tab cannot write the character library. Export unsaved play or reload in the editing tab.');
   const previous=this.record.slots.find(s=>s.id===this.active).world;
   if(JSON.stringify(previous)===JSON.stringify(state))return{ok:true};
   const next=clone(this.record);next.slots.find(s=>s.id===this.active).world=state;next.revision++;
   return this.write(next);
  }catch(e){return fail('World save refused: '+e.message);}
 }
 replaceLegacy(current){
  // This path remains available only through the existing explicit single-world reset/import UI.
  try{
   if(this.managed||this.source!==null||this.storage.getItem(KEY)!==null)return fail('Use the character library to import another character.');
   if(this.storage.getItem(C.KEY)!==this.legacySource)return fail('The original world changed in another tab. Export unsaved play and reload first.');
   const state=C.validate(current),text=JSON.stringify(state);this.storage.setItem(C.KEY,text);this.legacySource=text;this.blocked=false;this.error=null;return{ok:true,state};
  }catch(e){return fail('World replacement refused: '+e.message);}
 }
 command(type,payload,current,expectedRevision){
  const check=this.checkSource();if(!check.ok)return check;
  if(!this.writer)return fail('This browser tab does not own the character library. Close the other editing tab, then reload.');
  if(expectedRevision!==this.revision)return fail('The character list changed. Reopen it and inspect the current selection.');
  try{
   const outgoing=C.validate(current);
   const next=this.record?clone(this.record):{version:VERSION,revision:0,nextId:2,active:'character-1',slots:[{id:'character-1',world:outgoing}]};
   next.slots.find(s=>s.id===next.active).world=outgoing;
   if(type==='create'||type==='import'){
    if(next.slots.length>=MAX_SLOTS)return fail('All three character places are occupied. Export and remove an inactive character first.');
    if(next.nextId>=1e9-1)return fail('No further character identities are available in this library.');
    let world;
    if(type==='create'){world=C.fresh();world.visitor=X.validateVisitor(payload.visitor);}
    else world=C.validate(payload.world);
    const id='character-'+next.nextId++;next.slots.push({id,world});next.active=id;
   }else if(type==='switch'){
    if(!this.managed||payload.id===next.active||!next.slots.some(s=>s.id===payload.id))return fail('Choose a different saved character.');
    next.active=payload.id;
   }else if(type==='delete'){
    const slot=next.slots.find(s=>s.id===payload.id);
    if(!this.managed||!slot||slot.id===next.active||next.slots.length<=1)return fail('Only an inactive character can be removed. Play another character first.');
    if(payload.confirmName!==slot.world.visitor.name)return fail('Type the exact name of the character being removed.');
    next.slots=next.slots.filter(s=>s.id!==slot.id);
   }else return fail('Unknown character action.');
   next.revision++;
   const result=this.write(next);if(!result.ok)return result;
   return{ok:true,active:this.active,state:clone(this.record.slots.find(s=>s.id===this.active).world)};
  }catch(e){return fail('Character action refused: '+e.message);}
 }
 export(id,current){
  const world=id===this.active?current:this.record?.slots.find(s=>s.id===id)?.world;
  if(!world)throw Error('That character is no longer in this library.');
  return JSON.stringify(C.validate(world),null,2);
 }
}

class WriterLock{
 constructor(manager=G.navigator?.locks){this.manager=manager;this.owned=false;this.pending=null;this.releaseHeld=null;this.error=null;}
 acquire(){
  if(this.owned)return Promise.resolve(true);
  if(this.pending)return this.pending;
  if(!this.manager?.request){this.error='This browser cannot safely coordinate character saves. Use Firstlight on a local HTTP origin in a browser with Web Locks.';return Promise.resolve(false);}
  this.pending=new Promise(resolve=>{
   try{
    this.manager.request(KEY+':editor',{mode:'exclusive',ifAvailable:true},lock=>{
     if(!lock){this.error='Another Firstlight tab is editing this character library. Close that tab and reload here.';resolve(false);return;}
     this.owned=true;this.error=null;resolve(true);
     return new Promise(done=>{this.releaseHeld=done;});
    }).catch(e=>{this.owned=false;this.error=e.message;resolve(false);});
   }catch(e){this.error=e.message;resolve(false);}
  }).finally(()=>{this.pending=null;});
  return this.pending;
 }
 release(){this.owned=false;if(this.releaseHeld)this.releaseHeld();this.releaseHeld=null;}
}

const api={VERSION,KEY,MAX_SLOTS,MAX_CHARS,validate,Store,WriterLock};
G.RealmCharacters=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
