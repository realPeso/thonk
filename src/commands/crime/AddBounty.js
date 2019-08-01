const db = require('../../database');
const patron = require('patron.js');
const Constants = require('../../utility/Constants.js');
const Cash = require('../../preconditions/Cash.js');
const MinimumCash = require('../../preconditions/MinimumCash.js');
const NoSelf = require('../../preconditions/NoSelf.js');
const NumberUtil = require('../../utility/NumberUtil.js');

class AddBounty extends patron.Command {
  constructor() {
    super({
      names: ['addbounty'],
      groupName: 'general',
      description: 'Add a bounty on a user in chat.',
      args: [
        new patron.Argument({
          name: 'bounty',
          key: 'bounty',
          type: 'currency',
          preconditions: [Cash, new MinimumCash(Constants.config.bounty.min), NoSelf],
          example: '500'
        }),
        new patron.Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          example: 'swagdaddy#4200'
        })
      ]
    });
  }

  async run(msg, args) {
    await db.userRepo.modifyCash(msg.dbGuild, msg.member, -args.bounty);
    const newDbUser = await db.userRepo.modifyBounty(msg.dbGuild, args.member, args.bounty);
    return msg.createReply('You\'ve successfully added a bounty of ' + args.bounty.USD() + ' to ' + args.member.user.tag + ' making his total bounty ' + NumberUtil.format(newDbUser.bounty) + '.');
  }
}

module.exports = new AddBounty();
