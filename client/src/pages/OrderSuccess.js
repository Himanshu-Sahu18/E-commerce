import React from "react";
import { Alert, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const OrderSuccess = () => {
  const { id } = useParams();

  return (
    <div className="text-center">
      <FaCheckCircle size={100} color="green" className="mb-3" />
      <h1>Order Placed Successfully!</h1>
      <Alert variant="success">
        Your order has been placed successfully. Order ID: {id}
      </Alert>
      <p>You will receive a confirmation email shortly.</p>
      <div className="mt-4">
        <Link to={`/order/${id}`}>
          <Button variant="primary" className="me-3">
            View Order
          </Button>
        </Link>
        <Link to="/">
          <Button variant="outline-primary">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
