const fs = require("fs");
const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./utils/swagger-output.json";
const endpointsFiles = ["./server.js"];
const pathTagMap = {
  "/api": "General",
  "/auth": "Auth",
  "/requestdemo": "RequestDemo",
  "/student": "Student",
  "/teacher": "Teacher"
};

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
    for (const prefix in pathTagMap) {
      if (path.startsWith(prefix)) {
        const tag = pathTagMap[prefix];
        Object.values(swagger.paths[path]).forEach((p) => {
          p.tags = [tag];
        });
      }
    }
  });

  fs.writeFileSync(outputFile, JSON.stringify(swagger, null, 2));
});
