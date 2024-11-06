import React from "react";
import "./ShoppingApp.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ProductItem from "./ProductItem/ProductItem";

interface ShoppingAppProps {}

const ShoppingApp: React.FC<ShoppingAppProps> = ({}) => {
  const { items, total } = useSelector(
    (state: RootState) => state.shoppingCart
  );
  return (
    <div className="ShoppingApp">
      <h1>Shopping list</h1>
      {items.map((item) => (
        <ProductItem key={item.id} product={item} />
      ))}
      <h1>total: {total}</h1>
    </div>
  );
};

export default ShoppingApp;
