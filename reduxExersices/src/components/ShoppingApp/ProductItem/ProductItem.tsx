import React, { useState } from "react";
import "./ProductItem.css";
import {
  Item,
  updateCart,
} from "../../../store/features/shoppingCart/shoppingCartSlice";
import { useDispatch } from "react-redux";

interface ProductItemProps {
  product: Item;
}

const MIN = 0;
const MAX = 100;

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const [currQuantity, setCurQuantity] = useState(product.quantity);

  const dispatch = useDispatch();

  return (
    <div className="ProductItem">
      <h4>{product.name}</h4>
      <span>${product.price}</span>
      <div className="actions">
        <button
          onClick={() =>
            setCurQuantity((prev) => (prev > MIN ? prev - 1 : MIN))
          }
        >
          -
        </button>
        <input
          min={MIN}
          max={MAX}
          type="number"
          value={currQuantity}
          onChange={(e) => {
            console.log(e.target.value);
            setCurQuantity(
              +e.target.value >= MIN && +e.target.value <= MAX
                ? +e.target.value
                : MIN
            );
          }}
        />
        <button
          onClick={() =>
            setCurQuantity((prev) => (prev < MAX ? prev + 1 : MAX))
          }
        >
          +
        </button>
      </div>
      <button
        className="update"
        onClick={() =>
          dispatch(updateCart({ id: product.id, quantity: currQuantity }))
        }
      >
        Update Cart
      </button>
    </div>
  );
};

export default ProductItem;
