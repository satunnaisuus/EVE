(()=>{"use strict";var e={766:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.chunk=t.shuffle=void 0,t.shuffle=function(e){const t=e;for(let e=t.length-1;e>0;e--){const r=Math.floor(Math.random()*(e+1));[t[e],t[r]]=[t[r],t[e]]}return t},t.chunk=function(e,t){const r=[];for(let s=0;s<Math.ceil(e.length/t);s++)r.push(e.slice(t*s,t*s+t));return r}},904:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AssertLessOrEqualThanError=t.AssertLessThanError=t.AssertGreaterOrEqualThanError=t.AssertGreaterThanError=t.AssertIntegerError=t.AssertError=t.assertLessOrEqualThan=t.assertLessThan=t.assertGreaterOrEqualThan=t.assertGreaterThan=t.assertInteger=void 0,t.assertInteger=function(e){if(!Number.isInteger(e))throw new s},t.assertGreaterThan=function(e,t){if(e<=t)throw new n},t.assertGreaterOrEqualThan=function(e,t){if(e<t)throw new i},t.assertLessThan=function(e,t){if(e>=t)throw new o},t.assertLessOrEqualThan=function(e,t){if(e>t)throw new a};class r extends Error{}t.AssertError=r;class s extends r{}t.AssertIntegerError=s;class n extends r{}t.AssertGreaterThanError=n;class i extends r{}t.AssertGreaterOrEqualThanError=i;class o extends r{}t.AssertLessThanError=o;class a extends r{}t.AssertLessOrEqualThanError=a},469:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Color=void 0;const s=r(629),n={};for(let e=0;e<256;e++)n[e]=e.toString(16),1===n[e].length&&(n[e]="0"+n[e]);class i{constructor(e,t,r){this.red=e,this.green=t,this.blue=r,e>255?this.red=255:e<0&&(this.red=0),t>255?this.green=255:t<0&&(this.green=0),r>255?this.blue=255:r<0&&(this.blue=0)}getRed(){return this.red}getGreen(){return this.green}getBlue(){return this.blue}mix(e,t){return new i(Math.round(this.red*(1-t)+e.getRed()*t),Math.round(this.green*(1-t)+e.getGreen()*t),Math.round(this.blue*(1-t)+e.getBlue()*t))}toHexFormat(){return"#"+n[this.red]+n[this.green]+n[this.blue]}equals(e){return this.blue===e.getBlue()&&this.red===e.getRed()&&this.green===e.getGreen()}toArray(){return[this.red,this.green,this.blue]}static random(){return new i((0,s.randomInt)(0,255),(0,s.randomInt)(0,255),(0,s.randomInt)(0,255))}static fromHex(e){return e.startsWith("#")&&(e=e.slice(1)),new i(parseInt(e.slice(0,2),16),parseInt(e.slice(2,4),16),parseInt(e.slice(4,6),16))}}t.Color=i},629:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.randomInt=void 0,t.randomInt=function(e,t){const r=t-e+1;return Math.floor(Math.random()*r)+e}},40:(e,t)=>{var r;Object.defineProperty(t,"__esModule",{value:!0}),t.AbstractCell=t.CellType=void 0,(r=t.CellType||(t.CellType={}))[r.EMPTY=0]="EMPTY",r[r.ORGANISM=1]="ORGANISM",r[r.ORGANIC=2]="ORGANIC",r[r.WALL=3]="WALL",t.AbstractCell=class{isStatic(){return!0}isEmpty(){return!1}getId(){return 0}}},591:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CellContext=void 0;const s=r(890),n={[s.Direction.NORTH]:0,[s.Direction.NORTH_EAST]:1,[s.Direction.NORTH_WEST]:-1,[s.Direction.SOUTH]:0,[s.Direction.SOUTH_EAST]:1,[s.Direction.SOUTH_WEST]:-1,[s.Direction.EAST]:1,[s.Direction.WEST]:-1},i={[s.Direction.NORTH]:-1,[s.Direction.NORTH_EAST]:-1,[s.Direction.NORTH_WEST]:-1,[s.Direction.SOUTH]:1,[s.Direction.SOUTH_EAST]:1,[s.Direction.SOUTH_WEST]:1,[s.Direction.EAST]:0,[s.Direction.WEST]:0};t.CellContext=class{constructor(e,t,r,s,n,i,o){this.grid=e,this.x=t,this.y=r,this.factory=s,this.interpreter=n,this.organPool=i,this.parameters=o}moveByDirection(e){const t=n[e],r=i[e],s=this.grid.getCell(this.x,this.y);return!!this.grid.getCell(this.x+t,this.y+r).isEmpty()&&(this.grid.delete(this.x,this.y),this.grid.insert(this.x+t,this.y+r,s),!0)}deleteByDirection(e){this.grid.delete(this.x+n[e],this.y+i[e])}replaceByDirection(e,t){this.grid.insert(this.x+n[e],this.y+i[e],t)}getByDirection(e){return this.grid.getCell(this.x+n[e],this.y+i[e])}replace(e){this.grid.delete(this.x,this.y),this.grid.insert(this.x,this.y,e)}getLightEnergy(){return Math.round(this.parameters.photosynthesisEnergy*this.grid.getLightLevel(this.x,this.y)/100)}getMineralsEnergy(){return Math.round(this.parameters.chemosynthesisEnergy*this.grid.getMineralsLevel(this.x,this.y)/100)}getSimulationParameters(){return this.parameters}setX(e){this.x=e}setY(e){this.y=e}getCellFactory(){return this.factory}getInterpreter(){return this.interpreter}getOrganPool(){return this.organPool}}},240:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CellFactory=t.PRIMITIVE_ORGANS=void 0;const s=r(816),n=r(347),i=r(730),o=r(59),a=r(890),l=r(469),u=r(841);t.PRIMITIVE_ORGANS=[i.Organ.EYE,i.Organ.CHLOROPLAST,i.Organ.NONE,i.Organ.FERMENTER,i.Organ.REPRODUCTOR,i.Organ.NONE,i.Organ.NONE,i.Organ.NONE,i.Organ.MOUTH,i.Organ.NONE,i.Organ.NONE,i.Organ.NONE,i.Organ.FIN,i.Organ.NONE,i.Organ.NONE,i.Organ.NONE],t.CellFactory=class{constructor(e){this.programLength=e,this.id=0,this.organics={};for(let e=0;e<=i.MAX_ENERGY;e++)this.organics[e]=new n.OrganicCell(e);this.wall=new o.WallCell,this.empty=new s.EmptyCell}create(e,r){switch(e){case u.CellType.WALL:return this.createWall();case u.CellType.EMPTY:return this.createEmpty();case u.CellType.ORGANISM:return this.createOrganism(r.genome?r.genome.organs:t.PRIMITIVE_ORGANS,r.genome?l.Color.fromHex(r.genome.color):l.Color.random(),r.genome?new Uint8Array(r.genome.program):(0,i.createPrimitiveProgram)(this.programLength),255,(0,a.randomDirection)(),new l.Color(255,255,255));case u.CellType.ORGANIC:return this.createOrganic(255)}}deserialize(e){switch(e.type){case u.CellType.EMPTY:return this.createEmpty();case u.CellType.ORGANIC:return this.createOrganic(e.energy);case u.CellType.WALL:return this.createWall();case u.CellType.ORGANISM:return new i.OrganismCell(e.id,e.genome.organs,l.Color.fromHex(e.genome.color),new Uint8Array(e.genome.program),e.energy,e.direction,l.Color.fromHex(e.supplyColor),e.lifetime)}}createWall(){return this.wall}createEmpty(){return this.empty}createOrganism(e,t,r,s,n,o){return new i.OrganismCell(++this.id,e,t,r,s,n,o)}createOrganic(e){return this.organics[e]}}},816:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EmptyCell=void 0;const s=r(40);class n extends s.AbstractCell{update(){}getType(){return s.CellType.EMPTY}isEmpty(){return!0}serialize(){return{type:s.CellType.EMPTY}}}t.EmptyCell=n},347:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.OrganicCell=void 0;const s=r(40);class n extends s.AbstractCell{constructor(e){super(),this.energy=e}update(){}getEnergy(){return this.energy}getType(){return s.CellType.ORGANIC}serialize(){return{type:s.CellType.ORGANIC,energy:this.energy}}}t.OrganicCell=n},730:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.OrganismCell=t.createPrimitiveProgram=t.Organ=t.GENOME_VERSION=t.ORGANS_COUNT=t.MAX_ENERGY=void 0;const s=r(469),n=r(40),i=r(890),o=r(766),a=r(69),l=r(629);var u;t.MAX_ENERGY=255,t.ORGANS_COUNT=16,t.GENOME_VERSION=2,function(e){e[e.NONE=0]="NONE",e[e.CHLOROPLAST=1]="CHLOROPLAST",e[e.OXIDIZER=2]="OXIDIZER",e[e.EYE=3]="EYE",e[e.REPRODUCTOR=4]="REPRODUCTOR",e[e.FERMENTER=5]="FERMENTER",e[e.MOUTH=6]="MOUTH",e[e.ARMOUR=7]="ARMOUR",e[e.FIN=8]="FIN",e[e.SPINE=9]="SPINE"}(u=t.Organ||(t.Organ={})),t.createPrimitiveProgram=function(e){const t=[a.Command.SENSE,55,3,a.Command.ACTION,16,0,a.Command.GOTO,0,4,a.Command.ACTION,64,0,a.Command.SENSE,2,6,a.Command.GOTO,0,0,a.Command.ACTION,128,0];for(let r=t.length/3;r<e;r++)t.push(a.Command.NOTHING,0,0);return new Uint8Array(t)};const h=[u.NONE,u.CHLOROPLAST,u.OXIDIZER,u.REPRODUCTOR,u.EYE,u.FERMENTER],g=[u.NONE,u.MOUTH,u.ARMOUR,u.FIN,u.SPINE];class c extends n.AbstractCell{constructor(e,t,r,s,n,i,o,a=0){super(),this.id=e,this.organs=t,this.color=r,this.program=s,this.energy=n,this.direction=i,this.supplyColor=o,this.lifetime=a,this.programCounter=0,this.oxidizersCount=0,this.chloroplastsCount=0,this.mouthsCount=0,this.fermentersCount=0,this.instructionsCount=s.length/3;for(const e of t)switch(e){case u.CHLOROPLAST:this.chloroplastsCount++;break;case u.OXIDIZER:this.oxidizersCount++;break;case u.FERMENTER:this.fermentersCount++;break;case u.MOUTH:this.mouthsCount++}}getId(){return this.id}getType(){return n.CellType.ORGANISM}getLifetime(){return this.lifetime}getEnergy(){return this.energy}getDirection(){return this.direction}update(e){this.energy>0&&(e.getInterpreter().execute(this,e),this.changeEnergy(-e.getSimulationParameters().stepCost)),0!==this.energy?this.lifetime>=e.getSimulationParameters().organismMaxLifetime?e.replace(e.getCellFactory().createOrganic(this.energy)):this.lifetime++:e.replace(e.getCellFactory().createEmpty())}setDirection(e){this.direction=e}divide(e){if(0===this.energy)return;const t=e.getCellFactory(),r=e.getSimulationParameters(),n=e.getInterpreter();let u=null;for(const t of(0,o.shuffle)(i.directionsList))if(e.getByDirection(t).isEmpty()){u=t;break}if(null===u)return void e.replace(t.createOrganic(this.energy));this.changeEnergy(Math.floor(this.energy/-2));let c=!1,m=this.color,d=this.organs,p=this.program;const O=(0,l.randomInt)(1,100);if(r.mutationBaseOrgansRate>=O&&(c=!0,d=d.slice(),d[(0,l.randomInt)(0,7)]=h[(0,l.randomInt)(0,h.length-1)]),r.mutationLimbOrgansRate>=O&&(c=!0,d=d.slice(),d[(0,l.randomInt)(8,15)]=g[(0,l.randomInt)(0,g.length-1)]),r.mutationProgramRate>=O){c=!0,p=new Uint8Array(p);const e=3*(0,l.randomInt)(0,this.instructionsCount-1),t=e+1,r=e+2;let s=n.getHandler(p[e]);switch((0,l.randomInt)(0,2)){case 0:p[e]=(0,l.randomInt)(0,n.getHandlersCount()-1),s=n.getHandler(p[e]),s.hasArgument()?0===p[t]&&(p[t]=(0,l.randomInt)(0,a.MAX_ARG_VALUE)):p[t]=0,s.hasGoto()?0===p[r]&&(p[r]=(0,l.randomInt)(0,this.instructionsCount-1)):p[r]=0;break;case 1:s.hasArgument()&&(p[t]=(0,l.randomInt)(0,a.MAX_ARG_VALUE));break;case 2:s.hasGoto()&&(p[r]=(0,l.randomInt)(0,this.instructionsCount-1))}}c&&(m=new s.Color(this.color.getRed()+(Math.random()>.5?1:-1)*(0,l.randomInt)(0,5),this.color.getGreen()+(Math.random()>.5?1:-1)*(0,l.randomInt)(0,5),this.color.getBlue()+(Math.random()>.5?1:-1)*(0,l.randomInt)(0,5))),e.replaceByDirection(u,t.createOrganism(d,m,p,this.energy,(0,i.randomDirection)(),this.supplyColor))}changeEnergy(e){const r=this.energy;return this.energy+=Math.round(e),this.energy>t.MAX_ENERGY?this.energy=t.MAX_ENERGY:this.energy<0&&(this.energy=0),this.energy-r}isStatic(){return!1}getColor(){return this.color}getProgramCounter(){return this.programCounter}setProgramCounter(e){this.instructionsCount>e?this.programCounter=e:this.programCounter=0}addProgramCounterRelative(e){this.setProgramCounter(this.programCounter+e)}getSupplyColor(){return this.supplyColor}getOrgan(e){return this.organs[e]}getChloroplastsCount(){return this.chloroplastsCount}getOxidizersCount(){return this.oxidizersCount}getMouthsCount(){return this.mouthsCount}getFermentersCount(){return this.fermentersCount}makeMoreRed(e){this.supplyColor=new s.Color(this.supplyColor.getRed()+e,this.supplyColor.getGreen()-e,this.supplyColor.getBlue()-e)}makeMoreGreen(e){this.supplyColor=new s.Color(this.supplyColor.getRed()-e,this.supplyColor.getGreen()+e,this.supplyColor.getBlue()-e)}makeMoreBlue(e){this.supplyColor=new s.Color(this.supplyColor.getRed()-e,this.supplyColor.getGreen()-e,this.supplyColor.getBlue()+e)}getOrgans(){return this.organs}getProgram(){return this.program}getCommand(){return this.program[3*this.programCounter]}getArgument(){return this.program[3*this.programCounter+1]}getGoto(){return this.program[3*this.programCounter+2]}isSimilar(e){let t=0;const r=e.getOrgans();for(let e=0;e<16;e++)if(this.organs[e]!==r[e]&&t++,t>1)return!1;const s=e.getProgram(),n=this.program;if(s.length!==n.length)return!1;for(let e=0;e<s.length;e++){if(t>1)return!1;s[e]!==n[e]&&t++}return t<=1}serialize(){const e=[];for(const t of this.program)e.push(t);return{id:this.id,type:n.CellType.ORGANISM,lifetime:this.lifetime,energy:this.energy,direction:this.direction,genome:{organs:this.organs,color:this.color.toHexFormat(),program:e,version:t.GENOME_VERSION},programCounter:this.programCounter,supplyColor:this.supplyColor.toHexFormat()}}}t.OrganismCell=c},138:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AbstractInstruction=t.getParameter=t.getOrganIndex=void 0;const s=r(730);t.getOrganIndex=e=>Math.trunc(e/s.ORGANS_COUNT),t.getParameter=e=>e-(0,t.getOrganIndex)(e)*s.ORGANS_COUNT,t.AbstractInstruction=class{}},503:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AbstractOrgan=void 0,t.AbstractOrgan=class{onAttack(e,t,r,s){return e.changeEnergy(-t)}}},890:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.reverseDirection=t.rotateOnOffset=t.rotateRight=t.rotateLeft=t.randomDirection=t.directionsList=t.Direction=void 0;const s=r(629);var n;function i(e,t){let r=e+t;return r<0&&(r-=8*Math.floor(r/8)),r%8}!function(e){e[e.NORTH=0]="NORTH",e[e.NORTH_EAST=1]="NORTH_EAST",e[e.EAST=2]="EAST",e[e.SOUTH_EAST=3]="SOUTH_EAST",e[e.SOUTH=4]="SOUTH",e[e.SOUTH_WEST=5]="SOUTH_WEST",e[e.WEST=6]="WEST",e[e.NORTH_WEST=7]="NORTH_WEST"}(n=t.Direction||(t.Direction={})),t.directionsList=[n.NORTH,n.NORTH_EAST,n.EAST,n.SOUTH_EAST,n.SOUTH,n.SOUTH_WEST,n.WEST,n.NORTH_WEST],t.randomDirection=function(){return(0,s.randomInt)(0,7)},t.rotateLeft=function(e){return e===n.NORTH?n.NORTH_WEST:e-1},t.rotateRight=function(e){return e===n.NORTH_WEST?n.NORTH:e+1},t.rotateOnOffset=i,t.reverseDirection=function(e){return i(e,4)}},458:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ActionInstruction=t.PARAMETER_FACTOR=void 0;const s=r(730),n=r(138);t.PARAMETER_FACTOR=17;class i extends n.AbstractInstruction{execute(e,t,r){const n=Math.trunc(r/s.ORGANS_COUNT),i=r-n*s.ORGANS_COUNT,o=t.getOrganPool().getOrgan(e.getOrgan(n));if(!o)return e.addProgramCounterRelative(1),!1;const a=o.use(e,i,t,n);return e.addProgramCounterRelative(1),a}hasArgument(){return!0}hasGoto(){return!1}}t.ActionInstruction=i},754:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GotoInstruction=void 0;const s=r(138);class n extends s.AbstractInstruction{execute(e,t,r,s){return e.setProgramCounter(s),!1}hasArgument(){return!1}hasGoto(){return!0}}t.GotoInstruction=n},496:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.NothingInstruction=void 0;const s=r(138);class n extends s.AbstractInstruction{execute(e){return e.addProgramCounterRelative(1),!1}hasArgument(){return!1}hasGoto(){return!1}}t.NothingInstruction=n},987:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SenseInstruction=t.PARAMETER_FACTOR=void 0;const s=r(730),n=r(138);t.PARAMETER_FACTOR=17;class i extends n.AbstractInstruction{execute(e,t,r,n){const i=Math.trunc(r/s.ORGANS_COUNT),o=r-i*s.ORGANS_COUNT,a=t.getOrganPool().getOrgan(e.getOrgan(i));return a?(a.sense(e,o,t,i)?e.setProgramCounter(n):e.addProgramCounterRelative(1),!1):(e.addProgramCounterRelative(1),!1)}hasArgument(){return!0}hasGoto(){return!0}}t.SenseInstruction=i},69:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Interpreter=t.MAX_ARG_VALUE=t.Command=void 0;const s=r(458),n=r(987),i=r(754),o=r(496);var a;!function(e){e[e.NOTHING=0]="NOTHING",e[e.GOTO=1]="GOTO",e[e.SENSE=2]="SENSE",e[e.ACTION=3]="ACTION"}(a=t.Command||(t.Command={})),t.MAX_ARG_VALUE=255;const l={[a.NOTHING]:new o.NothingInstruction,[a.GOTO]:new i.GotoInstruction,[a.SENSE]:new n.SenseInstruction,[a.ACTION]:new s.ActionInstruction},u=Object.keys(l).length;t.Interpreter=class{execute(e,t){for(let r=0;r<16&&!l[e.getCommand()].execute(e,t,e.getArgument(),e.getGoto());r++);}getHandlersCount(){return u}getHandler(e){return l[e]}}},332:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.OrganPool=void 0;const s=r(730),n=r(616),i=r(297),o=r(993),a=r(197),l=r(871),u=r(7),h=r(481),g=r(560),c=r(132);t.OrganPool=class{constructor(){this.armour=new n.Armour,this.chloroplast=new i.Chloroplast,this.eye=new o.Eye,this.fermeneter=new a.Fermenter,this.fin=new l.Fin,this.mouth=new u.Mouth,this.oxidizer=new h.Oxidizer,this.reproductor=new g.Reproductor,this.spine=new c.Spine}getArmour(){return this.armour}getChloroplast(){return this.chloroplast}getEye(){return this.eye}getFermenter(){return this.fermeneter}getFin(){return this.fin}getMouth(){return this.mouth}getOxidizer(){return this.oxidizer}getReproductor(){return this.reproductor}getSpine(){return this.spine}getOrgan(e){switch(e){case s.Organ.ARMOUR:return this.getArmour();case s.Organ.CHLOROPLAST:return this.getChloroplast();case s.Organ.EYE:return this.getEye();case s.Organ.FERMENTER:return this.getFermenter();case s.Organ.FIN:return this.getFin();case s.Organ.MOUTH:return this.getMouth();case s.Organ.NONE:return null;case s.Organ.OXIDIZER:return this.getOxidizer();case s.Organ.REPRODUCTOR:return this.getReproductor();case s.Organ.SPINE:return this.getSpine()}}}},616:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Armour=void 0;const s=r(503);class n extends s.AbstractOrgan{onAttack(e,t,r,s){return e.changeEnergy(-t*s.getSimulationParameters().armourProtectionRate)}use(){return!1}sense(){return!1}}t.Armour=n},297:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Chloroplast=void 0;const s=r(503);class n extends s.AbstractOrgan{use(e,t,r){const s=e.getChloroplastsCount();let n=0;for(let e=1;e<=s;e++)n+=r.getLightEnergy()/e;return e.changeEnergy(n),n>0&&e.makeMoreGreen(n),!0}sense(){return!1}}t.Chloroplast=n},993:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Eye=t.getTargetFromParameter=t.TargetType=void 0;const s=r(816),n=r(347),i=r(730),o=r(59),a=r(503),l=r(890);var u;!function(e){e[e.EMPTY=0]="EMPTY",e[e.WALL=1]="WALL",e[e.ORGANIC=2]="ORGANIC",e[e.ORGANISM_SIMILAR=3]="ORGANISM_SIMILAR",e[e.ORGANISM_OTHER=4]="ORGANISM_OTHER"}(u=t.TargetType||(t.TargetType={}));const h=Object.keys(u).length/2+1;t.getTargetFromParameter=e=>e%h;class g extends a.AbstractOrgan{use(){return!1}sense(e,t,r,s){const n=r.getByDirection((0,l.rotateOnOffset)(e.getDirection(),s));return this.getTargetType(e,n)===t%h}getTargetType(e,t){return t instanceof o.WallCell?u.WALL:t instanceof n.OrganicCell?u.ORGANIC:t instanceof s.EmptyCell?u.EMPTY:t instanceof i.OrganismCell?e.isSimilar(t)?u.ORGANISM_SIMILAR:u.ORGANISM_OTHER:void 0}}t.Eye=g},197:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Fermenter=t.getEnergyFromParameter=void 0;const s=r(503),n=r(987);t.getEnergyFromParameter=e=>e*n.PARAMETER_FACTOR;class i extends s.AbstractOrgan{use(){return!1}sense(e,t){return e.getEnergy()>=t*n.PARAMETER_FACTOR}}t.Fermenter=i},871:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Fin=t.MovementType=t.getMovementTypeFromParameter=void 0;const s=r(503),n=r(890);var i;t.getMovementTypeFromParameter=e=>e%3,function(e){e[e.ROTATE_LEFT=0]="ROTATE_LEFT",e[e.ROTATE_RIGHT=1]="ROTATE_RIGHT",e[e.MOVE_FORWARD=2]="MOVE_FORWARD"}(i=t.MovementType||(t.MovementType={}));class o extends s.AbstractOrgan{use(e,t,r){switch(t%3){case i.ROTATE_LEFT:return e.setDirection((0,n.rotateLeft)(e.getDirection())),!1;case i.ROTATE_RIGHT:return e.setDirection((0,n.rotateRight)(e.getDirection())),!1;case i.MOVE_FORWARD:return r.moveByDirection(e.getDirection())}return!1}sense(){return!1}}t.Fin=o},7:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Mouth=t.getPowerFromParameter=void 0;const s=r(347),n=r(730),i=r(503),o=r(890),a=r(458);t.getPowerFromParameter=e=>e*a.PARAMETER_FACTOR;class l extends i.AbstractOrgan{sense(){return!1}use(e,t,r,i){const l=64*(e.getMouthsCount()-1),u=r.getSimulationParameters().eatCost;e.changeEnergy(-u-l);const h=(0,o.rotateOnOffset)(e.getDirection(),i),g=r.getByDirection(h);if(g instanceof s.OrganicCell){const t=g.getEnergy();return e.changeEnergy(t),r.deleteByDirection(h),t>0&&e.makeMoreRed(t),!0}if(g instanceof n.OrganismCell){const s=t*a.PARAMETER_FACTOR,n=s*(r.getSimulationParameters().attackCostRate/100);let i=0;if(g.getEnergy()>0){const t=8+(0,o.rotateOnOffset)(g.getDirection(),(0,o.reverseDirection)(h)),n=r.getOrganPool().getOrgan(g.getOrgan(t));i=null===n?-g.changeEnergy(-s):-n.onAttack(g,s,e,r)}let l=0;for(let t=1,r=1;t<=e.getFermentersCount();t++)l+=r/=2;return e.changeEnergy(i*l-n),0===g.getEnergy()&&r.deleteByDirection(h),i>0&&e.makeMoreRed(i),!0}return!1}}t.Mouth=l},481:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Oxidizer=void 0;const s=r(503);class n extends s.AbstractOrgan{use(e,t,r){const s=e.getOxidizersCount();let n=0;for(let e=1;e<=s;e++)n+=r.getMineralsEnergy()/e;return e.changeEnergy(n),n>0&&e.makeMoreBlue(n),!0}sense(){return!1}}t.Oxidizer=n},560:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Reproductor=void 0;const s=r(503);class n extends s.AbstractOrgan{use(e,t,r){return e.changeEnergy(-r.getSimulationParameters().divideCost),e.divide(r),!0}sense(){return!1}}t.Reproductor=n},132:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Spine=void 0;const s=r(503);class n extends s.AbstractOrgan{onAttack(e,t,r,s){return r.changeEnergy(-t*s.getSimulationParameters().spineDamageRate),e.changeEnergy(-t)}use(){return!1}sense(){return!1}}t.Spine=n},59:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.WallCell=void 0;const s=r(40);class n extends s.AbstractCell{update(){}getType(){return s.CellType.WALL}serialize(){return{type:s.CellType.WALL}}}t.WallCell=n},170:function(e,t,r){var s=this&&this.__awaiter||function(e,t,r,s){return new(r||(r=Promise))((function(n,i){function o(e){try{l(s.next(e))}catch(e){i(e)}}function a(e){try{l(s.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?n(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,a)}l((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.CommonSimulation=void 0;const n=r(766),i=r(469),o=r(591),a=r(240),l=r(730),u=r(890),h=r(69),g=r(332),c=r(158),m=r(928),d=r(567),p=r(56),O=r(841);class y extends d.Simulation{constructor(e,t){if(!e&&t&&(e=t.options),super(e),this.step=0,this.cellFactory=new a.CellFactory(this.options.programLength),this.interpreter=new h.Interpreter,this.organPool=new g.OrganPool,this.parameters=new p.SimulationParameters,this.grid=new m.Grid(this.options,this.cellFactory),this.initResources(e),t){this.step=t.step,this.parameters=new p.SimulationParameters(t.parameters);for(let r=0;r<e.width;r++)for(let s=0;s<e.height;s++)this.grid.insert(r,s,this.cellFactory.deserialize(t.grid[r][s]))}else{const t=Math.ceil(e.width*e.height*e.population/100);this.spawnOrganisms(t,e.initialEnergy,e.programLength)}}static createFromDump(e){return new y(null,e)}static create(e){return new y(e)}makeStep(){return s(this,void 0,void 0,(function*(){const e=this.grid.toArray(),t=new o.CellContext(this.grid,0,0,this.cellFactory,this.interpreter,this.organPool,this.parameters);for(let r=0;r<e.length;r++)for(let s=0;s<e[r].length;s++){const n=e[r][s];n.isStatic()||(t.setX(r),t.setY(s),n.update(t))}return this.step++}))}getState(e){return s(this,void 0,void 0,(function*(){const t=c.Data.create(this.grid,e);return{step:this.step,buffer:t.getArray().buffer,payload:e}}))}setParameter(e,t){return s(this,void 0,void 0,(function*(){return this.parameters[e]=t,this.parameters[e]}))}getOrganismsCount(){return s(this,void 0,void 0,(function*(){let e=0;for(let t=0;t<this.grid.getWidth();t++)for(let r=0;r<this.grid.getHeight();r++)this.grid.getCell(t,r).getType()===O.CellType.ORGANISM&&e++;return e}))}findCellById(e){return s(this,void 0,void 0,(function*(){const t=this.grid.find(e);return t?t.serialize():null}))}getCell(e,t){return s(this,void 0,void 0,(function*(){return this.grid.getCell(e,t).serialize()}))}replace(e,t,r,n){return s(this,void 0,void 0,(function*(){for(const[s,i]of e){const e=this.grid.getCell(s,i);r.includes(e.getType())||this.grid.insert(s,i,this.cellFactory.create(t,n))}}))}dump(){return s(this,void 0,void 0,(function*(){return{options:this.options,parameters:this.parameters.serialize(),step:this.step,grid:this.grid.serialize(),version:d.DUMP_VERSION}}))}getParameters(){return s(this,void 0,void 0,(function*(){return this.parameters.serialize()}))}spawnOrganisms(e,t,r){const s=[],o=this.grid.toArray();for(let e=0;e<o.length;e++)for(let t=0;t<o[e].length;t++)o[e][t].isEmpty()&&s.push([e,t]);for(const[o,h]of(0,n.shuffle)(s).slice(0,e))this.grid.insert(o,h,this.cellFactory.createOrganism(a.PRIMITIVE_ORGANS,i.Color.random(),(0,l.createPrimitiveProgram)(r),t,(0,u.randomDirection)(),new i.Color(0,255,0)))}initResources(e){const t=Math.round(e.height*e.lightDepth/100),r=Math.round(e.height*e.mineralsDepth/100),s=e.height-r;for(let n=0;n<e.width;n++)for(let i=0;i<e.height;i++){let o=100,a=100;i>=t?o=0:e.lightGradient&&(o=100-Math.round(100*i/t)),i<s?a=0:e.lightGradient&&(a=Math.ceil(100*(i-s)/r)),this.grid.setLightLevel(n,i,o),this.grid.setMineralsLevel(n,i,a)}}}t.CommonSimulation=y},158:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Data=void 0;const s=r(730),n=r(841),i={energy:1,lifetime:1,genesis:3,supply:3};class o{constructor(e,t,r,s){this.array=e,this.payload=t,this.width=r,this.height=s,this.organismDataLength=this.payload?i[this.payload]+1:1}static create(e,t){const r=e.getWidth(),n=e.getHeight(),i=[];for(let o=0;o<r;o++)for(let r=0;r<n;r++){const n=e.getCell(o,r);if(i.push(n.getType()),n instanceof s.OrganismCell)switch(t){case"energy":i.push(n.getEnergy());break;case"lifetime":i.push(n.getLifetime());break;case"genesis":i.push(n.getColor().getRed()),i.push(n.getColor().getGreen()),i.push(n.getColor().getBlue());break;case"supply":i.push(n.getSupplyColor().getRed()),i.push(n.getSupplyColor().getGreen()),i.push(n.getSupplyColor().getBlue())}}return new o(new Uint8Array(i),t,r,n)}getArray(){return this.array}getPayload(){return this.payload}getWidth(){return this.width}getHeight(){return this.height}getItemLength(e){switch(e){case n.CellType.EMPTY:return 1;case n.CellType.ORGANISM:return this.organismDataLength;case n.CellType.ORGANIC:case n.CellType.WALL:return 1}throw new Error}}t.Data=o},928:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Grid=void 0;const s=r(904),n=r(282);t.Grid=class{constructor(e,t){this.options=e,this.cellFactory=t,this.cells=[],this.cellIdMap={},this.minerals=[],this.light=[],(0,s.assertGreaterThan)(e.width,0),(0,s.assertGreaterThan)(e.height,0);for(let r=0;r<e.width;r++){this.cells[r]=[],this.minerals[r]=[],this.light[r]=[];for(let s=0;s<e.height;s++)this.cells[r][s]=t.createEmpty(),this.minerals[r][s]=100,this.light[r][s]=100}}getLightLevel(e,t){return this.light[e][t]}getMineralsLevel(e,t){return this.minerals[e][t]}setLightLevel(e,t,r){this.light[e][t]=r}setMineralsLevel(e,t,r){this.minerals[e][t]=r}insert(e,t,r){const s=this.normalizeCoordinates(e,t);this.checkOutOfBounds(s[0],s[1])||(this.cells[s[0]][s[1]]=r,r.getId()&&(this.cellIdMap[r.getId()]=r))}delete(e,t){const r=this.normalizeCoordinates(e,t);if(this.checkOutOfBounds(r[0],r[1]))return;const s=this.cells[r[0]][r[1]];this.cells[r[0]][r[1]]=this.cellFactory.createEmpty(),delete this.cellIdMap[s.getId()]}getCell(e,t){const r=this.normalizeCoordinates(e,t);return this.checkOutOfBounds(r[0],r[1])?this.cellFactory.createWall():this.cells[r[0]][r[1]]}find(e){return this.cellIdMap[e]}getLoopMode(){return this.options.loop}getWidth(){return this.options.width}getHeight(){return this.options.height}toArray(){return this.cells.map((e=>e.slice()))}serialize(){return this.toArray().map((e=>e.map((e=>e.serialize()))))}normalizeCoordinates(e,t){const r=this.options.loop===n.GridLoopType.TORUS||this.options.loop===n.GridLoopType.HORIZONTAL,s=this.options.loop===n.GridLoopType.TORUS||this.options.loop===n.GridLoopType.VERTICAL;let i=e,o=t;if(r){for(;i<0;)i+=this.options.width;i>=this.options.width&&(i%=this.options.width)}if(s){for(;o<0;)o+=this.options.height;o>=this.options.height&&(o%=this.options.height)}return[i,o]}checkOutOfBounds(e,t){return e<0||e>=this.options.width||t<0||t>=this.options.height}}},56:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SimulationParameters=void 0,t.SimulationParameters=class{constructor(e={}){this.organismMaxLifetimeValue=255,this.photosynthesisEnergyValue=5,this.chemosynthesisEnergyValue=5,this.mutationProgramRateValue=25,this.mutationBaseOrgansRateValue=10,this.mutationLimbOrgansRateValue=0,this.eatCostValue=0,this.attackCostRateValue=5,this.armourProtectionRateValue=50,this.spineDamageRateValue=50,this.divideCostValue=20,this.stepCostValue=1,null!=e.photosynthesisEnergy&&(this.photosynthesisEnergy=e.photosynthesisEnergy),null!=e.chemosynthesisEnergy&&(this.chemosynthesisEnergy=e.chemosynthesisEnergy),null!=e.organismMaxLifetime&&(this.organismMaxLifetime=e.organismMaxLifetime),null!=e.mutationProgramRate&&(this.mutationProgramRate=e.mutationProgramRate),null!=e.mutationBaseOrgansRate&&(this.mutationBaseOrgansRate=e.mutationBaseOrgansRate),null!=e.mutationLimbOrgansRate&&(this.mutationLimbOrgansRate=e.mutationLimbOrgansRate),null!=e.eatCost&&(this.eatCost=e.eatCost),null!=e.attackCostRate&&(this.attackCostRate=e.attackCostRate),null!=e.armourProtectionRate&&(this.armourProtectionRate=e.armourProtectionRate),null!=e.spineDamageRate&&(this.spineDamageRate=e.spineDamageRate),null!=e.divideCost&&(this.divideCost=e.divideCost),null!=e.stepCost&&(this.stepCost=e.stepCost)}set organismMaxLifetime(e){this.organismMaxLifetimeValue=this.converNumberValue(e,!0,1,255)}get organismMaxLifetime(){return this.organismMaxLifetimeValue}set photosynthesisEnergy(e){this.photosynthesisEnergyValue=this.converNumberValue(e,!1,0,255)}get photosynthesisEnergy(){return this.photosynthesisEnergyValue}set chemosynthesisEnergy(e){this.chemosynthesisEnergyValue=this.converNumberValue(e,!1,0,255)}get chemosynthesisEnergy(){return this.chemosynthesisEnergyValue}set mutationProgramRate(e){this.mutationProgramRateValue=this.converNumberValue(e,!1,0,100)}get mutationProgramRate(){return this.mutationProgramRateValue}set mutationBaseOrgansRate(e){this.mutationBaseOrgansRateValue=this.converNumberValue(e,!1,0,100)}get mutationBaseOrgansRate(){return this.mutationBaseOrgansRateValue}set mutationLimbOrgansRate(e){this.mutationLimbOrgansRateValue=this.converNumberValue(e,!1,0,100)}get mutationLimbOrgansRate(){return this.mutationLimbOrgansRateValue}get eatCost(){return this.eatCostValue}set eatCost(e){this.eatCostValue=this.converNumberValue(e,!1,0,255)}set attackCostRate(e){this.attackCostRateValue=this.converNumberValue(e,!1,0,100)}get attackCostRate(){return this.attackCostRateValue}set divideCost(e){this.divideCostValue=this.converNumberValue(e,!1,0,255)}get divideCost(){return this.divideCostValue}set spineDamageRate(e){this.spineDamageRateValue=this.converNumberValue(e,!1,0,100)}get spineDamageRate(){return this.spineDamageRateValue}set armourProtectionRate(e){this.armourProtectionRateValue=this.converNumberValue(e,!1,0,100)}get armourProtectionRate(){return this.armourProtectionRateValue}set stepCost(e){this.stepCostValue=this.converNumberValue(e,!1,0,255)}get stepCost(){return this.stepCostValue}serialize(){return{photosynthesisEnergy:this.photosynthesisEnergy,chemosynthesisEnergy:this.chemosynthesisEnergy,organismMaxLifetime:this.organismMaxLifetime,mutationProgramRate:this.mutationProgramRate,mutationBaseOrgansRate:this.mutationBaseOrgansRate,mutationLimbOrgansRate:this.mutationLimbOrgansRate,eatCost:this.eatCost,attackCostRate:this.attackCostRate,divideCost:this.divideCost,spineDamageRate:this.spineDamageRate,armourProtectionRate:this.armourProtectionRate,stepCost:this.stepCost}}converNumberValue(e,t=!0,r=null,s=null){return t&&(e=Math.trunc(e)),null==r&&(e=Math.max(r,e)),null==s&&(e=Math.min(s,e)),e}}},567:(e,t)=>{var r;Object.defineProperty(t,"__esModule",{value:!0}),t.Simulation=t.DUMP_VERSION=t.Parameter=t.StepData=void 0,t.StepData=class{constructor(e,t,r){this.step=e,this.buffer=t,this.payload=r}},(r=t.Parameter||(t.Parameter={})).photosynthesisEnergy="photosynthesisEnergy",r.chemosynthesisEnergy="chemosynthesisEnergy",r.organismMaxLifetime="organismMaxLifetime",r.mutationProgramRate="mutationProgramRate",r.mutationBaseOrgansRate="mutationBaseOrgansRate",r.mutationLimbOrgansRate="mutationLimbOrgansRate",r.eatCost="eatCost",r.attackCostRate="attackCostRate",r.divideCost="divideCost",r.spineDamageRate="spineDamageRate",r.armourProtectionRate="armourProtectionRate",r.stepCost="stepCost",t.DUMP_VERSION=2,t.Simulation=class{constructor(e){this.options=e}terminate(){}getOptions(){return this.options}}},841:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GENOME_VERSION=t.Command=t.Direction=t.Organ=t.CellType=void 0;const s=r(730);Object.defineProperty(t,"Organ",{enumerable:!0,get:function(){return s.Organ}}),Object.defineProperty(t,"GENOME_VERSION",{enumerable:!0,get:function(){return s.GENOME_VERSION}});const n=r(890);Object.defineProperty(t,"Direction",{enumerable:!0,get:function(){return n.Direction}});const i=r(69);Object.defineProperty(t,"Command",{enumerable:!0,get:function(){return i.Command}});const o=r(40);Object.defineProperty(t,"CellType",{enumerable:!0,get:function(){return o.CellType}})},282:(e,t)=>{var r;Object.defineProperty(t,"__esModule",{value:!0}),t.GridLoopType=void 0,(r=t.GridLoopType||(t.GridLoopType={})).NONE="NONE",r.TORUS="TORUS",r.VERTICAL="VERTICAL",r.HORIZONTAL="HORIZONTAL"}},t={};function r(s){var n=t[s];if(void 0!==n)return n.exports;var i=t[s]={exports:{}};return e[s].call(i.exports,i,i.exports,r),i.exports}(()=>{const e=r(170),t=self;let s;t.addEventListener("message",(r=>{const n=r.data;switch(n.type){case"init":if(s)return;return s=n.dump?e.CommonSimulation.createFromDump(n.dump):e.CommonSimulation.create(n.options),void t.postMessage({type:"init"});case"makeStep":return void s.makeStep().then((e=>{t.postMessage({type:"makeStep",step:e,id:n.id})}));case"requestState":return void s.getState(n.payload).then((e=>{t.postMessage({id:n.id,type:"state",step:e.step,buffer:e.buffer,payload:e.payload},[e.buffer])}));case"setParameter":return void s.setParameter(n.parameter,n.value).then((e=>{t.postMessage({id:n.id,type:"setParameter",value:e})}));case"getOrganismsCount":return void s.getOrganismsCount().then((e=>{t.postMessage({id:n.id,type:"getOrganismsCount",count:e})}));case"getCell":return void s.getCell(n.x,n.y).then((e=>{t.postMessage({id:n.id,type:"getCell",cell:e})}));case"findCellById":return void s.findCellById(n.cellId).then((e=>{t.postMessage({id:n.id,type:"findCellById",cell:e})}));case"replace":return void s.replace(n.coords,n.cellType,n.ignore,n.options).then((()=>{t.postMessage({id:n.id,type:"replace"})}));case"dump":return void s.dump().then((e=>{t.postMessage({id:n.id,type:"dump",dump:e})}));case"getParameters":return void s.getParameters().then((e=>{t.postMessage({id:n.id,type:"getParameters",parameters:e})}))}}))})()})();