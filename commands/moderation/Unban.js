const patron = require('patron.js');
const Constants = require('../../utility/Constants.js');
const ModerationService = require('../../services/ModerationService.js');

class Unban extends patron.Command {
  constructor() {
    super({
      names: ['unban'],
      groupName: 'moderation',
      description: 'Lift the ban hammer on any member.',
      botPermissions: ['BAN_MEMBERS'],
      args: [
        new patron.Argument({
          name: 'user',
          key: 'user',
          type: 'banneduser',
          example: '"Cairo#2098"'
        }),
        new patron.Argument({
          name: 'reason',
          key: 'reason',
          type: 'string',
          example: 'the unban hammer has spoken.',
          defaultValue: '',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    await msg.guild.unban(args.user);
    await msg.createReply('You have successfully unbanned ' + args.user.tag + '.');
    await ModerationService.tryModLog(msg.dbGuild, msg.guild, 'Unban', Constants.data.colors.unban, args.reason, msg.author, args.user);
    return ModerationService.tryInformUser(msg.guild, msg.author, 'unbanned', args.user, args.reason);
  }
}

module.exports = new Unban();
