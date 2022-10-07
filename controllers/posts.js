const { db } = require("../db");
const jwt = require(`jsonwebtoken`);

async function getPosts(req, res) {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE category = ?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
}

async function addPost(req, res) {
  try {
    const token = req.cookies.access_token;
    console.log(token);
    if (!token) return res.status(500).json(`Not authenticated.`);

    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json(`token is not valid.`);

      // const postId = req.params.id;
      const q =
        "insert into posts(`title`, `desc`, `img`, `category`, `date`, `uid`) values (?)";
      const values = [
        req.body.title,
        req.body.desc,
        req.body.img,
        req.body.category,
        req.body.date,
        userInfo.id,
      ];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(`Post has been created.`);
      });
    });
  } catch (error) {
    console.log(error);
  }
}

async function getPost(req, res) {
  try {
    console.log(req.cookies.access_token);

    db.query(
      "select posts.*, users.username from users join posts on users.id = posts.uid where posts.id = ?",
      [req.params.id],
      (err, data) => {
        // console.log(data);
        if (err) res.status(500).json(err);
        if (data) res.status(200).json(data);
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
}

async function deletePost(req, res) {
  try {
    const token = req.cookies.access_token;
    console.log(token);
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");

      const postId = req.params.id;
      const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

      db.query(q, [postId, userInfo.id], (err, data) => {
        if (err) return res.status(403).json("You can delete only your post!");

        return res.json("Post has been deleted!");
      });
    });
  } catch (error) {
    res.status(404).json(error);
  }
}
async function updatePost(req, res) {
  const token = req.cookies.access_token;
  if (!token) return res.json(`Token is not valid.`);

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.json(403).json(`The token is not valid.`);
    const postId = req.params.id;
    console.log(typeof postId);

    const q =
      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`category`=? WHERE `id` = ? AND `uid` = ?";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.category,
    ];

    db.query(
      q,
      [...values, parseInt(postId), parseInt(userInfo.id)],
      (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(`Post has been updated.`);
      }
    );
  });
}

module.exports = { getPost, getPosts, deletePost, updatePost, addPost };
