import { Router } from 'express';

import { authenticateRouters } from './authenticate.routes';
import { categoriesRouters } from './categories.routes';
import { specificationsRouters } from './specifications.routes';
import { usersRouters } from './users.routes';

const router = Router();

router.use('/categories', categoriesRouters);
router.use('/specifications', specificationsRouters);
router.use('/users', usersRouters);
router.use(authenticateRouters);

export { router };
