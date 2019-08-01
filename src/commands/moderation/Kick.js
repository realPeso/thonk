const patron = require('patron.js');
const Constants = require('../../utility/Constants.js');
const ModerationService = require('../../services/ModerationService.js');
const NoModerator = require('../../preconditions/NoModerator.js');

class Kick extends patron.Command {
  constructor() {
    super({
      names: ['kick', 'boot'],
      groupName: 'moderation',
      description: 'Kick any member.',
      botPermissions: ['KICK_MEMBERS'],
      args: [
        new patron.Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          example: '"Cairo#2098"',
          preconditions: [NoModerator]
        }),
        new patron.Argument({
          name: 'reason',
          key: 'reason',
          type: 'string',
          example: 'the kick hammer has spoken.',
          defaultValue: '',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    await args.member.kick(args.reason);
    await msg.createReply('You have successfully kicked ' + args.member.user.tag + '.');
    await ModerationService.tryInformUser(msg.guild, msg.author, 'kicked', args.member.user, args.reason);
    return ModerationService.tryModLog(msg.dbGuild, msg.guild, 'Kick', Constants.data.colors.kick, args.reason, msg.author, args.member.user);
  }
}

module.exports = new Kick();
