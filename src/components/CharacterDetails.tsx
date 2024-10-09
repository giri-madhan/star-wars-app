import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCharacterDetails } from "../services/swapiService";

interface Character {
  name: string;
  hair_color: string;
  eye_color: string;
  gender: string;
  homeworld: string;
  films: string[];
}

const CharacterDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCharacter = async () => {
      if (id) {
        try {
          const data = await fetchCharacterDetails(id);
          setCharacter(data as Character);
        } catch (error) {
          console.error("Failed to fetch character details:", error);
          setError("Failed to load character details. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };
    loadCharacter();
  }, [id]);

  const placeholderImage = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900">
        <div
          className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-300"
          role="status"
          aria-live="polite"
        ></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
        <p className="text-2xl text-red-500 mb-4">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
        <p className="text-2xl mb-4">Character not found</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-900 text-white p-6"
      data-testid="character-details-container"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                src={placeholderImage}
                alt={character.name}
                className="h-48 w-full object-cover md:h-full md:w-48"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                }}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-yellow-300 font-semibold">
                Character Profile
              </div>
              <h1 className="mt-1 text-3xl font-bold text-yellow-300">
                {character.name}
              </h1>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {[
                  { label: "Hair Color", value: character.hair_color },
                  { label: "Eye Color", value: character.eye_color },
                  { label: "Gender", value: character.gender },
                  { label: "Homeworld", value: character.homeworld },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="text-sm text-gray-400">{item.label}</span>
                    <span className="text-lg capitalize">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="px-8 py-6 bg-gray-700">
            <h2 className="text-xl font-semibold text-yellow-300 mb-4">
              Films
            </h2>
            <ul className="space-y-2">
              {character.films.map((film: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span>{film}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
