/* Road After Rain. Finite local story authority, separate from repeated surveys. */
(function(G){'use strict';
const VERSION=1,ID='road-after-rain',GIVER=Object.freeze({x:7,z:5}),DESTINATION=Object.freeze({x:0,z:-43});
const REWARD=Object.freeze({ore:3,coins:4,fiber:2});
const STEPS=Object.freeze([
 {id:'mill-root',name:'Clear the lodged root',who:'Ansel · millwright',x:6,z:-3,needs:[],wood:0,text:'The root caught the old gate. Pull it free from the bank; the water stays below the road.'},
 {id:'mill-gate',name:'Repair and test the headrace gate',who:'Ansel · millwright',x:7,z:-7,needs:['mill-root'],wood:2,text:'Fit a timber brace and test the gate. Ansel can keep the mill track dry for Fenna’s load.'},
 {id:'quarry-reserve',name:'Collect Darric’s designated repair blocks',who:'Darric · public works',x:12,z:-26,needs:[],wood:0,text:'These three marked blocks are reserved for the public road. Darric releases them for this repair; the rest of the quarry stock stays here.'},
 {id:'quarry-grade',name:'Pack the washed cart grade',who:'Darric · public works',x:14,z:-13,needs:['quarry-reserve'],wood:0,text:'Set the designated blocks into the ruts. This gives Fenna a firm cart road while the mill remains a separate job.'},
 {id:'detour-ridge',name:'Survey the ridge sightline',who:'Fenna’s route notes',x:13,z:-13,needs:[],wood:0,text:'The upper bend is clear. Note the turn toward the north common; the low watercourse stays off the route.'},
 {id:'detour-shelter',name:'Check the dry shelter',who:'Fenna’s route notes',x:-12,z:-23,needs:[],wood:0,text:'The shelter has a sound roof and a dry resting place. Fenna can stop here with the load.'},
 {id:'detour-mark',name:'Mark the north delivery lane',who:'Fenna’s route notes',x:0,z:-35,needs:['detour-ridge','detour-shelter'],wood:0,text:'With sightline and shelter checked, set the direction markers. Fenna can take this surveyed way around the wet grade.'}
].map(s=>Object.freeze({...s,needs:Object.freeze(s.needs)})));
const ROUTES=Object.freeze([
 {id:'mill',name:'Ansel’s mill track',steps:['mill-root','mill-gate'],cost:'2 timber from your inventory',detail:'Clear the root, then brace and test the gate. Restore the small mill mechanism.'},
 {id:'quarry',name:'Darric’s cart road',steps:['quarry-reserve','quarry-grade'],cost:'No personal materials',detail:'Collect designated public blocks at the quarry and pack the washed grade.'},
 {id:'detour',name:'Fenna’s surveyed detour',steps:['detour-ridge','detour-shelter','detour-mark'],cost:'No personal materials',detail:'Check the ridge and shelter, then mark the north lane. A quiet route without repairs.'}
].map(r=>Object.freeze({...r,steps:Object.freeze(r.steps)})));
function fresh(){return{version:VERSION,accepted:false,steps:[],dispatch:null,arrived:false,claimed:false};}
function status(a){return a.earthStory;}
function ready(s,id){const route=ROUTES.find(r=>r.id===id);return !!route&&route.steps.every(id=>s.steps.includes(id));}
function validate(raw,a){
 const bad=m=>{throw Error('Invalid Road After Rain: '+m);};
 if(!raw||typeof raw!=='object'||Array.isArray(raw)||raw.version!==VERSION)bad('version');
 for(const k of ['accepted','arrived','claimed'])if(typeof raw[k]!=='boolean')bad(k);
 if(!Array.isArray(raw.steps)||raw.steps.length>STEPS.length||new Set(raw.steps).size!==raw.steps.length||raw.steps.some(id=>!STEPS.some(s=>s.id===id)))bad('objectives');
 for(const id of raw.steps)if(STEPS.find(s=>s.id===id).needs.some(n=>!raw.steps.includes(n)))bad('objective prerequisites');
 if(raw.dispatch!==null&&!ready(raw,raw.dispatch))bad('dispatched route');
 if(raw.arrived&&!raw.dispatch||raw.claimed&&!raw.arrived||!raw.accepted&&(raw.steps.length||raw.dispatch||raw.arrived||raw.claimed)||raw.accepted&&!a.started)bad('story prerequisites');
 return{version:VERSION,accepted:raw.accepted,steps:raw.steps.slice(),dispatch:raw.dispatch,arrived:raw.arrived,claimed:raw.claimed};
}
function at(sim,p){const E=G.RealmEarth;return sim.room===E.ROOM&&E.walkable(sim.state.player.x,sim.state.player.z)&&E.near(sim,p,2.3)&&E.line(sim.state.player,p);}
function handle(sim,type,p={}){
 if(!type.startsWith('earth-story-'))return null;
 const a=sim.state.adventure,s=status(a),inv=sim.state.sandbox.inventory,fail=error=>({ok:false,error}),yes=text=>({ok:true,text});
 if(!a.started)return fail('First collect Oren’s expedition kit.');
 if(type==='earth-story-accept'){
  if(s.accepted||!at(sim,GIVER))return fail('Speak with Fenna at the mill-road fork. This delivery is accepted once.');
  s.accepted=true;sim.event('quest','Road After Rain accepted: prepare one route, send Fenna’s flour and apples, and meet her on the west road. One payment: 3 copper, 4 sunmarks, 2 fibre; no XP.');
  return yes('Choose a route on the Hearthwater map. No materials were spent.');
 }
 if(!s.accepted)return fail('Read and accept Fenna’s delivery before doing this work.');
 if(type==='earth-story-step'){
  const step=STEPS.find(d=>d.id===p.id);
  if(!step||s.steps.includes(step.id)||!at(sim,step))return fail('Approach an unfinished Road After Rain task.');
  if(step.needs.some(id=>!s.steps.includes(id)))return fail('Finish the listed preparation first.');
  if(inv.wood<step.wood)return fail('The gate needs 2 timber. Nothing was spent; the quarry and surveyed detour need no personal materials.');
  inv.wood-=step.wood;s.steps.push(step.id);sim.event('quest',step.name+' completed'+(step.wood?' for 2 timber.':'.'));
  return yes(step.name+' complete. '+(s.dispatch?'The delivery and its single payment stay unchanged.':'Return to Fenna when your route is ready.'));
 }
 if(type==='earth-story-dispatch'){
  if(s.dispatch||!at(sim,GIVER)||!ready(s,p.route))return fail('Return to Fenna and choose a completed route. The load travels once.');
  s.dispatch=p.route;sim.event('quest','Fenna takes '+ROUTES.find(r=>r.id===p.route).name+' with the flour and apples. Meet her at the Bellweather west-road handoff.');
  return yes('Fenna takes the route offscreen. Meet her on the west road; there is no timed escort.');
 }
 if(type==='earth-story-arrive'){
  if(!s.dispatch||s.arrived||!at(sim,DESTINATION))return fail('Meet Fenna and the dispatched load at the west-road handoff.');
  s.arrived=true;sim.event('quest','Fenna’s flour and apples reached the west road. The delivery is complete; its payment is still unclaimed.');
  return yes('“Dry flour, sound apples. That will do nicely.” · Fenna. Claim your payment when ready.');
 }
 if(type==='earth-story-claim'){
  if(!s.arrived||s.claimed||!at(sim,DESTINATION))return fail('Collect this delivery’s once-only payment from Fenna on the west road.');
  if(a.ore>9999-REWARD.ore||a.coins>9999-REWARD.coins||inv.fiber>G.RealmSandbox.MAX-REWARD.fiber)return fail('Make room for all 3 copper, 4 sunmarks and 2 fibre. Your completed delivery stays unpaid.');
  a.ore+=REWARD.ore;a.coins+=REWARD.coins;inv.fiber+=REWARD.fiber;s.claimed=true;
  sim.event('quest','Road After Rain paid once: 3 copper, 4 sunmarks, 2 fibre. The public improvements and delivered load remain.');
  return yes('Delivery paid. Your equipment and campaign are unchanged. The work you did stays visible.');
 }
 return fail('Unknown Road After Rain action.');
}
function next(a){const s=status(a);if(!s.accepted)return{id:'fenna',name:'Read Fenna’s delivery request',...GIVER};if(s.dispatch)return s.claimed?null:{id:'delivery',name:s.arrived?'Collect Fenna’s payment':'Meet Fenna on the west road',...DESTINATION};if(ROUTES.some(r=>ready(s,r.id)))return{id:'fenna',name:'Return to Fenna · choose a ready route',...GIVER};return null;}
const api={VERSION,ID,GIVER,DESTINATION,REWARD,STEPS,ROUTES,fresh,status,ready,validate,at,handle,next};G.RealmEarthStory=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
