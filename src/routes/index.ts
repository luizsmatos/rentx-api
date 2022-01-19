import { Router } from 'express';

import { categoriesRouters } from './categories.routes';
import { specificationsRouters } from './specifications.routes';

const router = Router();

router.use('/categories', categoriesRouters);
router.use('/specifications', specificationsRouters);

export { router };
