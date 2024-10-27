import React from "react";

const Header = () => {
  const buttonFunc = () => {
    return (
      <div>
        <button>login</button>
        <button>signIn</button>
      </div>
    );
  };

  return (
    <div>
      <h1>😎 my app 😎</h1>
      {buttonFunc()}
    </div>
  );
};

export default Header;
