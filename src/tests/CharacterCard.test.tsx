import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CharacterCard from "../components/CharacterCard";

test("renders CharacterCard with correct information", () => {
  render(
    <Router>
      <CharacterCard
        name="Luke Skywalker"
        id="1"
        gender="male"
        homePlanet="Tatooine"
      />
    </Router>
  );

  expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  expect(screen.getByText("male")).toBeInTheDocument();
  expect(screen.getByText("Tatooine")).toBeInTheDocument();
  expect(screen.getByRole("img")).toHaveAttribute(
    "src",
    "https://starwars-visualguide.com/assets/img/characters/1.jpg"
  );
});
