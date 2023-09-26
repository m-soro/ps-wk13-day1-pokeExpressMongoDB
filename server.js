const express = require("express");
const app = express();
const jsxEngine = require("jsx-view-engine");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
dotenv.config();

//DEPENDENCIES - REQUIRE MONGOOSE
const mongoose = require("mongoose");
// POKEMON SCHEMA MODEL
const Pokemon = require("./models/pokemons.js");
// MUST HAVE BODY PARSER - TO READ FROM THE FORM
app.use(express.urlencoded({ extended: false }));
// USE METHOD OVERRIDE FOR FORM TO CREATE A DELETE REQUEST
app.use(methodOverride("_method"));
// FOR HOSTING STATIC FILES
app.use(express.static("public"));
// VIEW TEMPLATE ENGINE
app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

// GLOBAL CONFIGURATION
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;
mongoose.connect(mongoURI);
// console.log(process.env);

// CONNECTION ERROR/SUCCESS - OPTIONAL BUT HELPFUL
// DEFINE CALLBACK FUNCTIONS FRO VARIOUS EVENTS
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("open", () => console.log("mongo connected: ", mongoURI));
db.on("close", () => console.log("mongo disconnected"));

/** ----------------
 * POKEMON ROUTES
 * -----------------
 */
// ----------------
// SEED ROUTE
// ----------------
app.get("/pokemon/seed", async (req, res) => {
  try {
    console.log(req.body);
    await Pokemon.create([
      {
        name: "bulbasaur",
        img: "http://img.pokemondb.net/artwork/bulbasaur",
      },
      {
        name: "ivysaur",
        img: "http://img.pokemondb.net/artwork/ivysaur",
      },
      {
        name: "venasaur",
        img: "http://img.pokemondb.net/artwork/venusaur",
      },
      {
        name: "charmander",
        img: "http://img.pokemondb.net/artwork/charmander",
      },
      {
        name: "charizard",
        img: "http://img.pokemondb.net/artwork/charizard",
      },
      {
        name: "squirtle",
        img: "http://img.pokemondb.net/artwork/squirtle",
      },
      {
        name: "wartortle",
        img: "http://img.pokemondb.net/artwork/wartortle",
      },
    ]);
    res.redirect("/pokemon");
  } catch (error) {
    console.error(error);
  }
});
// ----------------
// POKEMON HOME
// ----------------
app.get("/", (req, res) => {
  res.render("pokemon/Home");
});
// ----------------
// INDEX
// ----------------
app.get("/pokemon/", async (req, res) => {
  try {
    // use mongoose method .find() show all pokemons
    const pokemons = await Pokemon.find();
    // pass all the pokemons from the database to Index view
    res.render("pokemon/Index", { pokemons: pokemons });
  } catch (error) {
    console.log(error);
  }
});
// ----------------
// NEW
// ----------------
app.get("/pokemon/new", (req, res) => {
  res.render("pokemon/New");
});
// ----------------
// DELETE
// ----------------
app.delete("/pokemon/:id", async (req, res) => {
  try {
    await Pokemon.findByIdAndRemove(req.params.id);
    res.redirect("/pokemon");
  } catch (error) {
    console.log(error);
  }
});
// ----------------
// UPDATE
// ----------------
app.put("/pokemon/:id", async (req, res) => {
  try {
    await Pokemon.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/pokemon");
  } catch (error) {
    console.log(error);
  }
});
// ----------------
// CREATE
// ----------------
app.post("/pokemon", async (req, res) => {
  try {
    await Pokemon.create(req.body);
    res.redirect("/pokemon");
  } catch (error) {
    console.log(error);
  }
});
// ----------------
// EDIT
// ----------------
app.get("/pokemon/:id/edit", async (req, res) => {
  try {
    const foundPokemon = await Pokemon.findById(req.params.id);
    res.render("pokemon/Edit", { pokemon: foundPokemon });
  } catch (error) {
    console.log(error);
  }
});
// ----------------
// SHOW
// ----------------
app.get("/pokemon/:id", async (req, res) => {
  try {
    const pokemon = await Pokemon.findById(req.params.id);
    console.log("This is the Show Route");
    res.render("pokemon/Show", { pokemon: pokemon });
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening");
});

// Caterpie
// https://assets.pokemon.com/assets/cms2/img/pokedex/full/010.png
