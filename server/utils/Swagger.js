const fs = require("fs");
const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./utils/swagger-output.json";
const endpointsFiles = ["./server.js"];

const doc = {
  info: {
    title: "Edusphere API",
    description: "API Documentation with Swagger",
  },
  host: "localhost:5000",
  schemes: ["http"],
  tags: [
    { name: "Auth", description: "Authentication endpoints" },
    { name: "RequestDemo", description: "Demo request endpoints" },
  ],
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  const swagger = JSON.parse(fs.readFileSync(outputFile));

  Object.keys(swagger.paths).forEach((path) => {
    if (path.startsWith("/auth")) {
        console.log(path)
      Object.values(swagger.paths[path]).forEach((p) => (p.tags = ["Auth"]));
    }
    if (path.startsWith("/requestdemo")) {
      Object.values(swagger.paths[path]).forEach((p) => (p.tags = ["RequestDemo"]));
    }
  });

  fs.writeFileSync(outputFile, JSON.stringify(swagger, null, 2));
});
