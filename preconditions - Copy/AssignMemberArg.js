const patron = require('patron.js');

class AssignMemberArg extends patron.ArgumentPrecondition {
  async run(command, msg, argument, args, value) {
    msg.memberArg = value;
    return patron.PreconditionResult.fromSuccess();
  }
}

module.exports = new AssignMemberArg();
