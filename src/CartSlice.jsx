import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // كل عناصر السلة
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // إضافة عنصر للسلة
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;

      const existingItem = state.items.find((item) => item.name === name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          name,
          image,
          cost,
          quantity: 1,
        });
      }
    },

    // حذف عنصر من السلة
    removeItem: (state, action) => {
      const name = action.payload;
      state.items = state.items.filter((item) => item.name !== name);
    },

    // تحديث الكمية
    updateQuantity: (state, action) => {
      const { name, amount } = action.payload;
      const item = state.items.find((item) => item.name === name);
      if (item) {
        item.quantity = amount;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
