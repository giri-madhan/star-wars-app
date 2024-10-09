import React, { useState, useEffect } from "react";
import { fetchCharacters } from "../services/swapiService";
import CharacterCard from "./CharacterCard";

interface Character {
  name: string;
  url: string;
  gender: string;
  homeworld: string;
}

const CharacterList: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setLoading(true);
        const data = await fetchCharacters(1);
        setCharacters(data.results as unknown as Character[]);
      } catch (err) {
        setError("Failed to load characters. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadCharacters();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-extrabold text-center text-yellow-300 mb-12">
          Star Wars Characters
        </h1>
        {error && (
          <div
            className="bg-red-600 text-white p-4 rounded-md mb-8"
            role="alert"
          >
            {error}
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-8">
          {characters.map((character) => {
            const id = character.url.split("/")[5];
            return (
              <CharacterCard
                key={character.name}
                name={character.name}
                id={id}
                gender={character.gender}
                homePlanet={character.homeworld}
              />
            );
          })}
        </div>
        {loading && (
          <div className="flex justify-center items-center mt-12" role="status">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-300"></div>
          </div>
        )}
        {!loading && characters.length === 0 && (
          <p className="text-center text-gray-400 mt-12 text-lg">
            No characters found.
          </p>
        )}
      </div>
    </div>
  );
};

export default CharacterList;
