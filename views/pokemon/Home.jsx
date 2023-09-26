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
