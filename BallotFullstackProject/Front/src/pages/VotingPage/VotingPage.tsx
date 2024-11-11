import React from "react";
import "./VotingPage.css";
import NavBar from "../../components/NavBar/NavBar";

interface VotingPageProps {}

const VotingPage: React.FC<VotingPageProps> = ({}) => {
  return (
    <div className="VotingPage Page">
      <h1>Voting page</h1>
      <NavBar />
    </div>
  );
};

export default VotingPage;
