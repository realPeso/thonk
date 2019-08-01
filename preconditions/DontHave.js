const patron = require('patron.js');

class NotItem extends patron.ArgumentPrecondition {
  async run(command, msg, argument, args, value) {
    if (msg.dbUser.inventory[value.names[0]] === undefined || msg.dbUser.inventory[value.names[0]] <= 0) {
      return patron.PreconditionResult.fromError(command, 'You don\'t have any of this item.');
    }

    return patron.PreconditionResult.fromSuccess();
  }
}

module.exports = new NotItem();
