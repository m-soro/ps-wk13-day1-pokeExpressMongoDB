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
