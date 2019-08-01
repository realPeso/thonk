const patron = require('patron.js');
const ItemService = require('../../services/ItemService.js');
const db = require('../../database');
const Constants = require('../../utility/Constants.js');
const NotItem = require('../../preconditions/NotItem.js');
const DontHave = require('../../preconditions/DontHave.js');

class OpenAll extends patron.Command {
  constructor() {
    super({
      names: ['openall'],
      groupName: 'items',
      description: 'Open all of a kind of crate.',
      cooldown: Constants.config.opencrate.cooldown,
      args: [
        new patron.Argument({
          name: 'item',
          key: 'item',
          type: 'item',
          example: 'bronze crate',
          preconditions: [new NotItem('crate'), DontHave],
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const cases = 'inventory.' + args.item.names[0];
    const itemsWon = {};
    let reply = '';
    let openAmount = 0;

    if (msg.dbUser.inventory[args.item.names[0]] > 50) {
      const botLagReply = await msg.createReply('To reduce bot lag, we\'re only opening 50 of your crates');
      await botLagReply.delete(5000);
      openAmount = 50;
    } else {
      openAmount = msg.dbUser.inventory[args.item.names[0]];
    }

    for (let i = 0; i < openAmount; i++) {
      const item = await ItemService.openCrate(args.item);
      if (itemsWon.hasOwnProperty(item.names[0]) === false) {
        itemsWon[item.names[0]] = 1;
      } else {
        itemsWon[item.names[0]]++;
      }
      const gained = 'inventory.' + item.names[0];
      await db.userRepo.updateUser(msg.author.id, msg.guild.id, { $inc: { [gained]: 1, [cases]: -1 } });
    }

    for (const key in itemsWon) {
      const s = (itemsWon[key] > 1 ? 's' : '');
      reply += ItemService.capitializeWords(key) + s + ': ' + itemsWon[key] + '\n';
    }

    return msg.channel.createMessage(reply, { title: msg.author.tag + ' has won'});
  }
}

module.exports = new OpenAll();
