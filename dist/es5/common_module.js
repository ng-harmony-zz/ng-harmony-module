"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _angular = require("angular");

var _angular2 = _interopRequireWildcard(_angular);

var _router = require("angular-ui-router");

var _router2 = _interopRequireWildcard(_router);

var _Ctrl2 = require("ng-harmony");

var Module = (function () {
    function Module() {
        _classCallCheck(this, Module);
    }

    _createClass(Module, null, [{
        key: "init",
        value: function init(name, dependencies) {
            this.name = name;
            this.dependencies = dependencies;
            this.module = _angular2["default"].module(name, dependencies);
        }
    }, {
        key: "routing",
        value: function routing(routes) {
            var _this = this;

            this.routes = routes;
            this.module.config(function ($stateProvider, $urlRouterProvider) {
                if (typeof routes["default"] !== "undefined" && routes["default"] !== null) {
                    $urlRouterProvider.otherwise(routes["default"]);
                }
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = routes.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _step$value = _slicedToArray(_step.value, 2);

                        var i = _step$value[0];
                        var state = _step$value[1];

                        var resolve = {};
                        if (typeof state.config.resolve !== "undefined" && state.config.resolve !== null) {
                            var _iteratorNormalCompletion2 = true;
                            var _didIteratorError2 = false;
                            var _iteratorError2 = undefined;

                            try {
                                var _loop = function () {
                                    _step2$value = _slicedToArray(_step2.value, 2);
                                    var injectee = _step2$value[0];
                                    var stateParam = _step2$value[1];

                                    resolve[injectee] = ["$stateParams", function ($params) {
                                        return $params[stateParam];
                                    }];
                                };

                                for (var _iterator2 = _this.iterate(state.config.resolve)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                    var _step2$value;

                                    _loop();
                                }
                            } catch (err) {
                                _didIteratorError2 = true;
                                _iteratorError2 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                                        _iterator2["return"]();
                                    }
                                } finally {
                                    if (_didIteratorError2) {
                                        throw _iteratorError2;
                                    }
                                }
                            }
                        }
                        state.config.resolve = resolve;
                        var config = state.config;
                        $stateProvider.state(state.name, state.config);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator["return"]) {
                            _iterator["return"]();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            });
        }
    }, {
        key: "config",
        value: function config(foo) {
            if (typeof this.module === "undefinded" || this.module === null) {
                throw "Cannot access module: undefined!";
            }
            this.module.config(foo);
        }
    }]);

    return Module;
})();

var StateCtrl = (function (_Ctrl) {
    function StateCtrl() {
        var _this2 = this;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _classCallCheck(this, StateCtrl);

        _get(Object.getPrototypeOf(StateCtrl.prototype), "constructor", this).apply(this, args);
        this.$scope.$on("stateRequest", function (component, state, mode) {
            for (var _len2 = arguments.length, args = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
                args[_key2 - 3] = arguments[_key2];
            }

            _this2.broadcast.apply(_this2, [component, state, mode].concat(args));
        });
    }

    _inherits(StateCtrl, _Ctrl);

    _createClass(StateCtrl, [{
        key: "broadcast",
        value: function broadcast(component, state, mode) {
            var _$scope;

            for (var _len3 = arguments.length, args = Array(_len3 > 3 ? _len3 - 3 : 0), _key3 = 3; _key3 < _len3; _key3++) {
                args[_key3 - 3] = arguments[_key3];
            }

            (_$scope = this.$scope).$broadcast.apply(_$scope, ["" + component + "::" + state + "::" + mode].concat(args));
        }
    }]);

    return StateCtrl;
})(_Ctrl2.Ctrl);

//# sourceMappingURL=common_module.js.map