import React, { useState } from "react";
import "./ProductItem.css";
import {
  CartItem,
  useGlobalShoppingCart,
} from "../../context/ShoppingCartContext/ShoppingCartContext";

interface ProductItemProps {
  product: CartItem;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const [currQuantity, setCurQuantity] = useState(product.quantity);
  const { updateCart } = useGlobalShoppingCart();

  return (
    <div className="ProductItem">
      <h4>{product.name}</h4>
      <span>${product.price}</span>
      <div className="actions">
        <button
          onClick={() => setCurQuantity((prev) => (prev > 0 ? prev - 1 : 0))}
        >
          -
        </button>
        <input
          min={0}
          max={100}
          type="number"
          value={currQuantity}
          onChange={(e) => {
            console.log(e.target.value);
            setCurQuantity(+e.target.value >= 0 ? +e.target.value : 0);
          }}
        />
        <button onClick={() => setCurQuantity((prev) => prev + 1)}>+</button>
      </div>
      <button
        className="update"
        onClick={() => updateCart(product, currQuantity)}
      >
        Update Cart
      </button>
    </div>
  );
};

export default ProductItem;
