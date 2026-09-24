/* Component qualification. Real gathering and Earth geometry, synthetic story,
 * journal and audio services. Not a substitute for full-game integration tests. */
'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const path=require('node:path');
const root=process.env.GATHERING_SOURCE_ROOT||path.resolve(__dirname,'../src');
const E=require(path.join(__dirname,'../src/earth.js'));
const Q=require(path.join(root,'gathering.js'));
const M=require(path.join(root,'gathering-music.js'));
// This is the exact delivery interaction predicate/coordinate from earth-story.js.
// The rest of that subsystem is deliberately not simulated by these tests.
global.RealmEarthStory={DESTINATION:Object.freeze({x:0,z:-43}),at:(sim,p)=>sim.room===E.ROOM&&E.walkable(sim.state.player.x,sim.state.player.z)&&E.near(sim,p,2.3)&&E.line(sim.state.player,p)};
function sim(){return{room:E.ROOM,paused:false,state:{player:{...Q.TABLE},adventure:{earthStory:{arrived:true,claimed:false,dispatch:'detour'},earthGathering:Q.fresh(),ore:5,coins:8,xp:90,classPath:{id:'hunter'},equipment:{weapon:'old-blade'}},sandbox:{inventory:{wood:7}},music:{notes:[1,3,5]},journal:[]},event(kind,text){this.state.journal.push({kind,text});}};}
function act(s,type,p){return Q.handle(s,'gathering-'+type,p);}
function prepare(s,order=['cloth','lantern','stand']){assert.ok(act(s,'accept').ok);for(const id of order){s.state.player={...Q.TASKS.find(t=>t.id===id)};assert.ok(act(s,'prepare',{id}).ok);}s.state.player={...Q.TABLE};}
const permutations=[['cloth','lantern','stand'],['cloth','stand','lantern'],['lantern','cloth','stand'],['lantern','stand','cloth'],['stand','cloth','lantern'],['stand','lantern','cloth']];
for(const verse of ['mill','quarry','detour'])for(const order of permutations)test(`silent completion: ${verse}; ${order.join('→')}`,()=>{
 const s=sim(),baseline=structuredClone(s.state);prepare(s,order);assert.ok(act(s,'verse',{verse}).ok);assert.ok(act(s,'share').ok);assert.ok(s.state.adventure.earthGathering.shared);
 const result=Q.validate(JSON.parse(JSON.stringify(s.state.adventure.earthGathering)),s.state.adventure);assert.deepEqual(result,s.state.adventure.earthGathering);
 const history=structuredClone(s.state);for(const [t,p] of [['accept',{}],['prepare',{id:'stand'}],['verse',{verse:'mill'}],['share',{}]])assert.equal(act(s,t,p).ok,false);
 assert.deepEqual(s.state,history);for(const k of ['ore','coins','xp','classPath','equipment','earthStory'])assert.deepEqual(s.state.adventure[k],baseline.adventure[k]);
 assert.deepEqual(s.state.music,baseline.music);assert.deepEqual(s.state.sandbox,baseline.sandbox);
 result.prepared.pop();assert.equal(s.state.adventure.earthGathering.prepared.length,3,'validation returns independently owned arrays');
});
test('new table never captures unpaid-delivery interaction on the overlap edge',()=>{const s=sim();s.state.player={x:2.28,z:-42.78};assert.ok(RealmEarthStory.at(s,RealmEarthStory.DESTINATION));assert.ok(Q.at(s,Q.TABLE));assert.equal(Q.point(s),null);});
test('finished preparation relinquishes its contextual interaction',()=>{const s=sim();assert.ok(act(s,'accept').ok);s.state.player={...Q.CART};assert.equal(Q.point(s).id,'cloth');assert.ok(act(s,'prepare',{id:'cloth'}).ok);assert.equal(Q.point(s),null);});
test('arrival is a boolean fact, not arbitrary truthy data',()=>{assert.equal(Q.available({earthStory:{arrived:'false'}}),false);assert.equal(Q.available({earthStory:{arrived:1}}),false);});
test('missing arrival cannot grant invitation',()=>{assert.equal(Q.available({}),false);assert.equal(Q.available(null),false);});
for(const verse of [null,1,['mill'],{},'constructor','__proto__','unknown'])test(`invalid choice refuses without mutation: ${JSON.stringify(verse)}`,()=>{const s=sim();prepare(s);const before=structuredClone(s.state);assert.equal(act(s,'verse',{verse}).ok,false);assert.deepEqual(s.state,before);});
for(const change of [s=>s.room=null,s=>s.state.player={x:100,z:100},s=>s.state.player={x:NaN,z:0}])test('distant or wrong-scene acceptance cannot mutate state',()=>{const s=sim();change(s);const before=structuredClone(s.state);assert.equal(act(s,'accept').ok,false);assert.deepEqual(s.state,before);});
for(const raw of [{version:2,accepted:false,prepared:[],verse:null,shared:false},{version:1,accepted:false,prepared:['cloth'],verse:null,shared:false},{version:1,accepted:true,prepared:['cloth','cloth'],verse:null,shared:false},{version:1,accepted:true,prepared:[],verse:'mill',shared:true},{version:1,accepted:true,prepared:[],verse:null,shared:true}])test('impossible saved gathering is refused',()=>assert.throws(()=>Q.validate(raw,sim().state.adventure)));
function deferred(){let resolve,reject;const promise=new Promise((a,b)=>{resolve=a;reject=b;});return{promise,resolve,reject};}
function audio({suspended=false,disconnectThrows=false,startThrows=false,resumeReject=false}={}){
 const resumes=deferred(),sources=[],gains=[];
 const ctx={state:suspended?'suspended':'running',resume(){if(resumeReject)return Promise.reject(Error('permission refused'));return resumes.promise.then(()=>{ctx.state='running';});},
 createBuffer(c,n,r){return{copyToChannel(){}};},createBufferSource(){const s={onended:null,started:0,stopped:0,disconnected:0,connect(n){return n;},start(){if(startThrows)throw Error('start failed');this.started++;},stop(){this.stopped++;},disconnect(){this.disconnected++;if(disconnectThrows)throw Error('disconnect failed');}};sources.push(s);return s;},
 createGain(){const g={gain:{value:0},connect(){return this;},disconnect(){this.disconnected=true;if(disconnectThrows)throw Error('disconnect failed');}};gains.push(g);return g;}};
 return{ctx,master:{},enabled:true,sources,gains,resumes};
}
test('stop is safe even when an audio node already disconnected',async()=>{const p=new M.Player(),a=audio({disconnectThrows:true});assert.equal(await p.play('mill',a,{}),true);assert.doesNotThrow(()=>p.stop());assert.equal(p.source,null);assert.equal(p.owner,null);});
test('suspended context starts no source until resume succeeds',async()=>{const p=new M.Player(),a=audio({suspended:true});const job=p.play('mill',a,{});assert.equal(a.sources.length,0);a.resumes.resolve();assert.equal(await job,true);assert.equal(a.sources[0].started,1);p.stop();});
test('stopping while resume is pending prevents late music',async()=>{const p=new M.Player(),a=audio({suspended:true});const job=p.play('mill',a,{});p.stop();a.resumes.resolve();assert.equal(await job,false);assert.equal(a.sources.length,0);assert.equal(p.owner,null);});
test('a newer preview cannot be replaced by an older resume completion',async()=>{const p=new M.Player(),a=audio({suspended:true}),b=audio();const first=p.play('mill',a,{});assert.equal(await p.play('quarry',b,{}),true);a.resumes.resolve();assert.equal(await first,false);assert.equal(a.sources.length,0);assert.equal(p.source,b.sources[0]);p.stop();});
test('denied resume resolves false with no source or unhandled rejection',async()=>{const p=new M.Player(),a=audio({suspended:true,resumeReject:true});assert.equal(await p.play('mill',a,{}),false);assert.equal(p.source,null);});
test('failed source startup cleans every newly created node',async()=>{const p=new M.Player(),a=audio({startThrows:true});assert.equal(await p.play('mill',a,{}),false);assert.equal(p.source,null);assert.ok(a.sources.every(s=>s.disconnected));assert.ok(a.gains.every(g=>g.disconnected));});
test('owner eligibility is rechecked after a delayed resume',async()=>{const p=new M.Player(),a=audio({suspended:true});let allowed=true;const job=p.play('mill',a,{},()=>allowed);allowed=false;a.resumes.resolve();assert.equal(await job,false);assert.equal(a.sources.length,0);});
test('an ended callback from an old source cannot stop new audio',async()=>{const p=new M.Player(),a=audio();assert.equal(await p.play('mill',a,{}),true);const ended=a.sources[0].onended;assert.equal(await p.play('detour',a,{}),true);const newer=p.source;ended();assert.equal(p.source,newer);p.stop();});
for(const id of ['mill','quarry','detour'])test('deterministic, finite, stereo music: '+id,()=>{const a=M.render(id,8000),b=M.render(id,8000);assert.equal(a.channels.length,2);assert.equal(a.channels[0].length,26*8000);assert.deepEqual(a.channels,b.channels);assert.ok(a.channels.every(c=>c.every(x=>Number.isFinite(x)&&Math.abs(x)<=1)));assert.ok(a.channels.some(c=>c.some(x=>Math.abs(x)>.001)));assert.ok(a.channels.every(c=>Math.abs(c.at(-1))<.001));assert.notDeepEqual(a.channels[0],a.channels[1]);});
