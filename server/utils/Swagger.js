const fs = require("fs");
const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./utils/swagger-output.json";
const endpointsFiles = ["./server.js"];
const pathTagMap = {
  "/api": "General",
  "/auth": "Auth",
  "/requestdemo": "RequestDemo",
  "/student": "Student",
  "/teacher": "Teacher",
  "/class": "Class",
  "/section": "Section",
  "/subject": "Subject",
  "/permission": "Permission",
  "/helpcenter": "HelpCenter",
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
    { name: "Student", description: "Student profile management" },
    { name: "Teacher", description: "Teacher profile management" },
    { name: "Class", description: "Class profile management" },
    { name: "Section", description: "Section profile management" },
    { name: "Subject", description: "Subject profile management" },
    { name: "Permission", description: "Element access control management" },
    { name: "General", description: "General endpoints" },
    { name: "HelpCenter", description: "Help Center article management" },
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
