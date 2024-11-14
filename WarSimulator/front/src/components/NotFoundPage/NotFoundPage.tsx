import React from "react";
import "./NotFoundPage.css";

interface NotFoundPageProps {}

const NotFoundPage: React.FC<NotFoundPageProps> = ({}) => {
  return (
    <div className="NotFoundPage">
      <h1>Not Found 404</h1>
    </div>
  );
};

export default NotFoundPage;
