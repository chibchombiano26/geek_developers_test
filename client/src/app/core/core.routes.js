"use strict";
var core_1 = require('./core');
var another_1 = require('./../another/another');
var dashboard_1 = require('./../dashboard/dashboard');
exports.CoreRoutes = [
    {
        path: 'app',
        component: core_1.Core,
        children: [
            { path: 'dashboard', component: dashboard_1.Dashboard },
            { path: 'another-page', component: another_1.AnotherPage }
        ]
    }
];
//# sourceMappingURL=core.routes.js.map