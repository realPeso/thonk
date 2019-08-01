const db = require('../database');
const MemberService = require('../services/MemberService.js');
const GangService = require('../services/GangService.js');

module.exports = (client) => {
  client.on('guildMemberRemove', async (member) => {
  });
};
