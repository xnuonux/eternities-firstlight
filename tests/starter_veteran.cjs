/* Reproduce the strongest campaign loadout through all four accepted journeys. */
'use strict';
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../evidence10/veteran-earned'),one=path.join(root,'chapter1'),two=path.join(root,'chapter2'),three=path.join(root,'chapter3'),four=path.resolve(__dirname,'../evidence10/veteran-source');
const reports=[];
reports.push(require('./chapter_journey.cjs').journey({reward:'dawn_edge',out:one}));
reports.push(require('./road_journey.cjs').journey({out:two,start:JSON.parse(fs.readFileSync(path.join(one,'CHAPTER_COMPLETED.json')))}));
reports.push(require('./beacon_journey.cjs').journey({out:three,source:path.join(two,'CHAPTER_II_COMPLETE_EARNED.json')}));
reports.push(require('./crossing_journey.cjs').journey({out:four,source:path.join(three,'CHAPTER_III_COMPLETE_EARNED.json')}));
const veteran=require('./starter_journey.cjs').veteran();
console.log(JSON.stringify({status:'passed',campaignCommands:reports.map(r=>r.acceptedCommands??r.commands),starter:{...veteran,actions:undefined}},null,2));
