/* Independent gameplay variant, no runtime position/inventory grants. */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
require('./arsenal_journey.cjs').journey();
const start=JSON.parse(fs.readFileSync(path.join(__dirname,'../evidence08/BOW_ROAD_READY_EARNED.json')));
const report=require('./road_journey.cjs').journey({start,out:path.join(__dirname,'../evidence08/ranged-road')});
assert.equal(report.weapon,'trail_bow');assert.equal(report.status,'passed');
console.log(JSON.stringify(report,null,2));
