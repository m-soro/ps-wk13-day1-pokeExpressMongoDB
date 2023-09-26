```js
/**
 * SERVER.js
 */
const express = require("express");
const app = express();
const port = 3000;
const jsxEngine = require("jsx-view-engine");

// Prokemon data
const pokemons = require("./models/pokemons.js");

app.use(express.static("public"));

// Add View Template
app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

// view body of a post request
//near the top, around other app.use() calls
app.use(express.urlencoded({ extended: false }));

// MIDDLEWARE
app.use((req, res, next) => {
  console.log("I run for all routes");
  next();
});

// INDUCES

// Pokemon Routes
app.get("/", (req, res) => {
  // res.send("Welcome to the Pokemon App");
  res.render("pokemon/Home");
});

// INDEX
app.get("/pokemon", (req, res) => {
  // check to see if pokemon data is connected to app
  // res.send(pokemons);
  // 1st argument is the Index.jsx, second is the pokemons data passed in as props
  res.render("pokemon/Index", { pokemons: pokemons });
});

// NEW - is get, this holds the form
app.get("/pokemon/new", (req, res) => {
  res.render("pokemon/New");
});

// DELETE

// UPDATE

// CREATE
app.post("/pokemon", (req, res) => {
  // console.log("You added: ", req.body.name, req.body.img);
  pokemons.push(req.body);
  // console.log(pokemons);
  res.redirect("/pokemon");
});

// EDIT

// SHOW
app.get("/pokemon/:id", (req, res) => {
  res.render("pokemon/Show", {
    pokemon: pokemons[req.params.id],
  });
});

app.listen(port, () => {
  console.log("Listening to port 3000");
});

// http://localhost:3000/pokemon/new
// Caterpie
// https://assets.pokemon.com/assets/cms2/img/pokedex/full/010.png

/**
 * HOME.js
 */

import React from "react";

export default function Home() {
  return (
    <div className="container">
      <link rel="stylesheet" type="text/css" href="/pico.min.css" />
      <h1>Welcome to Pokemon App!</h1>
      <section>
        <img src="https://i.imgur.com/rRKtN1B.jpg" alt="" />
      </section>
      <a href="/pokemon" role="button" className="outline">
        view pokemon
      </a>
    </div>
  );
}


/**
 * INDEX.js
 */

import React from "react";

export default function Index({ pokemons }) {
  return (
    <div className="container">
      <link rel="stylesheet" type="text/css" href="/pico.min.css" />
      <link rel="stylesheet" type="text/css" href="/styles.css" />
      <h1>The Pokemon Index Page</h1>
      {pokemons.map((pokemon, index) => {
        return (
          <ul>
            <li>
              <a
                href={`pokemon/${index}`}
                data-tooltip={`about ${pokemon.name}`}
              >
                {pokemon.name.replace(
                  pokemon.name[0],
                  pokemon.name[0].toUpperCase()
                )}
              </a>
            </li>
          </ul>
        );
      })}
      Find Pokemon to add <a href="https://www.pokemon.com/us/pokedex">here</a>
      <br />
      <a href="/pokemon/new" role="button" className="outline">
        create pokemon
      </a>
    </div>
  );
}


/**
 * NEW.js
 */

import React from "react";

export default function New() {
  return (
    <div>
      <link rel="stylesheet" type="text/css" href="/pico.min.css" />
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
  );
}


/**
 * SHOW.js
 */

import React from "react";

export default function Show({ pokemon }) {
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
```
