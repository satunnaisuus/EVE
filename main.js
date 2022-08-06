(()=>{"use strict";var e,t={2500:(e,t,n)=>{n.r(t),n.d(t,{default:()=>r});const r=n.p+"armor.svg"},7308:(e,t,n)=>{n.r(t),n.d(t,{default:()=>r});const r=n.p+"chloroplast.svg"},4748:(e,t,n)=>{n.r(t),n.d(t,{default:()=>r});const r=n.p+"eye.svg"},1220:(e,t,n)=>{n.r(t),n.d(t,{default:()=>r});const r=n.p+"fin.svg"},7122:(e,t,n)=>{n.r(t),n.d(t,{default:()=>r});const r=n.p+"mouth.svg"},3552:(e,t,n)=>{n.r(t),n.d(t,{default:()=>r});const r=n.p+"oxidizer.svg"},4242:(e,t,n)=>{n.r(t),n.d(t,{default:()=>r});const r=n.p+"spine.svg"},4766:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.shuffle=void 0,t.shuffle=function(e){const t=e;for(let e=t.length-1;e>0;e--){const n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}},4904:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AssertLessOrEqualThanError=t.AssertLessThanError=t.AssertGreaterOrEqualThanError=t.AssertGreaterThanError=t.AssertIntegerError=t.AssertError=t.assertLessOrEqualThan=t.assertLessThan=t.assertGreaterOrEqualThan=t.assertGreaterThan=t.assertInteger=void 0,t.assertInteger=function(e){if(!Number.isInteger(e))throw new r},t.assertGreaterThan=function(e,t){if(e<=t)throw new o},t.assertGreaterOrEqualThan=function(e,t){if(e<t)throw new i},t.assertLessThan=function(e,t){if(e>=t)throw new s},t.assertLessOrEqualThan=function(e,t){if(e>t)throw new a};class n extends Error{}t.AssertError=n;class r extends n{}t.AssertIntegerError=r;class o extends n{}t.AssertGreaterThanError=o;class i extends n{}t.AssertGreaterOrEqualThanError=i;class s extends n{}t.AssertLessThanError=s;class a extends n{}t.AssertLessOrEqualThanError=a},6469:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Color=void 0;const r=n(5629),o={};for(let e=0;e<256;e++)o[e]=e.toString(16),1===o[e].length&&(o[e]="0"+o[e]);class i{constructor(e,t,n){this.red=e,this.green=t,this.blue=n,e>255?this.red=255:e<0&&(this.red=0),t>255?this.green=255:t<0&&(this.green=0),n>255?this.blue=255:n<0&&(this.blue=0),this.hex="#"+o[this.red]+o[this.green]+o[this.blue]}getRed(){return this.red}getGreen(){return this.green}getBlue(){return this.blue}mix(e,t){return new i(Math.round(this.red*(1-t)+e.getRed()*t),Math.round(this.green*(1-t)+e.getGreen()*t),Math.round(this.blue*(1-t)+e.getBlue()*t))}toHexFormat(){return this.hex}equals(e){return this.blue===e.getBlue()&&this.red===e.getRed()&&this.green===e.getGreen()}toArray(){return[this.red,this.green,this.blue]}static random(){return new i((0,r.randomInt)(0,255),(0,r.randomInt)(0,255),(0,r.randomInt)(0,255))}static fromHex(e){return e.startsWith("#")&&(e=e.slice(1)),new i(parseInt(e.slice(0,2),16),parseInt(e.slice(2,4),16),parseInt(e.slice(4,6),16))}}t.Color=i},5629:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.randomInt=void 0,t.randomInt=function(e,t){const n=t-e+1;return Math.floor(Math.random()*n)+e}},2629:(e,t,n)=>{const r=n(7294),o=n(745),i=n(9378),s=n(1997),a=n(5935),l=n(9376),c=n(1332),u=n(7698),d=(0,o.createRoot)(document.getElementById("root")),h=new l.Store,m=new c.GenomeBankStore(new a.IndexedBdGenomeRepository);d.render(r.createElement(s.AppContext.Provider,{value:h},r.createElement(s.GenomeBankContext.Provider,{value:m},r.createElement(u.GlobalStyle,null),r.createElement(i.App,null))))},5120:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Colors=void 0;const r=n(6469);t.Colors={organic:r.Color.fromHex("#F0E9D2"),wall:r.Color.fromHex("#575757"),organism:r.Color.fromHex("#2155CD"),lifetimeMin:r.Color.fromHex("#000000"),lifetimeMax:r.Color.fromHex("#ffffff"),energyMin:r.Color.fromHex("#000000"),energyMax:r.Color.fromHex("#F8CB2E"),aggressionMin:r.Color.fromHex("#000000"),aggressionMax:r.Color.fromHex("#ff0000"),childrenMin:r.Color.fromHex("#000000"),childrenMax:r.Color.fromHex("#f542c8"),stepMin:r.Color.fromHex("#000000"),stepMax:r.Color.fromHex("#f57b42"),actions:[r.Color.fromHex("#ffffff"),r.Color.fromHex("#03fcc2"),r.Color.fromHex("#03cafc"),r.Color.fromHex("#aaf200"),r.Color.fromHex("#a705f7"),r.Color.fromHex("#ff0000"),r.Color.fromHex("#ff00f2"),r.Color.fromHex("#ffffff"),r.Color.fromHex("#00ff00"),r.Color.fromHex("#0000ff")],supplyOrganic:r.Color.fromHex("#ff0000"),supplyPhotosynthesis:r.Color.fromHex("#00ff00"),supplyChemosynthesis:r.Color.fromHex("#0000ff")}},9408:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.WorkerRenderer=void 0;const r=n(9273);t.WorkerRenderer=class{constructor(){this.listeners={},this.lastId=0,this.worker=new r.default,this.worker.addEventListener("message",(e=>{this.listeners[e.data.id](e.data.data),delete this.listeners[e.data.id]}))}render(e,t,n,r,o,i,s,a){const l=++this.lastId;this.listeners[l]=e,this.worker.postMessage({id:l,width:t,height:n,offsetX:r,offsetY:o,scale:i,mode:s,data:{width:a.getWidth(),height:a.getHeight(),payload:a.getPayload(),array:a.getArray()}},[a.getArray().buffer])}terminate(){this.worker.terminate()}}},4040:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AbstractCell=void 0,t.AbstractCell=class{update(e,t){}isStatic(){return!0}isEmpty(){return!1}getId(){return 0}}},4591:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CellContext=void 0,Error,t.CellContext=class{constructor(e,t,n,r,o){this.grid=e,this.x=t,this.y=n,this.factory=r,this.parameters=o}moveByOffest(e,t){const n=this.grid.getCell(this.x,this.y);return!!this.grid.getCell(this.x+e,this.y+t).isEmpty()&&(this.grid.delete(this.x,this.y),this.grid.insert(this.x+e,this.y+t,n),!0)}deleteByOffset(e,t){this.grid.delete(this.x+e,this.y+t)}getByOffest(e,t){return this.grid.getCell(this.x+e,this.y+t)}replace(e){this.grid.delete(this.x,this.y),this.grid.insert(this.x,this.y,e(this.factory))}getLightEnergy(){return Math.round(this.parameters.photosynthesisEnergy*this.grid.getLightLevel(this.x,this.y)/100)}getMineralsEnergy(){return Math.round(this.parameters.chemosynthesisEnergy*this.grid.getMineralsLevel(this.x,this.y)/100)}getSimulationParameters(){return this.parameters}}},4240:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CellFactory=void 0;const r=n(7816),o=n(1165),i=n(347),s=n(4730),a=n(59),l=n(1890),c=n(6469),u=n(9191);t.CellFactory=class{constructor(){this.id=0}create(e,t){switch(e){case"wall":return this.createWall();case"empty":return this.createEmpty();case"organism":let e;return e=t.genome?new o.Genome(new u.Program(t.genome.program),c.Color.fromHex(t.genome.color),t.genome.divideLimit,t.genome.organs):o.Genome.createRandom(),this.createOrganism(e,255,(0,l.randomDirection)(),new c.Color(255,255,255));case"organic":return this.createOrganic(255)}throw new Error}createWall(){return this.wall?this.wall:this.wall=new a.WallCell}createEmpty(){return this.empty?this.empty:this.empty=new r.EmptyCell}createOrganism(e,t,n,r){return new s.OrganismCell(++this.id,e,t,n,r)}createOrganic(e){return new i.OrganicCell(e)}}},7816:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EmptyCell=void 0;const r=n(4040);class o extends r.AbstractCell{getType(){return"empty"}isEmpty(){return!0}serialize(){return{type:"empty"}}}t.EmptyCell=o},347:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.OrganicCell=void 0;const r=n(4040);class o extends r.AbstractCell{constructor(e){super(),this.energy=e}getEnergy(){return this.energy}getType(){return"organic"}serialize(){return{type:"organic",energy:this.energy}}}t.OrganicCell=o},4730:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.OrganismCell=t.ORGANS_COUNT=t.MAX_ENERGY=void 0;const r=n(6469),o=n(4040),i=n(1890),s=n(1165),a=n(4766),l=n(9616),c=n(8132),u=n(3993),d=n(1297),h=n(6481),m=n(6871),g=n(3007);t.MAX_ENERGY=255,t.ORGANS_COUNT=16;class p extends o.AbstractCell{constructor(e,t,n,r,o){super(),this.id=e,this.genome=t,this.energy=n,this.direction=r,this.supplyColor=o,this.lifetime=0,this.programCounter=0,this.organs=[],this.oxidizersCount=0,this.chloroplastsCount=0;for(const[e,n]of t.getOrgans().entries())switch(n){case s.Organ.EYE:this.organs.push(new u.Eye(this,e));break;case s.Organ.CHLOROPLAST:this.organs.push(new d.Chloroplast(this,e)),this.chloroplastsCount++;break;case s.Organ.OXIDIZER:this.organs.push(new h.Oxidizer(this,e)),this.oxidizersCount++;break;case s.Organ.ARMOUR:this.organs.push(new l.Armour(this,e));break;case s.Organ.SPINE:this.organs.push(new c.Spine(this,e));break;case s.Organ.FIN:this.organs.push(new m.Fin(this,e));break;case s.Organ.MOUTH:this.organs.push(new g.Mouth(this,e))}}getId(){return this.id}getType(){return"organism"}getLifetime(){return this.lifetime}getEnergy(){return this.energy}getDirection(){return this.direction}getGenome(){return this.genome}update(e,t){0!==this.energy?this.lifetime>=t.organismMaxLifetime?e.replace((e=>e.createOrganic(this.energy))):(this.genome.getProgram().execute(this,e),this.changeEnergy(-1),this.lifetime++,this.energy>=this.genome.getDivideEnergyLimit()&&this.divide(e)):e.replace((e=>e.createEmpty()))}setDirection(e){this.direction=e}divide(e){for(const t of(0,a.shuffle)((0,i.directionsList)())){const n=(0,i.getOffset)(t);if(e.getByOffest(n[0],n[1]).isEmpty())return e.moveByOffest(n[0],n[1]),this.changeEnergy(Math.floor(this.energy/-2)),void(this.energy>0&&e.replace((t=>t.createOrganism(this.genome.clone(e.getSimulationParameters().mutationChance),this.energy,(0,i.randomDirection)(),this.supplyColor))))}e.replace((e=>e.createOrganic(this.energy)))}changeEnergy(e){const n=this.energy;return this.energy+=Math.round(e),this.energy>t.MAX_ENERGY?this.energy=t.MAX_ENERGY:this.energy<0&&(this.energy=0),this.energy-n}isStatic(){return!1}isSimilar(e){return this.genome.isSimilar(e.getGenome())}getColor(){return this.genome.getColor()}getProgramCounter(){return this.programCounter}setProgramCounter(e){this.genome.getProgramLength()>e?this.programCounter=e:this.programCounter=0}addProgramCounterRelative(e){this.setProgramCounter(this.programCounter+=e)}getSupplyColor(){return this.supplyColor}getOrgan(e){return this.organs[e]}getChloroplastsCount(){return this.chloroplastsCount}getOxidizersCount(){return this.oxidizersCount}onAttack(e,t,n){if(0===this.energy)return 0;const r=this.organs[8+(0,i.rotateOnOffset)(this.direction,n)];return null===r?this.changeEnergy(-e):r instanceof l.Armour?r.onAttack(e):r instanceof c.Spine?r.onAttack(e,t):0}makeMoreRed(){this.supplyColor=new r.Color(this.supplyColor.getRed()+10,this.supplyColor.getGreen()-5,this.supplyColor.getBlue()-5)}makeMoreGreen(){this.supplyColor=new r.Color(this.supplyColor.getRed()-5,this.supplyColor.getGreen()+10,this.supplyColor.getBlue()-5)}makeMoreBlue(){this.supplyColor=new r.Color(this.supplyColor.getRed()-5,this.supplyColor.getGreen()-5,this.supplyColor.getBlue()+10)}serialize(){return{id:this.id,type:"organism",lifetime:this.lifetime,energy:this.energy,direction:this.direction,genome:this.genome.serialize(),programCounter:this.programCounter}}}t.OrganismCell=p},2138:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AbstractInstruction=void 0,t.AbstractInstruction=class{}},8503:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AbstractOrgan=void 0,t.AbstractOrgan=class{constructor(e,t){this.organism=e,this.position=t}use(e,t){return!0}}},1890:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.reverseDirection=t.rotateOnOffset=t.rotateRight=t.rotateLeft=t.randomDirection=t.getOffset=t.directionsList=t.Direction=void 0;const r=n(5629);var o;function i(e,t){let n=e+t;return n<0&&(n-=8*Math.floor(n/8)),n%8}!function(e){e[e.NORTH=0]="NORTH",e[e.NORTH_EAST=1]="NORTH_EAST",e[e.EAST=2]="EAST",e[e.SOUTH_EAST=3]="SOUTH_EAST",e[e.SOUTH=4]="SOUTH",e[e.SOUTH_WEST=5]="SOUTH_WEST",e[e.WEST=6]="WEST",e[e.NORTH_WEST=7]="NORTH_WEST"}(o=t.Direction||(t.Direction={})),t.directionsList=function(){return[o.NORTH,o.NORTH_EAST,o.EAST,o.SOUTH_EAST,o.SOUTH,o.SOUTH_WEST,o.WEST,o.NORTH_WEST]},t.getOffset=function(e){switch(e){case o.NORTH:return[0,-1];case o.NORTH_EAST:return[1,-1];case o.NORTH_WEST:return[-1,-1];case o.SOUTH:return[0,1];case o.SOUTH_EAST:return[1,1];case o.SOUTH_WEST:return[-1,1];case o.EAST:return[1,0];case o.WEST:return[-1,0]}},t.randomDirection=function(){return(0,r.randomInt)(0,7)},t.rotateLeft=function(e){return e===o.NORTH?o.NORTH_WEST:e-1},t.rotateRight=function(e){return e===o.NORTH_WEST?o.NORTH:e+1},t.rotateOnOffset=i,t.reverseDirection=function(e){return i(e,4)}},1165:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Genome=t.CURRENT_VERSION=t.Organ=void 0;const r=n(5629),o=n(6469),i=n(9191);var s;!function(e){e[e.NONE=0]="NONE",e[e.CHLOROPLAST=1]="CHLOROPLAST",e[e.OXIDIZER=2]="OXIDIZER",e[e.EYE=3]="EYE",e[e.MOUTH=4]="MOUTH",e[e.ARMOUR=5]="ARMOUR",e[e.FIN=6]="FIN",e[e.SPINE=7]="SPINE"}(s=t.Organ||(t.Organ={}));const a=[s.CHLOROPLAST].concat(Array(15).fill(null));t.CURRENT_VERSION=1;class l{constructor(e,t,n,r){this.program=e,this.color=t,this.divideLimit=n,this.organs=r}static createRandom(){return new l(i.Program.createPrimitive(16),o.Color.random(),(0,r.randomInt)(100,255),a)}isSimilar(e){const t=e.getOrgans();let n=0;for(let e=0;e<16;e++)this.organs[e]!==t[e]&&n++;return n<=1}getColor(){return this.color}getProgram(){return this.program}clone(e){if(e<=(0,r.randomInt)(0,100))return this;let t=this.divideLimit;255===t?t--:0===t||Math.random()>.5?t++:t--;const n=new o.Color(this.color.getRed()+(Math.random()>.5?1:-1)*(0,r.randomInt)(0,5),this.color.getGreen()+(Math.random()>.5?1:-1)*(0,r.randomInt)(0,5),this.color.getBlue()+(Math.random()>.5?1:-1)*(0,r.randomInt)(0,5)),i=this.program.clone(),s=i.get((0,r.randomInt)(0,i.getLength()-1)),a=this.organs.slice();switch((0,r.randomInt)(0,4)){case 0:s.code=(0,r.randomInt)(0,i.getHandlersCount()-1);const e=i.getHandler(s.code);if(s.args.length>e.getArgsCount())s.args.splice(e.getArgsCount());else for(;s.args.length<e.getArgsCount();)s.args.push(Math.random());if(s.branches.length>e.getBranchesCount())s.branches.splice(e.getBranchesCount());else for(;s.branches.length<e.getBranchesCount();)s.branches.push((0,r.randomInt)(0,i.getLength()-1));break;case 1:s.args.length>0&&(s.args[(0,r.randomInt)(0,s.args.length-1)]=Math.random());break;case 2:s.branches.length>0&&(s.branches[(0,r.randomInt)(0,s.branches.length-1)]=(0,r.randomInt)(0,i.getLength()-1));break;case 3:a[(0,r.randomInt)(0,7)]=(0,r.randomInt)(0,3);break;case 4:const t=(0,r.randomInt)(0,4);a[(0,r.randomInt)(8,15)]=0===t?0:t+3}return new l(i,n,t,a)}getDivideEnergyLimit(){return this.divideLimit}getProgramLength(){return this.program.getLength()}getOrgans(){return this.organs}serialize(){return{color:this.color.toHexFormat(),program:this.program.serialize(),divideLimit:this.divideLimit,organs:this.organs,version:t.CURRENT_VERSION}}}t.Genome=l},458:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ActionInstruction=void 0;const r=n(4730),o=n(2138);class i extends o.AbstractInstruction{execute(e,t,n,o){const i=Math.floor(n[0]*r.ORGANS_COUNT),s=e.getOrgan(i);return s?(s.use(n[1],t),e.addProgramCounterRelative(1),!0):(e.addProgramCounterRelative(1),!1)}getArgsCount(){return 2}getBranchesCount(){return 0}}t.ActionInstruction=i},8475:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.IfInstruction=void 0;const r=n(4730),o=n(2138);class i extends o.AbstractInstruction{execute(e,t,n,o){const i=n[0]%r.ORGANS_COUNT,s=e.getOrgan(i);return s?(s.use(n[1],t)?e.setProgramCounter(o[0]):e.addProgramCounterRelative(1),!1):(e.addProgramCounterRelative(1),!1)}getArgsCount(){return 2}getBranchesCount(){return 1}}t.IfInstruction=i},9537:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.JumpInstruction=void 0;const r=n(2138);class o extends r.AbstractInstruction{execute(e,t,n,r){return e.setProgramCounter(r[0]),!1}getArgsCount(){return 0}getBranchesCount(){return 1}}t.JumpInstruction=o},9496:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.NothingInstruction=void 0;const r=n(2138);class o extends r.AbstractInstruction{execute(e,t,n,r){return e.addProgramCounterRelative(1),!1}getArgsCount(){return 0}getBranchesCount(){return 0}}t.NothingInstruction=o},9616:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Armour=void 0;const r=n(8503);class o extends r.AbstractOrgan{onAttack(e){return this.organism.changeEnergy(-.5*e)}}t.Armour=o},1297:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Chloroplast=void 0;const r=n(8503);class o extends r.AbstractOrgan{use(e,t){const n=this.organism.getChloroplastsCount();return this.organism.changeEnergy(n*t.getLightEnergy())>0&&this.organism.makeMoreGreen(),!0}}t.Chloroplast=o},3993:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Eye=void 0;const r=n(347),o=n(4730),i=n(59),s=n(8503),a=n(1890);var l;!function(e){e[e.EMPTY=0]="EMPTY",e[e.WALL=1]="WALL",e[e.ORGANIC=2]="ORGANIC",e[e.ORGANISM_SIMILAR=3]="ORGANISM_SIMILAR",e[e.ORGANISM_OTHER=4]="ORGANISM_OTHER"}(l||(l={}));const c=Object.keys(l).length/2+1;class u extends s.AbstractOrgan{use(e,t){const n=(0,a.getOffset)((0,a.rotateOnOffset)(this.organism.getDirection(),this.position)),r=t.getByOffest(n[0],n[1]);return this.getTargetType(r)===Math.floor(e*c)}getTargetType(e){return e instanceof i.WallCell?l.WALL:e instanceof r.OrganicCell?l.ORGANIC:e instanceof o.OrganismCell?this.organism.isSimilar(e)?l.ORGANISM_SIMILAR:l.ORGANISM_OTHER:l.EMPTY}}t.Eye=u},6871:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Fin=void 0;const r=n(8503),o=n(1890);class i extends r.AbstractOrgan{use(e,t){switch(Math.floor(3*e)){case 0:return this.organism.setDirection((0,o.rotateLeft)(this.organism.getDirection())),!0;case 1:return this.organism.setDirection((0,o.rotateRight)(this.organism.getDirection())),!0;case 2:const e=(0,o.getOffset)(this.organism.getDirection());return t.moveByOffest(e[0],e[1])}return!1}}t.Fin=i},3007:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Mouth=void 0;const r=n(347),o=n(4730),i=n(8503),s=n(1890);class a extends i.AbstractOrgan{use(e,t){const n=(0,s.rotateOnOffset)(this.organism.getDirection(),this.position),i=(0,s.getOffset)(n),a=t.getByOffest(i[0],i[1]);if(a instanceof r.OrganicCell){const e=this.organism.changeEnergy(a.getEnergy());return t.deleteByOffset(i[0],i[1]),e>0&&this.organism.makeMoreRed(),!0}if(a instanceof o.OrganismCell){const e=a.onAttack(50,this.organism,(0,s.reverseDirection)(n));return this.organism.changeEnergy(e)>0&&this.organism.makeMoreRed(),!0}return!1}}t.Mouth=a},6481:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Oxidizer=void 0;const r=n(8503);class o extends r.AbstractOrgan{use(e,t){const n=this.organism.getOxidizersCount();return this.organism.changeEnergy(n*t.getMineralsEnergy())>0&&this.organism.makeMoreBlue(),!0}}t.Oxidizer=o},8132:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Spine=void 0;const r=n(8503);class o extends r.AbstractOrgan{onAttack(e,t){return t.changeEnergy(-20),this.organism.changeEnergy(-e)}}t.Spine=o},9191:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Program=t.Command=void 0;const r=n(458),o=n(8475),i=n(9537),s=n(9496);var a;!function(e){e[e.NOTHING=0]="NOTHING",e[e.JUMP=1]="JUMP",e[e.IF=2]="IF",e[e.ACTION=3]="ACTION"}(a=t.Command||(t.Command={}));const l={[a.NOTHING]:new s.NothingInstruction,[a.JUMP]:new i.JumpInstruction,[a.IF]:new o.IfInstruction,[a.ACTION]:new r.ActionInstruction};class c{constructor(e){this.instructions=e}static createPrimitive(e){const t=[];for(let n=0;n<e;n++)t.push({code:a.ACTION,args:[0,0],branches:[]});return new c(t)}execute(e,t){for(let n=0;n<8;n++){const n=this.instructions[e.getProgramCounter()],r=l[n.code];if(void 0!==r){if(r.execute(e,t,n.args,n.branches))break}else e.addProgramCounterRelative(1)}}getInstructions(){return this.instructions.slice()}get(e){return this.instructions[e]}getLength(){return this.instructions.length}getHandlersCount(){return 4}getHandler(e){return l[e]}clone(){return new c(this.instructions.map((e=>({code:e.code,args:e.args.slice(),branches:e.branches.slice()}))))}serialize(){return this.instructions}}t.Program=c},59:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.WallCell=void 0;const r=n(4040);class o extends r.AbstractCell{getType(){return"wall"}serialize(){return{type:"wall"}}}t.WallCell=o},3170:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{l(r.next(e))}catch(e){i(e)}}function a(e){try{l(r.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}l((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.CommonSimulation=void 0;const o=n(4766),i=n(6469),s=n(4240),a=n(1890),l=n(1165),c=n(8158),u=n(6567),d=n(2056),h=n(691);class m extends u.Simulation{constructor(e){super(e),e=this.options,this.cellFactory=new s.CellFactory,this.state=new h.State(e.width,e.height,e.loop,new d.SimulationParameters,this.cellFactory);const t=Math.ceil(e.width*e.height*e.population/100),n=Math.round(e.height*e.lightDepth/100),r=Math.round(e.height*e.mineralsDepth/100),o=e.height-r;for(let t=0;t<e.width;t++)for(let i=0;i<e.height;i++){let s=100,a=100;i>=n?s=0:e.lightGradient&&(s=100-Math.round(100*i/n)),i<o?a=0:e.lightGradient&&(a=Math.ceil(100*(i-o)/r)),this.state.getGrid().setLightLevel(t,i,s),this.state.getGrid().setMineralsLevel(t,i,a)}this.spawnOrganisms(t,e.initialEnergy)}step(){return new Promise((e=>{this.state.next(),e(this.state.getStep())}))}getState(e){return new Promise((t=>{const n=c.Data.create(this.state,e);t({step:this.state.getStep(),buffer:n.getArray().buffer,payload:e})}))}setParameter(e,t){return r(this,void 0,void 0,(function*(){return this.state.getParameters()[e]=t,this.state.getParameters()[e]}))}getOrganismsCount(){return r(this,void 0,void 0,(function*(){return this.state.getOrganismsCount()}))}findCellById(e){return r(this,void 0,void 0,(function*(){const t=this.state.getGrid().find(e);return t?t.serialize():null}))}getCell(e,t){return r(this,void 0,void 0,(function*(){return this.state.getGrid().getCell(e,t).serialize()}))}replace(e,t,n,o){return r(this,void 0,void 0,(function*(){this.state.replace(e,t,n,o)}))}spawnOrganisms(e,t){const n=[],r=this.state.getGrid().toArray();for(let e=0;e<r.length;e++)for(let t=0;t<r[e].length;t++)r[e][t].isEmpty()&&n.push([e,t]);for(const[r,s]of(0,o.shuffle)(n).slice(0,e))this.state.getGrid().insert(r,s,this.cellFactory.createOrganism(l.Genome.createRandom(),t,(0,a.randomDirection)(),new i.Color(0,255,0)))}}t.CommonSimulation=m},8158:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Data=void 0;const r=n(4730),o={empty:0,organism:1,organic:2,wall:3},i={direction:1,energy:1,lifetime:1,genesis:3,supply:3,attack:1,step:1,children:1,action:1};class s{constructor(e,t,n,r){this.array=e,this.payload=t,this.width=n,this.height=r,this.itemLength=this.payload?i[this.payload]+1:1}static create(e,t){const n=e.getGrid(),a=n.getWidth(),l=n.getHeight(),c=t?i[t]:0,u=new Uint8Array(a*l*(c+1));let d=0;for(let e=0;e<a;e++)for(let i=0;i<l;i++){const s=n.getCell(e,i);if(u[d++]=o[s.getType()],s instanceof r.OrganismCell)switch(t){case"energy":u[d]=s.getEnergy();break;case"lifetime":u[d]=s.getLifetime();break;case"genesis":const e=s.getColor().toArray();u[d]=e[0],u[d+1]=e[1],u[d+2]=e[2];break;case"supply":const t=s.getSupplyColor().toArray();u[d]=t[0],u[d+1]=t[1],u[d+2]=t[2]}d+=c}return new s(u,t,a,l)}getArray(){return this.array}getPayload(){return this.payload}getWidth(){return this.width}getHeight(){return this.height}getItemLength(){return this.itemLength}}t.Data=s},1563:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{l(r.next(e))}catch(e){i(e)}}function a(e){try{l(r.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}l((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.createSimulation=void 0;const o=n(3170),i=n(4403);t.createSimulation=function(e){return r(this,void 0,void 0,(function*(){let t;return t=window.Worker?yield i.WorkerSimulation.create(e):new o.CommonSimulation(e),t}))}},8928:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Grid=void 0;const r=n(4904),o=n(4282);t.Grid=class{constructor(e,t,n,o){this.width=e,this.height=t,this.loop=n,this.cellFactory=o,this.cells=[],this.cellIdMap={},this.minerals=[],this.light=[],(0,r.assertGreaterThan)(e,0),(0,r.assertGreaterThan)(t,0);for(let n=0;n<e;n++){this.cells[n]=[],this.minerals[n]=[],this.light[n]=[];for(let e=0;e<t;e++)this.cells[n][e]=o.createEmpty(),this.minerals[n][e]=100,this.light[n][e]=100}}getLightLevel(e,t){return this.light[e][t]}getMineralsLevel(e,t){return this.minerals[e][t]}setLightLevel(e,t,n){this.light[e][t]=n}setMineralsLevel(e,t,n){this.minerals[e][t]=n}insert(e,t,n){const r=this.normalizeCoordinates(e,t);this.checkOutOfBounds(r[0],r[1])||(this.cells[r[0]][r[1]]=n,n.getId()&&(this.cellIdMap[n.getId()]=n))}delete(e,t){const n=this.normalizeCoordinates(e,t);if(this.checkOutOfBounds(n[0],n[1]))return;const r=this.cells[n[0]][n[1]];this.cells[n[0]][n[1]]=this.cellFactory.createEmpty(),delete this.cellIdMap[r.getId()]}getCell(e,t){const n=this.normalizeCoordinates(e,t);return this.checkOutOfBounds(n[0],n[1])?this.cellFactory.createWall():this.cells[n[0]][n[1]]}find(e){return this.cellIdMap[e]}getLoopMode(){return this.loop}getWidth(){return this.width}getHeight(){return this.height}toArray(){return this.cells.map((e=>e.slice()))}serialize(){return this.toArray().map((e=>e.map((e=>e.serialize()))))}normalizeCoordinates(e,t){const n=this.loop===o.GridLoopType.TORUS||this.loop===o.GridLoopType.HORIZONTAL,r=this.loop===o.GridLoopType.TORUS||this.loop===o.GridLoopType.VERTICAL;let i=e,s=t;if(n){for(;i<0;)i+=this.width;i>=this.width&&(i%=this.width)}if(r){for(;s<0;)s+=this.height;s>=this.height&&(s%=this.height)}return[i,s]}checkOutOfBounds(e,t){return e<0||e>=this.width||t<0||t>=this.height}}},2056:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SimulationParameters=void 0,t.SimulationParameters=class{constructor(e={}){this.organismMaxLifetimeValue=100,this.photosynthesisEnergyValue=5,this.chemosynthesisEnergyValue=5,this.mutationChanceValue=25,null!=e.photosynthesisEnergy&&(this.photosynthesisEnergy=e.photosynthesisEnergy),null!=e.chemosynthesisEnergy&&(this.chemosynthesisEnergy=e.chemosynthesisEnergy),null!=e.organismMaxLifetime&&(this.organismMaxLifetime=e.organismMaxLifetime),null!=e.mutationChance&&(this.mutationChance=e.mutationChance)}set organismMaxLifetime(e){this.organismMaxLifetimeValue=this.converNumberValue(e,!0,1,255)}get organismMaxLifetime(){return this.organismMaxLifetimeValue}set photosynthesisEnergy(e){this.photosynthesisEnergyValue=this.converNumberValue(e,!1,0,255)}get photosynthesisEnergy(){return this.photosynthesisEnergyValue}set chemosynthesisEnergy(e){this.chemosynthesisEnergyValue=this.converNumberValue(e,!1,0,255)}get chemosynthesisEnergy(){return this.chemosynthesisEnergyValue}set mutationChance(e){this.mutationChanceValue=this.converNumberValue(e,!1,0,100)}get mutationChance(){return this.mutationChanceValue}serialize(){return{photosynthesisEnergy:this.photosynthesisEnergy,chemosynthesisEnergy:this.chemosynthesisEnergy,organismMaxLifetime:this.organismMaxLifetime}}converNumberValue(e,t=!0,n=null,r=null){return t&&(e=Math.trunc(e)),null==n&&(e=Math.max(n,e)),null==r&&(e=Math.min(r,e)),e}}},6567:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Simulation=t.StepData=void 0,t.StepData=class{constructor(e,t,n){this.step=e,this.buffer=t,this.payload=n}},t.Simulation=class{constructor(e){this.options=e}terminate(){}getOptions(){return this.options}}},691:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.State=void 0;const r=n(4591),o=n(8928);t.State=class{constructor(e,t,n,r,i){this.parameters=r,this.cellFactory=i,this.step=0,this.grid=new o.Grid(e,t,n,i)}next(){const e=this.grid.toArray();for(let t=0;t<e.length;t++)for(let n=0;n<e[t].length;n++){const o=e[t][n];o.isStatic()||o.update(new r.CellContext(this.grid,t,n,this.cellFactory,this.parameters),this.parameters)}this.step++}getGrid(){return this.grid}getStep(){return this.step}getParameters(){return this.parameters}getOrganismsCount(){let e=0;for(let t=0;t<this.grid.getWidth();t++)for(let n=0;n<this.grid.getHeight();n++)"organism"===this.grid.getCell(t,n).getType()&&e++;return e}replace(e,t,n,r){for(const[o,i]of e){const e=this.getGrid().getCell(o,i);n.includes(e.getType())||this.getGrid().insert(o,i,this.cellFactory.create(t,r))}}}},2841:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GENOME_VERSION=t.Command=t.Direction=t.Organ=void 0;const r=n(1165);Object.defineProperty(t,"Organ",{enumerable:!0,get:function(){return r.Organ}}),Object.defineProperty(t,"GENOME_VERSION",{enumerable:!0,get:function(){return r.CURRENT_VERSION}});const o=n(1890);Object.defineProperty(t,"Direction",{enumerable:!0,get:function(){return o.Direction}});const i=n(9191);Object.defineProperty(t,"Command",{enumerable:!0,get:function(){return i.Command}})},4282:(e,t)=>{var n;Object.defineProperty(t,"__esModule",{value:!0}),t.GridLoopType=void 0,(n=t.GridLoopType||(t.GridLoopType={})).NONE="NONE",n.TORUS="TORUS",n.VERTICAL="VERTICAL",n.HORIZONTAL="HORIZONTAL"},4403:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.WorkerSimulation=void 0;const r=n(6567),o=n(8365);class i extends r.Simulation{constructor(e,t){super(e),this.lastRequestId=0,this.messageListeners={step:{},state:{},setParameter:{},getOrganismsCount:{},getCell:{},findCellById:{},replace:{}},this.worker=new o.default,this.worker.postMessage({type:"init",options:e}),this.worker.addEventListener("message",(e=>{switch(e.data.type){case"init":return t(this);case"step":return this.messageListeners.step[e.data.id](e.data.step),void delete this.messageListeners.step[e.data.id];case"state":return this.messageListeners.state[e.data.id](new r.StepData(e.data.step,e.data.buffer,e.data.payload)),void delete this.messageListeners.state[e.data.id];case"setParameter":return this.messageListeners.setParameter[e.data.id](e.data.value),void delete this.messageListeners.setParameter[e.data.id];case"getOrganismsCount":return this.messageListeners.getOrganismsCount[e.data.id](e.data.count),void delete this.messageListeners.getOrganismsCount[e.data.id];case"getCell":return this.messageListeners.getCell[e.data.id](e.data.cell),void delete this.messageListeners.getCell[e.data.id];case"findCellById":return this.messageListeners.findCellById[e.data.id](e.data.cell),void delete this.messageListeners.findCellById[e.data.id];case"replace":return this.messageListeners.replace[e.data.id](),void delete this.messageListeners.replace[e.data.id]}}))}static create(e){return new Promise((t=>{new i(e,(e=>t(e)))}))}terminate(){this.worker.terminate()}step(){return new Promise((e=>{const t=this.nextId();this.messageListeners.step[t]=e,this.worker.postMessage({id:t,type:"step"})}))}getState(e){return new Promise((t=>{const n=this.nextId();this.messageListeners.state[n]=t,this.worker.postMessage({id:n,type:"requestState",payload:e})}))}setParameter(e,t){return new Promise((n=>{const r=this.nextId();this.messageListeners.setParameter[r]=n,this.worker.postMessage({id:r,type:"setParameter",parameter:e,value:t})}))}getOrganismsCount(){return new Promise((e=>{const t=this.nextId();this.messageListeners.getOrganismsCount[t]=e,this.worker.postMessage({id:t,type:"getOrganismsCount"})}))}findCellById(e){return new Promise((t=>{const n=this.nextId();this.messageListeners.findCellById[n]=t,this.worker.postMessage({id:n,type:"findCellById",cellId:e})}))}getCell(e,t){return new Promise((n=>{const r=this.nextId();this.messageListeners.getCell[r]=n,this.worker.postMessage({id:r,type:"getCell",x:e,y:t})}))}replace(e,t,n,r){return new Promise((o=>{const i=this.nextId();this.messageListeners.replace[i]=o,this.worker.postMessage({id:i,type:"replace",coords:e,cellType:t,ignore:n,options:r})}))}nextId(){return this.lastRequestId++}}t.WorkerSimulation=i},9378:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;const r=n(2766),o=n(7294),i=n(7294),s=n(8804),a=n(7244),l=n(1997),c=n(8042),u=n(711),d=n(23),h=s.default.div`
    height: 100vh;
    background: #000;
    display: flex;
    color: #fff;
`,m=(0,r.observer)((()=>{const e=(0,i.useContext)(l.AppContext),t=e.getSimulation();return t?o.createElement(a.Simulation,{simulation:t}):o.createElement(c.CreateSimulationForm,{options:(0,u.loadOptions)(),onCreate:t=>e.newSimulation(t)})}));t.App=(0,r.observer)((()=>o.createElement(s.ThemeProvider,{theme:d.THEME},o.createElement(h,null,o.createElement(m,null)))))},2120:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Button=void 0;const r=n(2766),o=n(7294),i=n(8804),s=n(23),a={primary:{backgroundColor:s.THEME.primary,boderColor:s.THEME.primary,textColor:s.THEME.color},success:{backgroundColor:s.THEME.success,boderColor:s.THEME.success,textColor:s.THEME.color},secondary:{backgroundColor:s.THEME.secondary,boderColor:s.THEME.secondary,textColor:s.THEME.color}},l=i.default.button`
    border: 1px solid;
    border-radius: 10px;
    cursor: pointer;
    padding: 10px 16px;
    ${({width:e})=>e&&`width: ${e};`}
    ${({apperance:e})=>{const t=a[e||"secondary"];return`border-color: ${t.boderColor};background-color: ${t.backgroundColor};color: ${t.textColor};`}}
`;t.Button=(0,r.observer)((e=>o.createElement(l,Object.assign({},e),e.children)))},1017:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Card=void 0;const r=n(7294),o=n(8804).default.div`
    border-radius: 10px;
    background: ${e=>e.theme.background};
    padding: 15px;
    max-height: 100%;
    overflow-y: auto;

    & + & {
        margin-top: 10px;
    }
`;t.Card=e=>r.createElement(o,Object.assign({},e),e.children)},8360:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.OrganismCell=void 0;const r=n(7294),o=n(8804),i=n(8977),s=n(2766),a=n(1997),l=n(7294),c=n(5159),u=n(5221),d=n(2120),h=n(789),m=n(7625),g=o.default.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
`,p=o.default.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`,f=o.default.span`
    color: #ff0000;
`,v=o.default.span`
    color: #00ff00;
`,y=(0,o.default)(d.Button)`
    margin-bottom: 10px;
`;t.OrganismCell=(0,s.observer)((()=>{const e=(0,l.useContext)(a.SimulationContext),t=(0,l.useContext)(a.GenomeBankContext),n=e.getSelectedCell(),o=n.getCell();if("organism"===o.type)return r.createElement(r.Fragment,null,r.createElement(p,null,r.createElement("div",null,r.createElement(y,{apperance:"primary",width:"100%",onClick:()=>{t.addGenome(o.genome).then((()=>{e.getUI().setActiveTab(h.SidebarTab.GENOMES)}))}},r.createElement(m.FontAwesomeIcon,{icon:i.faFloppyDisk})," Save genome"),r.createElement(c.Visualization,{genome:o.genome}),r.createElement(g,null,r.createElement("span",null,"Status"),n.isAlive()?r.createElement(v,null,"Alive"):r.createElement(f,null,"Dead")),r.createElement(g,null,r.createElement("span",null,"Energy"),r.createElement("span",null,o.energy)),r.createElement(g,null,r.createElement("span",null,"Lifetime"),r.createElement("span",null,o.lifetime)),r.createElement(g,null,r.createElement("span",null,"Divide limit"),r.createElement("span",null,o.genome.divideLimit)),r.createElement(u.Program,{organism:o}))))}))},346:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Body=void 0;const r=n(7294),o=n(2766),i=n(8804).default.div`
    width: 120px;
    height: 120px;
    background: ${({color:e})=>e};
    position: absolute; 
    left: 0; 
    right: 0; 
    top: 0;
    bottom: 0;
    margin: auto; 
    border-radius: 100%;
    z-index: 2;
`;t.Body=(0,o.observer)((({color:e})=>r.createElement(i,{color:e})))},3798:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ArmorOrgan=void 0;const r=n(7294),o=n(2766),i=n(8804),s=n(2500),a=i.default.div`
    width: 56px;
    height: 12px;
    position: absolute; 
    left: 0; 
    right: 0; 
    top: 0;
    bottom: 0;
    margin: auto;
    padding-bottom: 130px;
    transform: rotate(${({direction:e})=>45*e}deg);
    z-index: 3;
`;t.ArmorOrgan=(0,o.observer)((({direction:e})=>r.createElement(a,{direction:e},r.createElement("img",{src:s.default}))))},6373:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ChloroplastOrgan=void 0;const r=n(7294),o=n(2766),i=n(8804),s=n(7308),a=i.default.div`
    width: 22px;
    height: 22px;
    position: absolute; 
    left: 0; 
    right: 0; 
    top: 0;
    bottom: 0;
    margin: auto;
    padding-bottom: 100px;
    transform: rotate(${({direction:e})=>45*e}deg);
    z-index: 3;
`;t.ChloroplastOrgan=(0,o.observer)((({direction:e})=>r.createElement(a,{direction:e},r.createElement("img",{src:s.default}))))},5160:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EyeOrgan=void 0;const r=n(7294),o=n(2766),i=n(8804),s=n(4748),a=i.default.div`
    width: 22px;
    height: 22px;
    position: absolute; 
    left: 0; 
    right: 0; 
    top: 0;
    bottom: 0;
    margin: auto;
    padding-bottom: 100px;
    transform: rotate(${({direction:e})=>45*e}deg);
    z-index: 3;
`;t.EyeOrgan=(0,o.observer)((({direction:e})=>r.createElement(a,{direction:e},r.createElement("img",{src:s.default}))))},2920:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.FinOrgan=void 0;const r=n(7294),o=n(2766),i=n(8804),s=n(1220),a=i.default.div`
    width: 60px;
    height: 44px;
    position: absolute; 
    left: 0; 
    right: 0; 
    top: 0;
    bottom: 0;
    margin: auto;
    padding-bottom: 190px;
    transform: rotate(${({direction:e})=>45*e}deg);
    z-index: 1;
`;t.FinOrgan=(0,o.observer)((({direction:e})=>r.createElement(a,{direction:e},r.createElement("img",{src:s.default}))))},1098:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.MouthOrgan=void 0;const r=n(7294),o=n(2766),i=n(8804),s=n(7122),a=i.default.div`
    width: 42px;
    height: 45px;
    position: absolute; 
    left: 0; 
    right: 0; 
    top: 0;
    bottom: 0;
    margin: auto;
    padding-bottom: 190px;
    transform: rotate(${({direction:e})=>45*e}deg);
    z-index: 1;
`;t.MouthOrgan=(0,o.observer)((({direction:e})=>r.createElement(a,{direction:e},r.createElement("img",{src:s.default}))))},5498:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.OxidizerOrgan=void 0;const r=n(7294),o=n(2766),i=n(8804),s=n(3552),a=i.default.div`
    width: 22px;
    height: 22px;
    position: absolute; 
    left: 0; 
    right: 0; 
    top: 0;
    bottom: 0;
    margin: auto;
    padding-bottom: 100px;
    transform: rotate(${({direction:e})=>45*e}deg);
    z-index: 3;
`;t.OxidizerOrgan=(0,o.observer)((({direction:e})=>r.createElement(a,{direction:e},r.createElement("img",{src:s.default}))))},7971:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SpineOrgan=void 0;const r=n(7294),o=n(2766),i=n(8804),s=n(4242),a=i.default.div`
    width: 46px;
    height: 32px;
    position: absolute; 
    left: 0; 
    right: 0; 
    top: 0;
    bottom: 0;
    margin: auto;
    padding-bottom: 170px;
    transform: rotate(${({direction:e})=>45*e}deg);
    z-index: 1;
`;t.SpineOrgan=(0,o.observer)((({direction:e})=>r.createElement(a,{direction:e},r.createElement("img",{src:s.default}))))},5221:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Program=void 0;const r=n(7294),o=n(2766),i=n(8804),s=n(2841),a=i.default.div`
margin: 20px 0;
`,l=i.default.div`
    margin-bottom: 10px;
`,c=i.default.div`
    display: grid;
    grid-template-columns: max-content 1fr;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
`,u=i.default.div`
    display: contents;
    white-space: nowrap;
`,d=i.default.div`
    padding-right: 10px;
    color: ${({active:e})=>e?"#00ff00":"#808080"};
    margin-bottom: 3px;
`,h=i.default.div`
`,m=i.default.div`
    border-radius: 3px;
    display: inline-block;
    background: purple;
    padding: 0 3px;
    margin-left: 5px;
`,g=i.default.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    max-width: 40px;
    vertical-align: middle;
    text-align: center;
`;t.Program=(0,o.observer)((({organism:e})=>r.createElement(a,null,r.createElement(l,null,"Program"),r.createElement(c,null,e.genome.program.map(((t,n)=>r.createElement(u,{key:n},r.createElement(d,{active:n===e.programCounter},n),r.createElement(h,null,s.Command[t.code],"(",t.args.map(((e,n)=>r.createElement("span",{key:n},r.createElement(g,{title:e.toString()},e),t.args.length-1===n?"":", "))),")",t.branches.map(((e,t)=>r.createElement(m,{key:t},e)))))))))))},5159:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Visualization=void 0;const r=n(7294),o=n(8804),i=n(2766),s=n(2841),a=n(346),l=n(3798),c=n(2920),u=n(1098),d=n(5498),h=n(7971),m=n(6373),g=n(5160),p=o.default.div`
    width: 200px;
    height: 200px;
    position: relative;
    margin: 0 auto;
`;t.Visualization=(0,i.observer)((({genome:e})=>r.createElement(p,null,r.createElement(a.Body,{color:e.color}),e.organs.map(((e,t)=>{switch(e){case s.Organ.ARMOUR:return r.createElement(l.ArmorOrgan,{key:t,direction:t});case s.Organ.FIN:return r.createElement(c.FinOrgan,{key:t,direction:t});case s.Organ.MOUTH:return r.createElement(u.MouthOrgan,{key:t,direction:t});case s.Organ.OXIDIZER:return r.createElement(d.OxidizerOrgan,{key:t,direction:t});case s.Organ.SPINE:return r.createElement(h.SpineOrgan,{key:t,direction:t});case s.Organ.CHLOROPLAST:return r.createElement(m.ChloroplastOrgan,{key:t,direction:t});case s.Organ.EYE:return r.createElement(g.EyeOrgan,{key:t,direction:t})}})))))},8005:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.UnselectedCell=void 0;const r=n(7294),o=n(2766);n(8804).default.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
`,t.UnselectedCell=(0,o.observer)((({})=>r.createElement(r.Fragment,null,"Select a cell on the map")))},1752:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ContextMenu=t.ContextMenuItem=void 0;const r=n(7294),o=n(8804),i=o.default.div`
    display: flex;
    flex-direction: column;
    background: #202c3c;
    margin-top: 10px;
    border-radius: 5px;
    padding: 10px 15px;
    width: 250px;
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
`,s=o.default.div`
    width: 100%;
    background: transparent;
    color: #fff;
    border: none;
    padding: 5px 20px;
    text-align: left;
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 14px;

    &:hover {
        background: rgba(0, 0, 0, .3);
    }
`;t.ContextMenuItem=e=>r.createElement(s,Object.assign({},e),e.children),t.ContextMenu=e=>r.createElement(i,Object.assign({},e),e.children)},8042:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CreateSimulationForm=void 0;const r=n(7294),o=n(7294),i=n(4282),s=n(2120),a=n(1017),l=n(2197),c=n(3540),u=n(3229),d=n(9906),h=n(1139),m=n(4579),g=[{label:"None",value:i.GridLoopType.NONE},{label:"Torus",value:i.GridLoopType.TORUS},{label:"Horizontal",value:i.GridLoopType.HORIZONTAL},{label:"Vertical",value:i.GridLoopType.VERTICAL}];t.CreateSimulationForm=({options:e,onCreate:t})=>{const[n,i]=(0,o.useState)(e.loop),[p,f]=(0,o.useState)(e.width),[v,y]=(0,o.useState)(e.height),[b,E]=(0,o.useState)(e.initialEnergy),[O,C]=(0,o.useState)(e.population),[x,w]=(0,o.useState)(e.lightDepth),[M,S]=(0,o.useState)(e.lightGradient),[I,_]=(0,o.useState)(e.mineralsDepth),[P,R]=(0,o.useState)(e.mineralsGradient);return r.createElement(l.Flex,{align:"center",justify:"center"},r.createElement(a.Card,null,r.createElement(c.FormRow,{label:"Grid width"},r.createElement(u.NumberInput,{min:0,onChange:e=>f(e),value:p})),r.createElement(c.FormRow,{label:"Grid height"},r.createElement(u.NumberInput,{min:0,onChange:e=>y(e),value:v})),r.createElement(c.FormRow,{label:"Loop"},r.createElement(h.Select,{onSelect:e=>i(e),options:g,value:n})),r.createElement(d.RangeRow,{label:"Population",postfix:"%",min:0,max:100,step:.1,onChange:e=>C(e),value:O}),r.createElement(d.RangeRow,{label:"Initial energy",min:0,max:100,step:1,onChange:e=>E(e),value:b}),r.createElement(d.RangeRow,{label:"Light depth",postfix:"%",min:0,max:100,step:.1,onChange:e=>w(e),value:x}),r.createElement(m.Switch,{label:"Light gradient",value:M,onChange:e=>S(e)}),r.createElement(d.RangeRow,{label:"Minerals depth",postfix:"%",min:0,max:100,step:.1,onChange:e=>_(e),value:I}),r.createElement(m.Switch,{label:"Minerals gradient",value:P,onChange:e=>R(e)}),r.createElement(s.Button,{apperance:"primary",width:"100%",onClick:()=>{t({loop:n,width:p,height:v,initialEnergy:b,population:O,lightDepth:x,lightGradient:M,mineralsDepth:I,mineralsGradient:P})}},"Create")))}},2197:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Flex=void 0;const r=n(7294),o=n(8804).default.div`
    display: flex;
    flex-direction: ${e=>e.direction||"row"};
    justify-content: ${e=>e.justify||"stretch"};
    align-items: ${e=>e.align||"stretch"};
    flex-wrap: ${e=>e.wrap||"nowrap"};
    width: 100%;
`;t.Flex=e=>r.createElement(o,Object.assign({},e),e.children)},6989:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Checkbox=void 0;const r=n(8055),o=n(7625),i=n(7294),s=n(8804),a=s.default.div`
    display: flex;
    padding: 3px 0;
`,l=s.default.div`
    width: 20px;
`;t.Checkbox=({label:e,checked:t,onChange:n})=>i.createElement(a,{onClick:()=>n(!t)},i.createElement(l,null,t&&i.createElement(o.FontAwesomeIcon,{icon:r.faCheck})),e)},3540:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.FormRow=void 0;const r=n(7294),o=n(8804),i=o.default.div`
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
`,s=o.default.label`
    margin-bottom: 5px;
    display: block;
    width: 100%;
    color: ${e=>e.theme.color};
`;t.FormRow=e=>r.createElement(i,null,e.label&&r.createElement(s,null,e.label),e.children)},3229:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.NumberInput=void 0;const r=n(7294),o=n(8804),i=n(6767),s=n(98),a=n(7625),l=o.default.input`
    width: 100%;
    background: ${e=>e.theme.secondary};
    border: 2px solid ${e=>e.theme.secondary};
    padding: 10px 60px 10px 10px;
    border-radius: 10px;
    color: ${e=>e.theme.color};
`,c=o.default.button`
    width: 20px;
    height: 20px;
    background: ${e=>e.theme.secondary};
    border: 2px solid ${e=>e.theme.secondary};
    border-radius: 100%;
    color: ${e=>e.theme.color};
    padding: 0;
    font-size: 14px;
    line-height: 1;
    margin-left: 5px;
`,u=(0,o.default)(c)`
    opacity: 0.5;
    cursor: default;
`,d=o.default.div`
    position: relative;
`,h=o.default.div`
    position: absolute;
    top: 11px;
    right: 10px;
`;t.NumberInput=e=>{const[t,n]=r.useState(e.value||0),o=t=>{void 0!==e.min&&t<e.min&&(t=e.min),void 0!==e.max&&t>e.max&&(t=e.max),n(t),e.onChange(t)};let m=r.createElement(c,{onClick:()=>o(t-1)},r.createElement(a.FontAwesomeIcon,{icon:i.faMinus})),g=r.createElement(c,{onClick:()=>o(t+1)},r.createElement(a.FontAwesomeIcon,{icon:s.faPlus}));return void 0!==e.min&&e.value<=e.min&&(m=r.createElement(u,null,r.createElement(a.FontAwesomeIcon,{icon:i.faMinus}))),void 0!==e.max&&e.value>=e.max&&(g=r.createElement(u,null,r.createElement(a.FontAwesomeIcon,{icon:s.faPlus}))),r.createElement(d,null,r.createElement(l,{type:"text",value:t,onChange:e=>(e=>{const t=Number(e);o(Number.isSafeInteger(t)?t:0)})(e.target.value)}),r.createElement(h,null,m,g))}},1522:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.RadioGroup=void 0;const r=n(8055),o=n(7625),i=n(7294),s=n(8804),a=s.default.div`
    
`,l=s.default.div`
    display: flex;
    padding: 3px 0;
`,c=s.default.div`
    width: 20px;
`;t.RadioGroup=({choices:e,value:t,onChange:n})=>i.createElement(a,null,e.map(((e,s)=>i.createElement(l,{key:s,onClick:()=>n(e.value)},i.createElement(c,null,t===e.value&&i.createElement(o.FontAwesomeIcon,{icon:r.faCheck})),e.label))))},8863:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.RangeInput=void 0;const r=n(7294),o=n(8804).default.input`
    width: 100%;
    -webkit-appearance: none;
    background: transparent;
    height: 12px;
    display: block;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        background: #fff;
        height: 12px;
        width: 12px;
        border-radius: 50%;
        margin-top: -5px;
    }

    &::-moz-range-thumb {
        height: 12px;
        width: 12px;
        border-radius: 50%;
        background: #fff;
        border: none;
    }

    &::-webkit-slider-runnable-track  {
        -webkit-appearance: none;
        height: 2px;
        background: #fff;
        width: 100%;
    }

    &::-moz-range-track {
        width: 100%;
        height: 2px;
        background: #fff;
    }
`;t.RangeInput=e=>r.createElement(o,{type:"range",min:e.min,max:e.max,step:e.step,value:e.value,onChange:t=>e.onChange(Number(t.target.value))})},9906:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.RangeRow=void 0;const r=n(7294),o=n(8804),i=n(2197),s=n(3540),a=n(8863),l=o.default.div`
    font-size: 12px;
    line-height: 1;
    text-align: right;
    min-width: 40px;
    margin-left: 5px;
    font-weight: bold;
`,c=o.default.div`
    flex-grow: 1;
`;t.RangeRow=({label:e,postfix:t,min:n,max:o,step:u,value:d,onChange:h})=>r.createElement(s.FormRow,{label:e},r.createElement(i.Flex,{align:"center"},r.createElement(c,null,r.createElement(a.RangeInput,{min:n,max:o,step:u,onChange:h,value:d})),r.createElement(l,null,d,t)))},1139:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Select=void 0;const r=n(7294),o=n(8804).default.select`
    background: ${e=>e.theme.secondary};
    border: 1px solid ${e=>e.theme.secondary};
    padding: 10px 10px;
    border-radius: 10px;
    color: ${e=>e.theme.color};
`;t.Select=e=>r.createElement(o,{onChange:t=>e.onSelect(t.target.value),value:e.value},e.options.map((({value:e,label:t},n)=>r.createElement("option",{value:e,key:n},t))))},4579:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Switch=void 0;const r=n(7294),o=n(8804),i=o.default.label`
    position: relative;
    display: flex;
    width: 100%;
    cursor: pointer;
    margin-bottom: 15px;
    align-items: center;
`,s=o.default.input`
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + div {
        background-color: ${e=>e.theme.primary};
    }

    &:checked + div:before {
        transform: translateX(18px);
    }
`,a=o.default.div`
    cursor: pointer;
    width: 40px;
    height: 22px;
    background-color: ${e=>e.theme.secondary};
    border-radius: 34px;
    position: relative;
    margin-right: 10px;

    &:before {
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        left: 3px;
        bottom: 3px;
        background: #fff;
        transition: .4s;
        border-radius: 50%;
    }
`,l=o.default.span`
    flex: 1;
`;t.Switch=e=>r.createElement(i,null,r.createElement(s,{type:"checkbox",checked:e.value,onChange:t=>e.onChange(t.target.checked)}),r.createElement(a,null),r.createElement(l,null,e.label))},4070:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Textarea=void 0;const r=n(7294),o=n(8804).default.textarea`
    width: 100% !important;
    background: ${e=>e.theme.secondary};
    border: 2px solid ${e=>e.theme.secondary};
    padding: 10px;
    border-radius: 10px;
    color: ${e=>e.theme.color};
`;t.Textarea=({value:e,onChange:t,placeholder:n})=>r.createElement(o,{onChange:e=>t(e.target.value),value:e,placeholder:n})},617:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Genomes=t.Item=void 0;const r=n(7294),o=n(2766),i=n(1997),s=n(7294),a=n(767),l=n(2619),c=n(4227),u=n(7608),d=n(2723),h=n(8804),m=n(7625),g=n(5159),p=n(2120),f=n(4070),v=n(1065),y=h.default.div`
    display: flex;
    margin-bottom: 10px;
    gap: 5px;
`,b=h.default.div`
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
    background: #10161e;
`,E=h.default.div`
    cursor: pointer;
    white-space: pre-wrap;
`,O=h.default.div`
    font-style: italic;
    color: grey;
    cursor: pointer;
`,C=h.default.div`
    display: flex;
`,x=h.default.div`
    flex-grow: 1;
`,w=h.default.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`,M=(0,h.default)(p.Button)`
    padding: 8px 10px;
`,S=(0,h.default)(p.Button)`
    flex-grow: 1;
`,I=h.default.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`,_=h.default.div`
    display: flex;
    gap: 5px;
`,P=(0,o.observer)((({item:e})=>{const[t,n]=(0,s.useState)(!1),o=(0,s.useContext)(i.GenomeBankContext);if(t){const t=t=>{e.setName(t),o.put(e),n(!1)};return r.createElement(R,{value:e.getName(),onSave:t,onCancel:()=>n(!1)})}return e.getName().length>0?r.createElement(E,{onClick:()=>n(!0)},e.getName()):r.createElement(O,{onClick:()=>n(!0)},"No description.")})),R=(0,o.observer)((({value:e,onSave:t,onCancel:n})=>{const[o,i]=(0,s.useState)(e);return r.createElement(I,null,r.createElement(f.Textarea,{value:o,onChange:e=>i(e),placeholder:"Short description of this genome"}),r.createElement(_,null,r.createElement(p.Button,{width:"100%",apperance:"primary",onClick:()=>t(o)},"Save"),r.createElement(p.Button,{width:"100%",apperance:"secondary",onClick:()=>n()},"Cancel")))}));t.Item=(0,o.observer)((({item:e})=>{const t=(0,s.useContext)(i.GenomeBankContext),n=(0,s.useContext)(i.SimulationContext).getRenderer().getPaintMode();return r.createElement(b,null,r.createElement(C,null,r.createElement(x,null,r.createElement(g.Visualization,{genome:e.getGenome()})),r.createElement(w,null,r.createElement(M,{onClick:()=>{n.setClipboard(e.getGenome()),n.setType("organism"),n.setEnabled(!0)}},r.createElement(m.FontAwesomeIcon,{icon:c.faEyeDropper})),r.createElement(M,{onClick:()=>{!function(e){const t=document.createElement("a"),n=window.URL.createObjectURL(new Blob([JSON.stringify(e.serialize())],{type:"octet/stream"}));t.href=n,t.setAttribute("download",e.getId()+".genome"),t.click(),window.URL.revokeObjectURL(n)}(e)}},r.createElement(m.FontAwesomeIcon,{icon:a.faDownload})),r.createElement(M,{onClick:()=>{t.delete(e)}},r.createElement(m.FontAwesomeIcon,{icon:l.faTrash})))),r.createElement(P,{item:e}))})),t.Genomes=(0,o.observer)((()=>{(0,s.useContext)(i.SimulationContext);const e=(0,s.useContext)(i.GenomeBankContext);return r.createElement(r.Fragment,null,r.createElement(y,null,r.createElement(S,{apperance:"primary",onClick:()=>(()=>{const t=document.createElement("input");t.type="file",t.addEventListener("change",(n=>{for(const n of t.files)n.text().then((t=>{try{const n=JSON.parse(t);e.put(new v.GenomeItem(n.name,n.id,n.genome,+Date.now()))}catch(e){alert("File parsing error")}}))})),t.click()})()},r.createElement(m.FontAwesomeIcon,{icon:d.faUpload})," Import"),r.createElement(p.Button,{onClick:()=>e.refresh()},r.createElement(m.FontAwesomeIcon,{icon:u.faRotate}))),r.createElement(r.Fragment,null,e.getItems().map((e=>r.createElement(t.Item,{item:e,key:e.getId()})))))}))},4485:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Info=void 0;const r=n(7294),o=n(2766),i=n(1997),s=n(7294),a=n(8804),l=n(6724),c=a.default.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
`;t.Info=(0,o.observer)((({})=>{const e=(0,s.useContext)(i.SimulationContext);return r.createElement(r.Fragment,null,r.createElement(c,null,r.createElement("span",null,"Size"),r.createElement("span",null,e.getWidth(),"×",e.getHeight())),r.createElement(c,null,r.createElement("span",null,"Step"),r.createElement("span",null,e.getCurrentStep())),r.createElement(c,null,r.createElement("span",null,"Step time"),r.createElement("span",null,e.getStepTime()," ms")),r.createElement(c,null,r.createElement("span",null,"Render time"),r.createElement("span",null,e.getRenderer().getRenderTime()," ms")),r.createElement(c,null,r.createElement("span",null,"Organisms count"),r.createElement("span",null,e.getOrganismsCount())),r.createElement(l.Legend,null))}))},6724:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Legend=void 0;const r=n(7294),o=n(2766),i=n(1997),s=n(7294),a=n(8804),l=n(5120),c=a.default.div`
    display: flex;
    margin-bottom: 6px;
`,u=a.default.div`
    margin-bottom: 10px;
    font-weight: bold;
    margin-top: 15px;
`,d=a.default.div`
    height: 15px;
    width: 15px;
    border: 2px solid #fff;
    background: ${({bg:e})=>e.toHexFormat()};
    margin-right: 10px;
`,h={default:[{label:"Organism",color:l.Colors.organism}],lifetime:[{label:"Older",color:l.Colors.lifetimeMin},{label:"Younger",color:l.Colors.lifetimeMax}],energy:[{label:"Less energy",color:l.Colors.energyMin},{label:"More energy",color:l.Colors.energyMax}],supply:[{label:"Uses organic",color:l.Colors.supplyOrganic},{label:"Uses photosynthesis",color:l.Colors.supplyPhotosynthesis},{label:"Uses chemosynthesis",color:l.Colors.supplyChemosynthesis}],genesis:[]};t.Legend=(0,o.observer)((({})=>{const e=(0,s.useContext)(i.SimulationContext).getRenderer().getRenderMode();return r.createElement(r.Fragment,null,r.createElement(u,null,"Legend"),r.createElement(c,null,r.createElement(d,{bg:l.Colors.wall}),r.createElement("span",null,"Wall")),r.createElement(c,null,r.createElement(d,{bg:l.Colors.organic}),r.createElement("span",null,"Organic")),h[e].map(((e,t)=>r.createElement(c,{key:t},r.createElement(d,{bg:e.color}),r.createElement("span",null,e.label)))))}))},5912:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Overflow=void 0;const r=n(7294),o=n(7294),i=n(8804).default.div`
    position: fixed;
`;t.Overflow=({root:e,children:t,onLoseFocus:n})=>{const[s,a]=(0,o.useState)(0),[l,c]=(0,o.useState)(0),[u,d]=(0,o.useState)(!1),h=(0,o.useRef)();return(0,o.useEffect)((()=>{if(e&&h.current){const t=e.getBoundingClientRect();c(t.top+t.height),t.left+h.current.getBoundingClientRect().width>window.innerWidth?a(Math.max(0,window.innerWidth-h.current.getBoundingClientRect().width)):a(Math.max(0,t.left)),d(!0)}const t=t=>{e.contains(t.target)||n&&n()};return window.addEventListener("mousedown",t),()=>{window.removeEventListener("mousedown",t)}})),r.createElement(i,{style:{left:s,top:l,display:u?null:"none"},ref:h},t)}},6852:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Overlay=void 0;const r=n(7294),o=n(2766),i=n(8804),s=n(1936),a=n(7294),l=n(1997),c=n(4485),u=n(8477),d=n(789),h=n(617),m=i.default.div`
    position: absolute;
    top: 50px;
    left: 0;
    bottom: 0;
    pointer-events: none;
    width: 100%;
`,g=i.default.div`
    border-radius: 6px;
    background: rgba(16, 22, 30, 0.9);
    padding: 16px;
    width: 240px;
    position: absolute;
    top: 10px;
    right: 10px;
    pointer-events: all;
    max-height: 100%;
    overflow-y: auto;
`,p=i.default.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    overflow-y: auto;
    pointer-events: all;
    padding: 16px;
    background: rgb(29, 37, 49);
    width: 320px;
`;t.Overlay=(0,o.observer)((({})=>{const e=(0,a.useContext)(l.SimulationContext).getUI();return r.createElement(m,null,e.isInfoOpened()&&r.createElement(g,null,r.createElement(c.Info,null)),e.isTabActive(d.SidebarTab.PARAMERS)&&r.createElement(p,null,r.createElement(s.Parameters,null)),e.isTabActive(d.SidebarTab.CELL)&&r.createElement(p,null,r.createElement(u.SelectedCell,null)),e.isTabActive(d.SidebarTab.GENOMES)&&r.createElement(p,null,r.createElement(h.Genomes,null)))}))},1936:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Parameters=void 0;const r=n(7294),o=n(2766),i=n(1997),s=n(7294),a=n(9906);t.Parameters=(0,o.observer)((({})=>{const e=(0,s.useContext)(i.SimulationContext).getParameters();return r.createElement(r.Fragment,null,r.createElement(a.RangeRow,{label:"Lifetime limit",min:1,max:255,step:1,onChange:t=>e.setOrganismMaxLifetime(t),value:e.getOrganismMaxLifetime()}),r.createElement(a.RangeRow,{label:"Photosynthesis energy",min:0,max:255,step:1,onChange:t=>e.setPhotosynthesisEnergy(t),value:e.getPhotosynthesisEnergy()}),r.createElement(a.RangeRow,{label:"Chemosynthesis energy",min:0,max:255,step:1,onChange:t=>e.setChemosynthesisEnergy(t),value:e.getChemosynthesisEnergy()}),r.createElement(a.RangeRow,{label:"MuatationChance",min:0,max:100,step:1,onChange:t=>e.setMutationChance(t),value:e.getMutationChance()}))}))},8477:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SelectedCell=void 0;const r=n(7294),o=n(2766),i=n(1997),s=n(7294),a=n(8360),l=n(8005);t.SelectedCell=(0,o.observer)((({})=>{const e=(0,s.useContext)(i.SimulationContext).getSelectedCell().getCell();return e&&"organism"===e.type?r.createElement(a.OrganismCell,null):r.createElement(l.UnselectedCell,null)}))},7244:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Simulation=void 0;const r=n(7294),o=n(8804),i=n(2766),s=n(4924),a=n(6852),l=n(7999),c=n(1997),u=o.default.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
`;t.Simulation=(0,i.observer)((({simulation:e})=>r.createElement(c.SimulationContext.Provider,{value:e},e.isReady()&&r.createElement(u,null,r.createElement(l.Toolbar,null),r.createElement(a.Overlay,null),r.createElement(s.Viewport,null)))))},7999:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Toolbar=void 0;const r=n(7294),o=n(8804),i=n(2766),s=n(6700),a=n(9008),l=n(2384),c=n(7099),u=n(7382),d=n(2742),h=n(9073),m=n(9697),g=n(2722),p=o.default.div`
    display: flex;
    align-items: stretch;
    width: 100%;
    overflow-x: auto;
    background: ${e=>e.theme.background};
    height: 50px;
    position: relative;
    z-index: 1;
    user-select: none;
    box-shadow: 0 0 14px 0 #00000066;
`,f=o.default.div`
    display: flex;
    align-items: stretch;
    height: 100%;
    z-index: 1;
    flex-grow: 1;
    justify-content: ${e=>e.justify};
`;t.Toolbar=(0,i.observer)((({})=>r.createElement(p,null,r.createElement(f,{justify:"flex-start"},r.createElement(d.ParametersItem,null),r.createElement(m.CellItem,null),r.createElement(g.GenomesItem,null)),r.createElement(f,{justify:"center"},r.createElement(s.StartPauseItem,null),r.createElement(a.StepItem,null),r.createElement(c.NewSimulationItem,null)),r.createElement(f,{justify:"flex-end"},r.createElement(l.RenderModeItem,null),r.createElement(u.PaintModeItem,null),r.createElement(h.InfoItem,null)))))},9697:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CellItem=void 0;const r=n(7294),o=n(2766),i=n(7294),s=n(2922),a=n(7625),l=n(1997),c=n(8421),u=n(789);t.CellItem=(0,o.observer)((({})=>{const e=(0,i.useContext)(l.SimulationContext).getUI();return r.createElement(c.ToolbarItem,{onClick:()=>e.toggleTab(u.SidebarTab.CELL),enabled:e.isTabActive(u.SidebarTab.CELL)},r.createElement(a.FontAwesomeIcon,{icon:s.faMicroscope}))}))},2722:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GenomesItem=void 0;const r=n(7294),o=n(2766),i=n(7294),s=n(7093),a=n(7625),l=n(1997),c=n(8421),u=n(789);t.GenomesItem=(0,o.observer)((({})=>{const e=(0,i.useContext)(l.SimulationContext).getUI();return r.createElement(c.ToolbarItem,{onClick:()=>e.toggleTab(u.SidebarTab.GENOMES),enabled:e.isTabActive(u.SidebarTab.GENOMES)},r.createElement(a.FontAwesomeIcon,{icon:s.faDna}))}))},9073:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.InfoItem=void 0;const r=n(7294),o=n(2766),i=n(7294),s=n(8099),a=n(7625),l=n(1997),c=n(8421);t.InfoItem=(0,o.observer)((({})=>{const e=(0,i.useContext)(l.SimulationContext).getUI();return r.createElement(c.ToolbarItem,{onClick:()=>e.setInfoOpened(!e.isInfoOpened()),enabled:e.isInfoOpened()},r.createElement(a.FontAwesomeIcon,{icon:s.faInfo}))}))},8421:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ToolbarItem=void 0;const r=n(7294),o=n(2766),i=n(8804).default.div`
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    gap: 5px;
    min-width: 50px;
    height: 100%;
    ${({focused:e})=>e&&"background: #07090d;"}
    ${({enabled:e,theme:t})=>e&&`background: ${t.primary};`}
    ${({disabled:e})=>e&&"opacity: 0.5; pointer-events: none;"}
    
    &:hover {
        ${({enabled:e})=>!e&&"background: #07090d;"}
    }
`;t.ToolbarItem=(0,o.observer)((e=>r.createElement(i,Object.assign({},e))))},7099:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.NewSimulationItem=void 0;const r=n(7294),o=n(2766),i=n(7294),s=n(3208),a=n(7625),l=n(1997),c=n(8421);t.NewSimulationItem=(0,o.observer)((({})=>{const e=(0,i.useContext)(l.AppContext);return r.createElement(c.ToolbarItem,{onClick:()=>e.closeSimulation()},r.createElement(a.FontAwesomeIcon,{icon:s.faRotateRight}))}))},7382:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PaintModeItem=void 0;const r=n(7294),o=n(8804),i=n(2766),s=n(7294),a=n(869),l=n(7625),c=n(1997),u=n(8421),d=n(1421),h=n(5912),m=n(1752),g=n(1522),p=n(3540),f=n(9906),v=n(6989),y=n(2120),b=o.default.div`
    display: flex;
    align-items: center;
    padding: 0 5px;

    &:hover {
        background: rgba(0, 0, 0, 0.3);
    }
`,E=o.default.div`
    margin-left: 5px;
    display: flex;
    align-items: center;
    padding: 0 5px;
`,O=(0,o.default)(u.ToolbarItem)`
    align-items: stretch;
    padding: 0;
    gap: 0;
`,C=[{label:"Square",value:"square"},{label:"Circle",value:"circle"}],x=[{label:"Empty",value:"empty"},{label:"Wall",value:"wall"},{label:"Organic",value:"organic"},{label:"Organism",value:"organism"}];t.PaintModeItem=(0,i.observer)((({})=>{const e=(0,s.useContext)(c.SimulationContext).getRenderer().getPaintMode(),[t,n]=(0,s.useState)(!1),o=(0,s.useRef)();return r.createElement("div",{ref:o},r.createElement(O,{focused:t,enabled:e.isEnabled()},r.createElement(E,{onClick:()=>e.setEnabled(!e.isEnabled())},r.createElement(l.FontAwesomeIcon,{icon:a.faPaintbrush})),r.createElement(b,{onClick:()=>{n(!t),!e.isEnabled()&&e.setEnabled(!0)}},r.createElement(l.FontAwesomeIcon,{icon:d.faCaretDown}))),t&&r.createElement(h.Overflow,{root:o.current,onLoseFocus:()=>n(!1)},r.createElement(m.ContextMenu,null,r.createElement(p.FormRow,{label:"Type of paint"},r.createElement(g.RadioGroup,{choices:x,value:e.getType(),onChange:t=>e.setType(t)})),r.createElement(p.FormRow,{label:"Brush shape"},r.createElement(g.RadioGroup,{choices:C,value:e.getBrush(),onChange:t=>e.setBrush(t)})),r.createElement(p.FormRow,{label:"Ignore"},x.map(((t,n)=>r.createElement(v.Checkbox,{key:n,label:t.label,checked:e.isIgnore(t.value),onChange:n=>n?e.addIgnore(t.value):e.removeIgnore(t.value)})))),r.createElement(f.RangeRow,{label:"Brush size",min:1,max:20,step:1,onChange:t=>e.setSize(t),value:e.getSize()}),r.createElement(y.Button,{onClick:()=>e.clearClipboard()},"Reset clipboard"))))}))},2742:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ParametersItem=void 0;const r=n(7294),o=n(2766),i=n(7294),s=n(7810),a=n(7625),l=n(1997),c=n(8421),u=n(789);t.ParametersItem=(0,o.observer)((({})=>{const e=(0,i.useContext)(l.SimulationContext).getUI();return r.createElement(c.ToolbarItem,{onClick:()=>e.toggleTab(u.SidebarTab.PARAMERS),enabled:e.isTabActive(u.SidebarTab.PARAMERS)},r.createElement(a.FontAwesomeIcon,{icon:s.faCogs}))}))},2384:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.RenderModeItem=void 0;const r=n(7294),o=n(8804),i=n(2766),s=n(7294),a=n(446),l=n(7625),c=n(1997),u=n(8421),d=n(1421),h=n(5912),m=n(1752),g=n(1522),p=o.default.div`
    margin-left: 5px;
`,f=[{label:"Default",value:"default"},{label:"Energy",value:"energy"},{label:"Lifetime",value:"lifetime"},{label:"Genesis",value:"genesis"},{label:"Supply",value:"supply"}];t.RenderModeItem=(0,i.observer)((({})=>{const e=(0,s.useContext)(c.SimulationContext).getRenderer(),[t,n]=(0,s.useState)(!1),o=(0,s.useRef)();return r.createElement("div",{ref:o},r.createElement(u.ToolbarItem,{focused:t,onClick:()=>n(!t)},r.createElement(l.FontAwesomeIcon,{icon:a.faEye}),r.createElement(p,null,r.createElement(l.FontAwesomeIcon,{icon:d.faCaretDown}))),t&&r.createElement(h.Overflow,{root:o.current,onLoseFocus:()=>n(!1)},r.createElement(m.ContextMenu,null,r.createElement(g.RadioGroup,{choices:f,value:e.getRenderMode(),onChange:t=>e.setRenderMode(t)}))))}))},6700:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.StartPauseItem=void 0;const r=n(7294),o=n(2766),i=n(7294),s=n(753),a=n(6043),l=n(7625),c=n(1997),u=n(8421);t.StartPauseItem=(0,o.observer)((({})=>{const e=(0,i.useContext)(c.SimulationContext);return e.isPaused()?r.createElement(u.ToolbarItem,{onClick:()=>e.start()},r.createElement(l.FontAwesomeIcon,{icon:s.faPlay})):r.createElement(u.ToolbarItem,{onClick:()=>e.pause()},r.createElement(l.FontAwesomeIcon,{icon:a.faPause}))}))},9008:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.StepItem=void 0;const r=n(7294),o=n(2766),i=n(7294),s=n(9596),a=n(7625),l=n(1997),c=n(8421);t.StepItem=(0,o.observer)((({})=>{const e=(0,i.useContext)(l.SimulationContext);return r.createElement(c.ToolbarItem,{disabled:!e.isPaused(),onClick:()=>e.makeStep()},r.createElement(a.FontAwesomeIcon,{icon:s.faForwardStep}))}))},4924:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Viewport=void 0;const r=n(7294),o=n(7294),i=n(2766),s=n(5560),a=n(8804),l=n(1997),c=a.default.div`
    overflow: hidden;
    flex-grow: 1;
`;t.Viewport=(0,i.observer)((({})=>{const e=(0,o.useContext)(l.SimulationContext),t=(0,o.useRef)(),[n,i,a]=(0,s.useSize)();return(0,o.useEffect)((()=>(e.getRenderer().setElement(t.current),()=>{})),[t.current]),(0,o.useEffect)((()=>(e.getRenderer().requestRedraw(),()=>{})),[n,i]),r.createElement(c,{ref:a},r.createElement("canvas",{width:n,height:i,ref:t}))}))},1997:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GenomeBankContext=t.SimulationContext=t.AppContext=void 0;const r=n(7294);t.AppContext=r.createContext(null),t.SimulationContext=r.createContext(null),t.GenomeBankContext=r.createContext(null)},5560:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useSize=void 0;const r=n(7294);t.useSize=function(){const[e,t]=(0,r.useState)(0),[n,o]=(0,r.useState)(0),[i,s]=(0,r.useState)(),a=(0,r.useCallback)((e=>{if(e){t(Math.trunc(e.getBoundingClientRect().width)),o(Math.trunc(e.getBoundingClientRect().height));const n=new ResizeObserver((e=>{for(let n of e){t(Math.trunc(n.contentRect.width)),o(Math.trunc(n.contentRect.height));break}}));n.observe(e),s((()=>()=>n.disconnect()))}}),[]);return(0,r.useEffect)((()=>i),[i]),[e,n,a]}},2575:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.initMouseInteractions=void 0,t.initMouseInteractions=function(e,t){let n=!1,r=!1;const o=e=>{e.preventDefault(),n=!0,r=!1},i=e=>{e.preventDefault(),r||t.click(e.offsetX,e.offsetY)},s=e=>{e.preventDefault()};let a=0;const l=n=>{if(n.preventDefault(),a+=n.deltaY,Math.abs(a)<40)return;a=0;const[r,o]=t.getOffset(),i=e.getBoundingClientRect(),s=n.clientX-Math.trunc(i.left),l=n.clientY-Math.trunc(i.top),c=(s-r)/t.getScale(),u=(l-o)/t.getScale();n.deltaY<0?t.scaleUp(!1):t.scaleDown(!1),t.setOffset(s-c*t.getScale(),l-u*t.getScale())},c=o=>{if(n)if(r=!0,t.getPaintMode().isEnabled()&&1===o.buttons){const n=e.getBoundingClientRect();t.paint(o.clientX-n.x,o.clientY-n.y)}else{const[e,n]=t.getOffset();t.setOffset(e+o.movementX,n+o.movementY)}},u=()=>{n=!1,r=!1};return e.addEventListener("wheel",l),e.addEventListener("mousedown",o),e.addEventListener("mouseup",i),e.addEventListener("mousemove",s),document.body.addEventListener("mousemove",c),document.body.addEventListener("mouseup",u),()=>{e.removeEventListener("wheel",l),e.removeEventListener("mousedown",o),e.removeEventListener("mouseup",i),e.removeEventListener("mousemove",s),document.body.removeEventListener("mousemove",c),document.body.removeEventListener("mouseup",u)}}},3629:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.initTouchInteractions=void 0,t.initTouchInteractions=function(e,t){let n={},r=0,o=!1;const i=()=>2===Object.keys(n).length,s=t=>{const n=e.getBoundingClientRect();return[Math.trunc(t.clientX)-Math.trunc(n.left),Math.trunc(t.clientY)-Math.trunc(n.top)]},a=e=>{e.preventDefault();for(const t of e.changedTouches)i()||(n[t.identifier]=s(t));e.touches.length>1&&(o=!0)},l=e=>{for(const t of e.changedTouches)delete n[t.identifier];o||t.click(...s(e.changedTouches[0])),0===Object.keys(n).length&&(o=!1),r=0},c=e=>{for(const t of e.changedTouches)delete n[t.identifier];0===Object.keys(n).length&&(o=!1),r=0},u=e=>{e.preventDefault(),o=!0;const a=Object.assign({},n),[l,c]=t.getOffset();for(const r of e.changedTouches)n[r.identifier]&&(a[r.identifier]=s(r),1===e.changedTouches.length&&t.getPaintMode().isEnabled()?t.paint(...a[r.identifier]):t.setOffset(l+(a[r.identifier][0]-n[r.identifier][0]),c+(a[r.identifier][1]-n[r.identifier][1])));if(i()){const[e,t]=Object.keys(n),o=Math.abs(Math.hypot(n[e][0]-n[t][0],n[e][1]-n[t][1])),i=Math.abs(Math.hypot(a[e][0]-a[t][0],a[e][1]-a[t][1]));o>i?r-=o-i:r+=i-o}if(Math.abs(r)>=20){const[e,o]=t.getOffset(),[i,s]=Object.keys(n);let a=(n[i][0]+n[s][0])/2,l=(n[i][1]+n[s][1])/2;const c=Math.round((a-e)/t.getScale()),u=Math.round((l-o)/t.getScale());r>0?t.setScale(Math.ceil(1.5*t.getScale()),!1):t.setScale(Math.floor(t.getScale()/1.5),!1),t.setOffset(a-c*t.getScale(),l-u*t.getScale()),r=0}n=a};return e.addEventListener("touchstart",a,{passive:!1}),e.addEventListener("touchend",l),e.addEventListener("touchcancel",c),e.addEventListener("touchmove",u,{passive:!1}),()=>{e.removeEventListener("touchstart",a),e.removeEventListener("touchend",l),e.removeEventListener("touchcancel",c),e.removeEventListener("touchmove",u)}}},5935:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{l(r.next(e))}catch(e){i(e)}}function a(e){try{l(r.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}l((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.IndexedBdGenomeRepository=void 0;const o=n(2841),i=n(1065),s="genomes";t.IndexedBdGenomeRepository=class{constructor(){this.openRequest=indexedDB.open("eve"),this.openRequest.addEventListener("upgradeneeded",(()=>{this.openRequest.result.createObjectStore(s,{keyPath:"id"})})),this.openRequest.addEventListener("error",(()=>{console.error("Error",this.openRequest.error)})),this.openRequest.addEventListener("success",(()=>{this.db=this.openRequest.result}))}findAll(){return new Promise(((e,t)=>r(this,void 0,void 0,(function*(){const n=(yield this.getDB()).transaction(s,"readonly").objectStore(s).getAll();n.onsuccess=()=>e(n.result.filter((e=>e.genome.version===o.GENOME_VERSION)).map((e=>new i.GenomeItem(e.name,e.id,e.genome,e.createdAt)))),n.onerror=()=>t()}))))}put(e){return new Promise(((t,n)=>{const r=this.db.transaction(s,"readwrite").objectStore(s).put(e.serialize());r.onsuccess=()=>t(),r.onerror=()=>n()}))}delete(e){return new Promise(((t,n)=>{const r=this.db.transaction(s,"readwrite").objectStore(s).delete(e.getId());r.onsuccess=()=>t(),r.onerror=()=>n()}))}getDB(){return new Promise((e=>{this.db?e(this.db):this.openRequest.addEventListener("success",(()=>e(this.openRequest.result)))}))}}},711:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.saveOptions=t.loadOptions=void 0;const r=n(4282);t.loadOptions=function(){return Object.assign({width:200,height:100,loop:r.GridLoopType.NONE,population:5,initialEnergy:70,lightDepth:100,lightGradient:!1,mineralsDepth:100,mineralsGradient:!1},function(e){let t=localStorage.getItem("evo_simulation_options"),n={};if("string"==typeof t){const e=JSON.parse(t);"object"==typeof e&&(n=e)}return n}())},t.saveOptions=function(e){var t;t=e,localStorage.setItem("evo_simulation_options",JSON.stringify(t))}},9376:function(e,t,n){var r=this&&this.__decorate||function(e,t,n,r){var o,i=arguments.length,s=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(i<3?o(s):i>3?o(t,n,s):o(t,n))||s);return i>3&&s&&Object.defineProperty(t,n,s),s};Object.defineProperty(t,"__esModule",{value:!0}),t.Store=void 0;const o=n(8949),i=n(711),s=n(1548);class a{constructor(){this.simulation=null,(0,o.makeObservable)(this)}newSimulation(e){this.simulation&&this.simulation.terminate(),this.simulation=new s.SimulationStore(e),(0,i.saveOptions)(e)}closeSimulation(){this.simulation&&this.simulation.terminate(),this.simulation=null}getSimulation(){return this.simulation}}r([o.observable],a.prototype,"simulation",void 0),r([o.action],a.prototype,"newSimulation",null),r([o.action],a.prototype,"closeSimulation",null),t.Store=a},4446:function(e,t,n){var r=this&&this.__decorate||function(e,t,n,r){var o,i=arguments.length,s=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(i<3?o(s):i>3?o(t,n,s):o(t,n))||s);return i>3&&s&&Object.defineProperty(t,n,s),s};Object.defineProperty(t,"__esModule",{value:!0}),t.CanvasRenderer=void 0;const o=n(8949),i=n(9408),s=n(8158),a=n(2575),l=n(3629),c=n(7822),u={default:null,energy:"energy",lifetime:"lifetime",supply:"supply",genesis:"genesis"};class d{constructor(e){this.simulation=e,this.renderMode="default",this.renderTime=0,this.scale=1,this.offset=[0,0],this.canvasDestroyListeners=[],this.needRender=!1,this.rendering=!1,this.updatingState=!1,this.updateListeners=[],this.needUpdate=!1,this.renderer=new i.WorkerRenderer,this.paintMode=new c.PaintMode(e,this),(0,o.makeObservable)(this)}setElement(e){this.element&&this.canvasDestroyListeners.forEach((e=>e())),this.element=e,this.context=e.getContext("2d",{alpha:!1}),this.canvasDestroyListeners.push((0,a.initMouseInteractions)(e,this)),this.canvasDestroyListeners.push((0,l.initTouchInteractions)(e,this)),this.fitCenter()}requestRedraw(){if(this.rendering)return void(this.needRender=!0);const e=+Date.now();this.render((t=>{this.redrawId&&cancelAnimationFrame(this.redrawId),this.redrawId=requestAnimationFrame((()=>{this.context.putImageData(t,0,0),(0,o.runInAction)((()=>{this.renderTime=+Date.now()-e})),this.redrawId=null,this.rendering=!1,this.needRender&&(this.needRender=!1,this.requestRedraw())}))}))}setRenderMode(e){this.renderMode=e,this.update(null,e)}update(e,t=this.renderMode){if(this.updatingState)return this.needUpdate=!0,void(e&&this.updateListeners.push(e));const n=this.updateListeners;this.updateListeners=[],this.updatingState=!0,this.simulation.getState(u[t]).then((t=>{this.setState(t),this.updatingState=!1,this.requestRedraw(),n.map((e=>e())),e&&e(),this.needUpdate&&(this.needUpdate=!1,this.update())}))}getRenderMode(){return this.renderMode}getScale(){return this.scale}setScale(e,t=!0){this.scale=e<1?1:e>64?64:Math.round(e),t&&this.requestRedraw()}scaleUp(e=!0){this.setScale(2*this.getScale(),e)}scaleDown(e=!0){this.setScale(this.getScale()/2,e)}getOffset(){return this.offset}setOffset(e,t){this.offset=[Math.round(e),Math.round(t)],this.requestRedraw()}fitCenter(){if(!this.element)return;const e=this.element.width,t=this.element.height,n=this.simulation.getOptions().width,r=this.simulation.getOptions().height,o=n/r,i=e/t,s=o>=i?e:t,a=o>=i?n:r;for(let e=1;e<=64;e++)if(s<e*a){this.scale=1===e?1:e-1;break}this.setOffset(Math.ceil((e-this.scale*n)/2),Math.ceil((t-this.scale*r)/2))}setState(e){this.state=e}terminate(){this.renderer.terminate()}getRenderTime(){return this.renderTime}click(e,t){if(this.paintMode.isEnabled())return void this.paint(e,t);const n=Math.ceil((e-this.offset[0])/this.scale)-1;if(n<0||n>=this.simulation.getOptions().width)return;const r=Math.ceil((t-this.offset[1])/this.scale)-1;r<0||r>=this.simulation.getOptions().height||this.simulation.getSelectedCell().select(n,r)}paint(e,t){this.paintMode.paint(Math.ceil((e-this.offset[0])/this.scale)-1,Math.ceil((t-this.offset[1])/this.scale)-1)}getPaintMode(){return this.paintMode}render(e){this.element&&this.state&&this.element.width&&this.element.height&&u[this.renderMode]===this.state.payload&&(this.rendering=!0,this.renderer.render(e,Math.trunc(this.element.width),Math.trunc(this.element.height),this.offset[0],this.offset[1],this.scale,this.renderMode,new s.Data(new Uint8Array(this.state.buffer.slice(0)),this.state.payload,this.simulation.getOptions().width,this.simulation.getOptions().height)))}}r([o.observable],d.prototype,"renderMode",void 0),r([o.observable],d.prototype,"renderTime",void 0),r([o.action],d.prototype,"setRenderMode",null),t.CanvasRenderer=d},1332:function(e,t,n){var r=this&&this.__decorate||function(e,t,n,r){var o,i=arguments.length,s=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(i<3?o(s):i>3?o(t,n,s):o(t,n))||s);return i>3&&s&&Object.defineProperty(t,n,s),s},o=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{l(r.next(e))}catch(e){i(e)}}function a(e){try{l(r.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}l((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.GenomeBankStore=void 0;const i=n(8949),s=n(1065);class a{constructor(e){this.repository=e,this.items=[],(0,i.makeObservable)(this),this.refresh()}addGenome(e,t=""){return this.put(new s.GenomeItem(t,this.generateId(),e,+Date.now()))}getItems(){return this.items.slice().sort(((e,t)=>t.getCreatedAt()-e.getCreatedAt()))}refresh(){this.repository.findAll().then((e=>{(0,i.runInAction)((()=>this.items=e))}))}put(e){return o(this,void 0,void 0,(function*(){yield this.repository.put(e),(0,i.runInAction)((()=>{const t=this.items.findIndex((t=>t.equals(e)));-1===t?this.items.push(e):this.items[t]=e}))}))}delete(e){return o(this,void 0,void 0,(function*(){yield this.repository.delete(e),(0,i.runInAction)((()=>this.items=this.items.filter((t=>!t.equals(e)))))}))}generateId(){return crypto.randomUUID()}}r([i.observable],a.prototype,"items",void 0),t.GenomeBankStore=a},1065:function(e,t,n){var r=this&&this.__decorate||function(e,t,n,r){var o,i=arguments.length,s=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(i<3?o(s):i>3?o(t,n,s):o(t,n))||s);return i>3&&s&&Object.defineProperty(t,n,s),s};Object.defineProperty(t,"__esModule",{value:!0}),t.GenomeItem=void 0;const o=n(8949),i=n(2841);class s{constructor(e,t,n,r){if(this.id=t,this.genome=n,this.createdAt=r,(0,o.makeObservable)(this),n.version!==i.GENOME_VERSION)throw new Error("Bad genome version");this.name=e}getId(){return this.id}getName(){return this.name}setName(e){this.name=e}getGenome(){return this.genome}getCreatedAt(){return this.createdAt}equals(e){return this.id===e.getId()}serialize(){return{id:this.id,name:this.name,createdAt:this.createdAt,genome:(0,o.toJS)(this.genome)}}}r([o.observable],s.prototype,"name",void 0),t.GenomeItem=s},7822:function(e,t,n){var r=this&&this.__decorate||function(e,t,n,r){var o,i=arguments.length,s=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(i<3?o(s):i>3?o(t,n,s):o(t,n))||s);return i>3&&s&&Object.defineProperty(t,n,s),s};Object.defineProperty(t,"__esModule",{value:!0}),t.PaintMode=void 0;const o=n(8949);class i{constructor(e,t){this.simulation=e,this.canvasRenderer=t,this.enabled=!1,this.type="organic",this.brush="square",this.size=2,this.ignore=[],this.genome=null,this.lastPainted={},(0,o.makeObservable)(this)}isEnabled(){return this.enabled}setEnabled(e){this.enabled=e}getType(){return this.type}setType(e){this.type=e}getBrush(){return this.brush}setBrush(e){this.brush=e}getSize(){return this.size}setSize(e){this.size=e}getIgnore(){return this.ignore}addIgnore(e){this.ignore.push(e)}removeIgnore(e){this.ignore=this.ignore.filter((t=>t!==e))}setClipboard(e){this.genome=e}clearClipboard(){this.genome=null}isIgnore(e){return this.ignore.includes(e)}paint(e,t){this.clearPaintHistory();const n=this.simulation.getOptions().width,r=this.simulation.getOptions().height,i=this.getSize()-1;let s=[];const a=+Date.now(),l=(e,t)=>{if(e<0||t<0||e>=n||t>=r)return;const o=e+":"+t;this.lastPainted[o]||s.push([e,t]),this.lastPainted[o]=a};if("square"===this.getBrush())for(let n=0;n<1+2*i;n++)for(let r=0;r<1+2*i;r++)l(e-i+n,t-i+r);else if("circle"===this.getBrush()){let n=2*i-3,r=-6,o=4*i-10,s=0,a=i;for(;a>=s;){for(let n=i-s;n<=i+s;n++)l(n+e-i,t+a),l(n+e-i,t-a);for(let n=i-a;n<=i+a;n++)l(n+e-i,t+s),l(n+e-i,t-s);n<0?(n+=o,o-=8,a-=1):(n+=r,o-=4),r-=4,s+=1}}if(0===s.length)return;const c={};this.genome&&(c.genome=(0,o.toJS)(this.genome)),this.simulation.replace(s,this.getType(),(0,o.toJS)(this.ignore),c).then((()=>{this.canvasRenderer.update()}))}clearPaintHistory(){const e=+Date.now();for(const t in this.lastPainted)this.lastPainted[t]+1e3<e&&delete this.lastPainted[t]}}r([o.observable],i.prototype,"enabled",void 0),r([o.observable],i.prototype,"type",void 0),r([o.observable],i.prototype,"brush",void 0),r([o.observable],i.prototype,"size",void 0),r([o.observable],i.prototype,"ignore",void 0),r([o.observable],i.prototype,"genome",void 0),r([o.action],i.prototype,"setEnabled",null),r([o.action],i.prototype,"setType",null),r([o.action],i.prototype,"setBrush",null),r([o.action],i.prototype,"setSize",null),r([o.action],i.prototype,"addIgnore",null),r([o.action],i.prototype,"removeIgnore",null),r([o.action],i.prototype,"setClipboard",null),r([o.action],i.prototype,"clearClipboard",null),t.PaintMode=i},2133:function(e,t,n){var r=this&&this.__decorate||function(e,t,n,r){var o,i=arguments.length,s=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(i<3?o(s):i>3?o(t,n,s):o(t,n))||s);return i>3&&s&&Object.defineProperty(t,n,s),s};Object.defineProperty(t,"__esModule",{value:!0}),t.SelectedCell=void 0;const o=n(8949),i=n(789);class s{constructor(e){this.simulation=e,this.coords=null,this.cell=null,this.alive=!0,(0,o.makeObservable)(this)}select(e,t){this.alive=!0,this.coords=[e,t],this.simulation.getCell(e,t).then((e=>{(0,o.runInAction)((()=>{e&&"organism"===e.type?(0,o.runInAction)((()=>this.cell=e)):(0,o.runInAction)((()=>this.cell=null))})),this.simulation.getUI().setActiveTab(i.SidebarTab.CELL)}))}update(){this.cell&&this.alive&&"organism"===this.cell.type&&this.simulation.findCellById(this.cell.id).then((e=>{e&&"organism"===e.type?(0,o.runInAction)((()=>this.cell=e)):(0,o.runInAction)((()=>this.alive=!1))}))}getCoords(){return this.coords}getCell(){return this.cell}isAlive(){return this.alive}}r([o.observable],s.prototype,"coords",void 0),r([o.observable],s.prototype,"cell",void 0),r([o.observable],s.prototype,"alive",void 0),r([o.action],s.prototype,"select",null),t.SelectedCell=s},9687:function(e,t,n){var r=this&&this.__decorate||function(e,t,n,r){var o,i=arguments.length,s=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(i<3?o(s):i>3?o(t,n,s):o(t,n))||s);return i>3&&s&&Object.defineProperty(t,n,s),s};Object.defineProperty(t,"__esModule",{value:!0}),t.SimulationParameters=void 0;const o=n(8949);class i{constructor(e){this.store=e,this.organismMaxLifetime=100,this.photosynthesisEnergy=5,this.chemosynthesisEnergy=5,this.mutationChance=25,(0,o.makeObservable)(this)}setOrganismMaxLifetime(e){this.store.getSimulation().setParameter("organismMaxLifetime",e).then((e=>{(0,o.runInAction)((()=>{this.organismMaxLifetime=e}))}))}setPhotosynthesisEnergy(e){this.store.getSimulation().setParameter("photosynthesisEnergy",e).then((e=>{(0,o.runInAction)((()=>{this.photosynthesisEnergy=e}))}))}setChemosynthesisEnergy(e){this.store.getSimulation().setParameter("chemosynthesisEnergy",e).then((e=>{(0,o.runInAction)((()=>{this.chemosynthesisEnergy=e}))}))}setMutationChance(e){this.store.getSimulation().setParameter("mutationChance",e).then((e=>{(0,o.runInAction)((()=>{this.mutationChance=e}))}))}getOrganismMaxLifetime(){return this.organismMaxLifetime}getPhotosynthesisEnergy(){return this.photosynthesisEnergy}getChemosynthesisEnergy(){return this.chemosynthesisEnergy}getMutationChance(){return this.mutationChance}}r([o.observable],i.prototype,"organismMaxLifetime",void 0),r([o.observable],i.prototype,"photosynthesisEnergy",void 0),r([o.observable],i.prototype,"chemosynthesisEnergy",void 0),r([o.observable],i.prototype,"mutationChance",void 0),r([o.action],i.prototype,"setOrganismMaxLifetime",null),r([o.action],i.prototype,"setPhotosynthesisEnergy",null),r([o.action],i.prototype,"setChemosynthesisEnergy",null),r([o.action],i.prototype,"setMutationChance",null),t.SimulationParameters=i},1548:function(e,t,n){var r=this&&this.__decorate||function(e,t,n,r){var o,i=arguments.length,s=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(i<3?o(s):i>3?o(t,n,s):o(t,n))||s);return i>3&&s&&Object.defineProperty(t,n,s),s},o=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{l(r.next(e))}catch(e){i(e)}}function a(e){try{l(r.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}l((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.SimulationStore=void 0;const i=n(8949),s=n(1563),a=n(4446),l=n(2133),c=n(9687),u=n(789);class d{constructor(e){this.options=e,this.paused=!0,this.ready=!1,this.currentStep=0,this.stepTime=0,this.organismsCount=0,(0,i.makeObservable)(this),this.canvasRenderer=new a.CanvasRenderer(this),this.parameters=new c.SimulationParameters(this),this.ui=new u.SimulationUI,this.selectedCell=new l.SelectedCell(this),(0,s.createSimulation)(e).then((e=>{this.simulation=e,this.canvasRenderer.update((()=>{(0,i.runInAction)((()=>this.ready=!0))})),this.simulation.getOrganismsCount().then((e=>{(0,i.runInAction)((()=>{this.organismsCount=e}))}))}))}pause(){this.paused=!0}start(){if(this.timeoutId)return;this.paused=!1;const e=()=>{this.step().then((()=>{this.canvasRenderer.update((()=>{this.paused||e()}))}))};e()}isPaused(){return this.paused}isReady(){return this.ready}makeStep(){this.step().then((()=>{this.canvasRenderer.update()}))}getState(e){return this.simulation.getState(e)}getOptions(){return this.options}getRenderer(){return this.canvasRenderer}terminate(){this.simulation&&this.simulation.terminate(),this.canvasRenderer&&this.canvasRenderer.terminate()}getParameters(){return this.parameters}getSimulation(){return this.simulation}getUI(){return this.ui}getCurrentStep(){return this.currentStep}getStepTime(){return this.stepTime}getOrganismsCount(){return this.organismsCount}getWidth(){return this.simulation.getOptions().width}getHeight(){return this.simulation.getOptions().height}getCell(e,t){return this.simulation.getCell(e,t)}findCellById(e){return this.simulation.findCellById(e)}getSelectedCell(){return this.selectedCell}replace(e,t,n,r){return this.simulation.replace(e,t,n,r)}step(){return o(this,void 0,void 0,(function*(){const e=Date.now(),t=yield this.simulation.step(),n=yield this.simulation.getOrganismsCount();this.selectedCell.update(),(0,i.runInAction)((()=>{this.stepTime=Date.now()-e,this.currentStep=t,this.organismsCount=n}))}))}}r([i.observable],d.prototype,"paused",void 0),r([i.observable],d.prototype,"ready",void 0),r([i.observable],d.prototype,"currentStep",void 0),r([i.observable],d.prototype,"stepTime",void 0),r([i.observable],d.prototype,"organismsCount",void 0),r([i.action],d.prototype,"pause",null),r([i.action],d.prototype,"start",null),t.SimulationStore=d},789:function(e,t,n){var r=this&&this.__decorate||function(e,t,n,r){var o,i=arguments.length,s=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(i<3?o(s):i>3?o(t,n,s):o(t,n))||s);return i>3&&s&&Object.defineProperty(t,n,s),s};Object.defineProperty(t,"__esModule",{value:!0}),t.SimulationUI=t.SidebarTab=void 0;const o=n(8949);var i;(i=t.SidebarTab||(t.SidebarTab={})).CELL="CELL",i.PARAMERS="PARAMETERS",i.GENOMES="GENOMES";class s{constructor(){this.activeTab=null,this.infoOpened=!1,(0,o.makeObservable)(this)}getActiveTab(){return this.activeTab}isTabActive(e){return this.activeTab===e}toggleTab(e){this.activeTab===e?this.activeTab=null:this.activeTab=e}setActiveTab(e){this.activeTab=e}closeTab(){this.activeTab=null}isInfoOpened(){return this.infoOpened}setInfoOpened(e){this.infoOpened=e}}r([o.observable],s.prototype,"activeTab",void 0),r([o.observable],s.prototype,"infoOpened",void 0),r([o.action],s.prototype,"toggleTab",null),r([o.action],s.prototype,"setActiveTab",null),r([o.action],s.prototype,"closeTab",null),r([o.action],s.prototype,"setInfoOpened",null),t.SimulationUI=s},7698:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GlobalStyle=void 0;const r=n(8804);t.GlobalStyle=r.createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: monospace;
        font-size: 16px;
    }

    input,
    button,
    select,
    optgroup,
    textarea {
        margin: 0;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
    }

    button {
        cursor: pointer;
    }

    canvas {
        display: block;
    }

    * {
        scrollbar-width: auto;
        scrollbar-color: #ffffff transparent;
    }

    *::-webkit-scrollbar {
        width: 8px;
        height: 3px;
    }

    *::-webkit-scrollbar-track {
        background: transparent;
    }

    *::-webkit-scrollbar-thumb {
        background-color: #ffffff;
        border-radius: 10px;
    }
`},23:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.THEME=void 0,t.THEME={background:"#10161e",color:"#f8f2ec",primary:"#0E49B5",success:"#069A8E",secondary:"#393E46"}},9273:(e,t,n)=>{function r(){return new Worker(n.p+"renderer.worker.worker.js")}n.r(t),n.d(t,{default:()=>r})},8365:(e,t,n)=>{function r(){return new Worker(n.p+"simulation.worker.worker.js")}n.r(t),n.d(t,{default:()=>r})}},n={};function r(e){var o=n[e];if(void 0!==o)return o.exports;var i=n[e]={exports:{}};return t[e].call(i.exports,i,i.exports,r),i.exports}r.m=t,e=[],r.O=(t,n,o,i)=>{if(!n){var s=1/0;for(u=0;u<e.length;u++){for(var[n,o,i]=e[u],a=!0,l=0;l<n.length;l++)(!1&i||s>=i)&&Object.keys(r.O).every((e=>r.O[e](n[l])))?n.splice(l--,1):(a=!1,i<s&&(s=i));if(a){e.splice(u--,1);var c=o();void 0!==c&&(t=c)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[n,o,i]},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;r.g.importScripts&&(e=r.g.location+"");var t=r.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");n.length&&(e=n[n.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),r.p=e})(),(()=>{var e={179:0};r.O.j=t=>0===e[t];var t=(t,n)=>{var o,i,[s,a,l]=n,c=0;if(s.some((t=>0!==e[t]))){for(o in a)r.o(a,o)&&(r.m[o]=a[o]);if(l)var u=l(r)}for(t&&t(n);c<s.length;c++)i=s[c],r.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return r.O(u)},n=self.webpackChunkevo=self.webpackChunkevo||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var o=r.O(void 0,[736],(()=>r(2629)));o=r.O(o)})();