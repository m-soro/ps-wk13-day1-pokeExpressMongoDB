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
