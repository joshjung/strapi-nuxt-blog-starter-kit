module.exports = ({ env }) => ({
  email: {
    provider: 'mailgun',
    providerOptions: {
      host: 'api.eu.mailgun.net',
      apiKey: env('MAILGUN_API_KEY'),
      domain: env('MAILGUN_DOMAIN'), //Required if you have an account with multiple domains
    },
    settings: {
      defaultFrom: 'me@me.com',
      defaultReplyTo: 'me@me.com',
    },
  },
  upload: {
    provider: 'aws-s3',
    providerOptions: {
      accessKeyId: env('AWS_ACCESS_KEY_ID'),
      secretAccessKey: env('AWS_ACCESS_SECRET'),
      region: env('AWS_REGION'),
      params: {
        Bucket: env('AWS_BUCKET'),
      },
    },
  },
});