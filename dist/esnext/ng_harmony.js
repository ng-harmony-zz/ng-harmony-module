import angular from "angular";
import router from "angular-ui-router";
import {
    Ctrl
}
from "ng-harmony";
class Module {
    constructor() {}
    static init(name, dependencies) {
        this.name = name;
        this.dependencies = dependencies;
        this.module = angular.module(name, dependencies);
    }
    static routing(routes) {
        this.routes = routes;
        this.module.config(($stateProvider, $urlRouterProvider) => {
            if (typeof routes.default !== "undefined" && routes.default !== null) {
                $urlRouterProvider.otherwise(routes.default);
            }
            for (let [i, state] of routes.entries()) {
                let resolve = {};
                if (typeof state.config.resolve !== "undefined" && state.config.resolve !== null) {
                    for (let [injectee, stateParam] of this.iterate(state.config.resolve)) {
                        resolve[injectee] = ["$stateParams", ($params) => {
                            return $params[stateParam];
                        }];
                    }
                }
                state.config.resolve = resolve;
                let config = state.config;
                $stateProvider.state(state.name, state.config);
            }
        });
    }
    static config(foo) {
        if (typeof this.module === "undefinded" || this.module === null) {
            throw "Cannot access module: undefined!";
        }
        this.module.config(foo);
    }
}
class StateCtrl extends Ctrl {
    constructor(...args) {
        super(...args);
        this.$scope.$on("stateRequest", (component, state, mode, ...args) => {
            this.broadcast(component, state, mode, ...args);
        });
    }
    broadcast(component, state, mode, ...args) {
        this.$scope.$broadcast(`${component}::${state}::${mode}`, ...args);
    }
}