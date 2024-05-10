import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";


const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
}

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn , setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  getCurrentUser()
    .then((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      }
      else {
        setIsLoggedIn(false);
        setUser(null);
      }
    })
    .catch((error) => {
      console.error(error);
      setIsLoading(false);
    }).finally(() => {
      setIsLoading(false);
    }
  );
  }, []);

  return (
    <GlobalContext.Provider value={{
      user, setUser,
      isLoggedIn, setIsLoggedIn,
      isLoading, setIsLoading
    }}>
      {children}
    </GlobalContext.Provider>
  );
}