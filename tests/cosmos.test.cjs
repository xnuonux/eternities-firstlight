/* No personal saves. Travel, navigation and persistence through production callers. */
const {test}=require('node:test'),assert=require('node:assert/strict');
const C=require('../src/core.js'),N=require('../src/cosmos.js');
const fresh=()=>new C.Simulation(C.fresh());
function atGate(){const sim=fresh();sim.state.player={x:14,z:-5,yaw:0};return sim;}
const owner=(sim,extra={})=>({sim,active:'character-1',revision:3,...extra});
test('both ground approaches connect arrival to occupied observatory with radius clearance',()=>{
 const room={id:'cosmos-near-expanse'};
 for(const route of [[{x:0,z:18},{x:-13,z:0},{x:-15,z:-18},{x:-12,z:-32},{x:3,z:-43}],[{x:0,z:18},{x:11,z:0},{x:13,z:-24},{x:4,z:-33},{x:3,z:-43}]]){
  for(let i=1;i<route.length;i++){
   const path=C.pathfind(route[i-1],route[i],room);assert.ok(path,'production pathfinding connects the chosen approach');
   let a=route[i-1];for(const b of path){const count=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)/.08));for(let j=0;j<=count;j++){const p={x:a.x+(b.x-a.x)*j/count,z:a.z+(b.z-a.z)*j/count};assert.ok(N.walkable(p.x,p.z),JSON.stringify({a,b,p}));}a=b;}
  }
 }
 assert.equal(N.walkable(0,-16),false,'central gap is not a secret third road');
 assert.equal(N.walkable(-12,-9),false,'visible cover is solid');
 assert.equal(N.line({x:-16,z:-9},{x:-9,z:-9}),false,'cover blocks a sight line');
 assert.ok(N.height(0,-40)>N.height(0,18)+2,'the ground actually rises');
 for(let z=-45;z<18;z+=.1)assert.ok(Math.abs(N.height(12,z+.1)-N.height(12,z))<.035,'grade remains walkable without a step teleport');
});
test('entry saves the exact source before changing scenes, and reload returns to that source',()=>{
 const sim=atGate(),before=sim.snapshot(),ctx=owner(sim),ticket=N.preview(ctx);assert.equal(ticket.ok,true);
 let saved;const r=N.enter(ticket.ticket,ctx,{save:s=>{saved=s;assert.equal(sim.room,null);return{ok:true};},build:()=>{}});
 assert.equal(r.ok,true);assert.equal(sim.room,'cosmos-near-expanse');assert.deepEqual(saved,before);assert.deepEqual(sim.snapshot(),before);
 assert.deepEqual(new C.Simulation(sim.snapshot()).state,before);assert.equal(new C.Simulation(sim.snapshot()).room,null);
 assert.deepEqual(N.leave(sim),{ok:true});assert.deepEqual(sim.snapshot(),before);
});
test('a failed save or unavailable scene refuses travel atomically',()=>{
 for(const unavailable of [false,true]){const sim=atGate(),before=sim.snapshot(),ctx=owner(sim),t=N.preview(ctx).ticket;let builds=0;
  const r=N.enter(t,ctx,{available:!unavailable,save:()=>({ok:false,error:'quota'}),build:()=>builds++});
  assert.equal(r.ok,false);assert.equal(sim.room,null);assert.equal(builds,0);assert.deepEqual(sim.snapshot(),before);
 }
});
test('stale character, revision, simulation, position and cancelled tickets cannot enter',()=>{
 for(const change of ['active','revision','sim','position','cancel']){const sim=atGate(),ctx=owner(sim),t=N.preview(ctx).ticket;
  const next={...ctx};if(change==='active')next.active='character-2';if(change==='revision')next.revision=4;if(change==='sim')next.sim=atGate();if(change==='position')sim.state.player.x+=1;if(change==='cancel')N.cancel(t);
  let saves=0;assert.equal(N.enter(t,next,{save:()=>{saves++;return{ok:true};},build:()=>{}}).ok,false);assert.equal(saves,0);assert.equal(sim.room,null);
 }
});
test('scene build failure restores the source and a consumed ticket cannot retry',()=>{
 const sim=atGate(),ctx=owner(sim),before=sim.snapshot(),t=N.preview(ctx).ticket;let restores=0;
 assert.equal(N.enter(t,ctx,{save:()=>({ok:true}),build:()=>{throw Error('scene build');},restore:()=>restores++}).ok,false);
 assert.equal(restores,1);assert.equal(sim.room,null);assert.deepEqual(sim.snapshot(),before);
 assert.equal(N.enter(t,ctx,{save:()=>({ok:true}),build:()=>{}}).ok,false);
});
test('fall recovery recalls to safe ground and normal return works from the far end',()=>{
 const sim=atGate(),ctx=owner(sim),before=sim.snapshot();N.enter(N.preview(ctx).ticket,ctx,{save:()=>({ok:true}),build:()=>{}});
 sim.state.player={x:100,z:-100,yaw:0};assert.equal(N.recover(sim),true);assert.ok(N.walkable(sim.state.player.x,sim.state.player.z));assert.deepEqual(sim.snapshot(),before);
 sim.state.player={x:3,z:-43,yaw:0};assert.equal(N.leave(sim).ok,true);assert.deepEqual(sim.snapshot(),before);
});

test('height-aware ray picks real support and refuses sky, the ridge and cover',()=>{
 const p=N.pick([0,20,18],[0,-1,0]);assert.ok(p);assert.ok(Math.hypot(p.x,p.z-18)<.01);
 const high=N.pick([13,20,-24],[0,-1,0]);assert.ok(high);assert.ok(N.height(high.x,high.z)>3);
 assert.equal(N.pick([0,20,18],[0,1,0]),null);
 assert.equal(N.pick([0,20,-16],[0,-1,0]),null);
 assert.equal(N.pick([-12,20,-9],[0,-1,0]),null);
 assert.equal(N.pick([100,20,100],[0,-1,0]),null);
 assert.equal(N.pick([NaN,20,0],[0,-1,0]),null);
});
test('manual walking slides along boundaries without crossing unsupported corner segments',()=>{
 const sim=atGate(),ctx=owner(sim);N.enter(N.preview(ctx).ticket,ctx,{save:()=>({ok:true}),build:()=>{}});
 for(const seed of [{x:-7.8,z:-3.55},{x:7.4,z:-3.55},{x:-13.95,z:-7.15},{x:0,z:21.65}]){
  assert.ok(N.walkable(seed.x,seed.z));for(let i=0;i<64;i++){sim.state.player={...seed,yaw:0};const a={...sim.state.player},theta=i*Math.PI/32;sim.manual(Math.cos(theta),Math.sin(theta),.1);assert.ok(N.segment(a,sim.state.player),'manual caller crossed a corner');}
 }
});
