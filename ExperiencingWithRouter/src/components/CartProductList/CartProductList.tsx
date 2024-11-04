import React from "react";
import "./CartProductList.css";
import { useGlobalShoppingCart } from "../../context/ShoppingCartContext/ShoppingCartContext";
import ProductItem from "../ProductItem/ProductItem";

interface CartProductListProps {}

const CartProductList: React.FC<CartProductListProps> = ({}) => {
  const { products } = useGlobalShoppingCart();
  return (
    <div className="CartProductList">
      {products
        .filter((p) => p.quantity > 0)
        .map((p) => (
          <ProductItem key={p.id} product={p} />
        ))}
    </div>
  );
};

export default CartProductList;
