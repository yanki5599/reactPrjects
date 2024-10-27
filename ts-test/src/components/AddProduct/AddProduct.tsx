import React, { useState } from "react";

interface AddProductProps {
  addFunc: (name: string, price: number) => void;
}

const AddProduct: React.FC<AddProductProps> = ({ addFunc }) => {
  //#region hooks
  const [bgColor, setBgColor] = useState<string>("green");
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  //#endregion

  //#region functions

  const badValues = [undefined, null, ""];

  function AddProduct() {
    if (name in badValues || price in badValues) return;
    addFunc(name, price);
    setName("");
    setPrice(0);
  }
  //#endregion
  return (
    <div>
      <h3 style={{ backgroundColor: bgColor, color: "white" }}>
        add new product
      </h3>
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Name"
        value={name}
      />
      <input
        onChange={(e) => setPrice(+e.target.value)}
        type="number"
        placeholder="Price"
        min={0}
        value={price}
      />
      <button onClick={AddProduct}>Add</button>
    </div>
  );
};

export default AddProduct;
