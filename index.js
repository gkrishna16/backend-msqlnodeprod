const express = require(`express`);
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
app.use(cookieParser());

require("dotenv").config();
app.use(express.json());
const corsOptions = {
  origin: "https://frontend-nodesqlapi.vercel.app/",
  credentials: true,
  optionSuccessStatus: 200,
  // "access-control-allow-credentials": true,
};

app.use(cors(corsOptions));
console.log(cookieParser);
const PORT = process.env.PORT || 5001;
const users = require("./routes/users");
const auth = require("./routes/auth");
const posts = require("./routes/posts");

app.use("/api/users/", users);
app.use("/api/auth", auth);
app.use("/api/posts", posts);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
