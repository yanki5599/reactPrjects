// src/components/UserList.tsx
import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import useLocalStorage from "../hooks/useLocalStorage";

interface User {
  name: {
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
  };
  location: {
    country: string;
    city: string;
  };
}

interface RandomUserResponse {
  results: User[];
}

const UserListUgly = () => {
  //#region  Hooks

  const { state: count, setState: setCount } = useLocalStorage<number>(
    5,
    "userCount"
  );
  const { state: users } = useFetch<RandomUserResponse>(
    `https://randomuser.me/api/?gender=male&results=${count}`
  );
  const { state: favorites, setState: setFavorites } = useLocalStorage<
    string[]
  >([], "favorites");
  const [loadingFavorite, setLoadingFavorite] = useState<string | null>(null);
  //#endregion

  const toggleFavorite = (email: string) => {
    setLoadingFavorite(email);
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.includes(email)
        ? prevFavorites.filter((e) => e !== email)
        : [...prevFavorites, email];
      setLoadingFavorite(null);
      return newFavorites;
    });
  };

  if (users.loading) return <div className="loading">Loading...</div>;
  if (users.error) return <div className="error">{users.error.message}</div>;
  if (!users.data) return null;

  return (
    <div className="container">
      <div className="controls">
        <label>
          Number of users:
          <input
            type="number"
            min="1"
            max="10"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="user-grid">
        {users.data.results.map((user: User) => (
          <div key={user.email} className="user-card">
            <img
              src={user.picture.large}
              alt={`${user.name.first} ${user.name.last}`}
            />
            <h3>{`${user.name.first} ${user.name.last}`}</h3>
            <p>{user.email}</p>
            <p>{`${user.location.city}, ${user.location.country}`}</p>
            <button
              className={`favorite-btn ${
                favorites.includes(user.email) ? "active" : ""
              }`}
              onClick={() => toggleFavorite(user.email)}
              disabled={loadingFavorite === user.email}
            >
              {loadingFavorite === user.email
                ? "..."
                : favorites.includes(user.email)
                ? "★"
                : "☆"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserListUgly;
