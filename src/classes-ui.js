(function(G){'use strict';
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const btn=(label,action,id='',disabled=false,extra='')=>`<button data-rpg="${action}" ${id?`data-id="${esc(id)}"`:''} ${disabled?'disabled ':''}${extra}>${label}</button>`;
  class ClassesUI{
    constructor(rpg){this.rpg=rpg;this.pending=null;this.confirming=null;}
    reset(){this.pending=null;this.confirming=null;}
    api(){return this.rpg.api.classState?.()||{id:null,eligible:false};}
    defs(){return G.RealmClasses?.DEFINITIONS||{};}
    page(tab){if(tab!=='classes')return null;const s=this.api(), defs=this.defs(), ids=['hunter','magician'];
      if(s.id){const d=defs[s.id]||{};return {title:'Your path',html:this.card(s.id,d,s,true)};}
      const eligible=!!s.eligible, choices=ids.map(id=>this.card(id,defs[id],s,false)).join('');
      return {title:'Choose your path',html:`<div class="class-page"><header class="class-intro"><small>OREN · THE FIRST EXPEDITION</small><h2>Choose a way to fight.</h2><p>After the expedition kit, Oren can help you choose one traditional path. This is a once-per-character choice. It grants no gear, XP, profession, companion or soul history.</p></header>${eligible?'':'<div class="class-notice">Stand beside Oren in the outdoors after collecting your expedition kit to preview these paths.</div>'}<div class="class-grid">${choices}</div>${this.pending?this.confirmation(this.pending,defs[this.pending]):''}</div>`};
    }
    card(id,d,s,current){const selected=this.pending===id, preview=G.RealmClasses?.preview?.(this.rpg.sim,id)||{};const cost=d.cost??0,cd=d.cooldown??0;
      const name=d.name||id,tech=d.techniqueName||d.technique||'Technique';
      return `<article class="class-card ${selected?'is-selected':''}" data-class="${id}"><div class="class-glyph" style="--class-color:${esc(d.color||'#d4b175')}">${id==='hunter'?'⌁':'✦'}</div><div><small>${current?'CHOSEN PATH':'TRADITIONAL PATH'}</small><h3>${esc(name)}</h3><p>${esc(d.description||'A distinct way to approach the valley.')}</p><h4>${esc(tech)}</h4><p class="class-technique">${esc(d.technique||'A measured technique for the road.')}</p><dl class="class-stats"><div><dt>Cost</dt><dd>${cost} stamina</dd></div><div><dt>Cooldown</dt><dd>${cd}s</dd></div>${preview.damage?`<div><dt>Current effect</dt><dd>${preview.damage} damage</dd></div>`:''}${preview.bonus?`<div><dt>Next hit</dt><dd>+${preview.bonus} damage</dd></div>`:''}</dl>${current?'<p class="fineprint">Your existing blade and bow remain usable. Try the technique with X when a target is selected.</p>':btn(selected?'Selected':'Preview '+name,'class-preview',id,!s.eligible&&!selected,'class="class-primary"')}</div></article>`;
    }
    confirmation(id,d){const name=d?.name||id;return `<section class="class-confirm" aria-live="polite"><small>ONE-TIME CHOICE</small><h3>Choose ${esc(name)}?</h3><p>This choice is permanent for this character in the prototype. It changes one technique only. Your equipment, sockets, upgrades, companion, soul choice and story remain exactly as they are.</p><div class="button-row">${btn('Confirm '+esc(name),'class-confirm',id,false,'class="class-primary"')} ${btn('Keep comparing','class-cancel')}</div></section>`;}
    action(el){if(!el?.dataset?.rpg||!String(el.dataset.rpg).startsWith('class-'))return false;const act=el.dataset.rpg,id=el.dataset.id;
      if(act==='class-preview'){this.pending=id;this.rpg.paint();return true;}
      if(act==='class-cancel'){this.pending=null;this.rpg.paint();return true;}
      if(act==='class-confirm'){const p=this.rpg.api.classAction?.('class-choose',{id,confirm:true});if(p?.then)p.then(r=>{if(!r.ok)this.rpg.api.toast?.(r.error||'That path is not available.');else{this.pending=null;this.rpg.paint();}});else if(p?.ok){this.pending=null;this.rpg.paint();}return true;}
      if(act==='class-technique'){const p=this.rpg.api.classAction?.('class-technique',{});if(p?.then)p.then(r=>{if(!r.ok)this.rpg.api.toast?.(r.error||'Technique unavailable.');});return true;}
      return true;
    }
    attach(){/* all actions are delegated by RPGUI */}
  }
  G.RealmClassesUI={ClassesUI};
})(globalThis);
