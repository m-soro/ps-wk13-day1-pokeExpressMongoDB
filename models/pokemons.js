// const pokemon = [
//   { name: "bulbasaur", img: "http://img.pokemondb.net/artwork/bulbasaur" },
//   { name: "ivysaur", img: "http://img.pokemondb.net/artwork/ivysaur" },
//   { name: "venusaur", img: "http://img.pokemondb.net/artwork/venusaur" },
//   { name: "charmander", img: "http://img.pokemondb.net/artwork/charmander" },
//   { name: "charizard", img: "http://img.pokemondb.net/artwork/charizard" },
//   { name: "squirtle", img: "http://img.pokemondb.net/artwork/squirtle" },
//   { name: "wartortle", img: "http://img.pokemondb.net/artwork/wartortle" },
// ];

// module.exports = pokemon;

// STEP 1 IMPORT MONGOOSE
const mongoose = require("mongoose");

// STEP 2 CREATE SCHEMA
const pokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

// STEP 3 CREATE MODEL SCHEMA
const Pokemon = mongoose.model("Pokemon", pokemonSchema);

// STEP 4 EXPORT THE CREATED MODEL
module.exports = Pokemon;
