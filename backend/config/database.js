module.exports = ({ env }) => {
  return {
    defaultConnection: "default",
    connections: {
      default: {
        connector: "bookshelf",
        settings: {
          client: "postgres",
          database: env('POSTGRES_DB'),
          host: env('POSTGRES_HOST'),
          port: 5432,
          username: env('POSTGRES_USER'),
          password: env('POSTGRES_PASSWORD')
        },
        options: {
          useNullAsDefault: true
        }
      }
    }
  };
};