const patron = require('patron.js');
const Constants = require('../../utility/Constants.js');
const ModerationService = require('../../services/ModerationService.js');
const NoModerator = require('../../preconditions/NoModerator.js');

class Warn extends patron.Command {
  constructor() {
    super({
      names: ['warn'],
      groupName: 'moderation',
      description: 'Warn any member.',
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
          example: 'the warn hammer has spoken',
          defaultValue: '',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    await msg.createReply('You have successfully warned ' + args.member.user.tag + '.');
    await ModerationService.tryInformUser(msg.guild, msg.author, 'warned', args.member.user, args.reason);
    return ModerationService.tryModLog(msg.dbGuild, msg.guild, 'Warn', Constants.data.colors.warn, args.reason, msg.author, args.member.user);
  }
}

module.exports = new Warn();
