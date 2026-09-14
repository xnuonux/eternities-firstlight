/* Explicit character identity and one bounded technique per prototype class.
 * Equipment, profession, companion and soul choices remain separate systems. */
(function(G){'use strict';
const VERSION=1;
const DEFINITIONS=Object.freeze({
 hunter:Object.freeze({id:'hunter',name:'Hunter',technique:'quarry-mark',techniqueName:'Quarry mark',cost:15,cooldown:8,duration:8,range:11,color:0xa8d68d,description:'Mark a visible target for 8 seconds. Your next confirmed weapon hit against it adds 50% damage, up to 24 extra. Misses and companion strikes do not spend the mark.'}),
 magician:Object.freeze({id:'magician',name:'Magician',technique:'arcane-flare',techniqueName:'Arcane flare',cost:25,cooldown:10,duration:0,range:8,color:0xc3a3ed,description:'Strike a visible target within 8 paces with a focused spell. Damage is 8 plus 75% of your current attack, rounded. This instant spell is separate from your weapon.'})
});
const known=id=>typeof id==='string'&&Object.hasOwn(DEFINITIONS,id);
function fresh(){return{version:VERSION,choice:null,readyAt:0};}
function validate(raw,a){
 const bad=why=>{throw Error('Invalid class path: '+why);};
 if(!raw||typeof raw!=='object'||Array.isArray(raw)||raw.version!==VERSION)bad('version');
 if(raw.choice!==null&&!known(raw.choice))bad('choice');
 if(!Number.isFinite(raw.readyAt)||raw.readyAt<0||raw.readyAt>1e9+10)bad('cooldown');
 if(raw.choice===null&&raw.readyAt!==0||raw.choice!==null&&!a.started)bad('choice prerequisites');
 if(raw.choice!==null&&raw.readyAt>a.elapsed+DEFINITIONS[raw.choice].cooldown+1e-6)bad('future cooldown');
 return{version:VERSION,choice:raw.choice,readyAt:raw.readyAt};
}
function definition(a){return known(a.classPath?.choice)?DEFINITIONS[a.classPath.choice]:null;}
function preview(a,id){if(!known(id))return{damage:0,bonus:0};const n=G.RealmAdventure.stats(a).attack;return{damage:id==='magician'?Math.round(8+n*.75):n,bonus:id==='hunter'?Math.min(24,Math.round(n*.5)):0};}
function canChoose(sim){const a=sim.state.adventure;return a.started&&a.hp>0&&!definition(a)&&!sim.room&&Math.hypot(sim.state.player.x-11,sim.state.player.z-9)<3;}
function runtime(sim){
 const r=G.RealmAdventure.runtime(sim),run=r.pursuitRun||null;
 if(!r.classRuntime||r.classRuntime.scene!==sim.room||r.classRuntime.run!==run)r.classRuntime={scene:sim.room,run,mark:null};
 const k=r.classRuntime;if(k.mark&&(sim.state.adventure.elapsed>=k.mark.until||!r.enemies.includes(k.mark.enemy)||k.mark.enemy.hp<=0))k.mark=null;
 return k;
}
function status(sim){const a=sim.state.adventure,d=definition(a),mark=runtime(sim).mark;return{id:d?.id||null,name:d?.techniqueName||'Choose a class',description:d?.description||'An optional path chosen at Oren’s workshop.',cost:d?.cost||0,cooldown:d?.cooldown||1,readyAt:a.classPath?.readyAt||0,remaining:Math.max(0,(a.classPath?.readyAt||0)-a.elapsed),markedTarget:mark?.enemy.id||null,markRemaining:mark?Math.max(0,mark.until-a.elapsed):0};}
function weaponDamage(sim,e,n,source){const d=definition(sim.state.adventure),k=runtime(sim);if(source!=='weapon'||d?.id!=='hunter'||k.mark?.enemy!==e)return n;const bonus=Math.min(24,Math.round(n*.5));k.mark=null;G.RealmAdventure.fx(sim,'quarry-hit',e.x,e.z,d.color);return n+bonus;}
function handle(sim,type,p={}){
 if(type!=='class-choose'&&type!=='class-technique')return null;
 const A=G.RealmAdventure,a=sim.state.adventure,fail=error=>({ok:false,error}),yes=text=>({ok:true,text});
 if(type==='class-choose'){
  if(!known(p.id)||p.confirm!==true)return fail('Preview a known class and explicitly confirm your choice.');
  if(!canChoose(sim))return fail(definition(a)?'This character has already chosen a class.':'Take the expedition kit and visit Oren’s workshop to choose a class.');
  a.classPath={version:VERSION,choice:p.id,readyAt:0};sim.event('choice','You chose the '+DEFINITIONS[p.id].name+' path. Your equipment, profession, companion and soul remain your own choices.');return yes(DEFINITIONS[p.id].name+' chosen · '+DEFINITIONS[p.id].techniqueName+' is ready on X.');
 }
 const d=definition(a);if(!d)return fail('Choose a class at Oren’s workshop, or continue unassigned.');
 if(!a.started||a.hp<=0||sim.paused||!A.combatScene(sim)||sim.room==='range')return fail('Use your technique in the field or at Oren’s riverbank practice bundle.');
 if(a.elapsed<a.classPath.readyAt)return fail(d.techniqueName+' is recovering.');
 const e=G.RealmCombat.selected(sim),p0=sim.state.player;
 if(!e||Math.hypot(e.x-p0.x,e.z-p0.z)>d.range)return fail('Select a visible target within '+d.range+' paces.');
 if(!G.RealmArsenal.aimClear(sim,p0,e))return fail('Line of sight blocked.');
 if(a.stamina<d.cost)return fail(d.techniqueName+' needs '+d.cost+' stamina.');
 a.stamina-=d.cost;a.classPath.readyAt=a.elapsed+d.cooldown;p0.yaw=Math.atan2(e.x-p0.x,e.z-p0.z);
 if(d.id==='hunter'){runtime(sim).mark={enemy:e,until:a.elapsed+d.duration};A.fx(sim,'quarry-mark',e.x,e.z,d.color);return yes('Quarry marked · the next confirmed weapon hit gains up to 24 damage.');}
 const damage=preview(a,d.id).damage;A.damageEnemy(sim,e,damage,'class');A.fx(sim,'arcane-cast',p0.x,p0.z,d.color);A.fx(sim,'arcane-flare',e.x,e.z,d.color);return yes('Arcane flare · '+damage+' spell damage.');
}
G.RealmClasses={VERSION,DEFINITIONS,fresh,validate,definition,preview,canChoose,runtime,status,weaponDamage,handle};if(typeof module!=='undefined')module.exports=G.RealmClasses;
})(globalThis);
