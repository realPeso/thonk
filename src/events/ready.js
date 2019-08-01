const Constants = require('../utility/Constants.js');
const Logger = require('../utility/Logger.js');

module.exports = (client) => {
  client.on('ready', async () => {
    const connectMsg = ' - SYSTEM CONNECTION NOTICE: Successfully connected to all database and account services.';
    const logMsg = '\n        \\/ Logged Commands \\/';
    Logger.log(connectMsg.green + logMsg.rainbow);
    await client.user.setPresence({ game: { name: Constants.data.misc.game, type: 0 } });
  });
};