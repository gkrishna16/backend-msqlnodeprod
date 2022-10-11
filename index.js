const express = require(`express`);
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

// const corsOptions = {
//   // origin: "https://frontend-nodesqlapi.vercel.app",
//   "Access-Control-Allow-Origin": "*",
//   credentials: true,
//   optionSuccessStatus: 200,
//   "access-control-allow-credential": true,
// };
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cookieParser());

require("dotenv").config();
app.use(express.json());

const PORT = process.env.PORT || 5001;
const users = require("./routes/users");
const auth = require("./routes/auth");
const posts = require("./routes/posts");

app.use("/api/users/", users);
app.use("/api/auth", auth);
app.use("/api/posts", posts);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
