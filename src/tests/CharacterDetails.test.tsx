import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CharacterDetails from "../components/CharacterDetails";

test("renders CharacterDetails and displays character information", async () => {
  render(
    <MemoryRouter initialEntries={["/character/1"]}>
      <Routes>
        <Route path="/character/:id" element={<CharacterDetails />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  });

  expect(screen.getByText("Hair Color: blond")).toBeInTheDocument();
  expect(screen.getByText("Eye Color: blue")).toBeInTheDocument();
  expect(screen.getByText("Gender: male")).toBeInTheDocument();
  expect(screen.getByText("Homeworld: Tatooine")).toBeInTheDocument();
  expect(screen.getByText("A New Hope")).toBeInTheDocument();
  expect(screen.getByText("The Empire Strikes Back")).toBeInTheDocument();
});
