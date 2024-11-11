import React from "react";
import "./StatisticsPage.css";
import NavBar from "../../components/NavBar/NavBar";

interface StatisticsPageProps {}

const StatisticsPage: React.FC<StatisticsPageProps> = ({}) => {
  return (
    <div className="StatisticsPage Page">
      <h1>StatisticsPage page</h1>
      <NavBar />
    </div>
  );
};

export default StatisticsPage;
