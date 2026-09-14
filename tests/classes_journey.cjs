/* Command-earned chosen-class outing. Imported worlds are labelled; no direct progression grants. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),cp=require('node:child_process');
const C=require('../src/core.js'),R=require('../src/characters.js');
const ROOT=path.join(__dirname,'../evidence10/classes');fs.mkdirSync(ROOT,{recursive:true});
const repo=path.join(__dirname,'..');
function run(){
 if(!process.argv.includes('--sources-ready')){cp.execFileSync(process.execPath,['tests/pursuit_journey.cjs'],{cwd:repo,stdio:'ignore'});cp.execFileSync(process.execPath,['tests/pursuit_journey.cjs','--bow'],{cwd:repo,stdio:'ignore'});}
 const blade=JSON.parse(fs.readFileSync(path.join(repo,'evidence10/pursuit/fresh-blade/07_PRACTICE_PERSISTED.json')));
 const bow=JSON.parse(fs.readFileSync(path.join(repo,'evidence10/pursuit/fresh-bow/07_PRACTICE_PERSISTED.json')));
 const data=new Map(),storage={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,String(v))},store=new R.Store(storage);store.load();store.writer=true;let current=C.fresh(),n=0,actions=[];
 const roster=(world)=>{const r=store.command('import',{world},current,store.revision);assert.equal(r.ok,true,r.error);current=r.state;actions.push({type:'import',active:store.active});return store.active;};
 const save=()=>{const r=store.save(current);assert.equal(r.ok,true,r.error);};
 const cmd=(type,p={},label=type)=>{const sim=new C.Simulation(current),r=sim.adventureCommand('classes-'+label+'-'+(++n),type,p);assert.equal(r.ok,true,type+': '+r.error);current=sim.snapshot();save();actions.push({type,label,active:store.active});return r;};
 const refused=(type,p={},label=type)=>{const before=JSON.stringify(current),sim=new C.Simulation(current),r=sim.adventureCommand('classes-'+label+'-'+(++n),type,p);assert.equal(r.ok,false);assert.equal(JSON.stringify(sim.snapshot()),before);return r;};
 const core=(type,p={},label=type)=>{const sim=new C.Simulation(current),r=sim.act('classes-'+label+'-'+(++n),type,p);assert.equal(r.ok,true,type+': '+r.error);current=sim.snapshot();save();actions.push({type,label,active:store.active});return r;};
 const move=(x,z)=>{const sim=new C.Simulation(current),r=sim.moveTo(x,z);assert.equal(r.ok,true,r.error);for(let i=0;i<7000&&sim.playerPath.length;i++)sim.tick(.05);assert.ok(Math.hypot(sim.state.player.x-x,sim.state.player.z-z)<.3);current=sim.snapshot();save();};
 const bladeId=roster(blade),bowId=roster(bow);assert.notEqual(bladeId,bowId);
 // Oren's class choice is made once per imported character, without granting gear or XP.
 const bladeBefore={xp:current.adventure.xp,owned:[...current.adventure.owned],soul:JSON.stringify(current.adventure.beacon.soul)};
 cmd('class-choose',{id:'magician',confirm:true},'magician-choose');assert.equal(current.adventure.classPath.choice,'magician');assert.equal(current.adventure.xp,bladeBefore.xp);assert.deepEqual(current.adventure.owned,bladeBefore.owned);assert.equal(JSON.stringify(current.adventure.beacon.soul),bladeBefore.soul);
 move(15,7);cmd('starter-enter',{},'magician-enter');cmd('target-select',{id:'river-practice'},'magician-target');cmd('arcane-flare',{},'magician-technique');assert.ok(current.adventure.classPath.readyAt>current.adventure.elapsed);move(15,7);cmd('starter-leave',{},'magician-leave');
 const magician=JSON.parse(JSON.stringify(current));refused('class-choose',{id:'hunter',confirm:true},'repeat-choice');
 const switched=store.command('switch',{id:bowId},current,store.revision);assert.equal(switched.ok,true,switched.error);current=switched.state;save();
 const bowBefore={xp:current.adventure.xp,owned:[...current.adventure.owned],soul:JSON.stringify(current.adventure.beacon.soul)};
 cmd('class-choose',{id:'hunter',confirm:true},'hunter-choose');assert.equal(current.adventure.classPath.choice,'hunter');assert.equal(current.adventure.xp,bowBefore.xp);assert.deepEqual(current.adventure.owned,bowBefore.owned);assert.equal(JSON.stringify(current.adventure.beacon.soul),bowBefore.soul);
 move(15,7);cmd('starter-enter',{},'hunter-enter');cmd('target-select',{id:'river-practice'},'hunter-target');cmd('quarry-mark',{},'hunter-technique');assert.ok(current.adventure.classPath.readyAt>current.adventure.elapsed);move(15,7);cmd('starter-leave',{},'hunter-leave');
 const bowFinal=JSON.parse(JSON.stringify(current));assert.notEqual(magician.adventure.classPath.choice,bowFinal.adventure.classPath.choice);const cold=new R.Store(storage),loaded=cold.load();assert.equal(cold.active,bowId);assert.equal(loaded.state.adventure.classPath.choice,'hunter');assert.deepEqual(loaded.state.adventure.classPath,bowFinal.adventure.classPath);
 const report={status:'passed',variant:'imported-command-earned-class-outing',sources:{blade:'evidence10/pursuit/fresh-blade/07_PRACTICE_PERSISTED.json',bow:'evidence10/pursuit/fresh-bow/07_PRACTICE_PERSISTED.json'},characters:{magician:bladeId,hunter:bowId},commands:n,actions,checks:{magicianChoice:magician.adventure.classPath.choice,hunterChoice:bowFinal.adventure.classPath.choice,bladeGearUnchanged:magician.adventure.owned.length===bladeBefore.owned.length,bowGearUnchanged:bowFinal.adventure.owned.length===bowBefore.owned.length,reloadChoice:loaded.state.adventure.classPath.choice==='hunter',independent:true}};fs.writeFileSync(path.join(ROOT,'CLASSES_JOURNEY_REPORT.json'),JSON.stringify(report,null,2));return report;
}
if(require.main===module)run();
module.exports={run};
