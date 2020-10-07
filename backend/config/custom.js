module.exports = ({ env }) => {
  return {
    masterEmail: env('MASTER_EMAIL'),
    noReplyEmail: env('NO_REPLY_EMAIL')
  };
};
