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

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst client_1 = __webpack_require__(/*! react-dom/client */ \"./node_modules/react-dom/client.js\");\nconst app_1 = __webpack_require__(/*! ./ui/app */ \"./src/ui/app.tsx\");\nconst context_1 = __webpack_require__(/*! ./ui/context */ \"./src/ui/context.ts\");\nconst storage_1 = __webpack_require__(/*! ./ui/storage */ \"./src/ui/storage.ts\");\nconst simulation_store_1 = __webpack_require__(/*! ./ui/stores/simulation-store */ \"./src/ui/stores/simulation-store.ts\");\nconst ui_store_1 = __webpack_require__(/*! ./ui/stores/ui-store */ \"./src/ui/stores/ui-store.ts\");\nconst styles_1 = __webpack_require__(/*! ./ui/styles */ \"./src/ui/styles.tsx\");\nconst stores = {\n    simulationStore: new simulation_store_1.SimulationStore((0, storage_1.loadOptions)()),\n    UIStore: new ui_store_1.UIStore(),\n};\nconst root = (0, client_1.createRoot)(document.getElementById('root'));\nroot.render(React.createElement(context_1.AppContext.Provider, { value: stores },\n    React.createElement(styles_1.GlobalStyle, null),\n    React.createElement(app_1.App, null)));\n\n\n//# sourceURL=webpack://evo/./src/index.tsx?");

/***/ }),

/***/ "./src/render/canvas-renderer.ts":
/*!***************************************!*\
  !*** ./src/render/canvas-renderer.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.CanvasRenderer = void 0;\nconst data_1 = __webpack_require__(/*! ../simulation/data */ \"./src/simulation/data.ts\");\nconst mouse_1 = __webpack_require__(/*! ./interactions/mouse */ \"./src/render/interactions/mouse.ts\");\nconst touch_1 = __webpack_require__(/*! ./interactions/touch */ \"./src/render/interactions/touch.ts\");\nconst default_strategy_1 = __webpack_require__(/*! ./strategy/default-strategy */ \"./src/render/strategy/default-strategy.ts\");\nconst energy_strategy_1 = __webpack_require__(/*! ./strategy/energy-strategy */ \"./src/render/strategy/energy-strategy.ts\");\nconst genesis_strategy_1 = __webpack_require__(/*! ./strategy/genesis-strategy */ \"./src/render/strategy/genesis-strategy.ts\");\nconst worker_renderer_1 = __webpack_require__(/*! ./worker-renderer */ \"./src/render/worker-renderer.ts\");\nconst SCALE_FACTOR = 1.5;\nconst MAX_SCALE = 40;\nclass CanvasRenderer {\n    constructor(canvas, gameWidth, gameHeight, renderStrategy) {\n        this.canvas = canvas;\n        this.gameWidth = gameWidth;\n        this.gameHeight = gameHeight;\n        this.scale = 1;\n        this.offset = [0, 0];\n        this.width = canvas.width;\n        this.height = canvas.height;\n        this.context = canvas.getContext('2d', { alpha: false });\n        this.setRenderStrategy(renderStrategy);\n        this.fitCenter();\n        this.initHandlingCanvasResize();\n        const clearMouseInteractions = (0, mouse_1.initMouseInteractions)(canvas, this);\n        const clearTouchInteractions = (0, touch_1.initTouchInteractions)(canvas, this);\n        this.renderer = new worker_renderer_1.WorkerRenderer();\n    }\n    setRenderStrategy(strategy) {\n        if (strategy === 'default') {\n            this.renderStrategy = new default_strategy_1.DefaultStrategy(this.context);\n        }\n        else if (strategy === 'energy') {\n            this.renderStrategy = new energy_strategy_1.EnergyStrategy(this.context);\n        }\n        else if (strategy === 'genesis') {\n            this.renderStrategy = new genesis_strategy_1.GenesisStrategy(this.context);\n        }\n        this.requestRedraw().then(() => { });\n        ;\n    }\n    clear() {\n        this.context.clearRect(0, 0, this.width, this.height);\n    }\n    getScale() {\n        return this.scale;\n    }\n    setScale(scale) {\n        if (scale < 1) {\n            this.scale = 1;\n        }\n        else if (scale > MAX_SCALE) {\n            this.scale = MAX_SCALE;\n        }\n        else {\n            this.scale = Math.round(scale);\n        }\n        this.requestRedraw().then(() => { });\n        ;\n    }\n    scaleUp() {\n        this.setScale(this.getScale() * SCALE_FACTOR);\n    }\n    scaleDown() {\n        this.setScale(this.getScale() / SCALE_FACTOR);\n    }\n    getOffset() {\n        return this.offset;\n    }\n    setOffset(x, y) {\n        this.offset = [Math.round(x), Math.round(y)];\n        this.requestRedraw().then(() => { });\n        ;\n    }\n    fitCenter() {\n        const gameRatio = this.gameWidth / this.gameHeight;\n        const canvasRatio = this.width / this.height;\n        const canvasSize = gameRatio >= canvasRatio ? this.width : this.height;\n        const gameSize = gameRatio >= canvasRatio ? this.gameWidth : this.gameHeight;\n        for (let i = 1; i <= MAX_SCALE; i++) {\n            if (canvasSize < i * gameSize) {\n                this.setScale(i - 1);\n                break;\n            }\n        }\n        this.setOffset(Math.ceil((this.width - this.scale * this.gameWidth) / 2), Math.ceil((this.height - this.scale * this.gameHeight) / 2));\n    }\n    requestRedraw() {\n        return __awaiter(this, void 0, void 0, function* () {\n            console.log('requestRedraw');\n            return new Promise((resolve, reject) => {\n                this.render()\n                    .then((imageData) => {\n                    if (this.redrawId) {\n                        cancelAnimationFrame(this.redrawId);\n                    }\n                    this.redrawId = requestAnimationFrame(() => {\n                        console.log('putImageData');\n                        this.context.putImageData(imageData, 0, 0);\n                        this.redrawId = null;\n                        resolve();\n                    });\n                })\n                    .catch(reject);\n            });\n        });\n    }\n    setState(state) {\n        return __awaiter(this, void 0, void 0, function* () {\n            console.log('setState');\n            return new Promise((resolve, reject) => {\n                this.state = state;\n                this.requestRedraw().then(resolve).catch(reject);\n            });\n        });\n    }\n    render() {\n        return __awaiter(this, void 0, void 0, function* () {\n            return new Promise((resolve, reject) => {\n                if (!this.renderStrategy) {\n                    return reject();\n                }\n                if (!this.state) {\n                    return reject('state is null');\n                }\n                if (!this.width || !this.height) {\n                    return reject('width or height = 0');\n                }\n                this.renderer.render(this.width, this.height, this.offset[0], this.offset[1], this.scale, new data_1.Data(new Uint8Array(this.state.buffer.slice(0)), this.state.payload, this.gameWidth, this.gameHeight))\n                    .then(resolve)\n                    .catch(reject);\n            });\n        });\n    }\n    initHandlingCanvasResize() {\n        this.resizeObserver = new ResizeObserver(entries => {\n            for (let entry of entries) {\n                const needFitToCenter = this.width === 0 || this.height === 0;\n                this.width = this.canvas.width;\n                this.height = this.canvas.height;\n                needFitToCenter && this.fitCenter();\n            }\n            this.requestRedraw().then(() => { });\n        });\n        this.resizeObserver.observe(this.canvas);\n    }\n}\nexports.CanvasRenderer = CanvasRenderer;\n\n\n//# sourceURL=webpack://evo/./src/render/canvas-renderer.ts?");

/***/ }),

/***/ "./src/render/interactions/mouse.ts":
/*!******************************************!*\
  !*** ./src/render/interactions/mouse.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.initMouseInteractions = void 0;\nfunction initMouseInteractions(canvas, renderer) {\n    let moving = false;\n    let movingStart = [0, 0];\n    const wheelListener = (e) => {\n        const [offsetX, offsetY] = renderer.getOffset();\n        const xs = Math.round((e.clientX - offsetX) / renderer.getScale());\n        const ys = Math.round((e.clientY - offsetY) / renderer.getScale());\n        e.deltaY < 0 ? renderer.scaleUp() : renderer.scaleDown();\n        renderer.setOffset(e.clientX - xs * renderer.getScale(), e.clientY - ys * renderer.getScale());\n    };\n    const mousedownListener = (e) => {\n        e.preventDefault();\n        moving = true;\n        movingStart = [e.clientX, e.clientY];\n    };\n    const mouseupListener = (e) => {\n        moving = false;\n    };\n    const mousemoveListener = (e) => {\n        e.preventDefault();\n        if (!moving) {\n            return;\n        }\n        const [offsetX, offsetY] = renderer.getOffset();\n        renderer.setOffset(offsetX + e.clientX - movingStart[0], offsetY + e.clientY - movingStart[1]);\n        movingStart = [e.clientX, e.clientY];\n    };\n    const mouseleaveListener = (e) => {\n        moving = false;\n    };\n    canvas.addEventListener('wheel', wheelListener);\n    canvas.addEventListener('mousedown', mousedownListener);\n    canvas.addEventListener('mouseup', mouseupListener);\n    canvas.addEventListener('mousemove', mousemoveListener);\n    canvas.addEventListener('mouseleave', mouseleaveListener);\n    return () => {\n        canvas.removeEventListener('wheel', wheelListener);\n        canvas.removeEventListener('mousedown', mousedownListener);\n        canvas.removeEventListener('mouseup', mouseupListener);\n        canvas.removeEventListener('mousemove', mousemoveListener);\n        canvas.removeEventListener('mouseleave', mouseleaveListener);\n    };\n}\nexports.initMouseInteractions = initMouseInteractions;\n\n\n//# sourceURL=webpack://evo/./src/render/interactions/mouse.ts?");

/***/ }),

/***/ "./src/render/interactions/touch.ts":
/*!******************************************!*\
  !*** ./src/render/interactions/touch.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.initTouchInteractions = void 0;\nconst TOUCH_SCALE_BUFFER_LIMIT = 20;\nfunction initTouchInteractions(canvas, renderer) {\n    let activeTouches = {};\n    let scaleBuffer = 0;\n    const scaling = () => Object.keys(activeTouches).length === 2;\n    const touchstart = (e) => {\n        e.preventDefault();\n        for (const touch of e.changedTouches) {\n            if (!scaling()) {\n                activeTouches[touch.identifier] = touch;\n            }\n        }\n    };\n    const touchend = (e) => {\n        for (const touch of e.changedTouches) {\n            delete activeTouches[touch.identifier];\n        }\n        scaleBuffer = 0;\n    };\n    const touchcancel = (e) => {\n        for (const touch of e.changedTouches) {\n            delete activeTouches[touch.identifier];\n        }\n        scaleBuffer = 0;\n    };\n    const touchmove = (e) => {\n        e.preventDefault();\n        const currentActiveTouches = Object.assign({}, activeTouches);\n        const [offsetX, offsetY] = renderer.getOffset();\n        for (const touch of e.changedTouches) {\n            if (!activeTouches[touch.identifier]) {\n                continue;\n            }\n            currentActiveTouches[touch.identifier] = touch;\n            renderer.setOffset(offsetX + Math.ceil(touch.clientX - activeTouches[touch.identifier].clientX), offsetY + Math.ceil(touch.clientY - activeTouches[touch.identifier].clientY));\n        }\n        if (scaling()) {\n            const [k1, k2] = Object.keys(activeTouches);\n            const previousLength = Math.abs(Math.hypot(activeTouches[k1].clientX - activeTouches[k2].clientX, activeTouches[k1].clientY - activeTouches[k2].clientY));\n            const currentLength = Math.abs(Math.hypot(currentActiveTouches[k1].clientX - currentActiveTouches[k2].clientX, currentActiveTouches[k1].clientY - currentActiveTouches[k2].clientY));\n            if (previousLength > currentLength) {\n                scaleBuffer -= previousLength - currentLength;\n            }\n            else {\n                scaleBuffer += currentLength - previousLength;\n            }\n        }\n        if (Math.abs(scaleBuffer) >= TOUCH_SCALE_BUFFER_LIMIT) {\n            const [offsetX, offsetY] = renderer.getOffset();\n            const [k1, k2] = Object.keys(activeTouches);\n            let cx = (activeTouches[k1].clientX + activeTouches[k2].clientX) / 2;\n            let cy = (activeTouches[k1].clientY + activeTouches[k2].clientY) / 2;\n            const xs = Math.round((cx - offsetX) / renderer.getScale());\n            const ys = Math.round((cy - offsetY) / renderer.getScale());\n            renderer.setScale(renderer.getScale() + Math.trunc(scaleBuffer / TOUCH_SCALE_BUFFER_LIMIT));\n            renderer.setOffset(cx - xs * renderer.getScale(), cy - ys * renderer.getScale());\n            scaleBuffer = 0;\n        }\n        activeTouches = currentActiveTouches;\n    };\n    canvas.addEventListener(\"touchstart\", touchstart, { passive: false });\n    canvas.addEventListener(\"touchend\", touchend);\n    canvas.addEventListener(\"touchcancel\", touchcancel);\n    canvas.addEventListener(\"touchmove\", touchcancel, { passive: false });\n    return () => {\n        canvas.removeEventListener(\"touchstart\", touchstart);\n        canvas.removeEventListener(\"touchend\", touchend);\n        canvas.removeEventListener(\"touchcancel\", touchcancel);\n        canvas.removeEventListener(\"touchmove\", touchcancel);\n    };\n}\nexports.initTouchInteractions = initTouchInteractions;\n\n\n//# sourceURL=webpack://evo/./src/render/interactions/touch.ts?");

/***/ }),

/***/ "./src/render/strategy/default-strategy.ts":
/*!*************************************************!*\
  !*** ./src/render/strategy/default-strategy.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.DefaultStrategy = void 0;\nconst direction_1 = __webpack_require__(/*! ../../simulation/cell/type/organism/direction */ \"./src/simulation/cell/type/organism/direction.ts\");\nclass DefaultStrategy {\n    constructor(context, styles) {\n        this.context = context;\n        this.styles = styles;\n        this.styles = Object.assign({\n            CELL_WALL_COLOR: '#5f5f5f',\n            CELL_ORGANISM_COLOR: '#0B5FA5',\n            CELL_ORGANISM_EYE_COLOR: '#66A1D2',\n            CELL_EMPTY_COLOR: '#000000',\n            CELL_ORGANIC_COLOR: '#FE7276',\n        }, styles);\n    }\n    renderCell(cell, x, y, cellSize) {\n        switch (cell.type) {\n            case 'organic':\n                return this.renderOrganic(cell, x, y, cellSize);\n            case 'organism':\n                return this.renderOrganism(cell, x, y, cellSize);\n            case 'empty':\n                return this.renderEmpty(cell, x, y, cellSize);\n            case 'wall':\n                return this.renderWall(cell, x, y, cellSize);\n        }\n    }\n    renderEmpty(cell, x, y, cellSize) {\n    }\n    renderOrganic(cell, x, y, cellSize) {\n        this.context.fillStyle = this.styles.CELL_ORGANIC_COLOR;\n        this.context.fillRect(x, y, cellSize, cellSize);\n    }\n    renderWall(cell, x, y, cellSize) {\n        this.context.fillStyle = this.styles.CELL_WALL_COLOR;\n        this.context.fillRect(x, y, cellSize, cellSize);\n    }\n    renderOrganism(cell, x, y, cellSize) {\n        this.context.fillStyle = this.styles.CELL_ORGANISM_COLOR;\n        this.context.fillRect(x, y, cellSize, cellSize);\n        if (cellSize < 9) {\n            return;\n        }\n        const eyeSize = cellSize / 3;\n        let eyeOffset;\n        switch (cell.direction) {\n            case direction_1.Direction.NORTH_WEST:\n                eyeOffset = [0, 0];\n                break;\n            case direction_1.Direction.NORTH:\n                eyeOffset = [eyeSize, 0];\n                break;\n            case direction_1.Direction.NORTH_EAST:\n                eyeOffset = [eyeSize * 2, 0];\n                break;\n            case direction_1.Direction.SOUTH_WEST:\n                eyeOffset = [0, eyeSize * 2];\n                break;\n            case direction_1.Direction.SOUTH:\n                eyeOffset = [eyeSize, eyeSize * 2];\n                break;\n            case direction_1.Direction.SOUTH_EAST:\n                eyeOffset = [eyeSize * 2, eyeSize * 2];\n                break;\n            case direction_1.Direction.WEST:\n                eyeOffset = [0, eyeSize];\n                break;\n            case direction_1.Direction.EAST:\n                eyeOffset = [eyeSize * 2, eyeSize];\n                break;\n        }\n        this.context.fillStyle = this.styles.CELL_ORGANISM_EYE_COLOR;\n        this.context.fillRect(x + eyeOffset[0], y + eyeOffset[1], eyeSize, eyeSize);\n    }\n}\nexports.DefaultStrategy = DefaultStrategy;\n\n\n//# sourceURL=webpack://evo/./src/render/strategy/default-strategy.ts?");

/***/ }),

/***/ "./src/render/strategy/energy-strategy.ts":
/*!************************************************!*\
  !*** ./src/render/strategy/energy-strategy.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.EnergyStrategy = void 0;\nconst color_1 = __webpack_require__(/*! ../../common/color */ \"./src/common/color.ts\");\nconst default_strategy_1 = __webpack_require__(/*! ./default-strategy */ \"./src/render/strategy/default-strategy.ts\");\nclass EnergyStrategy extends default_strategy_1.DefaultStrategy {\n    renderOrganism(cell, x, y, cellSize) {\n        let energy = cell.energy;\n        this.context.fillStyle = color_1.Color.fromHex('#ffff00').mix(color_1.Color.fromHex('#ff0000'), energy / 100).toHexFormat();\n        this.context.fillRect(x, y, cellSize, cellSize);\n    }\n}\nexports.EnergyStrategy = EnergyStrategy;\n\n\n//# sourceURL=webpack://evo/./src/render/strategy/energy-strategy.ts?");

/***/ }),

/***/ "./src/render/strategy/genesis-strategy.ts":
/*!*************************************************!*\
  !*** ./src/render/strategy/genesis-strategy.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.GenesisStrategy = void 0;\nconst default_strategy_1 = __webpack_require__(/*! ./default-strategy */ \"./src/render/strategy/default-strategy.ts\");\nclass GenesisStrategy extends default_strategy_1.DefaultStrategy {\n    renderOrganism(cell, x, y, cellSize) {\n        this.context.fillStyle = cell.color;\n        this.context.fillRect(x, y, cellSize, cellSize);\n    }\n}\nexports.GenesisStrategy = GenesisStrategy;\n\n\n//# sourceURL=webpack://evo/./src/render/strategy/genesis-strategy.ts?");

/***/ }),

/***/ "./src/render/worker-renderer.ts":
/*!***************************************!*\
  !*** ./src/render/worker-renderer.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.WorkerRenderer = void 0;\nconst renderer_worker_ts_1 = __webpack_require__(/*! ./renderer.worker.ts */ \"./src/render/renderer.worker.ts\");\nclass WorkerRenderer {\n    constructor() {\n        this.listeners = [];\n        this.lastId = 0;\n        this.worker = new renderer_worker_ts_1.default();\n        this.worker.addEventListener('message', (ev) => {\n            this.listeners[ev.data.id](ev.data.data);\n            delete this.listeners[ev.data.id];\n        });\n    }\n    render(width, height, offsetX, offsetY, scale, data) {\n        const id = this.lastId++;\n        this.worker.postMessage({\n            id: id,\n            width: width,\n            height: height,\n            offsetX: offsetX,\n            offsetY: offsetY,\n            scale: scale,\n            data: {\n                width: data.getWidth(),\n                height: data.getHeight(),\n                payload: data.getPayload(),\n                array: data.getArray(),\n            }\n        }, [data.getArray().buffer]);\n        return new Promise((resolve) => {\n            this.listeners[id] = resolve;\n        });\n    }\n    terminate() {\n        this.worker.terminate();\n    }\n}\nexports.WorkerRenderer = WorkerRenderer;\n\n\n//# sourceURL=webpack://evo/./src/render/worker-renderer.ts?");

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

/***/ }),

/***/ "./src/simulation/worker-simulation.ts":
/*!*********************************************!*\
  !*** ./src/simulation/worker-simulation.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.WorkerSimulation = void 0;\nconst simulation_1 = __webpack_require__(/*! ./simulation */ \"./src/simulation/simulation.ts\");\nconst simulation_worker_ts_1 = __webpack_require__(/*! ./simulation.worker.ts */ \"./src/simulation/simulation.worker.ts\");\nclass WorkerSimulation extends simulation_1.Simulation {\n    constructor(options) {\n        super(options);\n        this.worker = new simulation_worker_ts_1.default();\n        this.worker.postMessage({ type: 'init', options: options });\n        this.worker.addEventListener('message', (ev) => {\n            switch (ev.data.type) {\n                case 'start':\n                    return this.emit('start', new simulation_1.SimulationEvent());\n                case 'pause':\n                    return this.emit('pause', new simulation_1.SimulationEvent());\n                case 'step':\n                    return this.emit('step', new simulation_1.StepEvent(ev.data.step));\n                case 'state':\n                    return this.emit('state', new simulation_1.StateEvent(ev.data.step, ev.data.buffer, ev.data.payload));\n            }\n        });\n    }\n    start() {\n        this.worker.postMessage({ type: 'start' });\n        this.emit('start', new simulation_1.SimulationEvent());\n    }\n    pause() {\n        this.worker.postMessage({ type: 'pause' });\n        this.emit('pause', new simulation_1.SimulationEvent());\n    }\n    terminate() {\n        this.worker.terminate();\n        this.emit('terminate', new simulation_1.SimulationEvent());\n    }\n    step() {\n        this.worker.postMessage({ type: 'step' });\n    }\n    requestState(payload) {\n        this.worker.postMessage({ type: 'requestState', payload: payload });\n    }\n}\nexports.WorkerSimulation = WorkerSimulation;\n\n\n//# sourceURL=webpack://evo/./src/simulation/worker-simulation.ts?");

/***/ }),

/***/ "./src/ui/app.tsx":
/*!************************!*\
  !*** ./src/ui/app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.App = void 0;\nconst mobx_react_lite_1 = __webpack_require__(/*! mobx-react-lite */ \"./node_modules/mobx-react-lite/es/index.js\");\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst styled_components_1 = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\nconst flex_1 = __webpack_require__(/*! ./components/flex */ \"./src/ui/components/flex.tsx\");\nconst simulation_1 = __webpack_require__(/*! ./components/simulation */ \"./src/ui/components/simulation.tsx\");\nconst sidebar_1 = __webpack_require__(/*! ./components/sidebar */ \"./src/ui/components/sidebar.tsx\");\nconst StyledApp = styled_components_1.default.div `\r\n    height: 100vh;\r\n    background: #000;\r\n    display: flex;\r\n    color: #fff;\r\n`;\nexports.App = (0, mobx_react_lite_1.observer)(() => (React.createElement(StyledApp, null,\n    React.createElement(flex_1.Flex, null,\n        React.createElement(simulation_1.SimulationComponent, null),\n        React.createElement(sidebar_1.SidebarComponent, null)))));\n\n\n//# sourceURL=webpack://evo/./src/ui/app.tsx?");

/***/ }),

/***/ "./src/ui/components/button.tsx":
/*!**************************************!*\
  !*** ./src/ui/components/button.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Button = void 0;\nconst mobx_react_lite_1 = __webpack_require__(/*! mobx-react-lite */ \"./node_modules/mobx-react-lite/es/index.js\");\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst styled_components_1 = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\nconst Apperance = {\n    default: {\n        backgroundColor: '#000',\n        boderColor: '#000',\n        textColor: '#fff',\n    },\n    success: {\n        backgroundColor: '#30b47b',\n        boderColor: '#30b47b',\n        textColor: '#fff',\n    },\n};\nconst StyledButton = styled_components_1.default.button `\n    border: 1px solid black;\n    background: black;\n    color: #fff;\n    border-radius: 10px;\n    cursor: pointer;\n    padding: 10px;\n    ${({ width }) => width && `width: ${width};`}\n    ${({ apperance }) => {\n    const styles = Apperance[apperance || 'default'];\n    return (`border-color: ${styles.boderColor};` +\n        `background-color: ${styles.backgroundColor};` +\n        `color: ${styles.textColor};`);\n}}\n`;\nexports.Button = (0, mobx_react_lite_1.observer)((props) => (React.createElement(StyledButton, Object.assign({}, props), props.children)));\n\n\n//# sourceURL=webpack://evo/./src/ui/components/button.tsx?");

/***/ }),

/***/ "./src/ui/components/card.tsx":
/*!************************************!*\
  !*** ./src/ui/components/card.tsx ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Card = void 0;\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst styled_components_1 = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\nconst StyledCard = styled_components_1.default.div `\n    border-radius: 10px;\n    background: #404042;\n    padding: 15px;\n\n    & + & {\n        margin-top: 10px;\n    }\n`;\nconst Card = (props) => (React.createElement(StyledCard, Object.assign({}, props), props.children));\nexports.Card = Card;\n\n\n//# sourceURL=webpack://evo/./src/ui/components/card.tsx?");

/***/ }),

/***/ "./src/ui/components/cards/controls-card.tsx":
/*!***************************************************!*\
  !*** ./src/ui/components/cards/controls-card.tsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ControlsCard = void 0;\nconst mobx_react_lite_1 = __webpack_require__(/*! mobx-react-lite */ \"./node_modules/mobx-react-lite/es/index.js\");\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst react_1 = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst context_1 = __webpack_require__(/*! ../../context */ \"./src/ui/context.ts\");\nconst button_1 = __webpack_require__(/*! ../button */ \"./src/ui/components/button.tsx\");\nconst card_1 = __webpack_require__(/*! ../card */ \"./src/ui/components/card.tsx\");\nconst react_fontawesome_1 = __webpack_require__(/*! @fortawesome/react-fontawesome */ \"./node_modules/@fortawesome/react-fontawesome/index.es.js\");\nconst faPlay_1 = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faPlay */ \"./node_modules/@fortawesome/free-solid-svg-icons/faPlay.js\");\nconst faPause_1 = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faPause */ \"./node_modules/@fortawesome/free-solid-svg-icons/faPause.js\");\nconst faForwardStep_1 = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faForwardStep */ \"./node_modules/@fortawesome/free-solid-svg-icons/faForwardStep.js\");\nconst row_1 = __webpack_require__(/*! ../layout/row */ \"./src/ui/components/layout/row.tsx\");\nconst column_1 = __webpack_require__(/*! ../layout/column */ \"./src/ui/components/layout/column.tsx\");\nconst form_row_1 = __webpack_require__(/*! ../form/form-row */ \"./src/ui/components/form/form-row.tsx\");\nconst select_1 = __webpack_require__(/*! ../form/select */ \"./src/ui/components/form/select.tsx\");\nconst renderThemes = [\n    { label: 'Default', value: 'default' },\n    { label: 'Genesis', value: 'genesis' },\n    { label: 'Energy', value: 'energy' },\n];\nexports.ControlsCard = (0, mobx_react_lite_1.observer)(() => {\n    const { simulationStore } = (0, react_1.useContext)(context_1.AppContext);\n    return (React.createElement(card_1.Card, null,\n        React.createElement(form_row_1.FormRow, { label: \"Map theme\" },\n            React.createElement(select_1.Select, { onSelect: (value) => simulationStore.changeRenderTheme(value), options: renderThemes, value: simulationStore.getRenderTheme() })),\n        React.createElement(row_1.Row, null,\n            React.createElement(column_1.Column, null,\n                simulationStore.isPaused() &&\n                    React.createElement(button_1.Button, { apperance: \"success\", width: \"100%\", onClick: () => simulationStore.start() },\n                        React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: faPlay_1.faPlay }),\n                        \" Start\"),\n                !simulationStore.isPaused() &&\n                    React.createElement(button_1.Button, { width: \"100%\", onClick: () => simulationStore.pause() },\n                        React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: faPause_1.faPause }),\n                        \" Pause\")),\n            simulationStore.isPaused() &&\n                React.createElement(column_1.Column, { width: 70 },\n                    React.createElement(button_1.Button, { width: \"100%\", onClick: () => simulationStore.makeStep() },\n                        React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: faForwardStep_1.faForwardStep }))))));\n});\n\n\n//# sourceURL=webpack://evo/./src/ui/components/cards/controls-card.tsx?");

/***/ }),

/***/ "./src/ui/components/cards/new-simulation-card.tsx":
/*!*********************************************************!*\
  !*** ./src/ui/components/cards/new-simulation-card.tsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.NewSimulationCard = void 0;\nconst mobx_react_lite_1 = __webpack_require__(/*! mobx-react-lite */ \"./node_modules/mobx-react-lite/es/index.js\");\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst react_1 = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst context_1 = __webpack_require__(/*! ../../context */ \"./src/ui/context.ts\");\nconst button_1 = __webpack_require__(/*! ../button */ \"./src/ui/components/button.tsx\");\nconst card_1 = __webpack_require__(/*! ../card */ \"./src/ui/components/card.tsx\");\nconst react_fontawesome_1 = __webpack_require__(/*! @fortawesome/react-fontawesome */ \"./node_modules/@fortawesome/react-fontawesome/index.es.js\");\nconst faGear_1 = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faGear */ \"./node_modules/@fortawesome/free-solid-svg-icons/faGear.js\");\nconst row_1 = __webpack_require__(/*! ../layout/row */ \"./src/ui/components/layout/row.tsx\");\nconst column_1 = __webpack_require__(/*! ../layout/column */ \"./src/ui/components/layout/column.tsx\");\nconst form_row_1 = __webpack_require__(/*! ../form/form-row */ \"./src/ui/components/form/form-row.tsx\");\nconst number_input_1 = __webpack_require__(/*! ../form/number-input */ \"./src/ui/components/form/number-input.tsx\");\nconst select_1 = __webpack_require__(/*! ../form/select */ \"./src/ui/components/form/select.tsx\");\nconst range_input_1 = __webpack_require__(/*! ../form/range-input */ \"./src/ui/components/form/range-input.tsx\");\nconst grid_loop_type_1 = __webpack_require__(/*! ../../../simulation/types/grid-loop-type */ \"./src/simulation/types/grid-loop-type.ts\");\nconst LoopTypes = [\n    { label: 'None', value: grid_loop_type_1.GridLoopType.NONE },\n    { label: 'Torus', value: grid_loop_type_1.GridLoopType.TORUS },\n    { label: 'Horizontal', value: grid_loop_type_1.GridLoopType.HORIZONTAL },\n    { label: 'Vertical', value: grid_loop_type_1.GridLoopType.VERTICAL },\n];\nexports.NewSimulationCard = (0, mobx_react_lite_1.observer)(() => {\n    const { simulationStore, UIStore } = (0, react_1.useContext)(context_1.AppContext);\n    const options = simulationStore.getOptions();\n    return (React.createElement(card_1.Card, null,\n        UIStore.getOptionsFormOpened() && React.createElement(React.Fragment, null,\n            React.createElement(form_row_1.FormRow, { label: \"Grid width\" },\n                React.createElement(number_input_1.NumberInput, { min: 0, onChange: (value) => options.setWidth(value), value: options.getWidth() })),\n            React.createElement(form_row_1.FormRow, { label: \"Grid height\" },\n                React.createElement(number_input_1.NumberInput, { min: 0, onChange: (value) => options.setHeight(value), value: options.getHeight() })),\n            React.createElement(form_row_1.FormRow, { label: \"Loop\" },\n                React.createElement(select_1.Select, { onSelect: (value) => options.setLoop(value), options: LoopTypes, value: options.getLoop() })),\n            React.createElement(form_row_1.FormRow, { label: `Population (${options.getPopulation()}%)` },\n                React.createElement(range_input_1.RangeInput, { min: 0, max: 100, step: 0.1, onChange: (value) => options.setPopulation(value), value: options.getPopulation() })),\n            React.createElement(form_row_1.FormRow, { label: `Initial energy (${options.getInitialEnergy()})` },\n                React.createElement(range_input_1.RangeInput, { min: 0, max: 100, step: 1, onChange: (value) => options.setInitialEnergy(value), value: options.getInitialEnergy() }))),\n        React.createElement(row_1.Row, null,\n            React.createElement(column_1.Column, null,\n                React.createElement(button_1.Button, { width: \"100%\", onClick: () => { simulationStore.newSimulation(); UIStore.setOptionsFormOpened(false); } }, \"New simulation\")),\n            React.createElement(column_1.Column, { width: 60 },\n                React.createElement(button_1.Button, { width: \"100%\", onClick: () => UIStore.setOptionsFormOpened(!UIStore.getOptionsFormOpened()) },\n                    React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: faGear_1.faGear }))))));\n});\n\n\n//# sourceURL=webpack://evo/./src/ui/components/cards/new-simulation-card.tsx?");

/***/ }),

/***/ "./src/ui/components/flex.tsx":
/*!************************************!*\
  !*** ./src/ui/components/flex.tsx ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Flex = void 0;\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst styled_components_1 = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\nconst StyledFlex = styled_components_1.default.div `\n    display: flex;\n    flex-direction: ${props => props.direction || 'row'};\n    justify-content: ${props => props.justify || 'stretch'};\n    align-items: ${props => props.align || 'stretch'};\n    flex-wrap: ${props => props.wrap || 'nowrap'};\n    width: 100%;\n`;\nconst Flex = (props) => (React.createElement(StyledFlex, Object.assign({}, props), props.children));\nexports.Flex = Flex;\n\n\n//# sourceURL=webpack://evo/./src/ui/components/flex.tsx?");

/***/ }),

/***/ "./src/ui/components/form/form-row.tsx":
/*!*********************************************!*\
  !*** ./src/ui/components/form/form-row.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.FormRow = void 0;\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst styled_components_1 = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\nconst StyledFormRow = styled_components_1.default.div `\n    margin-bottom: 15px;\n`;\nconst StyledLabel = styled_components_1.default.label `\n    margin-bottom: 5px;\n    display: block;\n    width: 100%;\n`;\nconst FormRow = (props) => (React.createElement(StyledFormRow, null,\n    props.label && React.createElement(StyledLabel, null, props.label),\n    props.children));\nexports.FormRow = FormRow;\n\n\n//# sourceURL=webpack://evo/./src/ui/components/form/form-row.tsx?");

/***/ }),

/***/ "./src/ui/components/form/number-input.tsx":
/*!*************************************************!*\
  !*** ./src/ui/components/form/number-input.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.NumberInput = void 0;\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst styled_components_1 = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\nconst faMinus_1 = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faMinus */ \"./node_modules/@fortawesome/free-solid-svg-icons/faMinus.js\");\nconst faPlus_1 = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faPlus */ \"./node_modules/@fortawesome/free-solid-svg-icons/faPlus.js\");\nconst react_fontawesome_1 = __webpack_require__(/*! @fortawesome/react-fontawesome */ \"./node_modules/@fortawesome/react-fontawesome/index.es.js\");\nconst StyledNumberInput = styled_components_1.default.input `\n    width: 100%;\n    background: #000;\n    border: 2px solid #000;\n    padding: 10px 60px 10px 10px;\n    border-radius: 10px;\n    color: #fff;\n`;\nconst StyledButton = styled_components_1.default.button `\n    width: 20px;\n    height: 20px;\n    background: #30b47b;\n    border: 2px solid #30b47b;\n    border-radius: 100%;\n    color: #fff;\n    padding: 0;\n    font-size: 14px;\n    line-height: 1;\n    margin-left: 5px;\n`;\nconst StyledButtonDisabled = (0, styled_components_1.default)(StyledButton) `\n    opacity: 0.5;\n    cursor: default;\n`;\nconst InputWrapper = styled_components_1.default.div `\n    position: relative;\n`;\nconst ButtonsWrapper = styled_components_1.default.div `\n    position: absolute;\n    top: 11px;\n    right: 10px;\n`;\nconst NumberInput = (props) => {\n    const [value, setValue] = React.useState(props.value || 0);\n    const change = (val) => {\n        if (props.min !== undefined && val < props.min) {\n            val = props.min;\n        }\n        if (props.max !== undefined && val > props.max) {\n            val = props.max;\n        }\n        setValue(val);\n        props.onChange(val);\n    };\n    let minisComponent = React.createElement(StyledButton, { onClick: () => change(value - 1) },\n        React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: faMinus_1.faMinus }));\n    let plusComponent = React.createElement(StyledButton, { onClick: () => change(value + 1) },\n        React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: faPlus_1.faPlus }));\n    if (props.min !== undefined && props.value <= props.min) {\n        minisComponent = React.createElement(StyledButtonDisabled, null,\n            React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: faMinus_1.faMinus }));\n    }\n    if (props.max !== undefined && props.value >= props.max) {\n        plusComponent = React.createElement(StyledButtonDisabled, null,\n            React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: faPlus_1.faPlus }));\n    }\n    const onChangeInput = (value) => {\n        const numberValue = Number(value);\n        change(Number.isSafeInteger(numberValue) ? numberValue : 0);\n    };\n    return (React.createElement(InputWrapper, null,\n        React.createElement(StyledNumberInput, { type: \"text\", value: value, onChange: (e) => onChangeInput(e.target.value) }),\n        React.createElement(ButtonsWrapper, null,\n            minisComponent,\n            plusComponent)));\n};\nexports.NumberInput = NumberInput;\n\n\n//# sourceURL=webpack://evo/./src/ui/components/form/number-input.tsx?");

/***/ }),

/***/ "./src/ui/components/form/range-input.tsx":
/*!************************************************!*\
  !*** ./src/ui/components/form/range-input.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.RangeInput = void 0;\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst styled_components_1 = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\nconst StyledRange = styled_components_1.default.input `\n    width: 100%;\n`;\nconst RangeInput = (props) => (React.createElement(StyledRange, { type: \"range\", min: props.min, max: props.max, step: props.step, value: props.value, onChange: e => props.onChange(Number(e.target.value)) }));\nexports.RangeInput = RangeInput;\n\n\n//# sourceURL=webpack://evo/./src/ui/components/form/range-input.tsx?");

/***/ }),

/***/ "./src/ui/components/form/select.tsx":
/*!*******************************************!*\
  !*** ./src/ui/components/form/select.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Select = void 0;\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst styled_components_1 = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\nconst StyledSelect = styled_components_1.default.select `\n    width: 100%;\n    background: #000;\n    border: 2px solid #000;\n    padding: 10px 10px;\n    border-radius: 10px;\n    color: #fff;\n`;\nconst Select = (props) => (React.createElement(StyledSelect, { onChange: e => props.onSelect(e.target.value), value: props.value }, props.options.map(({ value, label }, i) => React.createElement(\"option\", { value: value, key: i }, label))));\nexports.Select = Select;\n\n\n//# sourceURL=webpack://evo/./src/ui/components/form/select.tsx?");

/***/ }),

/***/ "./src/ui/components/layout/column.tsx":
/*!*********************************************!*\
  !*** ./src/ui/components/layout/column.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Column = void 0;\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst styled_components_1 = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\nconst StyledColumn = styled_components_1.default.div `\n    ${({ width, size }) => !width && !size ? 'flex-grow: 1;' : null}\n    ${({ width, size }) => !width && size ? `width: calc(${size / 12 * 100}%);` : null}\n    ${({ width }) => width ? `width: ${width}px;` : null}\n`;\nconst Column = (props) => (React.createElement(StyledColumn, Object.assign({}, props), props.children));\nexports.Column = Column;\n\n\n//# sourceURL=webpack://evo/./src/ui/components/layout/column.tsx?");

/***/ }),

/***/ "./src/ui/components/layout/row.tsx":
/*!******************************************!*\
  !*** ./src/ui/components/layout/row.tsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Row = void 0;\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst styled_components_1 = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\nconst StyledRow = styled_components_1.default.div `\n    display: flex;\n    margin-left: -${props => props.gutter / 2 + 'px'};\n    margin-right: -${props => props.gutter / 2 + 'px'};\n    flex-wrap: wrap;\n\n    & > * {\n        padding: 0 ${props => props.gutter / 2 + 'px'};\n    }\n`;\nconst Row = (props) => (React.createElement(StyledRow, { gutter: props.gutter || 10 }, props.children));\nexports.Row = Row;\n\n\n//# sourceURL=webpack://evo/./src/ui/components/layout/row.tsx?");

/***/ }),

/***/ "./src/ui/components/sidebar.tsx":
/*!***************************************!*\
  !*** ./src/ui/components/sidebar.tsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.SidebarComponent = void 0;\nconst mobx_react_lite_1 = __webpack_require__(/*! mobx-react-lite */ \"./node_modules/mobx-react-lite/es/index.js\");\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst styled_components_1 = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\nconst controls_card_1 = __webpack_require__(/*! ./cards/controls-card */ \"./src/ui/components/cards/controls-card.tsx\");\nconst new_simulation_card_1 = __webpack_require__(/*! ./cards/new-simulation-card */ \"./src/ui/components/cards/new-simulation-card.tsx\");\nconst StyledSidebar = styled_components_1.default.div `\r\n    width: 300px;\r\n    padding: 10px;\r\n    overflow-y: scroll;\r\n`;\nexports.SidebarComponent = (0, mobx_react_lite_1.observer)(() => {\n    return (React.createElement(StyledSidebar, null,\n        React.createElement(controls_card_1.ControlsCard, null),\n        React.createElement(new_simulation_card_1.NewSimulationCard, null)));\n});\n\n\n//# sourceURL=webpack://evo/./src/ui/components/sidebar.tsx?");

/***/ }),

/***/ "./src/ui/components/simulation.tsx":
/*!******************************************!*\
  !*** ./src/ui/components/simulation.tsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.SimulationComponent = void 0;\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst react_1 = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst mobx_react_lite_1 = __webpack_require__(/*! mobx-react-lite */ \"./node_modules/mobx-react-lite/es/index.js\");\nconst use_size_1 = __webpack_require__(/*! ../hooks/use-size */ \"./src/ui/hooks/use-size.tsx\");\nconst context_1 = __webpack_require__(/*! ../context */ \"./src/ui/context.ts\");\nconst styled_components_1 = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\nconst StyledSimulation = styled_components_1.default.div `\n    flex: 1;\n    height: 100%;\n    overflow: hidden;\n`;\nexports.SimulationComponent = (0, mobx_react_lite_1.observer)(() => {\n    const canvasRef = (0, react_1.useRef)();\n    const [width, height, containerRef] = (0, use_size_1.useSize)();\n    const { simulationStore } = (0, react_1.useContext)(context_1.AppContext);\n    (0, react_1.useEffect)(() => {\n        simulationStore.setCanvas(canvasRef.current);\n        return () => { };\n    }, [canvasRef.current]);\n    return (React.createElement(StyledSimulation, { ref: containerRef },\n        React.createElement(\"canvas\", { width: width, height: height, ref: canvasRef })));\n});\n\n\n//# sourceURL=webpack://evo/./src/ui/components/simulation.tsx?");

/***/ }),

/***/ "./src/ui/context.ts":
/*!***************************!*\
  !*** ./src/ui/context.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.AppContext = void 0;\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nexports.AppContext = React.createContext(null);\n\n\n//# sourceURL=webpack://evo/./src/ui/context.ts?");

/***/ }),

/***/ "./src/ui/hooks/use-size.tsx":
/*!***********************************!*\
  !*** ./src/ui/hooks/use-size.tsx ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.useSize = void 0;\nconst react_1 = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nfunction useSize() {\n    const [width, setWidth] = (0, react_1.useState)(0);\n    const [height, setHeight] = (0, react_1.useState)(0);\n    const [unobserve, setUnobserve] = (0, react_1.useState)();\n    const ref = (0, react_1.useCallback)((node) => {\n        if (node) {\n            setWidth(node.getBoundingClientRect().width);\n            setHeight(node.getBoundingClientRect().height);\n            const resizeObserver = new ResizeObserver((entries) => {\n                for (let entry of entries) {\n                    setWidth(entry.contentRect.width);\n                    setHeight(entry.contentRect.height);\n                    break;\n                }\n            });\n            resizeObserver.observe(node);\n            setUnobserve(() => () => resizeObserver.disconnect());\n        }\n    }, []);\n    (0, react_1.useEffect)(() => unobserve, [unobserve]);\n    return [width, height, ref];\n}\nexports.useSize = useSize;\n\n\n//# sourceURL=webpack://evo/./src/ui/hooks/use-size.tsx?");

/***/ }),

/***/ "./src/ui/storage.ts":
/*!***************************!*\
  !*** ./src/ui/storage.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.saveOptions = exports.loadOptions = void 0;\nconst optionsKey = 'evo_simulation_options';\nfunction loadOptions() {\n    return loadObject(optionsKey);\n}\nexports.loadOptions = loadOptions;\nfunction saveOptions(options) {\n    saveObject(optionsKey, options);\n}\nexports.saveOptions = saveOptions;\nfunction loadObject(key) {\n    let json = localStorage.getItem(key);\n    let result = {};\n    if (typeof json === 'string') {\n        const parsedOptions = JSON.parse(json);\n        if (typeof parsedOptions === 'object') {\n            result = parsedOptions;\n        }\n    }\n    return result;\n}\nfunction saveObject(key, object) {\n    localStorage.setItem(key, JSON.stringify(object));\n}\n\n\n//# sourceURL=webpack://evo/./src/ui/storage.ts?");

/***/ }),

/***/ "./src/ui/stores/simulation-options-store.ts":
/*!***************************************************!*\
  !*** ./src/ui/stores/simulation-options-store.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.SimulationOptionsStore = void 0;\nconst mobx_1 = __webpack_require__(/*! mobx */ \"./node_modules/mobx/dist/mobx.esm.js\");\nconst grid_loop_type_1 = __webpack_require__(/*! ../../simulation/types/grid-loop-type */ \"./src/simulation/types/grid-loop-type.ts\");\nclass SimulationOptionsStore {\n    constructor(options) {\n        this.width = options.width || 100;\n        this.height = options.height || 50;\n        this.population = options.population || 1;\n        this.loop = options.loop || grid_loop_type_1.GridLoopType.NONE;\n        this.initialEnergy = options.initialEnergy || 70;\n        (0, mobx_1.makeObservable)(this);\n    }\n    getWidth() {\n        return this.width;\n    }\n    setWidth(width) {\n        this.width = width;\n    }\n    getHeight() {\n        return this.height;\n    }\n    setHeight(height) {\n        this.height = height;\n    }\n    getLoop() {\n        return this.loop;\n    }\n    setLoop(loop) {\n        this.loop = loop;\n    }\n    getPopulation() {\n        return this.population;\n    }\n    setPopulation(population) {\n        this.population = population;\n    }\n    getInitialEnergy() {\n        return this.initialEnergy;\n    }\n    setInitialEnergy(initialEnergy) {\n        this.initialEnergy = initialEnergy;\n    }\n    toGameOptions() {\n        return {\n            width: this.width,\n            height: this.height,\n            loop: this.loop,\n            population: this.population,\n            initialEnergy: this.initialEnergy,\n        };\n    }\n}\n__decorate([\n    mobx_1.observable\n], SimulationOptionsStore.prototype, \"width\", void 0);\n__decorate([\n    mobx_1.observable\n], SimulationOptionsStore.prototype, \"height\", void 0);\n__decorate([\n    mobx_1.observable\n], SimulationOptionsStore.prototype, \"loop\", void 0);\n__decorate([\n    mobx_1.observable\n], SimulationOptionsStore.prototype, \"population\", void 0);\n__decorate([\n    mobx_1.observable\n], SimulationOptionsStore.prototype, \"initialEnergy\", void 0);\n__decorate([\n    mobx_1.action\n], SimulationOptionsStore.prototype, \"setWidth\", null);\n__decorate([\n    mobx_1.action\n], SimulationOptionsStore.prototype, \"setHeight\", null);\n__decorate([\n    mobx_1.action\n], SimulationOptionsStore.prototype, \"setLoop\", null);\n__decorate([\n    mobx_1.action\n], SimulationOptionsStore.prototype, \"setPopulation\", null);\n__decorate([\n    mobx_1.action\n], SimulationOptionsStore.prototype, \"setInitialEnergy\", null);\nexports.SimulationOptionsStore = SimulationOptionsStore;\n\n\n//# sourceURL=webpack://evo/./src/ui/stores/simulation-options-store.ts?");

/***/ }),

/***/ "./src/ui/stores/simulation-store.ts":
/*!*******************************************!*\
  !*** ./src/ui/stores/simulation-store.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.SimulationStore = void 0;\nconst mobx_1 = __webpack_require__(/*! mobx */ \"./node_modules/mobx/dist/mobx.esm.js\");\nconst canvas_renderer_1 = __webpack_require__(/*! ../../render/canvas-renderer */ \"./src/render/canvas-renderer.ts\");\nconst common_simulation_1 = __webpack_require__(/*! ../../simulation/common-simulation */ \"./src/simulation/common-simulation.ts\");\nconst worker_simulation_1 = __webpack_require__(/*! ../../simulation/worker-simulation */ \"./src/simulation/worker-simulation.ts\");\nconst storage_1 = __webpack_require__(/*! ../storage */ \"./src/ui/storage.ts\");\nconst simulation_options_store_1 = __webpack_require__(/*! ./simulation-options-store */ \"./src/ui/stores/simulation-options-store.ts\");\nclass SimulationStore {\n    constructor(options) {\n        this.rendererTheme = 'default';\n        this.paused = true;\n        (0, mobx_1.makeObservable)(this);\n        this.options = new simulation_options_store_1.SimulationOptionsStore(options);\n        this.newSimulation();\n    }\n    newSimulation() {\n        this.simulation && this.simulation.terminate();\n        this.paused = true;\n        this.simulation =  false ? 0 : new common_simulation_1.CommonSimulation(this.options.toGameOptions());\n        this.newRenderer();\n        // this.newRenderer();\n        (0, storage_1.saveOptions)(this.options.toGameOptions());\n    }\n    setCanvas(canvas) {\n        if (!this.canvas) {\n            this.canvas = canvas;\n            this.newRenderer();\n        }\n    }\n    changeRenderTheme(theme) {\n        this.rendererTheme = theme;\n        if (this.renderer) {\n            this.renderer.setRenderStrategy(theme);\n        }\n    }\n    getRenderTheme() {\n        return this.rendererTheme;\n    }\n    pause() {\n        this.paused = true;\n        this.simulation.pause();\n    }\n    start() {\n        this.paused = false;\n        this.simulation.start();\n    }\n    isPaused() {\n        return this.paused;\n    }\n    makeStep() {\n        this.simulation.step();\n    }\n    getOptions() {\n        return this.options;\n    }\n    newRenderer() {\n        if (this.simulation && this.canvas) {\n            this.renderer = new canvas_renderer_1.CanvasRenderer(this.canvas, this.options.getWidth(), this.options.getHeight(), this.rendererTheme);\n            this.simulation.addEventListener('state', (ev) => {\n                this.renderer.setState(ev);\n            });\n            this.simulation.addEventListener('step', (ev) => {\n                this.simulation.requestState(['energy']);\n            });\n            this.simulation.requestState(['energy']);\n        }\n    }\n}\n__decorate([\n    mobx_1.observable\n], SimulationStore.prototype, \"rendererTheme\", void 0);\n__decorate([\n    mobx_1.observable\n], SimulationStore.prototype, \"paused\", void 0);\n__decorate([\n    mobx_1.observable\n], SimulationStore.prototype, \"options\", void 0);\n__decorate([\n    mobx_1.action\n], SimulationStore.prototype, \"newSimulation\", null);\n__decorate([\n    mobx_1.action\n], SimulationStore.prototype, \"changeRenderTheme\", null);\n__decorate([\n    mobx_1.action\n], SimulationStore.prototype, \"pause\", null);\n__decorate([\n    mobx_1.action\n], SimulationStore.prototype, \"start\", null);\nexports.SimulationStore = SimulationStore;\n\n\n//# sourceURL=webpack://evo/./src/ui/stores/simulation-store.ts?");

/***/ }),

/***/ "./src/ui/stores/ui-store.ts":
/*!***********************************!*\
  !*** ./src/ui/stores/ui-store.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.UIStore = void 0;\nconst mobx_1 = __webpack_require__(/*! mobx */ \"./node_modules/mobx/dist/mobx.esm.js\");\nclass UIStore {\n    constructor() {\n        this.optionsFormOpened = false;\n        (0, mobx_1.makeObservable)(this);\n    }\n    getOptionsFormOpened() {\n        return this.optionsFormOpened;\n    }\n    setOptionsFormOpened(value) {\n        this.optionsFormOpened = value;\n    }\n}\n__decorate([\n    mobx_1.observable\n], UIStore.prototype, \"optionsFormOpened\", void 0);\n__decorate([\n    mobx_1.action\n], UIStore.prototype, \"setOptionsFormOpened\", null);\nexports.UIStore = UIStore;\n\n\n//# sourceURL=webpack://evo/./src/ui/stores/ui-store.ts?");

/***/ }),

/***/ "./src/ui/styles.tsx":
/*!***************************!*\
  !*** ./src/ui/styles.tsx ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.GlobalStyle = void 0;\nconst styled_components_1 = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\nexports.GlobalStyle = (0, styled_components_1.createGlobalStyle) `\n    *,\n    *::before,\n    *::after {\n        box-sizing: border-box;\n    }\n\n    body {\n        margin: 0;\n        font-family: monospace;\n        font-size: 16px;\n        text-transform: uppercase;\n    }\n\n    input,\n    button,\n    select,\n    optgroup,\n    textarea {\n        margin: 0;\n        font-family: inherit;\n        font-size: inherit;\n        line-height: inherit;\n    }\n\n    button {\n        cursor: pointer;\n    }\n`;\n\n\n//# sourceURL=webpack://evo/./src/ui/styles.tsx?");

/***/ }),

/***/ "./src/render/renderer.worker.ts":
/*!***************************************!*\
  !*** ./src/render/renderer.worker.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Worker_fn)\n/* harmony export */ });\nfunction Worker_fn() {\n  return new Worker(__webpack_require__.p + \"renderer.worker.worker.js\");\n}\n\n\n//# sourceURL=webpack://evo/./src/render/renderer.worker.ts?");

/***/ }),

/***/ "./src/simulation/simulation.worker.ts":
/*!*********************************************!*\
  !*** ./src/simulation/simulation.worker.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Worker_fn)\n/* harmony export */ });\nfunction Worker_fn() {\n  return new Worker(__webpack_require__.p + \"simulation.worker.worker.js\");\n}\n\n\n//# sourceURL=webpack://evo/./src/simulation/simulation.worker.ts?");

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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkevo"] = self["webpackChunkevo"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/index.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;