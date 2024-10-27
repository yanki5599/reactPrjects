import { Dispatch, SetStateAction, useState } from "react";
import "./App.css";
import AddProduct from "./components/AddProduct/AddProduct";
import PostList from "./components/PostList/PostList";
import { Product } from "./types/product";

function App() {
  const [productList, setProductList]: [
    Product[],
    Dispatch<SetStateAction<Product[]>>
  ] = useState<Product[]>([
    { name: "פיצה 🍕", price: 12.9, id: "1" },
    { name: "בורגר 🍔", price: 39.9, id: "2" },
  ]);

  function AddProductFunc(name: string, price: number) {
    const product: Product = {
      name,
      price,
      id: (+productList[productList.length - 1].id + 1).toString(),
    };
    setProductList((prev) => [...prev, product]);
  }

  return (
    <>
      <PostList productList={productList} />
      <AddProduct addFunc={AddProductFunc} />
    </>
  );
}

export default App;
