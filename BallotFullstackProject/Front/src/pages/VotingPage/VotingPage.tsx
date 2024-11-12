import React, { useEffect } from "react";
import "./VotingPage.css";
import NavBar from "../../components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import Candidate from "../../components/Candidate/Candidate";
import { fetchCandidates } from "../../store/features/candidates/candidatesSlice";
import Loader from "../../components/Loader/Loader";

interface VotingPageProps {}

const VotingPage: React.FC<VotingPageProps> = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { candidates } = useSelector((state: RootState) => state.candidates);

  const { status } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchCandidates());
  }, []);

  return (
    <>
      <NavBar />
      <div className="VotingPage Page">
        <h1>Voting page</h1>
        <span className="stickCenter">
          {status === "Pending" && <Loader center={true} />}
        </span>
        {candidates.map((candidate, idx) => (
          <Candidate
            key={candidate._id + idx.toString()}
            candidate={candidate}
          />
        ))}
      </div>
    </>
  );
};

export default VotingPage;
