const patron = require('patron.js');
const db = require('../database');
const NumberUtil = require('../utility/NumberUtil.js');

class InGang extends patron.ArgumentPrecondition {
  async run(command, msg, argument, args, value) {
    const gang = await db.gangRepo.findOne( { $or: [{ members: msg.author.id }, { leaderId: msg.author.id }], $and: [{ guildId: msg.guild.id }] } );
    if (NumberUtil.realValue(gang.wealth) >= value) {
      return patron.PreconditionResult.fromSuccess();
    }
    return patron.PreconditionResult.fromError(command, 'Your gang doesn\'t have enough money.');
  }
}

module.exports = new InGang();
