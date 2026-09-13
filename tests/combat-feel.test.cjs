'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const C=require('../src/core.js'),A=require('../src/adventure.js'),AR=require('../src/arsenal.js'),T=require('../src/combat.js');
let seq=0;const act=(s,t,p={})=>s.adventureCommand('feel-'+(++seq),t,p);
function setup(bow=false){const s=new C.Simulation();s.state.player={x:11,z:9,yaw:0};act(s,'start');if(bow){s.state.adventure.owned.push('trail_bow');act(s,'equip',{id:'trail_bow'});}s.state.player={x:15,z:7,yaw:0};act(s,'starter-enter');s.state.player={x:-5,z:11.5,yaw:0};act(s,'target-select',{id:'river-practice'});act(s,'auto-toggle');return s;}
const tick=(s,n)=>{for(let i=0;i<n;i++)s.tick(.01);};
for(const bow of [false,true])test((bow?'bow':'blade')+' anticipates then repeatedly hits at its actual cadence, without walking',()=>{
 const s=setup(bow),p={...s.state.player},r=A.runtime(s);tick(s,1);assert.equal(T.pose(s).phase,'anticipate');assert.equal(T.runtime(s).hits.length,0);assert.equal(s.state.player.yaw,Math.PI);tick(s,9);assert.equal(T.runtime(s).hits.length,0);
 const times=[];let last=0;for(let i=0;i<210;i++){tick(s,1);const h=T.runtime(s).hits.at(-1);if(h&&h.id!==last){times.push(h.at);last=h.id;}}
 assert.ok(times.length>=3,JSON.stringify(times));for(let i=1;i<times.length;i++)assert.ok(Math.abs(times[i]-times[i-1]-AR.weapon(s.state.adventure).cooldown)<.025,JSON.stringify(times));assert.equal(s.state.player.x,p.x);assert.equal(s.state.player.z,p.z);assert.equal(r.enemies[0].hp,100);
});
for(const cancel of ['stop','range','target','pause','death'])test('pending attack cancels on '+cancel,()=>{
 const s=setup();tick(s,2);assert.equal(T.pose(s).phase,'anticipate');if(cancel==='stop')T.stop(s);if(cancel==='range')s.state.player.x=7;if(cancel==='target')act(s,'target-clear');if(cancel==='pause'){s.paused=true;T.stop(s);}if(cancel==='death')s.state.adventure.hp=0;tick(s,30);assert.equal(T.runtime(s).hits.length,0);assert.equal(T.runtime(s).windup,null);
});
test('blocked arrow has no confirmed hit number or hit reaction',()=>{
 const s=setup(true);T.stop(s);s.state.player={x:-1,z:3,yaw:Math.PI};const e=A.runtime(s).enemies[0];e.x=-1;e.z=-2;const before=JSON.stringify({hp:e.hp,hitAt:e.hitAt,flash:e.flash});assert.equal(act(s,'attack',{target:e.id}).ok,false);tick(s,100);assert.equal(T.runtime(s).hits.length,0);assert.equal(JSON.stringify({hp:e.hp,hitAt:e.hitAt,flash:e.flash}),before);
});
test('projectile that misses moving target cannot create confirmed feedback',()=>{
 const s=setup(true);T.stop(s);const e=A.runtime(s).enemies[0];s.state.player.z=14;assert.equal(act(s,'attack',{target:e.id}).ok,true);e.x=-8;tick(s,100);assert.equal(T.runtime(s).hits.length,0);assert.equal(e.hitAt,undefined);
});
test('confirmed hit stamps the damaged target once and scene change clears transient feedback',()=>{
 const s=setup();T.stop(s);const e=A.runtime(s).enemies[0];assert.equal(act(s,'attack',{target:e.id}).ok,true);assert.equal(e.hitAt,s.state.adventure.elapsed);assert.deepEqual(e.hitFrom,{x:s.state.player.x,z:s.state.player.z});assert.equal(T.runtime(s).hits.length,1);s.state.player={x:0,z:12,yaw:0};act(s,'starter-leave');assert.equal(T.runtime(s).hits.length,0);assert.equal(T.pose(s).phase,'idle');
});
