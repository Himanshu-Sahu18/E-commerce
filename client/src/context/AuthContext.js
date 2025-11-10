import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false,
      };
    case "LOGOUT":
    case "AUTH_ERROR":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case "USER_LOADED":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const initialState = {
    token: localStorage.getItem("token"),
    user: null,
    isAuthenticated: false,
    loading: true,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set auth token in axios headers
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  // Load user
  const loadUser = useCallback(async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      try {
        const res = await axios.get("/api/auth/me");
        dispatch({
          type: "USER_LOADED",
          payload: res.data.user,
        });
      } catch (error) {
        dispatch({ type: "AUTH_ERROR" });
      }
    } else {
      dispatch({ type: "AUTH_ERROR" });
    }
  }, []);

  // Register user
  const register = async (userData) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.post("/api/auth/register", userData);
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: res.data,
      });
      setAuthToken(res.data.token);
      return { success: true };
    } catch (error) {
      dispatch({ type: "AUTH_ERROR" });
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  // Login user
  const login = async (userData) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.post("/api/auth/login", userData);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data,
      });
      setAuthToken(res.data.token);
      return { success: true };
    } catch (error) {
      dispatch({ type: "AUTH_ERROR" });
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  // Logout
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setAuthToken(null);
  };

  // Update profile
  const updateProfile = async (userData) => {
    try {
      const res = await axios.put("/api/users/profile", userData);
      dispatch({
        type: "USER_LOADED",
        payload: res.data.user,
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Update failed",
      };
    }
  };

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        register,
        login,
        logout,
        updateProfile,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
