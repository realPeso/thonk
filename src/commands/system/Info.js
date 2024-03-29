const patron = require('patron.js');
const Constants = require('../../utility/Constants.js');
const db = require('../../database');

class Info extends patron.Command {
  constructor() {
    super({
      names: ['info', 'information', 'cashinfo', 'cashhelp'],
      groupName: 'system',
      description: 'All the information about the cash system.',
      guildOnly: false
    });
  }

  async run(msg) {
    const dbGuild = await db.guildRepo.getGuild(msg.guild.id);
    await msg.author.DM('This Bot is specially designed for the IFWM discord. Use the command $help for more assistance with the bot.');

    if (msg.channel.type !== 'dm') {
      return msg.createReply('You have been DMed all the information about the ' + msg.client.user.username + ' Cash System!');
    }
  }
}

module.exports = new Info();
