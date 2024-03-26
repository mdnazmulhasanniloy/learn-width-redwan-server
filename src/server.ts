import mongoose from 'mongoose';
import config from './config/index';
import app from './app';
import { Server } from 'http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-var-requires
const colors = require('colors');

process.on('uncaughtException', error => {
  console.error(
    `uncaughtException rejection detected: ${error.toString()}`.red,
  );
  process.exit(1);
});

let server: Server;
async function main() {
  try {
    await mongoose.connect(config?.mongo_uri);
    console.log(`database connection successful`.green);
    server = app.listen(config?.port, () => {
      console.log(`server started on port ${config?.port}`.yellow);
    });
  } catch (error) {
    console.error(`failed to connect database`.red, error);
  }

  //unhandled Rejection detected
  process.on('unhandledRejection', error => {
    console.log(`Unhandled rejection detected: ${error}`);
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on('SIGTERM', () => {
  console.error(`SIGTERM is received`);
  if (server) {
    server.close();
  }
});

// console.log(object)
