const express = require(`express`);
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3001",
  credentials: true,
  optionSuccessStatus: 200,
  "access-control-allow-credential": true,
};
app.use(cors());

app.use(cookieParser());

require("dotenv").config();
app.use(express.json());

const PORT = process.env.PORT || 5001;
const users = require("./routes/users");
const auth = require("./routes/auth");
const posts = require("./routes/posts");
// const { Model } = require("sequelize");

app.use("/api/users/", users);
app.use("/api/auth", auth);
app.use("/api/posts", posts);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
