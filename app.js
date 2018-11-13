const express = require("express"),
cors = require("cors");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const questionRoutes = require("./api/routes/questions");
const scoreRoutes = require("./api/routes/scores");
const userRoutes = require('./api/routes/user');

mongoose.connect(

  //mLab mongodb baza
   "mongodb://BojanK:Budiszava1!@ds135653.mlab.com:35653/nba-quiz",

  // // mongoDB Atlas
  //  "mongodb://admin:" +
  //    process.env.MONGO_ATLAS_PW +
  //   "@cluster0-shard-00-00-xxrli.mongodb.net:27017,cluster0-shard-00-01-xxrli.mongodb.net:27017,cluster0-shard-00-02-xxrli.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true",
  {
    useMongoClient: true
  }
);
mongoose.Promise = global.Promise;
app.use(cors({"origin": "*"}));
app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Role, User"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/question", questionRoutes);
app.use("/score", scoreRoutes);
app.use("/user", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found test");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    }
  });
});

module.exports = app;
