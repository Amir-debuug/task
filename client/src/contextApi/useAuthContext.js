import { createContext, useState } from "react";

export const CreateAuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [updateList, setUpdateList] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("accesstoken")
  );

  return (
    <CreateAuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, updateList, setUpdateList }}
    >
      {children}
    </CreateAuthContext.Provider>
  );
};
