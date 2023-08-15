const express = require("express");
const path = require("path");
const app = express();
const port = 5000;

app.use(express.static(path.join(__dirname, "/public")));

// not needed if you have a "index.html" file as it will automatically be served
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

app.get("/*", (req, res) => {
  res.redirect(301, "/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
