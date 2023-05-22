import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { CreateAuthContext } from "../contextApi/useAuthContext";
import authservices from "../services/authServices";
import Loading from "../components/Loading";

const PresistLogin = () => {
  const [check, setCheck] = useState(true);

  const { isLoggedIn, setIsLoggedIn } = useContext(CreateAuthContext);

  useEffect(() => {
    const refresh = async () => {
      if (!isLoggedIn) {
        if(localStorage.getItem("refreshtoken")) await authservices.refreshtoken();
        setIsLoggedIn(localStorage.getItem("accesstoken"));
        setCheck(false);
      }
    };

    refresh();
  }, []);

  return isLoggedIn ? <Outlet /> : check ? <Loading /> : <Outlet />;
};

export default PresistLogin;
