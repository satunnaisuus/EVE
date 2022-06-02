(()=>{"use strict";var e,t={4766:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.shuffle=void 0,t.shuffle=function(e){const t=e;for(let e=t.length-1;e>0;e--){const r=Math.floor(Math.random()*(e+1));[t[e],t[r]]=[t[r],t[e]]}return t}},4904:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AssertLessOrEqualThanError=t.AssertLessThanError=t.AssertGreaterOrEqualThanError=t.AssertGreaterThanError=t.AssertIntegerError=t.AssertError=t.assertLessOrEqualThan=t.assertLessThan=t.assertGreaterOrEqualThan=t.assertGreaterThan=t.assertInteger=void 0,t.assertInteger=function(e){if(!Number.isInteger(e))throw new i},t.assertGreaterThan=function(e,t){if(e<=t)throw new n},t.assertGreaterOrEqualThan=function(e,t){if(e<t)throw new s},t.assertLessThan=function(e,t){if(e>=t)throw new o},t.assertLessOrEqualThan=function(e,t){if(e>t)throw new a};class r extends Error{}t.AssertError=r;class i extends r{}t.AssertIntegerError=i;class n extends r{}t.AssertGreaterThanError=n;class s extends r{}t.AssertGreaterOrEqualThanError=s;class o extends r{}t.AssertLessThanError=o;class a extends r{}t.AssertLessOrEqualThanError=a},6469:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Color=void 0;const i=r(4904),n=r(5629);class s{constructor(e,t,r){this.red=e,this.green=t,this.blue=r,(0,i.assertGreaterOrEqualThan)(e,0),(0,i.assertGreaterOrEqualThan)(t,0),(0,i.assertGreaterOrEqualThan)(r,0),(0,i.assertLessOrEqualThan)(e,255),(0,i.assertLessOrEqualThan)(t,255),(0,i.assertLessOrEqualThan)(r,255);const n=e=>1===e.length?"0"+e:e;this.hex="#"+n(this.red.toString(16))+n(this.green.toString(16))+n(this.blue.toString(16))}getRed(){return this.red}getGreen(){return this.green}getBlue(){return this.blue}mix(e,t){return new s(Math.round(this.red*t+e.getRed()*(1-t)),Math.round(this.green*t+e.getGreen()*(1-t)),Math.round(this.blue*t+e.getBlue()*(1-t)))}toHexFormat(){return this.hex}equals(e){return this.blue===e.getBlue()&&this.red===e.getRed()&&this.green===e.getGreen()}toArray(){return[this.red,this.green,this.blue]}static random(){return new s((0,n.randomInt)(0,255),(0,n.randomInt)(0,255),(0,n.randomInt)(0,255))}static fromHex(e){return e.startsWith("#")&&(e=e.slice(1)),new s(parseInt(e.slice(0,2),16),parseInt(e.slice(2,4),16),parseInt(e.slice(4,6),16))}}t.Color=s},5629:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.randomInt=void 0,t.randomInt=function(e,t){const r=t-e+1;return Math.floor(Math.random()*r)+e}},2629:(e,t,r)=>{const i=r(7294),n=r(745),s=r(9378),o=r(1997),a=r(9376),l=r(7698),c=(0,n.createRoot)(document.getElementById("root")),u=new a.Store;c.render(i.createElement(o.AppContext.Provider,{value:u},i.createElement(l.GlobalStyle,null),i.createElement(s.App,null)))},9408:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.WorkerRenderer=void 0;const i=r(9273);t.WorkerRenderer=class{constructor(){this.listeners=[],this.lastId=0,this.worker=new i.default,this.worker.addEventListener("message",(e=>{this.listeners[e.data.id](e.data.data),delete this.listeners[e.data.id]}))}render(e,t,r,i,n,s,o){const a=this.lastId++;return this.worker.postMessage({id:a,width:e,height:t,offsetX:r,offsetY:i,scale:n,mode:s,data:{width:o.getWidth(),height:o.getHeight(),payload:o.getPayload(),array:o.getArray()}},[o.getArray().buffer]),new Promise((e=>{this.listeners[a]=e}))}terminate(){this.worker.terminate()}}},4040:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AbstractCell=void 0,t.AbstractCell=class{update(e,t){}isStatic(){return!0}isEmpty(){return!1}}},4591:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CellContext=void 0;const i=r(4282);class n extends Error{}t.CellContext=class{constructor(e,t,r,i){this.grid=e,this.x=t,this.y=r,this.factory=i}moveByOffest(e,t){try{const r=this.getCoordinatesbyOffset(e,t),i=this.grid.getCell(this.x,this.y);this.grid.getCell(r[0],r[1]).isEmpty()&&(this.grid.delete(this.x,this.y),this.grid.insert(r[0],r[1],i))}catch(e){}}deleteByOffset(e,t){const r=this.getCoordinatesbyOffset(e,t);this.grid.delete(r[0],r[1])}getByOffest(e,t){try{const r=this.getCoordinatesbyOffset(e,t);return this.grid.getCell(r[0],r[1])}catch(e){return this.factory.createWall()}}replace(e){this.grid.delete(this.x,this.y),this.grid.insert(this.x,this.y,e(this.factory))}getCoordinatesbyOffset(e,t){const r=this.grid.getLoopMode(),s=r===i.GridLoopType.TORUS||r===i.GridLoopType.HORIZONTAL,o=r===i.GridLoopType.TORUS||r===i.GridLoopType.VERTICAL,a=this.grid.getWidth(),l=this.grid.getHeight();let c=this.x+e,u=this.y+t;if(s)for(;c<0;)c+=a;else if(c<0||c>a-1)throw new n;if(o)for(;u<0;)u+=l;else if(u<0||u>l-1)throw new n;return[c%a,u%l]}}},4240:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CellFactory=void 0;const i=r(7816),n=r(347),s=r(4730),o=r(59);t.CellFactory=class{createWall(){return this.wall?this.wall:this.wall=new o.WallCell}createEmpty(){return this.empty?this.empty:this.empty=new i.EmptyCell}createOrganism(e,t,r){return new s.OrganismCell(e,t,r)}createOrganic(){return this.organic?this.organic:this.organic=new n.OrganicCell}}},4017:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CellVisitor=void 0,t.CellVisitor=class{visitEmpty(e){}visitWall(e){}visitOrganism(e){}visitOrganic(e){}}},7816:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EmptyCell=void 0;const i=r(4040);class n extends i.AbstractCell{getType(){return"empty"}visit(e){e.visitEmpty(this)}isEmpty(){return!0}serialize(){return{type:"empty"}}}t.EmptyCell=n},347:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.OrganicCell=void 0;const i=r(4040);class n extends i.AbstractCell{getType(){return"organic"}visit(e){e.visitOrganic(this)}serialize(){return{type:"organic"}}}t.OrganicCell=n},4730:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.OrganismCell=void 0;const i=r(4040),n=r(4017),s=r(1890),o=r(7048);class a extends i.AbstractCell{constructor(e,t,r){super(),this.color=e,this.genome=t,this.energy=r,this.lifetime=0,this.direction=(0,s.randomDirection)()}getType(){return"organism"}getLifetime(){return this.lifetime}getEnergy(){return this.energy}getDirection(){return this.direction}getGenome(){return this.genome}visit(e){e.visitOrganism(this)}update(e,t){if(0!==t.getOrganismMaxLifetime()&&this.lifetime>t.getOrganismMaxLifetime()||this.energy<=0)return void e.replace((e=>e.createOrganic()));const r=(0,s.getOffset)(this.direction),i=e.getByOffest(r[0],r[1]),n=this.genome.getAction(this,i);n===o.OrganismAction.STEP?this.makeStep(e):n===o.OrganismAction.ROTATE_LEFT?this.rotateLeft():n===o.OrganismAction.ROTATE_RIGHT?this.rotateRight():n===o.OrganismAction.DIVIDE?this.divide(e):n===o.OrganismAction.ATTACK?this.attact(e):n===o.OrganismAction.EAT?this.eat(e,t):n===o.OrganismAction.PHOTOSYNTHESIS&&this.photosynthesis(t.getPhotosynthesisEnergy()),this.lifetime++}rotateLeft(){this.direction=(0,s.rotateLeft)(this.direction),this.changeEnergy(-1)}rotateRight(){this.direction=(0,s.rotateRight)(this.direction),this.changeEnergy(-1)}makeStep(e){const t=(0,s.getOffset)(this.direction);e.moveByOffest(t[0],t[1]),this.changeEnergy(-1)}divide(e){for(const t in s.Direction){const r=(0,s.getOffset)(s.Direction[t]);if(e.getByOffest(r[0],r[1]).isEmpty())return e.moveByOffest(r[0],r[1]),this.changeEnergy(Math.floor(this.energy/-2)),void e.replace((e=>e.createOrganism(this.color,this.genome.clone(),this.energy)))}}attact(e){const t=(0,s.getOffset)(this.direction),r=e.getByOffest(t[0],t[1]),i=this;r.visit(new class extends n.CellVisitor{visitOrganism(e){e.getEnergy()<=i.getEnergy()&&e.changeEnergy(i.getEnergy()/-3),i.changeEnergy(-1)}})}eat(e,t){const r=(0,s.getOffset)(this.direction),i=e.getByOffest(r[0],r[1]),o=this;i.visit(new class extends n.CellVisitor{visitOrganic(i){e.deleteByOffset(r[0],r[1]),e.moveByOffest(r[0],r[1]),o.changeEnergy(t.getOrganicEnergy())}})}photosynthesis(e){this.changeEnergy(e)}changeEnergy(e){this.energy+=e,this.energy>100?this.energy=100:this.energy<0&&(this.energy=0)}kill(){this.energy=0}isStatic(){return!1}isSimilar(e){return this.color.equals(e.getColor())}getColor(){return this.color}serialize(){return{type:"organism",lifetime:this.lifetime,energy:this.energy,color:this.color.toHexFormat(),direction:this.direction.toString()}}}t.OrganismCell=a},7048:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.randomAction=t.OrganismAction=void 0;const i=r(5629);var n;!function(e){e.ROTATE_LEFT="ROTATE_LEFT",e.ROTATE_RIGHT="ROTATE_RIGHT",e.STEP="STEP",e.ATTACK="ATTACK",e.EAT="EAT",e.DIVIDE="DIVIDE",e.NOTHING="NOTHING",e.PHOTOSYNTHESIS="PHOTOSYNTHESIS"}(n=t.OrganismAction||(t.OrganismAction={})),t.randomAction=function(){const e=Object.keys(n);return n[e[(0,i.randomInt)(0,e.length-1)]]}},1890:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.rotateRight=t.rotateLeft=t.randomDirection=t.getOffset=t.Direction=void 0;const i=r(5629);var n;!function(e){e.NORTH="NORTH",e.NORTH_EAST="NORTH_EAST",e.NORTH_WEST="NORTH_WEST",e.SOUTH="SOUTH",e.SOUTH_EAST="SOUTH_EAST",e.SOUTH_WEST="SOUTH_WEST",e.EAST="EAST",e.WEST="WEST"}(n=t.Direction||(t.Direction={})),t.getOffset=function(e){switch(e){case n.NORTH:return[0,-1];case n.NORTH_EAST:return[1,-1];case n.NORTH_WEST:return[-1,-1];case n.SOUTH:return[0,1];case n.SOUTH_EAST:return[1,1];case n.SOUTH_WEST:return[-1,1];case n.EAST:return[1,0];case n.WEST:return[-1,0]}},t.randomDirection=function(){return n[Object.keys(n)[(0,i.randomInt)(0,7)]]},t.rotateLeft=function(e){switch(e){case n.NORTH:return n.NORTH_WEST;case n.NORTH_EAST:return n.NORTH;case n.NORTH_WEST:return n.WEST;case n.SOUTH:return n.SOUTH_EAST;case n.SOUTH_EAST:return n.EAST;case n.SOUTH_WEST:return n.SOUTH;case n.EAST:return n.NORTH_EAST;case n.WEST:return n.SOUTH_WEST}},t.rotateRight=function(e){switch(e){case n.NORTH:return n.NORTH_EAST;case n.NORTH_EAST:return n.EAST;case n.NORTH_WEST:return n.NORTH;case n.SOUTH:return n.SOUTH_WEST;case n.SOUTH_EAST:return n.SOUTH;case n.SOUTH_WEST:return n.WEST;case n.EAST:return n.SOUTH_EAST;case n.WEST:return n.NORTH_WEST}}},1165:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Genome=void 0;const i=r(7048),n=r(5629);var s;!function(e){e.EMPTY="EMPTY",e.WALL="WALL",e.ORGANIC="ORGANIC",e.ORGANISM_SIMILAR="ORGANISM_SIMILAR",e.ORGANISM_OTHER="ORGANISM_OTHER"}(s||(s={}));class o{constructor(e,t,r={}){this.mutationСhance=e,this.similarityLimit=t,this.reflexes=r}getAction(e,t){const r=e.getEnergy()>60;let n;if(t.visit({visitEmpty:e=>{n=s.EMPTY},visitWall:e=>{n=s.WALL},visitOrganic:e=>{n=s.ORGANIC},visitOrganism:t=>{n=e.isSimilar(t)?s.ORGANISM_SIMILAR:s.ORGANISM_OTHER}}),r&&n===s.EMPTY)return i.OrganismAction.DIVIDE;const o=this.reflexes[`${n}`];return void 0===o||o===i.OrganismAction.DIVIDE&&!r?i.OrganismAction.NOTHING:o}compare(e){return 0}isSimilar(e){return this.compare(e)>=this.similarityLimit}clone(){let e=this.similarityLimit,t=this.mutationСhance,r={};for(let e of Object.keys(s))r[e]=this.reflexes[e];if(this.mutationСhance>(0,n.randomInt)(0,100)){const o=(0,n.randomInt)(0,7);if(0===o)t+=5*(1===(0,n.randomInt)(0,1)?-1:1);else if(1===o)e+=5*(1===(0,n.randomInt)(0,1)?-1:1);else if(o>=2){const e=Object.keys(s);r[e[(0,n.randomInt)(0,e.length-1)]]=(0,i.randomAction)()}}return new o(t,e,r)}static createRandom(){let e={};for(let t of Object.keys(s))e[t]=(0,i.randomAction)();return new o(Math.floor(100*Math.random()),Math.floor(100*Math.random()),e)}}t.Genome=o},59:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.WallCell=void 0;const i=r(4040);class n extends i.AbstractCell{getType(){return"wall"}visit(e){e.visitWall(this)}serialize(){return{type:"wall"}}}t.WallCell=n},3170:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CommonSimulation=void 0;const i=r(4766),n=r(6469),s=r(4240),o=r(1165),a=r(8158),l=r(6567),c=r(1231),u=r(691);class h extends l.Simulation{constructor(e){super(e),e=this.options,this.cellFactory=new s.CellFactory,this.state=new u.State(e.width,e.height,e.loop,new c.SimulationParams,this.cellFactory);const t=Math.ceil(e.width*e.height*e.population/100);this.spawnOrganisms(t,e.initialEnergy)}step(){return new Promise((e=>{this.state.next(),e(this.state.getStep())}))}getState(e){return new Promise((t=>{const r=a.Data.create(this.state,e);t({step:this.state.getStep(),buffer:r.getArray().buffer,payload:e})}))}spawnOrganisms(e,t){const r=[],s=this.state.getGrid().toArray();for(let e=0;e<s.length;e++)for(let t=0;t<s[e].length;t++)s[e][t].isEmpty()&&r.push([e,t]);for(const[s,a]of(0,i.shuffle)(r).slice(0,e))this.state.getGrid().insert(s,a,this.cellFactory.createOrganism(n.Color.random(),o.Genome.createRandom(),t))}}t.CommonSimulation=h},8158:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Data=void 0;const r={empty:0,organism:1,organic:2,wall:3},i={NORTH:0,NORTH_EAST:1,NORTH_WEST:2,SOUTH:3,SOUTH_EAST:4,SOUTH_WEST:5,EAST:6,WEST:7};class n{constructor(e,t,r,i){this.array=e,this.payload=t,this.width=r,this.height=i}static create(e,t){const s=e.getGrid(),o=s.getWidth(),a=s.getHeight(),l=new Uint8Array(o*a*(t.length+1));let c=0;for(let e=0;e<o;e++)for(let n=0;n<a;n++){const o=s.getCell(e,n);l[c]=r[o.getType()],o.visit({visitEmpty:()=>{c+=t.length+1},visitOrganic:()=>{c+=t.length+1},visitWall:()=>{c+=t.length+1},visitOrganism:e=>{for(const r of t)switch(r){case"direction":l[++c]=i[e.getDirection()];break;case"energy":l[++c]=e.getEnergy();break;case"lifetime":l[++c]=e.getLifetime();break;default:throw new Error}c++}})}return new n(l,t,o,a)}getArray(){return this.array}getPayload(){return this.payload}getWidth(){return this.width}getHeight(){return this.height}}t.Data=n},1563:function(e,t,r){var i=this&&this.__awaiter||function(e,t,r,i){return new(r||(r=Promise))((function(n,s){function o(e){try{l(i.next(e))}catch(e){s(e)}}function a(e){try{l(i.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?n(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,a)}l((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.createSimulation=void 0;const n=r(3170),s=r(4403);t.createSimulation=function(e){return i(this,void 0,void 0,(function*(){let t;return t=window.Worker?yield s.WorkerSimulation.create(e):new n.CommonSimulation(e),t}))}},8928:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Grid=void 0;const i=r(4904);t.Grid=class{constructor(e,t,r,n){this.width=e,this.height=t,this.loop=r,this.cellFactory=n,this.cells=[],(0,i.assertGreaterThan)(e,0),(0,i.assertGreaterThan)(t,0);for(let r=0;r<e;r++){this.cells[r]=[];for(let e=0;e<t;e++)this.cells[r][e]=n.createEmpty()}}insert(e,t,r){(0,i.assertLessThan)(e,this.width),(0,i.assertLessThan)(t,this.height),(0,i.assertGreaterOrEqualThan)(e,0),(0,i.assertGreaterOrEqualThan)(t,0),this.cells[e][t]=r}delete(e,t){this.cells[e][t]=this.cellFactory.createEmpty()}getCell(e,t){return this.cells[e][t]}getLoopMode(){return this.loop}getWidth(){return this.width}getHeight(){return this.height}toArray(){return this.cells.map((e=>e.slice()))}serialize(){return this.toArray().map((e=>e.map((e=>e.serialize()))))}}},1231:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SimulationParams=void 0,t.SimulationParams=class{constructor(e={}){this.organismMaxLifetime=99,this.photosynthesisEnergy=2,this.organicEnergy=20;const t=t=>null!==e[t]&&void 0!==e[t];t("photosynthesisEnergy")&&this.setPhotosynthesisEnergy(e.photosynthesisEnergy),t("organismMaxLifetime")&&this.setOrganismMaxLifetime(e.organismMaxLifetime),t("organicEnergy")&&this.setOrganicEnergy(e.organicEnergy)}getOrganicEnergy(){return this.organicEnergy}setOrganicEnergy(e){this.organicEnergy=e}getOrganismMaxLifetime(){return this.organismMaxLifetime}setOrganismMaxLifetime(e){this.organismMaxLifetime=e}getPhotosynthesisEnergy(){return this.photosynthesisEnergy}setPhotosynthesisEnergy(e){this.photosynthesisEnergy=e}serialize(){return{photosynthesisEnergy:this.photosynthesisEnergy,organismMaxLifetime:this.organismMaxLifetime,organicEnergy:this.organicEnergy}}}},6567:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Simulation=t.StepData=void 0,t.StepData=class{constructor(e,t,r){this.step=e,this.buffer=t,this.payload=r}},t.Simulation=class{constructor(e){this.options=e}terminate(){}getOptions(){return this.options}}},691:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.State=void 0;const i=r(4591),n=r(8928);t.State=class{constructor(e,t,r,i,s){this.params=i,this.cellFactory=s,this.step=0,this.grid=new n.Grid(e,t,r,s)}next(){const e=this.grid.toArray();for(let t=0;t<e.length;t++)for(let r=0;r<e[t].length;r++){const n=e[t][r];n.isStatic()||n.update(new i.CellContext(this.grid,t,r,this.cellFactory),this.params)}this.step++}getGrid(){return this.grid}getStep(){return this.step}getParams(){return this.params}setParams(e){this.params=e}}},4282:(e,t)=>{var r;Object.defineProperty(t,"__esModule",{value:!0}),t.GridLoopType=void 0,(r=t.GridLoopType||(t.GridLoopType={})).NONE="NONE",r.TORUS="TORUS",r.VERTICAL="VERTICAL",r.HORIZONTAL="HORIZONTAL"},4403:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.WorkerSimulation=void 0;const i=r(6567),n=r(8365);class s extends i.Simulation{constructor(e,t){super(e),this.lastRequestId=0,this.messageListeners={step:{},state:{}},this.worker=new n.default,this.worker.postMessage({type:"init",options:e}),this.worker.addEventListener("message",(e=>{switch(e.data.type){case"init":return t(this);case"step":return this.messageListeners.step[e.data.id](e.data.step),void delete this.messageListeners.step[e.data.id];case"state":return this.messageListeners.state[e.data.id](new i.StepData(e.data.step,e.data.buffer,e.data.payload)),void delete this.messageListeners.state[e.data.id]}}))}static create(e){return new Promise((t=>{new s(e,(e=>t(e)))}))}terminate(){this.worker.terminate()}step(){return new Promise((e=>{const t=this.lastRequestId++;this.messageListeners.step[t]=e,this.worker.postMessage({id:t,type:"step"})}))}getState(e){return new Promise((t=>{const r=this.lastRequestId++;this.messageListeners.state[r]=t,this.worker.postMessage({id:r,type:"requestState",payload:e})}))}}t.WorkerSimulation=s},9378:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;const i=r(2766),n=r(7294),s=r(7294),o=r(8804),a=r(7244),l=r(1997),c=r(8042),u=r(711),h=r(23),d=o.default.div`
    height: 100vh;
    background: #000;
    display: flex;
    color: #fff;
`,g=(0,i.observer)((()=>{const e=(0,s.useContext)(l.AppContext),t=e.getSimulation();return t?n.createElement(a.Simulation,{simulation:t}):n.createElement(c.CreateSimulationForm,{options:(0,u.loadOptions)(),onCreate:t=>e.newSimulation(t)})}));t.App=(0,i.observer)((()=>n.createElement(o.ThemeProvider,{theme:h.THEME},n.createElement(d,null,n.createElement(g,null)))))},2120:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Button=void 0;const i=r(2766),n=r(7294),s=r(8804),o=r(23),a={primary:{backgroundColor:o.THEME.primary,boderColor:o.THEME.primary,textColor:o.THEME.color},success:{backgroundColor:o.THEME.success,boderColor:o.THEME.success,textColor:o.THEME.color},secondary:{backgroundColor:o.THEME.secondary,boderColor:o.THEME.secondary,textColor:o.THEME.color}},l=s.default.button`
    border: 1px solid;
    border-radius: 10px;
    cursor: pointer;
    padding: 10px 16px;
    ${({width:e})=>e&&`width: ${e};`}
    ${({apperance:e})=>{const t=a[e||"secondary"];return`border-color: ${t.boderColor};background-color: ${t.backgroundColor};color: ${t.textColor};`}}
`;t.Button=(0,i.observer)((e=>n.createElement(l,Object.assign({},e),e.children)))},1017:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Card=void 0;const i=r(7294),n=r(8804).default.div`
    border-radius: 10px;
    background: ${e=>e.theme.background};
    padding: 15px;

    & + & {
        margin-top: 10px;
    }
`;t.Card=e=>i.createElement(n,Object.assign({},e),e.children)},2186:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Controls=void 0;const i=r(7294),n=r(2766),s=r(8804),o=r(2120),a=r(7625),l=r(753),c=r(6043),u=r(9596),h=r(1139),d=s.default.div`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    overflow-y: auto;
    padding: 0 10px;
    background: ${e=>e.theme.background};
    height: 70px;
`,g=[{label:"Default",value:"default"},{label:"Energy",value:"energy"},{label:"Lifetime",value:"lifetime"}];t.Controls=(0,n.observer)((({simulation:e})=>{const t=e.getRenderer();return i.createElement(d,null,e.isReady()&&i.createElement(i.Fragment,null,e.isPaused()&&i.createElement(i.Fragment,null,i.createElement(o.Button,{apperance:"primary",onClick:()=>e.start()},i.createElement(a.FontAwesomeIcon,{icon:l.faPlay})),i.createElement(o.Button,{apperance:"secondary",onClick:()=>e.makeStep()},i.createElement(a.FontAwesomeIcon,{icon:u.faForwardStep}))),!e.isPaused()&&i.createElement(o.Button,{apperance:"primary",onClick:()=>e.pause()},i.createElement(a.FontAwesomeIcon,{icon:c.faPause})),i.createElement(h.Select,{options:g,onSelect:e=>{t.setMode(e)},value:t.getMode()})))}))},8042:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CreateSimulationForm=void 0;const i=r(7294),n=r(7294),s=r(4282),o=r(2120),a=r(1017),l=r(2197),c=r(3540),u=r(1936),h=r(8863),d=r(1139),g=[{label:"None",value:s.GridLoopType.NONE},{label:"Torus",value:s.GridLoopType.TORUS},{label:"Horizontal",value:s.GridLoopType.HORIZONTAL},{label:"Vertical",value:s.GridLoopType.VERTICAL}];t.CreateSimulationForm=({options:e,onCreate:t})=>{const[r,s]=(0,n.useState)(e.loop),[m,p]=(0,n.useState)(e.width),[f,y]=(0,n.useState)(e.height),[v,O]=(0,n.useState)(e.initialEnergy),[E,T]=(0,n.useState)(e.population);return i.createElement(l.Flex,{align:"center",justify:"center"},i.createElement(a.Card,null,i.createElement(c.FormRow,{label:"Grid width"},i.createElement(u.NumberInput,{min:0,onChange:e=>p(e),value:m})),i.createElement(c.FormRow,{label:"Grid height"},i.createElement(u.NumberInput,{min:0,onChange:e=>y(e),value:f})),i.createElement(c.FormRow,{label:"Loop"},i.createElement(d.Select,{onSelect:e=>s(e),options:g,value:r})),i.createElement(c.FormRow,{label:`Population (${E}%)`},i.createElement(h.RangeInput,{min:0,max:100,step:.1,onChange:e=>T(e),value:E})),i.createElement(c.FormRow,{label:`Initial energy (${v})`},i.createElement(h.RangeInput,{min:0,max:100,step:1,onChange:e=>O(e),value:v})),i.createElement(o.Button,{apperance:"primary",width:"100%",onClick:()=>{t({loop:r,width:m,height:f,initialEnergy:v,population:E})}},"Create")))}},2197:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Flex=void 0;const i=r(7294),n=r(8804).default.div`
    display: flex;
    flex-direction: ${e=>e.direction||"row"};
    justify-content: ${e=>e.justify||"stretch"};
    align-items: ${e=>e.align||"stretch"};
    flex-wrap: ${e=>e.wrap||"nowrap"};
    width: 100%;
`;t.Flex=e=>i.createElement(n,Object.assign({},e),e.children)},3540:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.FormRow=void 0;const i=r(7294),n=r(8804),s=n.default.div`
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
`,o=n.default.label`
    margin-bottom: 5px;
    display: block;
    width: 100%;
    color: ${e=>e.theme.color};
`;t.FormRow=e=>i.createElement(s,null,e.label&&i.createElement(o,null,e.label),e.children)},1936:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.NumberInput=void 0;const i=r(7294),n=r(8804),s=r(6767),o=r(98),a=r(7625),l=n.default.input`
    width: 100%;
    background: ${e=>e.theme.secondary};
    border: 2px solid ${e=>e.theme.secondary};
    padding: 10px 60px 10px 10px;
    border-radius: 10px;
    color: ${e=>e.theme.color};
`,c=n.default.button`
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
`,u=(0,n.default)(c)`
    opacity: 0.5;
    cursor: default;
`,h=n.default.div`
    position: relative;
`,d=n.default.div`
    position: absolute;
    top: 11px;
    right: 10px;
`;t.NumberInput=e=>{const[t,r]=i.useState(e.value||0),n=t=>{void 0!==e.min&&t<e.min&&(t=e.min),void 0!==e.max&&t>e.max&&(t=e.max),r(t),e.onChange(t)};let g=i.createElement(c,{onClick:()=>n(t-1)},i.createElement(a.FontAwesomeIcon,{icon:s.faMinus})),m=i.createElement(c,{onClick:()=>n(t+1)},i.createElement(a.FontAwesomeIcon,{icon:o.faPlus}));return void 0!==e.min&&e.value<=e.min&&(g=i.createElement(u,null,i.createElement(a.FontAwesomeIcon,{icon:s.faMinus}))),void 0!==e.max&&e.value>=e.max&&(m=i.createElement(u,null,i.createElement(a.FontAwesomeIcon,{icon:o.faPlus}))),i.createElement(h,null,i.createElement(l,{type:"text",value:t,onChange:e=>(e=>{const t=Number(e);n(Number.isSafeInteger(t)?t:0)})(e.target.value)}),i.createElement(d,null,g,m))}},8863:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.RangeInput=void 0;const i=r(7294),n=r(8804).default.input`
    width: 100%;
`;t.RangeInput=e=>i.createElement(n,{type:"range",min:e.min,max:e.max,step:e.step,value:e.value,onChange:t=>e.onChange(Number(t.target.value))})},1139:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Select=void 0;const i=r(7294),n=r(8804).default.select`
    background: ${e=>e.theme.secondary};
    border: 1px solid ${e=>e.theme.secondary};
    padding: 10px 10px;
    border-radius: 10px;
    color: ${e=>e.theme.color};
`;t.Select=e=>i.createElement(n,{onChange:t=>e.onSelect(t.target.value),value:e.value},e.options.map((({value:e,label:t},r)=>i.createElement("option",{value:e,key:r},t))))},7244:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Simulation=void 0;const i=r(7294),n=r(2766),s=r(8804),o=r(4924),a=r(2186),l=s.default.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;t.Simulation=(0,n.observer)((({simulation:e})=>i.createElement(l,null,i.createElement(a.Controls,{simulation:e}),i.createElement(o.Viewport,{simulation:e}))))},4924:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Viewport=void 0;const i=r(7294),n=r(7294),s=r(2766),o=r(5560),a=r(8804).default.div`
    height: 100%;
    width: 100%;
    overflow: hidden;
`;t.Viewport=(0,s.observer)((({simulation:e})=>{const t=(0,n.useRef)(),[r,s,l]=(0,o.useSize)();return(0,n.useEffect)((()=>(e.getRenderer().setCanvas(t.current),()=>{})),[t.current]),(0,n.useEffect)((()=>(e.getRenderer().requestRedraw(),()=>{})),[r,s]),i.createElement(a,{ref:l},i.createElement("canvas",{width:r,height:s,ref:t}))}))},1997:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AppContext=void 0;const i=r(7294);t.AppContext=i.createContext(null)},5560:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useSize=void 0;const i=r(7294);t.useSize=function(){const[e,t]=(0,i.useState)(0),[r,n]=(0,i.useState)(0),[s,o]=(0,i.useState)(),a=(0,i.useCallback)((e=>{if(e){t(e.getBoundingClientRect().width),n(e.getBoundingClientRect().height);const r=new ResizeObserver((e=>{for(let r of e){t(r.contentRect.width),n(r.contentRect.height);break}}));r.observe(e),o((()=>()=>r.disconnect()))}}),[]);return(0,i.useEffect)((()=>s),[s]),[e,r,a]}},2575:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.initMouseInteractions=void 0,t.initMouseInteractions=function(e,t){let r=!1,i=[0,0];const n=e=>{const[r,i]=t.getOffset(),n=Math.round((e.clientX-r)/t.getScale()),s=Math.round((e.clientY-i)/t.getScale());e.deltaY<0?t.scaleUp(!1):t.scaleDown(!1),t.setOffset(e.clientX-n*t.getScale(),e.clientY-s*t.getScale())},s=e=>{e.preventDefault(),r=!0,i=[e.clientX,e.clientY]},o=e=>{r=!1},a=e=>{if(e.preventDefault(),!r)return;const[n,s]=t.getOffset();t.setOffset(n+e.clientX-i[0],s+e.clientY-i[1]),i=[e.clientX,e.clientY]},l=e=>{r=!1};return e.addEventListener("wheel",n),e.addEventListener("mousedown",s),e.addEventListener("mouseup",o),e.addEventListener("mousemove",a),e.addEventListener("mouseleave",l),()=>{e.removeEventListener("wheel",n),e.removeEventListener("mousedown",s),e.removeEventListener("mouseup",o),e.removeEventListener("mousemove",a),e.removeEventListener("mouseleave",l)}}},3629:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.initTouchInteractions=void 0,t.initTouchInteractions=function(e,t){let r={},i=0;const n=()=>2===Object.keys(r).length,s=e=>{e.preventDefault();for(const t of e.changedTouches)n()||(r[t.identifier]=t)},o=e=>{for(const t of e.changedTouches)delete r[t.identifier];i=0},a=e=>{for(const t of e.changedTouches)delete r[t.identifier];i=0},l=e=>{e.preventDefault();const s=Object.assign({},r),[o,a]=t.getOffset();for(const i of e.changedTouches)r[i.identifier]&&(s[i.identifier]=i,t.setOffset(o+Math.ceil(i.clientX-r[i.identifier].clientX),a+Math.ceil(i.clientY-r[i.identifier].clientY)));if(n()){const[e,t]=Object.keys(r),n=Math.abs(Math.hypot(r[e].clientX-r[t].clientX,r[e].clientY-r[t].clientY)),o=Math.abs(Math.hypot(s[e].clientX-s[t].clientX,s[e].clientY-s[t].clientY));n>o?i-=n-o:i+=o-n}if(Math.abs(i)>=20){const[e,n]=t.getOffset(),[s,o]=Object.keys(r);let a=(r[s].clientX+r[o].clientX)/2,l=(r[s].clientY+r[o].clientY)/2;const c=Math.round((a-e)/t.getScale()),u=Math.round((l-n)/t.getScale());t.setScale(t.getScale()+Math.trunc(i/20),!1),t.setOffset(a-c*t.getScale(),l-u*t.getScale()),i=0}r=s};return e.addEventListener("touchstart",s,{passive:!1}),e.addEventListener("touchend",o),e.addEventListener("touchcancel",a),e.addEventListener("touchmove",l,{passive:!1}),()=>{e.removeEventListener("touchstart",s),e.removeEventListener("touchend",o),e.removeEventListener("touchcancel",a),e.removeEventListener("touchmove",l)}}},711:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.saveOptions=t.loadOptions=void 0;const i=r(4282);t.loadOptions=function(){return Object.assign({width:200,height:100,loop:i.GridLoopType.NONE,population:5,initialEnergy:70},function(e){let t=localStorage.getItem("evo_simulation_options"),r={};if("string"==typeof t){const e=JSON.parse(t);"object"==typeof e&&(r=e)}return r}())},t.saveOptions=function(e){var t;t=e,localStorage.setItem("evo_simulation_options",JSON.stringify(t))}},9376:function(e,t,r){var i=this&&this.__decorate||function(e,t,r,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(s<3?n(o):s>3?n(t,r,o):n(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};Object.defineProperty(t,"__esModule",{value:!0}),t.Store=void 0;const n=r(8949),s=r(711),o=r(1548),a=r(2291);class l{constructor(){this.simulation=null,this.ui=new a.UIStore,(0,n.makeObservable)(this)}newSimulation(e){this.simulation&&this.simulation.terminate(),this.simulation=new o.SimulationStore(e),(0,s.saveOptions)(e)}getSimulation(){return this.simulation}getUI(){return this.ui}}i([n.observable],l.prototype,"simulation",void 0),i([n.observable],l.prototype,"ui",void 0),i([n.action],l.prototype,"newSimulation",null),t.Store=l},4446:function(e,t,r){var i=this&&this.__decorate||function(e,t,r,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(s<3?n(o):s>3?n(t,r,o):n(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o},n=this&&this.__awaiter||function(e,t,r,i){return new(r||(r=Promise))((function(n,s){function o(e){try{l(i.next(e))}catch(e){s(e)}}function a(e){try{l(i.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?n(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,a)}l((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.CanvasRenderer=void 0;const s=r(8949),o=r(9408),a=r(8158),l=r(2575),c=r(3629);class u{constructor(e){this.simulation=e,this.mode="default",this.scale=1,this.offset=[0,0],this.canvasDestroyListeners=[],this.renderer=new o.WorkerRenderer,(0,s.makeObservable)(this)}setCanvas(e){this.canvas&&this.canvasDestroyListeners.forEach((e=>e())),this.canvas=e,this.context=e.getContext("2d",{alpha:!1}),this.canvasDestroyListeners.push((0,l.initMouseInteractions)(e,this)),this.canvasDestroyListeners.push((0,c.initTouchInteractions)(e,this)),this.fitCenter()}requestRedraw(){this.render(this.mode,this.state).then((e=>{this.redrawId&&cancelAnimationFrame(this.redrawId),this.redrawId=requestAnimationFrame((()=>{this.context.putImageData(e,0,0),this.redrawId=null}))}))}setMode(e){this.mode=e,this.update(e).then((()=>{}))}update(e=this.mode){return n(this,void 0,void 0,(function*(){let t=[];"energy"===e?t=["energy"]:"lifetime"===e&&(t=["lifetime"]),this.setState(yield this.simulation.getState(t)),this.requestRedraw()}))}getMode(){return this.mode}getScale(){return this.scale}setScale(e,t=!0){this.scale=e<1?1:e>40?40:Math.round(e),t&&this.requestRedraw()}scaleUp(e=!0){this.setScale(1.5*this.getScale(),e)}scaleDown(e=!0){this.setScale(this.getScale()/1.5,e)}getOffset(){return this.offset}setOffset(e,t){this.offset=[Math.round(e),Math.round(t)],this.requestRedraw()}fitCenter(){if(!this.canvas)return;const e=this.canvas.width,t=this.canvas.height,r=this.simulation.getOptions().width,i=this.simulation.getOptions().height,n=r/i,s=e/t,o=n>=s?e:t,a=n>=s?r:i;for(let e=1;e<=40;e++)if(o<e*a){this.scale=1===e?1:e-1;break}this.setOffset(Math.ceil((e-this.scale*r)/2),Math.ceil((t-this.scale*i)/2))}setState(e){this.state=e}terminate(){this.renderer.terminate()}render(e,t){return new Promise(((r,i)=>this.canvas?this.state?this.canvas.width&&this.canvas.height?void this.renderer.render(this.canvas.width,this.canvas.height,this.offset[0],this.offset[1],this.scale,e,new a.Data(new Uint8Array(t.buffer.slice(0)),t.payload,this.simulation.getOptions().width,this.simulation.getOptions().height)).then(r).catch(i):i("width or height = 0"):i("state is null"):i("canvas is null")))}}i([s.observable],u.prototype,"mode",void 0),i([s.action],u.prototype,"setMode",null),t.CanvasRenderer=u},1548:function(e,t,r){var i=this&&this.__decorate||function(e,t,r,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(s<3?n(o):s>3?n(t,r,o):n(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};Object.defineProperty(t,"__esModule",{value:!0}),t.SimulationStore=void 0;const n=r(8949),s=r(1563),o=r(4446);class a{constructor(e){this.options=e,this.paused=!0,this.ready=!1,(0,n.makeObservable)(this),this.renderer=new o.CanvasRenderer(this),(0,s.createSimulation)(e).then((e=>{this.simulation=e,this.renderer.update().then((()=>{(0,n.runInAction)((()=>this.ready=!0))}))}))}pause(){this.paused=!0,clearTimeout(this.timeoutId),this.timeoutId=null}start(){if(this.timeoutId)return;let e=Date.now();this.paused=!1;const t=()=>{this.simulation.step().then((r=>{this.renderer.update().then((()=>{console.log(Math.round(1e3/(Date.now()-e))),e=Date.now(),this.paused||(this.timeoutId=setTimeout(t,4))}))}))};this.timeoutId=setTimeout(t,4)}isPaused(){return this.paused}isReady(){return this.ready}makeStep(){this.simulation.step().then((e=>{this.renderer.update().then((()=>{}))}))}getState(e){return this.simulation.getState(e)}getOptions(){return this.options}getRenderer(){return this.renderer}terminate(){this.simulation&&this.simulation.terminate(),this.renderer&&this.renderer.terminate()}}i([n.observable],a.prototype,"paused",void 0),i([n.observable],a.prototype,"ready",void 0),i([n.action],a.prototype,"pause",null),i([n.action],a.prototype,"start",null),t.SimulationStore=a},2291:function(e,t,r){var i=this&&this.__decorate||function(e,t,r,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(s<3?n(o):s>3?n(t,r,o):n(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};Object.defineProperty(t,"__esModule",{value:!0}),t.UIStore=void 0;const n=r(8949);class s{constructor(){this.optionsFormOpened=!1,(0,n.makeObservable)(this)}getOptionsFormOpened(){return this.optionsFormOpened}setOptionsFormOpened(e){this.optionsFormOpened=e}}i([n.observable],s.prototype,"optionsFormOpened",void 0),i([n.action],s.prototype,"setOptionsFormOpened",null),t.UIStore=s},7698:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GlobalStyle=void 0;const i=r(8804);t.GlobalStyle=i.createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: monospace;
        font-size: 16px;
        text-transform: uppercase;
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
`},23:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.THEME=void 0,t.THEME={background:"#222831",color:"#f8f2ec",primary:"#0E49B5",success:"#069A8E",secondary:"#393E46"}},9273:(e,t,r)=>{function i(){return new Worker(r.p+"renderer.worker.worker.js")}r.r(t),r.d(t,{default:()=>i})},8365:(e,t,r)=>{function i(){return new Worker(r.p+"simulation.worker.worker.js")}r.r(t),r.d(t,{default:()=>i})}},r={};function i(e){var n=r[e];if(void 0!==n)return n.exports;var s=r[e]={exports:{}};return t[e].call(s.exports,s,s.exports,i),s.exports}i.m=t,e=[],i.O=(t,r,n,s)=>{if(!r){var o=1/0;for(u=0;u<e.length;u++){for(var[r,n,s]=e[u],a=!0,l=0;l<r.length;l++)(!1&s||o>=s)&&Object.keys(i.O).every((e=>i.O[e](r[l])))?r.splice(l--,1):(a=!1,s<o&&(o=s));if(a){e.splice(u--,1);var c=n();void 0!==c&&(t=c)}}return t}s=s||0;for(var u=e.length;u>0&&e[u-1][2]>s;u--)e[u]=e[u-1];e[u]=[r,n,s]},i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var r in t)i.o(t,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;i.g.importScripts&&(e=i.g.location+"");var t=i.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),i.p=e})(),(()=>{var e={179:0};i.O.j=t=>0===e[t];var t=(t,r)=>{var n,s,[o,a,l]=r,c=0;if(o.some((t=>0!==e[t]))){for(n in a)i.o(a,n)&&(i.m[n]=a[n]);if(l)var u=l(i)}for(t&&t(r);c<o.length;c++)s=o[c],i.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return i.O(u)},r=self.webpackChunkevo=self.webpackChunkevo||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var n=i.O(void 0,[736],(()=>i(2629)));n=i.O(n)})();