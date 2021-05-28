import React, { useEffect, useState } from "react";
import { app } from "../base";

export const AuthContext: any = React.createContext({});

interface User {
  displayName: string;
  email: string;
  uid: string;
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>();
  const [pending, setPending] = useState<boolean>(true);

  useEffect(() => {
    app.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return <>Loading...</>;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
