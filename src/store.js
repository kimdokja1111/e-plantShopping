import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

// إنشاء الـ Redux store
const store = configureStore({
  reducer: {
    // اسم السلايس في الستور = cart
    cart: cartReducer,
  },
});

export default store;
