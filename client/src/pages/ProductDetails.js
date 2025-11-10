import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  Card,
  Button,
  Form,
  Alert,
  Spinner,
  Container,
  Badge,
} from "react-bootstrap";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaShoppingCart,
  FaHeart,
} from "react-icons/fa";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import BackButton from "../components/BackButton";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-warning" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-warning" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-muted" />);
    }

    return stars;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data.product);
      } catch (error) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      setMessage("Please login to add items to cart");
      return;
    }

    const result = await addToCart(product._id, quantity);
    if (result.success) {
      setMessage("Product added to cart successfully!");
    } else {
      setMessage(result.message);
    }

    setTimeout(() => setMessage(""), 3000);
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Loading product details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <BackButton to="/" className="mb-3" />
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <BackButton to="/" className="mb-4" />

      {message && (
        <Alert
          variant={message.includes("success") ? "success" : "info"}
          className="mb-4"
        >
          {message}
        </Alert>
      )}

      <Row className="g-4">
        {/* Product Images */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm">
            <div className="position-relative">
              <Image
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                fluid
                className="rounded"
                style={{ height: "500px", objectFit: "cover", width: "100%" }}
              />
              {product.stock === 0 && (
                <Badge
                  bg="danger"
                  className="position-absolute top-0 end-0 m-3 fs-6"
                >
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Image thumbnails if multiple images */}
            {product.images.length > 1 && (
              <Card.Body>
                <Row className="g-2">
                  {product.images.map((image, index) => (
                    <Col key={index} xs={3}>
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fluid
                        className={`rounded cursor-pointer border ${
                          selectedImage === index
                            ? "border-primary border-3"
                            : "border-light"
                        }`}
                        style={{ height: "80px", objectFit: "cover" }}
                        onClick={() => setSelectedImage(index)}
                      />
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            )}
          </Card>
        </Col>

        {/* Product Info */}
        <Col lg={6}>
          <div className="h-100 d-flex flex-column">
            {/* Product Header */}
            <div className="mb-4">
              <div className="d-flex align-items-center mb-2">
                <Badge bg="primary" className="me-2">
                  {product.category}
                </Badge>
                <small className="text-muted">{product.brand}</small>
              </div>
              <h1 className="display-6 fw-bold mb-3">{product.name}</h1>

              {/* Rating */}
              <div className="d-flex align-items-center mb-3">
                <div className="me-2">
                  {renderStars(product.ratings.average)}
                </div>
                <span className="text-muted">
                  {product.ratings.average} ({product.ratings.count} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-4">
                <h2 className="text-primary fw-bold mb-0">${product.price}</h2>
              </div>
            </div>

            {/* Description */}
            <Card className="mb-4 flex-grow-1">
              <Card.Header>
                <h5 className="mb-0">Product Description</h5>
              </Card.Header>
              <Card.Body>
                <p className="mb-0">{product.description}</p>
              </Card.Body>
            </Card>

            {/* Purchase Section */}
            <Card className="shadow-sm">
              <Card.Body>
                <Row className="align-items-center mb-3">
                  <Col>
                    <strong>Availability:</strong>
                  </Col>
                  <Col className="text-end">
                    <Badge bg={product.stock > 0 ? "success" : "danger"}>
                      {product.stock > 0
                        ? `${product.stock} in stock`
                        : "Out of Stock"}
                    </Badge>
                  </Col>
                </Row>

                {product.stock > 0 && (
                  <Row className="align-items-center mb-3">
                    <Col sm={4}>
                      <Form.Label className="fw-semibold">Quantity:</Form.Label>
                    </Col>
                    <Col sm={8}>
                      <Form.Select
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        size="lg"
                      >
                        {[...Array(Math.min(product.stock, 10)).keys()].map(
                          (x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          )
                        )}
                      </Form.Select>
                    </Col>
                  </Row>
                )}

                <div className="d-grid gap-2">
                  <Button
                    onClick={handleAddToCart}
                    size="lg"
                    disabled={product.stock === 0}
                    className="fw-semibold"
                  >
                    <FaShoppingCart className="me-2" />
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </Button>
                  <Button variant="outline-danger" size="lg">
                    <FaHeart className="me-2" />
                    Add to Wishlist
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>

      {/* Reviews Section */}
      <Row className="mt-5">
        <Col>
          <Card className="shadow-sm">
            <Card.Header>
              <h3 className="mb-0">Customer Reviews</h3>
            </Card.Header>
            <Card.Body>
              {product.reviews.length === 0 ? (
                <div className="text-center py-4">
                  <FaStar size={48} className="text-muted mb-3" />
                  <h5>No Reviews Yet</h5>
                  <p className="text-muted">
                    Be the first to review this product!
                  </p>
                </div>
              ) : (
                <Row>
                  {product.reviews.map((review) => (
                    <Col key={review._id} md={6} className="mb-4">
                      <Card className="h-100 border-0 bg-light">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h6 className="fw-bold mb-0">{review.name}</h6>
                            <small className="text-muted">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </small>
                          </div>
                          <div className="mb-2">
                            {renderStars(review.rating)}
                          </div>
                          <p className="mb-0 small">{review.comment}</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
