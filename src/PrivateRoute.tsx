import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";

const PrivateRoutes = () => {
  const { userAccount } = useContext(AuthContext);

  return userAccount?.token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
