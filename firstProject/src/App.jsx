import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import Post from "./components/Post";

function App() {
  const products = [
    { name: "🥐", price: "1💲" },
    { name: "🍕", price: "2💲" },
    { name: "🍔", price: "3💲" },
    { name: "🍟", price: "4💲" },
    { name: "🌭", price: "5💲" },
    { name: "🍿", price: "6💲" },
    { name: "🥓", price: "7💲" },
  ];

  const posts = products.map((prod, idx) => (
    <Post key={idx} name={prod.name} price={prod.price} />
  ));
  return (
    <>
      <Header />
      {posts}
    </>
  );
}

export default App;
