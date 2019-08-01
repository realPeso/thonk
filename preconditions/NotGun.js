const patron = require('patron.js');

class NotGun extends patron.ArgumentPrecondition {
  async run(command, msg, argument, args, value) {
    if (value.type === 'gun') {
      return patron.PreconditionResult.fromSuccess();
    }

    return patron.PreconditionResult.fromError(command, 'This item is not a gun.');
  }
}

module.exports = new NotGun();
