"use strict";
var router_1 = require('@angular/router');
var core_routes_1 = require('./app/core/core.routes');
var error_1 = require('./app/error/error');
var login_1 = require('./app/login/login');
var routes = core_routes_1.CoreRoutes.concat([
    { path: 'error', component: error_1.ErrorPage },
    { path: 'login', component: login_1.LoginPage },
    {
        path: '',
        redirectTo: '/app/dashboard',
        pathMatch: 'full'
    },
    { path: '**', redirectTo: '/app/dashboard' },
]);
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(routes)
];
//# sourceMappingURL=app.routes.js.map