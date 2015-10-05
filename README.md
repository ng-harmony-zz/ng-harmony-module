# Ng-harmony-ioc
=========================

[![Join the chat at https://gitter.im/ng-harmony/ng-harmony](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ng-harmony/ng_harmony?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Concept

An AppManager for ng-harmony angular apps

Use it in conjunction with

* [literate-programming](http://npmjs.org/packages/literate-programming "click for npm-package-homepage") to write markdown-flavored literate JS, HTML and CSS
* [jspm](https://www.npmjs.com/package/jspm "click for npm-package-homepage") for a nice solution to handle npm-modules with ES6-Module-Format-Loading ...

* * *

## Files

This serves as literate-programming compiler-directive

[./dist/raw/ng_harmony.js](#Compilation "save:")

## Compilation

Dependency Imports

```javascript
    import angular from "angular";
    import router from "angular-ui-router";
    import { Ctrl } from "ng-harmony/ng-harmony";
```

The _Module_ klass serves as little convenience wrapper so one can write tastier code

```javascript
    export class Module {
        constructor(name, dependencies, routes) {
            this.name = name;
            this.dependencies = dependencies;
            this.module = angular.module(name, dependencies);
            this.routing(routes);
        }
        bootstrap() {
          angular.element(document).ready(() => {
              angular.bootstrap(document, [this.name]);
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
```

The _StateCtrl_ is a very basic Event-Handler that serves as Route-Ctrl for handling state-inter-dependencies of the routes' subsequent components ...

```javascript
    export class StateCtrl extends Ctrl {
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
```

## USAGE

Please create routing for each of your features/modules.
Then kick off the module using the Module-klass's methods.

Example Routing:
```javascript
    {
        "stateName": {
            "url": "/url/:path/:id",
            "controller": "MyController",
            "template": require("/path/to/template"),
            "resolve": {
                "selection": "path",
                "id": "id"
            }
        }
    }
```

## CHANGELOG

*0.1.0*: Initial Features: Basic Module creation and routing using ui-router, convenience config accessor + Basic Statemachine
*0.1.1*: Revamping the Module class as actual instance-class, not static ... wouldn't work otherwise ;), adding bootstrapping
*0.1.2*: Rethinking the workflow to literate programming and md files that share different contents (js, sass, jade ...), changing routing
