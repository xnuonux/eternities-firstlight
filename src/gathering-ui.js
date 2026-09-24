/* Reviewed extension adapter for the existing RPG workspace and Earth renderer.
 * No scene replacement, teleports, external media or connected residents.
 */
(function(G){'use strict';
const Q=G.RealmGathering,M=G.RealmGatheringMusic,E=G.RealmEarth,$=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const button=(label,act,id='',disabled=false)=>'<button data-rpg="table-'+act+'" data-id="'+esc(id)+'" '+(disabled?'disabled':'')+'>'+label+'</button>';
class GatheringUI{
 constructor(rpg){this.rpg=rpg;this.player=new M.Player();this.pending=null;this.caption='Sound is optional. Reading and silent completion are equally complete.';this.boundary=null;
  this.hint=document.createElement('button');this.hint.id='table-context';this.hint.hidden=true;this.hint.onclick=()=>this.interact();$('#rpg-hud').append(this.hint);
  this.stop=()=>this.player.stop();document.addEventListener('visibilitychange',()=>{if(document.hidden)this.stop();});window.addEventListener('blur',this.stop);window.addEventListener('pagehide',this.stop);
 }
 get sim(){return this.rpg.sim;}get state(){return this.sim.state.adventure.earthGathering;}
 reset(){this.stop();this.pending=null;this.caption='Sound is optional. Reading and silent completion are equally complete.';}
 interact(){if(!Q.point(this.sim))return false;this.rpg.open('gathering');return true;}
 invitation(){if(!Q.available(this.sim.state.adventure))return '';return '<section class="table-invitation"><small>OPTIONAL · LIFE AFTER THE DELIVERY</small><h3>A Table After the Rain</h3><p>'+(this.state.shared?'Your lantern, remembered arrangement and a place for the next traveler remain beside the north road.':'Fenna has put Nella’s basket beside the west-road table. There is time for a small gathering. The delivery payment and Mara’s question can both wait.')+'</p>'+button(this.state.accepted?'Return to the table':'Read the invitation','open')+'</section>';}
 walk(id){const p=id==='table'?Q.TABLE:Q.TASKS.find(t=>t.id===id);if(!p)return;if(this.sim.room!==E.ROOM){this.rpg.api.toast('Take the Hearthwater trail at the Firstlight lake. The table is beside the north-road handoff.');return;}this.rpg.close();this.rpg.api.walkLocal(p.x,p.z);}
 action(el){const act=el.dataset.rpg,id=el.dataset.id;if(!act?.startsWith('table-'))return false;
  if(act==='table-open'){this.rpg.open('gathering');return true;}
  if(act==='table-walk'){this.walk(id);return true;}
  if(act==='table-stop'){this.stop();this.caption='Music stopped. Your composed score has not changed.';this.rpg.paint();return true;}
  if(act==='table-play'){
   if(!Q.at(this.sim,Q.TABLE)||!Q.validVerse(id)){this.rpg.api.toast('Approach the table to hear its instrument.');return true;}
   try{this.caption=this.player.play(id,this.rpg.api.audio(),this.sim)?Q.VERSES[id].name+' · original 26-second arrangement. '+Q.VERSES[id].description:'Sound is unavailable. You can read and finish without it.';}catch{this.stop();this.caption='Sound is unavailable. Silent completion remains available.';}this.rpg.paint();return true;
  }
  if(act==='table-select'){this.pending=Q.validVerse(id)?id:null;this.rpg.paint();return true;}
  if(act==='table-cancel'){this.pending=null;this.rpg.paint();return true;}
  if(act==='table-confirm'){const value=this.pending;this.pending=null;this.rpg.run('gathering-verse',{verse:value});return true;}
  if(act==='table-accept')this.rpg.run('gathering-accept');
  else if(act==='table-prepare')this.rpg.run('gathering-prepare',{id});
  else if(act==='table-share')this.rpg.run('gathering-share');
  return true;
 }
 page(){const a=this.sim.state.adventure,s=this.state,near=Q.at(this.sim,Q.TABLE);let h='<article class="table-reading"><small>HEARTHWATER · A MOMENT YOU MAY KEEP</small><h2>A Table After the Rain</h2>';
  if(!Q.available(a))return h+'<p>First bring Fenna’s flour and apples safely through. The invitation follows the arrival, not the payment.</p></article>';
  h+='<blockquote>“Nella sent bowls. Oren sent that folding stand of his. Ilan said we could borrow a tune. Nobody asked us to make a ceremony of it.” <cite>Fenna, beside the north road</cite></blockquote>';
  if(!near)h+=this.sim.room===E.ROOM?button('Walk to the roadside table','walk','table'):'<p class="table-note">Enter Hearthwater from the Firstlight lake trail. Follow either route to the north-road handoff. This invitation does not teleport you or open Bellweather’s chapter gate.</p>';
  if(!s.accepted){h+='<div class="table-terms"><h3>A small invitation, not another bill</h3><p>Set out the cloth, collect the nearby lantern, open the stand and choose the table’s arrangement. No currency, inventory materials, XP, deadline or main-story choice. You may stop and return later.</p><p>Nella’s basket and Ilan’s written arrangements are here; neither character has been moved out of their own story or routine. Music is opt-in and never replaces your compositions.</p></div>'+button('Help prepare the table · no cost','accept','',!near);}
  else{
   h+='<ol class="table-tasks">'+Q.TASKS.map(t=>{const done=s.prepared.includes(t.id);return '<li><h3>'+(done?'✓ ':'')+t.name+'</h3><p>'+t.text+'</p>'+(done?'<span>Placed at the table</span>':Q.at(this.sim,t)?button(t.name,'prepare',t.id):button('Walk to this preparation','walk',t.id,this.sim.room!==E.ROOM))+'</li>';}).join('')+'</ol>';
   if(s.prepared.length===Q.TASKS.length){h+='<h3>One melody, three ways home</h3><p>The route you repaired suggests <strong>'+esc(Q.VERSES[a.earthStory.dispatch]?.name||'an arrangement')+'</strong>. You may choose any of the three. Previewing does not choose.</p><div class="table-verses">'+Object.entries(Q.VERSES).map(([id,v])=>'<section style="--verse:'+v.color+'"><h4>'+v.name+'</h4><p>'+v.description+'</p>'+button('Listen · optional','play',id,!near)+(!s.verse?button('Consider this arrangement','select',id,!near):s.verse===id?'<strong>Kept for this table</strong>':'')+'</section>').join('')+'</div>';
    h+='<div class="table-audio" role="status">'+esc(this.caption)+'</div>'+button('Stop music','stop');
    if(this.pending&&!s.verse)h+='<section class="table-confirm"><h3>Keep '+Q.VERSES[this.pending].name+'?</h3><p>This records the arrangement of your first gathering. It does not change the route, class, allegiance, stats or your own score. Other arrangements remain available to hear.</p>'+button('Keep this arrangement','confirm')+button('Keep looking','cancel')+'</section>';
    if(s.verse&&!s.shared)h+='<section class="table-ending"><h3>There is a place for you.</h3><p>You do not have to listen to the end. You do not have to turn on sound.</p>'+button('Share the evening · silent is welcome','share','',!near)+'</section>';
   }
   if(s.shared)h+='<section class="table-ending"><small>A LOCAL MEMORY · NOT AN ITEM REWARD</small><h3>A place kept.</h3><p>'+Q.VERSES[s.verse].reply+'</p><p>Fenna moves one bowl away from the rain dripping off the awning. The lantern catches the stitching in Nella’s cloth. A little melody is still here when you decide to leave.</p><p>The table’s colored pennant remembers your arrangement. No payment or XP was created. Your unfinished quests are still yours.</p></section>';
  }
  return h+'<p class="table-note">An authored single-player gathering. No online players, live AI, forced grief, offline neglect, or player-composed music is involved.</p></article>';
 }
 tick(){const sim=this.sim,show=!this.rpg.dialog.open&&!!Q.point(sim)&&!this.rpg.api.panel();this.hint.hidden=!show;if(show)this.hint.textContent='E · '+Q.point(sim).name;
  if(this.player.source&&(document.hidden||this.player.owner!==sim||sim.room!==E.ROOM||!Q.at(sim,Q.TABLE)||!this.rpg.api.audio()?.enabled))this.stop();
 }
}
function get(rpg){return rpg.gathering||(rpg.gathering=new GatheringUI(rpg));}
const P=G.RealmRPGUI.RPGUI.prototype,original={open:P.open,close:P.close,reset:P.reset,paint:P.paint,action:P.action,interact:P.interact,tick:P.tick};
P.open=function(tab){if(tab!=='gathering')get(this).reset();return original.open.apply(this,arguments);};
P.close=function(){get(this).reset();return original.close.apply(this,arguments);};
P.reset=function(){get(this).reset();return original.reset.apply(this,arguments);};
P.action=function(el){if(get(this).action(el))return;return original.action.apply(this,arguments);};
P.interact=function(){if(get(this).interact())return true;return original.interact.apply(this,arguments);};
P.paint=function(){original.paint.apply(this,arguments);const u=get(this);if(this.tab==='gathering'){$('#rpg-heading').textContent='A Table After the Rain';$('#rpg-content').innerHTML=u.page();}else if(['more','atlas','journal'].includes(this.tab))$('#rpg-content').insertAdjacentHTML('beforeend',u.invitation());};
P.tick=function(){original.tick.apply(this,arguments);get(this).tick();};
const drawBase=G.RealmEarthArt.draw;
G.RealmEarthArt.draw=function(out,sim,t,art){drawBase.apply(this,arguments);if(sim.room!==E.ROOM||!Q.available(sim.state.adventure))return;const s=sim.state.adventure.earthGathering,h=E.height;
 const box=(x,y,z,w,ht,d,c,extra={})=>out.box.push({p:[x,y,z],s:[w,ht,d],c,rough:.8,...extra});
 const ball=(x,y,z,w,ht,d,c)=>out.round.push({p:[x,y,z],s:[w,ht,d],c,rough:.8});
 const y=h(3.8,-45);
 if(s.prepared.includes('cloth')){box(3.8,y+.95,-45,2.35,.025,1.24,'#ded1af');for(let i=0;i<4;i++)ball(2.98+i*.54,y+1.01,-44.8,.29,.065,.29,'#b9c6bc');}
 const lx=s.prepared.includes('lantern')?5.4:Q.LANTERN.x,lz=s.prepared.includes('lantern')?-45.3:Q.LANTERN.z,ly=h(lx,lz);
 box(lx,ly+1.15,lz,.09,2.3,.09,'#665743');box(lx,ly+2.08,lz,.28,.44,.28,'#ffe0a0',{em:.7});box(lx,ly+2.35,lz,.4,.08,.4,'#6e5942');
 if(s.prepared.includes('stand')){box(3.8,y+1.1,-45.2,.68,.17,.4,'#725039');box(3.8,y+1.23,-45.2,.54,.07,.34,'#c5a56a');for(let i=0;i<5;i++)box(3.56+i*.12,y+1.28,-45.2,.025,.02,.24,'#e7dcb8');}
 if(s.shared){box(5.4,ly+1.4,lz,.03,.7,.62,Q.VERSES[s.verse].color);box(5.425,ly+1.4,lz,.012,.045,.4,'#f1ddb7');}
};
G.RealmGatheringUI={GatheringUI,get};
})(globalThis);
