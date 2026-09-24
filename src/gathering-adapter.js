/* Isolated extension of the existing adventure authority. Base rules remain intact.
 * Loaded before app.js in browsers; preloaded before rules/journeys by verification.
 * New schema 10 is deliberately refused by older builds rather than silently lost.
 */
(function(G){'use strict';
const A=G.RealmAdventure||(typeof require==='function'?require('./adventure.js'):null);
const Q=G.RealmGathering||(typeof require==='function'?require('./gathering.js'):null);
if(A.gatheringExtension)return;
if(A.VERSION!==9)throw Error('Gathering requires adventure schema 9 as its reviewed base.');
const base={fresh:A.fresh,validate:A.validate,command:A.command},VERSION=10;
A.fresh=function(){return{...base.fresh(),version:VERSION,earthGathering:Q.fresh()};};
A.validate=function(raw){
 if(!raw||typeof raw!=='object'||Array.isArray(raw))return base.validate(raw);
 if(raw.version>VERSION)throw Error('Unsupported future adventure version. Keep a backup and use a newer build.');
 const newer=raw.version===VERSION;
 const a=base.validate(newer?{...raw,version:9}:raw);
 return{...a,version:VERSION,earthGathering:Q.validate(newer?raw.earthGathering:Q.fresh(),a)};
};
A.command=function(sim,id,type,payload={}){
 if(typeof type!=='string'||!type.startsWith('gathering-'))return base.command(sim,id,type,payload);
 const a=sim.state.adventure,fail=error=>({ok:false,error});
 if(typeof id!=='string'||!id||id.length>100||!payload||typeof payload!=='object'||Array.isArray(payload))return fail('Invalid command envelope.');
 let fp;try{fp=JSON.stringify([type,payload]);}catch{return fail('Invalid command content.');}
 if(fp.length>500)return fail('Command too large.');
 const previous=a.receipts.find(r=>r.id===id);if(previous)return previous.fp===fp?{ok:previous.ok,duplicate:true}:fail('Command identity reused with different terms.');
 if(a.revision>=1e9)return fail('Adventure revision limit reached. Export this world.');
 if(sim.paused)return fail('Resume time before taking this action.');
 if(a.hp<=0)return fail('Return to the spring before continuing.');
 const result=Q.handle(sim,type,payload);if(!result?.ok)return result||fail('Unknown gathering action.');
 a.revision++;a.receipts.push({id,fp,ok:true});if(a.receipts.length>100)a.receipts.shift();return result;
};
A.VERSION=VERSION;A.gatheringExtension=Object.freeze({version:1,baseVersion:9,versionAfter:VERSION});
if(typeof module!=='undefined')module.exports=A;
})(globalThis);
