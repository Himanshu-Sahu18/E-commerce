import React from "react";
import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
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

  return (
    <Card className="h-100 shadow-sm border-0 product-card">
      <div className="position-relative overflow-hidden">
        <Link to={`/product/${product._id}`}>
          <Card.Img
            src={product.images[0]}
            variant="top"
            className="product-image"
            style={{
              height: "250px",
              objectFit: "cover",
              transition: "transform 0.3s ease",
            }}
          />
        </Link>
        {product.featured && (
          <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
            Featured
          </Badge>
        )}
        {product.stock === 0 && (
          <Badge bg="secondary" className="position-absolute top-0 end-0 m-2">
            Out of Stock
          </Badge>
        )}
      </div>

      <Card.Body className="d-flex flex-column">
        <div className="mb-2">
          <Badge bg="light" text="dark" className="mb-2">
            {product.category}
          </Badge>
        </div>

        <Link to={`/product/${product._id}`} className="text-decoration-none">
          <Card.Title className="h6 text-dark mb-2 product-title">
            {product.name}
          </Card.Title>
        </Link>

        <Card.Text className="text-muted small mb-2 flex-grow-1">
          {product.description.length > 80
            ? `${product.description.substring(0, 80)}...`
            : product.description}
        </Card.Text>

        <div className="mb-2">
          <div className="d-flex align-items-center mb-1">
            {renderStars(product.ratings.average)}
            <small className="text-muted ms-2">({product.ratings.count})</small>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div>
            <h5 className="text-primary mb-0 fw-bold">${product.price}</h5>
            <small className="text-muted">{product.brand}</small>
          </div>
          <div className="text-end">
            <small
              className={`badge ${
                product.stock > 0 ? "bg-success" : "bg-danger"
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
            </small>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
