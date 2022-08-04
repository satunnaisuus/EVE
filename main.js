(()=>{"use strict";var e,t={2500:(e,t,r)=>{r.r(t),r.d(t,{default:()=>n});const n=r.p+"armor.svg"},7308:(e,t,r)=>{r.r(t),r.d(t,{default:()=>n});const n=r.p+"chloroplast.svg"},4748:(e,t,r)=>{r.r(t),r.d(t,{default:()=>n});const n=r.p+"eye.svg"},1220:(e,t,r)=>{r.r(t),r.d(t,{default:()=>n});const n=r.p+"fin.svg"},7122:(e,t,r)=>{r.r(t),r.d(t,{default:()=>n});const n=r.p+"mouth.svg"},3552:(e,t,r)=>{r.r(t),r.d(t,{default:()=>n});const n=r.p+"oxidizer.svg"},4242:(e,t,r)=>{r.r(t),r.d(t,{default:()=>n});const n=r.p+"spine.svg"},4766:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.shuffle=void 0,t.shuffle=function(e){const t=e;for(let e=t.length-1;e>0;e--){const r=Math.floor(Math.random()*(e+1));[t[e],t[r]]=[t[r],t[e]]}return t}},4904:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AssertLessOrEqualThanError=t.AssertLessThanError=t.AssertGreaterOrEqualThanError=t.AssertGreaterThanError=t.AssertIntegerError=t.AssertError=t.assertLessOrEqualThan=t.assertLessThan=t.assertGreaterOrEqualThan=t.assertGreaterThan=t.assertInteger=void 0,t.assertInteger=function(e){if(!Number.isInteger(e))throw new n},t.assertGreaterThan=function(e,t){if(e<=t)throw new i},t.assertGreaterOrEqualThan=function(e,t){if(e<t)throw new o},t.assertLessThan=function(e,t){if(e>=t)throw new s},t.assertLessOrEqualThan=function(e,t){if(e>t)throw new a};class r extends Error{}t.AssertError=r;class n extends r{}t.AssertIntegerError=n;class i extends r{}t.AssertGreaterThanError=i;class o extends r{}t.AssertGreaterOrEqualThanError=o;class s extends r{}t.AssertLessThanError=s;class a extends r{}t.AssertLessOrEqualThanError=a},6469:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Color=void 0;const n=r(5629),i={};for(let e=0;e<256;e++)i[e]=e.toString(16),1===i[e].length&&(i[e]="0"+i[e]);class o{constructor(e,t,r){this.red=e,this.green=t,this.blue=r,e>255?this.red=255:e<0&&(this.red=0),t>255?this.green=255:t<0&&(this.green=0),r>255?this.blue=255:r<0&&(this.blue=0),this.hex="#"+i[this.red]+i[this.green]+i[this.blue]}getRed(){return this.red}getGreen(){return this.green}getBlue(){return this.blue}mix(e,t){return new o(Math.round(this.red*(1-t)+e.getRed()*t),Math.round(this.green*(1-t)+e.getGreen()*t),Math.round(this.blue*(1-t)+e.getBlue()*t))}toHexFormat(){return this.hex}equals(e){return this.blue===e.getBlue()&&this.red===e.getRed()&&this.green===e.getGreen()}toArray(){return[this.red,this.green,this.blue]}static random(){return new o((0,n.randomInt)(0,255),(0,n.randomInt)(0,255),(0,n.randomInt)(0,255))}static fromHex(e){return e.startsWith("#")&&(e=e.slice(1)),new o(parseInt(e.slice(0,2),16),parseInt(e.slice(2,4),16),parseInt(e.slice(4,6),16))}}t.Color=o},5629:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.randomInt=void 0,t.randomInt=function(e,t){const r=t-e+1;return Math.floor(Math.random()*r)+e}},2629:(e,t,r)=>{const n=r(7294),i=r(745),o=r(9378),s=r(1997),a=r(9376),l=r(7698),c=(0,i.createRoot)(document.getElementById("root")),u=new a.Store;c.render(n.createElement(s.AppContext.Provider,{value:u},n.createElement(l.GlobalStyle,null),n.createElement(o.App,null)))},5120:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Colors=void 0;const n=r(6469);t.Colors={organic:n.Color.fromHex("#F0E9D2"),wall:n.Color.fromHex("#575757"),organism:n.Color.fromHex("#2155CD"),lifetimeMin:n.Color.fromHex("#000000"),lifetimeMax:n.Color.fromHex("#ffffff"),energyMin:n.Color.fromHex("#000000"),energyMax:n.Color.fromHex("#F8CB2E"),aggressionMin:n.Color.fromHex("#000000"),aggressionMax:n.Color.fromHex("#ff0000"),childrenMin:n.Color.fromHex("#000000"),childrenMax:n.Color.fromHex("#f542c8"),stepMin:n.Color.fromHex("#000000"),stepMax:n.Color.fromHex("#f57b42"),actions:[n.Color.fromHex("#ffffff"),n.Color.fromHex("#03fcc2"),n.Color.fromHex("#03cafc"),n.Color.fromHex("#aaf200"),n.Color.fromHex("#a705f7"),n.Color.fromHex("#ff0000"),n.Color.fromHex("#ff00f2"),n.Color.fromHex("#ffffff"),n.Color.fromHex("#00ff00"),n.Color.fromHex("#0000ff")],supplyOrganic:n.Color.fromHex("#ff0000"),supplyPhotosynthesis:n.Color.fromHex("#00ff00"),supplyChemosynthesis:n.Color.fromHex("#0000ff")}},9408:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.WorkerRenderer=void 0;const n=r(9273);t.WorkerRenderer=class{constructor(){this.listeners={},this.lastId=0,this.worker=new n.default,this.worker.addEventListener("message",(e=>{this.listeners[e.data.id](e.data.data),delete this.listeners[e.data.id]}))}render(e,t,r,n,i,o,s,a){const l=++this.lastId;this.listeners[l]=e,this.worker.postMessage({id:l,width:t,height:r,offsetX:n,offsetY:i,scale:o,mode:s,data:{width:a.getWidth(),height:a.getHeight(),payload:a.getPayload(),array:a.getArray()}},[a.getArray().buffer])}terminate(){this.worker.terminate()}}},4040:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AbstractCell=void 0,t.AbstractCell=class{update(e,t){}isStatic(){return!0}isEmpty(){return!1}getId(){return 0}}},4591:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CellContext=void 0,Error,t.CellContext=class{constructor(e,t,r,n,i){this.grid=e,this.x=t,this.y=r,this.factory=n,this.parameters=i}moveByOffest(e,t){const r=this.grid.getCell(this.x,this.y);return!!this.grid.getCell(this.x+e,this.y+t).isEmpty()&&(this.grid.delete(this.x,this.y),this.grid.insert(this.x+e,this.y+t,r),!0)}deleteByOffset(e,t){this.grid.delete(this.x+e,this.y+t)}getByOffest(e,t){return this.grid.getCell(this.x+e,this.y+t)}replace(e){this.grid.delete(this.x,this.y),this.grid.insert(this.x,this.y,e(this.factory))}getLightEnergy(){return Math.round(this.parameters.photosynthesisEnergy*this.grid.getLightLevel(this.x,this.y)/100)}getMineralsEnergy(){return Math.round(this.parameters.chemosynthesisEnergy*this.grid.getMineralsLevel(this.x,this.y)/100)}getSimulationParameters(){return this.parameters}}},4240:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CellFactory=void 0;const n=r(7816),i=r(1165),o=r(347),s=r(4730),a=r(59),l=r(1890),c=r(6469);t.CellFactory=class{constructor(){this.id=0}create(e){switch(e){case"wall":return this.createWall();case"empty":return this.createEmpty();case"organism":return this.createOrganism(i.Genome.createRandom(),255,(0,l.randomDirection)(),new c.Color(255,255,255));case"organic":return this.createOrganic(255)}throw new Error}createWall(){return this.wall?this.wall:this.wall=new a.WallCell}createEmpty(){return this.empty?this.empty:this.empty=new n.EmptyCell}createOrganism(e,t,r,n){return new s.OrganismCell(++this.id,e,t,r,n)}createOrganic(e){return new o.OrganicCell(e)}}},7816:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EmptyCell=void 0;const n=r(4040);class i extends n.AbstractCell{getType(){return"empty"}isEmpty(){return!0}serialize(){return{type:"empty"}}}t.EmptyCell=i},347:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.OrganicCell=void 0;const n=r(4040);class i extends n.AbstractCell{constructor(e){super(),this.energy=e}getEnergy(){return this.energy}getType(){return"organic"}serialize(){return{type:"organic",energy:this.energy}}}t.OrganicCell=i},4730:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.OrganismCell=t.ORGANS_COUNT=t.MAX_ENERGY=void 0;const n=r(6469),i=r(4040),o=r(1890),s=r(1165),a=r(4766),l=r(9616),c=r(8132),u=r(3993),d=r(1297),h=r(6481),g=r(6871),m=r(3007);t.MAX_ENERGY=255,t.ORGANS_COUNT=16;class p extends i.AbstractCell{constructor(e,t,r,n,i){super(),this.id=e,this.genome=t,this.energy=r,this.direction=n,this.supplyColor=i,this.lifetime=0,this.programCounter=0,this.organs=[],this.oxidizersCount=0,this.chloroplastsCount=0;for(const[e,r]of t.getOrgans().entries())switch(r){case s.Organ.EYE:this.organs.push(new u.Eye(this,e));break;case s.Organ.CHLOROPLAST:this.organs.push(new d.Chloroplast(this,e)),this.chloroplastsCount++;break;case s.Organ.OXIDIZER:this.organs.push(new h.Oxidizer(this,e)),this.oxidizersCount++;break;case s.Organ.ARMOUR:this.organs.push(new l.Armour(this,e));break;case s.Organ.SPINE:this.organs.push(new c.Spine(this,e));break;case s.Organ.FIN:this.organs.push(new g.Fin(this,e));break;case s.Organ.MOUTH:this.organs.push(new m.Mouth(this,e))}}getId(){return this.id}getType(){return"organism"}getLifetime(){return this.lifetime}getEnergy(){return this.energy}getDirection(){return this.direction}getGenome(){return this.genome}update(e,t){0!==this.energy?this.lifetime>=t.organismMaxLifetime?e.replace((e=>e.createOrganic(this.energy))):(this.genome.getProgram().execute(this,e),this.changeEnergy(-1),this.lifetime++,this.energy>=this.genome.getDivideEnergyLimit()&&this.divide(e)):e.replace((e=>e.createEmpty()))}setDirection(e){this.direction=e}divide(e){for(const t of(0,a.shuffle)((0,o.directionsList)())){const r=(0,o.getOffset)(t);if(e.getByOffest(r[0],r[1]).isEmpty())return e.moveByOffest(r[0],r[1]),this.changeEnergy(Math.floor(this.energy/-2)),void(this.energy>0&&e.replace((t=>t.createOrganism(this.genome.clone(e.getSimulationParameters().mutationChance),this.energy,(0,o.randomDirection)(),this.supplyColor))))}e.replace((e=>e.createEmpty()))}changeEnergy(e){const r=this.energy;return this.energy+=Math.round(e),this.energy>t.MAX_ENERGY?this.energy=t.MAX_ENERGY:this.energy<0&&(this.energy=0),this.energy-r}isStatic(){return!1}isSimilar(e){return this.genome.isSimilar(e.getGenome())}getColor(){return this.genome.getColor()}getProgramCounter(){return this.programCounter}setProgramCounter(e){this.genome.getProgramLength()>e?this.programCounter=e:this.programCounter=0}addProgramCounterRelative(e){this.setProgramCounter(this.programCounter+=e)}getSupplyColor(){return this.supplyColor}getOrgan(e){return this.organs[e]}getChloroplastsCount(){return this.chloroplastsCount}getOxidizersCount(){return this.oxidizersCount}onAttack(e,t,r){if(0===this.energy)return 0;const n=this.organs[8+(0,o.rotateOnOffset)(this.direction,r)];return null===n?this.changeEnergy(-e):n instanceof l.Armour?n.onAttack(e):n instanceof c.Spine?n.onAttack(e,t):0}makeMoreRed(){this.supplyColor=new n.Color(this.supplyColor.getRed()+50,this.supplyColor.getGreen()-50,this.supplyColor.getBlue()-50)}makeMoreGreen(){this.supplyColor=new n.Color(this.supplyColor.getRed()-50,this.supplyColor.getGreen()+50,this.supplyColor.getBlue()-50)}makeMoreBlue(){this.supplyColor=new n.Color(this.supplyColor.getRed()-50,this.supplyColor.getGreen()-50,this.supplyColor.getBlue()+50)}serialize(){return{id:this.id,type:"organism",lifetime:this.lifetime,energy:this.energy,direction:this.direction,genome:this.genome.serialize(),programCounter:this.programCounter}}}t.OrganismCell=p},2138:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AbstractInstruction=void 0,t.AbstractInstruction=class{}},8503:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AbstractOrgan=void 0,t.AbstractOrgan=class{constructor(e,t){this.organism=e,this.position=t}use(e,t){return!0}}},1890:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.reverseDirection=t.rotateOnOffset=t.rotateRight=t.rotateLeft=t.randomDirection=t.getOffset=t.directionsList=t.Direction=void 0;const n=r(5629);var i;function o(e,t){let r=e+t;return r<0&&(r-=8*Math.floor(r/8)),r%8}!function(e){e[e.NORTH=0]="NORTH",e[e.NORTH_EAST=1]="NORTH_EAST",e[e.EAST=2]="EAST",e[e.SOUTH_EAST=3]="SOUTH_EAST",e[e.SOUTH=4]="SOUTH",e[e.SOUTH_WEST=5]="SOUTH_WEST",e[e.WEST=6]="WEST",e[e.NORTH_WEST=7]="NORTH_WEST"}(i=t.Direction||(t.Direction={})),t.directionsList=function(){return[i.NORTH,i.NORTH_EAST,i.EAST,i.SOUTH_EAST,i.SOUTH,i.SOUTH_WEST,i.WEST,i.NORTH_WEST]},t.getOffset=function(e){switch(e){case i.NORTH:return[0,-1];case i.NORTH_EAST:return[1,-1];case i.NORTH_WEST:return[-1,-1];case i.SOUTH:return[0,1];case i.SOUTH_EAST:return[1,1];case i.SOUTH_WEST:return[-1,1];case i.EAST:return[1,0];case i.WEST:return[-1,0]}},t.randomDirection=function(){return(0,n.randomInt)(0,7)},t.rotateLeft=function(e){return e===i.NORTH?i.NORTH_WEST:e-1},t.rotateRight=function(e){return e===i.NORTH_WEST?i.NORTH:e+1},t.rotateOnOffset=o,t.reverseDirection=function(e){return o(e,4)}},1165:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Genome=t.Organ=void 0;const n=r(5629),i=r(6469),o=r(9191);var s;!function(e){e[e.NONE=0]="NONE",e[e.CHLOROPLAST=1]="CHLOROPLAST",e[e.OXIDIZER=2]="OXIDIZER",e[e.EYE=3]="EYE",e[e.MOUTH=4]="MOUTH",e[e.ARMOUR=5]="ARMOUR",e[e.FIN=6]="FIN",e[e.SPINE=7]="SPINE"}(s=t.Organ||(t.Organ={}));const a=[s.CHLOROPLAST].concat(Array(15).fill(null));class l{constructor(e,t,r,n){this.program=e,this.color=t,this.divideLimit=r,this.organs=n}static createRandom(){return new l(o.Program.createPrimitive(16),i.Color.random(),(0,n.randomInt)(100,255),a)}isSimilar(e){const t=e.getOrgans();let r=0;for(let e=0;e<16;e++)this.organs[e]!==t[e]&&r++;return r<=1}getColor(){return this.color}getProgram(){return this.program}clone(e){if(e<=(0,n.randomInt)(0,100))return this;let t=this.divideLimit;255===t?t--:0===t||Math.random()>.5?t++:t--;const r=new i.Color(this.color.getRed()+(Math.random()>.5?1:-1)*(0,n.randomInt)(0,5),this.color.getGreen()+(Math.random()>.5?1:-1)*(0,n.randomInt)(0,5),this.color.getBlue()+(Math.random()>.5?1:-1)*(0,n.randomInt)(0,5)),o=this.program.clone(),s=o.get((0,n.randomInt)(0,o.getLength()-1)),a=this.organs.slice();switch((0,n.randomInt)(0,4)){case 0:s.code=(0,n.randomInt)(0,o.getHandlersCount()-1);const e=o.getHandler(s.code);if(s.args.length>e.getArgsCount())s.args.splice(e.getArgsCount());else for(;s.args.length<e.getArgsCount();)s.args.push(Math.random());if(s.branches.length>e.getBranchesCount())s.branches.splice(e.getBranchesCount());else for(;s.branches.length<e.getBranchesCount();)s.branches.push((0,n.randomInt)(0,o.getLength()-1));break;case 1:s.args.length>0&&(s.args[(0,n.randomInt)(0,s.args.length-1)]=Math.random());break;case 2:s.branches.length>0&&(s.branches[(0,n.randomInt)(0,s.branches.length-1)]=(0,n.randomInt)(0,o.getLength()-1));break;case 3:a[(0,n.randomInt)(0,7)]=(0,n.randomInt)(0,3);break;case 4:const t=(0,n.randomInt)(0,4);a[(0,n.randomInt)(8,15)]=0===t?0:t+3}return new l(o,r,t,a)}getDivideEnergyLimit(){return this.divideLimit}getProgramLength(){return this.program.getLength()}getOrgans(){return this.organs}serialize(){return{color:this.color.toHexFormat(),program:this.program.serialize(),divideLimit:this.divideLimit,organs:this.organs}}}t.Genome=l},458:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ActionInstruction=void 0;const n=r(4730),i=r(2138);class o extends i.AbstractInstruction{execute(e,t,r,i){const o=Math.floor(r[0]*n.ORGANS_COUNT),s=e.getOrgan(o);return s?(s.use(r[1],t),e.addProgramCounterRelative(1),!0):(e.addProgramCounterRelative(1),!1)}getArgsCount(){return 2}getBranchesCount(){return 0}}t.ActionInstruction=o},8475:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.IfInstruction=void 0;const n=r(4730),i=r(2138);class o extends i.AbstractInstruction{execute(e,t,r,i){const o=r[0]%n.ORGANS_COUNT,s=e.getOrgan(o);return s?(s.use(r[1],t)?e.setProgramCounter(i[0]):e.addProgramCounterRelative(1),!1):(e.addProgramCounterRelative(1),!1)}getArgsCount(){return 2}getBranchesCount(){return 1}}t.IfInstruction=o},9537:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.JumpInstruction=void 0;const n=r(2138);class i extends n.AbstractInstruction{execute(e,t,r,n){return e.setProgramCounter(n[0]),!1}getArgsCount(){return 0}getBranchesCount(){return 1}}t.JumpInstruction=i},9496:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.NothingInstruction=void 0;const n=r(2138);class i extends n.AbstractInstruction{execute(e,t,r,n){return e.addProgramCounterRelative(1),!1}getArgsCount(){return 0}getBranchesCount(){return 0}}t.NothingInstruction=i},9616:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Armour=void 0;const n=r(8503);class i extends n.AbstractOrgan{onAttack(e){return this.organism.changeEnergy(-.5*e)}}t.Armour=i},1297:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Chloroplast=void 0;const n=r(8503);class i extends n.AbstractOrgan{use(e,t){const r=this.organism.getChloroplastsCount();return this.organism.changeEnergy(r*t.getLightEnergy())>0&&this.organism.makeMoreGreen(),!0}}t.Chloroplast=i},3993:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Eye=void 0;const n=r(347),i=r(4730),o=r(59),s=r(8503),a=r(1890);var l;!function(e){e[e.EMPTY=0]="EMPTY",e[e.WALL=1]="WALL",e[e.ORGANIC=2]="ORGANIC",e[e.ORGANISM_SIMILAR=3]="ORGANISM_SIMILAR",e[e.ORGANISM_OTHER=4]="ORGANISM_OTHER"}(l||(l={}));const c=Object.keys(l).length/2+1;class u extends s.AbstractOrgan{use(e,t){const r=(0,a.getOffset)((0,a.rotateOnOffset)(this.organism.getDirection(),this.position)),n=t.getByOffest(r[0],r[1]);return this.getTargetType(n)===Math.floor(e*c)}getTargetType(e){return e instanceof o.WallCell?l.WALL:e instanceof n.OrganicCell?l.ORGANIC:e instanceof i.OrganismCell?this.organism.isSimilar(e)?l.ORGANISM_SIMILAR:l.ORGANISM_OTHER:l.EMPTY}}t.Eye=u},6871:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Fin=void 0;const n=r(8503),i=r(1890);class o extends n.AbstractOrgan{use(e,t){switch(Math.floor(3*e)){case 0:return this.organism.setDirection((0,i.rotateLeft)(this.organism.getDirection())),!0;case 1:return this.organism.setDirection((0,i.rotateRight)(this.organism.getDirection())),!0;case 2:const e=(0,i.getOffset)(this.organism.getDirection());return t.moveByOffest(e[0],e[1])}return!1}}t.Fin=o},3007:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Mouth=void 0;const n=r(347),i=r(4730),o=r(8503),s=r(1890);class a extends o.AbstractOrgan{use(e,t){const r=(0,s.rotateOnOffset)(this.organism.getDirection(),this.position),o=(0,s.getOffset)(r),a=t.getByOffest(o[0],o[1]);if(a instanceof n.OrganicCell){const e=this.organism.changeEnergy(a.getEnergy());return t.deleteByOffset(o[0],o[1]),e>0&&this.organism.makeMoreRed(),!0}if(a instanceof i.OrganismCell){const e=a.onAttack(50,this.organism,(0,s.reverseDirection)(r));return this.organism.changeEnergy(e)>0&&this.organism.makeMoreRed(),!0}return!1}}t.Mouth=a},6481:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Oxidizer=void 0;const n=r(8503);class i extends n.AbstractOrgan{use(e,t){const r=this.organism.getOxidizersCount();return this.organism.changeEnergy(r*t.getMineralsEnergy())>0&&this.organism.makeMoreBlue(),!0}}t.Oxidizer=i},8132:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Spine=void 0;const n=r(8503);class i extends n.AbstractOrgan{onAttack(e,t){return t.changeEnergy(-20),this.organism.changeEnergy(-e)}}t.Spine=i},9191:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Program=t.Command=void 0;const n=r(458),i=r(8475),o=r(9537),s=r(9496);var a;!function(e){e[e.NOTHING=0]="NOTHING",e[e.JUMP=1]="JUMP",e[e.IF=2]="IF",e[e.ACTION=3]="ACTION"}(a=t.Command||(t.Command={}));const l={[a.NOTHING]:new s.NothingInstruction,[a.JUMP]:new o.JumpInstruction,[a.IF]:new i.IfInstruction,[a.ACTION]:new n.ActionInstruction};class c{constructor(e){this.instructions=e}static createPrimitive(e){const t=[];for(let r=0;r<e;r++)t.push({code:a.ACTION,args:[0,0],branches:[]});return new c(t)}execute(e,t){for(let r=0;r<8;r++){const r=this.instructions[e.getProgramCounter()],n=l[r.code];if(void 0!==n){if(n.execute(e,t,r.args,r.branches))break}else e.addProgramCounterRelative(1)}}getInstructions(){return this.instructions.slice()}get(e){return this.instructions[e]}getLength(){return this.instructions.length}getHandlersCount(){return 4}getHandler(e){return l[e]}clone(){return new c(this.instructions.map((e=>({code:e.code,args:e.args.slice(),branches:e.branches.slice()}))))}serialize(){return this.instructions}}t.Program=c},59:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.WallCell=void 0;const n=r(4040);class i extends n.AbstractCell{getType(){return"wall"}serialize(){return{type:"wall"}}}t.WallCell=i},3170:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{l(n.next(e))}catch(e){o(e)}}function a(e){try{l(n.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,a)}l((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.CommonSimulation=void 0;const i=r(4766),o=r(6469),s=r(4240),a=r(1890),l=r(1165),c=r(8158),u=r(6567),d=r(2056),h=r(691);class g extends u.Simulation{constructor(e){super(e),e=this.options,this.cellFactory=new s.CellFactory,this.state=new h.State(e.width,e.height,e.loop,new d.SimulationParameters,this.cellFactory);const t=Math.ceil(e.width*e.height*e.population/100),r=Math.round(e.height*e.lightDepth/100),n=Math.round(e.height*e.mineralsDepth/100),i=e.height-n;for(let t=0;t<e.width;t++)for(let o=0;o<e.height;o++){let s=100,a=100;o>=r?s=0:e.lightGradient&&(s=100-Math.round(100*o/r)),o<i?a=0:e.lightGradient&&(a=Math.ceil(100*(o-i)/n)),this.state.getGrid().setLightLevel(t,o,s),this.state.getGrid().setMineralsLevel(t,o,a)}this.spawnOrganisms(t,e.initialEnergy)}step(){return new Promise((e=>{this.state.next(),e(this.state.getStep())}))}getState(e){return new Promise((t=>{const r=c.Data.create(this.state,e);t({step:this.state.getStep(),buffer:r.getArray().buffer,payload:e})}))}setParameter(e,t){return n(this,void 0,void 0,(function*(){return this.state.getParameters()[e]=t,this.state.getParameters()[e]}))}getOrganismsCount(){return n(this,void 0,void 0,(function*(){return this.state.getOrganismsCount()}))}findCellById(e){return n(this,void 0,void 0,(function*(){const t=this.state.getGrid().find(e);return t?t.serialize():null}))}getCell(e,t){return n(this,void 0,void 0,(function*(){return this.state.getGrid().getCell(e,t).serialize()}))}replace(e,t,r){return n(this,void 0,void 0,(function*(){this.state.replace(e,t,r)}))}spawnOrganisms(e,t){const r=[],n=this.state.getGrid().toArray();for(let e=0;e<n.length;e++)for(let t=0;t<n[e].length;t++)n[e][t].isEmpty()&&r.push([e,t]);for(const[n,s]of(0,i.shuffle)(r).slice(0,e))this.state.getGrid().insert(n,s,this.cellFactory.createOrganism(l.Genome.createRandom(),t,(0,a.randomDirection)(),new o.Color(0,255,0)))}}t.CommonSimulation=g},8158:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Data=void 0;const n=r(4730),i={empty:0,organism:1,organic:2,wall:3},o={direction:1,energy:1,lifetime:1,genesis:3,supply:3,attack:1,step:1,children:1,action:1};class s{constructor(e,t,r,n){this.array=e,this.payload=t,this.width=r,this.height=n,this.itemLength=this.payload?o[this.payload]+1:1}static create(e,t){const r=e.getGrid(),a=r.getWidth(),l=r.getHeight(),c=t?o[t]:0,u=new Uint8Array(a*l*(c+1));let d=0;for(let e=0;e<a;e++)for(let o=0;o<l;o++){const s=r.getCell(e,o);if(u[d++]=i[s.getType()],s instanceof n.OrganismCell)switch(t){case"energy":u[d]=s.getEnergy();break;case"lifetime":u[d]=s.getLifetime();break;case"genesis":const e=s.getColor().toArray();u[d]=e[0],u[d+1]=e[1],u[d+2]=e[2];break;case"supply":const t=s.getSupplyColor().toArray();u[d]=t[0],u[d+1]=t[1],u[d+2]=t[2]}d+=c}return new s(u,t,a,l)}getArray(){return this.array}getPayload(){return this.payload}getWidth(){return this.width}getHeight(){return this.height}getItemLength(){return this.itemLength}}t.Data=s},1563:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{l(n.next(e))}catch(e){o(e)}}function a(e){try{l(n.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,a)}l((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.createSimulation=void 0;const i=r(3170),o=r(4403);t.createSimulation=function(e){return n(this,void 0,void 0,(function*(){let t;return t=window.Worker?yield o.WorkerSimulation.create(e):new i.CommonSimulation(e),t}))}},8928:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Grid=void 0;const n=r(4904),i=r(4282);t.Grid=class{constructor(e,t,r,i){this.width=e,this.height=t,this.loop=r,this.cellFactory=i,this.cells=[],this.cellIdMap={},this.minerals=[],this.light=[],(0,n.assertGreaterThan)(e,0),(0,n.assertGreaterThan)(t,0);for(let r=0;r<e;r++){this.cells[r]=[],this.minerals[r]=[],this.light[r]=[];for(let e=0;e<t;e++)this.cells[r][e]=i.createEmpty(),this.minerals[r][e]=100,this.light[r][e]=100}}getLightLevel(e,t){return this.light[e][t]}getMineralsLevel(e,t){return this.minerals[e][t]}setLightLevel(e,t,r){this.light[e][t]=r}setMineralsLevel(e,t,r){this.minerals[e][t]=r}insert(e,t,r){const n=this.normalizeCoordinates(e,t);this.checkOutOfBounds(n[0],n[1])||(this.cells[n[0]][n[1]]=r,r.getId()&&(this.cellIdMap[r.getId()]=r))}delete(e,t){const r=this.normalizeCoordinates(e,t);if(this.checkOutOfBounds(r[0],r[1]))return;const n=this.cells[r[0]][r[1]];this.cells[r[0]][r[1]]=this.cellFactory.createEmpty(),delete this.cellIdMap[n.getId()]}getCell(e,t){const r=this.normalizeCoordinates(e,t);return this.checkOutOfBounds(r[0],r[1])?this.cellFactory.createWall():this.cells[r[0]][r[1]]}find(e){return this.cellIdMap[e]}getLoopMode(){return this.loop}getWidth(){return this.width}getHeight(){return this.height}toArray(){return this.cells.map((e=>e.slice()))}serialize(){return this.toArray().map((e=>e.map((e=>e.serialize()))))}normalizeCoordinates(e,t){const r=this.loop===i.GridLoopType.TORUS||this.loop===i.GridLoopType.HORIZONTAL,n=this.loop===i.GridLoopType.TORUS||this.loop===i.GridLoopType.VERTICAL;let o=e,s=t;if(r){for(;o<0;)o+=this.width;o>=this.width&&(o%=this.width)}if(n){for(;s<0;)s+=this.height;s>=this.height&&(s%=this.height)}return[o,s]}checkOutOfBounds(e,t){return e<0||e>=this.width||t<0||t>=this.height}}},2056:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SimulationParameters=void 0,t.SimulationParameters=class{constructor(e={}){this.organismMaxLifetimeValue=100,this.photosynthesisEnergyValue=5,this.chemosynthesisEnergyValue=5,this.mutationChanceValue=25,null!=e.photosynthesisEnergy&&(this.photosynthesisEnergy=e.photosynthesisEnergy),null!=e.chemosynthesisEnergy&&(this.chemosynthesisEnergy=e.chemosynthesisEnergy),null!=e.organismMaxLifetime&&(this.organismMaxLifetime=e.organismMaxLifetime),null!=e.mutationChance&&(this.mutationChance=e.mutationChance)}set organismMaxLifetime(e){this.organismMaxLifetimeValue=this.converNumberValue(e,!0,1,255)}get organismMaxLifetime(){return this.organismMaxLifetimeValue}set photosynthesisEnergy(e){this.photosynthesisEnergyValue=this.converNumberValue(e,!1,0,255)}get photosynthesisEnergy(){return this.photosynthesisEnergyValue}set chemosynthesisEnergy(e){this.chemosynthesisEnergyValue=this.converNumberValue(e,!1,0,255)}get chemosynthesisEnergy(){return this.chemosynthesisEnergyValue}set mutationChance(e){this.mutationChanceValue=this.converNumberValue(e,!1,0,100)}get mutationChance(){return this.mutationChanceValue}serialize(){return{photosynthesisEnergy:this.photosynthesisEnergy,chemosynthesisEnergy:this.chemosynthesisEnergy,organismMaxLifetime:this.organismMaxLifetime}}converNumberValue(e,t=!0,r=null,n=null){return t&&(e=Math.trunc(e)),null==r&&(e=Math.max(r,e)),null==n&&(e=Math.min(n,e)),e}}},6567:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Simulation=t.StepData=void 0,t.StepData=class{constructor(e,t,r){this.step=e,this.buffer=t,this.payload=r}},t.Simulation=class{constructor(e){this.options=e}terminate(){}getOptions(){return this.options}}},691:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.State=void 0;const n=r(4591),i=r(8928);t.State=class{constructor(e,t,r,n,o){this.parameters=n,this.cellFactory=o,this.step=0,this.grid=new i.Grid(e,t,r,o)}next(){const e=this.grid.toArray();for(let t=0;t<e.length;t++)for(let r=0;r<e[t].length;r++){const i=e[t][r];i.isStatic()||i.update(new n.CellContext(this.grid,t,r,this.cellFactory,this.parameters),this.parameters)}this.step++}getGrid(){return this.grid}getStep(){return this.step}getParameters(){return this.parameters}getOrganismsCount(){let e=0;for(let t=0;t<this.grid.getWidth();t++)for(let r=0;r<this.grid.getHeight();r++)"organism"===this.grid.getCell(t,r).getType()&&e++;return e}replace(e,t,r){for(const[n,i]of e){const e=this.getGrid().getCell(n,i);r.includes(e.getType())||this.getGrid().insert(n,i,this.cellFactory.create(t))}}}},2841:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Command=t.Direction=t.Organ=void 0;const n=r(1165);Object.defineProperty(t,"Organ",{enumerable:!0,get:function(){return n.Organ}});const i=r(1890);Object.defineProperty(t,"Direction",{enumerable:!0,get:function(){return i.Direction}});const o=r(9191);Object.defineProperty(t,"Command",{enumerable:!0,get:function(){return o.Command}})},4282:(e,t)=>{var r;Object.defineProperty(t,"__esModule",{value:!0}),t.GridLoopType=void 0,(r=t.GridLoopType||(t.GridLoopType={})).NONE="NONE",r.TORUS="TORUS",r.VERTICAL="VERTICAL",r.HORIZONTAL="HORIZONTAL"},4403:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.WorkerSimulation=void 0;const n=r(6567),i=r(8365);class o extends n.Simulation{constructor(e,t){super(e),this.lastRequestId=0,this.messageListeners={step:{},state:{},setParameter:{},getOrganismsCount:{},getCell:{},findCellById:{},replace:{}},this.worker=new i.default,this.worker.postMessage({type:"init",options:e}),this.worker.addEventListener("message",(e=>{switch(e.data.type){case"init":return t(this);case"step":return this.messageListeners.step[e.data.id](e.data.step),void delete this.messageListeners.step[e.data.id];case"state":return this.messageListeners.state[e.data.id](new n.StepData(e.data.step,e.data.buffer,e.data.payload)),void delete this.messageListeners.state[e.data.id];case"setParameter":return this.messageListeners.setParameter[e.data.id](e.data.value),void delete this.messageListeners.setParameter[e.data.id];case"getOrganismsCount":return this.messageListeners.getOrganismsCount[e.data.id](e.data.count),void delete this.messageListeners.getOrganismsCount[e.data.id];case"getCell":return this.messageListeners.getCell[e.data.id](e.data.cell),void delete this.messageListeners.getCell[e.data.id];case"findCellById":return this.messageListeners.findCellById[e.data.id](e.data.cell),void delete this.messageListeners.findCellById[e.data.id];case"replace":return this.messageListeners.replace[e.data.id](),void delete this.messageListeners.replace[e.data.id]}}))}static create(e){return new Promise((t=>{new o(e,(e=>t(e)))}))}terminate(){this.worker.terminate()}step(){return new Promise((e=>{const t=this.nextId();this.messageListeners.step[t]=e,this.worker.postMessage({id:t,type:"step"})}))}getState(e){return new Promise((t=>{const r=this.nextId();this.messageListeners.state[r]=t,this.worker.postMessage({id:r,type:"requestState",payload:e})}))}setParameter(e,t){return new Promise((r=>{const n=this.nextId();this.messageListeners.setParameter[n]=r,this.worker.postMessage({id:n,type:"setParameter",parameter:e,value:t})}))}getOrganismsCount(){return new Promise((e=>{const t=this.nextId();this.messageListeners.getOrganismsCount[t]=e,this.worker.postMessage({id:t,type:"getOrganismsCount"})}))}findCellById(e){return new Promise((t=>{const r=this.nextId();this.messageListeners.findCellById[r]=t,this.worker.postMessage({id:r,type:"findCellById",cellId:e})}))}getCell(e,t){return new Promise((r=>{const n=this.nextId();this.messageListeners.getCell[n]=r,this.worker.postMessage({id:n,type:"getCell",x:e,y:t})}))}replace(e,t,r){return new Promise((n=>{const i=this.nextId();this.messageListeners.replace[i]=n,this.worker.postMessage({id:i,type:"replace",coords:e,cellType:t,ignore:r})}))}nextId(){return this.lastRequestId++}}t.WorkerSimulation=o},9378:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;const n=r(2766),i=r(7294),o=r(7294),s=r(8804),a=r(7244),l=r(1997),c=r(8042),u=r(711),d=r(23),h=s.default.div`
    height: 100vh;
    background: #000;
    display: flex;
    color: #fff;
`,g=(0,n.observer)((()=>{const e=(0,o.useContext)(l.AppContext),t=e.getSimulation();return t?i.createElement(a.Simulation,{simulation:t}):i.createElement(c.CreateSimulationForm,{options:(0,u.loadOptions)(),onCreate:t=>e.newSimulation(t)})}));t.App=(0,n.observer)((()=>i.createElement(s.ThemeProvider,{theme:d.THEME},i.createElement(h,null,i.createElement(g,null)))))},2120:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Button=void 0;const n=r(2766),i=r(7294),o=r(8804),s=r(23),a={primary:{backgroundColor:s.THEME.primary,boderColor:s.THEME.primary,textColor:s.THEME.color},success:{backgroundColor:s.THEME.success,boderColor:s.THEME.success,textColor:s.THEME.color},secondary:{backgroundColor:s.THEME.secondary,boderColor:s.THEME.secondary,textColor:s.THEME.color}},l=o.default.button`
    border: 1px solid;
    border-radius: 10px;
    cursor: pointer;
    padding: 10px 16px;
    ${({width:e})=>e&&`width: ${e};`}
    ${({apperance:e})=>{const t=a[e||"secondary"];return`border-color: ${t.boderColor};background-color: ${t.backgroundColor};color: ${t.textColor};`}}
`;t.Button=(0,n.observer)((e=>i.createElement(l,Object.assign({},e),e.children)))},1017:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Card=void 0;const n=r(7294),i=r(8804).default.div`
    border-radius: 10px;
    background: ${e=>e.theme.background};
    padding: 15px;
    max-height: 100%;
    overflow-y: auto;

    & + & {
        margin-top: 10px;
    }
`;t.Card=e=>n.createElement(i,Object.assign({},e),e.children)},8360:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.OrganismCell=void 0;const n=r(7294),i=r(8804),o=r(2766),s=r(1997),a=r(7294),l=r(5159),c=r(5221),u=i.default.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
`,d=i.default.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`,h=i.default.span`
    color: #ff0000;
`,g=i.default.span`
    color: #00ff00;
`;t.OrganismCell=(0,o.observer)((()=>{const e=(0,a.useContext)(s.SimulationContext).getSelectedCell(),t=e.getCell();if("organism"===t.type)return n.createElement(n.Fragment,null,n.createElement(d,null,n.createElement("div",null,n.createElement(l.Visualization,{organism:t}),n.createElement(u,null,n.createElement("span",null,"Status"),e.isAlive()?n.createElement(g,null,"Alive"):n.createElement(h,null,"Dead")),n.createElement(u,null,n.createElement("span",null,"Energy"),n.createElement("span",null,t.energy)),n.createElement(u,null,n.createElement("span",null,"Lifetime"),n.createElement("span",null,t.lifetime)),n.createElement(u,null,n.createElement("span",null,"Divide limit"),n.createElement("span",null,t.genome.divideLimit)),n.createElement(c.Program,{organism:t}))))}))},346:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Body=void 0;const n=r(7294),i=r(2766),o=r(8804).default.div`
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
`;t.Body=(0,i.observer)((({color:e})=>n.createElement(o,{color:e})))},3798:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ArmorOrgan=void 0;const n=r(7294),i=r(2766),o=r(8804),s=r(2500),a=o.default.div`
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
`;t.ArmorOrgan=(0,i.observer)((({direction:e})=>n.createElement(a,{direction:e},n.createElement("img",{src:s.default}))))},6373:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ChloroplastOrgan=void 0;const n=r(7294),i=r(2766),o=r(8804),s=r(7308),a=o.default.div`
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
`;t.ChloroplastOrgan=(0,i.observer)((({direction:e})=>n.createElement(a,{direction:e},n.createElement("img",{src:s.default}))))},5160:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EyeOrgan=void 0;const n=r(7294),i=r(2766),o=r(8804),s=r(4748),a=o.default.div`
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
`;t.EyeOrgan=(0,i.observer)((({direction:e})=>n.createElement(a,{direction:e},n.createElement("img",{src:s.default}))))},2920:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.FinOrgan=void 0;const n=r(7294),i=r(2766),o=r(8804),s=r(1220),a=o.default.div`
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
`;t.FinOrgan=(0,i.observer)((({direction:e})=>n.createElement(a,{direction:e},n.createElement("img",{src:s.default}))))},1098:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.MouthOrgan=void 0;const n=r(7294),i=r(2766),o=r(8804),s=r(7122),a=o.default.div`
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
`;t.MouthOrgan=(0,i.observer)((({direction:e})=>n.createElement(a,{direction:e},n.createElement("img",{src:s.default}))))},5498:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.OxidizerOrgan=void 0;const n=r(7294),i=r(2766),o=r(8804),s=r(3552),a=o.default.div`
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
`;t.OxidizerOrgan=(0,i.observer)((({direction:e})=>n.createElement(a,{direction:e},n.createElement("img",{src:s.default}))))},7971:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SpineOrgan=void 0;const n=r(7294),i=r(2766),o=r(8804),s=r(4242),a=o.default.div`
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
`;t.SpineOrgan=(0,i.observer)((({direction:e})=>n.createElement(a,{direction:e},n.createElement("img",{src:s.default}))))},5221:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Program=void 0;const n=r(7294),i=r(2766),o=r(8804),s=r(2841),a=o.default.div`
margin: 20px 0;
`,l=o.default.div`
    margin-bottom: 10px;
`,c=o.default.div`
    display: grid;
    grid-template-columns: max-content 1fr;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
`,u=o.default.div`
    display: contents;
    white-space: nowrap;
`,d=o.default.div`
    padding-right: 10px;
    color: ${({active:e})=>e?"#00ff00":"#808080"};
    margin-bottom: 3px;
`,h=o.default.div`
`,g=o.default.div`
    border-radius: 3px;
    display: inline-block;
    background: purple;
    padding: 0 3px;
    margin-left: 5px;
`,m=o.default.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    max-width: 40px;
    vertical-align: middle;
    text-align: center;
`;t.Program=(0,i.observer)((({organism:e})=>n.createElement(a,null,n.createElement(l,null,"Program"),n.createElement(c,null,e.genome.program.map(((t,r)=>n.createElement(u,{key:r},n.createElement(d,{active:r===e.programCounter},r),n.createElement(h,null,s.Command[t.code],"(",t.args.map(((e,r)=>n.createElement("span",{key:r},n.createElement(m,{title:e.toString()},e),t.args.length-1===r?"":", "))),")",t.branches.map(((e,t)=>n.createElement(g,{key:t},e)))))))))))},5159:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Visualization=void 0;const n=r(7294),i=r(8804),o=r(2766),s=r(2841),a=r(346),l=r(3798),c=r(2920),u=r(1098),d=r(5498),h=r(7971),g=r(6373),m=r(5160),p=i.default.div`
    width: 200px;
    height: 200px;
    position: relative;
    margin: 0 auto;
`;t.Visualization=(0,o.observer)((({organism:e})=>n.createElement(p,null,n.createElement(a.Body,{color:e.genome.color}),e.genome.organs.map(((e,t)=>{switch(e){case s.Organ.ARMOUR:return n.createElement(l.ArmorOrgan,{key:t,direction:t});case s.Organ.FIN:return n.createElement(c.FinOrgan,{key:t,direction:t});case s.Organ.MOUTH:return n.createElement(u.MouthOrgan,{key:t,direction:t});case s.Organ.OXIDIZER:return n.createElement(d.OxidizerOrgan,{key:t,direction:t});case s.Organ.SPINE:return n.createElement(h.SpineOrgan,{key:t,direction:t});case s.Organ.CHLOROPLAST:return n.createElement(g.ChloroplastOrgan,{key:t,direction:t});case s.Organ.EYE:return n.createElement(m.EyeOrgan,{key:t,direction:t})}})))))},8005:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.UnselectedCell=void 0;const n=r(7294),i=r(2766);r(8804).default.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
`,t.UnselectedCell=(0,i.observer)((({})=>n.createElement(n.Fragment,null,"Select a cell on the map")))},1752:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ContextMenu=t.ContextMenuItem=void 0;const n=r(7294),i=r(8804),o=i.default.div`
    display: flex;
    flex-direction: column;
    background: #202c3c;
    margin-top: 10px;
    border-radius: 5px;
    padding: 10px 15px;
    width: 250px;
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
`,s=i.default.div`
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
`;t.ContextMenuItem=e=>n.createElement(s,Object.assign({},e),e.children),t.ContextMenu=e=>n.createElement(o,Object.assign({},e),e.children)},8042:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CreateSimulationForm=void 0;const n=r(7294),i=r(7294),o=r(4282),s=r(2120),a=r(1017),l=r(2197),c=r(3540),u=r(3229),d=r(9906),h=r(1139),g=r(4579),m=[{label:"None",value:o.GridLoopType.NONE},{label:"Torus",value:o.GridLoopType.TORUS},{label:"Horizontal",value:o.GridLoopType.HORIZONTAL},{label:"Vertical",value:o.GridLoopType.VERTICAL}];t.CreateSimulationForm=({options:e,onCreate:t})=>{const[r,o]=(0,i.useState)(e.loop),[p,f]=(0,i.useState)(e.width),[v,y]=(0,i.useState)(e.height),[b,E]=(0,i.useState)(e.initialEnergy),[O,C]=(0,i.useState)(e.population),[x,w]=(0,i.useState)(e.lightDepth),[M,S]=(0,i.useState)(e.lightGradient),[I,_]=(0,i.useState)(e.mineralsDepth),[P,T]=(0,i.useState)(e.mineralsGradient);return n.createElement(l.Flex,{align:"center",justify:"center"},n.createElement(a.Card,null,n.createElement(c.FormRow,{label:"Grid width"},n.createElement(u.NumberInput,{min:0,onChange:e=>f(e),value:p})),n.createElement(c.FormRow,{label:"Grid height"},n.createElement(u.NumberInput,{min:0,onChange:e=>y(e),value:v})),n.createElement(c.FormRow,{label:"Loop"},n.createElement(h.Select,{onSelect:e=>o(e),options:m,value:r})),n.createElement(d.RangeRow,{label:"Population",postfix:"%",min:0,max:100,step:.1,onChange:e=>C(e),value:O}),n.createElement(d.RangeRow,{label:"Initial energy",min:0,max:100,step:1,onChange:e=>E(e),value:b}),n.createElement(d.RangeRow,{label:"Light depth",postfix:"%",min:0,max:100,step:.1,onChange:e=>w(e),value:x}),n.createElement(g.Switch,{label:"Light gradient",value:M,onChange:e=>S(e)}),n.createElement(d.RangeRow,{label:"Minerals depth",postfix:"%",min:0,max:100,step:.1,onChange:e=>_(e),value:I}),n.createElement(g.Switch,{label:"Minerals gradient",value:P,onChange:e=>T(e)}),n.createElement(s.Button,{apperance:"primary",width:"100%",onClick:()=>{t({loop:r,width:p,height:v,initialEnergy:b,population:O,lightDepth:x,lightGradient:M,mineralsDepth:I,mineralsGradient:P})}},"Create")))}},2197:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Flex=void 0;const n=r(7294),i=r(8804).default.div`
    display: flex;
    flex-direction: ${e=>e.direction||"row"};
    justify-content: ${e=>e.justify||"stretch"};
    align-items: ${e=>e.align||"stretch"};
    flex-wrap: ${e=>e.wrap||"nowrap"};
    width: 100%;
`;t.Flex=e=>n.createElement(i,Object.assign({},e),e.children)},6989:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Checkbox=void 0;const n=r(8055),i=r(7625),o=r(7294),s=r(8804),a=s.default.div`
    display: flex;
    padding: 3px 0;
`,l=s.default.div`
    width: 20px;
`;t.Checkbox=({label:e,checked:t,onChange:r})=>o.createElement(a,{onClick:()=>r(!t)},o.createElement(l,null,t&&o.createElement(i.FontAwesomeIcon,{icon:n.faCheck})),e)},3540:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.FormRow=void 0;const n=r(7294),i=r(8804),o=i.default.div`
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
`,s=i.default.label`
    margin-bottom: 5px;
    display: block;
    width: 100%;
    color: ${e=>e.theme.color};
`;t.FormRow=e=>n.createElement(o,null,e.label&&n.createElement(s,null,e.label),e.children)},3229:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.NumberInput=void 0;const n=r(7294),i=r(8804),o=r(6767),s=r(98),a=r(7625),l=i.default.input`
    width: 100%;
    background: ${e=>e.theme.secondary};
    border: 2px solid ${e=>e.theme.secondary};
    padding: 10px 60px 10px 10px;
    border-radius: 10px;
    color: ${e=>e.theme.color};
`,c=i.default.button`
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
`,u=(0,i.default)(c)`
    opacity: 0.5;
    cursor: default;
`,d=i.default.div`
    position: relative;
`,h=i.default.div`
    position: absolute;
    top: 11px;
    right: 10px;
`;t.NumberInput=e=>{const[t,r]=n.useState(e.value||0),i=t=>{void 0!==e.min&&t<e.min&&(t=e.min),void 0!==e.max&&t>e.max&&(t=e.max),r(t),e.onChange(t)};let g=n.createElement(c,{onClick:()=>i(t-1)},n.createElement(a.FontAwesomeIcon,{icon:o.faMinus})),m=n.createElement(c,{onClick:()=>i(t+1)},n.createElement(a.FontAwesomeIcon,{icon:s.faPlus}));return void 0!==e.min&&e.value<=e.min&&(g=n.createElement(u,null,n.createElement(a.FontAwesomeIcon,{icon:o.faMinus}))),void 0!==e.max&&e.value>=e.max&&(m=n.createElement(u,null,n.createElement(a.FontAwesomeIcon,{icon:s.faPlus}))),n.createElement(d,null,n.createElement(l,{type:"text",value:t,onChange:e=>(e=>{const t=Number(e);i(Number.isSafeInteger(t)?t:0)})(e.target.value)}),n.createElement(h,null,g,m))}},1522:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.RadioGroup=void 0;const n=r(8055),i=r(7625),o=r(7294),s=r(8804),a=s.default.div`
    
`,l=s.default.div`
    display: flex;
    padding: 3px 0;
`,c=s.default.div`
    width: 20px;
`;t.RadioGroup=({choices:e,value:t,onChange:r})=>o.createElement(a,null,e.map(((e,s)=>o.createElement(l,{key:s,onClick:()=>r(e.value)},o.createElement(c,null,t===e.value&&o.createElement(i.FontAwesomeIcon,{icon:n.faCheck})),e.label))))},8863:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.RangeInput=void 0;const n=r(7294),i=r(8804).default.input`
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
`;t.RangeInput=e=>n.createElement(i,{type:"range",min:e.min,max:e.max,step:e.step,value:e.value,onChange:t=>e.onChange(Number(t.target.value))})},9906:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.RangeRow=void 0;const n=r(7294),i=r(8804),o=r(2197),s=r(3540),a=r(8863),l=i.default.div`
    font-size: 12px;
    line-height: 1;
    text-align: right;
    min-width: 40px;
    margin-left: 5px;
    font-weight: bold;
`,c=i.default.div`
    flex-grow: 1;
`;t.RangeRow=({label:e,postfix:t,min:r,max:i,step:u,value:d,onChange:h})=>n.createElement(s.FormRow,{label:e},n.createElement(o.Flex,{align:"center"},n.createElement(c,null,n.createElement(a.RangeInput,{min:r,max:i,step:u,onChange:h,value:d})),n.createElement(l,null,d,t)))},1139:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Select=void 0;const n=r(7294),i=r(8804).default.select`
    background: ${e=>e.theme.secondary};
    border: 1px solid ${e=>e.theme.secondary};
    padding: 10px 10px;
    border-radius: 10px;
    color: ${e=>e.theme.color};
`;t.Select=e=>n.createElement(i,{onChange:t=>e.onSelect(t.target.value),value:e.value},e.options.map((({value:e,label:t},r)=>n.createElement("option",{value:e,key:r},t))))},4579:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Switch=void 0;const n=r(7294),i=r(8804),o=i.default.label`
    position: relative;
    display: flex;
    width: 100%;
    cursor: pointer;
    margin-bottom: 15px;
    align-items: center;
`,s=i.default.input`
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + div {
        background-color: ${e=>e.theme.primary};
    }

    &:checked + div:before {
        transform: translateX(18px);
    }
`,a=i.default.div`
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
`,l=i.default.span`
    flex: 1;
`;t.Switch=e=>n.createElement(o,null,n.createElement(s,{type:"checkbox",checked:e.value,onChange:t=>e.onChange(t.target.checked)}),n.createElement(a,null),n.createElement(l,null,e.label))},4485:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Info=void 0;const n=r(7294),i=r(2766),o=r(1997),s=r(7294),a=r(8804),l=r(6724),c=a.default.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
`;t.Info=(0,i.observer)((({})=>{const e=(0,s.useContext)(o.SimulationContext);return n.createElement(n.Fragment,null,n.createElement(c,null,n.createElement("span",null,"Size"),n.createElement("span",null,e.getWidth(),"×",e.getHeight())),n.createElement(c,null,n.createElement("span",null,"Step"),n.createElement("span",null,e.getCurrentStep())),n.createElement(c,null,n.createElement("span",null,"Step time"),n.createElement("span",null,e.getStepTime()," ms")),n.createElement(c,null,n.createElement("span",null,"Render time"),n.createElement("span",null,e.getRenderer().getRenderTime()," ms")),n.createElement(c,null,n.createElement("span",null,"Organisms count"),n.createElement("span",null,e.getOrganismsCount())),n.createElement(l.Legend,null))}))},6724:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Legend=void 0;const n=r(7294),i=r(2766),o=r(1997),s=r(7294),a=r(8804),l=r(5120),c=a.default.div`
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
`,h={default:[{label:"Organism",color:l.Colors.organism}],lifetime:[{label:"Older",color:l.Colors.lifetimeMin},{label:"Younger",color:l.Colors.lifetimeMax}],energy:[{label:"Less energy",color:l.Colors.energyMin},{label:"More energy",color:l.Colors.energyMax}],supply:[{label:"Uses organic",color:l.Colors.supplyOrganic},{label:"Uses photosynthesis",color:l.Colors.supplyPhotosynthesis},{label:"Uses chemosynthesis",color:l.Colors.supplyChemosynthesis}],genesis:[]};t.Legend=(0,i.observer)((({})=>{const e=(0,s.useContext)(o.SimulationContext).getRenderer().getRenderMode();return n.createElement(n.Fragment,null,n.createElement(u,null,"Legend"),n.createElement(c,null,n.createElement(d,{bg:l.Colors.wall}),n.createElement("span",null,"Wall")),n.createElement(c,null,n.createElement(d,{bg:l.Colors.organic}),n.createElement("span",null,"Organic")),h[e].map(((e,t)=>n.createElement(c,{key:t},n.createElement(d,{bg:e.color}),n.createElement("span",null,e.label)))))}))},5912:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Overflow=void 0;const n=r(7294),i=r(7294),o=r(8804).default.div`
    position: fixed;
`;t.Overflow=({root:e,children:t,onLoseFocus:r})=>{const[s,a]=(0,i.useState)(0),[l,c]=(0,i.useState)(0),[u,d]=(0,i.useState)(!1),h=(0,i.useRef)();return(0,i.useEffect)((()=>{if(e&&h.current){const t=e.getBoundingClientRect();c(t.top+t.height),t.left+h.current.getBoundingClientRect().width>window.innerWidth?a(Math.max(0,window.innerWidth-h.current.getBoundingClientRect().width)):a(Math.max(0,t.left)),d(!0)}const t=t=>{e.contains(t.target)||r&&r()};return window.addEventListener("mousedown",t),()=>{window.removeEventListener("mousedown",t)}})),n.createElement(o,{style:{left:s,top:l,display:u?null:"none"},ref:h},t)}},6852:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Overlay=void 0;const n=r(7294),i=r(2766),o=r(8804),s=r(1936),a=r(7294),l=r(1997),c=r(4485),u=r(8477),d=o.default.div`
    position: absolute;
    top: 50px;
    left: 0;
    bottom: 0;
    pointer-events: none;
    width: 100%;
`,h=o.default.div`
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
`,g=o.default.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    overflow-y: auto;
    pointer-events: all;
    padding: 16px;
    background: rgb(29, 37, 49);
    width: 320px;
`;t.Overlay=(0,i.observer)((({})=>{const e=(0,a.useContext)(l.SimulationContext).getUI();return n.createElement(d,null,e.isInfoOpened()&&n.createElement(h,null,n.createElement(c.Info,null)),e.isTabActive("parameters")&&n.createElement(g,null,n.createElement(s.Parameters,null)),e.isTabActive("cell")&&n.createElement(g,null,n.createElement(u.SelectedCell,null)))}))},1936:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Parameters=void 0;const n=r(7294),i=r(2766),o=r(1997),s=r(7294),a=r(9906);t.Parameters=(0,i.observer)((({})=>{const e=(0,s.useContext)(o.SimulationContext).getParameters();return n.createElement(n.Fragment,null,n.createElement(a.RangeRow,{label:"Lifetime limit",min:1,max:255,step:1,onChange:t=>e.setOrganismMaxLifetime(t),value:e.getOrganismMaxLifetime()}),n.createElement(a.RangeRow,{label:"Photosynthesis energy",min:0,max:255,step:1,onChange:t=>e.setPhotosynthesisEnergy(t),value:e.getPhotosynthesisEnergy()}),n.createElement(a.RangeRow,{label:"Chemosynthesis energy",min:0,max:255,step:1,onChange:t=>e.setChemosynthesisEnergy(t),value:e.getChemosynthesisEnergy()}),n.createElement(a.RangeRow,{label:"MuatationChance",min:0,max:100,step:1,onChange:t=>e.setMutationChance(t),value:e.getMutationChance()}))}))},8477:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SelectedCell=void 0;const n=r(7294),i=r(2766),o=r(1997),s=r(7294),a=r(8360),l=r(8005);t.SelectedCell=(0,i.observer)((({})=>{const e=(0,s.useContext)(o.SimulationContext).getSelectedCell().getCell();return e&&"organism"===e.type?n.createElement(a.OrganismCell,null):n.createElement(l.UnselectedCell,null)}))},7244:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Simulation=void 0;const n=r(7294),i=r(8804),o=r(2766),s=r(4924),a=r(6852),l=r(7999),c=r(1997),u=i.default.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
`;t.Simulation=(0,o.observer)((({simulation:e})=>n.createElement(c.SimulationContext.Provider,{value:e},e.isReady()&&n.createElement(u,null,n.createElement(l.Toolbar,null),n.createElement(a.Overlay,null),n.createElement(s.Viewport,null)))))},7999:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Toolbar=void 0;const n=r(7294),i=r(8804),o=r(2766),s=r(6700),a=r(9008),l=r(2384),c=r(7099),u=r(7382),d=r(2742),h=r(9073),g=r(9697),m=i.default.div`
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
`,p=i.default.div`
    display: flex;
    align-items: stretch;
    height: 100%;
    z-index: 1;
    flex-grow: 1;
    justify-content: ${e=>e.justify};
`;t.Toolbar=(0,o.observer)((({})=>n.createElement(m,null,n.createElement(p,{justify:"flex-start"},n.createElement(d.ParametersItem,null),n.createElement(g.CellItem,null)),n.createElement(p,{justify:"center"},n.createElement(s.StartPauseItem,null),n.createElement(a.StepItem,null),n.createElement(c.NewSimulationItem,null)),n.createElement(p,{justify:"flex-end"},n.createElement(l.RenderModeItem,null),n.createElement(u.PaintModeItem,null),n.createElement(h.InfoItem,null)))))},9697:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CellItem=void 0;const n=r(7294),i=r(2766),o=r(7294),s=r(2922),a=r(7625),l=r(1997),c=r(8421);t.CellItem=(0,i.observer)((({})=>{const e=(0,o.useContext)(l.SimulationContext).getUI();return n.createElement(c.ToolbarItem,{onClick:()=>e.toggleTab("cell"),enabled:e.isTabActive("cell")},n.createElement(a.FontAwesomeIcon,{icon:s.faMicroscope}))}))},9073:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.InfoItem=void 0;const n=r(7294),i=r(2766),o=r(7294),s=r(8099),a=r(7625),l=r(1997),c=r(8421);t.InfoItem=(0,i.observer)((({})=>{const e=(0,o.useContext)(l.SimulationContext).getUI();return n.createElement(c.ToolbarItem,{onClick:()=>e.setInfoOpened(!e.isInfoOpened()),enabled:e.isInfoOpened()},n.createElement(a.FontAwesomeIcon,{icon:s.faInfo}))}))},8421:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ToolbarItem=void 0;const n=r(7294),i=r(2766),o=r(8804).default.div`
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
`;t.ToolbarItem=(0,i.observer)((e=>n.createElement(o,Object.assign({},e))))},7099:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.NewSimulationItem=void 0;const n=r(7294),i=r(2766),o=r(7294),s=r(3208),a=r(7625),l=r(1997),c=r(8421);t.NewSimulationItem=(0,i.observer)((({})=>{const e=(0,o.useContext)(l.AppContext);return n.createElement(c.ToolbarItem,{onClick:()=>e.closeSimulation()},n.createElement(a.FontAwesomeIcon,{icon:s.faRotateRight}))}))},7382:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PaintModeItem=void 0;const n=r(7294),i=r(8804),o=r(2766),s=r(7294),a=r(869),l=r(7625),c=r(1997),u=r(8421),d=r(1421),h=r(5912),g=r(1752),m=r(1522),p=r(3540),f=r(9906),v=r(6989),y=i.default.div`
    display: flex;
    align-items: center;
    padding: 0 5px;

    &:hover {
        background: rgba(0, 0, 0, 0.3);
    }
`,b=i.default.div`
    margin-left: 5px;
    display: flex;
    align-items: center;
    padding: 0 5px;
`,E=(0,i.default)(u.ToolbarItem)`
    align-items: stretch;
    padding: 0;
    gap: 0;
`,O=[{label:"Square",value:"square"},{label:"Circle",value:"circle"}],C=[{label:"Empty",value:"empty"},{label:"Wall",value:"wall"},{label:"Organic",value:"organic"},{label:"Organism",value:"organism"}];t.PaintModeItem=(0,o.observer)((({})=>{const e=(0,s.useContext)(c.SimulationContext).getRenderer().getPaintMode(),[t,r]=(0,s.useState)(!1),i=(0,s.useRef)();return n.createElement("div",{ref:i},n.createElement(E,{focused:t,enabled:e.isEnabled()},n.createElement(b,{onClick:()=>e.setEnabled(!e.isEnabled())},n.createElement(l.FontAwesomeIcon,{icon:a.faPaintbrush})),n.createElement(y,{onClick:()=>{r(!t),!e.isEnabled()&&e.setEnabled(!0)}},n.createElement(l.FontAwesomeIcon,{icon:d.faCaretDown}))),t&&n.createElement(h.Overflow,{root:i.current,onLoseFocus:()=>r(!1)},n.createElement(g.ContextMenu,null,n.createElement(p.FormRow,{label:"Type of paint"},n.createElement(m.RadioGroup,{choices:C,value:e.getType(),onChange:t=>e.setType(t)})),n.createElement(p.FormRow,{label:"Brush shape"},n.createElement(m.RadioGroup,{choices:O,value:e.getBrush(),onChange:t=>e.setBrush(t)})),n.createElement(p.FormRow,{label:"Ignore"},C.map(((t,r)=>n.createElement(v.Checkbox,{key:r,label:t.label,checked:e.isIgnore(t.value),onChange:r=>r?e.addIgnore(t.value):e.removeIgnore(t.value)})))),n.createElement(f.RangeRow,{label:"Brush size",min:1,max:20,step:1,onChange:t=>e.setSize(t),value:e.getSize()}))))}))},2742:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ParametersItem=void 0;const n=r(7294),i=r(2766),o=r(7294),s=r(7810),a=r(7625),l=r(1997),c=r(8421);t.ParametersItem=(0,i.observer)((({})=>{const e=(0,o.useContext)(l.SimulationContext).getUI();return n.createElement(c.ToolbarItem,{onClick:()=>e.toggleTab("parameters"),enabled:e.isTabActive("parameters")},n.createElement(a.FontAwesomeIcon,{icon:s.faCogs}))}))},2384:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.RenderModeItem=void 0;const n=r(7294),i=r(8804),o=r(2766),s=r(7294),a=r(446),l=r(7625),c=r(1997),u=r(8421),d=r(1421),h=r(5912),g=r(1752),m=r(1522),p=i.default.div`
    margin-left: 5px;
`,f=[{label:"Default",value:"default"},{label:"Energy",value:"energy"},{label:"Lifetime",value:"lifetime"},{label:"Genesis",value:"genesis"},{label:"Supply",value:"supply"}];t.RenderModeItem=(0,o.observer)((({})=>{const e=(0,s.useContext)(c.SimulationContext).getRenderer(),[t,r]=(0,s.useState)(!1),i=(0,s.useRef)();return n.createElement("div",{ref:i},n.createElement(u.ToolbarItem,{focused:t,onClick:()=>r(!t)},n.createElement(l.FontAwesomeIcon,{icon:a.faEye}),n.createElement(p,null,n.createElement(l.FontAwesomeIcon,{icon:d.faCaretDown}))),t&&n.createElement(h.Overflow,{root:i.current,onLoseFocus:()=>r(!1)},n.createElement(g.ContextMenu,null,n.createElement(m.RadioGroup,{choices:f,value:e.getRenderMode(),onChange:t=>e.setRenderMode(t)}))))}))},6700:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.StartPauseItem=void 0;const n=r(7294),i=r(2766),o=r(7294),s=r(753),a=r(6043),l=r(7625),c=r(1997),u=r(8421);t.StartPauseItem=(0,i.observer)((({})=>{const e=(0,o.useContext)(c.SimulationContext);return e.isPaused()?n.createElement(u.ToolbarItem,{onClick:()=>e.start()},n.createElement(l.FontAwesomeIcon,{icon:s.faPlay})):n.createElement(u.ToolbarItem,{onClick:()=>e.pause()},n.createElement(l.FontAwesomeIcon,{icon:a.faPause}))}))},9008:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.StepItem=void 0;const n=r(7294),i=r(2766),o=r(7294),s=r(9596),a=r(7625),l=r(1997),c=r(8421);t.StepItem=(0,i.observer)((({})=>{const e=(0,o.useContext)(l.SimulationContext);return n.createElement(c.ToolbarItem,{disabled:!e.isPaused(),onClick:()=>e.makeStep()},n.createElement(a.FontAwesomeIcon,{icon:s.faForwardStep}))}))},4924:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Viewport=void 0;const n=r(7294),i=r(7294),o=r(2766),s=r(5560),a=r(8804),l=r(1997),c=a.default.div`
    overflow: hidden;
    flex-grow: 1;
`;t.Viewport=(0,o.observer)((({})=>{const e=(0,i.useContext)(l.SimulationContext),t=(0,i.useRef)(),[r,o,a]=(0,s.useSize)();return(0,i.useEffect)((()=>(e.getRenderer().setElement(t.current),()=>{})),[t.current]),(0,i.useEffect)((()=>(e.getRenderer().requestRedraw(),()=>{})),[r,o]),n.createElement(c,{ref:a},n.createElement("canvas",{width:r,height:o,ref:t}))}))},1997:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SimulationContext=t.AppContext=void 0;const n=r(7294);t.AppContext=n.createContext(null),t.SimulationContext=n.createContext(null)},5560:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useSize=void 0;const n=r(7294);t.useSize=function(){const[e,t]=(0,n.useState)(0),[r,i]=(0,n.useState)(0),[o,s]=(0,n.useState)(),a=(0,n.useCallback)((e=>{if(e){t(Math.trunc(e.getBoundingClientRect().width)),i(Math.trunc(e.getBoundingClientRect().height));const r=new ResizeObserver((e=>{for(let r of e){t(Math.trunc(r.contentRect.width)),i(Math.trunc(r.contentRect.height));break}}));r.observe(e),s((()=>()=>r.disconnect()))}}),[]);return(0,n.useEffect)((()=>o),[o]),[e,r,a]}},2575:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.initMouseInteractions=void 0,t.initMouseInteractions=function(e,t){let r=!1,n=!1;const i=e=>{e.preventDefault(),r=!0,n=!1},o=e=>{e.preventDefault(),n||t.click(e.offsetX,e.offsetY)},s=e=>{e.preventDefault()};let a=0;const l=r=>{if(r.preventDefault(),a+=r.deltaY,Math.abs(a)<40)return;a=0;const[n,i]=t.getOffset(),o=e.getBoundingClientRect(),s=r.clientX-Math.trunc(o.left),l=r.clientY-Math.trunc(o.top),c=(s-n)/t.getScale(),u=(l-i)/t.getScale();r.deltaY<0?t.scaleUp(!1):t.scaleDown(!1),t.setOffset(s-c*t.getScale(),l-u*t.getScale())},c=i=>{if(r)if(n=!0,t.getPaintMode().isEnabled()&&1===i.buttons){const r=e.getBoundingClientRect();t.paint(i.clientX-r.x,i.clientY-r.y)}else{const[e,r]=t.getOffset();t.setOffset(e+i.movementX,r+i.movementY)}},u=()=>{r=!1,n=!1};return e.addEventListener("wheel",l),e.addEventListener("mousedown",i),e.addEventListener("mouseup",o),e.addEventListener("mousemove",s),document.body.addEventListener("mousemove",c),document.body.addEventListener("mouseup",u),()=>{e.removeEventListener("wheel",l),e.removeEventListener("mousedown",i),e.removeEventListener("mouseup",o),e.removeEventListener("mousemove",s),document.body.removeEventListener("mousemove",c),document.body.removeEventListener("mouseup",u)}}},3629:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.initTouchInteractions=void 0,t.initTouchInteractions=function(e,t){let r={},n=0,i=!1;const o=()=>2===Object.keys(r).length,s=t=>{const r=e.getBoundingClientRect();return[Math.trunc(t.clientX)-Math.trunc(r.left),Math.trunc(t.clientY)-Math.trunc(r.top)]},a=e=>{e.preventDefault();for(const t of e.changedTouches)o()||(r[t.identifier]=s(t));e.touches.length>1&&(i=!0)},l=e=>{for(const t of e.changedTouches)delete r[t.identifier];i||t.click(...s(e.changedTouches[0])),0===Object.keys(r).length&&(i=!1),n=0},c=e=>{for(const t of e.changedTouches)delete r[t.identifier];0===Object.keys(r).length&&(i=!1),n=0},u=e=>{e.preventDefault(),i=!0;const a=Object.assign({},r),[l,c]=t.getOffset();for(const n of e.changedTouches)r[n.identifier]&&(a[n.identifier]=s(n),1===e.changedTouches.length&&t.getPaintMode().isEnabled()?t.paint(...a[n.identifier]):t.setOffset(l+(a[n.identifier][0]-r[n.identifier][0]),c+(a[n.identifier][1]-r[n.identifier][1])));if(o()){const[e,t]=Object.keys(r),i=Math.abs(Math.hypot(r[e][0]-r[t][0],r[e][1]-r[t][1])),o=Math.abs(Math.hypot(a[e][0]-a[t][0],a[e][1]-a[t][1]));i>o?n-=i-o:n+=o-i}if(Math.abs(n)>=20){const[e,i]=t.getOffset(),[o,s]=Object.keys(r);let a=(r[o][0]+r[s][0])/2,l=(r[o][1]+r[s][1])/2;const c=Math.round((a-e)/t.getScale()),u=Math.round((l-i)/t.getScale());n>0?t.setScale(Math.ceil(1.5*t.getScale()),!1):t.setScale(Math.floor(t.getScale()/1.5),!1),t.setOffset(a-c*t.getScale(),l-u*t.getScale()),n=0}r=a};return e.addEventListener("touchstart",a,{passive:!1}),e.addEventListener("touchend",l),e.addEventListener("touchcancel",c),e.addEventListener("touchmove",u,{passive:!1}),()=>{e.removeEventListener("touchstart",a),e.removeEventListener("touchend",l),e.removeEventListener("touchcancel",c),e.removeEventListener("touchmove",u)}}},711:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.saveOptions=t.loadOptions=void 0;const n=r(4282);t.loadOptions=function(){return Object.assign({width:200,height:100,loop:n.GridLoopType.NONE,population:5,initialEnergy:70,lightDepth:100,lightGradient:!1,mineralsDepth:100,mineralsGradient:!1},function(e){let t=localStorage.getItem("evo_simulation_options"),r={};if("string"==typeof t){const e=JSON.parse(t);"object"==typeof e&&(r=e)}return r}())},t.saveOptions=function(e){var t;t=e,localStorage.setItem("evo_simulation_options",JSON.stringify(t))}},9376:function(e,t,r){var n=this&&this.__decorate||function(e,t,r,n){var i,o=arguments.length,s=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o<3?i(s):o>3?i(t,r,s):i(t,r))||s);return o>3&&s&&Object.defineProperty(t,r,s),s};Object.defineProperty(t,"__esModule",{value:!0}),t.Store=void 0;const i=r(8949),o=r(711),s=r(1548);class a{constructor(){this.simulation=null,(0,i.makeObservable)(this)}newSimulation(e){this.simulation&&this.simulation.terminate(),this.simulation=new s.SimulationStore(e),(0,o.saveOptions)(e)}closeSimulation(){this.simulation&&this.simulation.terminate(),this.simulation=null}getSimulation(){return this.simulation}}n([i.observable],a.prototype,"simulation",void 0),n([i.action],a.prototype,"newSimulation",null),n([i.action],a.prototype,"closeSimulation",null),t.Store=a},4446:function(e,t,r){var n=this&&this.__decorate||function(e,t,r,n){var i,o=arguments.length,s=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o<3?i(s):o>3?i(t,r,s):i(t,r))||s);return o>3&&s&&Object.defineProperty(t,r,s),s};Object.defineProperty(t,"__esModule",{value:!0}),t.CanvasRenderer=void 0;const i=r(8949),o=r(9408),s=r(8158),a=r(2575),l=r(3629),c=r(7822),u={default:null,energy:"energy",lifetime:"lifetime",supply:"supply",genesis:"genesis"};class d{constructor(e){this.simulation=e,this.renderMode="default",this.renderTime=0,this.scale=1,this.offset=[0,0],this.canvasDestroyListeners=[],this.needRender=!1,this.rendering=!1,this.updatingState=!1,this.updateListeners=[],this.needUpdate=!1,this.renderer=new o.WorkerRenderer,this.paintMode=new c.PaintMode(e,this),(0,i.makeObservable)(this)}setElement(e){this.element&&this.canvasDestroyListeners.forEach((e=>e())),this.element=e,this.context=e.getContext("2d",{alpha:!1}),this.canvasDestroyListeners.push((0,a.initMouseInteractions)(e,this)),this.canvasDestroyListeners.push((0,l.initTouchInteractions)(e,this)),this.fitCenter()}requestRedraw(){if(this.rendering)return void(this.needRender=!0);const e=+Date.now();this.render((t=>{this.redrawId&&cancelAnimationFrame(this.redrawId),this.redrawId=requestAnimationFrame((()=>{this.context.putImageData(t,0,0),(0,i.runInAction)((()=>{this.renderTime=+Date.now()-e})),this.redrawId=null,this.rendering=!1,this.needRender&&(this.needRender=!1,this.requestRedraw())}))}))}setRenderMode(e){this.renderMode=e,this.update(null,e)}update(e,t=this.renderMode){if(this.updatingState)return this.needUpdate=!0,void(e&&this.updateListeners.push(e));const r=this.updateListeners;this.updateListeners=[],this.updatingState=!0,this.simulation.getState(u[t]).then((t=>{this.setState(t),this.updatingState=!1,this.requestRedraw(),r.map((e=>e())),e&&e(),this.needUpdate&&(this.needUpdate=!1,this.update())}))}getRenderMode(){return this.renderMode}getScale(){return this.scale}setScale(e,t=!0){this.scale=e<1?1:e>64?64:Math.round(e),t&&this.requestRedraw()}scaleUp(e=!0){this.setScale(2*this.getScale(),e)}scaleDown(e=!0){this.setScale(this.getScale()/2,e)}getOffset(){return this.offset}setOffset(e,t){this.offset=[Math.round(e),Math.round(t)],this.requestRedraw()}fitCenter(){if(!this.element)return;const e=this.element.width,t=this.element.height,r=this.simulation.getOptions().width,n=this.simulation.getOptions().height,i=r/n,o=e/t,s=i>=o?e:t,a=i>=o?r:n;for(let e=1;e<=64;e++)if(s<e*a){this.scale=1===e?1:e-1;break}this.setOffset(Math.ceil((e-this.scale*r)/2),Math.ceil((t-this.scale*n)/2))}setState(e){this.state=e}terminate(){this.renderer.terminate()}getRenderTime(){return this.renderTime}click(e,t){if(this.paintMode.isEnabled())return void this.paint(e,t);const r=Math.ceil((e-this.offset[0])/this.scale)-1;if(r<0||r>=this.simulation.getOptions().width)return;const n=Math.ceil((t-this.offset[1])/this.scale)-1;n<0||n>=this.simulation.getOptions().height||this.simulation.getSelectedCell().select(r,n)}paint(e,t){this.paintMode.paint(Math.ceil((e-this.offset[0])/this.scale)-1,Math.ceil((t-this.offset[1])/this.scale)-1)}getPaintMode(){return this.paintMode}render(e){this.element&&this.state&&this.element.width&&this.element.height&&u[this.renderMode]===this.state.payload&&(this.rendering=!0,this.renderer.render(e,Math.trunc(this.element.width),Math.trunc(this.element.height),this.offset[0],this.offset[1],this.scale,this.renderMode,new s.Data(new Uint8Array(this.state.buffer.slice(0)),this.state.payload,this.simulation.getOptions().width,this.simulation.getOptions().height)))}}n([i.observable],d.prototype,"renderMode",void 0),n([i.observable],d.prototype,"renderTime",void 0),n([i.action],d.prototype,"setRenderMode",null),t.CanvasRenderer=d},7822:function(e,t,r){var n=this&&this.__decorate||function(e,t,r,n){var i,o=arguments.length,s=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o<3?i(s):o>3?i(t,r,s):i(t,r))||s);return o>3&&s&&Object.defineProperty(t,r,s),s};Object.defineProperty(t,"__esModule",{value:!0}),t.PaintMode=void 0;const i=r(8949);class o{constructor(e,t){this.simulation=e,this.canvasRenderer=t,this.enabled=!1,this.type="organic",this.brush="square",this.size=2,this.ignore=[],this.lastPainted={},(0,i.makeObservable)(this)}isEnabled(){return this.enabled}setEnabled(e){this.enabled=e}getType(){return this.type}setType(e){this.type=e}getBrush(){return this.brush}setBrush(e){this.brush=e}getSize(){return this.size}setSize(e){this.size=e}getIgnore(){return this.ignore}addIgnore(e){this.ignore.push(e)}removeIgnore(e){this.ignore=this.ignore.filter((t=>t!==e))}isIgnore(e){return this.ignore.includes(e)}paint(e,t){this.clearPaintHistory();const r=this.simulation.getOptions().width,n=this.simulation.getOptions().height,o=this.getSize()-1;let s=[];const a=+Date.now(),l=(e,t)=>{if(e<0||t<0||e>=r||t>=n)return;const i=e+":"+t;this.lastPainted[i]||s.push([e,t]),this.lastPainted[i]=a};if("square"===this.getBrush())for(let r=0;r<1+2*o;r++)for(let n=0;n<1+2*o;n++)l(e-o+r,t-o+n);else if("circle"===this.getBrush()){let r=2*o-3,n=-6,i=4*o-10,s=0,a=o;for(;a>=s;){for(let r=o-s;r<=o+s;r++)l(r+e-o,t+a),l(r+e-o,t-a);for(let r=o-a;r<=o+a;r++)l(r+e-o,t+s),l(r+e-o,t-s);r<0?(r+=i,i-=8,a-=1):(r+=n,i-=4),n-=4,s+=1}}0!==s.length&&this.simulation.replace(s,this.getType(),(0,i.toJS)(this.ignore)).then((()=>{this.canvasRenderer.update()}))}clearPaintHistory(){const e=+Date.now();for(const t in this.lastPainted)this.lastPainted[t]+1e3<e&&delete this.lastPainted[t]}}n([i.observable],o.prototype,"enabled",void 0),n([i.observable],o.prototype,"type",void 0),n([i.observable],o.prototype,"brush",void 0),n([i.observable],o.prototype,"size",void 0),n([i.observable],o.prototype,"ignore",void 0),n([i.action],o.prototype,"setEnabled",null),n([i.action],o.prototype,"setType",null),n([i.action],o.prototype,"setBrush",null),n([i.action],o.prototype,"setSize",null),n([i.action],o.prototype,"addIgnore",null),n([i.action],o.prototype,"removeIgnore",null),t.PaintMode=o},2133:function(e,t,r){var n=this&&this.__decorate||function(e,t,r,n){var i,o=arguments.length,s=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o<3?i(s):o>3?i(t,r,s):i(t,r))||s);return o>3&&s&&Object.defineProperty(t,r,s),s};Object.defineProperty(t,"__esModule",{value:!0}),t.SelectedCell=void 0;const i=r(8949);class o{constructor(e){this.simulation=e,this.coords=null,this.cell=null,this.alive=!0,(0,i.makeObservable)(this)}select(e,t){this.alive=!0,this.coords=[e,t],this.simulation.getCell(e,t).then((e=>{(0,i.runInAction)((()=>{e&&"organism"===e.type?(0,i.runInAction)((()=>this.cell=e)):(0,i.runInAction)((()=>this.cell=null))})),this.simulation.getUI().setActiveTab("cell")}))}update(){this.cell&&this.alive&&"organism"===this.cell.type&&this.simulation.findCellById(this.cell.id).then((e=>{e&&"organism"===e.type?(0,i.runInAction)((()=>this.cell=e)):(0,i.runInAction)((()=>this.alive=!1))}))}getCoords(){return this.coords}getCell(){return this.cell}isAlive(){return this.alive}}n([i.observable],o.prototype,"coords",void 0),n([i.observable],o.prototype,"cell",void 0),n([i.observable],o.prototype,"alive",void 0),n([i.action],o.prototype,"select",null),t.SelectedCell=o},9687:function(e,t,r){var n=this&&this.__decorate||function(e,t,r,n){var i,o=arguments.length,s=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o<3?i(s):o>3?i(t,r,s):i(t,r))||s);return o>3&&s&&Object.defineProperty(t,r,s),s};Object.defineProperty(t,"__esModule",{value:!0}),t.SimulationParameters=void 0;const i=r(8949);class o{constructor(e){this.store=e,this.organismMaxLifetime=100,this.photosynthesisEnergy=5,this.chemosynthesisEnergy=5,this.mutationChance=25,(0,i.makeObservable)(this)}setOrganismMaxLifetime(e){this.store.getSimulation().setParameter("organismMaxLifetime",e).then((e=>{(0,i.runInAction)((()=>{this.organismMaxLifetime=e}))}))}setPhotosynthesisEnergy(e){this.store.getSimulation().setParameter("photosynthesisEnergy",e).then((e=>{(0,i.runInAction)((()=>{this.photosynthesisEnergy=e}))}))}setChemosynthesisEnergy(e){this.store.getSimulation().setParameter("chemosynthesisEnergy",e).then((e=>{(0,i.runInAction)((()=>{this.chemosynthesisEnergy=e}))}))}setMutationChance(e){this.store.getSimulation().setParameter("mutationChance",e).then((e=>{(0,i.runInAction)((()=>{this.mutationChance=e}))}))}getOrganismMaxLifetime(){return this.organismMaxLifetime}getPhotosynthesisEnergy(){return this.photosynthesisEnergy}getChemosynthesisEnergy(){return this.chemosynthesisEnergy}getMutationChance(){return this.mutationChance}}n([i.observable],o.prototype,"organismMaxLifetime",void 0),n([i.observable],o.prototype,"photosynthesisEnergy",void 0),n([i.observable],o.prototype,"chemosynthesisEnergy",void 0),n([i.observable],o.prototype,"mutationChance",void 0),n([i.action],o.prototype,"setOrganismMaxLifetime",null),n([i.action],o.prototype,"setPhotosynthesisEnergy",null),n([i.action],o.prototype,"setChemosynthesisEnergy",null),n([i.action],o.prototype,"setMutationChance",null),t.SimulationParameters=o},1548:function(e,t,r){var n=this&&this.__decorate||function(e,t,r,n){var i,o=arguments.length,s=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o<3?i(s):o>3?i(t,r,s):i(t,r))||s);return o>3&&s&&Object.defineProperty(t,r,s),s},i=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{l(n.next(e))}catch(e){o(e)}}function a(e){try{l(n.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,a)}l((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.SimulationStore=void 0;const o=r(8949),s=r(1563),a=r(4446),l=r(2133),c=r(9687),u=r(789);class d{constructor(e){this.options=e,this.paused=!0,this.ready=!1,this.currentStep=0,this.stepTime=0,this.organismsCount=0,(0,o.makeObservable)(this),this.canvasRenderer=new a.CanvasRenderer(this),this.parameters=new c.SimulationParameters(this),this.ui=new u.SimulationUI,this.selectedCell=new l.SelectedCell(this),(0,s.createSimulation)(e).then((e=>{this.simulation=e,this.canvasRenderer.update((()=>{(0,o.runInAction)((()=>this.ready=!0))})),this.simulation.getOrganismsCount().then((e=>{(0,o.runInAction)((()=>{this.organismsCount=e}))}))}))}pause(){this.paused=!0}start(){if(this.timeoutId)return;this.paused=!1;const e=()=>{this.step().then((()=>{this.canvasRenderer.update((()=>{this.paused||e()}))}))};e()}isPaused(){return this.paused}isReady(){return this.ready}makeStep(){this.step().then((()=>{this.canvasRenderer.update()}))}getState(e){return this.simulation.getState(e)}getOptions(){return this.options}getRenderer(){return this.canvasRenderer}terminate(){this.simulation&&this.simulation.terminate(),this.canvasRenderer&&this.canvasRenderer.terminate()}getParameters(){return this.parameters}getSimulation(){return this.simulation}getUI(){return this.ui}getCurrentStep(){return this.currentStep}getStepTime(){return this.stepTime}getOrganismsCount(){return this.organismsCount}getWidth(){return this.simulation.getOptions().width}getHeight(){return this.simulation.getOptions().height}getCell(e,t){return this.simulation.getCell(e,t)}findCellById(e){return this.simulation.findCellById(e)}getSelectedCell(){return this.selectedCell}replace(e,t,r){return this.simulation.replace(e,t,r)}step(){return i(this,void 0,void 0,(function*(){const e=Date.now(),t=yield this.simulation.step(),r=yield this.simulation.getOrganismsCount();this.selectedCell.update(),(0,o.runInAction)((()=>{this.stepTime=Date.now()-e,this.currentStep=t,this.organismsCount=r}))}))}}n([o.observable],d.prototype,"paused",void 0),n([o.observable],d.prototype,"ready",void 0),n([o.observable],d.prototype,"currentStep",void 0),n([o.observable],d.prototype,"stepTime",void 0),n([o.observable],d.prototype,"organismsCount",void 0),n([o.action],d.prototype,"pause",null),n([o.action],d.prototype,"start",null),t.SimulationStore=d},789:function(e,t,r){var n=this&&this.__decorate||function(e,t,r,n){var i,o=arguments.length,s=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o<3?i(s):o>3?i(t,r,s):i(t,r))||s);return o>3&&s&&Object.defineProperty(t,r,s),s};Object.defineProperty(t,"__esModule",{value:!0}),t.SimulationUI=void 0;const i=r(8949);class o{constructor(){this.activeTab=null,this.infoOpened=!1,(0,i.makeObservable)(this)}getActiveTab(){return this.activeTab}isTabActive(e){return this.activeTab===e}toggleTab(e){this.activeTab===e?this.activeTab=null:this.activeTab=e}setActiveTab(e){this.activeTab=e}closeTab(){this.activeTab=null}isInfoOpened(){return this.infoOpened}setInfoOpened(e){this.infoOpened=e}}n([i.observable],o.prototype,"activeTab",void 0),n([i.observable],o.prototype,"infoOpened",void 0),n([i.action],o.prototype,"toggleTab",null),n([i.action],o.prototype,"setActiveTab",null),n([i.action],o.prototype,"closeTab",null),n([i.action],o.prototype,"setInfoOpened",null),t.SimulationUI=o},7698:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GlobalStyle=void 0;const n=r(8804);t.GlobalStyle=n.createGlobalStyle`
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
`},23:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.THEME=void 0,t.THEME={background:"#10161e",color:"#f8f2ec",primary:"#0E49B5",success:"#069A8E",secondary:"#393E46"}},9273:(e,t,r)=>{function n(){return new Worker(r.p+"renderer.worker.worker.js")}r.r(t),r.d(t,{default:()=>n})},8365:(e,t,r)=>{function n(){return new Worker(r.p+"simulation.worker.worker.js")}r.r(t),r.d(t,{default:()=>n})}},r={};function n(e){var i=r[e];if(void 0!==i)return i.exports;var o=r[e]={exports:{}};return t[e].call(o.exports,o,o.exports,n),o.exports}n.m=t,e=[],n.O=(t,r,i,o)=>{if(!r){var s=1/0;for(u=0;u<e.length;u++){for(var[r,i,o]=e[u],a=!0,l=0;l<r.length;l++)(!1&o||s>=o)&&Object.keys(n.O).every((e=>n.O[e](r[l])))?r.splice(l--,1):(a=!1,o<s&&(s=o));if(a){e.splice(u--,1);var c=i();void 0!==c&&(t=c)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[r,i,o]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),(()=>{var e={179:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var i,o,[s,a,l]=r,c=0;if(s.some((t=>0!==e[t]))){for(i in a)n.o(a,i)&&(n.m[i]=a[i]);if(l)var u=l(n)}for(t&&t(r);c<s.length;c++)o=s[c],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(u)},r=self.webpackChunkevo=self.webpackChunkevo||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var i=n.O(void 0,[736],(()=>n(2629)));i=n.O(i)})();