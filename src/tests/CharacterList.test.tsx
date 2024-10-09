import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CharacterList from "../components/CharacterList";

test("renders CharacterList and displays characters", async () => {
  render(
    <Router>
      <CharacterList />
    </Router>
  );

  await waitFor(() => {
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  });

  expect(screen.getByText("male")).toBeInTheDocument();
  expect(screen.getByText("Tatooine")).toBeInTheDocument();
});
