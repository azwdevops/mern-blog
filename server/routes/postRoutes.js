const { Router } = require("express");
const {
  createPost,
  editPost,
  deletePost,
  getPosts,
  getCategoryPosts,
  getUserPosts,
  getSinglePosts,
} = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

const router = Router();

router.post("/", authMiddleware, createPost);
router.patch("/:postId", authMiddleware, editPost);
router.delete("/:postId", authMiddleware, deletePost);
router.get("/", getPosts);
router.get("/:postId", getSinglePosts);
router.get("/categories/:category", getCategoryPosts);
router.get("/users/:authorId", getUserPosts);

module.exports = router;
