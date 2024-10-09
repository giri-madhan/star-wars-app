import { Link as RouterLink } from "react-router-dom";

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
    <RouterLink
      to={`/character/${id}`}
      className="relative block bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 w-full h-full sm:w-auto sm:h-auto" // Added w-full h-full for mobile
    >
      <img
        src={placeholderImage}
        alt={name}
        className="w-full h-64 object-contain"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://starwars-visualguide.com/assets/img/placeholder.jpg";
        }}
      />
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold text-yellow-300 mb-1">{name}</h2>
        <p className="text-sm text-gray-400 capitalize">{gender}</p>
        <p className="text-sm text-gray-400">{homePlanet || "Unknown"}</p>
      </div>
      <div className="absolute inset-0 bg-yellow-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
        <p className="text-gray-900 font-semibold">View Details</p>
      </div>
    </RouterLink>
  );
};

export default CharacterCard;
