import express from 'express';
import cors from 'cors';
import { APIs_V1 } from './routes/v1';

const app = express();

app.use(cors());
app.use(express.json());
app.use(APIs_V1);

export default app;
