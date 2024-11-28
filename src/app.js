import express from 'express';
import cors from 'cors';
import { APIs_V1 } from './routes/v1';
import cookieParser from 'cookie-parser';
import { swaggerSpec, swaggerUi } from './docs/swaggerDef';
import { errorHandlingMiddleware } from './middlewares/error';

const app = express();
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cookieParser());
app.use(
  cors({
    origin: `http://localhost:5173`,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
);
app.use(express.json());
app.use(APIs_V1);

app.use(errorHandlingMiddleware);
export default app;
