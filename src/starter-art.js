/* Read-only riverbank scenery. Enemy outcomes and positions come from shared rules. */
(function(G){'use strict';const Q=G.RealmStarter;
function make(a){a.begin(Q.ROOM);a.e.theme='riverbank';a.e.isInterior=false;a.e.ambientOverride=.58;const rng=G.RealmCore.rng(1212);
 a.box(-1,.30,-2.5,22,2.4,35,0x687e60);
 for(let z=-23;z<21;z+=2.5){a.add('octa',-13,.2,z,5,2.5,4,0x768c70);a.add('octa',10.7,.25,z,2.2,1.6,3.3,0x8d9980);}
 for(let x=-11;x<10;x+=2)for(let z=-19;z<15;z+=2)a.box(x,1.47,z,2.02,.08,2.02,[0x819875,0x78916d,0x84986e][Math.floor(rng()*3)],{rough:1});
 const route=[Q.ENTRY,...Q.BUNDLES,Q.ENEMIES[2]];for(let j=1;j<route.length;j++){const p=route[j-1],q=route[j],d=Math.hypot(q.x-p.x,q.z-p.z);for(let t=0;t<=d;t+=.8)a.add('disc',p.x+(q.x-p.x)*t/d,1.525,p.z+(q.z-p.z)*t/d,2,.018,2,0xb5ac85,{rough:1});}
 // Eastern shore is outside the movement bounds; the engine supplies the surrounding water.
 for(let z=-19;z<16;z+=1.8){a.add('octa',10.15,1.1,z,.8,.65,1.7,0xa8a98a);for(let i=0;i<3;i++)a.box(9.7+Math.sin(z+i)*.15,1.7,z+i*.28,.05,.55,.05,0xb3b17c,{r:[.1,0,.13]});}
 for(const o of Q.OBSTACLES)a.add('octa',o.x,1.8,o.z,o.r*2,1.5,o.r*2,0x8c9987,{rough:1});
 for(const [x,z,scale,kind]of Q.TREES)a.tree(x,z,scale,kind,1.5);
 for(let i=0;i<16;i++){const z=-23+i*2.8;a.tree(-16-rng()*3,z,.75+rng()*.6,i%3,.5);}
 a.box(-1.9,2.3,13.5,.17,1.7,.17,0x857557);a.box(-1.9,2.85,13.5,1.6,.4,.10,0xd0bb91);a.lamp(1.7,13,2.6,1.5);
 // Unrecovered bundles are dynamic so saving/collecting cannot leave stale scenery.
 a.commit();
}
function draw(out,sim,t){const a=sim.state.adventure,q=a.starter;
 const add=(k,x,y,z,w,h,d,c,o={})=>out[k].push({p:[x,y,z],s:[w,h,d],c,...o}),box=(...p)=>add('box',...p);
 function bundle(x,z,i){box(x,1.83,z,.8,.55,.7,0x967551);box(x,2.12,z,.92,.08,.79,0xd5bc89);box(x,1.86,z,.08,.67,.81,0x608e82);box(x,1.87,z,.93,.66,.07,0x608e82);if(i===1){box(x,2.24,z,.62,.12,.16,0xbbc0af);box(x+.23,2.20,z,.12,.14,.58,0x84704f);}if(i===2)box(x,2.28,z,.70,.22,.6,0xb8c3a1);}
 if(sim.room===Q.ROOM){for(let i=0;i<Q.BUNDLES.length;i++){const b=Q.BUNDLES[i];if(!q.bundles.includes(b.id))bundle(b.x,b.z,i);}
  const p=Q.PRACTICE;box(p.x,2.12,p.z,.18,1.3,.20,0x796346);add('round',p.x,2.75,p.z,1.1,1.1,.55,0xb4a779);box(p.x,2.75,p.z+.28,.17,.95,.04,0x75988b);box(p.x,2.75,p.z+.29,.9,.17,.04,0x75988b);
 }else if(!sim.room){
  box(Q.GATE.x,1.85,Q.GATE.z,.13,1.1,.13,0x807250);box(Q.GATE.x,2.4,Q.GATE.z,1.25,.36,.09,0xc1b18d);add('octa',Q.GATE.x+.6,2.4,Q.GATE.z,.38,.36,.1,0xc1b18d);
  if(q.reward)for(let i=0;i<3;i++)bundle(12.2+(i%2)*.9,7.1+Math.floor(i/2)*.9,i);
 }
}
G.RealmStarterArt={make,draw};})(globalThis);
