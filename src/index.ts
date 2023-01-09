import dotenv from 'dotenv';
import { server } from './server';

dotenv.config();

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in index.js`);
});
