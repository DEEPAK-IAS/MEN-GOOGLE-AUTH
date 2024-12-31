"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([["vendor"],{

/***/ "./src/js/utils/Validator.js":
/*!***********************************!*\
  !*** ./src/js/utils/Validator.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Validator {\n  NUMERIC_CHARACTER_REGEX_PATTERN = /\\d/;\n  SPECIAL_CHARACTER_REGEX_PATTERN = /[^a-zA-Z0-9\\s.]/;\n  EMAIL_REGEX_PATTERN = /^[\\w.-]+@[a-zA-Z\\d.-]+\\.[a-zA-Z]{2,}$/;\n  UPPERCASE_REGEX_PATTERN = /[A-Z]/;\n  isValidName(name) {\n    if (name == \"\") {\n      return {\n        isValid: false,\n        message: \"Cannot be empty\"\n      };\n    }\n    if (this.NUMERIC_CHARACTER_REGEX_PATTERN.test(name)) {\n      return {\n        isValid: false,\n        message: \"Cannot contain numeric characters\"\n      };\n    }\n    if (this.SPECIAL_CHARACTER_REGEX_PATTERN.test(name)) {\n      return {\n        isValid: false,\n        message: \"Cannot contain special characters\"\n      };\n    }\n    return {\n      isValid: true\n    };\n  }\n  isValidEmail(email) {\n    if (email == \"\") {\n      return {\n        isValid: false,\n        message: \"Email cannot be empty\"\n      };\n    }\n    if (!this.EMAIL_REGEX_PATTERN.test(email)) {\n      return {\n        isValid: false,\n        message: \"Invalid email address.\"\n      };\n    }\n    return {\n      isValid: true\n    };\n  }\n  isValidPassword(password) {\n    if (password == \"\") {\n      return {\n        isValid: false,\n        message: \"Password cannot be empty\"\n      };\n    }\n    if (!this.NUMERIC_CHARACTER_REGEX_PATTERN.test(password)) {\n      return {\n        isValid: false,\n        message: \"Password must have one numeric character\"\n      };\n    }\n    if (!this.SPECIAL_CHARACTER_REGEX_PATTERN.test(password)) {\n      return {\n        isValid: false,\n        message: \"Password must have one special character\"\n      };\n    }\n    if (!this.UPPERCASE_REGEX_PATTERN.test(password)) {\n      return {\n        isValid: false,\n        message: \"Password must have one uppercase character\"\n      };\n    }\n    if (password.length < 8) {\n      return {\n        isValid: false,\n        message: \"Password must be 8 characters\"\n      };\n    }\n    return {\n      isValid: true\n    };\n  }\n  isValidConfirmPassword(password, confirmPassword) {\n    if (confirmPassword == \"\") {\n      return {\n        isValid: false,\n        message: \"Confirm password cannot be empty\"\n      };\n    }\n    if (password != confirmPassword) {\n      return {\n        isValid: false,\n        message: \"Password and Confirm Password do not match\"\n      };\n    }\n    return {\n      isValid: true\n    };\n  }\n}\nconst validator = new Validator();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validator);\n\n//# sourceURL=webpack://client/./src/js/utils/Validator.js?");

/***/ }),

/***/ "./src/js/utils/common.js":
/*!********************************!*\
  !*** ./src/js/utils/common.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addValidationListeners: () => (/* binding */ addValidationListeners)\n/* harmony export */ });\nfunction addValidationListeners(inputElement, validationFunction) {\n  if (inputElement == null || inputElement == undefined || validationFunction == null || validationFunction == undefined) {\n    throw new Error(\"Given inputElement or function is undefined or null\");\n  }\n  inputElement.addEventListener(\"keyup\", validationFunction);\n  inputElement.addEventListener(\"change\", validationFunction);\n}\n\n//# sourceURL=webpack://client/./src/js/utils/common.js?");

/***/ }),

/***/ "./src/js/utils/userInterface.js":
/*!***************************************!*\
  !*** ./src/js/utils/userInterface.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   setBorder: () => (/* binding */ setBorder),\n/* harmony export */   setMessage: () => (/* binding */ setMessage),\n/* harmony export */   toggleIcon: () => (/* binding */ toggleIcon),\n/* harmony export */   toggleType: () => (/* binding */ toggleType),\n/* harmony export */   validateConfirmPasswordAndUpdateUI: () => (/* binding */ validateConfirmPasswordAndUpdateUI),\n/* harmony export */   validateEmailAndUpdateUI: () => (/* binding */ validateEmailAndUpdateUI),\n/* harmony export */   validateNameAndUpdateUI: () => (/* binding */ validateNameAndUpdateUI),\n/* harmony export */   validatePasswordAndUpdateUI: () => (/* binding */ validatePasswordAndUpdateUI)\n/* harmony export */ });\n/* harmony import */ var _Validator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Validator.js */ \"./src/js/utils/Validator.js\");\n\nfunction toggleIcon(imgElement, oldPath, newPath) {\n  if (imgElement == undefined || imgElement == null) {\n    throw new Error(\"Given imgElement is null or undefined\");\n  }\n  if (imgElement.src.match(oldPath)) imgElement.src = newPath;else imgElement.src = oldPath;\n}\nfunction toggleType(element, oldType, newType) {\n  if (element == undefined || element == null) {\n    throw new Error(\"Given element is null or undefined\");\n  }\n  if (element.type.match(oldType)) element.type = newType;else element.type = oldType;\n}\nfunction setMessage(element, message) {\n  if (element == null || element == undefined) {\n    throw new Error(\"Given element is null or undefined\");\n  }\n  element.innerText = message;\n}\nfunction setBorder(element, cssValue) {\n  if (element == null || element == undefined) {\n    throw new Error(\"Given element is null or undefined\");\n  }\n  element.style.border = cssValue;\n}\nfunction validateNameAndUpdateUI(e) {\n  const name = e.target.value;\n  const {\n    isValid,\n    message\n  } = _Validator_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isValidName(name);\n  const errorElement = e.target.parentElement.querySelector(\".err-element\");\n  if (!isValid) {\n    setBorder(e.target, \"2px solid red\");\n    setMessage(errorElement, `${message} . . . .`);\n    return false;\n  }\n  setBorder(e.target, \"2px solid grey\");\n  setMessage(errorElement, \"\");\n  return true;\n}\nfunction validateEmailAndUpdateUI(e) {\n  const email = e.target.value;\n  const {\n    isValid,\n    message\n  } = _Validator_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isValidEmail(email);\n  const errorElement = e.target.parentElement.querySelector(\".err-element\");\n  if (!isValid) {\n    setBorder(e.target, \"2px solid red\");\n    setMessage(errorElement, `${message} . . . .`);\n    return false;\n  }\n  setBorder(e.target, \"2px solid grey\");\n  setMessage(errorElement, \"\");\n  return true;\n}\nfunction validatePasswordAndUpdateUI(e) {\n  const password = e.target.value;\n  const {\n    isValid,\n    message\n  } = _Validator_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isValidPassword(password);\n  const errorElement = e.target.parentElement.querySelector(\".err-element\");\n  if (!isValid) {\n    setBorder(e.target, \"2px solid red\");\n    setMessage(errorElement, `${message} ....`);\n    return false;\n  }\n  setBorder(e.target, \"2px solid grey\");\n  setMessage(errorElement, \"\");\n  return true;\n}\nfunction validateConfirmPasswordAndUpdateUI(e, password) {\n  const confirmPassword = e.target.value;\n  const {\n    isValid,\n    message\n  } = _Validator_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isValidConfirmPassword(password, confirmPassword);\n  const errorElement = e.target.parentElement.querySelector(\".err-element\");\n  if (!isValid) {\n    setBorder(e.target, \"2px solid red\");\n    setMessage(errorElement, `${message} ....`);\n    return false;\n  }\n  setBorder(e.target, \"2px solid grey\");\n  setMessage(errorElement, \"\");\n  return true;\n}\n\n//# sourceURL=webpack://client/./src/js/utils/userInterface.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://client/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (url, options) {\n  if (!options) {\n    options = {};\n  }\n  if (!url) {\n    return url;\n  }\n  url = String(url.__esModule ? url.default : url);\n\n  // If url is already wrapped in quotes, remove them\n  if (/^['\"].*['\"]$/.test(url)) {\n    url = url.slice(1, -1);\n  }\n  if (options.hash) {\n    url += options.hash;\n  }\n\n  // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n  if (/[\"'() \\t\\n]|(%20)/.test(url) || options.needQuotes) {\n    return \"\\\"\".concat(url.replace(/\"/g, '\\\\\"').replace(/\\n/g, \"\\\\n\"), \"\\\"\");\n  }\n  return url;\n};\n\n//# sourceURL=webpack://client/./node_modules/css-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://client/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://client/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://client/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://client/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://client/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://client/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://client/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/assets/fonts/Poppins-Medium.ttf":
/*!*********************************************!*\
  !*** ./src/assets/fonts/Poppins-Medium.ttf ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"assets/Poppins-Medium.ttf\";\n\n//# sourceURL=webpack://client/./src/assets/fonts/Poppins-Medium.ttf?");

/***/ }),

/***/ "./src/assets/images/google-icon.png":
/*!*******************************************!*\
  !*** ./src/assets/images/google-icon.png ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"assets/google-icon.png\";\n\n//# sourceURL=webpack://client/./src/assets/images/google-icon.png?");

/***/ }),

/***/ "./src/assets/images/icons/hide.png":
/*!******************************************!*\
  !*** ./src/assets/images/icons/hide.png ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"assets/hide.png\";\n\n//# sourceURL=webpack://client/./src/assets/images/icons/hide.png?");

/***/ }),

/***/ "./src/assets/images/icons/view.png":
/*!******************************************!*\
  !*** ./src/assets/images/icons/view.png ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"assets/view.png\";\n\n//# sourceURL=webpack://client/./src/assets/images/icons/view.png?");

/***/ })

}]);