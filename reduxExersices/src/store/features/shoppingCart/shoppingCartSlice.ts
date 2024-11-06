import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface ShoppingCartStateType {
  items: Item[];
  total: number;
}

const itemList: Item[] = [
  { id: 1, name: "eggs", price: 22.9, quantity: 0 },
  { id: 2, name: "water", price: 3.9, quantity: 0 },
  { id: 3, name: "onion", price: 4.9, quantity: 0 },
  { id: 4, name: "potatoes", price: 5.9, quantity: 0 },
];

const initialState: ShoppingCartStateType = {
  items: itemList,
  total: itemList.reduce((acc: number, item: Item) => acc + item.price, 0),
};

export const ShoppingCartSlice = createSlice({
  initialState,
  name: "shoppingCart",
  reducers: {
    updateCart: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const toChange = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (toChange) toChange.quantity = action.payload.quantity;

      // update total
      state.total = state.items.reduce(
        (acc: number, item: Item) => acc + item.price,
        0
      );
    },
  },
});

export const { updateCart } = ShoppingCartSlice.actions;
export default ShoppingCartSlice.reducer;
