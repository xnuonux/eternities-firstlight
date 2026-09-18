/* Command-earned returning character crosses Earth E1 without changing canonical progression. */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const ROOT=path.resolve(__dirname,'..');
const C=require(path.join(ROOT,'src/core.js'));
require(path.join(ROOT,'src/classes.js'));
require(path.join(ROOT,'src/starter.js'));
require(path.join(ROOT,'src/pursuit.js'));
require(path.join(ROOT,'src/road.js'));
const A=require(path.join(ROOT,'src/adventure.js'));
require(path.join(ROOT,'src/combat.js'));
const E=require(path.join(ROOT,'src/earth.js'));
const fixturePath=path.join(ROOT,'evidence10/pursuit/veteran/07_PRACTICE_PERSISTED.json');
if(!process.argv.includes('--sources-ready'))require('node:child_process').execFileSync(process.execPath,['tests/pursuit_journey.cjs','--veteran'],{cwd:ROOT,stdio:'inherit'});
const fixture=JSON.parse(fs.readFileSync(fixturePath,'utf8'));
function walk(sim,x,z){const r=sim.moveTo(x,z);assert.ok(r.ok,r.error);for(let i=0;i<9000&&sim.playerPath.length;i++){const before={...sim.state.player};sim.tick(.05);if(sim.room===E.ROOM)assert.ok(E.segment(before,sim.state.player),'movement crossed unsupported Earth ground');}assert.ok(Math.hypot(sim.state.player.x-x,sim.state.player.z-z)<.35);}
function run(){
 const sim=new C.Simulation(fixture),ctx={sim,active:'character-7',revision:23};
 walk(sim,0,23);const before=sim.snapshot();
 let p=E.preview(ctx);assert.equal(p.ok,true);assert.equal(E.enter(p.ticket,{...ctx,active:'character-8'},{save:()=>({ok:true}),build:()=>{}}).ok,false);
 p=E.preview(ctx);assert.equal(E.enter(p.ticket,{...ctx,revision:24},{save:()=>({ok:true}),build:()=>{}}).ok,false);
 p=E.preview(ctx);const refused=E.enter(p.ticket,ctx,{save:()=>({ok:false,error:'synthetic write refusal'}),build:()=>{}});assert.equal(refused.ok,false);assert.deepEqual(sim.snapshot(),before);
 p=E.preview(ctx);let builds=0;const entered=E.enter(p.ticket,ctx,{save:s=>{assert.deepEqual(s,before);return{ok:true};},build:()=>builds++});assert.equal(entered.ok,true);assert.equal(builds,1);assert.equal(sim.room,E.ROOM);assert.deepEqual(sim.snapshot(),before);
 for(const [x,z]of [[0,10],[-8,3],[-14,-12],[-12,-23],[-10,-30],[0,-35],[0,-43]])walk(sim,x,z);
 assert.ok(E.near(sim,E.POINTS.find(p=>p.id==='bellweather')),'Bellweather west-road boundary is physically reachable');
 for(const [x,z]of [[0,-35],[12,-26],[14,-12],[7,2],[0,10],[0,24]])walk(sim,x,z);
 for(const key of ['classPath','equipment','owned','arsenal','xp','pursuit','starter','crossing','beacon','road','reward','companion','defeated','drops','ore','coins'])assert.deepEqual(sim.state.adventure[key],before.adventure[key],key+' changed during Earth E1 travel');
 const {elapsed:oldElapsed,...oldSandbox}=before.sandbox,{elapsed:newElapsed,...newSandbox}=sim.snapshot().sandbox;assert.ok(newElapsed>=oldElapsed);assert.deepEqual(newSandbox,oldSandbox,'housing, inventory and claims must not change');
 const companion=A.runtime(sim).companion;if(before.adventure.companion.bonded){assert.equal(companion.room,E.ROOM);assert.ok(E.walkable(companion.x,companion.z));}
 const after=sim.snapshot();assert.equal(E.leave(sim).ok,true);assert.equal(sim.room,null);assert.deepEqual(sim.snapshot(),after);
 walk(sim,0,23);p=E.preview(ctx);const rollback=sim.snapshot();const failed=E.enter(p.ticket,ctx,{save:()=>({ok:true}),build:()=>{throw Error('synthetic scene failure');},restore:()=>{}});assert.equal(failed.ok,false);assert.equal(sim.room,null);assert.equal(sim.earthTrip,undefined);assert.deepEqual(sim.snapshot(),rollback);
 const reopened=new C.Simulation(sim.snapshot());assert.equal(reopened.room,null);assert.deepEqual(reopened.snapshot(),sim.snapshot());
 const report={status:'passed',variant:'command-earned-returning-veteran',source:'evidence10/pursuit/veteran/07_PRACTICE_PERSISTED.json',sourceSha256:crypto.createHash('sha256').update(fs.readFileSync(fixturePath)).digest('hex'),checks:{staleIdentityRefused:true,writeRefusalAtomic:true,entryNoCanonicalMutation:true,orchardRouteWalked:true,ridgeRouteWalked:true,bellweatherBoundaryReachable:true,returnPreserved:true,sceneFailureRollback:true,reopenSourceSide:true},acceleratedTicks:true,personalSaves:false};
 const out=path.join(ROOT,'evidence10/earth/journey');fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'EARTH_E1_JOURNEY_REPORT.json'),JSON.stringify(report,null,2)+'\n');return report;
}
if(require.main===module)console.log(JSON.stringify(run(),null,2));
module.exports={run};
