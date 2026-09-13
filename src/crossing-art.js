/* Bellweather: original procedural town, woodland, bell court and read-only actors.
 * Collision uses the same BUILDINGS/TREES catalogue as the rules module. */
(function(G){'use strict';const X=G.RealmCrossing,TAU=Math.PI*2;
function gate(a,sim){const{x,z}=X.GATE,c=sim.state.adventure.beacon.complete?0xc7d8aa:0x889487;
 for(const q of[-1,1]){a.box(x+q*1.5,3,z,.45,3,.6,0xb6b8a0);a.box(x+q*1.5,4.55,z,.70,.2,.85,0xdac8a1);a.add('octa',x+q*1.5,4.94,z,.26,.45,.25,c,{em:.55});}
 a.box(x,4.45,z,3.5,.3,.7,0xb0b3a0);a.box(x,4.7,z,3.8,.15,.9,0xc5bda2);a.box(x,1.57,z,2.4,.07,1.1,0xd1c3a5,{wet:1});}
function cottage(a,b){const y=1.5,w=b.w,d=b.d,x=b.x,z=b.z,wood=0x655a46;
 a.box(x,y+1.55,z,w,3.1,d,b.wall);a.box(x,y+.12,z,w+.1,.24,d+.1,0x949d8a);a.add('roof',x,y+3.07,z,w+.7,1.75,d+.8,b.roof);a.box(x,y+3.08,z,w+.72,.17,d+.82,wood);
 for(const s of[-1,1]){a.box(x+s*(w/2-.16),y+1.55,z+d/2+.02,.16,3.1,.14,wood);for(const f of[-1,1]){
  a.box(x+s*(w/2+.03),y+1.82,z+f*d*.27,.05,1.12,.88,0xffd8a6,{em:.34});a.box(x+s*(w/2+.065),y+1.82,z+f*d*.27,.05,.075,1.03,wood);a.box(x+s*(w/2+.065),y+1.82,z+f*d*.27,.05,1.18,.07,wood);
 }
 let xx=x+s*w*.29;a.box(xx,y+1.86,z+d/2+.03,.98,1.03,.06,0xffd9a1,{em:.42});a.box(xx,y+1.86,z+d/2+.07,1.02,.075,.06,wood);a.box(xx,y+1.86,z+d/2+.07,.075,1.08,.06,wood);a.box(xx,y+1.1,z+d/2+.13,1.2,.25,.28,0xa38460);
 for(let j=0;j<4;j++)a.add('round',xx-.43+j*.29,y+1.35,z+d/2+.16,.18,.20,.19,[0xe7c79c,0xc7a0af,0xb2bf90][j%3]);}
 a.box(x,y+1.03,z+d/2+.04,1.1,2.06,.08,0x4b655e);a.box(x,y+1.57,z+d/2+.10,.70,.46,.06,0x98b8a7);a.box(x+.34,y+.95,z+d/2+.13,.07,.08,.06,0xe2be74);
 a.box(x,y+2.65,z+d/2+.08,1.5,.35,.15,wood);a.add('octa',x,y+2.7,z+d/2+.19,.18,.24,.03,0xebc78a,{em:.2});
 for(let i=0;i<7;i++){let f=i/6,xx=x+(f-.5)*(w+.6);a.box(xx,y+3.17+(1-Math.abs(f-.5)*2)*1.75,z,.06,.055,d+.86,0xbeaf8c);}
 a.box(x-w*.27,y+4.1,z-d*.22,.66,1.8,.66,0xa1a28b);a.box(x-w*.27,y+5.05,z-d*.22,.81,.15,.8,0xcec3a0);
}
function make(a,sim){a.begin('crossing');a.e.isInterior=false;a.e.theme='bellweather';a.e.reflectionStrength=.75;const rand=G.RealmCore.rng(10017),{hex,blend}=G.RealmEngine;
 for(let z=-30;z<28;z+=1.15)for(let x=-21;x<21;x+=1.15){if(Math.abs(x-X.riverX(z))<1.5)continue;const edge=Math.abs(x)>19.7||z<-28.7||z>26.8;
 const c=blend(hex(z<0?0x4f785f:0x749465),hex(0xa1af79),.23+Math.sin(x*.15+z*.11)*.035+rand()*.035);a.box(x,edge?.53:.75,z,1.18,edge?1.06:1.5,1.18,c);if(edge)a.box(x,-.32,z,1.2,.7,1.2,0x6a8179);}
 // A gently winding stream. The bridge is the sole cross-stream walking surface.
 for(let z=-28;z<27;z+=1.1){for(const d of[-1.55,1.55])a.add('octa',X.riverX(z)+d,.78,z,.7,1.5,1.2,0x8c9d89);if(Math.floor(z)%4===0)for(const d of[-1.9,1.9])a.add('leaf',X.riverX(z)+d,1.5,z,.14,.7,.16,0x9ead82,{wind:1});}
 a.box(X.riverX(18),1.4,18,4.8,.22,3.8,0xb7b7a0,{wet:1});for(const z of[16.25,19.75]){a.box(16,2.17,z,4.7,.12,.16,0xa1a990);for(const x of[13.85,15.3,16.7,18.2])a.box(x,1.93,z,.15,.85,.16,0x8c9b89);}
 const path=(x1,z1,x2,z2,width=2.4)=>{const len=Math.hypot(x2-x1,z2-z1),yaw=Math.atan2(x2-x1,z2-z1);for(let d=0;d<=len;d+=.65)for(const n of[-1,0,1]){let x=x1+(x2-x1)*d/len+Math.cos(yaw)*n*width/3,z=z1+(z2-z1)*d/len-Math.sin(yaw)*n*width/3;if(X.walkable(x,z,.03))a.box(x,1.54,z,width/3-.04,.06,.62,[0xaeb7a1,0xc0bfa3,0x98aa98][Math.floor(rand()*3)],{r:[0,yaw,0],wet:1});}};
 for(let x=-6;x<=6;x+=.65)for(let z=5;z<=19;z+=.67)a.box(x,1.53,z,.61,.045,.63,[0xadb5a0,0xbec1a8,0x9bab96][Math.floor(rand()*3)],{wet:1,rough:.5});
 path(0,25,0,-18,2.6);path(-9,15,9,14,2);path(-10,5,10,5,1.8);path(6,18,19,18,1.7);path(-1,0,-13,-9,1.6);path(0,-14,8,-13,1.7);
 for(const b of X.BUILDINGS)cottage(a,b);
 // Stall and forge service points are outside: these houses are not fake interiors.
 for(const s of[-1,1])a.box(-9+s*1.4,2.5,14.6,.11,2,.11,0x7c684c);a.add('roof',-9,3.57,14.6,3.3,.4,2.1,0xb58b72);a.box(-9,2.06,14.3,2.9,.2,1.15,0xa18a63);for(let i=0;i<5;i++)a.add('round',-10+i*.45,2.26,14.3,.25,.23,.23,i%2?0xc98572:0xb4bc8a);
 for(const x of[-10.7,-9.3])a.box(x,1.95,4,.17,.9,.85,0x685b49);a.box(-10,2.43,4,2,.2,1.1,0xad9068);a.box(-10,2.73,4,.73,.4,.45,0x686d6a);a.box(-10,2.98,4,.94,.12,.53,0x93978c);
 a.bench(10,15.7,0,1.5);a.bench(4,12,Math.PI/2,1.5);a.bench(-4,12,-Math.PI/2,1.5);
 for(const[x,z]of[[-6,18],[6,18],[-6,5],[6,5],[0,-2],[-6,-17],[6,-17]])a.lamp(x,z,2.8,1.5);
 // Notice board and the listening stone: three separate, visible motifs.
 a.box(7,2.16,6.55,.12,1.25,.12,0x786246);a.box(7,2.8,6.55,1.65,.88,.13,0x856e4d);for(let j=0;j<3;j++)a.box(6.5+j*.5,2.85,6.64,.37,.55,.025,0xe9d8b1);
 a.add('octa',1,1.96,2.5,1.4,1.1,.8,0x91a899);a.box(1,2.4,2.66,1.04,.5,.10,0xc6c5a7);for(let j=0;j<3;j++)a.add('octa',.7+j*.3,2.45,2.73,.12,.20,.04,X.BELLS[j].color,{em:.25});
 a.add('cylinder',0,1.51,17,2.4,.15,2.4,0x839d8e);a.add('octa',0,2.24,17,.65,1.6,.62,0xb4d4c5,{em:.38});
 for(const t of X.TREES)a.tree(t[0],t[1],t[2],t[3],1.5);
 for(const o of X.SOLIDS.filter(o=>o.r>=1)){a.add('octa',o.x,1.5+o.r*.45,o.z,o.r*1.9,o.r*1.4,o.r*1.8,0x83918a);a.add('octa',o.x-.2,1.8+o.r*.55,o.z+.1,o.r, o.r*.6,o.r*1.2,0xa7b59a);}
 for(let i=0;i<210;i++){let x=(rand()-.5)*39,z=rand()*54-28;if(!X.walkable(x,z)||Math.abs(x)<3||z>2&&z<20&&Math.abs(x)<7)continue;a.add('leaf',x,1.5,z,.13,.3+rand()*.25,.12,0x89a578,{wind:1,r:[0,rand()*TAU,0]});if(i%4===0)a.add('round',x,1.87,z,.17,.18,.18,[0xeacb9c,0xbb97b1,0xb9c6d0][i%3]);}
 // The listening court. Decoration is below foot level; columns match rule blockers.
 a.add('cylinder',0,1.51,-22,12.8,.06,12.8,0x859a8c,{wet:1});a.add('cylinder',0,1.58,-22,11.6,.02,11.6,0xa5b1a0,{wet:1});
 for(let i=0;i<56;i++){let u=i*TAU/56;a.box(Math.sin(u)*5.9,1.61,-22+Math.cos(u)*5.9,.18,.03,.45,0xc9b78d,{r:[0,u,0],rough:.25});}
 for(const x of[-5,5])for(const z of[-19,-24]){a.add('cylinder',x,1.62,z,.85,3.2,.85,0xc1bfa8);a.box(x,4.88,z,1.15,.23,1.15,0xd8cbb0);a.add('octa',x,5.27,z,.25,.6,.25,0xd8bd82,{em:.2});}
 // Tower roof stretches between posts, while its central trunk is collision-authoritative.
 a.box(0,4.4,-26,1.4,5.6,1.4,0x8b9c8e);a.box(0,6.95,-26,4.4,.3,3.1,0xccbe9b);a.add('roof',0,7.1,-26,4.9,2.15,3.5,0x527b78);a.box(0,9.5,-26,.11,1,.11,0xc9b786);a.add('octa',0,10.13,-26,.28,.48,.28,0xffdeab,{em:.45});
 for(const b of X.BELLS){for(const s of[-1,1])a.box(b.x+s*.5,2.45,b.z,.10,1.7,.14,0xa19270);a.box(b.x,3.33,b.z,1.2,.12,.2,0xcab48a);a.add('cone',b.x,2.52,b.z,.7,.5,.7,0xc2a770);a.add('cylinder',b.x,2.48,b.z,.8,.11,.8,0xd9ba79);a.add('octa',b.x,1.68,b.z+.45,.32,.17,.32,b.color,{em:.2});}
 for(const s of[-1,1]){a.box(s*1.5,3,25.8,.42,3,.55,0xb4b4a0);a.box(s*1.5,4.56,25.8,.68,.2,.76,0xdcc79b);}a.box(0,4.35,25.8,3.5,.2,.65,0xbdbea6);
 // Framing cliffs and far silhouettes are backdrop, not traversable content.
 for(let i=0;i<20;i++){let x=(i-10)*7,z=-48-(i%4)*6;a.add('cone',x,0,z,18,14+i%6*3,18,0x718b88);if(i%2)a.add('cone',x,13,z,6,8,6,0xb7c3b6);}
 for(let i=0;i<7;i++){let x=-6+i*2.6;a.box(x,12,-62,1.3,10+i%3*3,1.3,0xbac3b2);a.add('cone',x,18+i%3*1.5,-62,2.2,3.5,2.2,0x829d97);}
 a.commit();
}
function draw(out,sim,t,art){const A=G.RealmAdventure,a=sim.state.adventure,s=a.crossing,r=X.runtime(sim),quiet=sim.state.settings.reducedMotion,clock=quiet?0:t;
 const add=(k,x,y,z,sx,sy,sz,c,o={})=>out[k].push({p:[x,y,z],s:[sx,sy,sz],c,...o}),box=(...v)=>add('box',...v);
 const ring=(x,z,rad,col,n=40,y=1.68)=>{for(let i=0;i<n;i++){let u=i*TAU/n;box(x+Math.sin(u)*rad,y,z+Math.cos(u)*rad,.12,.035,.22,col,{r:[0,u,0],em:.6});}};
 if(!sim.room&&s.reward){for(let j=0;j<5;j++){const x=10.25+j*.37;box(x,4.23,7.54,.025,.45+j*.06,.025,0xb6bda4);box(x+Math.sin(clock*1.5+j)*.05,3.87-j*.035,7.54,.095,.4+j*.06,.10,0xd8c69a,{rough:.25});}return;}
 if(sim.room!=='crossing')return;
 for(const q of[{x:-2,z:9,yaw:.45,color:'#b6a078',role:'keeper'},{x:9,z:14,yaw:-.5,color:'#bd8894',role:'innkeeper'},{x:-9,z:15,yaw:.5,color:'#799e9b',role:'trader'}])art.person(out,q.x,q.z,q.yaw,q.color,clock,false,q.role,false,1.57);
 // Ambient villagers have bounded authored walks, separate from quest state.
 for(let i=0;i<2;i++){const z=9+Math.sin(clock*.18+i*Math.PI)*4,x=i?3.2:-3.5;art.person(out,x,z,Math.cos(clock*.18+i*Math.PI)>0?0:Math.PI,i?'#879aaf':'#b78e69',clock,!quiet,'visitor',false,1.57);}
 if(s.attuned){ring(0,17,1.1,0xe4d9ad,30);add('octa',0,2.8+Math.sin(clock*1.6)*.1,17,.21,.55,.21,0xf4dab0,{em:1.1});}
 if(s.clapperRevealed&&!s.clapper){box(X.CLAPPER.x,1.74,X.CLAPPER.z,.6,.16,.5,0x715d49);add('round',X.CLAPPER.x,2.06,X.CLAPPER.z,.3,.57,.30,0xd2b37c);add('octa',X.CLAPPER.x,2.72+Math.sin(clock*2)*.10,X.CLAPPER.z,.23,.42,.23,0xead29d,{em:1});}
 if(s.projects.includes('lamps'))for(const x of[-4,4])for(const z of[6,18]){box(x,2.48,z,.10,1.85,.10,0x74664f);box(x,3.4,z,.34,.43,.34,0xffd794,{em:1.2});}
 if(s.projects.includes('pantry'))for(let i=0;i<3;i++){box(9.7+i*.65,1.84,14.3,.55,.52,.5,0x947452);for(let j=0;j<3;j++)add('round',9.52+i*.65+j*.17,2.14,14.3,.17,.17,.19,0xc98975);}
 if(s.repaired)for(const b of X.BELLS){const active=s.complete||r.tones.includes(b.id);if(active)ring(b.x,b.z,.57,b.color,22);if(r.tone===b.id&&a.elapsed-r.rangAt<1.5)ring(b.x,b.z,.7+(a.elapsed-r.rangAt)*1.6,b.color,36);}
 if(s.complete){for(let j=0;j<16;j++){let u=j*2.4+clock*.32;add('octa',Math.sin(u)*.75,6.9+(clock*.22+j*.24)%2.4,-26+Math.cos(u)*.75,.07,.15,.07,j%3?0xf3dca9:0xc6afd3,{em:.8});}}
 for(const e of A.runtime(sim).enemies){if(e.custom!=='bell'||e.hp<=0)continue;const col=e.flash>a.elapsed?0xffe4bd:0x768b86,yaw=e.yaw||0;
 const local=(k,x,y,z,w,h,d,c,o={})=>add(k,e.x+x*Math.cos(yaw)+z*Math.sin(yaw),1.58+y,e.z-x*Math.sin(yaw)+z*Math.cos(yaw),w,h,d,c,{...o,r:[0,yaw,o.roll||0]});
 local('round',0,1.55,0,1.9,2.65,1.6,col);local('box',0,1.1,.76,.32,1.48,.12,0xcbb080);local('octa',0,2.78,0,.78,.92,.7,0xc1bc9e);local('box',0,2.82,.35,.57,.12,.08,0xf7db9e,{em:1.2});
 for(const q of[-1,1]){local('box',q*.65,.4,0,.42,.83,.47,0x596f6a);local('box',q*1.12,1.4,0,.36,1.44,.4,col);local('octa',q*.68,2.4,-.12,.36,1.1,.34,0xa6b6a4,{roll:-q*.5});}
 for(let j=0;j<6;j++){let u=j*TAU/6+clock*.22;add('octa',e.x+Math.sin(u)*1.2,4.97,e.z+Math.cos(u)*1.2,.24,.20,.4,0xc1aa80,{r:[0,u,0],em:.24});}
 if(G.RealmCombat.runtime(sim).target===e.id)ring(e.x,e.z,1.6,0xffd99b,40);if(e.exposedUntil>a.elapsed)ring(e.x,e.z,1.76,0x9ce2be,28);
 if(e.mode==='windup'&&e.aim){if(e.ringMode==='outer'){ring(e.aim.x,e.aim.z,6.2,0xda97bf,70);ring(e.aim.x,e.aim.z,2.1,0xa3d2bf,40);for(let j=0;j<24;j++){let u=j*TAU/24;box(e.aim.x+Math.sin(u)*4.1,1.67,e.aim.z+Math.cos(u)*4.1,.09,.035,3.6,0xb383a9,{r:[0,u,0],em:.3});}}else{ring(e.aim.x,e.aim.z,2.8,0xe9a077,48);ring(e.aim.x,e.aim.z,Math.max(.2,e.timer/1.2*2.8),0xf7c9a7,36);}}
 if(!sim.presentation?.perspective){box(e.x,5.5,e.z,2,.10,.10,0x33443e);box(e.x-(1-e.hp/e.maxHP),5.52,e.z+.06,2*e.hp/e.maxHP,.075,.075,0xe1bc86,{em:.35});}
 }
 if(!quiet)for(let i=0;i<15;i++){let x=-12+(i*3.71%26),z=-7+(i*7.13%31);add('box',x,2.3+Math.sin(clock+i)*.2,z,.085,.03,.09,i%2?0xe3c896:0xc3c6b5,{r:[0,clock+i,0]});}
}
G.RealmCrossingArt={gate,make,draw};})(globalThis);
