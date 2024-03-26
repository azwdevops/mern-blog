const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

connect(process.env.MONGO_URI)
  .then(
    app.listen(`${process.env.PORT}`, () => {
      console.log(
        `Database connected and server listening on port ${process.env.PORT}`
      );
    })
  )
  .catch((err) => console.log(err));
