import cluster from 'cluster';
import os from 'os';
import dotenv from 'dotenv';
import { server } from './server';
import fs from 'fs';
import path from 'path';
import { pathToData } from './constants';

dotenv.config();

const PORT = process.env.PORT || 4000;

if (cluster.isPrimary) {
  const numCores = os.cpus().length;

  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCores; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code) => {
    console.log(`Worker ${worker.process.pid} finished. Exit code: ${code}`);

    server.listen(PORT, () => console.log(`Worker ${cluster.worker?.id} launched`));
  });
} else {
  if (cluster.worker) {
    const anotherPort = Number(PORT) + cluster.worker.id;
    server.listen(anotherPort, () => {
      console.log(`Worker ${cluster.worker?.id} listening on port ${anotherPort}`);
    });
  }
}

process.on('SIGINT', () => {
  server.close(async () => {
    await fs.promises.writeFile(path.resolve(pathToData), JSON.stringify([]));
    console.log('clear data.json');
    console.log('HTTP server closed.');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  server.close(async () => {
    await fs.promises.writeFile(path.resolve(pathToData), JSON.stringify([]));
    console.log('clear data.json');
    console.log('HTTP server closed.');
    process.exit(0);
  });
});
