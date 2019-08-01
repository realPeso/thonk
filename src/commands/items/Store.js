const patron = require('patron.js');

class Store extends patron.Command {
  constructor() {
    super({
      names: ['store'],
      groupName: 'items',
      description: 'Display\'s the purchasable items within the shop.'
    });
  }

  async run(msg, args) {
    return msg.channel.createMessage('**Purchasable Items:**' + '\nBronze Crate: $1,000.00\nSilver Crate: $5,000.00\nGold Crate: $20,000.00');
  }
}

module.exports = new Store();
