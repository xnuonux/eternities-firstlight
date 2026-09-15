/* Command-earned Near Expanse save boundary journey. No personal storage or browser state. */
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
const Q=require(path.join(ROOT,'src/cosmos.js'));

const fixturePath=path.join(ROOT,'evidence10/pursuit/veteran/07_PRACTICE_PERSISTED.json');
if(!process.argv.includes('--sources-ready'))require('node:child_process').execFileSync(process.execPath,['tests/pursuit_journey.cjs','--veteran'],{cwd:ROOT,stdio:'inherit'});
const fixture=JSON.parse(fs.readFileSync(fixturePath,'utf8'));
assert.equal(fixture.adventure.equipment.weapon,'dawn_edge');
assert.ok(fixture.adventure.xp>0);
assert.ok(Object.keys(fixture.adventure.pursuit.fittings||{}).length>0,'returning fixture has finite fitting evidence');

function walk(sim,x,z){const r=sim.moveTo(x,z);assert.ok(r.ok,r.error);for(let i=0;i<9000&&sim.playerPath.length;i++){const before={...sim.state.player};sim.tick(.05);if(sim.room===Q.ROOM)assert.ok(Q.segment(before,sim.state.player),'accepted movement must remain on supported ground');}assert.ok(Math.hypot(sim.state.player.x-x,sim.state.player.z-z)<.35);}
function run(){
 const sim=new C.Simulation(fixture);assert.equal(fixture.adventure.companion.bonded,true,'fixture must have the command-rescued companion');
 const ctx={sim,active:'character-7',revision:19};
 walk(sim,14,-5);const before=sim.snapshot();const ticket=Q.preview(ctx);assert.equal(ticket.ok,true);
 // A changed character identity cannot consume the pending travel confirmation.
 assert.equal(Q.enter(ticket.ticket,{sim,active:'character-8',revision:19},{save:()=>({ok:true}),build:()=>{}}).ok,false);
 const stale=Q.preview(ctx);assert.equal(stale.ok,true);
 assert.equal(Q.enter(stale.ticket,{sim,active:'character-7',revision:20},{save:()=>({ok:true}),build:()=>{}}).ok,false);
 const rejected=Q.preview(ctx);assert.equal(rejected.ok,true);
 const beforeRefused=sim.snapshot();const refused=Q.enter(rejected.ticket,ctx,{save:()=>({ok:false,error:'synthetic write refusal'}),build:()=>{}});
 assert.equal(refused.ok,false);assert.equal(sim.room,null);assert.deepEqual(sim.snapshot(),beforeRefused);
 const entered=Q.preview(ctx);assert.equal(entered.ok,true);let builds=0;
 const result=Q.enter(entered.ticket,ctx,{save:s=>{assert.deepEqual(s,beforeRefused);return{ok:true};},build:()=>{builds++;}});
 assert.equal(result.ok,true);assert.equal(sim.room,Q.ROOM);assert.equal(builds,1);assert.deepEqual(sim.state.adventure,before.adventure);
 const cosmic=sim.snapshot();assert.deepEqual(cosmic,before,'transient room serializes to original source checkpoint');
 // Both authored approaches are real production movement routes, not landmark teleports.
 for(const [x,z]of [[-14,-3],[-15,-18],[-12,-32],[0,-34],[3,-43]])walk(sim,x,z);
 assert.ok(Q.near(sim,Q.POINTS.find(p=>p.id==='anik')),'occupied overlook is reachable');
 assert.ok(Q.height(3,-43)>Q.height(0,18)+3,'the player climbed the authored rise');
 for(const [x,z]of [[0,-34],[13,-24],[13,-6],[6,6],[0,18]])walk(sim,x,z);
 for(const key of ['classPath','equipment','owned','arsenal','xp','pursuit','starter','crossing','beacon','road','reward','companion','defeated','drops','ore','coins'])assert.deepEqual(sim.state.adventure[key],before.adventure[key],key+' changed during peaceful travel');
 for(const key of ['notes','scores','score','retreat','furnishings','inventory'])if(key in before)assert.deepEqual(sim.snapshot()[key],before[key],key+' changed during peaceful travel');
 const {elapsed:oldElapsed,...oldSandbox}=before.sandbox,{elapsed:newElapsed,...newSandbox}=sim.snapshot().sandbox;assert.ok(newElapsed>=oldElapsed);assert.deepEqual(newSandbox,oldSandbox,'housing, inventory and claims must not change');
 const companion=A.runtime(sim).companion;
 if(before.adventure.companion.bonded){assert.equal(companion.room,Q.ROOM,'following companion stays in the active scene');assert.equal(Q.walkable(companion.x,companion.z),true);}
 // Follow and stay are durable companion choices, while their runtime room is transient.
 if(before.adventure.companion.bonded){
  const follow=sim.adventureCommand('cosmos-follow','companion-mode',{mode:'follow'});assert.ok(follow.ok,follow.error);
  assert.equal(sim.state.adventure.companion.mode,'follow');
  const stay=sim.adventureCommand('cosmos-stay','companion-mode',{mode:'stay'});assert.ok(stay.ok,stay.error);
  assert.equal(sim.state.adventure.companion.mode,'stay');
 }
 const expectedAfterTravel=sim.snapshot();assert.equal(Q.leave(sim).ok,true);assert.equal(sim.room,null);assert.deepEqual(sim.snapshot(),expectedAfterTravel);
 if(before.adventure.companion.bonded){assert.notEqual(A.runtime(sim).companion.room,sim.room,'stayed companion is not rendered as following in the source scene');assert.deepEqual(sim.state.adventure.companion.mode,'stay');}
 // A failed scene build rolls back room, player and transient trip marker.
 walk(sim,14,-5);const bad=Q.preview(ctx);assert.equal(bad.ok,true);const rollback=sim.snapshot();
 const failed=Q.enter(bad.ticket,ctx,{save:()=>({ok:true}),build:()=>{throw Error('synthetic scene failure');},restore:()=>{}});
 assert.equal(failed.ok,false);assert.equal(sim.room,null);assert.deepEqual(sim.snapshot(),rollback);assert.equal(sim.cosmosTrip,undefined);
 // Cold reload from the saved canonical snapshot remains at the source side.
 const reopened=new C.Simulation(sim.snapshot());assert.equal(reopened.room,null);assert.deepEqual(reopened.snapshot(),sim.snapshot());
 const report={status:'passed',variant:'command-earned-returning-veteran',source:'evidence10/pursuit/veteran/07_PRACTICE_PERSISTED.json',sourceSha256:crypto.createHash('sha256').update(fs.readFileSync(fixturePath)).digest('hex'),checks:{staleCharacterRefused:true,staleRevisionRefused:true,writeRefusalAtomic:true,entryNoCanonicalMutation:true,bothApproachesWalked:true,lookoutReachable:true,followStayPreserved:true,returnPreserved:true,sceneFailureRollback:true,reopenSourceSide:true},acceleratedTicks:true,personalSaves:false};
 const out=path.join(ROOT,'evidence10/cosmos/journey');fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'COSMOS_JOURNEY_REPORT.json'),JSON.stringify(report,null,2)+'\n');
 return report;
}
if(require.main===module)console.log(JSON.stringify(run(),null,2));
module.exports={run};
