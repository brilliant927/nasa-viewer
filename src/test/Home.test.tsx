import { render, fireEvent, screen } from "@testing-library/react";
import Home from "../pages/Home";
test("Home page", () => {
  render(<Home />);

  const query = screen.getByTestId('query');
  const startAt = screen.getByTestId('startAt');
  const endAt = screen.getByTestId('endAt');

  expect(query).toBeInTheDocument();
  expect(startAt).toBeInTheDocument();
  expect(endAt).toBeInTheDocument();
});

test("Validation Check", () => {
  render(<Home />);

  const query = screen.getByTestId('query');
  const searchButton = screen.getByTestId('search-button');
  const invalidQuery = screen.getByTestId('invalid-query');

  fireEvent.click(searchButton);

  expect(query).toBeInTheDocument();
  expect(invalidQuery).toBeVisible();
});