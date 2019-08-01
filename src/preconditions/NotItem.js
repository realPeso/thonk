const patron = require('patron.js');

class NotItem extends patron.ArgumentPrecondition {
  constructor(item, item2, item3) {
    super();
    this.item = item;
    this.item2 = item2;
    this.item3 = item3;
  }

  async run(command, msg, argument, args, value) {
    if (value.type === this.item) {
      if (this.item === 'gun') {
        if (msg.dbUser.inventory.bullet === undefined || msg.dbUser.inventory.bullet <= 0) {
          return patron.PreconditionResult.fromError(command, 'You have no bullets to shoot with.');
        }
      } else if (this.item === 'launcher') {
        if (msg.dbUser.inventory.rocket === undefined || msg.dbUser.inventory.rocket <= 0) {
          return patron.PreconditionResult.fromError(command, 'You have no rockets to shoot with.');
        }
      }
      return patron.PreconditionResult.fromSuccess();
    } else if (value.type === this.item2) {
      if (this.item2 === 'gun') {
        if (msg.dbUser.inventory.bullet === undefined || msg.dbUser.inventory.bullet <= 0) {
          return patron.PreconditionResult.fromError(command, 'You have no bullets to shoot with.');
        }
      } else if (this.item2 === 'launcher') {
        if (msg.dbUser.inventory.rocket === undefined || msg.dbUser.inventory.rocket <= 0) {
          return patron.PreconditionResult.fromError(command, 'You have no rockets to shoot with.');
        }
      }
      return patron.PreconditionResult.fromSuccess();
    } else if (value.type === this.item3) {
      if (this.item3 === 'gun') {
        if (msg.dbUser.inventory.bullet === undefined || msg.dbUser.inventory.bullet <= 0) {
          return patron.PreconditionResult.fromError(command, 'You have no bullets to shoot with.');
        }
      } else if (this.item3 === 'launcher') {
        if (msg.dbUser.inventory.rocket === undefined || msg.dbUser.inventory.rocket <= 0) {
          return patron.PreconditionResult.fromError(command, 'You have no rockets to shoot with.');
        }
      }
      return patron.PreconditionResult.fromSuccess();
    }

    return patron.PreconditionResult.fromError(command, 'This item is not a ' + this.item + '.');
  }
}

module.exports = NotItem;
