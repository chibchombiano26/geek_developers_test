"use strict";
// Polyfills
require('es6-shim');
require('es6-promise');
require('es7-reflect-metadata');
require('zone.js/dist/zone');
if ('production' === process.env.ENV) {
    require('rxjs/add/operator/map');
    require('rxjs/add/operator/mergeMap');
}
else {
    /* tslint:disable */
    Error['stackTraceLimit'] = Infinity;
    /* tslint:enable */
    require('zone.js/dist/long-stack-trace-zone');
    require('rxjs/add/operator/map');
    require('rxjs/add/operator/mergeMap');
}
// For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
// Also see custom_typings.d.ts as you also need to do `typings install x` where `x` is your module
//# sourceMappingURL=polyfills.js.map