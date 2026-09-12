/* Earn new equipment and the practice medal through accepted gameplay commands.
 * Starts with the freshly earned Chapter I output. No position/inventory grants.
 * Automated decisions and accelerated 50ms steps are not human balance evidence. */
'use strict';const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),C=require('../src/core.js'),S=require('../src/sandbox.js'),A=require('../src/adventure.js'),AR=require('../src/arsenal.js');
function journey(){
 require('./chapter_journey.cjs').journey();const out=path.join(__dirname,'../evidence08');fs.mkdirSync(out,{recursive:true});
 const start=JSON.parse(fs.readFileSync(path.join(__dirname,'../evidence07/chapter1/CHAPTER_COMPLETED.json'))),sim=new C.Simulation(start);let seq=0,commands=0;const events=[];
 const adv=(t,p={})=>{const r=sim.adventureCommand('bow-journey-'+(++seq),t,p);assert.ok(r.ok,t+': '+r.error);commands++;return r;};
 const sb=(t,p={})=>{const r=sim.sandboxCommand('bow-journey-'+(++seq),t,p);assert.ok(r.ok,t+': '+r.error);commands++;return r;};
 const step=t=>{for(let i=0;i<Math.round(t*20);i++)sim.tick(.05);};
 const walk=(x,z)=>{const r=sim.moveTo(x,z);assert.ok(r.ok,'path '+x+','+z+': '+r.error);for(let i=0;sim.playerPath.length&&i<6000;i++)step(.05);assert.ok(Math.hypot(sim.state.player.x-x,sim.state.player.z-z)<.15,'destination');};
 function harvest(id){const node=S.NODES.find(n=>n.id===id);let q;for(let i=0;i<16;i++){let p={x:node.x+Math.sin(i*Math.PI/8)*1.55,z:node.z+Math.cos(i*Math.PI/8)*1.55};if(C.pathfind(sim.state.player,p,sim.navRoom)){q=p;break;}}assert.ok(q);walk(q.x,q.z);let n=sim.state.sandbox.nodes.find(n=>n.id===id);if(!n.hp){step(Math.max(0,n.readyAt-sim.state.sandbox.elapsed)+.1);}while(n.hp){sb('gather',{node:id});step(.55);}}
 harvest('timber-3');harvest('timber-4');harvest('stone-1');harvest('fibre-1');harvest('fibre-3');walk(11,9);
 fs.writeFileSync(path.join(out,'ARMORY_MATERIALS_EARNED.json'),JSON.stringify(sim.snapshot(),null,2));
 adv('arsenal-craft',{id:'trail_bow'});adv('equip',{id:'trail_bow'});events.push('Crafted and equipped a bow with harvested materials');
 fs.writeFileSync(path.join(out,'RANGE_READY_EARNED.json'),JSON.stringify(sim.snapshot(),null,2));
 adv('range-enter');walk(0,-3);adv('range-start');const hp=sim.state.adventure.hp,xp=sim.state.adventure.xp,coins=sim.state.adventure.coins;let launches=0;
 for(const target of AR.RANGE.targets){for(let i=0;i<40&&(AR.runtime(sim).range.hits[target.id]||0)<2;i++){if(sim.state.adventure.elapsed>=A.runtime(sim).cooldowns.attack){adv('attack',{target:target.id});launches++;}step(.2);}}
 assert.ok(sim.state.adventure.arsenal.rangeMedal,'Six travelling arrows earn a medal');assert.equal(sim.state.adventure.hp,hp);assert.equal(sim.state.adventure.xp,xp);assert.equal(sim.state.adventure.coins,coins+5);assert.equal(sim.state.adventure.arsenal.gems.amber,1);const firstTime=sim.state.adventure.arsenal.bestTime;
 events.push('Hit all three targets twice with actual travelling arrows; earned first medal');walk(0,9);adv('range-leave');adv('socket',{weapon:'trail_bow',gem:'amber'});events.push('Fitted the earned amber to the equipped bow');
 fs.writeFileSync(path.join(out,'BOW_ROAD_READY_EARNED.json'),JSON.stringify(sim.snapshot(),null,2));
 harvest('crystal-1');walk(0,-48);adv('enter');walk(4,6);for(let i=0;i<3;i++){adv('dig',{gx:3,gz:3});step(.5);}walk(2,4);for(let i=0;i<3;i++){adv('dig',{gx:2,gz:2});step(.5);}walk(0,11);adv('leave');events.push('Returned to the earned mine and excavated two additional copper faces');walk(11,9);sb('craft',{recipe:'plank'});adv('arsenal-craft',{id:'copper_bow'});adv('arsenal-craft',{id:'ruby'});adv('arsenal-craft',{id:'moonstone'});adv('socket',{weapon:'copper_bow',gem:'ruby'});adv('equip',{id:'copper_bow'});events.push('Forged longbow and cut ruby/moonstone from earned copper, currency and harvested crystal');
 const before=sim.state.adventure.hp;adv('socket',{weapon:'copper_bow',gem:'moonstone'});assert.equal(sim.state.adventure.hp,before,'Socket raises capacity without free healing');adv('socket',{weapon:'copper_bow',gem:'ruby'});assert.equal(sim.state.adventure.arsenal.gems.moonstone,1);events.push('Changed sockets with intact returns and no free healing');
 const saved=sim.snapshot();assert.deepEqual(new C.Simulation(saved).snapshot(),saved);for(const k of['score','retreat','notes','visitor','flowers'])assert.deepEqual(saved[k],start[k]);
 fs.writeFileSync(path.join(out,'ARMORY_COMPLETE_EARNED.json'),JSON.stringify(saved,null,2));
 const report={status:'passed',method:'Starts with a freshly earned chapter-I journey, then accepted gathering, navigation, crafting, projectiles and socket commands. 50ms accelerated steps; not human balancing.',positionEdits:0,inventoryGrants:0,directPracticeHits:0,plantedMedals:0,acceptedCommands:commands,arrowLaunches:launches,medalSeconds:firstTime,stats:A.stats(saved.adventure),events,arsenal:saved.adventure.arsenal};fs.writeFileSync(path.join(out,'ARSENAL_JOURNEY_REPORT.json'),JSON.stringify(report,null,2));return report;
}
if(require.main===module)console.log(JSON.stringify(journey(),null,2));module.exports={journey};
