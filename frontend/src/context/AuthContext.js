import { createContext, useState, useEffect } from "react";
// import jwtDecode from "jwt-decode";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    console.log(data);

    if (response.status === 200) {
      console.log("Logged in");

      setAuthToken(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/dashboard");
    } else {
      console.log(response.status);
      console.log("there is a server issue");
      alert("Something went wrong");
    }
  };

  const registerUser = async (email, username, password, password2) => {
    const response = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
        password2,
      }),
    });

    if (response.status === 201) {
      navigate("/login");
    } else {
      console.log(response);
      console.log("there is a server issue");
      alert("Something went wrong");
    }
  };

  const logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  const ContextData = {
    user,
    setUser,
    authToken,
    setAuthToken,
    registerUser,
    loginUser,
    logoutUser,
  };

  useEffect(() => {
    if (authToken) {
      setUser(jwt_decode(authToken.access));
    }

    setLoading(false);
  }, [authToken, loading]);

  return (
    <AuthContext.Provider value={ContextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
