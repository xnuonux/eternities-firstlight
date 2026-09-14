(function(G){'use strict';
const P=G.RealmPursuit;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const btn=(label,action,id='',disabled=false)=>`<button data-rpg="${action}" data-id="${esc(id)}" ${disabled?'disabled':''}>${label}</button>`;
class PursuitUI{
 constructor(ui){this.ui=ui;this.selected=null;}
 action(el){const act=el.dataset.rpg,id=el.dataset.id,a=this.ui.state;if(!['pursuit-pin','pursuit-start','pursuit-sample','pursuit-claim','pursuit-fit'].includes(act))return false;
  let p={}; if(act==='pursuit-pin')p={weapon:id||null}; if(act==='pursuit-start')p={after:a.pursuit.claimed}; if(act==='pursuit-sample')p={run:a.pursuit.active?.id,id}; if(act==='pursuit-claim'||act==='pursuit-fit')p=act==='pursuit-claim'?{run:a.pursuit.active?.id}:{weapon:id.split(':')[0],step:Number(id.split(':')[1])};
  const r=this.ui.run(act,p);if(r?.text)this.ui.api.toast(r.text);if(r?.ok)this.ui.api.save();this.ui.paint();return true;
 }
 page(tab){return tab==='pursuit'?{title:'Field guide',html:this.html()}:null;}
 html(){const a=this.ui.state,p=a.pursuit||{claimed:0,active:null,pinned:null,fittings:{}};const cat=P.catalogue(a)||[],pin=cat.find(x=>x.id===p.pinned),run=p.active;
  const card=x=>{const c=P.compare(a,x.id),fit=p.fittings[x.id]||0,n=P.recipe(a,x.id);return `<article class="guide-gear ${pin?.id===x.id?'is-pinned':''}"><div><small>${esc(x.style)} · tier ${esc(x.tier)}</small><h4>${esc(x.name)}</h4><p>${x.owned?'Owned':'Attainable here'} · ${x.source?.label?esc(x.source.label):'Source recorded in the field guide'}</p></div><div class="guide-stats"><span>Now <b>${c.current?.attack??'—'}</b></span><span>Next <b>${c.next?.attack??'—'}</b></span><span>Reach <b>${c.current?.reach??'—'}</b></span><span>Cadence <b>${c.current?.cadence??'—'}</b></span></div><div class="button-row">${x.pinnable?btn(pin?.id===x.id?'Unpin':'Pin project','pursuit-pin',x.id):'<span class="fineprint">Quest source · once only</span>'}${x.owned?btn(fit>=2?'Two fittings complete':`Fit ${fit+1===1?'copper':'pale-metal'} band`,'pursuit-fit',`${x.id}:${fit+1}`,!n||fit>=2):''}</div></article>`;};
  return `<div class="pursuit-guide"><div class="guide-intro"><small>FIELD GUIDE · ONE PINNED PROJECT</small><h3>Find an upgrade worth hunting</h3><p>Choose one real weapon, follow its recorded source, and compare the next fitting before spending anything.</p></div><section class="guide-project"><div class="guide-project-head"><div><small>PROJECT TRACKER</small><h4>${pin?esc(pin.name):'No equipment pinned'}</h4></div><strong>${p.claimed} survey${p.claimed===1?'':'s'} paid</strong></div>${run?`<p class="guide-active"><b>Riverbank survey ${esc(run.id.split('/').pop())}</b> · ${run.defeated?.length||0}/2 skitters · ${run.samples?.length||0}/2 samples. Leave and return to Oren to claim.</p>${['west-sample','east-sample'].map(id=>btn(run.samples?.includes(id)?'Sample recorded':`Record ${id.startsWith('west')?'west':'east'} sample`,'pursuit-sample',id,run.samples?.includes(id))).join('')} ${btn('Claim 3 ore · 4 sunmarks · 2 fibre','pursuit-claim','',!P.complete(a))}`:btn('Start repeatable riverbank survey','pursuit-start','',!!run)}<p class="fineprint">Every completed run pays exactly 3 copper ore, 4 sunmarks and 2 meadow fibre, with 0 XP. Partial progress saves and resumes; two finite fittings per weapon.</p></section><section class="guide-list">${cat.map(card).join('')}</section></div>`;
 }
}
G.RealmPursuitUI={PursuitUI};
})(globalThis);
