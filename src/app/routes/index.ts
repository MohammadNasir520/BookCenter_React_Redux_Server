import express from 'express';
import { UserRoutes } from '../modules/user/user.route';

import { UserAuth } from '../modules/userAuth/userAuth.route';
import { BookRoutes } from '../modules/books/book.route';
import { ReviewRoutes } from '../modules/reviews/review.route';
import { WishListRoutes } from '../modules/wishList/wishList.route';

// app.ts --> index.ts-->user.route.ts

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: UserAuth,
  },
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/wishlists',
    route: WishListRoutes,
  },
];

moduleRoutes.forEach(singleRoute =>
  router.use(singleRoute.path, singleRoute.route)
);

export default router;
