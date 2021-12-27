const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPaths = path.join(__dirname, "../templates/partials");

const app = express();

// setup hanldebar engine and views directory
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPaths);

// setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "Sajith",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about",
    name: "Sajith",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    name: "Sajith",
    message: "help app",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        return res.send({
          location,
          forecastData,
          address: req.query.address,
        });
      });
    }
  );
  //   res.send({
  //     forecast: "gloomy",
  //     location: "matara",
  //     address: req.query.address,
  //   });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("help", {
    title: "help",
    name: "Sajith",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("help", {
    message: "My 404 page",
    title: "404",
    name: "Sajith",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
