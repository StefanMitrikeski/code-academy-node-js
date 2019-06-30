import { Router } from 'express';
import actions from './actions';

const { create, list, get, del, update, login } = actions;
 
const userRouter = Router();
userRouter.post('/sign-up', create);
userRouter.get('/users', list);
userRouter.get('/users/:id', get);
userRouter.delete('/users/:id', del);
userRouter.put('/users/:id', update);
userRouter.post('/login', login);

export default userRouter;