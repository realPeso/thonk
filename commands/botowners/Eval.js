const patron = require('patron.js');
const db = require('../../database');
const util = require('util');
const Constants = require('../../utility/Constants.js');

class Eval extends patron.Command {
  constructor() {
    super({
      names: ['eval'],
      groupName: 'botowners',
      description: 'Evalute JavaScript code.',
      args: [
        new patron.Argument({
          name: 'code',
          key: 'code',
          type: 'string',
          example: 'client.token',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    try {
      /* eslint-disable no-unused-vars */
      const client = msg.client;
      const message = msg;
      const guild = msg.guild;
      const channel = msg.channel;
      const author = msg.author;
      const member = msg.member;
      const database = db;

      let result = eval(args.code);

      if (result instanceof Promise) {
        result = await result;
      }

      if (typeof result !== 'string') {
        result = util.inspect(result, { depth: 0 });
      }

      result = result.replace(msg.client.token, ' ').replace(/\[Object\]/g, 'Object').replace(/\[Array\]/g, 'Array');

      return msg.channel.createFieldsMessage(['Eval', '```js\n' + args.code + '```', 'Returns', '```js\n' + result + '```'], false);
    } catch (err) {
      return msg.channel.createFieldsMessage(['Eval', '```js\n' + args.code + '```', 'Error', '```js\n' + err + '```'], false, Constants.data.colors.error);
    }
  }
}

module.exports = new Eval();
