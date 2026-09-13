/* command-earned fresh starter outings. accelerated ticks are automation evidence. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const C=require('../src/core.js'),A=require('../src/adventure.js'),Q=require('../src/starter.js'),AR=require('../src/arsenal.js'),S=require('../src/sandbox.js');
const ROOT=path.join(__dirname,'../evidence10/starter');fs.mkdirSync(ROOT,{recursive:true});
function run({bow=false}={}){
 let sim=new C.Simulation(),n=0,actions=[];const out=path.join(ROOT,bow?'fresh-bow':'fresh-blade');fs.mkdirSync(out,{recursive:true});
 const cmd=(t,p={})=>{let r=sim.adventureCommand('starter-journey-'+(++n),t,p);assert.ok(r.ok,t+': '+r.error);actions.push({type:t,p});return r;};
 const tick=t=>{for(let i=0;i<Math.ceil(t/.05);i++)sim.tick(.05);};
 const walk=(x,z)=>{let r=sim.moveTo(x,z);assert.ok(r.ok,'walk '+x+','+z+': '+r.error);for(let i=0;i<7000&&sim.playerPath.length;i++)tick(.05);assert.ok(Math.hypot(sim.state.player.x-x,sim.state.player.z-z)<.25,'arrived '+x+','+z);actions.push({walk:[x,z]});};
 const snap=(name)=>fs.writeFileSync(path.join(out,name+'.json'),JSON.stringify(sim.snapshot(),null,2));
 walk(11,9);cmd('start');snap('01_KIT_EARNED');
 if(bow){
  function gather(id){let q=S.NODES.find(x=>x.id===id);walk(q.x+1.1,q.z);let node=sim.state.sandbox.nodes.find(x=>x.id===id);while(node.hp){if(node.readyAt>sim.state.sandbox.elapsed)tick(node.readyAt-sim.state.sandbox.elapsed+.1);let r=sim.sandboxCommand('starter-gather-'+(++n),'gather',{node:id});assert.ok(r.ok,r.error);tick(1);}}
  gather('timber-1');gather('timber-2');gather('fibre-1');gather('fibre-2');gather('stone-1');gather('stone-2');walk(11,9);cmd('arsenal-craft',{id:'trail_bow'});cmd('equip',{id:'trail_bow'});snap('02_BOW_CRAFTED_EARNED');
 }
 // acceptance save/reload is validated cold, then the outing is re-entered.
 walk(11,9);cmd('starter-accept');sim=new C.Simulation(sim.snapshot());snap('03_ACCEPTED_RELOADED');walk(15,7);cmd('starter-enter');
 const fight=(id)=>{let e=A.runtime(sim).enemies.find(x=>x.id===id);cmd('target-select',{id});cmd('auto-toggle');for(let i=0;i<5000&&e.hp>0;i++){if(sim.state.adventure.hp<45&&sim.state.adventure.tonics)cmd('heal');if(!sim.playerPath.length&&Math.hypot(sim.state.player.x-e.x,sim.state.player.z-e.z)>(bow?8:2.1))sim.moveTo(e.x+(bow?3:0),e.z+(bow?3:0));if(sim.state.adventure.elapsed>=A.runtime(sim).cooldowns.attack&&Math.hypot(sim.state.player.x-e.x,sim.state.player.z-e.z)<=(bow?10:2.65)&&(!bow||Math.hypot(sim.state.player.x-e.x,sim.state.player.z-e.z)>=3.5)&&A.visible(sim,sim.state.player,e))cmd('attack',{target:id});if(!bow&&sim.state.adventure.elapsed>=A.runtime(sim).cooldowns.pulse&&Math.hypot(sim.state.player.x-e.x,sim.state.player.z-e.z)<=3.6&&A.visible(sim,sim.state.player,e))cmd('pulse',{target:id});tick(.1);}assert.ok(sim.state.adventure.defeated.includes(id),'defeated '+id);cmd('target-clear');walk(e.home.x,e.home.z);cmd('loot',{id});};
 for(const b of Q.BUNDLES){walk(b.x,b.z);cmd('starter-pickup',{id:b.id});}
 snap('04_BUNDLES_EARNED');sim=new C.Simulation(sim.snapshot());walk(0,12); // re-entry point is retained by explicit leave
 // if reconstructed outside, enter again and finish named encounter
 if(!sim.room){walk(15,7);cmd('starter-enter');}
 fight('river-skitter-west');fight('river-skitter-east');fight('river-old-bristle');snap('05_OBJECTIVES_EARNED');
 walk(0,12);cmd('starter-leave');walk(11,9);cmd('starter-claim',bow?{choice:'oren_reedbow'}:{choice:'oren_sunblade'});cmd('equip',{id:bow?'oren_reedbow':'oren_sunblade'});snap('06_REWARD_EQUIPPED_EARNED');
 walk(15,7);cmd('starter-enter');if(bow)walk(-5,6);else walk(-5,10);cmd('target-select',{id:'river-practice'});for(let i=0;i<30;i++){if(sim.state.adventure.elapsed>=A.runtime(sim).cooldowns.attack)cmd('attack',{target:'river-practice'});tick(.2);}assert.equal(A.runtime(sim).training.style,bow?'bow':'blade');snap('07_PRACTICE_TESTED_EARNED');
 const final=sim.snapshot();assert.deepEqual(new C.Simulation(final).snapshot(),final);let report={status:'passed',variant:bow?'fresh-bow':'fresh-blade',commands:n,positionEdits:0,inventoryGrants:0,plantedDefeats:0,acceleratedTick:true,defeated:final.adventure.defeated.filter(id=>id.startsWith('river-')),bundles:final.adventure.starter.bundles,reward:final.adventure.starter.reward,stats:A.stats(final.adventure),actions};fs.writeFileSync(path.join(out,'STARTER_JOURNEY_REPORT.json'),JSON.stringify(report,null,2));return report;
}
if(require.main===module){let r=run({bow:process.argv.includes('--bow')});console.log(JSON.stringify({...r,actions:undefined},null,2));}
module.exports={run};
