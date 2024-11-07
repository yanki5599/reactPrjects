import React from "react";
import "./NotFoundPage.css";

interface NotFoundPageProps {}

const NotFoundPage: React.FC<NotFoundPageProps> = ({}) => {
  return (
    <div className="NotFoundPage Page">
      <h1>404 Page Not Found</h1>
    </div>
  );
};

export default NotFoundPage;
