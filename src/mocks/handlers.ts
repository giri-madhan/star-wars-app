import { rest } from "msw";

export const handlers = [
  rest.get("https://swapi.dev/api/people", (req, res, ctx) => {
    return res(
      ctx.json({
        results: [
          {
            name: "Luke Skywalker",
            gender: "male",
            homeworld: "https://swapi.dev/api/planets/1/",
            url: "https://swapi.dev/api/people/1/",
          },
        ],
      })
    );
  }),

  rest.get("https://swapi.dev/api/people/:id", (req, res, ctx) => {
    return res(
      ctx.json({
        name: "Luke Skywalker",
        gender: "male",
        hair_color: "blond",
        eye_color: "blue",
        homeworld: "Tatooine",
        films: ["A New Hope", "The Empire Strikes Back"],
      })
    );
  }),

  rest.get("https://swapi.dev/api/planets/1/", (req, res, ctx) => {
    return res(
      ctx.json({
        name: "Tatooine",
      })
    );
  }),
];
