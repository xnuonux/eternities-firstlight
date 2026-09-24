/* Original short folk arrangements, separate from the visitor's composed score. */
(function(G){'use strict';
const Q=G.RealmGathering||(typeof require==='function'?require('./gathering.js'):null);
const RATE=24000,BEAT=.48,DURATION=26;
function score(id){if(!Q.validVerse(id))throw Error('Unknown arrangement');const d=Q.VERSES[id],notes=[],roots=[50,55,47,57];
 for(let bar=0;bar<8;bar++){
  const start=bar*6*BEAT,root=roots[bar%4];notes.push({m:root,t:start,d:2.7,level:.12,pan:-.18});
  for(let k=0;k<6;k++)notes.push({m:root+12+[0,7,12,7,4,7][k],t:start+k*BEAT,d:1,level:id==='quarry'?.052:.037,pan:.25});
  for(let k=0;k<2;k++)notes.push({m:d.pitches[bar*2+k],t:start+k*3*BEAT+.035,d:id==='detour'?1.6:1.32,level:.15,pan:-.08});
 }return notes;
}
function render(id,rate=RATE){if(!Number.isInteger(rate)||rate<8000||rate>96000)throw Error('Unsupported sample rate');
 const channels=[new Float32Array(Math.ceil(rate*DURATION)),new Float32Array(Math.ceil(rate*DURATION))];
 for(const n of score(id)){const f=440*Math.pow(2,(n.m-69)/12),begin=Math.round(n.t*rate),len=Math.ceil(n.d*rate),left=Math.sqrt((1-n.pan)/2),right=Math.sqrt((1+n.pan)/2);
  for(let i=0;i<len&&begin+i<channels[0].length;i++){const t=i/rate,attack=Math.min(1,t/.012),tail=Math.max(0,Math.min(1,(n.d-t)/.12)),env=attack*tail*Math.exp(-t*2.8/n.d),phase=2*Math.PI*f*t;
   const v=n.level*env*(Math.sin(phase)+.28*Math.exp(-t*3)*Math.sin(2*phase)+.10*Math.exp(-t*5)*Math.sin(3*phase));channels[0][begin+i]+=v*left;channels[1][begin+i]+=v*right;
  }
 }
 for(const a of channels){const delay=Math.floor(rate*.16);for(let i=a.length-1;i>=delay;i--)a[i]+=a[i-delay]*.12;for(let i=0;i<a.length;i++)a[i]=Math.tanh(a[i])*Math.min(1,(a.length-i)/(rate*.6));}
 return{rate,channels,duration:DURATION};
}
class Player{
 constructor(){this.source=null;this.gain=null;this.owner=null;this.generation=0;this.cache=new Map();this.status='idle';}
 stop(){
  this.generation++;const s=this.source,g=this.gain;
  this.source=null;this.gain=null;this.owner=null;this.status='idle';
  if(s){s.onended=null;try{s.stop();}catch{}try{s.disconnect();}catch{}}
  if(g)try{g.disconnect();}catch{}
 }
 async play(id,audio,owner,eligible=()=>true){
  this.stop();const token=this.generation;
  if(!Q.validVerse(id)||!owner||typeof eligible!=='function')return false;
  this.owner=owner;this.status='starting';
  const fail=()=>{if(token===this.generation)this.stop();return false;};
  try{
   if(!audio)return fail();
   if(!audio.enabled){if(typeof audio.enable!=='function'||!await audio.enable())return fail();}
   if(token!==this.generation)return false;
   const ctx=audio.ctx;
   if(!ctx||!audio.master||ctx.state==='closed')return fail();
   if(ctx.state!=='running'){
    if(typeof ctx.resume!=='function')return fail();
    await ctx.resume();
   }
   // A user can leave, mute, close the menu or choose a new character while the
   // browser asks to resume audio. Never let that old request start afterward.
   if(token!==this.generation)return false;
   if(this.owner!==owner||ctx!==audio.ctx||!audio.enabled||ctx.state!=='running'||!eligible())return fail();
   let data=this.cache.get(id);if(!data){data=render(id);this.cache.set(id,data);}
   const buffer=ctx.createBuffer(2,data.channels[0].length,data.rate);
   data.channels.forEach((v,i)=>buffer.copyToChannel(v,i));
   const source=ctx.createBufferSource();this.source=source;
   const gain=ctx.createGain();this.gain=gain;
   gain.gain.value=.75;source.buffer=buffer;source.connect(gain).connect(audio.master);
   source.onended=()=>{if(this.generation===token)this.stop();};
   source.start();this.status='playing';return true;
  }catch{return fail();}
 }
}
G.RealmGatheringMusic={RATE,DURATION,score,render,Player};if(typeof module!=='undefined')module.exports=G.RealmGatheringMusic;
})(globalThis);
