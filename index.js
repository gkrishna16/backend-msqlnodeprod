const express = require(`express`);
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

const corsOptions = {
  "Access-Control-Request-Headers": "Content-Type, Accept",
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
// app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", "*");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Expose-Headers", "*");
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

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
