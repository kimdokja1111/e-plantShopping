import React from 'react';
import './CartItem.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeItem } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();

  // نجيب العناصر من السلة
  const items = useSelector((state) => state.cart.items);

  // إجمالي تكلفة عنصر واحد (subtotal)
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.substring(1)); // يحذف $
    return price * item.quantity;
  };

  // إجمالي كل السلة
  const calculateTotalAmount = () => {
    return items.reduce((total, item) => {
      return total + calculateTotalCost(item);
    }, 0);
  };

  // زر + (زيادة الكمية)
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        amount: item.quantity + 1,
      })
    );
  };

  // زر - (نقص الكمية أو حذف لو وصلت 0)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          amount: item.quantity - 1,
        })
      );
    } else {
      // لو الحين 1 ونقصنا → نحذف العنصر
      dispatch(removeItem(item.name));
    }
  };

  // زر Delete
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // زر Continue Shopping
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  // زر Checkout (بس رسالة تنطبق مع اللاب)
  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Functionality to be added for future reference');
  };

  if (!items || items.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your cart is empty</h2>
        <button onClick={handleContinueShopping}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>

      <div className="cart-items-list">
        {items.map((item) => (
          <div key={item.name} className="cart-item-card">
            <div className="cart-item-left">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>Unit price: {item.cost}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Subtotal: ${calculateTotalCost(item).toFixed(2)}</p>
              </div>
            </div>

            <div className="cart-item-actions">
              <div className="quantity-buttons">
                <button onClick={() => handleIncrement(item)}>+</button>
                <button onClick={() => handleDecrement(item)}>-</button>
              </div>
              <button className="delete-button" onClick={() => handleRemove(item)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: ${calculateTotalAmount().toFixed(2)}</h3>

        <div className="cart-buttons">
          <button onClick={handleContinueShopping}>Continue Shopping</button>
          <button onClick={handleCheckoutShopping}>Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
