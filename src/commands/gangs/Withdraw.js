const patron = require('patron.js');
const db = require('../../database');
const Constants = require('../../utility/Constants.js');
const MinimumCash = require('../../preconditions/MinimumCash.js');
const NumberUtil = require('../../utility/NumberUtil.js');
const InGang = require('../../preconditions/InGang.js');
const IncMoneyUpdate = require('../../database/updates/IncMoneyUpdate.js');
const WithdrawPrec = require('../../preconditions/WithdrawPrec.js');

class Withdraw extends patron.Command {
  constructor() {
    super({
      names: ['withdraw'],
      groupName: 'gangs',
      description: 'Withdraw money from your gang.',
      preconditions: [InGang],
      cooldown: Constants.config.gang.cooldownWithdraw,
      args: [
        new patron.Argument({
          name: 'amount',
          key: 'transfer',
          type: 'currency',
          example: '500',
          preconditions: [new MinimumCash(Constants.config.gang.min), WithdrawPrec]
        })
      ]
    });
  }

  async run(msg, args) {
    const gang = await db.gangRepo.findOne( { $or: [{ members: msg.author.id }, { leaderId: msg.author.id }], $and: [{ guildId: msg.guild.id }] } );
    const leader = msg.client.users.get(gang.leaderId);
    await db.userRepo.modifyCash(msg.dbGuild, msg.member, args.transfer);
    await db.gangRepo.updateGang(gang.leaderId, gang.guildId, new IncMoneyUpdate('wealth', -args.transfer));
    const newGang = await db.gangRepo.findOne({ guildId: msg.guild.id, name: gang.name });
    await leader.tryDM(msg.author.tag.boldify() + ' has withdrawn ' + args.transfer.USD() + ' from your gang.', { guild: msg.guild });
    return msg.createReply('You have successfully withdrawn ' + args.transfer.USD() + ' from your gang. ' + newGang.name + '\'s Wealth: ' + NumberUtil.format(newGang.wealth) + '.');
  }
}

module.exports = new Withdraw();
