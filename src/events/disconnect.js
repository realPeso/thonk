const Logger = require('../utility/Logger.js');

module.exports = (client) => {
  client.on('disconnect', () => {
    Logger.log(client.user.username + ' has disconnected.');
  });
};
