'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const C=require('../src/core.js');

test('per-view preferences roundtrip without changing progression or creative content',()=>{
 const s=C.fresh();s.settings.cameraViews={version:1,lastDiorama:'tactical',profiles:{
  adventure:{yaw:1.2,elevation:.31,distance:10},follow:{yaw:.8,elevation:.9,zoom:1.3},
  tactical:{yaw:2,elevation:1.1,zoom:.8},wide:{yaw:0,elevation:.7,zoom:1}}};
 assert.deepEqual(C.validate(s),s);
});

test('old camera preferences acquire empty view memory and keep their selected mode',()=>{
 const s=C.fresh();delete s.settings.cameraViews;s.settings.cameraMode='follow';s.settings.cameraFov=72;
 const v=C.validate(s);assert.deepEqual(v.settings.cameraViews,{version:1,lastDiorama:'follow',profiles:{}});
 delete v.settings.cameraViews;assert.deepEqual(v,s);
});

test('invalid optional view profiles cannot inject nonfinite camera state or discard valid peers',()=>{
 const s=C.fresh();s.settings.cameraViews={version:1,lastDiorama:'invalid',profiles:{
  adventure:{yaw:NaN,elevation:.3,distance:8},follow:{yaw:.8,elevation:.9,zoom:1.3},
  tactical:{yaw:1,elevation:-5,zoom:1},wide:{yaw:1,elevation:.9,zoom:Infinity},extra:{yaw:1}}};
 const v=C.validate(s);assert.deepEqual(v.settings.cameraViews,{version:1,lastDiorama:'follow',profiles:{follow:{yaw:.8,elevation:.9,zoom:1.3}}});
 assert.deepEqual(v.adventure,s.adventure);assert.deepEqual(v.retreat,s.retreat);assert.deepEqual(v.score,s.score);
});

test('unknown view-memory versions fall back while keeping ordinary settings and saves',()=>{
 const s=C.fresh();s.settings.cameraMode='wide';s.settings.cameraViews={version:99,lastDiorama:'wide',profiles:{follow:{yaw:1,elevation:.8,zoom:1}}};
 const v=C.validate(s);assert.deepEqual(v.settings.cameraViews,{version:1,lastDiorama:'follow',profiles:{}});
 assert.equal(v.settings.cameraMode,'wide');assert.deepEqual(v.adventure,s.adventure);
});
