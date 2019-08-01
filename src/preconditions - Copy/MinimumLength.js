const patron = require('patron.js');

class MaximumLength extends patron.ArgumentPrecondition {
  constructor(length) {
    super();
    this.length = length;
  }

  async run(command, msg, argument, args, value) {
    if (value.length >= this.length) {
      return patron.PreconditionResult.fromSuccess();
    }

    return patron.PreconditionResult.fromError(command, 'The ' + argument.name + ' may not be lower than ' + this.length + ' characters.');
  }
}

module.exports = MaximumLength;
