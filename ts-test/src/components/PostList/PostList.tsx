import React from "react";
import "./PostList.css";
import { Product } from "../../types/product";
import Post from "../Post/Post";

interface PostListProps {
  productList: Product[];
}

const PostList: React.FC<{ productList: Product[] }> = ({ productList }) => {
  const posts = productList.map((prod) => (
    <Post product={prod} key={prod.id} />
  ));
  return (
    <div className="PostList">
      <p>This is a post list</p>
      {posts}
    </div>
  );
};

export default PostList;
