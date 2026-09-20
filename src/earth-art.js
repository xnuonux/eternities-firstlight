/* Earth E1 — Hearthwater Vale procedural geography. */
(function(G){'use strict';
const C=G.RealmEarth,TAU=Math.PI*2,h=C.height;
const col={grass:0x74835c,meadow:0x89946a,stone:0x8f8a74,path:0xa79a78,wood:0x725b40,roof:0x6c5b4e,leaf:0x6f8555,fruit:0xc98968,water:0x577c7a,gold:0xc2a86c};
const paths=[
 [[0,25],[0,17],[0,10],[-7,5],[-12,-3],[-14,-12],[-14,-22],[-10,-30],[0,-35],[0,-44]],
 [[0,10],[7,5],[13,-3],[14,-12],[14,-22],[11,-30],[0,-35],[0,-44]],
 [[-14,-22],[-12,-24]],
 [[-7,5],[-10,4],[-13,4]]
];
function pathDistance(x,z){let best=Infinity;for(const ps of paths)for(let i=1;i<ps.length;i++){const u=ps[i-1],v=ps[i],dx=v[0]-u[0],dz=v[1]-u[1],d=dx*dx+dz*dz,t=d?Math.max(0,Math.min(1,((x-u[0])*dx+(z-u[1])*dz)/d)):0;best=Math.min(best,Math.hypot(x-u[0]-dx*t,z-u[1]-dz*t));}return best;}
function paving(a,points,width=1.7){for(let i=1;i<points.length;i++){const u=points[i-1],v=points[i],d=Math.hypot(v[0]-u[0],v[1]-u[1]);for(let t=0;t<d;t+=.68){const f=t/d,x=u[0]+(v[0]-u[0])*f,z=u[1]+(v[1]-u[1])*f;if(C.walkable(x,z,.08))a.add('disc',x,h(x,z)+.025,z,width,1,width,col.path,{rough:1,cameraSolid:false,r:[Math.atan2(h(x,z-.1)-h(x,z+.1),.2),0,0]});}}}
function terrain(a,rnd){
 for(let z=-52;z<29;z+=.5){let runs=C.PATCHES.filter(p=>z+.5>p.z-p.d/2&&z<p.z+p.d/2).map(p=>[p.x-p.w/2,p.x+p.w/2]).sort((u,v)=>u[0]-v[0]),merged=[];
  for(const p of runs){const last=merged[merged.length-1];if(last&&p[0]<=last[1])last[1]=Math.max(last[1],p[1]);else merged.push(p.slice());}
  for(const [lo,hi]of merged){const x=(lo+hi)/2,ha=h(x,z),hb=h(x,z+.5),ang=Math.atan2(ha-hb,.5),green=z<-25?col.meadow:col.grass;a.box(x,(ha+hb)/2-.045,z+.25,hi-lo,.09,Math.hypot(.5,hb-ha)+.002,green,{rough:1,terrain:true,cameraSolid:false,cutaway:false,r:[ang,0,0]});a.box(x,Math.min(ha,hb)-2.55,z+.25,hi-lo,5,.502,0x756d5a,{cameraSolid:false,cutaway:false});}
 }
 for(const ps of paths)paving(a,ps);
 // Mill pond/watercourse is a visible reason the direct center is not walkable in E1.
 a.box(0,1.32,-12.5,8.8,.08,33,col.water,{rough:.25,wet:1,cameraSolid:false,cutaway:false});
 for(let i=0;i<9;i++){let z=-7-i*2.1;a.add('disc',Math.sin(i*.8)*1.2,h(0,z)-.04,z,.55,1,.55,0x6e8f69,{cameraSolid:false,rough:.8});}
 // Low stone walls make the orchard road legible without turning every fence into a collision maze.
 for(let z=6;z>-9;z-=1.15){if(z>2.7&&z<5.3)continue;a.box(-15.6,h(-15.6,z)+.28,z,.5,.56,1.02,col.stone,{cameraSolid:true});}
 // Orchard trees: solids are limited to the declared shed; trunks here are presentation-scale.
 for(let row=0;row<3;row++)for(let i=0;i<5;i++){let x=-12+row*3,z=5-i*2.6;if(pathDistance(x,z)<1.25)continue;let b=h(x,z);a.add('cylinder',x,b,z,.22,1.65,.22,col.wood,{cameraSolid:false});a.add('round',x,b+2,z,1.45,1.35,1.45,col.leaf,{cameraSolid:false,rough:1});for(let f=0;f<3;f++){let q=(i*3+f)*2.1;a.add('round',x+Math.sin(q)*.7,b+2.05+f*.1,z+Math.cos(q)*.7,.12,.12,.12,col.fruit,{cameraSolid:false});}}
 // A worksite gateway: split wall, timber posts and a small packed load.
 for(const z of [2.8,5.2]){const b=h(-14.7,z);a.box(-14.7,b+.85,z,.22,1.7,.22,col.wood,{cameraSolid:false});}
 for(const z of [3.1,3.65])a.box(-14.5,h(-14.5,z)+.28,z,.7,.56,.46,col.wood,{cameraSolid:false});
 a.box(-14.5,h(-14.5,3.4)+.6,3.4,.78,.12,1.12,0xb3a07b,{cameraSolid:false});
 // Orchard shed.
 {let x=-8,z=0,b=h(x,z);a.box(x,b+1.75,z,4.4,3.5,4.2,0xa99a79);a.add('roof',x,b+3.5,z,5,1.5,4.8,col.roof,{cameraSolid:true});a.box(x,b+1.2,z+2.12,1.3,2.4,.08,0x594b3a);}
 // Quarry stacks and worked stone.
 for(const [x,z,s]of [[11.7,-18,1],[14,-21,.7],[10,-24,.8]]){let b=h(x,z);for(let i=0;i<4;i++)a.box(x+(i%2)*.8,b+.25+i*.37,z+(i%3)*.35,1.25,.45,.72,i%2?0xa29a83:0x817b69,{rough:1});}
 // Ridge shelter matches its collision footprint.
 {let x=-12,z=-25,b=h(x,z);a.box(x,b+1.55,-26,6.6,3.1,.5,0x9b9279);a.box(-15,b+1.55,-23.8,.5,3.1,4.8,0x9b9279);a.box(-9,b+1.55,-24.6,.5,3.1,3.2,0x9b9279);a.add('roof',x,b+3.1,-24.2,7.3,1.5,5.2,0x695c4b,{cameraSolid:true});a.bench(-12,-23,0,b);a.box(-11,b+2.1,-26.25,1.5,1.15,.06,0x5d6a60);a.box(-11,b+2.1,-26.18,1.2,.9,.04,0xa6c0af,{em:.08});}
 // Bellweather bell is a distant orientation landmark beyond the qualified boundary.
 const bb=h(0,-48);for(const x of[-2.4,2.4])a.box(x,bb+4.2,-50,.55,8.4,.55,0x82765e,{cameraSolid:false});
 a.box(0,bb+7.7,-50,5.2,.45,.6,0x82765e,{cameraSolid:false});a.add('bell',0,bb+6.7,-49.9,1.2,1.6,1.2,0xc6aa6b,{cameraSolid:false,em:.06});
 // Footbridge and parapets.
 for(let z=18;z<27;z+=.5){let b=h(0,z);a.box(0,b+.04,z,3.7,.08,.46,0x9b8e72,{cameraSolid:false,rough:.8});}
 for(let z=18;z<27;z+=1.8)for(const x of[-1.7,1.7]){let b=h(x,z);a.box(x,b+.55,z,.14,1.1,.14,0x81755f);a.box(x,b+1.03,z,.14,.1,1.8,0x81755f,{cameraSolid:false});}
 // Field dressing respects route clearance.
 for(let i=0;i<850;i++){let x=-18+rnd()*36,z=-49+rnd()*74;if(!C.walkable(x,z,.45)||pathDistance(x,z)<1.25)continue;let b=h(x,z),s=.07+rnd()*.11;a.add('leaf',x,b+.02,z,s,s*2.6,s,i%7===0?0xb3a56f:0x678150,{wind:1,rough:1,cameraSolid:false,r:[0,rnd()*TAU,0]});if(i%33===0)a.add('octa',x,b+.18,z,.10,.16,.10,[0xdfc78f,0xcaa6a1,0xd9d3a2][i%3],{cameraSolid:false});}
 // Distant wooded hills are scenery only.
 for(let i=0;i<26;i++){let a0=i/26*TAU,r=95+rnd()*22,x=Math.cos(a0)*r,z=-12+Math.sin(a0)*r*.8,b=1.0+rnd()*1.5;a.add('round',x,-1.2,z,14+rnd()*8,8+rnd()*10,14+rnd()*8,i%3?0x60755d:0x75846b,{cameraSolid:false,cutaway:false,rough:1});if(i%2===0)a.add('round',x,b+5,z,7,4,7,0x647858,{cameraSolid:false,cutaway:false,rough:1});}
}
function sign(a,x,z,textColor=col.gold){const b=h(x,z);a.box(x,b+.85,z,.16,1.7,.16,col.wood,{cameraSolid:false});a.box(x,b+1.55,z,2.3,.75,.12,0x826c4b,{cameraSolid:false});a.add('octa',x,b+1.57,z+.09,.12,.12,.04,textColor,{em:.15,cameraSolid:false});}
function make(a){a.begin(C.ROOM);a.e.theme='earth';a.e.isInterior=false;a.e.noWater=false;a.e.ambientOverride=.78;const rnd=G.RealmCore.rng(18092026);terrain(a,rnd);for(const [x,z]of [[0,16],[-8,3],[-13,4],[7,2],[13,-13],[12,-26],[-12,-23],[0,-43]])sign(a,x,z);a.commit();}
function story(out,sim,t,a){
 const s=sim.state.adventure.earthStory,quiet=sim.state.settings.reducedMotion,clock=quiet?0:t,done=id=>s.steps.includes(id);
 const box=(x,y,z,w,ht,d,c,r)=>out.box.push({p:[x,y,z],s:[w,ht,d],c,r:r||[0,0,0],rough:.9,cameraSolid:false});
 const round=(x,y,z,w,ht,d,c)=>out.round.push({p:[x,y,z],s:[w,ht,d],c,rough:.9});
 // Residents stand beside supported paths. They never own progression or collision.
 const fx=s.dispatch?2:8.8,fz=s.dispatch?-43:5;
 a.person(out,fx,fz,-.6,'#bd8963',clock,false,'drover',false,h(fx,fz));
 a.person(out,8.7,-6.6,-1.0,'#819b98',clock,false,'millwright',false,h(8.7,-6.6));
 a.person(out,14.3,-26,-.8,'#989478',clock,false,'reeve',false,h(14.3,-26));
 // The load changes place only after explicit dispatch; arrival dresses the shared table.
 const cx=s.dispatch?-3:9.3,cz=s.dispatch?-43:7,b=h(cx,cz);
 box(cx,b+.63,cz,1.7,.18,2.5,col.wood);for(const x of [-.98,.98])for(const z of [-.78,.78])round(cx+x,b+.48,cz+z,.18,.65,.65,0x514436);
 for(const x of [-.8,.8])box(cx+x,b+.99,cz,.12,.55,2.45,0x9a7851);
 for(let i=0;i<4;i++)round(cx+(i%2?-.38:.38),b+1.02,cz+Math.floor(i/2)*.68-.48,.68,.68,.6,0xc3b795);
 box(cx,b+1.23,cz-.86,1.35,.25,.38,0x7a6748);for(let i=0;i<5;i++)round(cx-.48+i*.23,b+1.42,cz-.86,.21,.20,.20,0xb9694b);
 // Small headrace machinery remains on the bank; it does not open collision through the pond.
 const gy=h(5.2,-6);for(const z of [-5.5,-6.5])box(5.2,gy+.8,z,.18,1.6,.18,col.wood);
 box(5.2,gy+(done('mill-gate')?1.25:.55),-6,.16,.85,.9,done('mill-gate')?0xc0a174:0x70634f);
 box(5.2,gy+1.65,-6,.25,.16,1.4,col.wood);
 if(!done('mill-root')){box(5.15,gy+.2,-4.5,.28,.25,1.9,0x5a503d,[0,.5,.25]);box(5.55,gy+.23,-4.4,.8,.14,.18,0x5a503d,[0,-.5,0]);}
 if(done('mill-gate'))box(5.2,gy+.75,-6,.2,1.1,.16,0xcaa877,[.55,0,0]);
 // Reserved blocks disappear only after collection; road packing then remains visible.
 if(!done('quarry-reserve'))for(let i=0;i<3;i++){const x=10.8+i*.62,z=-27;box(x,h(x,z)+.2,z,.55,.4,.6,0xaba185);box(x,h(x,z)+.42,z,.4,.03,.10,0xdac386);}
 if(done('quarry-grade'))for(let i=0;i<12;i++){const x=13.1+(i%3)*.63,z=-14.4+Math.floor(i/3)*.65;box(x,h(x,z)+.055,z,.6,.1,.58,0xb6ab91);}
 if(done('detour-mark'))for(const [x,z]of [[11.4,-13],[-10.1,-22],[2,-35]]){const y=h(x,z);box(x,y+.6,z,.09,1.2,.09,col.wood);box(x+.25,y+1.08,z,.62,.3,.07,0xc4aa69);}
 if(s.arrived){const x=3.8,z=-45,y=h(x,z);box(x,y+.85,z,2.6,.15,1.4,0x9e8155);for(const dx of [-1,1])box(x+dx,y+.43,z,.14,.85,1.1,col.wood);box(x,y+.96,z,1.25,.04,.85,0xcdbd99);for(let i=0;i<3;i++)round(x-.5+i*.5,y+1.05,z,.34,.12,.34,0xbc985b);}
}
function draw(out,sim,t,a){if(sim.room!==C.ROOM)return;story(out,sim,t,a);const p=sim.state.player;if(!sim.state.settings?.reducedMotion){for(let i=0;i<5;i++){let q=t*.13+i*1.7,x=-4+Math.sin(q)*5,z=-30+Math.cos(q*.7)*4,b=h(x,z);out.box.push({p:[x,b+5+Math.sin(q*1.8)*.35,z],s:[.38,.045,.12],r:[0,q,.2],c:0x4c5f55});}}out.disc.push({p:[p.x,h(p.x,p.z)+.02,p.z],s:[.8,1,.8],c:0xd5bd83,rough:.8,em:.04});}
function gate(a){const b=1.3;a.box(C.GATE.x,b+.75,C.GATE.z,.18,1.5,.18,col.wood,{cameraSolid:false});a.box(C.GATE.x,b+1.35,C.GATE.z,1.9,.55,.12,0x826c4b,{cameraSolid:false});a.add('octa',C.GATE.x,b+1.38,C.GATE.z+.08,.12,.12,.04,col.gold,{em:.15,cameraSolid:false});}
G.RealmEarthArt={make,draw,gate};
})(globalThis);
