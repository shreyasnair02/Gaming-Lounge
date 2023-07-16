import { Router } from "express";
import { getPosts, getPost } from "./controllers/getJobs.js";
import {
  createComment,
  createPost,
  createUser,
  editComment,
  likeComment,
  deleteComment,
  checkUser,
} from "./controllers/postJobs.js";
const router = Router();

router.route("/users/signup").post(createUser);
router.route("/users/login").post(checkUser);
router.route("/posts").get(getPosts).post(createPost);
router
  .route("/posts/:id")
  .get(getPost)
  .post(createComment)
  .put(editComment)
  .delete(deleteComment);
router.route("/posts/:id/like").put(likeComment);
export default router;
