import React from "react";
import { Product } from "../../types/product";
import "./Post.css";

interface PostProps {
  product: Product;
}

const Post: React.FC<PostProps> = ({ product }) => {
  return (
    <div className="block">
      <h1>{product.name}</h1>
      <h2>Price: {product.price}</h2>
      <h2>id: {product.id}</h2>
    </div>
  );
};

export default Post;
