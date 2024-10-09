import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCharacterDetails } from "../services/swapiService";

const CharacterDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCharacterDetails = async () => {
      try {
        if (!id) {
          throw new Error("No character ID provided");
        }

        const data = await fetchCharacterDetails(id);
        setCharacter(data);
      } catch (err) {
        setError("Failed to load character details.");
      } finally {
        setLoading(false);
      }
    };
    loadCharacterDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <div>
      <h1>{character.name}</h1>
      <p>
        <strong>Hair Color:</strong> {character.hair_color}
      </p>
      <p>
        <strong>Eye Color:</strong> {character.eye_color}
      </p>
      <p>
        <strong>Gender:</strong> {character.gender}
      </p>
      <p>
        <strong>Homeworld:</strong> {character.homeworld}
      </p>
      <h2>Films:</h2>
      <ul>
        {character.films.map((film: string, index: number) => (
          <li key={index}>{film}</li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterDetails;
