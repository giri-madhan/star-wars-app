import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CharacterDetails from "../components/CharacterDetails";
import { fetchCharacterDetails } from "../services/swapiService";

jest.mock("../services/swapiService");

const mockCharacter = {
  name: "Luke Skywalker",
  hair_color: "blond",
  eye_color: "blue",
  gender: "male",
  homeworld: "Tatooine",
  films: ["A New Hope", "The Empire Strikes Back"],
};

describe("CharacterDetails Component", () => {
  test("renders CharacterDetails and displays character information", async () => {
    (fetchCharacterDetails as jest.Mock).mockResolvedValue(mockCharacter);

    render(
      <MemoryRouter initialEntries={["/character/1"]}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Luke Skywalker" })
      ).toBeInTheDocument();
    });

    expect(screen.getByText("Hair Color")).toBeInTheDocument();
    expect(screen.getByText("blond")).toBeInTheDocument();
    expect(screen.getByText("Eye Color")).toBeInTheDocument();
    expect(screen.getByText("blue")).toBeInTheDocument();
    expect(screen.getByText("Gender")).toBeInTheDocument();
    expect(screen.getByText("male")).toBeInTheDocument();
    expect(screen.getByText("Homeworld")).toBeInTheDocument();
    expect(screen.getByText("Tatooine")).toBeInTheDocument();
    expect(screen.getByText("A New Hope")).toBeInTheDocument();
    expect(screen.getByText("The Empire Strikes Back")).toBeInTheDocument();
  });

  test("displays error message on failed fetch", async () => {
    (fetchCharacterDetails as jest.Mock).mockRejectedValue(
      new Error("Network error")
    );

    render(
      <MemoryRouter initialEntries={["/character/1"]}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          "Failed to load character details. Please try again later."
        )
      ).toBeInTheDocument();
    });

    expect(
      screen.getByRole("button", { name: /go back/i })
    ).toBeInTheDocument();
  });

  test("displays 'Character not found' when character does not exist", async () => {
    (fetchCharacterDetails as jest.Mock).mockResolvedValue(null); // Mock the fetch to return null

    render(
      <MemoryRouter initialEntries={["/character/1"]}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Character not found")).toBeInTheDocument();
    });

    expect(
      screen.getByRole("button", { name: /go back/i })
    ).toBeInTheDocument();
  });
});
