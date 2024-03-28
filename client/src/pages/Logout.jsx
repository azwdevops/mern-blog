import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";

const Logout = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  navigate("/login");
  setCurrentUser(null);
  return <></>;
};

export default Logout;
