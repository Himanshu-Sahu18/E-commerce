import React, { useState, useEffect } from "react";
import { Row, Col, Card, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          axios.get("/api/users"),
          axios.get("/api/products?limit=1000"),
          axios.get("/api/orders"),
        ]);

        const totalRevenue = ordersRes.data.orders.reduce(
          (sum, order) => sum + order.totalPrice,
          0
        );

        setStats({
          totalUsers: usersRes.data.users.length,
          totalProducts: productsRes.data.products.length,
          totalOrders: ordersRes.data.orders.length,
          totalRevenue,
        });
      } catch (error) {
        setError("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <>
      <h1>Admin Dashboard</h1>

      <Row>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text className="display-4">{stats.totalUsers}</Card.Text>
              <Link to="/admin/users" className="btn btn-primary">
                Manage Users
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Products</Card.Title>
              <Card.Text className="display-4">{stats.totalProducts}</Card.Text>
              <Link to="/admin/products" className="btn btn-primary">
                Manage Products
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Orders</Card.Title>
              <Card.Text className="display-4">{stats.totalOrders}</Card.Text>
              <Link to="/admin/orders" className="btn btn-primary">
                Manage Orders
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Revenue</Card.Title>
              <Card.Text className="display-4">
                ${stats.totalRevenue.toFixed(2)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AdminDashboard;
