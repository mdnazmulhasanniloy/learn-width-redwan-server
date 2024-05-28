"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const course_route_1 = require("../modules/course/course.route");
const batch_route_1 = require("../modules/batch/batch.route");
const modules_route_1 = require("../modules/module/modules.route");
const lecture_route_1 = require("../modules/lecture/lecture.route");
const coupon_route_1 = require("../modules/coupon/coupon.route");
const payment_route_1 = require("../modules/payment/payment.route");
const router = (0, express_1.Router)();
const modulesRoutes = [
    {
        path: '/users',
        router: user_route_1.UserRoutes,
    },
    {
        path: '/auth',
        router: auth_route_1.AuthRoutes,
    },
    {
        path: '/course',
        router: course_route_1.CourseRouter,
    },
    {
        path: '/batch',
        router: batch_route_1.BatchRouter,
    },
    {
        path: '/module',
        router: modules_route_1.ModuleRouter,
    },
    {
        path: '/lecture',
        router: lecture_route_1.LectureRouter,
    },
    {
        path: '/coupon',
        router: coupon_route_1.CouponRouter,
    },
    {
        path: '/payment',
        router: payment_route_1.PaymentRouter,
    },
];
//optimize routes
modulesRoutes === null || modulesRoutes === void 0 ? void 0 : modulesRoutes.forEach(route => router === null || router === void 0 ? void 0 : router.use(route === null || route === void 0 ? void 0 : route.path, route === null || route === void 0 ? void 0 : route.router));
exports.default = router;
