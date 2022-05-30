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

/***/ "./src/render/common-renderer.ts":
/*!***************************************!*\
  !*** ./src/render/common-renderer.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.CommonRenderer = void 0;\nconst color_1 = __webpack_require__(/*! ../common/color */ \"./src/common/color.ts\");\nclass CommonRenderer {\n    constructor() {\n    }\n    render(width, height, offsetX, offsetY, scale, data) {\n        return new Promise(function (resolve, reject) {\n            const array = data.getArray();\n            const payload = data.getPayload();\n            const empty = (new Uint8ClampedArray(width * height * 4)).map(function (e, i) {\n                return i % 4 === 3 ? 255 : 0;\n            });\n            const imageData = new ImageData(empty, width, height);\n            // const imageData = new ImageData(width, height);\n            const renderCell = (x, y, color) => {\n                const line = [];\n                let visibleWidth = scale;\n                let visibleHeight = scale;\n                if (x < 0) {\n                    visibleWidth += x;\n                    x = 0;\n                }\n                if (y < 0) {\n                    visibleHeight += y;\n                    y = 0;\n                }\n                if (x + scale >= imageData.width) {\n                    visibleWidth = (imageData.width - x);\n                }\n                if (y + scale >= imageData.height) {\n                    visibleHeight = (imageData.height - y);\n                }\n                for (let i = 0; i < visibleWidth; i++) {\n                    line.push(color[0], color[1], color[2], 255);\n                }\n                const offsetX = x * 4;\n                const widthOffset = width * 4;\n                for (let i = 0; i < visibleHeight; i++) {\n                    imageData.data.set(line, widthOffset * (y + i) + offsetX);\n                }\n            };\n            const yellow = color_1.Color.fromHex('#ffff00');\n            const black = color_1.Color.fromHex('#000000');\n            let i = 0;\n            for (let x = 0; x < data.getWidth(); x++) {\n                for (let y = 0; y < data.getHeight(); y++) {\n                    const cursorX = offsetX + x * scale;\n                    if (cursorX + scale < 0 || cursorX >= imageData.width) {\n                        i += payload.length + 1;\n                        continue;\n                    }\n                    const cursorY = offsetY + y * scale;\n                    if (cursorY + scale < 0 || cursorY >= imageData.height) {\n                        i += payload.length + 1;\n                        continue;\n                    }\n                    switch (array[i]) {\n                        case 0: //empty\n                            break;\n                        case 1: //organism\n                            renderCell(cursorX, cursorY, yellow.mix(black, array[i + 1] / 100).toArray());\n                            break;\n                        case 2: //organic\n                            renderCell(cursorX, cursorY, [255, 0, 0]);\n                            break;\n                        case 3: //wall\n                            break;\n                    }\n                    i += payload.length + 1;\n                }\n            }\n            resolve(imageData);\n        });\n    }\n}\nexports.CommonRenderer = CommonRenderer;\n\n\n//# sourceURL=webpack://evo/./src/render/common-renderer.ts?");

/***/ }),

/***/ "./node_modules/ts-loader/index.js!./src/render/renderer.worker.ts":
/*!*************************************************************************!*\
  !*** ./node_modules/ts-loader/index.js!./src/render/renderer.worker.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst data_1 = __webpack_require__(/*! ../simulation/data */ \"./src/simulation/data.ts\");\nconst common_renderer_1 = __webpack_require__(/*! ./common-renderer */ \"./src/render/common-renderer.ts\");\nconst ctx = self;\nconst renderer = new common_renderer_1.CommonRenderer();\nlet queue = [];\nsetTimeout(function run() {\n    if (queue.length) {\n        const commandData = queue.pop();\n        queue = [];\n        const simulationData = new data_1.Data(commandData.data.array, commandData.data.payload, commandData.data.width, commandData.data.height);\n        renderer.render(commandData.width, commandData.height, commandData.offsetX, commandData.offsetY, commandData.scale, simulationData).then(function (data) {\n            ctx.postMessage({ id: commandData.id, data: data }, [data.data.buffer]);\n        });\n    }\n    setTimeout(run, 0);\n}, 0);\nctx.addEventListener(\"message\", (event) => {\n    queue.push(event.data);\n});\n\n\n//# sourceURL=webpack://evo/./src/render/renderer.worker.ts?./node_modules/ts-loader/index.js");

/***/ }),

/***/ "./src/simulation/data.ts":
/*!********************************!*\
  !*** ./src/simulation/data.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Data = void 0;\nconst CELL_TYPE_MAP = {\n    empty: 0,\n    organism: 1,\n    organic: 2,\n    wall: 3,\n};\nconst DIRECTION_MAP = {\n    NORTH: 0,\n    NORTH_EAST: 1,\n    NORTH_WEST: 2,\n    SOUTH: 3,\n    SOUTH_EAST: 4,\n    SOUTH_WEST: 5,\n    EAST: 6,\n    WEST: 7\n};\nclass Data {\n    constructor(array, payload, width, height) {\n        this.array = array;\n        this.payload = payload;\n        this.width = width;\n        this.height = height;\n    }\n    static create(state, payload) {\n        const grid = state.getGrid();\n        const width = grid.getWidth();\n        const height = grid.getHeight();\n        const array = new Uint8Array(width * height * (payload.length + 1));\n        let i = 0;\n        for (let x = 0; x < width; x++) {\n            for (let y = 0; y < height; y++) {\n                const cell = grid.getCell(x, y);\n                array[i] = CELL_TYPE_MAP[cell.getType()];\n                cell.visit({\n                    visitEmpty: () => {\n                        i += payload.length + 1;\n                    },\n                    visitOrganic: () => {\n                        i += payload.length + 1;\n                    },\n                    visitWall: () => {\n                        i += payload.length + 1;\n                    },\n                    visitOrganism: (cell) => {\n                        for (const item of payload) {\n                            switch (item) {\n                                case 'direction':\n                                    array[++i] = DIRECTION_MAP[cell.getDirection()];\n                                    break;\n                                case 'energy':\n                                    array[++i] = cell.getEnergy();\n                                    break;\n                                case 'lifetime':\n                                    array[++i] = cell.getLifetime();\n                                    break;\n                                default:\n                                    throw new Error();\n                            }\n                        }\n                        i++;\n                    }\n                });\n            }\n        }\n        return new Data(array, payload, width, height);\n    }\n    getArray() {\n        return this.array;\n    }\n    getPayload() {\n        return this.payload;\n    }\n    getWidth() {\n        return this.width;\n    }\n    getHeight() {\n        return this.height;\n    }\n}\nexports.Data = Data;\n\n\n//# sourceURL=webpack://evo/./src/simulation/data.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./node_modules/ts-loader/index.js!./src/render/renderer.worker.ts");
/******/ 	
/******/ })()
;