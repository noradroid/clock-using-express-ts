const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send(new Date());
});

app.get("/*", (req, res) => {
  res.redirect(301, "/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
