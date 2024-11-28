import React, { useEffect } from "react";
import "./StatisticsPage.css";
import NavBar from "../../components/NavBar/NavBar";

import UsersList from "../../components/UsersList/UsersList";
import StatisticsChart from "../../components/StatisticsChart/StatisticsChart";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchCandidates } from "../../store/features/candidates/candidatesSlice";
import { fetchUsers } from "../../store/features/users/usersSlice";

interface StatisticsPageProps {}

const StatisticsPage: React.FC<StatisticsPageProps> = ({}) => {
  const {
    candidates,
    status: cStatus,
    error,
  } = useSelector((state: RootState) => state.candidates);

  const {
    users,
    status: usersStatus,
    error: usersError,
  } = useSelector((state: RootState) => state.users);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCandidates());
    dispatch(fetchUsers());
  }, []);

  return (
    <div className="Page marginTopZero">
      <NavBar />
      <div className="Page StatisticsPage">
        <h2>Election Statistics</h2>
        <UsersList />
        {cStatus === "Pending" && <h1>Loading...</h1>}
        {(cStatus === "Rejected" || usersError === "Rejected") && (
          <div className="error">{error}</div>
        )}
        {cStatus === "Fulfilled" && usersStatus === "Fulfilled" && (
          <StatisticsChart candidates={candidates} usersCount={users.length} />
        )}
      </div>
    </div>
  );
};

export default StatisticsPage;
