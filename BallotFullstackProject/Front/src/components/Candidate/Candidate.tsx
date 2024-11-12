import React from "react";
import "./Candidate.css";
import { ICandidate } from "../../types/candidate";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  fetchCancelVote,
  fetchVote,
} from "../../store/features/auth/authSlice";
import { fetchValidateToken } from "../../store/features/auth/authSlice";
import Loader from "../Loader/Loader";

interface CandidateProps {
  candidate: ICandidate;
}

const Candidate: React.FC<CandidateProps> = ({ candidate }) => {
  const { user, status, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  function isVotedByUser() {
    return user?.votedForId === candidate._id;
  }

  function handleVote() {
    dispatch(fetchVote({ candidateId: candidate._id }));
  }
  function handleCancelVote() {
    dispatch(fetchCancelVote());
  }

  return (
    <div className="Candidate">
      <h1
        style={{
          backgroundColor: isVotedByUser() ? "green" : "white",
        }}
      >
        {candidate.name}
      </h1>
      {!user?.votedForId && <button onClick={handleVote}>Vote</button>}
      {isVotedByUser() && (
        <button onClick={handleCancelVote}>Cancel Vote</button>
      )}
      {/* {status === "Pending" && <Loader />} */}
    </div>
  );
};

export default Candidate;
