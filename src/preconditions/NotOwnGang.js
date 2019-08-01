const patron = require('patron.js');
const db = require('../database');

class InGang extends patron.ArgumentPrecondition {
  async run(command, msg, argument, args, value) {
    const gang = await db.gangRepo.findOne( { $or: [{ members: msg.author.id }, { leaderId: msg.author.id }], $and: [{ guildId: msg.guild.id }] } );
    if (value.name !== gang.name) {
      return patron.PreconditionResult.fromSuccess();
    }
    return patron.PreconditionResult.fromError(command, 'You cannot raid your own gang, retard.');
  }
}

module.exports = new InGang();
