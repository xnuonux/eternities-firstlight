/* Creates a clearly labeled, optional example save using gameplay commands.
 * Test placement moves the visitor directly; quantities are gathered/crafted, never granted.
 */
const fs=require('node:fs'),path=require('node:path'),C=require('../src/core.js'),S=require('../src/sandbox.js');
let sim=new C.Simulation(JSON.parse(fs.readFileSync(path.join(__dirname,'../artifacts/WILDWOOD_JOURNEY_SAVE.json')))),seq=0;
function run(type,payload={}){let r=sim.sandboxCommand('showcase-'+(++seq),type,payload);if(!r.ok)throw Error(type+': '+r.text);return r;}
function step(t){for(let i=0;i<t*20;i++)sim.tick(.05);}
function harvest(kind,count){for(let k=0;k<count;k++){let n=S.NODES.find(n=>n.kind===kind&&sim.state.sandbox.nodes.find(x=>x.id===n.id).hp>0);if(!n){step(181);n=S.NODES.find(n=>n.kind===kind);}sim.state.player={x:n.x+1,z:n.z,yaw:0};while(sim.state.sandbox.nodes.find(x=>x.id===n.id).hp>0){step(.5);run('gather',{node:n.id});}}}
harvest('wood',8);harvest('stone',4);harvest('fiber',4);harvest('crystal',3);
sim.state.player={x:11,z:9,yaw:0};
for(let i=0;i<8;i++)run('craft',{recipe:'plank'});
for(let i=0;i<7;i++)run('craft',{recipe:'floor'});
for(let i=0;i<3;i++)run('craft',{recipe:'wall'});
for(let i=0;i<3;i++)run('craft',{recipe:'bed'});
for(let i=0;i<2;i++)run('craft',{recipe:'lantern'});
run('craft',{recipe:'fire'});
// Nearer row: a small terrace with a workbench, warm hearth and bench.
function build(kind,gx,gz,rotation=0){let w=S.worldCell(gx,gz);sim.state.player={x:0,z:w.z,yaw:0};if(Math.hypot(w.x,w.z-sim.state.player.z)>5)throw Error('reach');run('place',{kind,gx,gz,rotation});}
for(let[gx,gz]of[[1,2],[2,2],[1,1],[2,1],[1,0],[2,0],[1,-1],[2,-1],[-1,-1],[-2,-1],[-1,0],[-2,0]])build('floor',gx,gz);
build('workbench',2,2);build('bench',2,1);build('fire',1,0);
build('wall',2,-1);build('wall',1,-1);build('wall',2,0,1);
build('lantern',1,2);build('lantern',-1,-1);
for(let[gx,gz]of[[-2,-1],[-2,0],[-1,0]]){build('bed',gx,gz);let o=sim.state.sandbox.placed.find(p=>p.kind==='bed'&&p.gx===gx&&p.gz===gz),w=S.worldCell(gx,gz);sim.state.player={x:w.x+.8,z:w.z+.4,yaw:0};run('crop',{object:o.id});run('crop',{object:o.id});}
step(91);sim.state.player={x:0,z:-35.6,yaw:Math.PI};sim.state.hour=17.3;sim.state.settings.timeFlow=false;
fs.writeFileSync(path.join(__dirname,'../artifacts/OPTIONAL_HOMESTEAD_SAVE.json'),JSON.stringify(sim.snapshot(),null,2));console.log('Example world assembled with',seq,'accepted gather/craft/build/crop commands; visitor repositioning is a visual fixture.');
