/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common/array-utils.ts":
/*!***********************************!*\
  !*** ./src/common/array-utils.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.shuffle = void 0;\nfunction shuffle(array) {\n    const result = array;\n    for (let i = result.length - 1; i > 0; i--) {\n        const j = Math.floor(Math.random() * (i + 1));\n        [result[i], result[j]] = [result[j], result[i]];\n    }\n    return result;\n}\nexports.shuffle = shuffle;\n\n\n//# sourceURL=webpack://evo/./src/common/array-utils.ts?");

/***/ }),

/***/ "./src/common/asserts.ts":
/*!*******************************!*\
  !*** ./src/common/asserts.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.AssertLessOrEqualThanError = exports.AssertLessThanError = exports.AssertGreaterOrEqualThanError = exports.AssertGreaterThanError = exports.AssertIntegerError = exports.AssertError = exports.assertLessOrEqualThan = exports.assertLessThan = exports.assertGreaterOrEqualThan = exports.assertGreaterThan = exports.assertInteger = void 0;\nfunction assertInteger(value) {\n    if (!Number.isInteger(value)) {\n        throw new AssertIntegerError;\n    }\n}\nexports.assertInteger = assertInteger;\nfunction assertGreaterThan(value, comparedValue) {\n    if (value <= comparedValue) {\n        throw new AssertGreaterThanError;\n    }\n}\nexports.assertGreaterThan = assertGreaterThan;\nfunction assertGreaterOrEqualThan(value, comparedValue) {\n    if (value < comparedValue) {\n        throw new AssertGreaterOrEqualThanError;\n    }\n}\nexports.assertGreaterOrEqualThan = assertGreaterOrEqualThan;\nfunction assertLessThan(value, comparedValue) {\n    if (value >= comparedValue) {\n        throw new AssertLessThanError;\n    }\n}\nexports.assertLessThan = assertLessThan;\nfunction assertLessOrEqualThan(value, comparedValue) {\n    if (value > comparedValue) {\n        throw new AssertLessOrEqualThanError;\n    }\n}\nexports.assertLessOrEqualThan = assertLessOrEqualThan;\nclass AssertError extends Error {\n}\nexports.AssertError = AssertError;\nclass AssertIntegerError extends AssertError {\n}\nexports.AssertIntegerError = AssertIntegerError;\nclass AssertGreaterThanError extends AssertError {\n}\nexports.AssertGreaterThanError = AssertGreaterThanError;\nclass AssertGreaterOrEqualThanError extends AssertError {\n}\nexports.AssertGreaterOrEqualThanError = AssertGreaterOrEqualThanError;\nclass AssertLessThanError extends AssertError {\n}\nexports.AssertLessThanError = AssertLessThanError;\nclass AssertLessOrEqualThanError extends AssertError {\n}\nexports.AssertLessOrEqualThanError = AssertLessOrEqualThanError;\n\n\n//# sourceURL=webpack://evo/./src/common/asserts.ts?");

/***/ }),

/***/ "./src/common/color.ts":
/*!*****************************!*\
  !*** ./src/common/color.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Color = void 0;\nconst asserts_1 = __webpack_require__(/*! ./asserts */ \"./src/common/asserts.ts\");\nconst random_1 = __webpack_require__(/*! ./random */ \"./src/common/random.ts\");\nclass Color {\n    constructor(red, green, blue) {\n        this.red = red;\n        this.green = green;\n        this.blue = blue;\n        (0, asserts_1.assertGreaterOrEqualThan)(red, 0);\n        (0, asserts_1.assertGreaterOrEqualThan)(green, 0);\n        (0, asserts_1.assertGreaterOrEqualThan)(blue, 0);\n        (0, asserts_1.assertLessOrEqualThan)(red, 255);\n        (0, asserts_1.assertLessOrEqualThan)(green, 255);\n        (0, asserts_1.assertLessOrEqualThan)(blue, 255);\n        const segement = (v) => v.length === 1 ? '0' + v : v;\n        this.hex = '#'\n            + segement(this.red.toString(16))\n            + segement(this.green.toString(16))\n            + segement(this.blue.toString(16));\n    }\n    getRed() {\n        return this.red;\n    }\n    getGreen() {\n        return this.green;\n    }\n    getBlue() {\n        return this.blue;\n    }\n    mix(to, percent) {\n        //assertGreaterOrEqualThan(percent, 0);\n        //assertLessOrEqualThan(percent, 1);\n        return new Color(Math.round(this.red * percent + to.getRed() * (1 - percent)), Math.round(this.green * percent + to.getGreen() * (1 - percent)), Math.round(this.blue * percent + to.getBlue() * (1 - percent)));\n    }\n    toHexFormat() {\n        return this.hex;\n    }\n    equals(color) {\n        return this.blue === color.getBlue()\n            && this.red === color.getRed()\n            && this.green === color.getGreen();\n    }\n    toArray() {\n        return [this.red, this.green, this.blue];\n    }\n    static random() {\n        return new Color((0, random_1.randomInt)(0, 255), (0, random_1.randomInt)(0, 255), (0, random_1.randomInt)(0, 255));\n    }\n    static fromHex(value) {\n        if (value.startsWith('#')) {\n            value = value.slice(1);\n        }\n        return new Color(parseInt(value.slice(0, 2), 16), parseInt(value.slice(2, 4), 16), parseInt(value.slice(4, 6), 16));\n    }\n}\nexports.Color = Color;\n\n\n//# sourceURL=webpack://evo/./src/common/color.ts?");

/***/ }),

/***/ "./src/common/random.ts":
/*!******************************!*\
  !*** ./src/common/random.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.randomInt = void 0;\nfunction randomInt(from, to) {\n    const delta = to - from + 1;\n    return Math.floor(Math.random() * delta) + from;\n}\nexports.randomInt = randomInt;\n\n\n//# sourceURL=webpack://evo/./src/common/random.ts?");

/***/ }),

/***/ "./src/simulation/cell/abstract-cell.ts":
/*!**********************************************!*\
  !*** ./src/simulation/cell/abstract-cell.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.AbstractCell = void 0;\nclass AbstractCell {\n    update(context, params) {\n    }\n    isStatic() {\n        return true;\n    }\n    isEmpty() {\n        return false;\n    }\n}\nexports.AbstractCell = AbstractCell;\n\n\n//# sourceURL=webpack://evo/./src/simulation/cell/abstract-cell.ts?");

/***/ }),

/***/ "./src/simulation/cell/cell-context.ts":
/*!*********************************************!*\
  !*** ./src/simulation/cell/cell-context.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.CellContext = void 0;\nconst grid_loop_type_1 = __webpack_require__(/*! ../types/grid-loop-type */ \"./src/simulation/types/grid-loop-type.ts\");\nclass OutofBoundsError extends Error {\n}\nclass CellContext {\n    constructor(grid, x, y, factory) {\n        this.grid = grid;\n        this.x = x;\n        this.y = y;\n        this.factory = factory;\n    }\n    moveByOffest(x, y) {\n        try {\n            const coordinates = this.getCoordinatesbyOffset(x, y);\n            const cell = this.grid.getCell(this.x, this.y);\n            const nextCell = this.grid.getCell(coordinates[0], coordinates[1]);\n            if (nextCell.isEmpty()) {\n                this.grid.delete(this.x, this.y);\n                this.grid.insert(coordinates[0], coordinates[1], cell);\n            }\n        }\n        catch (e) {\n        }\n    }\n    deleteByOffset(x, y) {\n        const offset = this.getCoordinatesbyOffset(x, y);\n        this.grid.delete(offset[0], offset[1]);\n    }\n    getByOffest(x, y) {\n        try {\n            const coordinates = this.getCoordinatesbyOffset(x, y);\n            return this.grid.getCell(coordinates[0], coordinates[1]);\n        }\n        catch (error) {\n            return this.factory.createWall();\n        }\n    }\n    replace(createCell) {\n        this.grid.delete(this.x, this.y);\n        this.grid.insert(this.x, this.y, createCell(this.factory));\n    }\n    getCoordinatesbyOffset(x, y) {\n        const loop = this.grid.getLoopMode();\n        const loopX = loop === grid_loop_type_1.GridLoopType.TORUS || loop === grid_loop_type_1.GridLoopType.HORIZONTAL;\n        const loopY = loop === grid_loop_type_1.GridLoopType.TORUS || loop === grid_loop_type_1.GridLoopType.VERTICAL;\n        const width = this.grid.getWidth();\n        const height = this.grid.getHeight();\n        let resultX = this.x + x;\n        let resultY = this.y + y;\n        if (loopX) {\n            while (resultX < 0) {\n                resultX += width;\n            }\n        }\n        else if (resultX < 0 || resultX > width - 1) {\n            throw new OutofBoundsError();\n        }\n        if (loopY) {\n            while (resultY < 0) {\n                resultY += height;\n            }\n        }\n        else if (resultY < 0 || resultY > height - 1) {\n            throw new OutofBoundsError();\n        }\n        return [resultX % width, resultY % height];\n    }\n}\nexports.CellContext = CellContext;\n\n\n//# sourceURL=webpack://evo/./src/simulation/cell/cell-context.ts?");

/***/ }),

/***/ "./src/simulation/cell/cell-factory.ts":
/*!*********************************************!*\
  !*** ./src/simulation/cell/cell-factory.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.CellFactory = void 0;\nconst empty_cell_1 = __webpack_require__(/*! ./type/empty-cell */ \"./src/simulation/cell/type/empty-cell.ts\");\nconst organic_cell_1 = __webpack_require__(/*! ./type/organic-cell */ \"./src/simulation/cell/type/organic-cell.ts\");\nconst organism_cell_1 = __webpack_require__(/*! ./type/organism-cell */ \"./src/simulation/cell/type/organism-cell.ts\");\nconst wall_cell_1 = __webpack_require__(/*! ./type/wall-cell */ \"./src/simulation/cell/type/wall-cell.ts\");\nclass CellFactory {\n    createWall() {\n        if (this.wall) {\n            return this.wall;\n        }\n        return this.wall = new wall_cell_1.WallCell();\n    }\n    createEmpty() {\n        if (this.empty) {\n            return this.empty;\n        }\n        return this.empty = new empty_cell_1.EmptyCell();\n    }\n    createOrganism(color, genome, energy) {\n        return new organism_cell_1.OrganismCell(color, genome, energy);\n    }\n    createOrganic() {\n        if (this.organic) {\n            return this.organic;\n        }\n        return this.organic = new organic_cell_1.OrganicCell();\n    }\n}\nexports.CellFactory = CellFactory;\n\n\n//# sourceURL=webpack://evo/./src/simulation/cell/cell-factory.ts?");

/***/ }),

/***/ "./src/simulation/cell/cell-visitor.ts":
/*!*********************************************!*\
  !*** ./src/simulation/cell/cell-visitor.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.CellVisitor = void 0;\nclass CellVisitor {\n    visitEmpty(cell) {\n    }\n    visitWall(cell) {\n    }\n    visitOrganism(cell) {\n    }\n    visitOrganic(cell) {\n    }\n}\nexports.CellVisitor = CellVisitor;\n\n\n//# sourceURL=webpack://evo/./src/simulation/cell/cell-visitor.ts?");

/***/ }),

/***/ "./src/simulation/cell/type/empty-cell.ts":
/*!************************************************!*\
  !*** ./src/simulation/cell/type/empty-cell.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.EmptyCell = void 0;\nconst abstract_cell_1 = __webpack_require__(/*! ../abstract-cell */ \"./src/simulation/cell/abstract-cell.ts\");\nclass EmptyCell extends abstract_cell_1.AbstractCell {\n    getType() {\n        return 'empty';\n    }\n    visit(visitor) {\n        visitor.visitEmpty(this);\n    }\n    isEmpty() {\n        return true;\n    }\n    serialize() {\n        return {\n            type: 'empty',\n        };\n    }\n}\nexports.EmptyCell = EmptyCell;\n\n\n//# sourceURL=webpack://evo/./src/simulation/cell/type/empty-cell.ts?");

/***/ }),

/***/ "./src/simulation/cell/type/organic-cell.ts":
/*!**************************************************!*\
  !*** ./src/simulation/cell/type/organic-cell.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.OrganicCell = void 0;\nconst abstract_cell_1 = __webpack_require__(/*! ../abstract-cell */ \"./src/simulation/cell/abstract-cell.ts\");\nclass OrganicCell extends abstract_cell_1.AbstractCell {\n    getType() {\n        return 'organic';\n    }\n    visit(visitor) {\n        visitor.visitOrganic(this);\n    }\n    serialize() {\n        return {\n            type: 'organic',\n        };\n    }\n}\nexports.OrganicCell = OrganicCell;\n\n\n//# sourceURL=webpack://evo/./src/simulation/cell/type/organic-cell.ts?");

/***/ }),

/***/ "./src/simulation/cell/type/organism-cell.ts":
/*!***************************************************!*\
  !*** ./src/simulation/cell/type/organism-cell.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.OrganismCell = void 0;\nconst abstract_cell_1 = __webpack_require__(/*! ../abstract-cell */ \"./src/simulation/cell/abstract-cell.ts\");\nconst cell_visitor_1 = __webpack_require__(/*! ../cell-visitor */ \"./src/simulation/cell/cell-visitor.ts\");\nconst direction_1 = __webpack_require__(/*! ./organism/direction */ \"./src/simulation/cell/type/organism/direction.ts\");\nconst action_1 = __webpack_require__(/*! ./organism/action */ \"./src/simulation/cell/type/organism/action.ts\");\nclass OrganismCell extends abstract_cell_1.AbstractCell {\n    constructor(color, genome, energy) {\n        super();\n        this.color = color;\n        this.genome = genome;\n        this.energy = energy;\n        this.lifetime = 0;\n        this.direction = (0, direction_1.randomDirection)();\n    }\n    getType() {\n        return 'organism';\n    }\n    getLifetime() {\n        return this.lifetime;\n    }\n    getEnergy() {\n        return this.energy;\n    }\n    getDirection() {\n        return this.direction;\n    }\n    getGenome() {\n        return this.genome;\n    }\n    visit(visitor) {\n        visitor.visitOrganism(this);\n    }\n    update(context, params) {\n        if (params.getOrganismMaxLifetime() !== 0 && this.lifetime > params.getOrganismMaxLifetime() || this.energy <= 0) {\n            context.replace((factory) => factory.createOrganic());\n            return;\n        }\n        const offsetByDirection = (0, direction_1.getOffset)(this.direction);\n        const cell = context.getByOffest(offsetByDirection[0], offsetByDirection[1]);\n        const action = this.genome.getAction(this, cell);\n        if (action === action_1.OrganismAction.STEP) {\n            this.makeStep(context);\n        }\n        else if (action === action_1.OrganismAction.ROTATE_LEFT) {\n            this.rotateLeft();\n        }\n        else if (action === action_1.OrganismAction.ROTATE_RIGHT) {\n            this.rotateRight();\n        }\n        else if (action === action_1.OrganismAction.DIVIDE) {\n            this.divide(context);\n        }\n        else if (action === action_1.OrganismAction.ATTACK) {\n            this.attact(context);\n        }\n        else if (action === action_1.OrganismAction.EAT) {\n            this.eat(context, params);\n        }\n        else if (action === action_1.OrganismAction.PHOTOSYNTHESIS) {\n            this.photosynthesis(params.getPhotosynthesisEnergy());\n        }\n        this.lifetime++;\n    }\n    rotateLeft() {\n        this.direction = (0, direction_1.rotateLeft)(this.direction);\n        this.changeEnergy(-1);\n    }\n    rotateRight() {\n        this.direction = (0, direction_1.rotateRight)(this.direction);\n        this.changeEnergy(-1);\n    }\n    makeStep(context) {\n        const offset = (0, direction_1.getOffset)(this.direction);\n        context.moveByOffest(offset[0], offset[1]);\n        this.changeEnergy(-1);\n    }\n    divide(context) {\n        for (const direction in direction_1.Direction) {\n            const offset = (0, direction_1.getOffset)(direction_1.Direction[direction]);\n            if (context.getByOffest(offset[0], offset[1]).isEmpty()) {\n                context.moveByOffest(offset[0], offset[1]);\n                this.changeEnergy(Math.floor(this.energy / -2));\n                context.replace((factory) => factory.createOrganism(this.color, this.genome.clone(), this.energy));\n                return;\n            }\n        }\n    }\n    attact(context) {\n        const offset = (0, direction_1.getOffset)(this.direction);\n        const victim = context.getByOffest(offset[0], offset[1]);\n        const self = this;\n        victim.visit(new class extends cell_visitor_1.CellVisitor {\n            visitOrganism(victim) {\n                if (victim.getEnergy() <= self.getEnergy()) {\n                    victim.changeEnergy(self.getEnergy() / -3);\n                }\n                self.changeEnergy(-1);\n            }\n        });\n    }\n    eat(context, params) {\n        const offset = (0, direction_1.getOffset)(this.direction);\n        const food = context.getByOffest(offset[0], offset[1]);\n        const self = this;\n        food.visit(new class extends cell_visitor_1.CellVisitor {\n            visitOrganic(cell) {\n                context.deleteByOffset(offset[0], offset[1]);\n                context.moveByOffest(offset[0], offset[1]);\n                self.changeEnergy(params.getOrganicEnergy());\n            }\n        });\n    }\n    photosynthesis(energy) {\n        this.changeEnergy(energy);\n    }\n    changeEnergy(value) {\n        this.energy += value;\n        if (this.energy > 100) {\n            this.energy = 100;\n        }\n        else if (this.energy < 0) {\n            this.energy = 0;\n        }\n    }\n    kill() {\n        this.energy = 0;\n    }\n    isStatic() {\n        return false;\n    }\n    isSimilar(cell) {\n        // return this.genome.isSimilar(cell.getGenome());\n        return this.color.equals(cell.getColor());\n    }\n    getColor() {\n        return this.color;\n    }\n    serialize() {\n        return {\n            type: 'organism',\n            lifetime: this.lifetime,\n            energy: this.energy,\n            color: this.color.toHexFormat(),\n            direction: this.direction.toString(),\n        };\n    }\n}\nexports.OrganismCell = OrganismCell;\n\n\n//# sourceURL=webpack://evo/./src/simulation/cell/type/organism-cell.ts?");

/***/ }),

/***/ "./src/simulation/cell/type/organism/action.ts":
/*!*****************************************************!*\
  !*** ./src/simulation/cell/type/organism/action.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.randomAction = exports.OrganismAction = void 0;\nconst random_1 = __webpack_require__(/*! ../../../../common/random */ \"./src/common/random.ts\");\nvar OrganismAction;\n(function (OrganismAction) {\n    OrganismAction[\"ROTATE_LEFT\"] = \"ROTATE_LEFT\";\n    OrganismAction[\"ROTATE_RIGHT\"] = \"ROTATE_RIGHT\";\n    OrganismAction[\"STEP\"] = \"STEP\";\n    OrganismAction[\"ATTACK\"] = \"ATTACK\";\n    OrganismAction[\"EAT\"] = \"EAT\";\n    OrganismAction[\"DIVIDE\"] = \"DIVIDE\";\n    OrganismAction[\"NOTHING\"] = \"NOTHING\";\n    OrganismAction[\"PHOTOSYNTHESIS\"] = \"PHOTOSYNTHESIS\";\n})(OrganismAction = exports.OrganismAction || (exports.OrganismAction = {}));\nfunction randomAction() {\n    const actions = Object.keys(OrganismAction);\n    return OrganismAction[actions[(0, random_1.randomInt)(0, actions.length - 1)]];\n}\nexports.randomAction = randomAction;\n\n\n//# sourceURL=webpack://evo/./src/simulation/cell/type/organism/action.ts?");

/***/ }),

/***/ "./src/simulation/cell/type/organism/direction.ts":
/*!********************************************************!*\
  !*** ./src/simulation/cell/type/organism/direction.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.rotateRight = exports.rotateLeft = exports.randomDirection = exports.getOffset = exports.Direction = void 0;\nconst random_1 = __webpack_require__(/*! ../../../../common/random */ \"./src/common/random.ts\");\nvar Direction;\n(function (Direction) {\n    Direction[\"NORTH\"] = \"NORTH\";\n    Direction[\"NORTH_EAST\"] = \"NORTH_EAST\";\n    Direction[\"NORTH_WEST\"] = \"NORTH_WEST\";\n    Direction[\"SOUTH\"] = \"SOUTH\";\n    Direction[\"SOUTH_EAST\"] = \"SOUTH_EAST\";\n    Direction[\"SOUTH_WEST\"] = \"SOUTH_WEST\";\n    Direction[\"EAST\"] = \"EAST\";\n    Direction[\"WEST\"] = \"WEST\";\n})(Direction = exports.Direction || (exports.Direction = {}));\nfunction getOffset(direction) {\n    switch (direction) {\n        case Direction.NORTH: return [0, -1];\n        case Direction.NORTH_EAST: return [1, -1];\n        case Direction.NORTH_WEST: return [-1, -1];\n        case Direction.SOUTH: return [0, 1];\n        case Direction.SOUTH_EAST: return [1, 1];\n        case Direction.SOUTH_WEST: return [-1, 1];\n        case Direction.EAST: return [1, 0];\n        case Direction.WEST: return [-1, 0];\n    }\n}\nexports.getOffset = getOffset;\nfunction randomDirection() {\n    return Direction[Object.keys(Direction)[(0, random_1.randomInt)(0, 7)]];\n}\nexports.randomDirection = randomDirection;\nfunction rotateLeft(direction) {\n    switch (direction) {\n        case Direction.NORTH: return Direction.NORTH_WEST;\n        case Direction.NORTH_EAST: return Direction.NORTH;\n        case Direction.NORTH_WEST: return Direction.WEST;\n        case Direction.SOUTH: return Direction.SOUTH_EAST;\n        case Direction.SOUTH_EAST: return Direction.EAST;\n        case Direction.SOUTH_WEST: return Direction.SOUTH;\n        case Direction.EAST: return Direction.NORTH_EAST;\n        case Direction.WEST: return Direction.SOUTH_WEST;\n    }\n}\nexports.rotateLeft = rotateLeft;\nfunction rotateRight(direction) {\n    switch (direction) {\n        case Direction.NORTH: return Direction.NORTH_EAST;\n        case Direction.NORTH_EAST: return Direction.EAST;\n        case Direction.NORTH_WEST: return Direction.NORTH;\n        case Direction.SOUTH: return Direction.SOUTH_WEST;\n        case Direction.SOUTH_EAST: return Direction.SOUTH;\n        case Direction.SOUTH_WEST: return Direction.WEST;\n        case Direction.EAST: return Direction.SOUTH_EAST;\n        case Direction.WEST: return Direction.NORTH_WEST;\n    }\n}\nexports.rotateRight = rotateRight;\n\n\n//# sourceURL=webpack://evo/./src/simulation/cell/type/organism/direction.ts?");

/***/ }),

/***/ "./src/simulation/cell/type/organism/genome.ts":
/*!*****************************************************!*\
  !*** ./src/simulation/cell/type/organism/genome.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Genome = void 0;\nconst action_1 = __webpack_require__(/*! ./action */ \"./src/simulation/cell/type/organism/action.ts\");\nconst random_1 = __webpack_require__(/*! ../../../../common/random */ \"./src/common/random.ts\");\nconst MUTATION_POWER = 5;\nvar Target;\n(function (Target) {\n    Target[\"EMPTY\"] = \"EMPTY\";\n    Target[\"WALL\"] = \"WALL\";\n    Target[\"ORGANIC\"] = \"ORGANIC\";\n    Target[\"ORGANISM_SIMILAR\"] = \"ORGANISM_SIMILAR\";\n    Target[\"ORGANISM_OTHER\"] = \"ORGANISM_OTHER\";\n})(Target || (Target = {}));\nclass Genome {\n    constructor(mutationСhance, similarityLimit, reflexes = {}) {\n        this.mutationСhance = mutationСhance;\n        this.similarityLimit = similarityLimit;\n        this.reflexes = reflexes;\n    }\n    getAction(organism, tagretCell) {\n        const divisionPossible = organism.getEnergy() > 60;\n        let tagretType;\n        tagretCell.visit({\n            visitEmpty: (cell) => {\n                tagretType = Target.EMPTY;\n            },\n            visitWall: (cell) => {\n                tagretType = Target.WALL;\n            },\n            visitOrganic: (cell) => {\n                tagretType = Target.ORGANIC;\n            },\n            visitOrganism: (cell) => {\n                tagretType = organism.isSimilar(cell) ? Target.ORGANISM_SIMILAR : Target.ORGANISM_OTHER;\n            }\n        });\n        if (divisionPossible && tagretType === Target.EMPTY) {\n            return action_1.OrganismAction.DIVIDE;\n        }\n        const action = this.reflexes[`${tagretType}`];\n        if (action === undefined || action === action_1.OrganismAction.DIVIDE && !divisionPossible) {\n            return action_1.OrganismAction.NOTHING;\n        }\n        return action;\n    }\n    compare(genome) {\n        return 0;\n    }\n    isSimilar(genome) {\n        return this.compare(genome) >= this.similarityLimit;\n    }\n    clone() {\n        let similarityLimit = this.similarityLimit;\n        let mutationСhance = this.mutationСhance;\n        let reflexes = {};\n        for (let key of Object.keys(Target)) {\n            reflexes[key] = this.reflexes[key];\n        }\n        if (this.mutationСhance > (0, random_1.randomInt)(0, 100)) {\n            const mutateParam = (0, random_1.randomInt)(0, 7);\n            if (mutateParam === 0) {\n                mutationСhance += MUTATION_POWER * ((0, random_1.randomInt)(0, 1) === 1 ? -1 : 1);\n            }\n            else if (mutateParam === 1) {\n                similarityLimit += MUTATION_POWER * ((0, random_1.randomInt)(0, 1) === 1 ? -1 : 1);\n            }\n            else if (mutateParam >= 2) {\n                const keys = Object.keys(Target);\n                reflexes[keys[(0, random_1.randomInt)(0, keys.length - 1)]] = (0, action_1.randomAction)();\n            }\n        }\n        return new Genome(mutationСhance, similarityLimit, reflexes);\n    }\n    static createRandom() {\n        let reflexes = {};\n        for (let key of Object.keys(Target)) {\n            reflexes[key] = (0, action_1.randomAction)();\n        }\n        return new Genome(Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), reflexes);\n    }\n}\nexports.Genome = Genome;\n\n\n//# sourceURL=webpack://evo/./src/simulation/cell/type/organism/genome.ts?");

/***/ }),

/***/ "./src/simulation/cell/type/wall-cell.ts":
/*!***********************************************!*\
  !*** ./src/simulation/cell/type/wall-cell.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.WallCell = void 0;\nconst abstract_cell_1 = __webpack_require__(/*! ../abstract-cell */ \"./src/simulation/cell/abstract-cell.ts\");\nclass WallCell extends abstract_cell_1.AbstractCell {\n    getType() {\n        return 'wall';\n    }\n    visit(visitor) {\n        visitor.visitWall(this);\n    }\n    serialize() {\n        return {\n            type: 'wall',\n        };\n    }\n}\nexports.WallCell = WallCell;\n\n\n//# sourceURL=webpack://evo/./src/simulation/cell/type/wall-cell.ts?");

/***/ }),

/***/ "./src/simulation/common-simulation.ts":
/*!*********************************************!*\
  !*** ./src/simulation/common-simulation.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.CommonSimulation = void 0;\nconst array_utils_1 = __webpack_require__(/*! ../common/array-utils */ \"./src/common/array-utils.ts\");\nconst color_1 = __webpack_require__(/*! ../common/color */ \"./src/common/color.ts\");\nconst cell_factory_1 = __webpack_require__(/*! ./cell/cell-factory */ \"./src/simulation/cell/cell-factory.ts\");\nconst genome_1 = __webpack_require__(/*! ./cell/type/organism/genome */ \"./src/simulation/cell/type/organism/genome.ts\");\nconst data_1 = __webpack_require__(/*! ./data */ \"./src/simulation/data.ts\");\nconst simulation_1 = __webpack_require__(/*! ./simulation */ \"./src/simulation/simulation.ts\");\nconst simulation_params_1 = __webpack_require__(/*! ./simulation-params */ \"./src/simulation/simulation-params.ts\");\nconst state_1 = __webpack_require__(/*! ./state */ \"./src/simulation/state.ts\");\nconst TIMEOUT_DELAY = 5;\nfunction spawnOrganisms(simulation, cellFactory, count, initialEnergy) {\n    const coordinates = [];\n    const cells = simulation.getGrid().toArray();\n    for (let x = 0; x < cells.length; x++) {\n        for (let y = 0; y < cells[x].length; y++) {\n            const cell = cells[x][y];\n            if (cell.isEmpty()) {\n                coordinates.push([x, y]);\n            }\n        }\n    }\n    for (const [x, y] of (0, array_utils_1.shuffle)(coordinates).slice(0, count)) {\n        simulation.getGrid().insert(x, y, cellFactory.createOrganism(color_1.Color.random(), genome_1.Genome.createRandom(), initialEnergy));\n    }\n}\nclass CommonSimulation extends simulation_1.Simulation {\n    constructor(options) {\n        super(options);\n        options = this.options;\n        const cellFactory = new cell_factory_1.CellFactory();\n        this.state = new state_1.State(options.width, options.height, options.loop, new simulation_params_1.SimulationParams(), cellFactory);\n        const population = Math.ceil(options.width * options.height * options.population / 100);\n        spawnOrganisms(this.state, cellFactory, population, options.initialEnergy);\n    }\n    start() {\n        if (this.timeoutId) {\n            return;\n        }\n        const tick = () => {\n            this.step();\n            this.timeoutId = setTimeout(tick, TIMEOUT_DELAY);\n        };\n        this.timeoutId = setTimeout(tick, TIMEOUT_DELAY);\n        this.emit('start', new simulation_1.SimulationEvent());\n        // let last = 0;\n        // const state = this.state;\n        // setTimeout(function run() {\n        //     console.log(state.getStep() - last);\n        //     last = state.getStep();\n        //     setTimeout(run, 1000);\n        // }, 1000);\n    }\n    pause() {\n        if (this.timeoutId) {\n            clearTimeout(this.timeoutId);\n            this.timeoutId = null;\n            this.emit('pause', new simulation_1.SimulationEvent());\n        }\n        console.log(this.state.getStep());\n    }\n    terminate() {\n        clearTimeout(this.timeoutId);\n        this.emit('terminate', new simulation_1.SimulationEvent());\n    }\n    step() {\n        this.state.next();\n        this.emit('step', new simulation_1.StepEvent(this.state.getStep()));\n    }\n    requestState(payload) {\n        const data = data_1.Data.create(this.state, payload);\n        this.emit('state', {\n            step: this.state.getStep(),\n            buffer: data.getArray().buffer,\n            payload: payload,\n        });\n    }\n}\nexports.CommonSimulation = CommonSimulation;\n\n\n//# sourceURL=webpack://evo/./src/simulation/common-simulation.ts?");

/***/ }),

/***/ "./src/simulation/data.ts":
/*!********************************!*\
  !*** ./src/simulation/data.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Data = void 0;\nconst CELL_TYPE_MAP = {\n    empty: 0,\n    organism: 1,\n    organic: 2,\n    wall: 3,\n};\nconst DIRECTION_MAP = {\n    NORTH: 0,\n    NORTH_EAST: 1,\n    NORTH_WEST: 2,\n    SOUTH: 3,\n    SOUTH_EAST: 4,\n    SOUTH_WEST: 5,\n    EAST: 6,\n    WEST: 7\n};\nclass Data {\n    constructor(array, payload, width, height) {\n        this.array = array;\n        this.payload = payload;\n        this.width = width;\n        this.height = height;\n    }\n    static create(state, payload) {\n        const grid = state.getGrid();\n        const width = grid.getWidth();\n        const height = grid.getHeight();\n        const array = new Uint8Array(width * height * (payload.length + 1));\n        let i = 0;\n        for (let x = 0; x < width; x++) {\n            for (let y = 0; y < height; y++) {\n                const cell = grid.getCell(x, y);\n                array[i] = CELL_TYPE_MAP[cell.getType()];\n                cell.visit({\n                    visitEmpty: () => {\n                        i += payload.length + 1;\n                    },\n                    visitOrganic: () => {\n                        i += payload.length + 1;\n                    },\n                    visitWall: () => {\n                        i += payload.length + 1;\n                    },\n                    visitOrganism: (cell) => {\n                        for (const item of payload) {\n                            switch (item) {\n                                case 'direction':\n                                    array[++i] = DIRECTION_MAP[cell.getDirection()];\n                                    break;\n                                case 'energy':\n                                    array[++i] = cell.getEnergy();\n                                    break;\n                                case 'lifetime':\n                                    array[++i] = cell.getLifetime();\n                                    break;\n                                default:\n                                    throw new Error();\n                            }\n                        }\n                        i++;\n                    }\n                });\n            }\n        }\n        return new Data(array, payload, width, height);\n    }\n    getArray() {\n        return this.array;\n    }\n    getPayload() {\n        return this.payload;\n    }\n    getWidth() {\n        return this.width;\n    }\n    getHeight() {\n        return this.height;\n    }\n}\nexports.Data = Data;\n\n\n//# sourceURL=webpack://evo/./src/simulation/data.ts?");

/***/ }),

/***/ "./src/simulation/grid.ts":
/*!********************************!*\
  !*** ./src/simulation/grid.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Grid = void 0;\nconst asserts_1 = __webpack_require__(/*! ../common/asserts */ \"./src/common/asserts.ts\");\nclass Grid {\n    constructor(width, height, loop, cellFactory) {\n        this.width = width;\n        this.height = height;\n        this.loop = loop;\n        this.cellFactory = cellFactory;\n        this.cells = [];\n        (0, asserts_1.assertGreaterThan)(width, 0);\n        (0, asserts_1.assertGreaterThan)(height, 0);\n        for (let x = 0; x < width; x++) {\n            this.cells[x] = [];\n            for (let y = 0; y < height; y++) {\n                this.cells[x][y] = cellFactory.createEmpty();\n            }\n        }\n    }\n    insert(x, y, cell) {\n        (0, asserts_1.assertLessThan)(x, this.width);\n        (0, asserts_1.assertLessThan)(y, this.height);\n        (0, asserts_1.assertGreaterOrEqualThan)(x, 0);\n        (0, asserts_1.assertGreaterOrEqualThan)(y, 0);\n        this.cells[x][y] = cell;\n    }\n    delete(x, y) {\n        this.cells[x][y] = this.cellFactory.createEmpty();\n    }\n    getCell(x, y) {\n        return this.cells[x][y];\n    }\n    getLoopMode() {\n        return this.loop;\n    }\n    getWidth() {\n        return this.width;\n    }\n    getHeight() {\n        return this.height;\n    }\n    toArray() {\n        return this.cells.map(l => l.slice());\n    }\n    serialize() {\n        return this.toArray().map((l) => l.map(c => c.serialize()));\n    }\n}\nexports.Grid = Grid;\n\n\n//# sourceURL=webpack://evo/./src/simulation/grid.ts?");

/***/ }),

/***/ "./src/simulation/simulation-params.ts":
/*!*********************************************!*\
  !*** ./src/simulation/simulation-params.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.SimulationParams = void 0;\nclass SimulationParams {\n    constructor(options = {}) {\n        this.organismMaxLifetime = 100;\n        this.photosynthesisEnergy = 2;\n        this.organicEnergy = 20;\n        const hasValue = (option) => options[option] !== null && options[option] !== undefined;\n        if (hasValue('photosynthesisEnergy')) {\n            this.setPhotosynthesisEnergy(options['photosynthesisEnergy']);\n        }\n        if (hasValue('organismMaxLifetime')) {\n            this.setOrganismMaxLifetime(options['organismMaxLifetime']);\n        }\n        if (hasValue('organicEnergy')) {\n            this.setOrganicEnergy(options['organicEnergy']);\n        }\n    }\n    getOrganicEnergy() {\n        return this.organicEnergy;\n    }\n    setOrganicEnergy(value) {\n        this.organicEnergy = value;\n    }\n    getOrganismMaxLifetime() {\n        return this.organismMaxLifetime;\n    }\n    setOrganismMaxLifetime(value) {\n        this.organismMaxLifetime = value;\n    }\n    getPhotosynthesisEnergy() {\n        return this.photosynthesisEnergy;\n    }\n    setPhotosynthesisEnergy(value) {\n        this.photosynthesisEnergy = value;\n    }\n    serialize() {\n        return {\n            photosynthesisEnergy: this.photosynthesisEnergy,\n            organismMaxLifetime: this.organismMaxLifetime,\n            organicEnergy: this.organicEnergy,\n        };\n    }\n}\nexports.SimulationParams = SimulationParams;\n\n\n//# sourceURL=webpack://evo/./src/simulation/simulation-params.ts?");

/***/ }),

/***/ "./src/simulation/simulation.ts":
/*!**************************************!*\
  !*** ./src/simulation/simulation.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Simulation = exports.StateEvent = exports.StepEvent = exports.SimulationEvent = void 0;\nconst grid_loop_type_1 = __webpack_require__(/*! ./types/grid-loop-type */ \"./src/simulation/types/grid-loop-type.ts\");\nclass SimulationEvent {\n    constructor() {\n    }\n}\nexports.SimulationEvent = SimulationEvent;\nclass StepEvent extends SimulationEvent {\n    constructor(step) {\n        super();\n        this.step = step;\n    }\n}\nexports.StepEvent = StepEvent;\nclass StateEvent extends SimulationEvent {\n    constructor(step, buffer, payload) {\n        super();\n        this.step = step;\n        this.buffer = buffer;\n        this.payload = payload;\n    }\n}\nexports.StateEvent = StateEvent;\n;\nclass Simulation {\n    constructor(options) {\n        this.eventListeners = {};\n        this.options = Object.assign({\n            width: 200,\n            height: 100,\n            loop: grid_loop_type_1.GridLoopType.NONE,\n            population: 5,\n            initialEnergy: 70,\n        }, options);\n    }\n    getOptions() {\n        return this.options;\n    }\n    addEventListener(type, listener) {\n        if (!this.eventListeners[type]) {\n            this.eventListeners[type] = [];\n        }\n        this.eventListeners[type].push(listener);\n        return () => this.removeEventListener(type, listener);\n    }\n    removeEventListener(type, listener) {\n        if (!this.eventListeners[type]) {\n            return;\n        }\n        const index = this.eventListeners[type].findIndex((value) => value === listener);\n        if (index === -1) {\n            return;\n        }\n        this.eventListeners[type] = this.eventListeners[type].splice(index, 1);\n    }\n    emit(type, event) {\n        const listeners = this.eventListeners[type];\n        if (listeners) {\n            for (const listener of listeners) {\n                listener(event);\n            }\n        }\n    }\n}\nexports.Simulation = Simulation;\n\n\n//# sourceURL=webpack://evo/./src/simulation/simulation.ts?");

/***/ }),

/***/ "./node_modules/ts-loader/index.js!./src/simulation/simulation.worker.ts":
/*!*******************************************************************************!*\
  !*** ./node_modules/ts-loader/index.js!./src/simulation/simulation.worker.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst common_simulation_1 = __webpack_require__(/*! ./common-simulation */ \"./src/simulation/common-simulation.ts\");\nconst ctx = self;\nlet simulation;\nconst handlers = {\n    init: (request) => {\n        if (simulation) {\n            return;\n        }\n        simulation = new common_simulation_1.CommonSimulation(request.options);\n        simulation.addEventListener('start', (ev) => ctx.postMessage({ type: 'start' }));\n        simulation.addEventListener('pause', (ev) => ctx.postMessage({ type: 'pause' }));\n        simulation.addEventListener('step', (ev) => ctx.postMessage({ type: 'step', step: ev.step }));\n        simulation.addEventListener('state', (ev) => ctx.postMessage({\n            type: 'state',\n            step: ev.step,\n            buffer: ev.buffer,\n            payload: ev.payload,\n        }, [ev.buffer]));\n    },\n    start: (request) => {\n        simulation.start();\n    },\n    pause: (request) => {\n        simulation.pause();\n    },\n    step: (request) => {\n        simulation.step();\n    },\n    requestState: (request) => {\n        simulation.requestState(request.payload);\n    }\n};\nctx.addEventListener(\"message\", (event) => {\n    switch (event.data.type) {\n        case 'init':\n            return handlers.init(event.data);\n        case 'start':\n            return handlers.start(event.data);\n        case 'pause':\n            return handlers.pause(event.data);\n        case 'step':\n            return handlers.step(event.data);\n        case 'requestState':\n            return handlers.requestState(event.data);\n    }\n});\n\n\n//# sourceURL=webpack://evo/./src/simulation/simulation.worker.ts?./node_modules/ts-loader/index.js");

/***/ }),

/***/ "./src/simulation/state.ts":
/*!*********************************!*\
  !*** ./src/simulation/state.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.State = void 0;\nconst cell_context_1 = __webpack_require__(/*! ./cell/cell-context */ \"./src/simulation/cell/cell-context.ts\");\nconst grid_1 = __webpack_require__(/*! ./grid */ \"./src/simulation/grid.ts\");\nclass State {\n    constructor(width, height, loop, params, cellFactory) {\n        this.params = params;\n        this.cellFactory = cellFactory;\n        this.step = 0;\n        this.grid = new grid_1.Grid(width, height, loop, cellFactory);\n    }\n    next() {\n        const cells = this.grid.toArray();\n        for (let x = 0; x < cells.length; x++) {\n            for (let y = 0; y < cells[x].length; y++) {\n                const cell = cells[x][y];\n                if (cell.isStatic()) {\n                    continue;\n                }\n                cell.update(new cell_context_1.CellContext(this.grid, x, y, this.cellFactory), this.params);\n            }\n        }\n        this.step++;\n    }\n    getGrid() {\n        return this.grid;\n    }\n    getStep() {\n        return this.step;\n    }\n    getParams() {\n        return this.params;\n    }\n    setParams(params) {\n        this.params = params;\n    }\n}\nexports.State = State;\n\n\n//# sourceURL=webpack://evo/./src/simulation/state.ts?");

/***/ }),

/***/ "./src/simulation/types/grid-loop-type.ts":
/*!************************************************!*\
  !*** ./src/simulation/types/grid-loop-type.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.GridLoopType = void 0;\nvar GridLoopType;\n(function (GridLoopType) {\n    GridLoopType[\"NONE\"] = \"NONE\";\n    GridLoopType[\"TORUS\"] = \"TORUS\";\n    GridLoopType[\"VERTICAL\"] = \"VERTICAL\";\n    GridLoopType[\"HORIZONTAL\"] = \"HORIZONTAL\";\n})(GridLoopType = exports.GridLoopType || (exports.GridLoopType = {}));\n\n\n//# sourceURL=webpack://evo/./src/simulation/types/grid-loop-type.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./node_modules/ts-loader/index.js!./src/simulation/simulation.worker.ts");
/******/ 	
/******/ })()
;