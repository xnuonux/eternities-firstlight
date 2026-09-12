'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {M,reflectionVP,WATER_HEIGHT}=require('../src/engine.js');
const near=(a,b,eps=2e-5)=>assert.ok(Math.abs(a-b)<eps,`${a} != ${b}`);
test('horizontal reflection keeps every point on its plane fixed',()=>{
 for(const h of [WATER_HEIGHT,0,3.75,-2]) for(const p of [[-7,h,2],[9,h,-6],[0,h,0]]){
  M.transform(M.reflectY(h),p).forEach((v,i)=>near(v,p[i]));
 }
});
test('reflection applied twice restores a point',()=>{
 for(const p of [[4,7,2],[-8,-3,11],[0,0,0]]){
  const q=M.transform(M.mul(M.reflectY(),M.reflectY()),p);
  q.forEach((v,i)=>near(v,p[i]));
 }
});
test('actual render matrix keeps contact UV invariant at many view angles',()=>{
 for(const yaw of [0,.4,1.2,2.8,4.3,5.9])for(const elevation of [.35,.65,1.1]){
  const eye=[Math.sin(yaw)*50,Math.sin(elevation)*50,Math.cos(yaw)*50];
  const vp=M.mul(M.ortho(-30,30,-20,20,.1,200),M.look(eye,[7,1,2]));
  for(const p of [[-5,WATER_HEIGHT,4],[12,WATER_HEIGHT,-4],[37,WATER_HEIGHT,0]]){
   const main=M.transform(vp,p),refl=M.transform(reflectionVP(vp),p);
   near(main[0],refl[0]);near(main[1],refl[1]);
  }
 }
});
test('reflected height changes vertical position but not lateral direction',()=>{
 for(const yaw of [.3,1.3,2.3,3.3,4.3,5.3]){
  const vp=M.mul(M.ortho(-20,20,-20,20,.1,200),M.look([Math.sin(yaw)*30,25,Math.cos(yaw)*30],[0,0,0]));
  const point=[6,5,3],a=M.transform(vp,point),b=M.transform(reflectionVP(vp),point);
  near(a[0],b[0]);assert.ok(b[1]<a[1]);
 }
});
test('regression specimen detects the previous reflected-lookAt defect',()=>{
 const eye=[28,25,30],target=[0,1,0],p=[6,WATER_HEIGHT,1],proj=M.ortho(-25,25,-20,20,.1,180);
 const vp=M.mul(proj,M.look(eye,target));
 const old=M.mul(proj,M.look([28,-25,30],[0,-1,0],[0,-1,0]));
 const expected=M.transform(vp,p),incorrect=M.transform(old,p),fixed=M.transform(reflectionVP(vp),p);
 assert.ok(Math.abs(incorrect[0]-expected[0])>.1);near(expected[0],fixed[0]);
});
test('non-finite reflection height is rejected',()=>{
 for(const h of [NaN,Infinity,-Infinity])assert.throws(()=>M.reflectY(h));
});
