import { Router } from "express";
import actions from "./actions";

const postRouter = Router();
const { list, create, del, get, update } = actions;

postRouter.get("/posts", list);
postRouter.post("/posts", create);
postRouter.get("/posts/:id", get);
postRouter.put("/posts/:id", update);

export default postRouter;
