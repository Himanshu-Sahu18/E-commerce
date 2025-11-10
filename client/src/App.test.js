import { render, screen } from "@testing-library/react";
import React from "react";

// Simple component test
const TestComponent = () => <div>Test Component</div>;

test("renders test component", () => {
  render(<TestComponent />);
  expect(screen.getByText("Test Component")).toBeInTheDocument();
});
