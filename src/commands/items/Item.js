const patron = require('patron.js');
const ItemService = require('../../services/ItemService.js');

class Item extends patron.Command {
  constructor() {
    super({
      names: ['item'],
      groupName: 'items',
      description: 'Search for an item\'s information.',
      args: [
        new patron.Argument({
          name: 'item',
          key: 'item',
          type: 'item',
          example: 'bear grylls meat',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    if (args.item === undefined) {
      return msg.createErrorReply('This item doesn\'t exist.');
    }

    return msg.channel.createMessage('**Name:** ' + ItemService.capitializeWords(args.item.names[0]) + '\n**Description:** ' + args.item.description + (args.item.health !== undefined ? '\n**Health:** ' + args.item.health : '') + (args.item.damage !== undefined ? '\n**Damage:** ' + args.item.damage : '') + (args.item.accuracy !== undefined ? '\n**Accuracy:** ' + args.item.accuracy : '') + (args.item.damageReduction !== undefined ? '\n**Damage Reduction:** ' + args.item.damageReduction : '') + (args.item.crateOdds !== undefined ? '\n**Crate Odds:** ' + args.item.crateOdds : '') + (args.item.itemOdds !== undefined ? '\n**Item Odds:** ' + args.item.itemOdds : '') + (args.item.acquireOdds !== undefined ? '\n**Acquire Odds:** ' + args.item.acquireOdds : '') + (args.item.price !== undefined ? '\n**Price:** ' + args.item.price.USD() : ''));
  }
}

module.exports = new Item();
