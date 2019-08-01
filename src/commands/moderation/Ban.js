const patron = require('patron.js');
const Constants = require('../../utility/Constants.js');
const ModerationService = require('../../services/ModerationService.js');

class Ban extends patron.Command {
  constructor() {
    super({
      names: ['ban', 'hammer'],
      groupName: 'moderation',
      description: 'Swing the ban hammer on any member.',
      botPermissions: ['BAN_MEMBERS'],
      args: [
        new patron.Argument({
          name: 'user',
          key: 'user',
          type: 'user',
          example: '"Cairo#2098"'
        }),
        new patron.Argument({
          name: 'reason',
          key: 'reason',
          type: 'string',
          example: 'the ban hammer has spoken.',
          defaultValue: '',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    if (msg.guild.members.has(args.user.id)) {
      await ModerationService.tryInformUser(msg.guild, msg.author, 'banned', args.user, args.reason);
    }

    await msg.guild.ban(args.user);
    await msg.createReply('You have successfully banned ' + args.user.tag + '.');
    return ModerationService.tryModLog(msg.dbGuild, msg.guild, 'Ban', Constants.data.colors.ban, args.reason, msg.author, args.user);
  }
}

module.exports = new Ban();
