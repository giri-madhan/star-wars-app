import React, { useState, useEffect } from "react";
import { fetchCharacters } from "../services/swapiService";
import { SimpleGrid, Box } from "@chakra-ui/react";
import CharacterCard from "./CharacterCard";

const CharacterList: React.FC = () => {
  const [characters, setCharacters] = useState<any[]>([]);

  useEffect(() => {
    const loadCharacters = async () => {
      const data = await fetchCharacters(1);
      setCharacters(data.results);
    };
    loadCharacters();
  }, []);

  return (
    <Box p={8} bg="gray.900" minH="100vh">
      <SimpleGrid columns={[1, 2, 3]} spacing={10}>
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
      </SimpleGrid>
    </Box>
  );
};

export default CharacterList;
