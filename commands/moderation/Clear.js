const patron = require('patron.js');
const Constants = require('../../utility/Constants.js');
const ModerationService = require('../../services/ModerationService.js');
const Minimum = require('../../preconditions/Minimum.js');
const Maximum = require('../../preconditions/Maximum.js');

class Clear extends patron.Command {
  constructor() {
    super({
      names: ['clear', 'prune', 'purge'],
      groupName: 'moderation',
      description: 'Clear up to ' + Constants.config.clear.max + ' messages in any text channel.',
      cooldown: 1000,
      botPermissions: ['MANAGE_MESSAGES'],
      args: [
        new patron.Argument({
          name: 'quantity',
          key: 'quantity',
          type: 'float',
          example: '5',
          preconditions: [new Minimum(Constants.config.clear.min), new Maximum(Constants.config.clear.max)]
        }),
        new patron.Argument({
          name: 'reason',
          key: 'reason',
          type: 'string',
          example: 'the purge hammer has spoken.',
          defaultValue: '',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const messages = await msg.channel.fetchMessages({ limit: args.quantity });

    await msg.channel.bulkDelete(messages);

    const reply = await msg.createReply('You have successfully deleted ' + args.quantity + ' messages.');

    return reply.delete(3000);
  }
}

module.exports = new Clear();
