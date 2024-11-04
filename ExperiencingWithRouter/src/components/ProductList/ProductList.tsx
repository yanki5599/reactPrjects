import React, { useEffect, useState } from "react";
import "./ProductList.css";

import ProductItem from "../ProductItem/ProductItem";
import {
  CartItem,
  useGlobalShoppingCart,
} from "../../context/ShoppingCartContext/ShoppingCartContext";

const ProductList: React.FC = () => {
  const { products }: { products: CartItem[] } = useGlobalShoppingCart();
  // const [displayProducts, setDisplayProducts] = useState<CartItem[]>(products);

  // const sortAscending = (a: CartItem, b: CartItem) => a.price - b.price;
  // const sortDescending = (a: CartItem, b: CartItem) => b.price - a.price;

  // const [sortDir, setSortDir] =
  //   useState<(a: CartItem, b: CartItem) => number>(sortAscending);

  // useEffect(() => {
  //   setDisplayProducts((prev) => [...prev].sort(sortDir));
  // }, [sortDir]);

  return (
    <div className="ProductList">
      <div className="controls">
        {/* <button
          onClick={() =>
            setSortDir(
              sortDir === sortAscending ? sortDescending : sortAscending
            )
          }
        >
          Sort {sortDir === sortAscending ? "Down" : "Up"}
        </button> */}
        <input type="text" placeholder="filter" />
      </div>
      {products.map((p) => (
        <ProductItem key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductList;
