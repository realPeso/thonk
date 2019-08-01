const patron = require('patron.js');
const db = require('../../database');
const Constants = require('../../utility/Constants.js');
const MaximumLength = require('../../preconditions/MaximumLength.js');
const NumberUtil = require('../../utility/NumberUtil.js');
const ModerationService = require('../../services/ModerationService.js');
const PollService = require('../../services/PollService.js');

class CreatePoll extends patron.Command {
  constructor() {
    super({
      names: ['createpoll', 'makepoll'],
      groupName: 'polls',
      description: 'Create a poll.',
      args: [
        new patron.Argument({
          name: 'poll name',
          key: 'name',
          type: 'string',
          example: 'election',
          preconditions: [new MaximumLength(Constants.config.poll.maxChar)],
        }),
        new patron.Argument({
          name: 'choices',
          key: 'choices',
          type: 'string',
          example: 'yes~no~maybe'
        }),
        new patron.Argument({
          name: 'days to last',
          key: 'days',
          type: 'float',
          example: '4',
          defaultValue: 1
        }),
        new patron.Argument({
          name: 'elder only',
          key: 'eldersOnly',
          type: 'bool',
          example: 'true',
          defaultValue: false
        }),
        new patron.Argument({
          name: 'mods only',
          key: 'modsOnly',
          type: 'bool',
          example: 'false',
          defaultValue: false,
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const poll = await db.pollRepo.findOne( { $and: [{ guildId: msg.guild.id }, { name: args.name }] } );
    const days = NumberUtil.daysToMs(args.days);
    const choices = args.choices.split('~');

    if (poll !== null) {
      return msg.createErrorReply('There\'s already a poll with this name.');
    } else if (args.modsOnly === true && ModerationService.getPermLevel(msg.dbGuild, msg.member) < 1) {
      return msg.createErrorReply('Only moderator\'s may create moderator only polls.');
    } else if (choices.length > Constants.config.polls.maxAnswers) {
      return msg.createErrorReply('You may not have more than ' + Constants.config.polls.maxAnswers + ' answers on your poll.');
    }

    for (let i = 0; i < choices.length; i++) {
      if (choices[i + 1] == choices[i]) {
        return msg.createErrorReply('You may not have multiple choices that are identicle.');
      } else if (choices[i].length > Constants.config.polls.maxAnswerChar) {
        return msg.createErrorReply('You may not have more than ' + Constants.config.polls.maxAnswerChar + ' characters in your answer.');
      }
    }

    const newIndex = await PollService.findLatestPoll(msg.guild.id);    

    await db.pollRepo.insertPoll(newIndex, args.name, msg.author.id, msg.guild.id, days, args.eldersOnly, args.modsOnly);

    for (let i = 0; i < choices.length; i++) {
      const makeChoice = 'choices.' + choices[i];
      await db.pollRepo.updatePoll(args.name, msg.author.id, msg.guild.id, { $set: { [makeChoice]: 0, } });
    }

    return msg.createReply('You\'ve successfully created a poll with the name ' + args.name.boldify() + '.');
  }
}

module.exports = new CreatePoll();
