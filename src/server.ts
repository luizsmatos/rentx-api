import express from 'express';

import { categoriesRouters } from './routes/categories.routes';
import { specificationsRouters } from './routes/specifications.routes';

const app = express();

app.use(express.json());

app.use('/categories', categoriesRouters);
app.use('/specifications', specificationsRouters);

app.listen(3333, () => {
  console.log('Server is running on port 3333');
});
