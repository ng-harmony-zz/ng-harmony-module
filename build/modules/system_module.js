import angular from "angular";
import router from "angular-route";

export class Module {
    constructor(name, dependencies, routes) {
        this.name = name;
        this.dependencies = dependencies || [];
        this.dependencies.push("ng-route");
        angular.module(this.name, this.dependencies);
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
        this.config($routeProvider => {
            if (typeof routes.default !== "undefined" && routes.default !== null) {
                $routeProvider.when("/", routes.default);
                $routeProvider.otherwise(routes.default);
            }
            for (let [i, route] of Object.keys(routes).entries()) {
                if (route === "default") {
                    continue;
                }
                $routeProvider.when(route, routes[route]);
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

//# sourceMappingURL=system_module.js.map