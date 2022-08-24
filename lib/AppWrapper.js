import { useState, createContext, useMemo, useEffect } from "react";
import Cookies from "js-cookie";
const UserContext = createContext({ user: "", setUser: () => {} });

const AppWrapper = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const value = useMemo(() => ({ user, setUser, loading }), [user, loading]);
  const validateUser = async () => {
    if (user === undefined) {
      const userData = localStorage.getItem("user");

      setUser(JSON.parse(userData));
    }
    setLoading(false);
  };
  useEffect(() => {
    validateUser();
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, AppWrapper };
