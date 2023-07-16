import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalerrorHandlar';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/// use router
// app.ts --> index.ts-->user.route.ts
app.use('/api/v1/', router);

app.get('/', (req: Request, res: Response) => {
  res.send('cow hut server is running');
});

app.use(globalErrorHandler);
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
