import express from 'express';
import { closeDB, connectDB } from '~/config/mongodb';
import { env } from '~/config/environment';
import AsyncExitHook from 'async-exit-hook';
import cors from 'cors';
import { APIs_V1 } from './routes/v1';
const startServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(APIs_V1);

  app.listen(env.SERVER_PORT, env.HOST, () => {
    console.log(`🚀 Server is running at http://${env.HOST}:${env.SERVER_PORT}`);
  });

  AsyncExitHook(async (done) => {
    await closeDB();
    done();
  });
};

(async () => {
  try {
    await connectDB();
    startServer();
  } catch (err) {
    console.error('Failed to start application:', err.message);
  }
})();
