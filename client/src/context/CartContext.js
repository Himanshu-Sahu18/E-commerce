import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_CART":
      return {
        ...state,
        items: action.payload.items || [],
        totalAmount: action.payload.totalAmount || 0,
        loading: false,
      };
    case "ADD_TO_CART":
    case "UPDATE_CART":
      return {
        ...state,
        items: action.payload.items,
        totalAmount: action.payload.totalAmount,
        loading: false,
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: action.payload.items,
        totalAmount: action.payload.totalAmount,
      };
    case "CLEAR_CART":
      return {
        ...state,
        items: [],
        totalAmount: 0,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const initialState = {
    items: [],
    totalAmount: 0,
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { isAuthenticated } = useAuth();

  // Load cart
  const loadCart = useCallback(async () => {
    if (!isAuthenticated) return;

    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get("/api/cart");
      dispatch({
        type: "LOAD_CART",
        payload: res.data.cart,
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response?.data?.message || "Failed to load cart",
      });
    }
  }, [isAuthenticated]);

  // Add to cart
  const addToCart = async (productId, quantity = 1) => {
    if (!isAuthenticated)
      return { success: false, message: "Please login first" };

    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.post("/api/cart/add", { productId, quantity });
      dispatch({
        type: "ADD_TO_CART",
        payload: res.data.cart,
      });
      return { success: true };
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response?.data?.message || "Failed to add to cart",
      });
      return {
        success: false,
        message: error.response?.data?.message || "Failed to add to cart",
      };
    }
  };

  // Update cart item
  const updateCartItem = async (productId, quantity) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.put("/api/cart/update", { productId, quantity });
      dispatch({
        type: "UPDATE_CART",
        payload: res.data.cart,
      });
      return { success: true };
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response?.data?.message || "Failed to update cart",
      });
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update cart",
      };
    }
  };

  // Remove from cart
  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete(`/api/cart/remove/${productId}`);
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: res.data.cart,
      });
      return { success: true };
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response?.data?.message || "Failed to remove from cart",
      });
      return {
        success: false,
        message: error.response?.data?.message || "Failed to remove from cart",
      };
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      await axios.delete("/api/cart/clear");
      dispatch({ type: "CLEAR_CART" });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to clear cart",
      };
    }
  };

  // Get cart item count
  const getCartItemCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      dispatch({ type: "CLEAR_CART" });
    }
  }, [isAuthenticated, loadCart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        loadCart,
        getCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
