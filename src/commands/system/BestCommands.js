const patron = require('patron.js');
const ItemService = require('../../services/ItemService.js');
const Constants = require('../../utility/Constants.js');
const pluralize = require('pluralize');

class BestCommands extends patron.Command {
  constructor() {
    super({
      names: ['bestcommands', 'mostusedcommands', 'bestcmds', 'best'],
      groupName: 'system',
      description: 'Most used commands.',
      guildOnly: false
    });
  }

  async run(msg, args) {
    const commands = msg.client.registry.commands;

    commands.sort((a, b) => b.uses - a.uses);

    let message = '';
    let position = 1;

    for (let i = 0; i < commands.length; i++) {
      if (position > Constants.config.misc.leaderboardCap) {
        break;
      }

      if (commands[i].uses > 0) {
        message += (position++) + '. ' + ItemService.capitializeWords(commands[i].names[0].boldify()) + ': ' + commands[i].uses + ' ' + pluralize('use', commands[i].uses) + '\n';
      }
    }

    if (String.isNullOrWhiteSpace(message) === true) {
      return msg.createErrorReply('No commands have been used since last restart.');
    }

    return msg.channel.createMessage(message, { title: 'The Best Commands: '});
  }
}

module.exports = new BestCommands();
