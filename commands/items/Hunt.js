const patron = require('patron.js');
const db = require('../../database');
const ItemService = require('../../services/ItemService.js');
const Constants = require('../../utility/Constants.js');
const NotItem = require('../../preconditions/NotItem.js');
const DontHave = require('../../preconditions/DontHave.js');

class Hunt extends patron.Command {
  constructor() {
    super({
      names: ['hunt'],
      groupName: 'items',
      description: 'Go hunting using items.',
      cooldown: Constants.config.hunt.cooldown,
      args: [
        new patron.Argument({
          name: 'item',
          key: 'item',
          type: 'item',
          example: 'intervention',
          preconditions: [new NotItem('knife', 'gun', 'launcher'), DontHave],
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const bullet = 'inventory.bullet';
    const rocket = 'inventory.rocket';
    const caught = await ItemService.hunt(args.item);

    if (caught !== undefined) {
      const gained = 'inventory.' + caught.names[0];
      await db.userRepo.updateUser(msg.author.id, msg.guild.id, { $inc: { [gained]: 1 } });
    }

    if (args.item.type === 'gun') {
      await db.userRepo.updateUser(msg.author.id, msg.guild.id, { $inc: { [bullet]: -1 } });
    } else if (args.item.type === 'launcher') {
      await db.userRepo.updateUser(msg.author.id, msg.guild.id, { $inc: { [rocket]: -1 } });
    }

    return msg.createReply((caught !== undefined ? 'Clean kill. Boss froth. Smooth beans. You got: ' + ItemService.capitializeWords(caught.names[0]) : 'Nigga you just about had that deer but then he did that hoof kick thing and fucked up your buddy Chuck, so then you had to go bust a nut all over him and the GODDAMN deer got away.'));
  }
}

module.exports = new Hunt();
