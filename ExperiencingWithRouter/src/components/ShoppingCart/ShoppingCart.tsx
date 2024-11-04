import React from "react";
import "./ShoppingCart.css";
import CartProductList from "../CartProductList/CartProductList";
import {
  CartItem,
  useGlobalShoppingCart,
} from "../../context/ShoppingCartContext/ShoppingCartContext";

interface ShoppingCartProps {}

const ShoppingCart: React.FC<ShoppingCartProps> = ({}) => {
  const { products } = useGlobalShoppingCart();

  return (
    <div className="ShoppingCart">
      <h1>Cart</h1>
      <CartProductList />
      <h2 className="TotalPrice">
        Total:$
        {products.reduce(
          (acc: number, item: CartItem) => acc + item.price * item.quantity,
          0
        )}
      </h2>
    </div>
  );
};

export default ShoppingCart;
