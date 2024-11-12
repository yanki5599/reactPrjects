import React, { useEffect } from "react";
import "./VotingPage.css";
import NavBar from "../../components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import Candidate from "../../components/Candidate/Candidate";
import {
  fetchCandidates,
  updateCandidates,
} from "../../store/features/candidates/candidatesSlice";
import Loader from "../../components/Loader/Loader";
import { useSocket } from "../../hooks/useSocket";

interface VotingPageProps {}

const VotingPage: React.FC<VotingPageProps> = ({}) => {
  const { candidates: candidatesFromSocket, connected } = useSocket();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(updateCandidates(candidatesFromSocket));
  }, [candidatesFromSocket]);

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
        <div className="CandidatesList">
          {candidates.map((candidate, idx) => (
            <Candidate
              key={candidate._id + idx.toString()}
              candidate={candidate}
            />
          ))}
        </div>
        <div>
          {connected ? "connected to socket" : "connecting to socket..."}
        </div>
      </div>
    </>
  );
};

export default VotingPage;
