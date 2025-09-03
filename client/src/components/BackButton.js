import React from "react";
import { Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BackButton = ({
  to,
  children,
  variant = "outline-secondary",
  className = "",
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      variant={variant}
      onClick={handleBack}
      className={`d-flex align-items-center ${className}`}
    >
      <FaArrowLeft className="me-2" />
      {children || "Go Back"}
    </Button>
  );
};

export default BackButton;
