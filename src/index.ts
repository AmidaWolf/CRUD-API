import dotenv from 'dotenv';
import { server } from './server';
import fs from 'fs';
import path from 'path';
import { pathToData } from './constants';

dotenv.config();

const PORT = process.env.PORT || 4000;

server.listen(PORT, async () => {
  await fs.promises.writeFile(path.resolve(pathToData), JSON.stringify([]));
  console.log(`Server running on port ${PORT} in index.js`);
});
