import React from "react";
import "./UsersList.css";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

interface UsersListProps {}

const UsersList: React.FC<UsersListProps> = ({}) => {
  const { users, status, error } = useSelector(
    (state: RootState) => state.users
  );

  return (
    <div className="UsersList">
      {status === "Pending" && <p>Loading statistics...</p>}
      {status === "Rejected" && <p className="error">{error}</p>}
      {status === "Fulfilled" && (
        <ul>
          {users.map((user) => (
            <li
              key={user._id}
              style={{ color: user.votedForId ? "green" : "red" }}
            >
              {user.username} - {user.votedForId ? "Voted" : "Not Voted Yet"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersList;
