/* Firstlight 05 — bounded, offline gathering/crafting/building domain.
 * Quantities are local game state, never authority for an online economy.
 * All timed progression uses simulation time, not a user's adjustable wall clock.
 */
(function (G) {
'use strict';
const clone = v => JSON.parse(JSON.stringify(v));
const MAX = 999, REACH = 2.75, CELL = 1.65;
const ITEMS = {
  wood:{name:'Timber',color:'#b99163',glyph:'≋'}, stone:{name:'Stone',color:'#aab8b0',glyph:'⬡'},
  fiber:{name:'Meadow fibre',color:'#a7c882',glyph:'⋔'}, crystal:{name:'Moon crystal',color:'#abbbeb',glyph:'◇'},
  plank:{name:'Planks',color:'#e0b879',glyph:'▱'}, block:{name:'Stone blocks',color:'#c5c6b2',glyph:'▰'},
  seeds:{name:'Sunberry seeds',color:'#b9bb77',glyph:'⁙'}, berry:{name:'Sunberries',color:'#d98b95',glyph:'●'},
  axe:{name:'Woodcutter’s axe',color:'#b8cbb6',glyph:'⚒'}, pick:{name:'Stone pickaxe',color:'#c3cddd',glyph:'⛏'},
  floor:{name:'Timber deck',color:'#d1ad76',glyph:'▱'}, wall:{name:'Timber wall',color:'#ad865c',glyph:'▥'},
  masonry:{name:'Stackable stone',color:'#b5c3b4',glyph:'▣'}, lantern:{name:'Garden lantern',color:'#f3d095',glyph:'✧'},
  bench:{name:'Garden bench',color:'#b99b76',glyph:'⊓'}, bed:{name:'Growing bed',color:'#a6ba83',glyph:'✿'},
  fire:{name:'Hearth',color:'#e4a479',glyph:'◉'}, workbench:{name:'Field workbench',color:'#d4bc8a',glyph:'⌑'}
};
const RECIPES = [
  {id:'plank',out:4,cost:{wood:2},station:false,desc:'Cut timber into four building planks.'},
  {id:'block',out:4,cost:{stone:2},station:false,desc:'Dress stone for sturdy construction.'},
  {id:'axe',out:1,cost:{wood:3,stone:2},station:true,unique:true,desc:'Fell regrowing timber trees twice as quickly.'},
  {id:'pick',out:1,cost:{wood:4,stone:4},station:true,unique:true,desc:'Mine stone faster and open moon-crystal seams.'},
  {id:'floor',out:2,cost:{plank:2},station:false,desc:'A deck tile. Place furniture or stack blocks on top.'},
  {id:'wall',out:1,cost:{plank:2},station:false,desc:'Rotate a timber wall with T. Keep a way through.'},
  {id:'masonry',out:2,cost:{block:2},station:false,desc:'Stack up to three blocks; a deck may sit underneath.'},
  {id:'bench',out:1,cost:{plank:3,fiber:1},station:true,desc:'A place to rest and watch the water.'},
  {id:'bed',out:1,cost:{wood:3,fiber:2},station:false,desc:'Plant sunberries, water them, then harvest.'},
  {id:'fire',out:1,cost:{stone:4,wood:2},station:false,desc:'A warm hearth for your homestead.'},
  {id:'workbench',out:1,cost:{plank:4,stone:3},station:false,desc:'Craft near your own bench on the frontier.'},
  {id:'lantern',out:1,cost:{plank:2,crystal:1},station:true,desc:'A moon-crystal light, bright after sundown.'}
];
const BUILDABLE = ['floor','wall','masonry','lantern','bench','bed','fire','workbench'];
// Existing buildings and trees remain intact. These are explicitly harvestable props.
const NODES = [
  ['timber-1','wood',-9,-13],['timber-2','wood',-15,-11],['timber-3','wood',16,-3],['timber-4','wood',15,14],
  ['stone-1','stone',4,13],['stone-2','stone',-4,10],['stone-3','stone',16,-7],
  ['fibre-1','fiber',4,10],['fibre-2','fiber',-6,-10],['fibre-3','fiber',13,14],
  ['wild-timber-1','wood',-8,-34],['wild-timber-2','wood',8,-34],['wild-timber-3','wood',-8,-42],
  ['wild-stone-1','stone',8,-41],['wild-stone-2','stone',-8,-38],
  ['wild-fibre','fiber',8,-37],['crystal-1','crystal',-5,-49],['crystal-2','crystal',5,-49]
].map(([id,kind,x,z])=>({id,kind,x,z,wild:id.startsWith('wild')||kind==='crystal'}));
const HP={wood:4,stone:4,fiber:1,crystal:4},YIELD={wood:5,stone:5,fiber:3,crystal:3};
const BRIDGE={x:0,z:-21.3,cost:{plank:8,stone:6}};
const GRID={minX:-3,maxX:3,minZ:-3,maxZ:3,cx:0,cz:-40,cell:CELL};
const STATIONS=[{x:11,z:9},{x:-5,z:-32.5}];
function worldCell(gx,gz){return{x:gx*CELL,z:GRID.cz+gz*CELL};}
function cellAt(x,z){return{gx:Math.round(x/CELL),gz:Math.round((z-GRID.cz)/CELL)};}
function cellValid(gx,gz){return Number.isInteger(gx)&&Number.isInteger(gz)&&Math.abs(gx)<=3&&Math.abs(gz)<=3;}
function frontier(x,z){return Math.hypot(x,(z+40)*.92)<11.4-.31;}
function corridor(x,z){return Math.abs(x)<1.4&&z<=-20&&z>=-30.7;}
function fresh(){return{version:1,elapsed:0,revision:0,inventory:{wood:0,stone:0,fiber:0,crystal:0,plank:0,block:0,seeds:4,berry:0,axe:0,pick:0,floor:0,wall:0,masonry:0,lantern:0,bench:0,bed:0,fire:0,workbench:0},nodes:NODES.map(n=>({id:n.id,hp:HP[n.kind],readyAt:0})),bridge:false,placed:[],nextId:1,stats:{gathered:0,crafted:0,harvested:0},milestones:[],recentCommands:[],cooldownUntil:0};}
function rectFor(p){let w=CELL*.78,d=w;if(p.kind==='floor'||p.kind==='bed')return null;if(p.kind==='wall'){w=p.rotation%2?.16:1.55;d=p.rotation%2?1.55:.16;}if(p.kind==='lantern'){w=d=.46;}return{...worldCell(p.gx,p.gz),w,d};}
function blocks(s,x,z,r=.31){return s.placed.some(p=>{let b=rectFor(p);return b&&Math.abs(x-b.x)<b.w/2+r&&Math.abs(z-b.z)<b.d/2+r;});}
function validate(raw){
 const fail=m=>{throw Error('Invalid sandbox: '+m);};
 if(!raw||raw.version!==1)fail('version');const s=fresh();
 const int=(v,max=1e8)=>Number.isSafeInteger(v)&&v>=0&&v<=max;
 if(!Number.isFinite(raw.elapsed)||raw.elapsed<0||raw.elapsed>1e8||!int(raw.revision))fail('clock or revision');
 s.elapsed=raw.elapsed;s.revision=raw.revision;
 if(!raw.inventory||typeof raw.inventory!=='object'||Array.isArray(raw.inventory))fail('inventory');
 for(const [id,v] of Object.entries(raw.inventory)){if(!Object.hasOwn(ITEMS,id)||!int(v,MAX))fail('inventory item');}
 for(const id of Object.keys(ITEMS)){const v=raw.inventory[id];if(!int(v,MAX))fail('inventory count');s.inventory[id]=v;}
 if(s.inventory.axe>1||s.inventory.pick>1)fail('unique tool');
 if(typeof raw.bridge!=='boolean')fail('bridge');s.bridge=raw.bridge;
 if(!Array.isArray(raw.nodes)||raw.nodes.length!==NODES.length||new Set(raw.nodes.map(n=>n?.id)).size!==NODES.length)fail('resource roster');
 s.nodes=NODES.map(n=>{let v=raw.nodes.find(v=>v?.id===n.id);if(!v||!int(v.hp,HP[n.kind])||!Number.isFinite(v.readyAt)||v.readyAt<0||v.readyAt>s.elapsed+240||(v.hp>0&&v.readyAt!==0))fail('resource state');return{id:n.id,hp:v.hp,readyAt:v.readyAt};});
 if(!Array.isArray(raw.placed)||raw.placed.length>160||!int(raw.nextId)||raw.nextId<1)fail('placements');
 let ids=new Set(),positions=new Set();
 s.placed=raw.placed.map(p=>{
  if(!p||!int(p.id)||p.id<1||p.id>=raw.nextId||ids.has(p.id)||!BUILDABLE.includes(p.kind)||!cellValid(p.gx,p.gz)||!int(p.rotation,3)||!int(p.level,3))fail('placed object');
  ids.add(p.id);let key=p.gx+','+p.gz+','+p.level;if(positions.has(key))fail('duplicate layer');positions.add(key);
  if(p.level===0&&p.kind!=='floor'||p.kind==='floor'&&p.level!==0||p.level>1&&p.kind!=='masonry')fail('layer type');
  if(p.gx===0&&p.kind!=='floor'&&p.kind!=='bed')fail('blocked access lane');
  let crop=null;if(p.crop!=null){if(p.kind!=='bed'||!['seeded','watered','ripe'].includes(p.crop.stage)||!Number.isFinite(p.crop.plantedAt)||p.crop.plantedAt<0||p.crop.plantedAt>s.elapsed||!Number.isFinite(p.crop.readyAt)||p.crop.readyAt<0||p.crop.readyAt>s.elapsed+95)fail('crop');crop={stage:p.crop.stage,plantedAt:p.crop.plantedAt,readyAt:p.crop.readyAt};if(crop.stage==='seeded'&&crop.readyAt!==0)fail('unwatered crop timer');}
  return{id:p.id,kind:p.kind,gx:p.gx,gz:p.gz,level:p.level,rotation:p.rotation,crop};
 });
 if(s.placed.length&&!s.bridge)fail('building before crossing');
 for(let p of s.placed)if(p.level>1&&!s.placed.some(q=>q.kind==='masonry'&&q.gx===p.gx&&q.gz===p.gz&&q.level===p.level-1))fail('unsupported stack');
 s.nextId=raw.nextId;
 for(let k of Object.keys(s.stats)){if(!raw.stats||!int(raw.stats[k]))fail('stats');s.stats[k]=raw.stats[k];}
 const keys=['gather','tool','bridge','build','crop','light'];if(!Array.isArray(raw.milestones)||new Set(raw.milestones).size!==raw.milestones.length||raw.milestones.some(k=>!keys.includes(k)))fail('milestones');s.milestones=raw.milestones.slice();
 if(!Number.isFinite(raw.cooldownUntil)||raw.cooldownUntil<0||raw.cooldownUntil>s.elapsed+1)fail('cooldown');s.cooldownUntil=raw.cooldownUntil;
 if(!Array.isArray(raw.recentCommands)||raw.recentCommands.length>128)fail('commands');
 let seen=new Set();s.recentCommands=raw.recentCommands.map(c=>{if(!c||typeof c.id!=='string'||c.id.length>100||seen.has(c.id)||typeof c.fingerprint!=='string'||c.fingerprint.length>500||!c.result||typeof c.result.ok!=='boolean'||typeof c.result.text!=='string'||c.result.text.length>240)fail('command record');seen.add(c.id);return{id:c.id,fingerprint:c.fingerprint,result:{ok:c.result.ok,text:c.result.text}};});
 return s;
}
function checkCost(s,cost){return Object.entries(cost).every(([id,n])=>s.inventory[id]>=n);}
function costText(cost){return Object.entries(cost).map(([id,n])=>n+' '+ITEMS[id].name.toLowerCase()).join(' + ');}
function pay(s,cost){for(let [id,n]of Object.entries(cost))s.inventory[id]-=n;}
function near(p,q,r=REACH){return Math.hypot(p.x-q.x,p.z-q.z)<=r;}
function station(s,p){return STATIONS.some(q=>(q.z>-30||s.bridge)&&near(p,q,4))||s.placed.some(o=>o.kind==='workbench'&&near(p,worldCell(o.gx,o.gz),4));}
function tick(s,dt){if(!Number.isFinite(dt)||dt<=0)return false;s.elapsed=Math.min(1e8,s.elapsed+Math.min(dt,.1));let changed=false;for(let n of s.nodes)if(n.hp===0&&s.elapsed>=n.readyAt){n.hp=HP[NODES.find(x=>x.id===n.id).kind];n.readyAt=0;changed=true;}for(let p of s.placed)if(p.crop?.stage==='watered'&&s.elapsed>=p.crop.readyAt){p.crop.stage='ripe';changed=true;}if(changed)s.revision++;return changed;}
// A fine bounded flood check keeps a route from the player and central lane to the bridge.
function hasExit(s,player){
 if(!frontier(player.x,player.z))return true;
 const step=.4,quant=(v)=>Math.round(v/step),key=(x,z)=>x+','+z;
 let sx=quant(player.x),sz=quant(player.z),q=[],seen=new Set();
 for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++){let x=(sx+dx)*step,z=(sz+dz)*step;if(frontier(x,z)&&!blocks(s,x,z)){q.push([sx+dx,sz+dz]);seen.add(key(sx+dx,sz+dz));}}
 for(let i=0;i<q.length&&i<5000;i++){let [a,b]=q[i],x=a*step,z=b*step;if(Math.abs(x)<.65&&z>-31.5)return true;for(let[d,e]of[[1,0],[-1,0],[0,1],[0,-1]]){let u=a+d,v=b+e,k=key(u,v);if(seen.has(k))continue;let xx=u*step,zz=v*step;if(!frontier(xx,zz)||blocks(s,xx,zz))continue;seen.add(k);q.push([u,v]);}}
 return false;
}
function placement(s,p,room,kind,gx,gz,rotation){
 if(room)return 'Building happens on the Wildwood homestead, outside.';
 if(!s.bridge)return 'Restore the northern crossing first.';
 if(!BUILDABLE.includes(kind)||!cellValid(gx,gz)||!Number.isInteger(rotation)||rotation<0||rotation>3)return 'Choose a marked homestead tile and a valid blueprint.';
 const w=worldCell(gx,gz);if(!near(p,w,5))return 'Walk within five steps of that tile.';
 if(gx===0&&!['floor','bed'].includes(kind))return 'Keep the golden central lane clear for a way home.';
 let stack=s.placed.filter(o=>o.gx===gx&&o.gz===gz),level=kind==='floor'?0:1;
 if(kind==='floor'&&stack.some(o=>o.level===0))return 'This tile already has a deck.';
 if(kind!=='floor'&&stack.some(o=>o.level>0)){if(kind==='masonry'&&stack.filter(o=>o.level>0).every(o=>o.kind==='masonry'))level=Math.max(...stack.map(o=>o.level))+1;else return 'Reclaim the object on this tile first.';}
 if(level>3)return 'Three stone blocks is the current height limit.';
 if(s.placed.length>=160)return 'The homestead has reached its object limit.';
 let obj={id:s.nextId,kind,gx,gz,level,rotation,crop:null},b=rectFor(obj);
 if(b&&Math.abs(p.x-b.x)<b.w/2+.4&&Math.abs(p.z-b.z)<b.d/2+.4)return 'Move off this tile before building.';
 let trial={...s,placed:[...s.placed,obj]};if(!hasExit(trial,p))return 'That would close your way back. Leave a passage.';
 return obj;
}
function command(s,p,room,id,type,payload={}){
 const fail=text=>({ok:false,text});
 if(typeof id!=='string'||!id.length||id.length>100)return fail('Invalid command identity.');
 // Only known scalar payload fields participate; arbitrary nested user data is not retained.
 const a={node:payload.node??null,recipe:payload.recipe??null,kind:payload.kind??null,gx:payload.gx??null,gz:payload.gz??null,rotation:payload.rotation??null,object:payload.object??null};
 if(Object.values(a).some(v=>v!==null&&typeof v!=='string'&&typeof v!=='number'))return fail('Invalid command fields.');
 const fingerprint=JSON.stringify({type,...a});if(fingerprint.length>500)return fail('Command too long.');
 const old=s.recentCommands.find(c=>c.id===id);if(old)return old.fingerprint===fingerprint?{...old.result,duplicate:true}:fail('A command identity cannot be reused for another action.');
 if(!p||!Number.isFinite(p.x)||!Number.isFinite(p.z))return fail('No valid player position.');
 let result;
 const townBench=room==='crossing'&&type==='craft'&&G.RealmCrossing&&Math.hypot(p.x+10,p.z-5)<2.8;
 if(room&&!townBench)result=fail('This activity belongs outside. Your room tools still work separately.');
 else if(type==='gather'){
  let node=NODES.find(n=>n.id===a.node),n=s.nodes.find(n=>n.id===a.node);
  if(!node||!n)result=fail('Unknown resource.');
  else if(node.wild&&!s.bridge||!near(p,node))result=fail('Walk closer to the resource.');
  else if(n.hp===0)result=fail('This resource is regrowing. Try another nearby.');
  else if(s.elapsed<s.cooldownUntil)result=fail('Finish this swing first.');
  else if(node.kind==='crystal'&&!s.inventory.pick)result=fail('Moon crystal needs a stone pickaxe.');
  else if(s.inventory[node.kind]+YIELD[node.kind]>MAX||node.kind==='fiber'&&s.inventory.seeds+1>MAX)result=fail('Your pack is full for this resource.');
  else{let power=node.kind==='wood'&&s.inventory.axe||['stone','crystal'].includes(node.kind)&&s.inventory.pick?2:1;n.hp=Math.max(0,n.hp-power);s.cooldownUntil=s.elapsed+.4;if(n.hp===0){s.inventory[node.kind]+=YIELD[node.kind];if(node.kind==='fiber')s.inventory.seeds++;n.readyAt=s.elapsed+(node.kind==='crystal'?180:node.kind==='wood'?120:90);s.stats.gathered+=YIELD[node.kind];result={ok:true,text:'+'+YIELD[node.kind]+' '+ITEMS[node.kind].name+(node.kind==='fiber'?' · +1 seed':'')};}else result={ok:true,text:(node.kind==='wood'?'Chop':'Mine')+' · '+n.hp+' strength remaining'};}
 }else if(type==='craft'){
  let r=RECIPES.find(r=>r.id===a.recipe);
  if(!r)result=fail('Unknown recipe.');else if(r.station&&!townBench&&!station(s,p))result=fail('This recipe needs Oren’s or your field workbench.');
  else if(r.unique&&s.inventory[r.id])result=fail('You already have this tool; it does not break.');
  else if(!checkCost(s,r.cost))result=fail('Needed: '+costText(r.cost)+'.');else if(s.inventory[r.id]+r.out>MAX)result=fail('Your pack is full for that item.');
  else{pay(s,r.cost);s.inventory[r.id]+=r.out;s.stats.crafted++;result={ok:true,text:'Crafted '+r.out+' × '+ITEMS[r.id].name};}
 }else if(type==='bridge'){
  if(s.bridge)result=fail('The crossing is already restored.');else if(!near(p,BRIDGE,3.5))result=fail('Walk to the broken northern crossing.');else if(!checkCost(s,BRIDGE.cost))result=fail('Crossing needs '+costText(BRIDGE.cost)+'.');else{pay(s,BRIDGE.cost);s.bridge=true;result={ok:true,text:'Wildwood Reach is open. A new shore to make your own.'};}
 }else if(type==='place'){
  const candidate=placement(s,p,room,a.kind,a.gx,a.gz,a.rotation);
  if(typeof candidate==='string')result=fail(candidate);else if(!s.inventory[a.kind])result=fail('Craft this object before placing it.');else{s.inventory[a.kind]--;s.placed.push(candidate);s.nextId++;result={ok:true,text:ITEMS[a.kind].name+' placed. Reclaim returns the crafted item.'};}
 }else if(type==='reclaim'){
  let stack=s.placed.filter(o=>o.gx===a.gx&&o.gz===a.gz).sort((a,b)=>b.level-a.level),o=stack[0];
  if(!o)result=fail('Nothing is built on this tile.');else if(!near(p,worldCell(o.gx,o.gz),5))result=fail('Walk closer before reclaiming.');else if(o.crop)result=fail('Harvest the growing bed before reclaiming it.');else if(s.inventory[o.kind]>=MAX)result=fail('Your pack is full for that object.');else{s.placed=s.placed.filter(p=>p.id!==o.id);s.inventory[o.kind]++;result={ok:true,text:ITEMS[o.kind].name+' returned to your pack.'};}
 }else if(type==='crop'){
  const o=s.placed.find(o=>o.id===a.object&&o.kind==='bed');
  if(!o||!near(p,worldCell(o.gx,o.gz)))result=fail('Walk to a growing bed.');
  else if(!o.crop){if(!s.inventory.seeds)result=fail('Gather meadow fibre for more seeds.');else{s.inventory.seeds--;o.crop={stage:'seeded',plantedAt:s.elapsed,readyAt:0};result={ok:true,text:'Seed planted. Interact again to water it.'};}}
  else if(o.crop.stage==='seeded'){o.crop.stage='watered';o.crop.readyAt=s.elapsed+90;result={ok:true,text:'Watered. Sunberries ripen after 90 seconds of active world time.'};}
  else if(o.crop.stage==='watered')result=fail('Growing · '+Math.ceil(Math.max(0,o.crop.readyAt-s.elapsed))+' seconds to harvest.');
  else if(s.inventory.berry+3>MAX||s.inventory.seeds+2>MAX)result=fail('Make room for three berries and two seeds.');
  else{s.inventory.berry+=3;s.inventory.seeds+=2;s.stats.harvested++;o.crop=null;result={ok:true,text:'Harvested 3 sunberries + 2 seeds. The bed is ready again.'};}
 }else result=fail('Unknown sandbox action.');
 if(result.ok){s.revision++;for(const m of objectives(s))if(m.done&&!s.milestones.includes(m.id))s.milestones.push(m.id);}
 s.recentCommands.push({id,fingerprint,result:{...result}});if(s.recentCommands.length>128)s.recentCommands.shift();
 return result;
}
function objectives(s){return[
 {id:'gather',title:'Gather your first materials',detail:'Timber, stone and meadow fibre grow around the village.',done:s.stats.gathered>=10},
 {id:'tool',title:'Make a stone pickaxe',detail:'Bring 4 timber + 4 stone to Oren’s workbench.',done:!!s.inventory.pick},
 {id:'bridge',title:'Restore the northern crossing',detail:'8 planks + 6 stone. The broken bridge is north of the stage.',done:s.bridge},
 {id:'build',title:'Make a place in Wildwood',detail:'Craft a deck and a piece of furniture, then build on marked tiles.',done:s.placed.some(p=>p.kind==='floor')&&s.placed.some(p=>p.kind!=='floor')},
 {id:'crop',title:'Grow your first sunberries',detail:'Place a growing bed. Plant, water, and come back in 90 seconds.',done:s.stats.harvested>0},
 {id:'light',title:'Leave a light beside the water',detail:'Mine moon crystal, craft a lantern, and place it on the homestead.',done:s.placed.some(p=>p.kind==='lantern')}
 ];}
G.RealmSandbox={ITEMS,RECIPES,BUILDABLE,NODES,HP,YIELD,MAX,REACH,GRID,BRIDGE,STATIONS,worldCell,cellAt,cellValid,frontier,corridor,fresh,validate,blocks,rectFor,checkCost,costText,station,tick,placement,command,objectives,hasExit};
if(typeof module!=='undefined')module.exports=G.RealmSandbox;
})(globalThis);
