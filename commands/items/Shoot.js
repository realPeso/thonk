const patron = require('patron.js');
const db = require('../../database');
const Random = require('../../utility/Random.js');
const Constants = require('../../utility/Constants.js');
const ItemService = require('../../services/ItemService.js');
const NoSelf = require('../../preconditions/NoSelf.js');
const NotItem = require('../../preconditions/NotItem.js');
const DontHave = require('../../preconditions/DontHave.js');
const NumberUtil = require('../../utility/NumberUtil.js');

class Shoot extends patron.Command {
  constructor() {
    super({
      names: ['shoot'],
      groupName: 'items',
      description: 'Shoot a user with specified gun.',
      cooldown: Constants.config.shoot.cooldown,
      args: [
        new patron.Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          preconditions: [NoSelf],
          example: 'Blast It Baby#6969'
        }),
        new patron.Argument({
          name: 'item',
          key: 'item',
          type: 'item',
          example: 'intervention',
          preconditions: [new NotItem('gun', 'launcher'), DontHave],
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const roll = Random.roll();
    const kevlar = Constants.items.armour;
    const dbUser = await db.userRepo.getUser(args.member.id, msg.guild.id);
    const bullet = 'inventory.bullet';
    const rocket = 'inventory.rocket';
    const damage = (dbUser.inventory.kevlar <= 0 || dbUser.inventory.kevlar === undefined ? args.item.damage : args.item.damage - kevlar.damageReduction);
    const user = await msg.client.users.get(args.member.id);

    if (roll <= args.item.accuracy) {
      if (dbUser.health - damage <= 0) {
        await ItemService.takeInv(msg.author.id, args.member.id, msg.guild.id);
        await db.userRepo.modifyCashExact(msg.dbGuild, msg.member, dbUser.bounty);
        await db.userRepo.modifyCashExact(msg.dbGuild, msg.member, dbUser.cash);
        const totalEarning = dbUser.bounty + dbUser.cash;
        await db.userRepo.deleteUser(args.member.id, msg.guild.id);
        await user.tryDM('Unfortunately, you were killed by ' + msg.author.tag.boldify() + '. All your data has been reset.', { guild: msg.guild });
        await msg.createReply('Woah, you just killed ' + args.member.user.tag.boldify() + '. You just earned ' + NumberUtil.format(totalEarning) + ' **AND** their inventory, congrats.');
      } else {
        await db.userRepo.updateUser(args.member.id, msg.guild.id, { $inc: { health: -damage } });
        const newdbUser = await db.userRepo.getUser(args.member.id, msg.guild.id);
        await user.tryDM(msg.author.tag.boldify() + ' tried to kill you, but nigga you *AH, HA, HA, HA, STAYIN\' ALIVE*. -' + damage + ' health. Current Health: ' + newdbUser.health, { guild: msg.guild });
        await msg.createReply('Nice shot, you just dealt ' + damage + ' damage to ' + args.member.user.tag.boldify() + '.');
      }
    } else {
      await msg.createReply('The nigga fucking dodged the bullet, literally. What in the sac of nuts.');
    }

    if (args.item.type === 'gun') {
      await db.userRepo.updateUser(msg.author.id, msg.guild.id, { $inc: { [bullet]: -1 } });
    } else if (args.item.type === 'launcher') {
      await db.userRepo.updateUser(msg.author.id, msg.guild.id, { $inc: { [rocket]: -1 } });
    }
  }
}

module.exports = new Shoot();
