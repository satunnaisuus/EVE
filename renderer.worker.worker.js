(()=>{"use strict";var e={766:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.shuffle=void 0,t.shuffle=function(e){const t=e;for(let e=t.length-1;e>0;e--){const r=Math.floor(Math.random()*(e+1));[t[e],t[r]]=[t[r],t[e]]}return t}},469:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Color=void 0;const n=r(629),o={};for(let e=0;e<256;e++)o[e]=e.toString(16),1===o[e].length&&(o[e]="0"+o[e]);class s{constructor(e,t,r){this.red=e,this.green=t,this.blue=r,e>255?this.red=255:e<0&&(this.red=0),t>255?this.green=255:t<0&&(this.green=0),r>255?this.blue=255:r<0&&(this.blue=0),this.hex="#"+o[this.red]+o[this.green]+o[this.blue]}getRed(){return this.red}getGreen(){return this.green}getBlue(){return this.blue}mix(e,t){return new s(Math.round(this.red*(1-t)+e.getRed()*t),Math.round(this.green*(1-t)+e.getGreen()*t),Math.round(this.blue*(1-t)+e.getBlue()*t))}toHexFormat(){return this.hex}equals(e){return this.blue===e.getBlue()&&this.red===e.getRed()&&this.green===e.getGreen()}toArray(){return[this.red,this.green,this.blue]}static random(){return new s((0,n.randomInt)(0,255),(0,n.randomInt)(0,255),(0,n.randomInt)(0,255))}static fromHex(e){return e.startsWith("#")&&(e=e.slice(1)),new s(parseInt(e.slice(0,2),16),parseInt(e.slice(2,4),16),parseInt(e.slice(4,6),16))}}t.Color=s},629:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.randomInt=void 0,t.randomInt=function(e,t){const r=t-e+1;return Math.floor(Math.random()*r)+e}},120:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Colors=void 0;const n=r(469);t.Colors={organic:n.Color.fromHex("#F0E9D2"),wall:n.Color.fromHex("#575757"),organism:n.Color.fromHex("#2155CD"),lifetimeMin:n.Color.fromHex("#000000"),lifetimeMax:n.Color.fromHex("#ffffff"),energyMin:n.Color.fromHex("#000000"),energyMax:n.Color.fromHex("#F8CB2E"),aggressionMin:n.Color.fromHex("#000000"),aggressionMax:n.Color.fromHex("#ff0000"),childrenMin:n.Color.fromHex("#000000"),childrenMax:n.Color.fromHex("#f542c8"),stepMin:n.Color.fromHex("#000000"),stepMax:n.Color.fromHex("#f57b42"),actions:[n.Color.fromHex("#ffffff"),n.Color.fromHex("#03fcc2"),n.Color.fromHex("#03cafc"),n.Color.fromHex("#aaf200"),n.Color.fromHex("#a705f7"),n.Color.fromHex("#ff0000"),n.Color.fromHex("#ff00f2"),n.Color.fromHex("#ffffff"),n.Color.fromHex("#00ff00"),n.Color.fromHex("#0000ff")],supplyOrganic:n.Color.fromHex("#ff0000"),supplyPhotosynthesis:n.Color.fromHex("#00ff00"),supplyChemosynthesis:n.Color.fromHex("#0000ff")}},415:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CommonRenderer=void 0;const n=r(469),o=r(841),s=r(120),i=(e,t)=>s.Colors.lifetimeMax.mix(s.Colors.lifetimeMin,e/t),a=(e,t,r)=>new n.Color(e,t,r);t.CommonRenderer=class{render(e,t,r,l,g,c,u,h){this.empty&&this.empty.width===t&&this.empty.height===r||this.createEmpty(t,r);const d=new ImageData(new Uint8ClampedArray(this.empty.data),t,r),m=(e,r,n)=>{const o=[];let s=c,i=c;e<0&&(s+=e,e=0),r<0&&(i+=r,r=0),e+c>=d.width&&(s=d.width-e),r+c>=d.height&&(i=d.height-r);for(let e=0;e<s;e++)o.push(n.getRed(),n.getGreen(),n.getBlue(),255);const a=4*e,l=4*t;for(let e=0;e<i;e++)d.data.set(o,l*(r+e)+a)},f=h.getArray();let p=0,C=0;if("lifetime"===u||"energy"===u)for(let e=0;e<h.getWidth();e++)for(let e=0;e<h.getHeight();e++)1===f[C]&&p<f[C+1]&&(p=f[C+1]),C+=h.getItemLength(f[C]);C=0;for(let e=0;e<h.getWidth();e++)for(let t=0;t<h.getHeight();t++){const r=l+e*c;if(r+c<0||r>=d.width){C+=h.getItemLength(f[C]);continue}const M=g+t*c;if(M+c<0||M>=d.height)C+=h.getItemLength(f[C]);else{switch(f[C]){case o.CellType.EMPTY:break;case o.CellType.ORGANISM:m(r,M,"energy"===u?(A=f[C+1],I=p,s.Colors.energyMin.mix(s.Colors.energyMax,A/I)):"lifetime"===u?i(f[C+1],p):"genesis"===u?(O=f[C+1],y=f[C+2],T=f[C+3],new n.Color(O,y,T)):"supply"===u?a(f[C+1],f[C+2],f[C+3]):s.Colors.organism);break;case o.CellType.ORGANIC:m(r,M,s.Colors.organic);break;case o.CellType.WALL:m(r,M,s.Colors.wall)}C+=h.getItemLength(f[C])}}var O,y,T,A,I;e(d)}createEmpty(e,t){this.empty=new ImageData(new Uint8ClampedArray(e*t*4).map(((e,t)=>t%4==3?255:0)),e,t)}}},40:(e,t)=>{var r;Object.defineProperty(t,"__esModule",{value:!0}),t.AbstractCell=t.CellType=void 0,(r=t.CellType||(t.CellType={}))[r.EMPTY=0]="EMPTY",r[r.ORGANISM=1]="ORGANISM",r[r.ORGANIC=2]="ORGANIC",r[r.WALL=3]="WALL",t.AbstractCell=class{isStatic(){return!0}isEmpty(){return!1}getId(){return 0}}},347:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.OrganicCell=void 0;const n=r(40);class o extends n.AbstractCell{constructor(e){super(),this.energy=e}update(){}getEnergy(){return this.energy}getType(){return n.CellType.ORGANIC}serialize(){return{type:n.CellType.ORGANIC,energy:this.energy}}}t.OrganicCell=o},730:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.OrganismCell=t.ORGANS_COUNT=t.MAX_ENERGY=void 0;const n=r(469),o=r(40),s=r(890),i=r(165),a=r(766),l=r(616),g=r(132),c=r(993),u=r(297),h=r(481),d=r(871),m=r(7);t.MAX_ENERGY=255,t.ORGANS_COUNT=16;class f extends o.AbstractCell{constructor(e,t,r,n,o){super(),this.id=e,this.genome=t,this.energy=r,this.direction=n,this.supplyColor=o,this.lifetime=0,this.programCounter=0,this.organs=[],this.oxidizersCount=0,this.chloroplastsCount=0;for(const[e,r]of t.getOrgans().entries())switch(r){case i.Organ.EYE:this.organs.push(new c.Eye(this,e));break;case i.Organ.CHLOROPLAST:this.organs.push(new u.Chloroplast(this,e)),this.chloroplastsCount++;break;case i.Organ.OXIDIZER:this.organs.push(new h.Oxidizer(this,e)),this.oxidizersCount++;break;case i.Organ.ARMOUR:this.organs.push(new l.Armour(this,e));break;case i.Organ.SPINE:this.organs.push(new g.Spine(this,e));break;case i.Organ.FIN:this.organs.push(new d.Fin(this,e));break;case i.Organ.MOUTH:this.organs.push(new m.Mouth(this,e))}}getId(){return this.id}getType(){return o.CellType.ORGANISM}getLifetime(){return this.lifetime}getEnergy(){return this.energy}getDirection(){return this.direction}getGenome(){return this.genome}update(e,t){0!==this.energy?this.lifetime>=t.organismMaxLifetime?e.replace((e=>e.createOrganic(this.energy))):(this.genome.getProgram().execute(this,e),this.changeEnergy(-1),this.lifetime++,this.energy>=this.genome.getDivideEnergyLimit()&&this.divide(e)):e.replace((e=>e.createEmpty()))}setDirection(e){this.direction=e}divide(e){for(const t of(0,a.shuffle)((0,s.directionsList)())){const r=(0,s.getOffset)(t);if(e.getByOffest(r[0],r[1]).isEmpty())return e.moveByOffest(r[0],r[1]),this.changeEnergy(Math.floor(this.energy/-2)),void(this.energy>0&&e.replace((t=>t.createOrganism(this.genome.clone(e.getSimulationParameters().mutationChance),this.energy,(0,s.randomDirection)(),this.supplyColor))))}e.replace((e=>e.createOrganic(this.energy)))}changeEnergy(e){const r=this.energy;return this.energy+=Math.round(e),this.energy>t.MAX_ENERGY?this.energy=t.MAX_ENERGY:this.energy<0&&(this.energy=0),this.energy-r}isStatic(){return!1}isSimilar(e){return this.genome.isSimilar(e.getGenome())}getColor(){return this.genome.getColor()}getProgramCounter(){return this.programCounter}setProgramCounter(e){this.genome.getProgramLength()>e?this.programCounter=e:this.programCounter=0}addProgramCounterRelative(e){this.setProgramCounter(this.programCounter+=e)}getSupplyColor(){return this.supplyColor}getOrgan(e){return this.organs[e]}getChloroplastsCount(){return this.chloroplastsCount}getOxidizersCount(){return this.oxidizersCount}onAttack(e,t,r){if(0===this.energy)return 0;const n=this.organs[8+(0,s.rotateOnOffset)(this.direction,r)];return null===n?this.changeEnergy(-e):n instanceof l.Armour?n.onAttack(e):n instanceof g.Spine?n.onAttack(e,t):0}makeMoreRed(){this.supplyColor=new n.Color(this.supplyColor.getRed()+10,this.supplyColor.getGreen()-5,this.supplyColor.getBlue()-5)}makeMoreGreen(){this.supplyColor=new n.Color(this.supplyColor.getRed()-5,this.supplyColor.getGreen()+10,this.supplyColor.getBlue()-5)}makeMoreBlue(){this.supplyColor=new n.Color(this.supplyColor.getRed()-5,this.supplyColor.getGreen()-5,this.supplyColor.getBlue()+10)}serialize(){return{id:this.id,type:o.CellType.ORGANISM,lifetime:this.lifetime,energy:this.energy,direction:this.direction,genome:this.genome.serialize(),programCounter:this.programCounter,supplyColor:this.supplyColor.toHexFormat()}}}t.OrganismCell=f},138:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AbstractInstruction=void 0,t.AbstractInstruction=class{}},503:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AbstractOrgan=void 0,t.AbstractOrgan=class{constructor(e,t){this.organism=e,this.position=t}}},890:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.reverseDirection=t.rotateOnOffset=t.rotateRight=t.rotateLeft=t.randomDirection=t.getOffset=t.directionsList=t.Direction=void 0;const n=r(629);var o;function s(e,t){let r=e+t;return r<0&&(r-=8*Math.floor(r/8)),r%8}!function(e){e[e.NORTH=0]="NORTH",e[e.NORTH_EAST=1]="NORTH_EAST",e[e.EAST=2]="EAST",e[e.SOUTH_EAST=3]="SOUTH_EAST",e[e.SOUTH=4]="SOUTH",e[e.SOUTH_WEST=5]="SOUTH_WEST",e[e.WEST=6]="WEST",e[e.NORTH_WEST=7]="NORTH_WEST"}(o=t.Direction||(t.Direction={})),t.directionsList=function(){return[o.NORTH,o.NORTH_EAST,o.EAST,o.SOUTH_EAST,o.SOUTH,o.SOUTH_WEST,o.WEST,o.NORTH_WEST]},t.getOffset=function(e){switch(e){case o.NORTH:return[0,-1];case o.NORTH_EAST:return[1,-1];case o.NORTH_WEST:return[-1,-1];case o.SOUTH:return[0,1];case o.SOUTH_EAST:return[1,1];case o.SOUTH_WEST:return[-1,1];case o.EAST:return[1,0];case o.WEST:return[-1,0]}},t.randomDirection=function(){return(0,n.randomInt)(0,7)},t.rotateLeft=function(e){return e===o.NORTH?o.NORTH_WEST:e-1},t.rotateRight=function(e){return e===o.NORTH_WEST?o.NORTH:e+1},t.rotateOnOffset=s,t.reverseDirection=function(e){return s(e,4)}},165:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Genome=t.CURRENT_VERSION=t.Organ=void 0;const n=r(629),o=r(469),s=r(191);var i;!function(e){e[e.NONE=0]="NONE",e[e.CHLOROPLAST=1]="CHLOROPLAST",e[e.OXIDIZER=2]="OXIDIZER",e[e.EYE=3]="EYE",e[e.MOUTH=4]="MOUTH",e[e.ARMOUR=5]="ARMOUR",e[e.FIN=6]="FIN",e[e.SPINE=7]="SPINE"}(i=t.Organ||(t.Organ={}));const a=[i.CHLOROPLAST,null,null,null,null,null,null,null,i.MOUTH,null,null,null,null,null,null,null];t.CURRENT_VERSION=1;class l{constructor(e,t,r,n){this.program=e,this.color=t,this.divideLimit=r,this.organs=n}static createRandom(){return new l(s.Program.createPrimitive(16),o.Color.random(),(0,n.randomInt)(100,255),a)}isSimilar(e){const t=e.getOrgans();let r=0;for(let e=0;e<16;e++)this.organs[e]!==t[e]&&r++;return r<=1}getColor(){return this.color}getProgram(){return this.program}clone(e){if(e<=(0,n.randomInt)(0,100))return this;let t=this.divideLimit;255===t?t--:0===t||Math.random()>.5?t++:t--;const r=new o.Color(this.color.getRed()+(Math.random()>.5?1:-1)*(0,n.randomInt)(0,5),this.color.getGreen()+(Math.random()>.5?1:-1)*(0,n.randomInt)(0,5),this.color.getBlue()+(Math.random()>.5?1:-1)*(0,n.randomInt)(0,5)),s=this.program.clone(),i=s.get((0,n.randomInt)(0,s.getLength()-1)),a=this.organs.slice();let g=s.getHandler(i.code);switch((0,n.randomInt)(0,5)){case 0:if(i.code=(0,n.randomInt)(0,s.getHandlersCount()-1),g=s.getHandler(i.code),i.args.length>g.getArgsCount())i.args.splice(g.getArgsCount());else for(;i.args.length<g.getArgsCount();)i.args.push(Math.random());if(i.branches.length>g.getBranchesCount())i.branches.splice(g.getBranchesCount());else for(;i.branches.length<g.getBranchesCount();)i.branches.push((0,n.randomInt)(0,s.getLength()-1));break;case 1:i.args.length>0&&(i.args[(0,n.randomInt)(0,i.args.length-1)]=Math.random());break;case 2:i.branches.length>0&&(i.branches[(0,n.randomInt)(0,i.branches.length-1)]=(0,n.randomInt)(0,s.getLength()-1));break;case 3:a[(0,n.randomInt)(0,7)]=(0,n.randomInt)(1,3);break;case 4:a[(0,n.randomInt)(8,15)]=(0,n.randomInt)(4,7);break;case 5:a[(0,n.randomInt)(0,15)]=0}return new l(s,r,t,a)}getDivideEnergyLimit(){return this.divideLimit}getProgramLength(){return this.program.getLength()}getOrgans(){return this.organs}serialize(){return{color:this.color.toHexFormat(),program:this.program.serialize(),divideLimit:this.divideLimit,organs:this.organs,version:t.CURRENT_VERSION}}}t.Genome=l},458:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ActionInstruction=void 0;const n=r(730),o=r(138);class s extends o.AbstractInstruction{execute(e,t,r){const o=Math.floor(r[0]*n.ORGANS_COUNT),s=e.getOrgan(o);if(!s)return e.addProgramCounterRelative(1),!1;const i=s.use(r[1],t);return e.addProgramCounterRelative(1),i}getArgsCount(){return 2}getBranchesCount(){return 0}}t.ActionInstruction=s},475:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.IfInstruction=void 0;const n=r(730),o=r(138);class s extends o.AbstractInstruction{execute(e,t,r,o){const s=r[0]%n.ORGANS_COUNT,i=e.getOrgan(s);return i?(i.use(r[1],t)?e.setProgramCounter(o[0]):e.addProgramCounterRelative(1),!1):(e.addProgramCounterRelative(1),!1)}getArgsCount(){return 2}getBranchesCount(){return 1}}t.IfInstruction=s},537:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.JumpInstruction=void 0;const n=r(138);class o extends n.AbstractInstruction{execute(e,t,r,n){return e.setProgramCounter(n[0]),!1}getArgsCount(){return 0}getBranchesCount(){return 1}}t.JumpInstruction=o},496:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.NothingInstruction=void 0;const n=r(138);class o extends n.AbstractInstruction{execute(e){return e.addProgramCounterRelative(1),!1}getArgsCount(){return 0}getBranchesCount(){return 0}}t.NothingInstruction=o},616:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Armour=void 0;const n=r(503);class o extends n.AbstractOrgan{onAttack(e){return this.organism.changeEnergy(-.5*e)}use(){return!0}}t.Armour=o},297:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Chloroplast=void 0;const n=r(503);class o extends n.AbstractOrgan{use(e,t){const r=this.organism.getChloroplastsCount();return this.organism.changeEnergy(r*t.getLightEnergy())>0&&this.organism.makeMoreGreen(),!0}}t.Chloroplast=o},993:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Eye=void 0;const n=r(347),o=r(730),s=r(59),i=r(503),a=r(890);var l;!function(e){e[e.EMPTY=0]="EMPTY",e[e.WALL=1]="WALL",e[e.ORGANIC=2]="ORGANIC",e[e.ORGANISM_SIMILAR=3]="ORGANISM_SIMILAR",e[e.ORGANISM_OTHER=4]="ORGANISM_OTHER"}(l||(l={}));const g=Object.keys(l).length/2+1;class c extends i.AbstractOrgan{use(e,t){const r=(0,a.getOffset)((0,a.rotateOnOffset)(this.organism.getDirection(),this.position)),n=t.getByOffest(r[0],r[1]);return this.getTargetType(n)===Math.floor(e*g)}getTargetType(e){return e instanceof s.WallCell?l.WALL:e instanceof n.OrganicCell?l.ORGANIC:e instanceof o.OrganismCell?this.organism.isSimilar(e)?l.ORGANISM_SIMILAR:l.ORGANISM_OTHER:l.EMPTY}}t.Eye=c},871:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Fin=void 0;const n=r(503),o=r(890);class s extends n.AbstractOrgan{use(e,t){switch(Math.floor(3*e)){case 0:return this.organism.setDirection((0,o.rotateLeft)(this.organism.getDirection())),!1;case 1:return this.organism.setDirection((0,o.rotateRight)(this.organism.getDirection())),!1;case 2:return t.moveByOffest(...(0,o.getOffset)(this.organism.getDirection()))}return!1}}t.Fin=s},7:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Mouth=void 0;const n=r(347),o=r(730),s=r(503),i=r(890);class a extends s.AbstractOrgan{use(e,t){const r=(0,i.rotateOnOffset)(this.organism.getDirection(),this.position),s=(0,i.getOffset)(r),a=t.getByOffest(s[0],s[1]);if(a instanceof n.OrganicCell){const e=this.organism.changeEnergy(a.getEnergy());return t.deleteByOffset(s[0],s[1]),e>0&&this.organism.makeMoreRed(),!0}if(a instanceof o.OrganismCell){const e=a.onAttack(50,this.organism,(0,i.reverseDirection)(r));return this.organism.changeEnergy(e)>0&&this.organism.makeMoreRed(),!0}return!1}}t.Mouth=a},481:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Oxidizer=void 0;const n=r(503);class o extends n.AbstractOrgan{use(e,t){const r=this.organism.getOxidizersCount();return this.organism.changeEnergy(r*t.getMineralsEnergy())>0&&this.organism.makeMoreBlue(),!0}}t.Oxidizer=o},132:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Spine=void 0;const n=r(503);class o extends n.AbstractOrgan{onAttack(e,t){return t.changeEnergy(-20),this.organism.changeEnergy(-e)}use(){return!0}}t.Spine=o},191:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Program=t.Command=void 0;const n=r(458),o=r(475),s=r(537),i=r(496);var a;!function(e){e[e.NOTHING=0]="NOTHING",e[e.JUMP=1]="JUMP",e[e.IF=2]="IF",e[e.ACTION=3]="ACTION"}(a=t.Command||(t.Command={}));const l={[a.NOTHING]:new i.NothingInstruction,[a.JUMP]:new s.JumpInstruction,[a.IF]:new o.IfInstruction,[a.ACTION]:new n.ActionInstruction};class g{constructor(e){this.instructions=e}static createPrimitive(e){const t=[];for(let r=0;r<e;r++)t.push({code:a.ACTION,args:[0,0],branches:[]});return new g(t)}execute(e,t){for(let r=0;r<8;r++){const r=this.instructions[e.getProgramCounter()],n=l[r.code];if(void 0!==n){if(n.execute(e,t,r.args,r.branches))break}else e.addProgramCounterRelative(1)}}getInstructions(){return this.instructions.slice()}get(e){return this.instructions[e]}getLength(){return this.instructions.length}getHandlersCount(){return 4}getHandler(e){return l[e]}clone(){return new g(this.instructions.map((e=>({code:e.code,args:e.args.slice(),branches:e.branches.slice()}))))}serialize(){return this.instructions}}t.Program=g},59:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.WallCell=void 0;const n=r(40);class o extends n.AbstractCell{update(){}getType(){return n.CellType.WALL}serialize(){return{type:n.CellType.WALL}}}t.WallCell=o},158:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Data=void 0;const n=r(730),o=r(841),s={energy:1,lifetime:1,genesis:3,supply:3};class i{constructor(e,t,r,n){this.array=e,this.payload=t,this.width=r,this.height=n,this.organismDataLength=this.payload?s[this.payload]+1:1}static create(e,t){const r=e.getWidth(),o=e.getHeight(),s=[];for(let i=0;i<r;i++)for(let r=0;r<o;r++){const o=e.getCell(i,r);if(s.push(o.getType()),o instanceof n.OrganismCell)switch(t){case"energy":s.push(o.getEnergy());break;case"lifetime":s.push(o.getLifetime());break;case"genesis":for(const e of o.getColor().toArray())s.push(e);break;case"supply":for(const e of o.getSupplyColor().toArray())s.push(e)}}return new i(new Uint8Array(s),t,r,o)}getArray(){return this.array}getPayload(){return this.payload}getWidth(){return this.width}getHeight(){return this.height}getItemLength(e){switch(e){case o.CellType.EMPTY:return 1;case o.CellType.ORGANISM:return this.organismDataLength;case o.CellType.ORGANIC:case o.CellType.WALL:return 1}throw new Error}}t.Data=i},841:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GENOME_VERSION=t.Command=t.Direction=t.Organ=t.CellType=void 0;const n=r(165);Object.defineProperty(t,"Organ",{enumerable:!0,get:function(){return n.Organ}}),Object.defineProperty(t,"GENOME_VERSION",{enumerable:!0,get:function(){return n.CURRENT_VERSION}});const o=r(890);Object.defineProperty(t,"Direction",{enumerable:!0,get:function(){return o.Direction}});const s=r(191);Object.defineProperty(t,"Command",{enumerable:!0,get:function(){return s.Command}});const i=r(40);Object.defineProperty(t,"CellType",{enumerable:!0,get:function(){return i.CellType}})}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var s=t[n]={exports:{}};return e[n](s,s.exports,r),s.exports}(()=>{const e=r(158),t=r(415),n=self,o=new t.CommonRenderer,s=[];setTimeout((function t(){if(s.length){const t=s.shift(),r=new e.Data(t.data.array,t.data.payload,t.data.width,t.data.height);o.render((e=>{n.postMessage({id:t.id,data:e},[e.data.buffer])}),t.width,t.height,t.offsetX,t.offsetY,t.scale,t.mode,r)}setTimeout(t,0)}),0),n.addEventListener("message",(e=>{s.push(e.data)}))})()})();