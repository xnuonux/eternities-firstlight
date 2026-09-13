/* Original procedural Wildwood artwork; consumes local state, never changes it. */
(function(G){'use strict';const S=G.RealmSandbox,E=G.RealmEngine;
function scenery(a){
 const random=RealmCore.rng(9021),c=1.42;
 for(let z=-53;z<=-27;z+=c)for(let x=-13;x<=13;x+=c){let edge=11.4-Math.hypot(x,(z+40)*.92);if(edge<-.4)continue;let top=edge<.8?.62:1.2;a.box(x,top/2,z,c+.035,top,c+.035,E.blend(E.hex(0x769473),E.hex(0xa7ae7b),random()*.47));if(edge<1)a.box(x,-.4,z,c+.03,1.05,c+.03,0x738982);}
 // Tall stone strata, a glade and two ruined arches frame the new homestead.
 for(let x of[-9.6,9.6])for(let j=0;j<4;j++){let z=-46+j*2;a.add('octa',x,1.6,z,2.1,2.7,2.4,0x7e908e);if(j%2===0)a.add('octa',x-.3,2.5,z,1.3,1.1,1.6,0xabb4a4);}
 for(let[x,z]of[[-7.5,-47],[7.4,-47],[-9,-37],[9,-44]])a.tree(x,z,.9,2);
 for(let x of[-4,4]){a.box(x,3,-48.2,.5,3.6,.65,0xa3b09c);a.box(x,4.9,-48.2,.75,.22,.86,0xc6c5ad);}a.box(0,4.5,-48.2,7.5,.24,.4,0x869c90);
 for(let i=0;i<110;i++){let x=random()*20-10,z=-50+random()*21;if(!S.frontier(x,z)||Math.abs(x)<6.7&&z>-46&&z<-33)continue;a.add('leaf',x,1.28,z,.18,.35+random()*.3,.18,0x93a971,{wind:1});}
 // Broad paths stop at the empty bridge span until the player repairs it.
 for(let z=-20;z>=-23;z-=.6)a.box(0,1.23,z,2.65,.12,.57,0xb0b8a0,{wet:1});
 for(let z of[-23,-29.7])for(let x of[-1.6,1.6]){a.box(x,.65,z,.38,2.9,.38,0x7c7765);a.box(x,2.18,z,.62,.14,.62,0xc5bb95);}
 for(let z=-30;z>-47.5;z-=.72){a.box(0,1.24,z,1.28,.035,.64,0xb7bb9b,{wet:1});a.box(.70,1.265,z,.05,.02,.64,0xcbb97d);a.box(-.7,1.265,z,.05,.02,.64,0xcbb97d);}
 // Neutral public workbench: the player can also craft and place one of their own.
 a.box(-5,2,-32.5,2.1,.2,1.25,0xb69668);for(let x of[-5.85,-4.15])for(let z of[-32.94,-32.06])a.box(x,1.59,z,.14,.8,.14,0x6d6951);
 a.box(-5.4,2.15,-32.4,.45,.12,.3,0xaebfb7);a.box(-4.5,2.12,-32.7,.15,.08,.6,0xd3c596);
 a.lamp(-2,-31.2,2.8);a.lamp(2,-31.2,2.8);a.bench(-3.5,-30.2,Math.PI);
 a.box(1.9,2.1,-21,.16,1.8,.16,0x927957);a.box(1.9,2.7,-21,1.25,.64,.1,0x466960);a.add('octa',1.9,2.7,-20.89,.26,.32,.05,0xe6cf93);
}
function draw(out,sim,t){if(sim.room)return;const s=sim.state.sandbox;if(!s)return;
 const add=(kind,x,y,z,w,h,d,c,opt={})=>out[kind].push({p:[x,y,z],s:[w,h,d],c,...opt});
 const box=(x,y,z,w,h,d,c,opt)=>add('box',x,y,z,w,h,d,c,opt);
 if(s.bridge){for(let z=-23.4;z>=-30.5;z-=.39){box(0,1.24,z,2.7,.18,.34,0xb29d74,{wet:1});for(let x of[-1.37,1.37]){box(x,1.8,z,.09,1.05,.09,0x807458);box(x,2.3,z,.17,.12,.43,0xc5b790);}}}else{for(let x of[-.6,.6])box(x,.4,-25.2, .2,.18,2.4,0x738478,{r:[0,x*.5,.1]});}
 for(let node of S.NODES){const n=s.nodes.find(n=>n.id===node.id),empty=n.hp===0,focus=sim.presentation?.resource===node.id,shake=sim.sandboxFx?.id===node.id&&t-sim.sandboxFx.time<.3?Math.sin((t-sim.sandboxFx.time)*50)*.09:0,x=node.x+shake,z=node.z;
  if(node.kind==='wood'){
   box(x,empty?1.5:2.5,z,empty?.6:.43,empty?.6:2.6,.43,0x806445);
   if(!empty){for(let j=0;j<3;j++)add('octa',x,3.1+j*.82,z,2.3-j*.4,2.35-j*.25,2.3-j*.4,[0x789467,0x8fab75,0xacb985][j],{wind:2});}
   else{let u=1-Math.max(0,n.readyAt-s.elapsed)/120;add('octa',x+.1,1.8+u*.4,z,.35+u*.5,.5+u,.35+u*.5,0x9eb585);}
  }else if(node.kind==='fiber'){
   for(let j=0;j<5;j++){let a=j*2.4;box(x+Math.cos(a)*.25,empty?1.4:1.7,z+Math.sin(a)*.25,.07,empty?.16:.7,.08,0x9baf6c,{r:[0,a,.16]});if(!empty)add('round',x+Math.cos(a)*.32,2.03,z+Math.sin(a)*.32,.27,.34,.27,j%2?0xd5bba7:0xabbf83);}
  }else{
   const crystal=node.kind==='crystal';for(let j=0;j<(empty?2:4);j++){let a=j*2.4;add('octa',x+Math.cos(a)*.4,empty?1.4:1.7+(j%2)*.2,z+Math.sin(a)*.4,empty?.35:crystal?.55:1.05,empty?.22:crystal?1.7:1.05,empty?.4:crystal?.5:.95,crystal?(j%2?0xabbfe8:0xc9a1cf):(j%2?0xabb8a8:0x8d9e99),{em:crystal&&!empty?.22:0,rough:crystal?.2:.9});}
  }
  if(focus){for(let j=0;j<16;j++){let a=j/16*Math.PI*2;box(x+Math.cos(a)*.9,1.31,z+Math.sin(a)*.9,.18,.035,.06,empty?0x8f9b83:0xebd298,{r:[0,-a,0],em:.3});}}
 }
 const building=(p,ghost=false)=>{const w=S.worldCell(p.gx,p.gz),x=w.x,z=w.z,rot=p.rotation*Math.PI/2,deck=s.placed.some(o=>o.gx===p.gx&&o.gz===p.gz&&o.kind==='floor')?.13:0,base=1.3+deck;
  const b=(dx,y,dz,sx,sy,sz,c,opt={})=>box(x+dx*Math.cos(rot)+dz*Math.sin(rot),y,z-dx*Math.sin(rot)+dz*Math.cos(rot),sx,sy,sz,ghost?(sim.presentation?.blueprint?.valid?0xb4dbb8:0xd18491):c,{...opt,cameraSolid:!ghost&&['masonry','wall','lantern','workbench'].includes(p.kind),r:[0,rot,0],em:ghost?.28:(opt.em||0)});
  if(p.kind==='floor'){for(let j=0;j<5;j++)b(-.62+j*.31,1.36,0,.285,.12,1.56,0xbe9e71,{wet:1});}
  if(p.kind==='masonry'){let y=base+(p.level-.5)*.8;b(0,y,0,1.42,.76,1.42,p.level%2?0xa4b3a4:0xbbc4b3);b(0,y+.4,0,1.46,.04,1.46,0xd5cbb0);}
  if(p.kind==='wall'){for(let j=0;j<5;j++)b(-.62+j*.31,base+.95,0,.285,1.9,.16,0xaf936c);b(0,base+.4,-.12,1.58,.12,.10,0x7a6b51);b(0,base+1.55,-.12,1.58,.12,.10,0x7a6b51);}
  if(p.kind==='lantern'){b(0,base+.8,0,.12,1.6,.12,0x8c7755);b(0,base+1.65,0,.48,.52,.48,0xf1c88a,{em:1.4});b(0,base+1.97,0,.65,.1,.65,0xb3945f);add('octa',x,base+2.16,z,.25,.35,.25,0xe7bd7e,{em:1});}
  if(p.kind==='bench'){for(let dx of[-.55,.55])b(dx,base+.28,0,.14,.55,.6,0x6c6551);b(0,base+.6,0,1.4,.14,.7,0xbca078);b(0,base+1.0,-.3,1.4,.5,.12,0xc4ac85);}
  if(p.kind==='workbench'){for(let dx of[-.55,.55])for(let dz of[-.45,.45])b(dx,base+.4,dz,.12,.8,.12,0x75674c);b(0,base+.86,0,1.45,.16,1.25,0xb99863);b(-.2,base+1.04,0,.7,.2,.28,0xa9b9ad);b(.45,base+1,-.15,.12,.1,.75,0x756a57);}
  if(p.kind==='fire'){for(let j=0;j<7;j++){let a=j/7*Math.PI*2;add('octa',x+Math.cos(a)*.55,base+.15,z+Math.sin(a)*.55,.4,.33,.4,0xa8ad9c);}b(0,base+.23,0,.86,.2,.22,0x695942);add('octa',x,base+.65+Math.sin(t*7)*.08,z,.46,.91,.46,0xeead69,{em:1.4});add('octa',x,base+.48,z,.23,.6,.23,0xffdba0,{em:2});}
  if(p.kind==='bed'){b(0,base+.07,0,1.37,.15,1.37,0x686345);for(let dx of[-.73,.73])b(dx,base+.17,0,.1,.35,1.56,0xa08d64);for(let dz of[-.73,.73])b(0,base+.17,dz,1.5,.35,.1,0xa08d64);if(p.crop){let u=p.crop.stage==='ripe'?1:p.crop.stage==='watered'?.15+.8*(1-Math.max(0,p.crop.readyAt-s.elapsed)/90):.1;for(let j=0;j<4;j++){let xx=x+(j%2?-.35:.35),zz=z+(j<2?-.35:.35);box(xx,base+.2+u*.3,zz,.065,u*.6,.065,0x769260);add('round',xx,base+.2+u*.65,zz,.18+u*.26,.14+u*.3,.2+u*.2,0xabc383);if(p.crop.stage==='ripe')for(let k=0;k<3;k++)add('round',xx+Math.sin(k*2.2)*.16,base+.88,zz+Math.cos(k*2.2)*.16,.19,.21,.19,k%2?0xe2b888:0xd99a9b);}}}
 };
 for(let p of s.placed.slice().sort((a,b)=>a.level-b.level))building(p);
 if(sim.presentation?.buildMode&&s.bridge){for(let gx=-3;gx<=3;gx++)for(let gz=-3;gz<=3;gz++){let w=S.worldCell(gx,gz);box(w.x,1.28,w.z,1.52,.018,.027,gx===0?0xd5bc81:0xa6b2a0,{em:.12});box(w.x,1.28,w.z,.027,.018,1.52,gx===0?0xd5bc81:0xa6b2a0,{em:.12});}
  let p=sim.presentation?.blueprint;if(p&&S.cellValid(p.gx,p.gz)){let w=S.worldCell(p.gx,p.gz);for(let j=0;j<4;j++){let a=j*Math.PI/2;box(w.x+Math.sin(a)*.8,1.47,w.z+Math.cos(a)*.8,j%2?.045:1.64,.055,j%2?1.64:.045,p.valid?0xc0e4b8:0xe3a0a6,{em:.5});}if(p.kind!=='reclaim')building(p,true);}
 }
 if(sim.sandboxFx&&t-sim.sandboxFx.time<.6){let f=sim.sandboxFx,u=(t-f.time)/.6;for(let i=0;i<9;i++){let a=i*2.4;add('octa',f.x+Math.sin(a)*u*1.2,1.6+Math.sin(u*Math.PI)*.85,f.z+Math.cos(a)*u*1.2,.10*(1-u),.15*(1-u),.10*(1-u),0xddca98);}}
 // A worn tool is now visible in the visitor's hand, not only a counter in a panel.
 if(s.inventory.pick||s.inventory.axe){let p=sim.state.player,yaw=p.yaw;box(p.x+Math.cos(yaw)*.43,2.08,p.z-Math.sin(yaw)*.43,.075,.64,.075,0xb99664,{r:[.5,yaw,0]});box(p.x+Math.cos(yaw)*.43,2.43,p.z-Math.sin(yaw)*.43,.42,.14,.13,0xb2c8bd,{r:[0,yaw,0]});}
}
G.RealmSandboxArt={scenery,draw};
})(globalThis);
