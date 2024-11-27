import express from 'express';
import cors from 'cors';
import { APIs_V1 } from './routes/v1';
import cookieParser from 'cookie-parser';
import { swaggerSpec, swaggerUi } from './docs/swaggerDef';

const app = express();
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(APIs_V1);
export default app;
