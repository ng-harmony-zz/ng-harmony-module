![Harmony = 6 + 7;](src/logo.png "Harmony - Fire in my eyes")

#CHECK OUT THE NEW DEMO
[ng-harmony-demo](http://www.github.com/ng-harmony/ng-harmony-demo)

## Synopsis

Kicking off your AngularJS Project in ES.Next Style

## Code Example

```javascript
import { EventedController as Ctrl } from "ng-harmony";
import { Component, Controller, Loggging, Evented } from "ng-harmony-decorator";
```

We can use this lib in such a way *[...]*

```javascript
@Component({
    module: "compucorp",
    selector: "mediaitem",
    restrict: "E",
    replace: true,
    controller: "MediaItemCtrl",
    template: MediaItemTpl
})
@Controller({
    module: "compucorp",
    name: "MediaItemCtrl",
    controllerAs: "MediaItem",
})
@Logging({
    loggerName: "MediaItemLogger",
    ...Config
})
export class MediaItemCtrl extends Ctrl {
    constructor(...args) {
        super(...args);
        this.$scope.albumcardVisible = false;
        this.$scope.artistcardVisible = false;
        this.$scope.$on("change", this.handleEvent.bind(this));
    }

    handleEvent (ev, { scope, triggerFn, triggerTokens }) {
        this.log({
            level: "info",
            msg: "handlingChildEvent"
        });
        if (scope._name.fn === "ArtistCardCtrl" && triggerTokens.type === "click") {
            this.$scope.artistcardVisible = false;
        } else if (scope._name.fn === "AlbumCardCtrl" && triggerTokens.type === "click") {
            this.$scope.albumcardVisible = false;
        }
        this._digest();
    }

    @Evented({
        selector: "section.bg-image-n--mediaitem",
        type: "click",
        delegate: null
    })
    openCard () {
        this.$scope[`${this.$scope.model.type}cardVisible`] = true;
        this._digest();
    }
}
```

## License

MIT
![Harmony = 6 + 7;](src/logo.png "Harmony - Fire in my eyes")

#CHECK OUT THE NEW DEMO
[ng-harmony-demo](http://www.github.com/ng-harmony/ng-harmony-demo)

## Synopsis

Typescript or Angular > 1 Style Decorators for AngularJS

## Code Example

### Main Entry Point

```javascript
import "../assets/styles/main.scss";

import module from "./module";
import routes from "./routes";

import "./services/spotify";

import "./components/mediaitem";
import "./components/artistcard";
import "./components/albumcard";

import "./pages/landing";
import "./pages/search";

module.routing(routes);
module.config(($locationProvider) => {
    $locationProvider.html5Mode(false);
})
module.bootstrap();

export default module.name;
```

### Routing

```javascript
import LandingPageTpl from "../ui/landing.html";
import SearchPageTpl from "../ui/search.html";

var routes = {
    default: {
        controller: "LandingPageCtrl",
        template: LandingPageTpl
    },
    "/search": {
        controller: "SearchPageCtrl",
        template: SearchPageTpl,
        resolve: {
            observables: ["SpotifyService", (SpotifyService) => { return SpotifyService.initialized.promise; }]
        }
    }
};

export default routes;
```

### Module Definition

```javascript
import angular from "angular";
import router from "angular-route";
import animate from "angular-animate";
import loadingBar from "angular-loading-bar";
import mediaQueries from "angular-media-queries";
import { Module } from "ng-harmony-module";

var module = new Module("compucorp", ["ngRoute", "ngAnimate", "angular-loading-bar", "matchMedia"]);

export default module;
```
## License

MIT
