import swaggerJsdoc, { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Wordle API",
      version: "1.0.0",
      description: "API documentation for the Wordle game",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/controllers/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
