/* Physical evidence is scenery. Art does not accept, observe or complete the quest. */
(function(G){'use strict';
function draw(out,sim){const N=G.RealmEarthNotes,s=sim.state.adventure.earthNotes,E=G.RealmEarth;
 const box=(p,size,c,r=0)=>out.box.push({p,s:size,c,r:[0,r,0],rough:.92});
 if(sim.room===E.ROOM)for(const m of N.MARKS){const x=m.x-1.15,z=m.z,y=E.height(x,z);box([x,y+.14,z],[.9,.28,1.05],'#777f71',.04);box([x,y+.31,z],[.8,.07,.92],'#acb29a');for(const dx of [-.14,.14])box([x+dx,y+.35,z],[.035,.015,.84],'#374e43');box([x+.35,y+.16,z+.25],[.19,.22,.4],'#657257');}
 if(sim.room!=='observatory'||!sim.state.adventure.earthStory.arrived)return;
 // Use the existing desk surface. The chart is on the side wall after completion.
 box([-.75,2.25,-1.1],[.65,.015,.46],'#e0d2ab',.15);box([-.78,2.265,-1.1],[.38,.008,.026],'#695b42',.15);
 if(s.accepted)for(let i=0;i<s.marks.length;i++){box([-.4+i*.36,2.265,-1.7],[.28,.016,.5],'#ddd1af');for(const dx of [-.04,.04])box([-.4+i*.36+dx,2.28,-1.7],[.016,.009,.35],'#687769');}
 if(s.interpretation){box([-5.16,3,1.4],[.07,1.8,1.6],'#715840');box([-5.11,3,1.4],[.02,1.6,1.42],'#e0d2ab');for(const dy of [-.5,0,.5])box([-5.09,3+dy,1.4],[.015,.22,.22],'#7e8877');for(const dz of [-.07,.07])box([-5.075,3,1.4+dz],[.015,1.4,.025],'#a05f3c');}
}
G.RealmEarthNotesArt={draw};
})(globalThis);
