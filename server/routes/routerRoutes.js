import { Router } from "express";
import { getPosts, getPost, getLogout } from "./controllers/getJobs.js";
import {
  createComment,
  createPost,
  createUser,
  editComment,
  likeComment,
  deleteComment,
  checkUser,
} from "./controllers/postJobs.js";
import { checkUserAuthGet, requireAuth } from "../utils/authMiddleware.js";
const router = Router();

router.route("/users/checkauth").get(checkUserAuthGet);
router.route("/users/signup").post(createUser);
router.route("/users/login").post(checkUser);
router.route("/users/logout").get(getLogout);
router.route("/posts").get(getPosts).post(requireAuth, createPost);
router
  .route("/posts/:id")
  .get(getPost)
  .post(requireAuth, createComment)
  .put(requireAuth, editComment)
  .delete(requireAuth, deleteComment);
router.route("/posts/:id/like").put(requireAuth, likeComment);
export default router;
