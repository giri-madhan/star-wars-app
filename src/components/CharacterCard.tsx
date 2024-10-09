import { Box, Image, Heading, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import React from "react";

interface CharacterCardProps {
  name: string;
  id: string;
  gender: string;
  homePlanet: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  name,
  id,
  gender,
  homePlanet,
}) => {
  const placeholderImage = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;

  return (
    <Box
      as={RouterLink}
      to={`/character/${id}`}
      bg="gray.700"
      borderRadius="lg"
      overflow="hidden"
      shadow="lg"
      _hover={{
        transform: "scale(1.05)",
        transition: "transform 0.2s ease-in-out",
        shadow: "2xl",
      }}
      transition="transform 0.2s ease-in-out"
      textDecoration="none"
    >
      <Image
        src={placeholderImage}
        alt={name}
        objectFit="cover"
        borderRadius="lg"
        width="100%"
        transition="0.3s"
      />
      <Box p={4} textAlign="center" bg="gray.900">
        <Heading size="md" color="yellow.300" mb={2}>
          {name}
        </Heading>
        <Text fontSize="sm" color="gray.400">
          {gender}
        </Text>
        <Text fontSize="sm" color="gray.400" mt={1}>
          {homePlanet}
        </Text>
      </Box>
    </Box>
  );
};

export default CharacterCard;
