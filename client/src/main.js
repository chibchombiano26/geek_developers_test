/*
 * Providers provided by Angular
 */
"use strict";
require('jquery');
require('tether');
require('bootstrap');
require('widgster');
require('jquery-touchswipe/jquery.touchSwipe');
require('jquery-slimscroll/jquery.slimscroll');
require('pace');
var core_1 = require('@angular/core');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var common_1 = require('@angular/common');
var http_1 = require('@angular/http');
var app_routes_1 = require('./app.routes');
var ENV_PROVIDERS = [];
if ('production' === process.env.ENV) {
    core_1.enableProdMode();
}
var app_1 = require('./app');
var config_1 = require('./app/core/config');
document.addEventListener('DOMContentLoaded', function main() {
    platform_browser_dynamic_1.bootstrap(app_1.App, [
        config_1.ConfigService
    ].concat(ENV_PROVIDERS, http_1.HTTP_PROVIDERS, app_routes_1.APP_ROUTER_PROVIDERS, [
        { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
    ]))
        .catch(function (err) { return console.error(err); });
});
//# sourceMappingURL=main.js.map