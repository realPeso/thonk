const patron = require('patron.js');
const Constants = require('../../utility/Constants.js');
const db = require('../../database');

class Info extends patron.Command {
  constructor() {
    super({
      names: ['the kings', 'kings'],
      groupName: 'gangs',
      description: 'Learn about The Kings today.',
      guildOnly: false
    });
  }

  async run(msg) {
    const dbGuild = await db.guildRepo.getGuild(msg.guild.id);
    

    if (msg.channel.type !== 'dm') {
      return msg.createReply('A gang for the most active members of the server, but welcomes newcomers who are willing to be active. This gang is led by skittles#6442.');
    }
  }
}

module.exports = new Info();
