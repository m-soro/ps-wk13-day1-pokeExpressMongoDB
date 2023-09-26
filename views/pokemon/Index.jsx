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
