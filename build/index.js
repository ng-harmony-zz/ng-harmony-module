    import angular from "angular";
    import router from "angular-ui-router";

    export class Module {
        constructor(name, dependencies, routes) {
            this.name = name;
            this.dependencies = dependencies;
            this.dependencies.push(router);
            this.module = angular.module(name, dependencies);
            if (typeof routes !== "undefined" && routes !== null) {
            	this.routing(routes);
            }
        }
        bootstrap() {
            let that = this;
            angular.element(document).ready(() => {
                angular.bootstrap(document, [that.name]);
            });
        }
        routing(routes) {
            this.routes = routes;
            this.module.config(($stateProvider, $urlRouterProvider) => {
                if (typeof routes.default !== "undefined" && routes.default !== null) {
                    $urlRouterProvider.otherwise(routes.default);
                }
                for (let [i, route] of Object.getOwnPropertyNames(routes).entries()) {
                    let resolve = {},
                        state = routes[route];
                    if (typeof state.resolve !== "undefined" && state.resolve !== null) {
                        for (let [j, stateParam] of Object.getOwnPropertyNames(state.resolve).entries()) {
                            resolve[stateParam] = ["$stateParams", ((_stateParam) => {
                                return ($params) => {
                                    return $params[state.resolve[_stateParam]];
                                }
                            })(stateParam)];
                        }
                    }
                    let config = state;
                    config.resolve = resolve;
                    $stateProvider.state(route, config);
                }
            });
        }
        config(foo) {
            if (typeof this.module === "undefinded" || this.module === null) {
                throw "Cannot access module: undefined!";
            }
            this.module.config(foo);
        }
    }