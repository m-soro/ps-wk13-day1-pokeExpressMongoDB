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
