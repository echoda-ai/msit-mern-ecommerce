import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My Express.js API",
      version: "1.0.0",
      description: "A sample Express.js API built with TypeScript and Swagger",
    },
  },
  apis: ["./src/routes/*.ts"],
};
const specs = swaggerJsdoc(swaggerOptions);

export { swaggerUi, specs };
