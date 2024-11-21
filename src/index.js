import { closeDB, connectDB } from '~/config/mongodb';
import { env } from '~/config/environment';
import AsyncExitHook from 'async-exit-hook';
import app from './app';
const startServer = () => {
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
