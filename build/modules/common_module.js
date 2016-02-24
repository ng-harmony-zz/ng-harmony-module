import angular from "angular";
import router from "angular-ui-router";

export class Module {
    constructor(name, dependencies, routes) {
        this.name = name;
        this.bootstrap();
        this.dependencies = dependencies || [];
        this.dependencies.push("ui.router");
        angular.module(name, this.dependencies);
        if (typeof routes !== "undefined" && routes !== null) {
            this.routing(routes);
        }
    }
    get module() {
        return angular.module(this.name);
    }
    bootstrap() {
        angular.element(document).ready(() => {
            angular.bootstrap(document, [this.name]);
        });
    }
    routing(routes) {
        this.routes = routes;
        this.config(($stateProvider, $urlRouterProvider) => {
            if (typeof routes.default !== "undefined" && routes.default !== null) {
                $urlRouterProvider.otherwise(routes.default);
            }
            for (let [i, route] of Object.keys(routes).entries()) {
                if (route === "default") {
                    continue;
                }
                $stateProvider.state(route, routes[route]);
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

//# sourceMappingURL=common_module.js.map