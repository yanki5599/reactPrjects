import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import WeaponsLayout from "../../components/WeaponsLayout/WeaponsLayout";
import NavBar from "../../components/NavBar/NavBar";
import { fetchAttacks } from "../../store/features/attacks/attacksSlice";
import CountDown from "../../components/CountDown/CountDown";
import "./AttackerPage.css";
import { fetchOrgNames } from "../../store/features/organizations/organizationsSlice";

interface AttackerPageProps {}

const AttackerPage: React.FC<AttackerPageProps> = ({}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { attacks } = useSelector((state: RootState) => state.attacks);
  const dispatch = useDispatch<AppDispatch>();

  const {
    organizations: organizations,
    error: orgError,
    status: orgStatus,
  } = useSelector((state: RootState) => state.organizations);

  useEffect(() => {
    dispatch(fetchOrgNames());
  }, []);
  const nav = useNavigate();
  useEffect(() => {
    if (user?.organizationId.name.startsWith("IDF")) nav("/defender");
    else {
      dispatch(fetchAttacks());
    }
  }, []);

  const [location, setLocation] = useState<string>("Center");

  return (
    <>
      <NavBar />
      <div className="Attacker Page">
        <h1>AttackerPage page</h1>

        <WeaponsLayout arsenal={user?.arsenal!} />
        <select
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          name="location"
        >
          <option value="">Choose...</option>
          {organizations
            .filter((org) => org.startsWith("IDF"))
            .map((org) => (
              <option key={org} value={org.slice(6)}>
                {org.slice(6)}
              </option>
            ))}
        </select>
        <div className="container">
          <ul className="responsive-table">
            <li className="table-header">
              <div className="col col-1">Missile name</div>
              <div className="col col-2">explodes in</div>
              <div className="col col-3">Status</div>
            </li>
            {attacks.map((att) => (
              <li key={att._id} className="table-row">
                <div className="col col-1">{att.missileId.name}</div>
                <div className="col col-2">
                  <CountDown targetDate={att.eta} />
                </div>
                <div className="col col-3">{att.status}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AttackerPage;
