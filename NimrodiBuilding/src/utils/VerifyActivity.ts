import { useSelector } from "react-redux";
import roles from "../data/roles.json";
import { RootState } from "../store/store";

interface IuseActivityParams {
  activity: string;
  role: string;
  activities: string[];
}

const useIsVerified = ({
  activity,
  role,
  activities,
}: IuseActivityParams) => {};

export default useIsVerified;
