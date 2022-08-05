const Path = require("path");
const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");

const init = async () => {
  const server = new Hapi.Server({
    port: process.env.NODE_ENV === "development" ? 14201 : undefined,
    routes: {
      files: {
        relativeTo: Path.join(__dirname, "public"),
      },
    },
  });

  await server.register(Inert);

  server.route({
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: ".",
        redirectToSlash: true,
      },
    },
  });

  server.route({
    method: "GET",
    path: "/api/test",
    handler() {
      return "666";
    },
  });

  await server.start();

  console.log("Server running at:", server.info.uri);
};

init();
