"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const userAuth_route_1 = require("../modules/userAuth/userAuth.route");
const book_route_1 = require("../modules/books/book.route");
const review_route_1 = require("../modules/reviews/review.route");
// app.ts --> index.ts-->user.route.ts
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/auth',
        route: userAuth_route_1.UserAuth,
    },
    {
        path: '/books',
        route: book_route_1.BookRoutes,
    },
    {
        path: '/reviews',
        route: review_route_1.ReviewRoutes,
    },
];
moduleRoutes.forEach(singleRoute => router.use(singleRoute.path, singleRoute.route));
exports.default = router;
