/* Earth E1 rules: physical ground, safe travel, and no story/economy mutation. */
const {test}=require('node:test'),assert=require('node:assert/strict');
const C=require('../src/core.js'),E=require('../src/earth.js');
const fresh=()=>new C.Simulation(C.fresh());
function atGate(){const sim=fresh();sim.state.player={x:0,z:27,yaw:0};return sim;}
const owner=(sim,extra={})=>({sim,active:'character-1',revision:5,...extra});
test('orchard and ridge approaches connect the lake to Bellweather west road',()=>{
 const room={id:E.ROOM};
 const routes=[
  [{x:0,z:24},{x:0,z:10},{x:-8,z:3},{x:-14,z:-12},{x:-12,z:-23},{x:-10,z:-30},{x:0,z:-35},{x:0,z:-43}],
  [{x:0,z:24},{x:0,z:10},{x:7,z:2},{x:14,z:-12},{x:12,z:-26},{x:0,z:-35},{x:0,z:-43}]
 ];
 for(const route of routes)for(let i=1;i<route.length;i++){
  const path=C.pathfind(route[i-1],route[i],room);assert.ok(path,'production pathfinding connects the Earth approach');
  let a=route[i-1];for(const b of path){const count=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)/.08));for(let j=0;j<=count;j++){const p={x:a.x+(b.x-a.x)*j/count,z:a.z+(b.z-a.z)*j/count};assert.ok(E.walkable(p.x,p.z),JSON.stringify({a,b,p}));}a=b;}
 }
 assert.equal(E.walkable(0,-15),false,'mill watercourse is not secret walkable ground');
 assert.equal(E.walkable(-8,0),false,'orchard shed is solid');
 assert.equal(E.line({x:-11,z:0},{x:-5,z:0}),false,'shed blocks a sight line');
 assert.ok(E.height(0,-43)>E.height(0,24),'north road has a real but modest rise');
 for(let z=-43;z<24;z+=.1)assert.ok(Math.abs(E.height(12,z+.1)-E.height(12,z))<.02,'grade has no hidden step teleport');
});
test('entry saves exact lake checkpoint and transient Earth room never becomes persisted position',()=>{
 const sim=atGate(),before=sim.snapshot(),ctx=owner(sim),p=E.preview(ctx);assert.equal(p.ok,true);
 let saved;const r=E.enter(p.ticket,ctx,{save:s=>{saved=s;assert.equal(sim.room,null);return{ok:true};},build:()=>{}});
 assert.equal(r.ok,true);assert.equal(sim.room,E.ROOM);assert.deepEqual(saved,before);assert.deepEqual(sim.snapshot(),before);
 const reopened=new C.Simulation(sim.snapshot());assert.equal(reopened.room,null);assert.deepEqual(reopened.state,before);
 assert.equal(E.leave(sim).ok,true);assert.deepEqual(sim.snapshot(),before);
});
test('travel refusal and scene failure are atomic',()=>{
 let sim=atGate(),before=sim.snapshot(),ctx=owner(sim),t=E.preview(ctx).ticket,builds=0;
 let r=E.enter(t,ctx,{save:()=>({ok:false,error:'quota'}),build:()=>builds++});assert.equal(r.ok,false);assert.equal(builds,0);assert.equal(sim.room,null);assert.deepEqual(sim.snapshot(),before);
 sim=atGate();before=sim.snapshot();ctx=owner(sim);t=E.preview(ctx).ticket;let restores=0;
 r=E.enter(t,ctx,{save:()=>({ok:true}),build:()=>{throw Error('synthetic scene failure');},restore:()=>restores++});
 assert.equal(r.ok,false);assert.equal(restores,1);assert.equal(sim.room,null);assert.deepEqual(sim.snapshot(),before);assert.equal(sim.earthTrip,undefined);
});
test('stale character, revision, position and cancellation cannot enter',()=>{
 for(const change of ['active','revision','sim','position','cancel']){const sim=atGate(),ctx=owner(sim),t=E.preview(ctx).ticket,next={...ctx};
  if(change==='active')next.active='character-2';if(change==='revision')next.revision=6;if(change==='sim')next.sim=atGate();if(change==='position')sim.state.player.x+=1;if(change==='cancel')E.cancel(t);
  let saves=0;assert.equal(E.enter(t,next,{save:()=>{saves++;return{ok:true};},build:()=>{}}).ok,false);assert.equal(saves,0);assert.equal(sim.room,null);
 }
});
test('fall recovery uses supported entry and return works from the far road',()=>{
 const sim=atGate(),ctx=owner(sim),before=sim.snapshot();E.enter(E.preview(ctx).ticket,ctx,{save:()=>({ok:true}),build:()=>{}});
 sim.state.player={x:100,z:-100,yaw:0};assert.equal(E.recover(sim),true);assert.ok(E.walkable(sim.state.player.x,sim.state.player.z));assert.deepEqual(sim.snapshot(),before);
 sim.state.player={x:0,z:-43,yaw:0};assert.equal(E.leave(sim).ok,true);assert.deepEqual(sim.snapshot(),before);
});
test('height-aware surface pick accepts ground and refuses watercourse, solids and sky',()=>{
 let p=E.pick([0,20,24],[0,-1,0]);assert.ok(p);assert.ok(Math.hypot(p.x,p.z-24)<.01);
 p=E.pick([12,20,-26],[0,-1,0]);assert.ok(p);assert.ok(E.height(p.x,p.z)>1.8);
 assert.equal(E.pick([0,20,24],[0,1,0]),null);
 assert.equal(E.pick([0,20,-15],[0,-1,0]),null);
 assert.equal(E.pick([-8,20,0],[0,-1,0]),null);
 assert.equal(E.pick([100,20,100],[0,-1,0]),null);
 assert.equal(E.pick([NaN,20,0],[0,-1,0]),null);
});
test('manual movement slides without crossing unsupported segments',()=>{
 const sim=atGate(),ctx=owner(sim);E.enter(E.preview(ctx).ticket,ctx,{save:()=>({ok:true}),build:()=>{}});
 for(const seed of [{x:-5.4,z:-7},{x:5.4,z:-7},{x:-15.7,z:-9},{x:0,z:18.2}]){
  assert.ok(E.walkable(seed.x,seed.z));for(let i=0;i<64;i++){sim.state.player={...seed,yaw:0};const a={...sim.state.player},theta=i*Math.PI/32;sim.manual(Math.cos(theta),Math.sin(theta),.1);assert.ok(E.segment(a,sim.state.player),'manual caller crossed a boundary');}
 }
});
