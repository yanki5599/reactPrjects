import React from "react";
import "./ProductList.css";

import ProductItem from "../ProductItem/ProductItem";
import { useGlobalShoppingCart } from "../../context/ShoppingCartContext/ShoppingCartContext";
interface ProductListProps {}

const ProductList: React.FC<ProductListProps> = ({}) => {
  const { products } = useGlobalShoppingCart();

  return (
    <div className="ProductList">
      {products.map((p) => (
        <ProductItem key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductList;
