const db = require('../../database');
const Constants = require('../../utility/Constants.js');
const patron = require('patron.js');
const NumberUtil = require('../../utility/NumberUtil.js');

class Leaderboards extends patron.Command {
  constructor() {
    super({
      names: ['leaderboards', 'lb', 'highscores', 'highscore', 'leaderboard'],
      groupName: 'general',
      description: 'View the richest Drug Traffickers.'
    });
  }

  async run(msg) {
    const users = await db.userRepo.findMany({ guildId: msg.guild.id });

    users.sort((a, b) => b.cash - a.cash);

    let message = '';

    for (let i = 0; i < users.length; i++) {
      if (i + 1 > Constants.config.misc.leaderboardCap) {
        break;
      }

      const user = msg.client.users.get(users[i].userId);

      if (user === undefined) {
        continue;
      }

      message += (i + 1) + '. ' + user.tag.boldify() + ': ' + NumberUtil.format(users[i].cash) + '\n';
    }

    if (String.isNullOrWhiteSpace(message) === true) {
      return msg.createErrorReply('There is nobody on the leaderboards.');
    }

    return msg.channel.createMessage(message, { title: 'The Richest Traffickers' });
  }
}

module.exports = new Leaderboards();
