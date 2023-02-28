const express = require("express");
const path = require("path");
// logs the different request to our server
const logger = require("morgan");
// cross origin access
const cors = require("cors");
const app = express();

// access
app.use(
  cors({
    origin: "*",
  })
);

app.use(logger("dev"));
// parse stringified json data
app.use(express.json());

// server build folder
app.use(express.static(path.join(__dirname, "build")));

app.get("/test_route", (req, res) => {
  res.send("good route");
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(4000, () => {
  console.log(`Server is Listening on 4000`);
});
