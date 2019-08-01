const patron = require('patron.js');
const NumberUtil = require('../utility/NumberUtil.js');

class ArgRaidAmount extends patron.ArgumentPrecondition {
  async run(command, msg, argument, args, value) {
    if (NumberUtil.realValue(value.wealth) >= args.raid) {
      return patron.PreconditionResult.fromSuccess();
    }
    return patron.PreconditionResult.fromError(command, 'Their gang doesn\'t have enough money.');
  }
}

module.exports = new ArgRaidAmount();
