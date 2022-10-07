const router = require(`express`).Router();
const {
  getPost,
  getPosts,
  deletePost,
  updatePost,
  addPost,
} = require("../controllers/posts");

router.get("/", getPosts);
router.get("/:id", getPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);
router.post("/", addPost);

module.exports = router;
