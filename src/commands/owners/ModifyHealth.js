const db = require('../../database');
const patron = require('patron.js');

class ModifyHealth extends patron.Command {
  constructor() {
    super({
      names: ['modifyhealth'],
      groupName: 'owners',
      description: 'Allows you to modify the health of any member.',
      args: [
        new patron.Argument({
          name: 'amount',
          key: 'amount',
          type: 'float',
          example: '5'
        }),
        new patron.Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          defaultValue: patron.ArgumentDefault.Member,
          example: 'bigdaddy#4000'
        })
      ]
    });
  }

  async run(msg, args) {
    await db.userRepo.updateUser(args.member.id, msg.guild.id, { $inc: { health: args.amount } });
    const dbUser = await db.userRepo.getUser(args.member.id, msg.guild.id);

    return msg.createReply('You have successfully modifed ' + (args.member.id === msg.author.id ? 'your' : args.member.user.tag.boldify() + '\'s') + ' health to ' + dbUser.health + '.');
  }
}

module.exports = new ModifyHealth();
