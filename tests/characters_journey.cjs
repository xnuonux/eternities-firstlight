/* Command-earned independent character roster journey. Automated ticks are not human pacing evidence. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),cp=require('node:child_process'),crypto=require('node:crypto');
const C=require('../src/core.js'),R=require('../src/characters.js');
const ROOT=path.join(__dirname,'../evidence10/characters');fs.mkdirSync(ROOT,{recursive:true});
const repo=path.join(__dirname,'..');

function run(){
  // These prerequisite worlds are produced by the existing legal movement/gather/combat journeys.
  if(!process.argv.includes('--sources-ready')){
    cp.execFileSync(process.execPath,['tests/pursuit_journey.cjs'],{cwd:repo,stdio:'ignore'});
    cp.execFileSync(process.execPath,['tests/pursuit_journey.cjs','--bow'],{cwd:repo,stdio:'ignore'});
  }
  const blade=JSON.parse(fs.readFileSync(path.join(repo,'evidence10/pursuit/fresh-blade/run1_03_OBJECTIVES.json')));
  const bow=JSON.parse(fs.readFileSync(path.join(repo,'evidence10/pursuit/fresh-bow/run1_03_OBJECTIVES.json')));
  const storage=new Map();const mem={getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,String(v))};
  const store=new R.Store(mem);const loaded=store.load();assert.equal(loaded.status,'new');store.writer=true;
  let current=loaded.state,serial=0,actions=[];
  const save=()=>{const r=store.save(current);assert.equal(r.ok,true,r.error);actions.push({save:true,revision:store.revision});};
  const command=(type,p)=>{const r=store.command(type,p,current,store.revision);assert.equal(r.ok,true,r.error);current=r.state;actions.push({type:type,id:p?.id||null,world:type==='import'?'command-earned-source':undefined,active:store.active});return r;};
  const game=(type,p,id='game')=>{const sim=new C.Simulation(current),r=sim.adventureCommand('characters-'+id+'-'+(++serial),type,p);assert.equal(r.ok,true,r.error);current=sim.snapshot();save();return r;};
  const refused=(type,p,id)=>{const before=JSON.stringify(current),sim=new C.Simulation(current),r=sim.adventureCommand('characters-'+id+'-'+(++serial),type,p);assert.equal(r.ok,false);assert.equal(JSON.stringify(sim.snapshot()),before);return r;};
  const core=(type,p,id='core')=>{const sim=new C.Simulation(current),r=sim.act('characters-'+id+'-'+(++serial),type,p);assert.equal(r.ok,true,r.error);current=sim.snapshot();save();return r;};
  const snap=name=>fs.writeFileSync(path.join(ROOT,name+'.json'),JSON.stringify(current,null,2));
  // Character 1 is created by the production create path, then retained as a clean baseline.
  command('create',{visitor:{name:'River',skin:1,cloak:2,hair:0}}); // character-2, fresh world
  const clean=current;
  save();snap('01_NEW_CHARACTER');
  // Import only command-earned worlds, assigning fresh monotonic IDs through the roster boundary.
  command('import',{world:blade});const bladeId=store.active;const bladeRun=blade.adventure.pursuit.active.id;snap('02_BLADE_IMPORTED');
  command('delete',{id:'character-1',confirmName:'Visitor'});
  command('import',{world:bow});const bowId=store.active;const bowRun=bow.adventure.pursuit.active.id;snap('03_BOW_IMPORTED');
  assert.notEqual(bladeId,bowId);assert.equal(bladeRun,bowRun,'same earned run identity is expected across independent worlds');
  const roster=store.describe(current);assert.equal(roster.slots.length,3);assert.deepEqual(new Set(roster.slots.map(s=>s.id)),new Set(['character-2','character-3','character-4']));
  // Mutate the active bow world through the normal core command, then persist and switch away.
  const note={text:'Bow world only',day:current.day};core('note',{text:note.text},'note');
  const score=new C.Simulation(current).state.score;score.title='Bow world score';core('set-score',{score,expectedRevision:current.scoreRevision},'score');
  const home=new C.Simulation(current).state.retreat;home.wall='rose';core('decorate',{expectedRevision:home.revision,home},'decorate');
  core('appearance',{visitor:{name:'Bow Keeper',skin:4,cloak:1,hair:2}},'appearance');
  const bowBeforeSwitch=current;
  command('switch',{id:bladeId});assert.equal(current.visitor.name,blade.visitor.name);assert.equal(current.notes.some(n=>n.text==='Bow world only'),false);
  game('pursuit-claim',{run:bladeRun},'blade-claim');const bladePaid=current.adventure.ore;
  // Blade and bow retain their own progression, housing, notes and pursuit records.
  assert.equal(current.adventure.equipment.weapon,blade.adventure.equipment.weapon);assert.equal(current.adventure.pursuit.claimed,blade.adventure.pursuit.claimed+1);assert.equal(current.adventure.pursuit.active,null);
  command('switch',{id:bowId});assert.equal(current.adventure.equipment.weapon,bow.adventure.equipment.weapon);assert.ok(current.notes.some(n=>n.text==='Bow world only'));
  game('pursuit-claim',{run:bowRun},'bow-claim');const bowPaid=current.adventure.ore;assert.equal(current.adventure.pursuit.active,null);
  refused('pursuit-claim',{run:bowRun},'bow-duplicate');
  assert.equal(current.adventure.pursuit.claimed,bowBeforeSwitch.adventure.pursuit.claimed+1);assert.equal(current.adventure.pursuit.claimed,bow.adventure.pursuit.claimed+1);
  // Cold reload must select the last active character and preserve the outgoing safe checkpoint.
  const bytes=mem.getItem(R.KEY),cold=new R.Store(mem),coldLoaded=cold.load();assert.equal(cold.active,bowId);assert.deepEqual(coldLoaded.state,current);assert.equal(mem.getItem(R.KEY),bytes);
  const report={status:'passed',variant:'imported-command-earned-independent-roster',slots:roster.slots.map(s=>s.id),active:cold.active,bladeId,bowId,sameRunId:bladeRun,independentSnapshots:true,sourceWorlds:{blade:'evidence10/pursuit/fresh-blade/run1_03_OBJECTIVES.json',bow:'evidence10/pursuit/fresh-bow/run1_03_OBJECTIVES.json'},sourceHashes:{blade:crypto.createHash('sha256').update(JSON.stringify(blade)).digest('hex'),bow:crypto.createHash('sha256').update(JSON.stringify(bow)).digest('hex')},commands:actions.length,actions,checks:{cleanCharacterNoProgress:clean.adventure.pursuit.claimed===0,bladeEquipment:blade.adventure.equipment.weapon,bowEquipment:bow.adventure.equipment.weapon,bladeClaimed:bladePaid,bowClaimed:bowPaid,reloadActive:cold.active===bowId,outgoingCheckpoint:JSON.stringify(current)===JSON.stringify(coldLoaded.state)}};
  fs.writeFileSync(path.join(ROOT,'CHARACTERS_JOURNEY_REPORT.json'),JSON.stringify(report,null,2));return report;
}
if(require.main===module)console.log(JSON.stringify(run(),null,2));
module.exports={run};
