const db = require('../../database');
const patron = require('patron.js');
const NumberUtil = require('../../utility/NumberUtil.js');
const RankService = require('../../services/RankService.js');

class Rank extends patron.Command {
  constructor() {
    super({
      names: ['rank'],
      groupName: 'general',
      description: 'View the rank of anyone.',
      args: [
        new patron.Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          defaultValue: patron.ArgumentDefault.Member,
          example: 'Blast It Baby#6969',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const dbUser = msg.author.id === args.member.id ? msg.dbUser : await db.userRepo.getUser(args.member.id, msg.guild.id);
    const sortedUsers = (await db.userRepo.findMany({ guildId: msg.guild.id })).sort((a, b) => b.cash - a.cash);
    const rank = RankService.getRank(dbUser, msg.dbGuild, msg.guild);

    return msg.channel.createMessage('**Balance:** ' + NumberUtil.format(dbUser.cash) + '\n**Health:** ' + dbUser.health + (dbUser.bounty > 0 ? '\n**Bounty:** ' + NumberUtil.format(dbUser.bounty) : '') + '\n**Position:** #' + (sortedUsers.findIndex((v) => v.userId === dbUser.userId) + 1) + '\n' + (rank !== undefined ? '**Rank:** ' + rank + '\n' : ''), { title: args.member.user.tag + '\'s Rank' });
  }
}

module.exports = new Rank();
