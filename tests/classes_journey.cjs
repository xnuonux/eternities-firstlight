/* Imported command-earned worlds, followed by new class play and complete repeat surveys. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),cp=require('node:child_process'),crypto=require('node:crypto');
const C=require('../src/core.js'),R=require('../src/characters.js'),A=require('../src/adventure.js'),AR=require('../src/arsenal.js'),Q=require('../src/starter.js'),T=require('../src/combat.js'),K=require('../src/classes.js');
const ROOT=path.join(__dirname,'../evidence10/classes'),repo=path.join(__dirname,'..');fs.mkdirSync(ROOT,{recursive:true});
const read=variant=>{const source=path.join(repo,'evidence10/pursuit',variant,'07_PRACTICE_PERSISTED.json'),bytes=fs.readFileSync(source);return{source:path.relative(repo,source).replaceAll('\\','/'),sha256:crypto.createHash('sha256').update(bytes).digest('hex'),world:JSON.parse(bytes)}};
function outing(base,choice){
 let sim=new C.Simulation(base),serial=0;const actions=[],combats=[],refusals=[],legacy=sim.snapshot();
 const cmd=(type,p={})=>{const r=sim.adventureCommand('earned-class-'+choice+'-'+(++serial),type,p);assert.ok(r.ok,type+': '+r.error);actions.push({type,p});return r;};
 const tick=t=>{for(let i=0;i<Math.ceil(t/.05);i++)sim.tick(.05);};
 const walk=(x,z)=>{const r=sim.moveTo(x,z);assert.ok(r.ok,r.error);for(let i=0;i<7000&&sim.playerPath.length;i++)tick(.05);assert.ok(Math.hypot(sim.state.player.x-x,sim.state.player.z-z)<.3);assert.ok(sim.state.adventure.hp>0);actions.push({walk:[x,z]});};
 const reload=()=>{const save=sim.snapshot();sim=new C.Simulation(save);assert.deepEqual(sim.snapshot(),save);actions.push({reload:true});};
 const home=()=>{walk(0,12);cmd('starter-leave');walk(11,9);};
 const enter=()=>{walk(15,7);cmd('starter-enter');};
 const reject=(type,p)=>{const before=JSON.stringify(sim.snapshot()),r=sim.adventureCommand('refused-'+choice+'-'+(++serial),type,p);assert.equal(r.ok,false);assert.equal(JSON.stringify(sim.snapshot()),before);refusals.push(type);};
 walk(11,9);cmd('class-choose',{id:choice,confirm:true});reject('class-choose',{id:choice==='hunter'?'magician':'hunter',confirm:true});
 for(const k of ['xp','owned','equipment','arsenal','starter','pursuit','beacon','road','crossing','companion'])assert.deepEqual(sim.state.adventure[k],legacy.adventure[k],k);
 const comparison={weapon:sim.state.adventure.equipment.weapon,attack:A.stats(sim.state.adventure).attack,...K.preview(sim.state.adventure,choice)};
 // A real practice impact pays cooldown, which survives a safe checkpoint reload.
 enter();walk(-5,11.5);cmd('target-select',{id:'river-practice'});cmd('class-technique');if(choice==='hunter'){cmd('attack',{target:'river-practice'});tick(.2);}
 const practiceDamage=A.runtime(sim).training.lastDamage,expected=choice==='hunter'?comparison.attack+comparison.bonus:comparison.damage;assert.equal(practiceDamage,expected);cmd('target-clear');
 const cooldown=sim.state.adventure.classPath.readyAt;reload();assert.equal(sim.state.adventure.classPath.readyAt,cooldown);reject('class-choose',{id:'hunter',confirm:true});
 walk(0,3);cmd('rest');walk(11,9);const prior=sim.state.adventure.pursuit.claimed;cmd('pursuit-start',{after:prior});const run=sim.state.adventure.pursuit.active.id;enter();
 function fight(objective){
  let e=A.runtime(sim).enemies.find(e=>e.objective===objective);const id=e.id;cmd('target-select',{id});let casts=0,guards=0,ticks=0,impacts=[];
  const hitStart=T.runtime(sim).serial;
  for(;ticks<4000&&!sim.state.adventure.pursuit.active.defeated.includes(objective);ticks++){
   e=A.runtime(sim).enemies.find(e=>e.id===id);const a=sim.state.adventure,p=sim.state.player,w=AR.weapon(a),t=T.runtime(sim),d=K.definition(a);
   assert.ok(a.hp>0,'survived '+id);if(a.hp<48&&a.tonics&&a.elapsed>=A.runtime(sim).cooldowns.heal)cmd('heal');
   if(a.elapsed>=a.classPath.readyAt&&a.stamina>=d.cost&&Math.hypot(p.x-e.x,p.z-e.z)<=d.range&&AR.aimClear(sim,p,e)){cmd('class-technique');casts++;}
   if(e.hp<=0)break;
   if(!T.runtime(sim).auto)cmd('auto-toggle');
   if(e.mode==='windup'&&a.stamina>=20&&a.elapsed>=t.cooldowns.guard){cmd('guard');guards++;}
   if(!sim.playerPath.length&&(Math.hypot(p.x-e.x,p.z-e.z)>=w.reach-.2||!AR.aimClear(sim,p,e))){
    const radius=w.style==='bow'?5:1.6;let moved=false;for(let j=0;j<16;j++){const q={x:e.x+Math.sin(j*Math.PI/8)*radius,z:e.z+Math.cos(j*Math.PI/8)*radius};if(Q.walkable(q.x,q.z)&&AR.aimClear(sim,q,e)&&sim.moveTo(q.x,q.z).ok){actions.push({walk:[q.x,q.z],combat:true});moved=true;break;}}assert.ok(moved,'legal approach '+id);
   }tick(.1);impacts.push(...T.runtime(sim).hits.filter(h=>h.id>hitStart&&!impacts.some(q=>q.id===h.id)).map(h=>({...h})));
  }
  assert.ok(sim.state.adventure.pursuit.active.defeated.includes(objective),'cleared '+id);combats.push({id,casts,guards,ticks,impacts,hp:sim.state.adventure.hp});cmd('target-clear');
 }
 walk(-7,3);fight('west');walk(-7,3);cmd('pursuit-sample',{run,id:'west-sample'});walk(5,-3);fight('east');walk(5,-11);cmd('pursuit-sample',{run,id:'east-sample'});home();
 const objectives=sim.snapshot();fs.writeFileSync(path.join(ROOT,choice+'_OBJECTIVES.json'),JSON.stringify(objectives,null,2));reload();
 const a=sim.state.adventure,before={ore:a.ore,coins:a.coins,fiber:sim.state.sandbox.inventory.fiber};cmd('pursuit-claim',{run});assert.equal(a.pursuit.claimed,prior+1);assert.equal(a.ore,before.ore+3);assert.equal(a.coins,before.coins+4);assert.equal(sim.state.sandbox.inventory.fiber,before.fiber+2);reject('pursuit-claim',{run});reject('pursuit-start',{after:prior});reload();
 const final=sim.snapshot();for(const k of ['xp','owned','equipment','arsenal','starter','beacon','road','crossing','companion'])assert.deepEqual(final.adventure[k],legacy.adventure[k],k);for(const k of ['notes','score','retreat','visitor','flowers'])assert.deepEqual(final[k],legacy[k],k);
 fs.writeFileSync(path.join(ROOT,choice+'_COMPLETE.json'),JSON.stringify(final,null,2));return{final,commands:serial,accepted:actions.filter(a=>a.type).length,refused:refusals.length,run,comparison,practiceDamage,combats,actions,refusals};
}
function run(){
 if(!process.argv.includes('--sources-ready'))for(const args of [[],['--bow'],['--veteran']])cp.execFileSync(process.execPath,['tests/pursuit_journey.cjs',...args],{cwd:repo,stdio:'ignore'});
 const blade=read('fresh-blade'),bow=read('fresh-bow'),veteran=read('veteran'),map=new Map(),storage={getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,String(v))},store=new R.Store(storage);store.load();store.writer=true;
 let current=C.fresh();const roster=(type,p)=>{const r=store.command(type,p,current,store.revision);assert.ok(r.ok,r.error);current=r.state;return store.active;};
 const bladeId=roster('import',{world:blade.world}),m=outing(current,'magician');current=m.final;assert.ok(store.save(current).ok);
 const bowId=roster('import',{world:bow.world}),h=outing(current,'hunter');current=h.final;assert.ok(store.save(current).ok);
 roster('switch',{id:bladeId});assert.equal(current.adventure.classPath.choice,'magician');assert.deepEqual(current,m.final);roster('switch',{id:bowId});assert.deepEqual(current,h.final);
 const unused=store.record.slots.find(s=>s.id==='character-1');roster('delete',{id:unused.id,confirmName:unused.world.visitor.name});const veteranId=roster('import',{world:veteran.world}),v=new C.Simulation(current),vBefore=v.snapshot();
 const move=v.moveTo(11,9);assert.ok(move.ok);for(let i=0;i<7000&&v.playerPath.length;i++)v.tick(.05);const choice=v.adventureCommand('earned-veteran-class','class-choose',{id:'hunter',confirm:true});assert.ok(choice.ok,choice.error);
 for(const k of ['owned','equipment','arsenal','xp','pursuit','starter','road','beacon','crossing','companion'])assert.deepEqual(v.state.adventure[k],vBefore.adventure[k],k);current=v.snapshot();assert.ok(store.save(current).ok);
 const veteranComparison={weapon:current.adventure.equipment.weapon,xp:current.adventure.xp,...K.preview(current.adventure,'hunter')};roster('switch',{id:bowId});const cold=new R.Store(storage),loaded=cold.load();assert.equal(cold.active,bowId);assert.deepEqual(loaded.state,h.final);
 const report={status:'passed',variant:'imported-command-earned-worlds-with-new-complete-class-surveys',positionEdits:0,inventoryGrants:0,plantedDefeats:0,acceleratedTick:true,sources:Object.fromEntries([['blade',blade],['bow',bow],['veteran',veteran]].map(([k,{source,sha256}])=>[k,{source,sha256}])),characters:{magician:bladeId,hunter:bowId,veteran:veteranId},commands:{accepted:m.accepted+h.accepted+1,refused:m.refused+h.refused},magician:m,hunter:h,veteranComparison,checks:{distinctSameRunClaims:m.run===h.run,independentClassRestoration:true,veteranPreserved:true,cooldownReload:true}};
 delete report.magician.final;delete report.hunter.final;fs.writeFileSync(path.join(ROOT,'CLASSES_JOURNEY_REPORT.json'),JSON.stringify(report,null,2));return report;
}
if(require.main===module){const r=run();console.log(JSON.stringify({...r,magician:{...r.magician,actions:undefined},hunter:{...r.hunter,actions:undefined}},null,2));}module.exports={run};
