/* A Table After the Rain. Authored hospitality, never a second delivery payout. */
(function(G){'use strict';
const VERSION=1,ID='a-table-after-the-rain';
const TABLE=Object.freeze({x:4,z:-42.5}),LANTERN=Object.freeze({x:-5.8,z:-35}),CART=Object.freeze({x:-3,z:-40.5});
const TASKS=Object.freeze([
 Object.freeze({id:'cloth',name:'Lay Nella’s cloth and bowls',...CART,text:'Fenna unfolds the cloth from Nella’s basket. There is a repaired corner, and a note: “Bring the basket back. Keep the evening.”'}),
 Object.freeze({id:'lantern',name:'Bring the wayfarer lantern',...LANTERN,text:'A low lantern hangs beside the north lane. Its label reads: “For the table. Leave one light for the late arrivals.”'}),
 Object.freeze({id:'stand',name:'Open Oren’s folding music stand',...TABLE,text:'The little stand opens without wobbling. Ilan has left three arrangements of the same tune. None of them replaces the music you have made.'})
]);
const VERSES=Object.freeze({
 mill:Object.freeze({name:'The Turning Water',color:'#9dbdb5',description:'A gently turning accompaniment beneath a warm melody. The tune leaves room for the water.',reply:'“Ansel will insist the gate ought to have been mended sooner. He is right. I still think we may be glad it is mended now.” — Fenna',pitches:Object.freeze([62,66,69,71,69,66,64,62,66,69,73,71,69,66,64,62])}),
 quarry:Object.freeze({name:'Stone by Stone',color:'#dfbc81',description:'A grounded, plucked pulse; the same melody supported by a firmer lower voice.',reply:'“Darric counted those blocks twice. Tonight we have counted the bowls instead. Everyone who arrived has one.” — Fenna',pitches:Object.freeze([62,66,69,66,67,71,74,71,66,69,73,69,64,67,69,62])}),
 detour:Object.freeze({name:'The Longer Way Home',color:'#c7a8bf',description:'A slower answering phrase that wanders upward before finding its way back.',reply:'“It was the longer road. Dry flour, sound apples, and nobody left behind. I have taken worse bargains.” — Fenna',pitches:Object.freeze([62,64,66,69,71,74,73,69,67,66,64,66,69,66,64,62])})
});
function fresh(){return{version:VERSION,accepted:false,prepared:[],verse:null,shared:false};}
function available(a){return a.earthStory.arrived;}
function validVerse(id){return typeof id==='string'&&Object.hasOwn(VERSES,id);}
function validate(raw,a){
 const bad=m=>{throw Error('Invalid roadside gathering: '+m);};
 if(!raw||typeof raw!=='object'||Array.isArray(raw)||raw.version!==VERSION)bad('version');
 for(const k of ['accepted','shared'])if(typeof raw[k]!=='boolean')bad(k);
 if(!Array.isArray(raw.prepared)||raw.prepared.length>TASKS.length||new Set(raw.prepared).size!==raw.prepared.length||raw.prepared.some(id=>typeof id!=='string'||!TASKS.some(t=>t.id===id)))bad('preparations');
 if(raw.verse!==null&&!validVerse(raw.verse))bad('verse');
 if(raw.accepted&&!available(a)||!raw.accepted&&(raw.prepared.length||raw.verse||raw.shared)||raw.verse&&raw.prepared.length!==TASKS.length||raw.shared&&!raw.verse)bad('prerequisites');
 return{version:VERSION,accepted:raw.accepted,prepared:raw.prepared.slice(),verse:raw.verse,shared:raw.shared};
}
function at(sim,p){const E=G.RealmEarth;return sim.room===E.ROOM&&E.walkable(sim.state.player.x,sim.state.player.z)&&E.near(sim,p,1.75)&&E.line(sim.state.player,p);}
function point(sim){if(!available(sim.state.adventure))return null;if(at(sim,TABLE))return{id:'table',name:'The roadside table',...TABLE};if(sim.state.adventure.earthGathering.accepted)return TASKS.find(t=>t.id!=='stand'&&at(sim,t))||null;return null;}
function handle(sim,type,p={}){
 if(typeof type!=='string'||!type.startsWith('gathering-'))return null;
 const a=sim.state.adventure,s=a.earthGathering,fail=error=>({ok:false,error}),yes=text=>({ok:true,text});
 if(!available(a))return fail('Bring Fenna’s delivery safely through first. Its payment can wait.');
 if(type==='gathering-accept'){
  if(s.accepted||!at(sim,TABLE))return fail('Read Fenna’s invitation at the roadside table. Nothing has been accepted.');
  s.accepted=true;sim.event('gathering','You offered to prepare the roadside table. No payment, materials, deadline or main quest obligation.');return yes('Cloth at the cart, a lantern by the lane, and Oren’s stand at the table.');
 }
 if(!s.accepted)return fail('Accept the invitation before arranging the table.');
 if(type==='gathering-prepare'){
  const t=TASKS.find(t=>t.id===p.id);if(!t||s.prepared.includes(t.id)||!at(sim,t))return fail('Approach an unfinished table preparation. Nothing was used.');
  s.prepared.push(t.id);sim.event('gathering',t.name+'.');return yes(t.text);
 }
 if(!at(sim,TABLE))return fail('Return to the roadside table.');
 if(type==='gathering-verse'){
  if(s.verse||s.prepared.length!==TASKS.length||!validVerse(p.verse))return fail('Prepare all three things, then choose one arrangement to keep. Previewing a tune does not choose it.');
  s.verse=p.verse;sim.event('gathering','You chose '+VERSES[p.verse].name+' for the roadside table. A musical preference, not an oath.');return yes('Arrangement kept. You can share the evening in silence or with music.');
 }
 if(type==='gathering-share'){
  if(!s.verse||s.shared)return fail('Choose the table’s arrangement, then share this first evening once.');
  s.shared=true;sim.event('gathering','A place was kept for the next traveler. '+VERSES[s.verse].name+' remains at the roadside table.');return yes('The lantern and your arrangement remain. There is nothing more you have to earn tonight.');
 }
 return fail('Unknown gathering action.');
}
const api={VERSION,ID,TABLE,LANTERN,CART,TASKS,VERSES,fresh,available,validVerse,validate,at,point,handle};G.RealmGathering=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
