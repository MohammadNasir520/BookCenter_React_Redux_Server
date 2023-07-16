import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import httpStatus from 'http-status';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/// use router
// app.ts --> index.ts-->user.route.ts

app.get('/', (req: Request, res: Response) => {
  res.send('cow hut server is running');
});
// handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'route not found',
      },
    ],
  });
  next();
});
export default app;
