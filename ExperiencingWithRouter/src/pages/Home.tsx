import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const input = useRef<HTMLSelectElement>(null);
  const useNav = useNavigate();

  function moveToPage() {
    if (input.current && input.current.value.trim())
      useNav(`/${input.current.value}`);
  }
  return (
    <main className="Page">
      <h1>Welcome Home</h1>
      <select name="" id="" ref={input}>
        <option value="Home">Home</option>
        <option value="News">News</option>
        <option value="Sport">Sport</option>
        <option value="Users">Users</option>
      </select>
      <button onClick={moveToPage}>Go</button>
    </main>
  );
};

export default Home;
