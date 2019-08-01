const patron = require('patron.js');
const db = require('../../database');
const ItemService = require('../../services/ItemService.js');
const Constants = require('../../utility/Constants.js');
const NotItem = require('../../preconditions/NotItem.js');
const DontHave = require('../../preconditions/DontHave.js');

class Fish extends patron.Command {
  constructor() {
    super({
      names: ['fish'],
      groupName: 'items',
      description: 'Go fishing using items.',
      cooldown: Constants.config.fish.cooldown,
      args: [
        new patron.Argument({
          name: 'item',
          key: 'item',
          type: 'item',
          example: 'huntsman knife',
          preconditions: [new NotItem('knife', 'gun', 'launcher'), DontHave],
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const bullet = 'inventory.bullet';
    const rocket = 'inventory.rocket';
    const caught = await ItemService.fish(args.item);

    if (caught !== undefined) {
      const gained = 'inventory.' + caught.names[0];
      await db.userRepo.updateUser(msg.author.id, msg.guild.id, { $inc: { [gained]: 1 } });
    }

    if (args.item.type === 'gun') {
      await db.userRepo.updateUser(msg.author.id, msg.guild.id, { $inc: { [bullet]: -1 } });
    } else if (args.item.type === 'launcher') {
      await db.userRepo.updateUser(msg.author.id, msg.guild.id, { $inc: { [rocket]: -1 } });
    }

    return msg.createReply((caught !== undefined ? 'RIP NEMO LMFAO. Finding nemo, more like EATING NEMO ROFL! Good buddy, you got: ' + ItemService.capitializeWords(caught.names[0]) : 'You had the fucking fish in your pocket on the way to the supermarket to get some spices, and the nigga flipping fish jumped into the sink and pulled some goddamn Finding Nemo shit and bounced.'));
  }
}

module.exports = new Fish();
