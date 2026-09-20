/* Actual commands/pathfinding from fresh worlds or a newly earned campaign source. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const C=require('../src/core.js'),E=require('../src/earth.js'),S=require('../src/earth-story.js'),B=require('../src/sandbox.js');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'evidence10/earth-story/journey');
function run({bow=false,veteran=false}={}){
 const variant=veteran?'veteran-mill':bow?'fresh-bow-quarry':'fresh-blade-detour',route=veteran?'mill':bow?'quarry':'detour',out=path.join(OUT,variant);fs.mkdirSync(out,{recursive:true});
 const file=path.join(ROOT,'evidence10/pursuit/veteran/07_PRACTICE_PERSISTED.json');
 if(veteran&&!process.argv.includes('--sources-ready'))require('node:child_process').execFileSync(process.execPath,['tests/pursuit_journey.cjs','--veteran'],{cwd:ROOT,stdio:'pipe'});
 let sim=new C.Simulation(veteran?JSON.parse(fs.readFileSync(file,'utf8')):undefined),serial=0,actions=[];
 const command=(type,p={})=>{const r=sim.adventureCommand('earned-rain-'+variant+'-'+(++serial),type,p);assert.ok(r.ok,type+': '+r.error);actions.push({type,p});};
 const walk=(x,z)=>{const r=sim.moveTo(x,z);assert.ok(r.ok,r.error);for(let i=0;i<9000&&sim.playerPath.length;i++)sim.tick(.05);assert.ok(Math.hypot(sim.state.player.x-x,sim.state.player.z-z)<.3);actions.push({walk:[x,z]});};
 const snap=name=>fs.writeFileSync(path.join(out,name+'.json'),JSON.stringify(sim.snapshot(),null,2)+'\n');
 function gather(id){const n=B.NODES.find(n=>n.id===id);walk(n.x+1.1,n.z);let node=sim.state.sandbox.nodes.find(n=>n.id===id);while(node.hp){const r=sim.sandboxCommand('rain-gather-'+(++serial),'gather',{node:id});assert.ok(r.ok,r.error);for(let i=0;i<21;i++)sim.tick(.05);}actions.push({gather:id});}
 walk(11,9);if(!veteran)command('start');
 if(bow){for(const id of ['timber-1','timber-2','fibre-1','fibre-2','stone-1'])gather(id);walk(11,9);command('arsenal-craft',{id:'trail_bow'});command('equip',{id:'trail_bow'});}
 if(veteran&&sim.state.sandbox.inventory.wood<2)gather('timber-1');
 walk(0,23);snap('01_SOURCE');const before=sim.snapshot();
 function enter(){walk(0,23);const ctx={sim,active:'character-1',revision:1},p=E.preview(ctx);assert.ok(p.ok,p.error);assert.ok(E.enter(p.ticket,ctx,{save:()=>({ok:true}),build:()=>{}}).ok);walk(0,10);}
 function reload(){const saved=sim.snapshot();sim=new C.Simulation(saved);assert.deepEqual(sim.snapshot(),saved);assert.equal(sim.room,null);actions.push({reload:true});enter();}
 enter();walk(S.GIVER.x,S.GIVER.z);command('earth-story-accept');snap('02_ACCEPTED');reload();
 for(const [i,id]of S.ROUTES.find(r=>r.id===route).steps.entries()){const p=S.STEPS.find(s=>s.id===id);walk(p.x,p.z);command('earth-story-step',{id});snap('03_STEP_'+(i+1));reload();}
 walk(S.GIVER.x,S.GIVER.z);command('earth-story-dispatch',{route});snap('04_DISPATCHED');reload();walk(S.DESTINATION.x,S.DESTINATION.z);command('earth-story-arrive');snap('05_ARRIVED_UNPAID');reload();walk(S.DESTINATION.x,S.DESTINATION.z);command('earth-story-claim');snap('06_PAID');reload();
 const after=sim.snapshot();assert.equal(after.adventure.ore-before.adventure.ore,3);assert.equal(after.adventure.coins-before.adventure.coins,4);assert.equal(after.sandbox.inventory.fiber-before.sandbox.inventory.fiber,2);assert.equal(after.sandbox.inventory.wood-before.sandbox.inventory.wood,veteran?-2:0);
 for(const k of ['xp','equipment','owned','arsenal','starter','pursuit','classPath','road','beacon','crossing','companion','defeated','drops','reward'])assert.deepEqual(after.adventure[k],before.adventure[k],k);
 for(const k of ['notes','score','retreat','visitor','flowers'])assert.deepEqual(after[k],before[k],k);
 walk(S.DESTINATION.x,S.DESTINATION.z);const paid=sim.snapshot();assert.equal(sim.adventureCommand('retry-rain','earth-story-claim').ok,false);assert.deepEqual(sim.snapshot(),paid);
 const report={variant,route,status:'passed',commands:serial,positionEdits:0,inventoryGrants:0,plantedObjectives:0,acceleratedTicks:true,sourceSha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(out,'01_SOURCE.json'))).digest('hex'),story:after.adventure.earthStory,weapon:after.adventure.equipment.weapon,xp:after.adventure.xp,delta:{ore:3,coins:4,fiber:2,wood:veteran?-2:0},actions};fs.writeFileSync(path.join(out,'REPORT.json'),JSON.stringify(report,null,2)+'\n');return report;
}
if(require.main===module)console.log(JSON.stringify(run({bow:process.argv.includes('--bow'),veteran:process.argv.includes('--veteran')}),null,2));
module.exports={run};
