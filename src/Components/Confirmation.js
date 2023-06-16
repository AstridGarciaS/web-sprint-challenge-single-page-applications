import React from 'react';

const Confirmation = (props) => {
  const { order } = props;

  return (
    <div className="confirmation">
      <h2>Order Confirmation</h2>
      <p>Thank you for your order, {order.customer}!</p>
      <p>Size: {order.size}</p>
      <p>Toppings: {order.toppings.join(', ')}</p>
      <p>Special Instructions: {order.instructions}</p>
    </div>
  );
};

export default Confirmation;
