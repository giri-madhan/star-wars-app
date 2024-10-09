import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCharacterDetails } from "../services/swapiService";
import {
  Box,
  Text,
  Heading,
  Image,
  Stack,
  List,
  ListItem,
  Button,
} from "@chakra-ui/react";

const CharacterDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<any>(null);

  useEffect(() => {
    const loadCharacter = async () => {
      if (id) {
        const data = await fetchCharacterDetails(id);
        setCharacter(data);
      }
    };
    loadCharacter();
  }, [id]);

  if (!character) return <Text>Loading...</Text>;

  const placeholderImage = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;

  return (
    <Box
      p={6}
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bg="gray.900"
      color="white"
    >
      <Box
        width={["90%", "80%", "70%"]}
        maxW="1200px"
        p={4}
        bg="gray.800"
        borderRadius="lg"
        shadow="lg"
      >
        <Stack
          direction={["column", "row"]}
          spacing={8}
          alignItems="flex-start"
        >
          <Image
            src={placeholderImage}
            alt={character.name}
            borderRadius="md"
            objectFit="cover"
            maxW={["100%", "50%"]}
          />
          <Stack spacing={4} width={["100%", "50%"]}>
            <Heading size="2xl" textAlign="center" color="yellow.300">
              {character.name}
            </Heading>
            <Text fontSize="lg" color="gray.300">
              <strong>Hair Color:</strong> {character.hair_color}
            </Text>
            <Text fontSize="lg" color="gray.300">
              <strong>Eye Color:</strong> {character.eye_color}
            </Text>
            <Text fontSize="lg" color="gray.300">
              <strong>Gender:</strong> {character.gender}
            </Text>
            <Text fontSize="lg" color="gray.300">
              <strong>Homeworld:</strong> {character.homeworld}
            </Text>

            <Heading size="lg" mt={4} color="gray.200">
              Films:
            </Heading>
            <List spacing={3}>
              {character.films.map((film: string, index: number) => (
                <ListItem key={index} color="gray.400">
                  {film}
                </ListItem>
              ))}
            </List>
          </Stack>
        </Stack>

        <Box display="flex" justifyContent="center" mt={6}>
          <Button
            colorScheme="yellow"
            size="lg"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CharacterDetails;
