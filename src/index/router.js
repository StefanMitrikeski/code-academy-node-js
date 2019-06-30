import { Router } from 'express';
import users from '../users/index';
import posts from '../posts/index';

const { routes } = users;

const indexRouter = Router();

indexRouter.use(routes);
indexRouter.use(posts.routes);

export default indexRouter;