(function(G){'use strict';
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const palettes=[
    {skin:'#b87958',cloak:'#6e8f84',hair:'#2d2527'},
    {skin:'#d29a72',cloak:'#9b765c',hair:'#48352f'},
    {skin:'#8b5c45',cloak:'#7d6c9e',hair:'#171d2d'},
    {skin:'#e0b08a',cloak:'#a56a72',hair:'#6b4738'},
    {skin:'#6d463d',cloak:'#b58b54',hair:'#202f2d'}
  ];
  const btn=(label,action,id='',disabled=false,extra='')=>`<button data-rpg="${action}" ${id?`data-id="${esc(id)}"`:''} ${disabled?'disabled ':''}${extra}>${label}</button>`;
  const worldOf=slot=>slot&&slot.world||{};
  class CharactersUI{
    constructor(rpg){this.rpg=rpg;this.preview=null;this.importPreview=null;this.deleteId=null;this.revision=0;this.name='';this.palette=0;}
    reset(){this.preview=null;this.importPreview=null;this.deleteId=null;this.name='';this.palette=0;}
    previewImport(world){this.importPreview=world||null;if(this.rpg) this.rpg.open('characters');}
    apiState(){try{return this.rpg.api.characters()}catch(e){return{mode:'blocked',revision:0,active:null,limit:3,slots:[],writable:false,error:e.message||'Character storage is unavailable.'};}}
    visitor(w){return w.visitor||{name:'Visitor',skin:0,cloak:0,hair:0};}
    portrait(v,large=false){const p=palettes[v.skin%palettes.length]||palettes[0],c=palettes[v.cloak%palettes.length]||palettes[0],h=palettes[v.hair%palettes.length]||palettes[0];return `<div class="chars-portrait ${large?'chars-portrait-large':''}" style="--chars-skin:${p.skin};--chars-cloak:${c.cloak};--chars-hair:${h.hair}" aria-hidden="true"><i></i><b></b><em></em></div>`;}
    summary(slot){const w=worldOf(slot),v=this.visitor(w),a=w.adventure||{},eq=a.equipment||{},weapon=eq.weapon||'a familiar weapon';const level=Number.isFinite(a.xp)?Math.max(1,Math.floor(Math.sqrt(a.xp/100))+1):1;const project=a.pursuit?.pinned;return {name:v.name||'Unnamed traveler',level,weapon:String(weapon).replace(/_/g,' '),day:w.day||1,project:project?String(project).replace(/_/g,' '):'A story still unfolding',visitor:v};}
    page(tab){if(tab!=='characters')return null;const s=this.apiState();this.revision=s.revision||0;const managed=s.mode==='managed';const blocked=s.mode==='blocked';const active=s.active;
      const slots=(s.slots||[]).map(slot=>{const x=this.summary(slot),is=slot.id===active;return `<article class="chars-card ${is?'is-current':''}" data-slot="${esc(slot.id)}"><div class="chars-card-top">${this.portrait(x.visitor)}<div><small>${is?'CURRENT CHARACTER':'LOCAL CHARACTER'}</small><h3>${esc(x.name)}</h3><p>Level ${x.level} · Day ${x.day}</p></div></div><p class="chars-story">${esc(x.project)}</p><p class="chars-loadout"><span>${esc(x.weapon)}</span><span>${esc(wText(slot))}</span></p><div class="chars-card-actions">${is?'<span class="chars-current">You are here</span>':btn('Play this character','chars-switch',slot.id,blocked||!s.writable)}${btn('Export','chars-export',slot.id)}${!is&&slots.length>1?btn('Delete','chars-delete',slot.id,blocked||!s.writable):''}</div></article>`;});
      // legacy storage can still offer creation: the persistence layer acquires
      // its managed lock when the user confirms. Managed read-only storage stays inert.
      const canCreate=!blocked&&(s.mode==='legacy'||s.writable)&&(s.slots||[]).length<(s.limit||3); const p=this.preview||{name:this.name,skin:this.palette,cloak:this.palette,hair:this.palette};
      const creation=`<section class="chars-create"><div><small>MAKE ROOM FOR ANOTHER STORY</small><h3>Begin a new character</h3><p>Your existing character keeps every item, crop, companion and note. A new slot begins with a clean world.</p></div><div class="chars-create-form">${this.portrait({skin:p.skin,cloak:p.cloak,hair:p.hair},true)}<label for="chars-name">Character name</label><input id="chars-name" maxlength="32" autocomplete="off" value="${esc(p.name||'')}" placeholder="Give them a name"><span class="chars-label">Choose a look</span><div class="chars-swatches" role="group" aria-label="Character palettes">${palettes.map((q,i)=>`<button type="button" class="chars-swatch" style="--chars-swatch:${q.cloak}" data-rpg="chars-palette" data-id="${i}" aria-label="Palette ${i+1}" aria-pressed="${i===Number(p.skin)}"></button>`).join('')}</div>${btn('Create character','chars-create','',!canCreate||!String(p.name||'').trim()||String(p.name).length>32,'class="chars-primary"')}<p class="chars-hint">${blocked?'Character storage is blocked. Reload to try again.':!s.writable?(s.error||'Another Firstlight window is using character storage.'):!canCreate?'Your three local character places are full.':'Names can be 1–32 characters.'}</p></div></section>`;
      const imp=this.importPreview?`<section class="chars-import-preview"><small>READY TO ADD</small><h3>${esc(this.summary({world:this.importPreview}).name)}</h3><p>This world will be added as a new character slot. Nothing is replaced.</p>${btn('Confirm import','chars-confirm-import','',blocked||!s.writable||slots.length>=(s.limit||3),'class="chars-primary"')} ${btn('Cancel','chars-cancel-import')}</section>`:'';
      const deletePanel=this.deleteId?this.deletePrompt(s):'';
      return {title:'Your characters',html:`<div class="chars-page"><header class="chars-intro"><div><small>YOUR LOCAL STORIES</small><h2>Choose who you will become.</h2><p>Each character carries a complete little world of their own.</p></div><div class="chars-tools">${btn('Import character','chars-import','',blocked||!s.writable||slots.length>=(s.limit||3))}${btn('Reload storage','chars-reload', '', false)}</div></header>${blocked?`<div class="chars-notice chars-blocked"><strong>Character storage needs attention.</strong><span>${esc(s.error||'Reload the local world before changing characters.')}</span></div>`:''}<section class="chars-grid">${slots.join('')}</section>${creation}${imp}${deletePanel}</div>`};
    }
    deletePrompt(s){const slot=(s.slots||[]).find(x=>x.id===this.deleteId),x=this.summary(slot||{});return `<section class="chars-delete-panel"><small>REMOVE LOCAL CHARACTER</small><h3>Delete ${esc(x.name)}?</h3><p>This removes this character’s complete world. Type the exact name to continue.</p><label for="chars-delete-name">Character name</label><input id="chars-delete-name" autocomplete="off" placeholder="${esc(x.name)}"><div>${btn('Delete permanently','chars-confirm-delete',this.deleteId,!s.writable,'class="chars-danger"')} ${btn('Keep character','chars-cancel-delete')}</div></section>`;}
    attach(){const input=document.querySelector('#chars-name');if(input)input.addEventListener('input',()=>{this.name=input.value;this.preview=this.preview||{};this.preview.name=input.value;});}
    action(el){if(!el||!el.dataset||!String(el.dataset.rpg||'').startsWith('chars-'))return false;const act=el.dataset.rpg,id=el.dataset.id;const refresh=()=>{if(this.rpg.dialog?.open)this.rpg.paint();};
      if(act==='chars-palette'){this.palette=Number(id)||0;this.preview=this.preview||{};this.preview.skin=this.preview.cloak=this.preview.hair=this.palette;refresh();return true;}
      if(act==='chars-delete'){this.deleteId=id;refresh();document.querySelector('#chars-delete-name')?.focus();return true;}
      if(act==='chars-cancel-delete'){this.deleteId=null;refresh();return true;}
      if(act==='chars-cancel-import'){this.importPreview=null;refresh();return true;}
      if(act==='chars-export'){this.rpg.api.characterExport(id);return true;}
      if(act==='chars-import'){Promise.resolve(this.rpg.api.characterImport?.()).then(w=>{if(w)this.previewImport(w);}).catch(e=>this.rpg.api.toast?.(e.message||'Import cancelled.'));return true;}
      if(act==='chars-reload'){this.rpg.api.characterReload?.();return true;}
      const expected=this.revision;
      if(act==='chars-create'){const p=this.preview||{name:this.name,skin:this.palette,cloak:this.palette,hair:this.palette};this.rpg.api.characterAction('create',{visitor:{name:String(p.name||'').trim(),skin:Number(p.skin)||0,cloak:Number(p.cloak)||0,hair:Number(p.hair)||0}},expected).then(r=>{if(!r.ok)this.rpg.api.toast?.(r.error);else{this.reset();this.rpg.paint();}});return true;}
      if(act==='chars-switch'){this.rpg.api.characterAction('switch',{id},expected).then(r=>{if(!r.ok)this.rpg.api.toast?.(r.error);});return true;}
      if(act==='chars-confirm-import'){this.rpg.api.characterAction('import',{world:this.importPreview},expected).then(r=>{if(!r.ok)this.rpg.api.toast?.(r.error);else{this.reset();this.rpg.paint();}});return true;}
      if(act==='chars-confirm-delete'){const name=document.querySelector('#chars-delete-name')?.value||'';this.rpg.api.characterAction('delete',{id,confirmName:name},expected).then(r=>{if(!r.ok)this.rpg.api.toast?.(r.error);else{this.deleteId=null;this.rpg.paint();}});return true;}
      return true;
    }
  }
  function wText(slot){const w=worldOf(slot);return w.adventure?.chapter?'Chapter '+w.adventure.chapter:'Firstlight valley';}
  G.RealmCharactersUI={CharactersUI};
})(globalThis);
