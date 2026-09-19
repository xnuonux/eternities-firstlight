/* Earth E1 route UI. Geography only; no roadworks contract or new reward. */
(function(G){'use strict';const N=G.RealmEarth,$=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const button=(s,act,id='')=>'<button data-rpg="'+act+'" data-id="'+id+'">'+s+'</button>';
function projection(w,h){const scale=Math.min(w/44,h/86);return{scale,x:w/2,y:h/2+14*scale};}
function mapCanvas(canvas,sim){const g=canvas.getContext('2d');if(!g)return;const w=canvas.width,h=canvas.height,{scale:s,x:ox,y:oy}=projection(w,h);
 g.fillStyle='#16231e';g.fillRect(0,0,w,h);g.fillStyle='#657758';for(const p of N.PATCHES)g.fillRect(ox+(p.x-p.w/2)*s,oy+(p.z-p.d/2)*s,p.w*s,p.d*s);
 g.fillStyle='#314239';for(const p of N.SOLIDS)g.fillRect(ox+(p.x-p.w/2)*s,oy+(p.z-p.d/2)*s,p.w*s,p.d*s);
 for(const p of N.POINTS){g.fillStyle=p.kind==='return'?'#ecd09a':p.kind==='boundary'?'#c7aa7a':'#d8ddc1';g.beginPath();g.arc(ox+p.x*s,oy+p.z*s,2.5,0,Math.PI*2);g.fill();}
 g.fillStyle='#fff1c8';g.beginPath();g.arc(ox+sim.state.player.x*s,oy+sim.state.player.z*s,4,0,Math.PI*2);g.fill();
}
function mapSVG(sim){const {scale:s,x:ox,y:oy}=projection(420,540);let html='<rect width="420" height="540" rx="18" fill="#16231e"/>';
 for(const p of N.PATCHES)html+='<rect x="'+(ox+(p.x-p.w/2)*s)+'" y="'+(oy+(p.z-p.d/2)*s)+'" width="'+p.w*s+'" height="'+p.d*s+'" fill="#657758"/>';
 for(const p of N.SOLIDS)html+='<rect x="'+(ox+(p.x-p.w/2)*s)+'" y="'+(oy+(p.z-p.d/2)*s)+'" width="'+p.w*s+'" height="'+p.d*s+'" fill="#314239"/>';
 for(const [i,p]of N.POINTS.entries())html+='<circle cx="'+(ox+p.x*s)+'" cy="'+(oy+p.z*s)+'" r="10" fill="#263b32" stroke="#dfc38d"/><text x="'+(ox+p.x*s)+'" y="'+(oy+p.z*s+4)+'" text-anchor="middle" fill="#fff2d5">'+(i+1)+'</text>';
 const p=sim.state.player;return '<svg id="earth-map" viewBox="0 0 420 540" role="img" aria-label="Hearthwater approach: two real ground routes join at Bellweather west road">'+html+'<circle cx="'+(ox+p.x*s)+'" cy="'+(oy+p.z*s)+'" r="4" fill="white"/><text x="210" y="20" text-anchor="middle" fill="#dfc38d">NORTH · BELLWEATHER WEST ROAD</text></svg>';
}
const WORDS={
 bridge:{title:'Hearthwater footbridge',text:'The old lake path continues over dressed stone. Cart ruts begin again beyond the water.',detail:'This is physical connected ground. The riverbank outing and its rewards remain owned by Oren’s existing sign and scene.'},
 orchard:{title:'Orchard lane',text:'Low walls, fruit trees and work paths make the country legible before any quest marker does.',detail:'The western lane stays quiet and sheltered. It reaches the same northern road without changing your campaign state.'},
 millfork:{title:'Mill road fork',text:'A watercourse runs through the low ground. One path bends toward orchards; another climbs toward the quarry ridge.',detail:'The mill problem described in the Earth design is later E2 content. Nothing is accepted or paid on this geography visit.'},
 ridge:{title:'The ridge road',text:'Bellweather’s bell appears above the distant orchard before the town itself can be seen.',detail:'The eastern route is more exposed, but it remains ordinary traversable country—not a teleport or painted destination.'},
 quarry:{title:'Quarry approach',text:'Stone stacks and worn wheel marks explain why this grade exists. The working camp lies beyond the current qualified boundary.',detail:'No materials are granted for looking at scenery. Future contracts will use explicit ownership and run identities.'},
 shelter:{title:'Old ridge shelter',text:'A repaired roof, a dry bench and sightlines back toward the lake. Someone expected travelers to need this place.',detail:'The shelter has no fee, reward or hidden checkpoint. Your safe persisted checkpoint remains beside the Firstlight lake.'},
 bellweather:{title:'Bellweather west road',text:'The bell is close now, beyond orchards and the last bend. Old Sunward markers still define the recognized chapter road into town.',detail:'E1 stops here deliberately. It does not bypass the existing Sunward Beacon or Bellweather chapter prerequisites. Return by either route while this connection is being qualified.'}
};
class EarthUI{
 constructor(rpg){this.rpg=rpg;this.ticket=null;this.reading=null;const root=document.createElement('div');root.id='earth-labels';root.setAttribute('aria-hidden','true');$('#hud').append(root);
  const home=document.createElement('button');home.id='earth-home';home.hidden=true;home.textContent='Return to Firstlight';home.onclick=()=>this.returnHome();$('#rpg-hud').append(home);
 }
 get sim(){return this.rpg.sim;}
 reset(){N.cancel(this.ticket);this.ticket=null;this.reading=null;}
 context(){if(this.sim.room===N.ROOM){const p=N.POINTS.find(p=>N.near(this.sim,p));return p?(p.kind==='return'?'E · Return to Firstlight':WORDS[p.id]?'E · '+p.name:'E · Read the Hearthwater marker'):'M · Hearthwater routes';}return !this.sim.room&&N.near(this.sim,N.GATE)?'E · Hearthwater trail marker':null;}
 interact(){if(!this.context())return false;if(this.sim.room===N.ROOM){const p=N.POINTS.find(p=>N.near(this.sim,p));if(p?.kind==='return'){this.returnHome();return true;}this.reading=WORDS[p?.id]?p.id:null;this.rpg.open(this.reading?'earth':'atlas');}else{this.reset();this.rpg.open('earth');}return true;}
 returnHome(){const r=this.rpg.api.earthReturn();if(r.ok){this.rpg.close();this.reset();}else this.rpg.api.toast(r.error);}
 action(el){const act=el.dataset.rpg,id=el.dataset.id;
  if(act==='earth-confirm'){const r=this.rpg.api.earthTravel(this.ticket);this.ticket=null;if(r.ok){this.rpg.close();this.rpg.api.toast('Hearthwater Vale · orchard lane west, ridge road east. Return is always available.');}else{this.rpg.api.toast(r.error);this.rpg.paint();}return true;}
  if(act==='earth-return'){this.returnHome();return true;}
  if(act==='earth-invitation'){this.reset();this.rpg.open('earth');return true;}
  if(act==='earth-walk'){const p=id==='gate'&&!this.sim.room?N.GATE:this.sim.room===N.ROOM?N.POINTS.find(p=>p.id===id):null;if(p){this.rpg.close();this.rpg.api.walkLocal(p.x,p.z);}return true;}
  return false;
 }
 invitation(){return '<section class="earth-invitation"><small>EARTH · HEARTHWATER VALE · E1</small><h3>A road beyond the little valley</h3><p>The lake footbridge now opens onto connected country: orchard lane, quarry ridge and the west road toward Bellweather.</p>'+button('Read the Hearthwater marker','earth-invitation')+'</section>';}
 page(tab){
  if(tab==='atlas'&&this.sim.room===N.ROOM)return{title:'Hearthwater Vale · first connected approach',html:'<div class="earth-atlas"><section>'+mapSVG(this.sim)+'<p>Two physical approaches meet on the north road. The dark center is the mill watercourse and cannot be crossed here.</p></section><section><small>EARTH E1 · GEOGRAPHY FIRST</small><h2>Learn the road.</h2><p>Every listed destination uses the actual walking ground. Existing Oren, Sunward and Bellweather quest authorities remain unchanged.</p>'+N.POINTS.map((p,i)=>button('<b>'+String(i+1).padStart(2,'0')+'</b> '+esc(p.name),'earth-walk',p.id)).join('')+button('Return to the Firstlight lake','earth-return')+'<p class="earth-note">No enemies, payout, XP, class choice, regional save schema or campaign completion is added by E1.</p></section></div>'};
  if(tab!=='earth')return null;
  if(this.sim.room===N.ROOM){const word=WORDS[this.reading]||WORDS.bridge;return{title:word.title,html:'<article class="earth-reading"><small>HEARTHWATER VALE</small><h2>'+word.title+'</h2><p class="earth-quote">'+word.text+'</p><p>'+word.detail+'</p><div class="earth-actions">'+button('See the whole approach','open','atlas')+button('Return to Firstlight','earth-return')+'</div><p class="earth-note">A geography qualification slice. Looking and walking do not write new quest or reward state.</p></article>'};}
  const near=!this.sim.room&&N.near(this.sim,N.GATE);
  if(near&&!this.ticket){const r=N.preview(this.rpg.api.earthContext());if(r.ok)this.ticket=r.ticket;}
  return{title:'Hearthwater Vale · trail marker',html:'<article class="earth-reading"><small>OPTIONAL EARTH JOURNEY · E1</small><h2>Walk the country between places.</h2><p class="earth-quote">A stone footbridge crosses the lake edge. Orchard walls take the western grade. Quarry tracks climb east. Both roads meet beneath Bellweather’s distant bell.</p><div class="earth-terms"><section><h3>What this proves</h3><p>Real connected ground, landmarks, two camera styles, a safe source checkpoint and a reversible walk out and back.</p></section><section><h3>What it does not change</h3><p>Oren’s outing, surveys, Sunward, the Beacon and Bellweather keep their existing rewards, identities and prerequisites. There is no new payout or story completion.</p></section><section><h3>Your way home</h3><p>Return is available from the start and anywhere on the route. Saving and reopening, or switching characters, resumes at this Firstlight lake checkpoint.</p></section></div><p><strong>Traveller:</strong> '+esc(this.sim.state.visitor.name)+' · <strong>Return:</strong> lake footbridge.</p><div class="earth-actions">'+(near&&this.ticket?button('Save checkpoint & enter Hearthwater','earth-confirm'):button('Walk to the lake trail marker','earth-walk','gate'))+'</div><p class="earth-note">No save migration is required. V still switches third person and your remembered diorama view.</p></article>'};
 }
 tick(){const inside=this.sim.room===N.ROOM;$('#earth-home').hidden=!inside;document.body.classList.toggle('in-earth',inside);const root=$('#earth-labels');root.replaceChildren();
  if(inside){$('#tracked-chapter').textContent='EARTH · HEARTHWATER VALE';$('#tracked-title').textContent=this.sim.state.player.z<-36?'Bellweather road ahead':'Learn the road between places';$('#tracked-detail').textContent='Orchard lane west · quarry ridge east';$('#tracked-progress').textContent='M · local routes and return · no E1 reward';}
  if(!this.sim.state.settings.labels||this.rpg.dialog.open)return;
  const points=inside?N.POINTS:[{...N.GATE,name:'Hearthwater Vale · trail marker'}],player=this.sim.state.player,shown=[];
  for(const p of points.map(p=>({...p,d:Math.hypot(p.x-player.x,p.z-player.z)})).sort((a,b)=>a.d-b.d)){
   if(p.d>25||p.d<2.5||shown.length>=3)continue;const q=this.rpg.api.project(p.x,(inside?N.height(p.x,p.z):1.3)+2.4,p.z);if(!q?.visible||shown.some(v=>Math.abs(v.x-q.x)<190&&Math.abs(v.y-q.y)<34))continue;
   const label=document.createElement('span');label.textContent=p.name;label.style.left=q.x+'px';label.style.top=q.y+'px';root.append(label);shown.push(q);
  }
 }
}
G.RealmEarthUI={EarthUI,mapCanvas,mapSVG,projection};
})(globalThis);
