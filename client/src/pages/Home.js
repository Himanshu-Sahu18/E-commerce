import React, { useState, useEffect, useCallback } from "react";
import {
  Row,
  Col,
  Form,
  Spinner,
  Alert,
  Pagination,
  Container,
  Card,
  InputGroup,
} from "react-bootstrap";
import { FaSearch, FaFilter } from "react-icons/fa";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [keyword, setKeyword] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    "Electronics",
    "Clothing",
    "Books",
    "Home",
    "Sports",
    "Beauty",
    "Other",
  ];

  const fetchProducts = useCallback(
    async (page = 1, searchTerm = keyword, selectedCategory = category) => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (searchTerm) params.append("keyword", searchTerm);
        if (selectedCategory) params.append("category", selectedCategory);
        params.append("page", page);
        params.append("limit", 12);

        const res = await axios.get(`/api/products?${params}`);
        setProducts(res.data.products);
        setPagination(res.data.pagination);
        setCurrentPage(page);
      } catch (error) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    },
    [keyword, category]
  );

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setKeyword(searchInput);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  const handlePageChange = (page) => {
    fetchProducts(page);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Loading products...</p>
      </Container>
    );
  }

  return (
    <Container fluid className="px-4">
      {/* Hero Section */}
      <div className="hero-section bg-gradient-primary text-white rounded-4 p-5 mb-5 text-center">
        <h1 className="display-4 fw-bold mb-3">Welcome to Our Store</h1>
        <p className="lead mb-0">Discover amazing products at great prices</p>
      </div>

      {/* Search and Filter Section */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row className="g-3 align-items-end">
            <Col md={6}>
              <Form.Label className="fw-semibold text-muted mb-2">
                <FaSearch className="me-2" />
                Search Products
              </Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search for products..."
                  value={searchInput}
                  onChange={handleSearchChange}
                  className="border-start-0"
                  style={{ cursor: "text" }}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <Form.Label className="fw-semibold text-muted mb-2">
                <FaFilter className="me-2" />
                Filter by Category
              </Form.Label>
              <Form.Select
                value={category}
                onChange={handleCategoryChange}
                className="form-select-lg"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      {/* Results Info */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 mb-0">
          {keyword || category ? "Search Results" : "Featured Products"}
          <span className="text-muted ms-2">
            ({pagination.total || products.length}{" "}
            {products.length === 1 ? "product" : "products"})
          </span>
        </h2>
      </div>

      {products.length === 0 ? (
        <Card className="text-center py-5">
          <Card.Body>
            <div className="mb-4">
              <FaSearch size={48} className="text-muted" />
            </div>
            <h3>No products found</h3>
            <p className="text-muted">
              Try adjusting your search or filter criteria
            </p>
          </Card.Body>
        </Card>
      ) : (
        <>
          <Row className="g-4">
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination size="lg">
                <Pagination.First
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                />
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />

                {[...Array(pagination.pages)].map((_, index) => {
                  const page = index + 1;
                  if (
                    page === 1 ||
                    page === pagination.pages ||
                    (page >= currentPage - 2 && page <= currentPage + 2)
                  ) {
                    return (
                      <Pagination.Item
                        key={page}
                        active={page === currentPage}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Pagination.Item>
                    );
                  } else if (
                    page === currentPage - 3 ||
                    page === currentPage + 3
                  ) {
                    return <Pagination.Ellipsis key={page} />;
                  }
                  return null;
                })}

                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pagination.pages}
                />
                <Pagination.Last
                  onClick={() => handlePageChange(pagination.pages)}
                  disabled={currentPage === pagination.pages}
                />
              </Pagination>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;
