```js
/**
 * SERVER.js
 */
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

/**
 * HOME.js
 */

import React from "react";
const DefaultLayout = require("../layouts/Default.jsx");

export default function Home() {
  return (
    <DefaultLayout>
      <div className="container">
        <h1>Welcome to Pokemon App!</h1>
        <section>
          <img src="https://i.imgur.com/rRKtN1B.jpg" alt="" />
        </section>
        <a href="/pokemon" role="button" className="outline">
          view pokemon
        </a>
      </div>
    </DefaultLayout>
  );
}


/**
 * INDEX.js
 */

import React from "react";
const DefaultLayout = require("../layouts/Default.jsx");

export default function Index({ pokemons }) {
  // console.log(pokemons);
  return (
    <DefaultLayout>
      <div className="container">
        <h1>The Pokemon Index Page</h1>
        <div className="index-options">
          <a href="/pokemon/new" role="button" className="outline">
            create pokemon
          </a>
          <a
            href="https://www.pokemon.com/us/pokedex"
            role="button"
            className="outline"
          >
            find Pokemon to add
          </a>
        </div>

        <br />
        <div className="pokemon-articles-container">
          {pokemons.map((pokemon, index) => {
            return (
              <article key={index} className="pokemon-articles">
                <h3>
                  <a
                    href={`pokemon/${pokemon.id}`}
                    data-tooltip={`about ${pokemon.name}`}
                  >
                    {pokemon.name.replace(
                      pokemon.name[0],
                      pokemon.name[0].toUpperCase()
                    )}
                  </a>
                </h3>
                <ul>
                  <li>
                    {" "}
                    <form
                      action={`/pokemon/${pokemon._id}?_method=DELETE`}
                      method="POST"
                    >
                      <input
                        type="submit"
                        value={`Delete ${pokemon.name}`}
                        className="outline"
                        style={{ width: "auto" }}
                      />
                    </form>
                  </li>
                  <li>
                    {" "}
                    <a
                      href={`/pokemon/${pokemon._id}/edit`}
                      className="outline"
                      role="button"
                      style={{ width: "auto" }}
                    >
                      Edit {pokemon.name}
                    </a>
                  </li>
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </DefaultLayout>
  );
}


/**
 * NEW.js
 */

import React from "react";
const DefaultLayout = require("../layouts/Default.jsx");

export default function New() {
  return (
    <DefaultLayout>
      <div>
        <div className="container">
          <h2>New Pokemon</h2>
          <form action="/pokemon" method="POST">
            Pokemon Name: <input type="text" name="name" />
            Image URL:
            <input type="text" name="img" />
            <input
              type="submit"
              name=""
              className="outline"
              style={{ width: "auto" }}
              value="create pokemon"
            />
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
}


/**
 * SHOW.js
 */

import React from "react";

export default function Show({ pokemon }) {
  console.log(pokemon);
  return (
    <div className="container">
      <link rel="stylesheet" type="text/css" href="/pico.min.css" />
      <h1>Gotta Catch 'Em All</h1>
      <article>
        <header>
          <h2>
            {pokemon.name.replace(
              pokemon.name[0],
              pokemon.name[0].toUpperCase()
            )}
          </h2>
        </header>
        <body>
          <figure
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={
                !pokemon.img.includes(".png")
                  ? `${pokemon.img}.jpg`
                  : pokemon.img
              }
              alt=""
              className="container"
              style={{ width: "80%", height: "auto" }}
            />
          </figure>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum quis
            illum optio obcaecati. Similique accusamus consectetur perspiciatis
            rerum culpa totam, molestias sequi, quibusdam inventore dolore
            architecto alias facere iusto. Aspernatur!
          </p>
        </body>
        <footer>
          <a href="/pokemon" role="button">
            back
          </a>
        </footer>
      </article>
    </div>
  );
}

/**
 * EDIT.js
 */
import React from "react";
const DefaultLayout = require("../layouts/Default.jsx");

export default function Edit({ pokemon }) {
  return (
    <DefaultLayout>
      {/* See the Layout takes in a prop called Title and we pass Edit Page to it  note: comments can't go first or last in  jsx return*/}
      {/* form is not complete we will do that below*/}
      <form
        action={`/pokemon/${pokemon._id}?_method=PUT`}
        method="POST"
        className="container"
      >
        Name: <input type="text" name="name" defaultValue={pokemon.name} />
        <br />
        Image URL: <input type="text" name="color" defaultValue={pokemon.img} />
        <br />
        <input type="submit" value="Submit Changes" />
      </form>
    </DefaultLayout>
  );
}


/**
 * views/layouts/Default.jsx
 * USED FOR STYLING
*/
import React from "react";

class DefaultLayout extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <link rel="stylesheet" type="text/css" href="/pico.min.css" />
          <link rel="stylesheet" type="text/css" href="/styles.css" />
        </head>
        <body>
          <h1>{this.props.title}</h1>
          {this.props.children}
        </body>
      </html>
    );
  }
}

module.exports = DefaultLayout;
```
