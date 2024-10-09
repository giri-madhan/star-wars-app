import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CharacterList from "../components/CharacterList";
import { fetchCharacters } from "../services/swapiService";

jest.mock("../services/swapiService");

const mockCharacters = {
  results: [
    {
      name: "Luke Skywalker",
      gender: "male",
      homeworld: "Tatooine",
      url: "https://swapi.dev/api/people/1/",
    },
  ],
};

const mockEmptyResponse = {
  results: [],
};

describe("CharacterList Component", () => {
  test("renders CharacterList and displays characters", async () => {
    (fetchCharacters as jest.Mock).mockResolvedValue(mockCharacters);

    render(
      <Router>
        <CharacterList />
      </Router>
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    });

    expect(screen.getByText("male")).toBeInTheDocument();
    expect(screen.getByText("Tatooine")).toBeInTheDocument();
  });

  test("displays loading spinner initially", () => {
    (fetchCharacters as jest.Mock).mockReturnValue(new Promise(() => {}));
    render(
      <Router>
        <CharacterList />
      </Router>
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("displays error message on failed fetch", async () => {
    (fetchCharacters as jest.Mock).mockRejectedValue(
      new Error("Network Error")
    );

    render(
      <Router>
        <CharacterList />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Failed to load characters. Please try again later."
      );
    });
  });

  test("displays 'No characters found' message when there are no characters", async () => {
    (fetchCharacters as jest.Mock).mockResolvedValue(mockEmptyResponse);

    render(
      <Router>
        <CharacterList />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("No characters found.")).toBeInTheDocument();
    });
  });
});
