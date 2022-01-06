const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();

const weatherData = require("../utils/weatherData");

const port = process.env.PORT || 3000;

const publicStaticDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));

app.get("/", (req, res) => {
  res.send("Hi this is wather app");
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  weatherData(address, (result) => {
      console.log(result);
  });
});

app.get("*", (req, res) => {
  res.send("Page not Found");
});

app.listen(port, () => {
  console.log("Server is up and runnig on port: " + port);
});
