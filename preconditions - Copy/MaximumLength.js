const patron = require('patron.js');

class MaximumLength extends patron.ArgumentPrecondition {
  constructor(length) {
    super();
    this.length = length;
  }

  async run(command, msg, argument, args, value) {
    if (value.length <= this.length) {
      return patron.PreconditionResult.fromSuccess();
    }

    const s = (value.length > 1 ? 's' : '');
    return patron.PreconditionResult.fromError(command, 'The ' + argument.name + ' may not be longer than ' + this.length + ' character' + s + '.');
  }
}

module.exports = MaximumLength;
