/* Command-earned continuation of Fenna's delivery. No planted progress or position edits. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const C=require('../src/core.js'),E=require('../src/earth.js'),N=require('../src/earth-notes.js');
const ROOT=path.resolve(__dirname,'..');
function run({bow=false,veteran=false}={}){
 const variant=veteran?'veteran-mill':bow?'fresh-bow-quarry':'fresh-blade-detour',out=path.join(ROOT,'evidence10/earth-notes/journey',variant);fs.mkdirSync(out,{recursive:true});
 if(!process.argv.includes('--sources-ready'))require('./earth_story_journey.cjs').run({bow,veteran});
 const source=path.join(ROOT,'evidence10/earth-story/journey',variant,'05_ARRIVED_UNPAID.json');let sim=new C.Simulation(JSON.parse(fs.readFileSync(source,'utf8'))),serial=0,actions=[];
 const walk=(x,z)=>{assert.ok(sim.moveTo(x,z).ok);for(let i=0;i<9000&&sim.playerPath.length;i++)sim.tick(.05);assert.ok(Math.hypot(sim.state.player.x-x,sim.state.player.z-z)<.3);actions.push({walk:[x,z]});};
 const command=(type,p={})=>{const r=sim.adventureCommand('earned-notes-'+variant+'-'+(++serial),'earth-notes-'+type,p);assert.ok(r.ok,type+': '+r.error);actions.push({type,p});};
 const snap=name=>fs.writeFileSync(path.join(out,name+'.json'),JSON.stringify(sim.snapshot(),null,2)+'\n');
 function table(){if(sim.room===E.ROOM)assert.ok(E.leave(sim).ok);if(!sim.room){walk(9,-5.8);assert.ok(sim.enter('observatory').ok);}walk(N.TABLE.x,N.TABLE.z);}
 function enterEarth(){if(sim.room)assert.ok(sim.leave().ok);walk(0,23);const ctx={sim,active:'character-1',revision:1},p=E.preview(ctx);assert.ok(p.ok,p.error);assert.ok(E.enter(p.ticket,ctx,{save:()=>({ok:true}),build:()=>{}}).ok);}
 function reload(){const saved=sim.snapshot();sim=new C.Simulation(saved);assert.deepEqual(sim.snapshot(),saved);actions.push({reload:true});}
 const before=sim.snapshot();snap('01_SOURCE');table();command('accept');snap('02_ACCEPTED');reload();enterEarth();
 for(const [i,p]of N.MARKS.entries()){walk(p.x,p.z);command('observe',{id:p.id});snap('03_MARK_'+(i+1));reload();enterEarth();}
 table();const wrong=sim.snapshot();assert.equal(sim.adventureCommand('wrong-axis','earth-notes-compare',{bearing:60}).ok,false);assert.deepEqual(sim.snapshot(),wrong);command('compare',{bearing:bow?180:0});snap('04_COMPARED');reload();table();command('record',{interpretation:bow?'waterworks':'old-road'});snap('05_CHART');reload();
 const after=sim.snapshot();for(const k of ['xp','ore','coins','equipment','owned','arsenal','starter','pursuit','classPath','earthStory','road','beacon','crossing','companion','defeated','drops','reward'])assert.deepEqual(after.adventure[k],before.adventure[k],k);for(const k of ['notes','score','retreat','visitor','flowers'])assert.deepEqual(after[k],before[k],k);for(const k of ['inventory','placed','bridge','stats','milestones'])assert.deepEqual(after.sandbox[k],before.sandbox[k],k);assert.equal(after.adventure.earthStory.claimed,false);
 const report={variant,status:'passed',commands:serial,positionEdits:0,inventoryGrants:0,plantedObjectives:0,acceleratedTicks:true,sourceSha256:crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex'),notes:after.adventure.earthNotes,weapon:after.adventure.equipment.weapon,xp:after.adventure.xp,deliveryStillUnpaid:true,actions};fs.writeFileSync(path.join(out,'REPORT.json'),JSON.stringify(report,null,2)+'\n');return report;
}
if(require.main===module)console.log(JSON.stringify(run({bow:process.argv.includes('--bow'),veteran:process.argv.includes('--veteran')}),null,2));
module.exports={run};
