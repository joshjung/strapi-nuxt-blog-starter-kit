module.exports = ({ env }) => {
  return {
    host: `0.0.0.0`,
    url: env('NODE_ENV') === 'production' ? 'https://' + env('BLOG_API_DOMAIN') : 'http://localhost:1337',
    port: 1337,
    production: env('NODE_ENV') === 'production',
    proxy: {
      enabled: false
    },
    cron: {
      enabled: false
    },
    admin: {
      autoOpen: false,
      auth: {
        secret: env('ADMIN_JWT_SECRET'),
      },
    },
  };
};