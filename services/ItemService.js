const db = require('../database');
const Random = require('../utility/Random.js');
const Constants = require('../utility/Constants.js');

class ItemService {
  async openCrate(crate) {
    const roll = Random.roll();
    const rollWeapon = Random.nextInt(1, 403);
    const rollAmmo = Random.nextInt(1, 101);
    const weapons = Constants.items.crateItems;
    const ammunation = Constants.items.ammunation;
    const sortedWeapons = weapons.sort((a, b) => a.crateOdds - b.crateOdds);
    const sortedAmmo = ammunation.sort((a, b) => a.crateOdds - b.crateOdds);
    let cumulativeWeapons = 0;
    let cumulativeAmmunition = 0;

    if (roll <= crate.itemOdds) {
      for (let i = 0; i < sortedWeapons.length; i++) {
        const weapon = sortedWeapons[i];
        cumulativeWeapons += weapon.crateOdds;
        if (rollWeapon <= cumulativeWeapons) {
          return weapon;
        }
      }
    } else {
      for (let i = 0; i < sortedAmmo.length; i++) {
        const ammo = sortedAmmo[i];
        cumulativeAmmunition += ammo.crateOdds;
        if (rollAmmo <= cumulativeAmmunition) {
          return ammo;
        }
      }
    }
  }

  massOpenCrate(quanity, crate) {
    const itemsWon = {};

    for (let i = 0; i < quanity; i++) {
      const item = this.openCrate(crate);

      if (itemsWon.hasOwnProperty(item.names[0]) === false) {
        itemsWon[item.names[0]] = 0;
      }

      itemsWon[item.names[0]]++;
    }
    return itemsWon;
  }

  fish(weapon) {
    const roll = Random.roll();
    const food = Constants.items.fish;
    const roll2 = Random.nextInt(1, 84);
    const sorted = food.sort((a, b) => a.acquireOdds - b.acquireOdds);
    let cumulative = 0;

    if (roll <= weapon.accuracy) {
      for (let i = 0; i < sorted.length; i++) {
        const fish = sorted[i];
        cumulative += fish.acquireOdds;
        if (roll2 <= cumulative) {
          return fish;
        }
      }
    }
  }

  hunt(weapon) {
    const roll = Random.roll();
    const food = Constants.items.meat;
    const roll2 = Random.nextInt(1, 84);
    const sorted = food.sort((a, b) => a.acquireOdds - b.acquireOdds);
    let cumulative = 0;

    if (roll <= weapon.accuracy) {
      for (let i = 0; i < sorted.length; i++) {
        const meat = sorted[i];
        cumulative += meat.acquireOdds;
        if (roll2 <= cumulative) {
          return meat;
        }
      }
    }
  }

  async takeInv(KillerId, DeadUserId, GuildId) {
    const dbUser = await db.userRepo.getUser(DeadUserId, GuildId);
    for (const key in dbUser.inventory) {
      if (dbUser.inventory.length <= 0) {
        break;
      }

      const itemsGained = 'inventory.' + key;
      const amount = dbUser.inventory[key];
      await db.userRepo.updateUser(KillerId, GuildId, { $inc: { [itemsGained]: amount } });
      await db.userRepo.updateUser(DeadUserId, GuildId, { $inc: { [itemsGained]: -amount } });
    }
  }

  capitializeWords(str) {
    return str.replace(Constants.data.regexes.capitalize, (x) => x.charAt(0).toUpperCase() + x.substr(1));
  }
}

module.exports = new ItemService();