/* Mara's field notes: observations are durable; interpretations remain hypotheses. */
(function(G){'use strict';
const VERSION=1,ID='marks-beneath-the-rain',TABLE=Object.freeze({x:-2,z:0});
const MARKS=Object.freeze([
 {id:'orchard-stone',name:'The orchard stone',x:-13,z:-6,place:'West orchard lane · south of the long bank',observation:'Two narrow cuts run north and south across the crown. Silt lies below them. The cuts are older than the fresh scrape from a cart wheel.'},
 {id:'bank-footing',name:'The exposed footing',x:-13,z:-16,place:'Western track · beside the mill watercourse',observation:'A broken edge shows the same paired cuts continuing into dressed stone. They point along the bank, rather than across the water.'},
 {id:'shelter-mark',name:'The shelter stone',x:-13,z:-21,place:'Western track · just south of the roofed shelter',observation:'The third pair is above the recent mud line. Its spacing matches your other rubbings. Nothing here glows or moves when you touch it.'}
].map(Object.freeze));
const IDEAS=Object.freeze({'old-road':{name:'An older road',text:'“An older road is possible. Three aligned stones make a good question, not yet a date or a destination. If it belonged to one of the Roads of Light, we should find more than our wish that it did.”'},waterworks:{name:'Old waterworks',text:'“A watercourse could explain the line. The dressed footing interests me, though. We should look for a channel before we call it one. The stones are allowed to surprise us.”'}});
function fresh(){return{version:VERSION,accepted:false,marks:[],compared:false,interpretation:null};}
function validate(raw,a){const bad=m=>{throw Error('Invalid Mara field notes: '+m);};
 if(!raw||typeof raw!=='object'||Array.isArray(raw)||raw.version!==VERSION)bad('version');
 if(typeof raw.accepted!=='boolean'||typeof raw.compared!=='boolean')bad('flags');
 if(!Array.isArray(raw.marks)||raw.marks.length>3||new Set(raw.marks).size!==raw.marks.length||raw.marks.some(id=>!MARKS.some(p=>p.id===id)))bad('observations');
 if(raw.interpretation!==null&&(typeof raw.interpretation!=='string'||!Object.hasOwn(IDEAS,raw.interpretation)))bad('interpretation');
 if(raw.accepted&&!a.earthStory.arrived||!raw.accepted&&(raw.marks.length||raw.compared||raw.interpretation)||raw.compared&&raw.marks.length!==3||raw.interpretation&&!raw.compared)bad('prerequisites');
 return{version:VERSION,accepted:raw.accepted,marks:raw.marks.slice(),compared:raw.compared,interpretation:raw.interpretation};
}
function atTable(sim){const C=G.RealmCore;return sim.room==='observatory'&&Math.hypot(sim.state.player.x-TABLE.x,sim.state.player.z-TABLE.z)<2&&C.segment(sim.state.player,TABLE,'observatory');}
function atMark(sim,p){const E=G.RealmEarth;return sim.room===E.ROOM&&E.walkable(sim.state.player.x,sim.state.player.z)&&E.near(sim,p,1.9)&&E.line(sim.state.player,p);}
function handle(sim,type,p={}){
 if(!type.startsWith('earth-notes-'))return null;
 const a=sim.state.adventure,s=a.earthNotes,fail=error=>({ok:false,error}),yes=text=>({ok:true,text});
 if(!a.earthStory.arrived)return fail('First help Fenna bring the load through. Mara studies the marks after the practical work is done.');
 if(type==='earth-notes-accept'){
  if(s.accepted||!atTable(sim))return fail('Read Mara’s note at the observatory field table. This investigation is accepted once.');
  s.accepted=true;sim.event('quest','Mara’s field notes: compare three old marks along the western Hearthwater track. No materials, payment or XP.');return yes('Three rubbings, then back to the observatory. Follow the western orchard track.');
 }
 if(!s.accepted)return fail('Read and accept Mara’s field note before collecting observations.');
 if(type==='earth-notes-observe'){
  const mark=MARKS.find(m=>m.id===p.id);if(!mark||s.marks.includes(mark.id)||!atMark(sim,mark))return fail('Approach an unrecorded stone on the western track.');
  s.marks.push(mark.id);sim.event('quest','Recorded '+mark.name.toLowerCase()+': '+mark.observation);return yes('Rubbing recorded · '+s.marks.length+'/3. '+(s.marks.length===3?'Return to Mara’s field table.':'The other stones lie along this same western track.'));
 }
 if(!atTable(sim))return fail('Return to the observatory field table to compare your evidence.');
 if(type==='earth-notes-compare'){
  if(s.compared||s.marks.length!==3)return fail('Bring all three rubbings before comparing them once.');
  if(!Number.isInteger(p.bearing)||![0,180].includes(p.bearing))return fail('The tracing crosses the marks. Try the north–south axis: 0° or 180°. Nothing has been recorded.');
  s.compared=true;sim.event('quest','Three pairs of cuts share one north–south axis. Their purpose remains uncertain.');return yes('The paired cuts align. Record what you think they may have served.');
 }
 if(type==='earth-notes-record'){
  if(!s.compared||s.interpretation||typeof p.interpretation!=='string'||!Object.hasOwn(IDEAS,p.interpretation))return fail('Compare the three rubbings, then record one tentative explanation.');
  s.interpretation=p.interpretation;sim.event('quest','Mara keeps your chart: '+IDEAS[p.interpretation].name+' is a hypothesis, not a confirmed history.');return yes('Your chart stays in the observatory. The question can wait for another journey.');
 }
 return fail('Unknown field-note action.');
}
const api={VERSION,ID,TABLE,MARKS,IDEAS,fresh,validate,atTable,atMark,handle};G.RealmEarthNotes=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
