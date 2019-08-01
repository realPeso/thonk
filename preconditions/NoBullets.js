const patron = require('patron.js');

class NoBullets extends patron.Precondition {
  async run(command, msg) {
    if (msg.dbUser.inventory.bullet === undefined || msg.dbUser.inventory.bullet <= 0) {
      return patron.PreconditionResult.fromError(command, 'You have no bullets to shoot with.');
    }

    return patron.PreconditionResult.fromSuccess();
  }
}

module.exports = new NoBullets();
