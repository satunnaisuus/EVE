(()=>{"use strict";var e={766:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.shuffle=void 0,t.shuffle=function(e){const t=e;for(let e=t.length-1;e>0;e--){const r=Math.floor(Math.random()*(e+1));[t[e],t[r]]=[t[r],t[e]]}return t}},904:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AssertLessOrEqualThanError=t.AssertLessThanError=t.AssertGreaterOrEqualThanError=t.AssertGreaterThanError=t.AssertIntegerError=t.AssertError=t.assertLessOrEqualThan=t.assertLessThan=t.assertGreaterOrEqualThan=t.assertGreaterThan=t.assertInteger=void 0,t.assertInteger=function(e){if(!Number.isInteger(e))throw new s},t.assertGreaterThan=function(e,t){if(e<=t)throw new n},t.assertGreaterOrEqualThan=function(e,t){if(e<t)throw new i},t.assertLessThan=function(e,t){if(e>=t)throw new o},t.assertLessOrEqualThan=function(e,t){if(e>t)throw new a};class r extends Error{}t.AssertError=r;class s extends r{}t.AssertIntegerError=s;class n extends r{}t.AssertGreaterThanError=n;class i extends r{}t.AssertGreaterOrEqualThanError=i;class o extends r{}t.AssertLessThanError=o;class a extends r{}t.AssertLessOrEqualThanError=a},469:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Color=void 0;const s=r(629),n={};for(let e=0;e<256;e++)n[e]=e.toString(16),1===n[e].length&&(n[e]="0"+n[e]);class i{constructor(e,t,r){this.red=e,this.green=t,this.blue=r,e>255?this.red=255:e<0&&(this.red=0),t>255?this.green=255:t<0&&(this.green=0),r>255?this.blue=255:r<0&&(this.blue=0),this.hex="#"+n[this.red]+n[this.green]+n[this.blue]}getRed(){return this.red}getGreen(){return this.green}getBlue(){return this.blue}mix(e,t){return new i(Math.round(this.red*(1-t)+e.getRed()*t),Math.round(this.green*(1-t)+e.getGreen()*t),Math.round(this.blue*(1-t)+e.getBlue()*t))}toHexFormat(){return this.hex}equals(e){return this.blue===e.getBlue()&&this.red===e.getRed()&&this.green===e.getGreen()}toArray(){return[this.red,this.green,this.blue]}static random(){return new i((0,s.randomInt)(0,255),(0,s.randomInt)(0,255),(0,s.randomInt)(0,255))}static fromHex(e){return e.startsWith("#")&&(e=e.slice(1)),new i(parseInt(e.slice(0,2),16),parseInt(e.slice(2,4),16),parseInt(e.slice(4,6),16))}}t.Color=i},629:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.randomInt=void 0,t.randomInt=function(e,t){const r=t-e+1;return Math.floor(Math.random()*r)+e}},40:(e,t)=>{var r;Object.defineProperty(t,"__esModule",{value:!0}),t.AbstractCell=t.CellType=void 0,(r=t.CellType||(t.CellType={}))[r.EMPTY=0]="EMPTY",r[r.ORGANISM=1]="ORGANISM",r[r.ORGANIC=2]="ORGANIC",r[r.WALL=3]="WALL",t.AbstractCell=class{isStatic(){return!0}isEmpty(){return!1}getId(){return 0}}},591:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CellContext=void 0,t.CellContext=class{constructor(e,t,r,s,n){this.grid=e,this.x=t,this.y=r,this.factory=s,this.parameters=n}moveByOffest(e,t){const r=this.grid.getCell(this.x,this.y);return!!this.grid.getCell(this.x+e,this.y+t).isEmpty()&&(this.grid.delete(this.x,this.y),this.grid.insert(this.x+e,this.y+t,r),!0)}deleteByOffset(e,t){this.grid.delete(this.x+e,this.y+t)}getByOffest(e,t){return this.grid.getCell(this.x+e,this.y+t)}replace(e){this.grid.delete(this.x,this.y),this.grid.insert(this.x,this.y,e(this.factory))}getLightEnergy(){return Math.round(this.parameters.photosynthesisEnergy*this.grid.getLightLevel(this.x,this.y)/100)}getMineralsEnergy(){return Math.round(this.parameters.chemosynthesisEnergy*this.grid.getMineralsLevel(this.x,this.y)/100)}getSimulationParameters(){return this.parameters}}},240:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CellFactory=void 0;const s=r(816),n=r(165),i=r(347),o=r(730),a=r(59),l=r(890),h=r(469),c=r(191),u=r(841);t.CellFactory=class{constructor(){this.id=0}create(e,t){switch(e){case u.CellType.WALL:return this.createWall();case u.CellType.EMPTY:return this.createEmpty();case u.CellType.ORGANISM:return this.createOrganism(t.genome?new n.Genome(new c.Program(t.genome.program),h.Color.fromHex(t.genome.color),t.genome.divideLimit,t.genome.organs):n.Genome.createRandom(),255,(0,l.randomDirection)(),new h.Color(255,255,255));case u.CellType.ORGANIC:return this.createOrganic(255)}}deserialize(e){switch(e.type){case u.CellType.EMPTY:return this.createEmpty();case u.CellType.ORGANIC:return this.createOrganic(e.energy);case u.CellType.WALL:return this.createWall();case u.CellType.ORGANISM:return new o.OrganismCell(e.id,new n.Genome(new c.Program(e.genome.program),h.Color.fromHex(e.genome.color),e.genome.divideLimit,e.genome.organs),e.energy,e.direction,h.Color.fromHex(e.supplyColor))}}createWall(){return this.wall?this.wall:this.wall=new a.WallCell}createEmpty(){return this.empty?this.empty:this.empty=new s.EmptyCell}createOrganism(e,t,r,s){return new o.OrganismCell(++this.id,e,t,r,s)}createOrganic(e){return new i.OrganicCell(e)}}},816:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EmptyCell=void 0;const s=r(40);class n extends s.AbstractCell{update(){}getType(){return s.CellType.EMPTY}isEmpty(){return!0}serialize(){return{type:s.CellType.EMPTY}}}t.EmptyCell=n},347:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.OrganicCell=void 0;const s=r(40);class n extends s.AbstractCell{constructor(e){super(),this.energy=e}update(){}getEnergy(){return this.energy}getType(){return s.CellType.ORGANIC}serialize(){return{type:s.CellType.ORGANIC,energy:this.energy}}}t.OrganicCell=n},730:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.OrganismCell=t.ORGANS_COUNT=t.MAX_ENERGY=void 0;const s=r(469),n=r(40),i=r(890),o=r(165),a=r(766),l=r(616),h=r(132),c=r(993),u=r(297),g=r(481),d=r(871),m=r(7);t.MAX_ENERGY=255,t.ORGANS_COUNT=16;class p extends n.AbstractCell{constructor(e,t,r,s,n){super(),this.id=e,this.genome=t,this.energy=r,this.direction=s,this.supplyColor=n,this.lifetime=0,this.programCounter=0,this.organs=[],this.oxidizersCount=0,this.chloroplastsCount=0;for(const[e,r]of t.getOrgans().entries())switch(r){case o.Organ.EYE:this.organs.push(new c.Eye(this,e));break;case o.Organ.CHLOROPLAST:this.organs.push(new u.Chloroplast(this,e)),this.chloroplastsCount++;break;case o.Organ.OXIDIZER:this.organs.push(new g.Oxidizer(this,e)),this.oxidizersCount++;break;case o.Organ.ARMOUR:this.organs.push(new l.Armour(this,e));break;case o.Organ.SPINE:this.organs.push(new h.Spine(this,e));break;case o.Organ.FIN:this.organs.push(new d.Fin(this,e));break;case o.Organ.MOUTH:this.organs.push(new m.Mouth(this,e))}}getId(){return this.id}getType(){return n.CellType.ORGANISM}getLifetime(){return this.lifetime}getEnergy(){return this.energy}getDirection(){return this.direction}getGenome(){return this.genome}update(e,t){0!==this.energy?this.lifetime>=t.organismMaxLifetime?e.replace((e=>e.createOrganic(this.energy))):(this.genome.getProgram().execute(this,e),this.changeEnergy(-1),this.lifetime++,this.energy>=this.genome.getDivideEnergyLimit()&&this.divide(e)):e.replace((e=>e.createEmpty()))}setDirection(e){this.direction=e}divide(e){for(const t of(0,a.shuffle)((0,i.directionsList)())){const r=(0,i.getOffset)(t);if(e.getByOffest(r[0],r[1]).isEmpty())return e.moveByOffest(r[0],r[1]),this.changeEnergy(Math.floor(this.energy/-2)),void(this.energy>0&&e.replace((t=>t.createOrganism(this.genome.clone(e.getSimulationParameters().mutationChance),this.energy,(0,i.randomDirection)(),this.supplyColor))))}e.replace((e=>e.createOrganic(this.energy)))}changeEnergy(e){const r=this.energy;return this.energy+=Math.round(e),this.energy>t.MAX_ENERGY?this.energy=t.MAX_ENERGY:this.energy<0&&(this.energy=0),this.energy-r}isStatic(){return!1}isSimilar(e){return this.genome.isSimilar(e.getGenome())}getColor(){return this.genome.getColor()}getProgramCounter(){return this.programCounter}setProgramCounter(e){this.genome.getProgramLength()>e?this.programCounter=e:this.programCounter=0}addProgramCounterRelative(e){this.setProgramCounter(this.programCounter+=e)}getSupplyColor(){return this.supplyColor}getOrgan(e){return this.organs[e]}getChloroplastsCount(){return this.chloroplastsCount}getOxidizersCount(){return this.oxidizersCount}onAttack(e,t,r){if(0===this.energy)return 0;const s=this.organs[8+(0,i.rotateOnOffset)(this.direction,r)];return null===s?this.changeEnergy(-e):s instanceof l.Armour?s.onAttack(e):s instanceof h.Spine?s.onAttack(e,t):0}makeMoreRed(){this.supplyColor=new s.Color(this.supplyColor.getRed()+10,this.supplyColor.getGreen()-5,this.supplyColor.getBlue()-5)}makeMoreGreen(){this.supplyColor=new s.Color(this.supplyColor.getRed()-5,this.supplyColor.getGreen()+10,this.supplyColor.getBlue()-5)}makeMoreBlue(){this.supplyColor=new s.Color(this.supplyColor.getRed()-5,this.supplyColor.getGreen()-5,this.supplyColor.getBlue()+10)}serialize(){return{id:this.id,type:n.CellType.ORGANISM,lifetime:this.lifetime,energy:this.energy,direction:this.direction,genome:this.genome.serialize(),programCounter:this.programCounter,supplyColor:this.supplyColor.toHexFormat()}}}t.OrganismCell=p},138:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AbstractInstruction=void 0,t.AbstractInstruction=class{}},503:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AbstractOrgan=void 0,t.AbstractOrgan=class{constructor(e,t){this.organism=e,this.position=t}}},890:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.reverseDirection=t.rotateOnOffset=t.rotateRight=t.rotateLeft=t.randomDirection=t.getOffset=t.directionsList=t.Direction=void 0;const s=r(629);var n;function i(e,t){let r=e+t;return r<0&&(r-=8*Math.floor(r/8)),r%8}!function(e){e[e.NORTH=0]="NORTH",e[e.NORTH_EAST=1]="NORTH_EAST",e[e.EAST=2]="EAST",e[e.SOUTH_EAST=3]="SOUTH_EAST",e[e.SOUTH=4]="SOUTH",e[e.SOUTH_WEST=5]="SOUTH_WEST",e[e.WEST=6]="WEST",e[e.NORTH_WEST=7]="NORTH_WEST"}(n=t.Direction||(t.Direction={})),t.directionsList=function(){return[n.NORTH,n.NORTH_EAST,n.EAST,n.SOUTH_EAST,n.SOUTH,n.SOUTH_WEST,n.WEST,n.NORTH_WEST]},t.getOffset=function(e){switch(e){case n.NORTH:return[0,-1];case n.NORTH_EAST:return[1,-1];case n.NORTH_WEST:return[-1,-1];case n.SOUTH:return[0,1];case n.SOUTH_EAST:return[1,1];case n.SOUTH_WEST:return[-1,1];case n.EAST:return[1,0];case n.WEST:return[-1,0]}},t.randomDirection=function(){return(0,s.randomInt)(0,7)},t.rotateLeft=function(e){return e===n.NORTH?n.NORTH_WEST:e-1},t.rotateRight=function(e){return e===n.NORTH_WEST?n.NORTH:e+1},t.rotateOnOffset=i,t.reverseDirection=function(e){return i(e,4)}},165:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Genome=t.CURRENT_VERSION=t.Organ=void 0;const s=r(629),n=r(469),i=r(191);var o;!function(e){e[e.NONE=0]="NONE",e[e.CHLOROPLAST=1]="CHLOROPLAST",e[e.OXIDIZER=2]="OXIDIZER",e[e.EYE=3]="EYE",e[e.MOUTH=4]="MOUTH",e[e.ARMOUR=5]="ARMOUR",e[e.FIN=6]="FIN",e[e.SPINE=7]="SPINE"}(o=t.Organ||(t.Organ={}));const a=[o.CHLOROPLAST].concat(Array(15).fill(null));t.CURRENT_VERSION=1;class l{constructor(e,t,r,s){this.program=e,this.color=t,this.divideLimit=r,this.organs=s}static createRandom(){return new l(i.Program.createPrimitive(16),n.Color.random(),(0,s.randomInt)(100,255),a)}isSimilar(e){const t=e.getOrgans();let r=0;for(let e=0;e<16;e++)this.organs[e]!==t[e]&&r++;return r<=1}getColor(){return this.color}getProgram(){return this.program}clone(e){if(e<=(0,s.randomInt)(0,100))return this;let t=this.divideLimit;255===t?t--:0===t||Math.random()>.5?t++:t--;const r=new n.Color(this.color.getRed()+(Math.random()>.5?1:-1)*(0,s.randomInt)(0,5),this.color.getGreen()+(Math.random()>.5?1:-1)*(0,s.randomInt)(0,5),this.color.getBlue()+(Math.random()>.5?1:-1)*(0,s.randomInt)(0,5)),i=this.program.clone(),o=i.get((0,s.randomInt)(0,i.getLength()-1)),a=this.organs.slice(),h=i.getHandler(o.code);switch((0,s.randomInt)(0,5)){case 0:if(o.code=(0,s.randomInt)(0,i.getHandlersCount()-1),o.args.length>h.getArgsCount())o.args.splice(h.getArgsCount());else for(;o.args.length<h.getArgsCount();)o.args.push(Math.random());if(o.branches.length>h.getBranchesCount())o.branches.splice(h.getBranchesCount());else for(;o.branches.length<h.getBranchesCount();)o.branches.push((0,s.randomInt)(0,i.getLength()-1));break;case 1:o.args.length>0&&(o.args[(0,s.randomInt)(0,o.args.length-1)]=Math.random());break;case 2:o.branches.length>0&&(o.branches[(0,s.randomInt)(0,o.branches.length-1)]=(0,s.randomInt)(0,i.getLength()-1));break;case 3:a[(0,s.randomInt)(0,7)]=(0,s.randomInt)(1,3);break;case 4:a[(0,s.randomInt)(8,15)]=(0,s.randomInt)(4,7);break;case 5:a[(0,s.randomInt)(0,15)]=0}return new l(i,r,t,a)}getDivideEnergyLimit(){return this.divideLimit}getProgramLength(){return this.program.getLength()}getOrgans(){return this.organs}serialize(){return{color:this.color.toHexFormat(),program:this.program.serialize(),divideLimit:this.divideLimit,organs:this.organs,version:t.CURRENT_VERSION}}}t.Genome=l},458:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ActionInstruction=void 0;const s=r(730),n=r(138);class i extends n.AbstractInstruction{execute(e,t,r){const n=Math.floor(r[0]*s.ORGANS_COUNT),i=e.getOrgan(n);return i?(i.use(r[1],t),e.addProgramCounterRelative(1),!0):(e.addProgramCounterRelative(1),!1)}getArgsCount(){return 2}getBranchesCount(){return 0}}t.ActionInstruction=i},475:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.IfInstruction=void 0;const s=r(730),n=r(138);class i extends n.AbstractInstruction{execute(e,t,r,n){const i=r[0]%s.ORGANS_COUNT,o=e.getOrgan(i);return o?(o.use(r[1],t)?e.setProgramCounter(n[0]):e.addProgramCounterRelative(1),!1):(e.addProgramCounterRelative(1),!1)}getArgsCount(){return 2}getBranchesCount(){return 1}}t.IfInstruction=i},537:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.JumpInstruction=void 0;const s=r(138);class n extends s.AbstractInstruction{execute(e,t,r,s){return e.setProgramCounter(s[0]),!1}getArgsCount(){return 0}getBranchesCount(){return 1}}t.JumpInstruction=n},496:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.NothingInstruction=void 0;const s=r(138);class n extends s.AbstractInstruction{execute(e){return e.addProgramCounterRelative(1),!1}getArgsCount(){return 0}getBranchesCount(){return 0}}t.NothingInstruction=n},616:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Armour=void 0;const s=r(503);class n extends s.AbstractOrgan{onAttack(e){return this.organism.changeEnergy(-.5*e)}use(){return!0}}t.Armour=n},297:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Chloroplast=void 0;const s=r(503);class n extends s.AbstractOrgan{use(e,t){const r=this.organism.getChloroplastsCount();return this.organism.changeEnergy(r*t.getLightEnergy())>0&&this.organism.makeMoreGreen(),!0}}t.Chloroplast=n},993:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Eye=void 0;const s=r(347),n=r(730),i=r(59),o=r(503),a=r(890);var l;!function(e){e[e.EMPTY=0]="EMPTY",e[e.WALL=1]="WALL",e[e.ORGANIC=2]="ORGANIC",e[e.ORGANISM_SIMILAR=3]="ORGANISM_SIMILAR",e[e.ORGANISM_OTHER=4]="ORGANISM_OTHER"}(l||(l={}));const h=Object.keys(l).length/2+1;class c extends o.AbstractOrgan{use(e,t){const r=(0,a.getOffset)((0,a.rotateOnOffset)(this.organism.getDirection(),this.position)),s=t.getByOffest(r[0],r[1]);return this.getTargetType(s)===Math.floor(e*h)}getTargetType(e){return e instanceof i.WallCell?l.WALL:e instanceof s.OrganicCell?l.ORGANIC:e instanceof n.OrganismCell?this.organism.isSimilar(e)?l.ORGANISM_SIMILAR:l.ORGANISM_OTHER:l.EMPTY}}t.Eye=c},871:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Fin=void 0;const s=r(503),n=r(890);class i extends s.AbstractOrgan{use(e,t){switch(Math.floor(3*e)){case 0:return this.organism.setDirection((0,n.rotateLeft)(this.organism.getDirection())),!0;case 1:return this.organism.setDirection((0,n.rotateRight)(this.organism.getDirection())),!0;case 2:return t.moveByOffest(...(0,n.getOffset)(this.organism.getDirection()))}return!1}}t.Fin=i},7:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Mouth=void 0;const s=r(347),n=r(730),i=r(503),o=r(890);class a extends i.AbstractOrgan{use(e,t){const r=(0,o.rotateOnOffset)(this.organism.getDirection(),this.position),i=(0,o.getOffset)(r),a=t.getByOffest(i[0],i[1]);if(a instanceof s.OrganicCell){const e=this.organism.changeEnergy(a.getEnergy());return t.deleteByOffset(i[0],i[1]),e>0&&this.organism.makeMoreRed(),!0}if(a instanceof n.OrganismCell){const e=a.onAttack(50,this.organism,(0,o.reverseDirection)(r));return this.organism.changeEnergy(e)>0&&this.organism.makeMoreRed(),!0}return!1}}t.Mouth=a},481:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Oxidizer=void 0;const s=r(503);class n extends s.AbstractOrgan{use(e,t){const r=this.organism.getOxidizersCount();return this.organism.changeEnergy(r*t.getMineralsEnergy())>0&&this.organism.makeMoreBlue(),!0}}t.Oxidizer=n},132:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Spine=void 0;const s=r(503);class n extends s.AbstractOrgan{onAttack(e,t){return t.changeEnergy(-20),this.organism.changeEnergy(-e)}use(){return!0}}t.Spine=n},191:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Program=t.Command=void 0;const s=r(458),n=r(475),i=r(537),o=r(496);var a;!function(e){e[e.NOTHING=0]="NOTHING",e[e.JUMP=1]="JUMP",e[e.IF=2]="IF",e[e.ACTION=3]="ACTION"}(a=t.Command||(t.Command={}));const l={[a.NOTHING]:new o.NothingInstruction,[a.JUMP]:new i.JumpInstruction,[a.IF]:new n.IfInstruction,[a.ACTION]:new s.ActionInstruction};class h{constructor(e){this.instructions=e}static createPrimitive(e){const t=[];for(let r=0;r<e;r++)t.push({code:a.ACTION,args:[0,0],branches:[]});return new h(t)}execute(e,t){for(let r=0;r<8;r++){const r=this.instructions[e.getProgramCounter()],s=l[r.code];if(void 0!==s){if(s.execute(e,t,r.args,r.branches))break}else e.addProgramCounterRelative(1)}}getInstructions(){return this.instructions.slice()}get(e){return this.instructions[e]}getLength(){return this.instructions.length}getHandlersCount(){return 4}getHandler(e){return l[e]}clone(){return new h(this.instructions.map((e=>({code:e.code,args:e.args.slice(),branches:e.branches.slice()}))))}serialize(){return this.instructions}}t.Program=h},59:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.WallCell=void 0;const s=r(40);class n extends s.AbstractCell{update(){}getType(){return s.CellType.WALL}serialize(){return{type:s.CellType.WALL}}}t.WallCell=n},170:function(e,t,r){var s=this&&this.__awaiter||function(e,t,r,s){return new(r||(r=Promise))((function(n,i){function o(e){try{l(s.next(e))}catch(e){i(e)}}function a(e){try{l(s.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?n(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,a)}l((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.CommonSimulation=void 0;const n=r(766),i=r(469),o=r(591),a=r(240),l=r(890),h=r(165),c=r(158),u=r(928),g=r(567),d=r(56),m=r(841);class p extends g.Simulation{constructor(e,t){if(!e&&t&&(e=t.options),super(e),this.step=0,this.cellFactory=new a.CellFactory,this.parameters=new d.SimulationParameters,this.grid=new u.Grid(this.options,this.cellFactory),this.initResources(e),t){this.step=t.step,this.parameters=new d.SimulationParameters(t.parameters);for(let r=0;r<e.width;r++)for(let s=0;s<e.height;s++)this.grid.insert(r,s,this.cellFactory.deserialize(t.grid[r][s]))}else{const t=Math.ceil(e.width*e.height*e.population/100);this.spawnOrganisms(t,e.initialEnergy)}}static createFromDump(e){return new p(null,e)}static create(e){return new p(e)}makeStep(){return s(this,void 0,void 0,(function*(){const e=this.grid.toArray();for(let t=0;t<e.length;t++)for(let r=0;r<e[t].length;r++){const s=e[t][r];s.isStatic()||s.update(new o.CellContext(this.grid,t,r,this.cellFactory,this.parameters),this.parameters)}return this.step++}))}getState(e){return s(this,void 0,void 0,(function*(){const t=c.Data.create(this.grid,e);return{step:this.step,buffer:t.getArray().buffer,payload:e}}))}setParameter(e,t){return s(this,void 0,void 0,(function*(){return this.parameters[e]=t,this.parameters[e]}))}getOrganismsCount(){return s(this,void 0,void 0,(function*(){let e=0;for(let t=0;t<this.grid.getWidth();t++)for(let r=0;r<this.grid.getHeight();r++)this.grid.getCell(t,r).getType()===m.CellType.ORGANISM&&e++;return e}))}findCellById(e){return s(this,void 0,void 0,(function*(){const t=this.grid.find(e);return t?t.serialize():null}))}getCell(e,t){return s(this,void 0,void 0,(function*(){return this.grid.getCell(e,t).serialize()}))}replace(e,t,r,n){return s(this,void 0,void 0,(function*(){for(const[s,i]of e){const e=this.grid.getCell(s,i);r.includes(e.getType())||this.grid.insert(s,i,this.cellFactory.create(t,n))}}))}dump(){return s(this,void 0,void 0,(function*(){return{options:this.options,parameters:this.parameters.serialize(),step:this.step,grid:this.grid.serialize(),version:g.DUMP_VERSION}}))}getParameters(){return s(this,void 0,void 0,(function*(){return this.parameters.serialize()}))}spawnOrganisms(e,t){const r=[],s=this.grid.toArray();for(let e=0;e<s.length;e++)for(let t=0;t<s[e].length;t++)s[e][t].isEmpty()&&r.push([e,t]);for(const[s,o]of(0,n.shuffle)(r).slice(0,e))this.grid.insert(s,o,this.cellFactory.createOrganism(h.Genome.createRandom(),t,(0,l.randomDirection)(),new i.Color(0,255,0)))}initResources(e){const t=Math.round(e.height*e.lightDepth/100),r=Math.round(e.height*e.mineralsDepth/100),s=e.height-r;for(let n=0;n<e.width;n++)for(let i=0;i<e.height;i++){let o=100,a=100;i>=t?o=0:e.lightGradient&&(o=100-Math.round(100*i/t)),i<s?a=0:e.lightGradient&&(a=Math.ceil(100*(i-s)/r)),this.grid.setLightLevel(n,i,o),this.grid.setMineralsLevel(n,i,a)}}}t.CommonSimulation=p},158:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Data=void 0;const s=r(730),n=r(841),i={energy:1,lifetime:1,genesis:3,supply:3};class o{constructor(e,t,r,s){this.array=e,this.payload=t,this.width=r,this.height=s,this.organismDataLength=this.payload?i[this.payload]+1:1}static create(e,t){const r=e.getWidth(),n=e.getHeight(),i=[];for(let o=0;o<r;o++)for(let r=0;r<n;r++){const n=e.getCell(o,r);if(i.push(n.getType()),n instanceof s.OrganismCell)switch(t){case"energy":i.push(n.getEnergy());break;case"lifetime":i.push(n.getLifetime());break;case"genesis":for(const e of n.getColor().toArray())i.push(e);break;case"supply":for(const e of n.getSupplyColor().toArray())i.push(e)}}return new o(new Uint8Array(i),t,r,n)}getArray(){return this.array}getPayload(){return this.payload}getWidth(){return this.width}getHeight(){return this.height}getItemLength(e){switch(e){case n.CellType.EMPTY:return 1;case n.CellType.ORGANISM:return this.organismDataLength;case n.CellType.ORGANIC:case n.CellType.WALL:return 1}throw new Error}}t.Data=o},928:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Grid=void 0;const s=r(904),n=r(282);t.Grid=class{constructor(e,t){this.options=e,this.cellFactory=t,this.cells=[],this.cellIdMap={},this.minerals=[],this.light=[],(0,s.assertGreaterThan)(e.width,0),(0,s.assertGreaterThan)(e.height,0);for(let r=0;r<e.width;r++){this.cells[r]=[],this.minerals[r]=[],this.light[r]=[];for(let s=0;s<e.height;s++)this.cells[r][s]=t.createEmpty(),this.minerals[r][s]=100,this.light[r][s]=100}}getLightLevel(e,t){return this.light[e][t]}getMineralsLevel(e,t){return this.minerals[e][t]}setLightLevel(e,t,r){this.light[e][t]=r}setMineralsLevel(e,t,r){this.minerals[e][t]=r}insert(e,t,r){const s=this.normalizeCoordinates(e,t);this.checkOutOfBounds(s[0],s[1])||(this.cells[s[0]][s[1]]=r,r.getId()&&(this.cellIdMap[r.getId()]=r))}delete(e,t){const r=this.normalizeCoordinates(e,t);if(this.checkOutOfBounds(r[0],r[1]))return;const s=this.cells[r[0]][r[1]];this.cells[r[0]][r[1]]=this.cellFactory.createEmpty(),delete this.cellIdMap[s.getId()]}getCell(e,t){const r=this.normalizeCoordinates(e,t);return this.checkOutOfBounds(r[0],r[1])?this.cellFactory.createWall():this.cells[r[0]][r[1]]}find(e){return this.cellIdMap[e]}getLoopMode(){return this.options.loop}getWidth(){return this.options.width}getHeight(){return this.options.height}toArray(){return this.cells.map((e=>e.slice()))}serialize(){return this.toArray().map((e=>e.map((e=>e.serialize()))))}normalizeCoordinates(e,t){const r=this.options.loop===n.GridLoopType.TORUS||this.options.loop===n.GridLoopType.HORIZONTAL,s=this.options.loop===n.GridLoopType.TORUS||this.options.loop===n.GridLoopType.VERTICAL;let i=e,o=t;if(r){for(;i<0;)i+=this.options.width;i>=this.options.width&&(i%=this.options.width)}if(s){for(;o<0;)o+=this.options.height;o>=this.options.height&&(o%=this.options.height)}return[i,o]}checkOutOfBounds(e,t){return e<0||e>=this.options.width||t<0||t>=this.options.height}}},56:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SimulationParameters=void 0,t.SimulationParameters=class{constructor(e={}){this.organismMaxLifetimeValue=255,this.photosynthesisEnergyValue=5,this.chemosynthesisEnergyValue=5,this.mutationChanceValue=25,null!=e.photosynthesisEnergy&&(this.photosynthesisEnergy=e.photosynthesisEnergy),null!=e.chemosynthesisEnergy&&(this.chemosynthesisEnergy=e.chemosynthesisEnergy),null!=e.organismMaxLifetime&&(this.organismMaxLifetime=e.organismMaxLifetime),null!=e.mutationChance&&(this.mutationChance=e.mutationChance)}set organismMaxLifetime(e){this.organismMaxLifetimeValue=this.converNumberValue(e,!0,1,255)}get organismMaxLifetime(){return this.organismMaxLifetimeValue}set photosynthesisEnergy(e){this.photosynthesisEnergyValue=this.converNumberValue(e,!1,0,255)}get photosynthesisEnergy(){return this.photosynthesisEnergyValue}set chemosynthesisEnergy(e){this.chemosynthesisEnergyValue=this.converNumberValue(e,!1,0,255)}get chemosynthesisEnergy(){return this.chemosynthesisEnergyValue}set mutationChance(e){this.mutationChanceValue=this.converNumberValue(e,!1,0,100)}get mutationChance(){return this.mutationChanceValue}serialize(){return{photosynthesisEnergy:this.photosynthesisEnergy,chemosynthesisEnergy:this.chemosynthesisEnergy,organismMaxLifetime:this.organismMaxLifetime,mutationChance:this.mutationChance}}converNumberValue(e,t=!0,r=null,s=null){return t&&(e=Math.trunc(e)),null==r&&(e=Math.max(r,e)),null==s&&(e=Math.min(s,e)),e}}},567:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Simulation=t.DUMP_VERSION=t.StepData=void 0,t.StepData=class{constructor(e,t,r){this.step=e,this.buffer=t,this.payload=r}},t.DUMP_VERSION=1,t.Simulation=class{constructor(e){this.options=e}terminate(){}getOptions(){return this.options}}},841:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GENOME_VERSION=t.Command=t.Direction=t.Organ=t.CellType=void 0;const s=r(165);Object.defineProperty(t,"Organ",{enumerable:!0,get:function(){return s.Organ}}),Object.defineProperty(t,"GENOME_VERSION",{enumerable:!0,get:function(){return s.CURRENT_VERSION}});const n=r(890);Object.defineProperty(t,"Direction",{enumerable:!0,get:function(){return n.Direction}});const i=r(191);Object.defineProperty(t,"Command",{enumerable:!0,get:function(){return i.Command}});const o=r(40);Object.defineProperty(t,"CellType",{enumerable:!0,get:function(){return o.CellType}})},282:(e,t)=>{var r;Object.defineProperty(t,"__esModule",{value:!0}),t.GridLoopType=void 0,(r=t.GridLoopType||(t.GridLoopType={})).NONE="NONE",r.TORUS="TORUS",r.VERTICAL="VERTICAL",r.HORIZONTAL="HORIZONTAL"}},t={};function r(s){var n=t[s];if(void 0!==n)return n.exports;var i=t[s]={exports:{}};return e[s].call(i.exports,i,i.exports,r),i.exports}(()=>{const e=r(170),t=self;let s;t.addEventListener("message",(r=>{const n=r.data;switch(n.type){case"init":if(s)return;return s=n.dump?e.CommonSimulation.createFromDump(n.dump):e.CommonSimulation.create(n.options),void t.postMessage({type:"init"});case"makeStep":return void s.makeStep().then((e=>{t.postMessage({type:"makeStep",step:e,id:n.id})}));case"requestState":return void s.getState(n.payload).then((e=>{t.postMessage({id:n.id,type:"state",step:e.step,buffer:e.buffer,payload:e.payload},[e.buffer])}));case"setParameter":return void s.setParameter(n.parameter,n.value).then((e=>{t.postMessage({id:n.id,type:"setParameter",value:e})}));case"getOrganismsCount":return void s.getOrganismsCount().then((e=>{t.postMessage({id:n.id,type:"getOrganismsCount",count:e})}));case"getCell":return void s.getCell(n.x,n.y).then((e=>{t.postMessage({id:n.id,type:"getCell",cell:e})}));case"findCellById":return void s.findCellById(n.cellId).then((e=>{t.postMessage({id:n.id,type:"findCellById",cell:e})}));case"replace":return void s.replace(n.coords,n.cellType,n.ignore,n.options).then((()=>{t.postMessage({id:n.id,type:"replace"})}));case"dump":return void s.dump().then((e=>{t.postMessage({id:n.id,type:"dump",dump:e})}));case"getParameters":return void s.getParameters().then((e=>{t.postMessage({id:n.id,type:"getParameters",parameters:e})}))}}))})()})();