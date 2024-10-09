const BASE_URL = "https://swapi.dev/api/";

interface Character {
  name: string;
  gender: string;
  homeworld: string;
  films: string[];
  [key: string]: any;
}

interface ApiResponse<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}

// Cache
const cache: { [key: string]: any } = {};

const fetchData = async <T>(url: string): Promise<T> => {
  if (cache[url]) {
    return cache[url];
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  cache[url] = data;
  return data;
};

const fetchHomeworld = async (homeworldUrl: string): Promise<string> => {
  const homeworldData = await fetchData<{ name: string }>(homeworldUrl);
  return homeworldData.name;
};

const fetchFilms = async (filmUrls: string[]): Promise<string[]> => {
  const filmPromises = filmUrls.map(async (filmUrl) => {
    const film = await fetchData<{ title: string }>(filmUrl);
    return film.title;
  });
  return Promise.all(filmPromises);
};

export const fetchCharacters = async (
  page: number
): Promise<ApiResponse<Character>> => {
  const cacheKey = `characters_page_${page}`;
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  const data = await fetchData<ApiResponse<Character>>(
    `${BASE_URL}people/?page=${page}`
  );
  const charactersWithHomeworld = await Promise.all(
    data.results.map(async (character) => ({
      ...character,
      homeworld: await fetchHomeworld(character.homeworld),
    }))
  );
  const result = { ...data, results: charactersWithHomeworld };
  cache[cacheKey] = result;
  return result;
};

export const fetchCharacterDetails = async (id: string): Promise<Character> => {
  const cacheKey = `character_${id}`;
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  const data = await fetchData<Character>(`${BASE_URL}people/${id}/`);
  const homeworldName = await fetchHomeworld(data.homeworld);
  const filmsData = await fetchFilms(data.films);

  const result = {
    ...data,
    homeworld: homeworldName,
    films: filmsData,
  };
  cache[cacheKey] = result;
  return result;
};
