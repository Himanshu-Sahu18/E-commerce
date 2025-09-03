import React from "react";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Alert,
  Container,
} from "react-bootstrap";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import BackButton from "../components/BackButton";

const Cart = () => {
  const { items, totalAmount, updateCartItem, removeFromCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, quantity) => {
    updateCartItem(productId, quantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  if (items.length === 0) {
    return (
      <Container className="py-4">
        <BackButton to="/" className="mb-4" />
        <Card className="text-center py-5">
          <Card.Body>
            <FaShoppingCart size={64} className="text-muted mb-4" />
            <h3>Your cart is empty</h3>
            <p className="text-muted mb-4">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/" className="btn btn-primary btn-lg">
              Start Shopping
            </Link>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <BackButton to="/" className="mb-4" />

      <Row className="g-4">
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Header>
              <h2 className="mb-0">
                <FaShoppingCart className="me-2" />
                Shopping Cart (
                {items.reduce((acc, item) => acc + item.quantity, 0)} items)
              </h2>
            </Card.Header>
            <Card.Body className="p-0">
              <ListGroup variant="flush">
                {items.map((item) => (
                  <ListGroup.Item key={item.product._id} className="p-4">
                    <Row className="align-items-center">
                      <Col md={2}>
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fluid
                          rounded
                          style={{ height: "80px", objectFit: "cover" }}
                        />
                      </Col>
                      <Col md={4}>
                        <Link
                          to={`/product/${item.product._id}`}
                          className="text-decoration-none"
                        >
                          <h6 className="mb-1">{item.product.name}</h6>
                        </Link>
                        <small className="text-muted">
                          {item.product.brand}
                        </small>
                      </Col>
                      <Col md={2}>
                        <strong className="text-primary">${item.price}</strong>
                      </Col>
                      <Col md={2}>
                        <Form.Select
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.product._id,
                              Number(e.target.value)
                            )
                          }
                          size="sm"
                        >
                          {[
                            ...Array(Math.min(item.product.stock, 10)).keys(),
                          ].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col md={1}>
                        <strong>
                          ${(item.price * item.quantity).toFixed(2)}
                        </strong>
                      </Col>
                      <Col md={1}>
                        <Button
                          type="button"
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleRemoveItem(item.product._id)}
                        >
                          <FaTrash />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm sticky-top" style={{ top: "2rem" }}>
            <Card.Header>
              <h4 className="mb-0">Order Summary</h4>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal:</span>
                <strong>${totalAmount.toFixed(2)}</strong>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping:</span>
                <span className="text-success">
                  {totalAmount > 100 ? "FREE" : "$10.00"}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Tax (10%):</span>
                <span>${(totalAmount * 0.1).toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>Total:</strong>
                <strong className="text-primary fs-5">
                  $
                  {(
                    totalAmount +
                    (totalAmount > 100 ? 0 : 10) +
                    totalAmount * 0.1
                  ).toFixed(2)}
                </strong>
              </div>

              {totalAmount < 100 && (
                <Alert variant="info" className="small">
                  Add ${(100 - totalAmount).toFixed(2)} more for free shipping!
                </Alert>
              )}

              <div className="d-grid">
                <Button
                  size="lg"
                  disabled={items.length === 0}
                  onClick={handleCheckout}
                  className="fw-semibold"
                >
                  Proceed To Checkout
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
