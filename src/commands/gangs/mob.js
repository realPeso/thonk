const patron = require('patron.js');
const Constants = require('../../utility/Constants.js');
const db = require('../../database');

class Info extends patron.Command {
  constructor() {
    super({
      names: ['the mob', 'mob'],
      groupName: 'gangs',
      description: 'Learn about The Mob today.',
      guildOnly: false
    });
  }

  async run(msg) {
    const dbGuild = await db.guildRepo.getGuild(msg.guild.id);
    

    if (msg.channel.type !== 'dm') {
      return msg.createReply('The Mob is a gang lead by Peso#1088. Joining isn\'t easy, and at the moment is invite-only.');
    }
  }
}

module.exports = new Info();
