"use client";

import { sumProducts } from "@/helpers/helper";
import { act, createContext, useContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
  selectedItems: [],
  itemsCounter: 0,
  total: 0,
  checkout: false,
};
const reducer = (state, action) => {
  //we need 4 actions
  //first add to cart (Array)

  switch (action.type) {
    //check product exist in cart or no, if no add but if yes we should't add!
    case "ADD_ITEM":
      if (
        !state.selectedItems.find((i) => {
          i._id === action.payload._id;
        })
      ) {
        state.selectedItems.push({ ...action.payload, quantity: 1 });
        return {
          ...state,
          ...sumProducts(state.selectedItems),
          checkout: false,
        };
      }

    case "REMOVE_ITEM":
      const newSelectedItems = state.selectedItems.filter(
        (i) => i._id !== action.payload._id,
      );

      return {
        ...state,
        selectedItems: [...newSelectedItems],
        ...sumProducts(newSelectedItems),
        checkout: false,
      };

    case "INCREASE":
      const increaseIndex = state.selectedItems.findIndex(
        (i) => i._id === action.payload._id,
      );
      state.selectedItems[increaseIndex].quantity++;
      return {
        ...state,
        ...sumProducts(state.selectedItems),
        checkout: false,
      };

    case "DECREASE":
      const decreaseIndex = state.selectedItems.findIndex(
        (i) => i._id === action.payload._id,
      );
      state.selectedItems[decreaseIndex].quantity--;
      return {
        ...state,
        ...sumProducts(state.selectedItems),
        checkout: false,
      };
      case 'SET_CART':
        return {
          ...state,
          ...action.payload,
        };
    case "CHECKOUT":
      return {
        selectedItems: [],
        itemsCounter: 0,
        total: 0,
        checkout: true,
      };

    default:
      throw new Error("Invalid Action!");
  }
};

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

// const useCart = () => {
//   //to like a real hook
//   const { state, dispatch } = useContext(CartContext);
//   return [state, dispatch];
// };

export default CartProvider;
// export { useCart };
