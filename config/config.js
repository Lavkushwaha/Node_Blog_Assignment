const config = {
  env: "development",
  port: 4040,
  jwtSecret: "defaultJwtSecret",
  mongo: {
    host: "mongodb://localhost/blog",
    port: 27017
  }
};

module.exports = config;
