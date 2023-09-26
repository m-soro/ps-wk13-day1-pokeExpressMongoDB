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
