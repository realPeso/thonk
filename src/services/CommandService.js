const db = require('../database');
const patron = require('patron.js');
const Constants = require('../utility/Constants.js');
const NumberUtil = require('../utility/NumberUtil.js');
const ChatService = require('./ChatService.js');
const Logger = require('../utility/Logger.js');

class CommandService {
  async run(client, handler) {
    client.on('message', async (msg) => {
      if (msg.author.bot) {
        return;
      }

      const blacklisted = await db.blacklistRepo.findBlacklist(msg.author.id);

      if (blacklisted) {
        return;
      }

      if (msg.guild !== null) {
        msg.dbUser = await db.userRepo.getUser(msg.author.id, msg.guild.id);
        msg.dbGuild = await db.guildRepo.getGuild(msg.guild.id);
      }

      if (msg.content.replace(/\s/g, '').charAt(0) !== msg.dbGuild.settings.prefix) {
        return msg.guild !== null ? ChatService.applyCash(msg) : null;
      }

      const inGuild = msg.guild !== null;

      Logger.log('Message Id: ' + msg.id + ' | User Id: ' + msg.author.id + (inGuild ? ' | Guild Id: ' + msg.guild.id : '') + ' | User: ' + msg.author.tag + (inGuild ? ' | Guild: ' + msg.guild.name : '') + ' | Content: ' + msg.content, 'DEBUG');

      const result = await handler.run(msg, Constants.data.misc.prefix);

      if (result.success === false) {
        let message;

        switch (result.commandError) {
          case patron.CommandError.CommandNotFound:
            return;
          case patron.CommandError.Cooldown: {
            const cooldown = NumberUtil.msToTime(result.remaining);

            return msg.channel.tryCreateErrorMessage('Hours: ' + cooldown.hours + '\nMinutes: ' + cooldown.minutes + '\nSeconds: ' + cooldown.seconds, { title: result.command.names[0].upperFirstChar() + ' Cooldown' });
          }
          case patron.CommandError.Exception:
            if (result.error.code !== undefined) { // TODO: Check if instance of DiscordApiError when 12.0 is stable.
              if (result.error.code === 400) {
                message = 'There seems to have been a bad request. Please report this issue with context to John#0969.';
              } else if (result.error.code === 0 || result.error.code === 404 || result.error.code === 50013) {
                message = 'This bot does not have permission to do that. This issue may be fixed by moving the the bot role to the top of the roles list, and giving the bot the "Administrator" server permission.';
              } else if (result.error.code === 50007) {
                message = 'This bot does not have permission to DM this user. Enabling the DM Privacy Settings for this server may solve this issue.';
              } else if (result.error.code >= 500 && result.error.code < 600) {
                message = 'Looks like Discord fucked up. An error has occurred on Discord\'s part which is entirely unrelated with this bot. Sorry, nothing we can do.';
              } else {
                message = result.errorReason;
              }
            } else {
              message = result.errorReason;
              console.error(result.error);
            }
            break;
          case patron.CommandError.InvalidArgCount:
            message = 'You are incorrectly using this command.\n**Usage:** `' + Constants.data.misc.prefix + result.command.getUsage() + '`\n**Example:** `' + Constants.data.misc.prefix + result.command.getExample() + '`';
            break;
          default:
            message = result.errorReason;
            break;
        }
        return msg.tryCreateErrorReply(message);
      }
      if (result.command.uses === undefined) {
        result.command.uses = 0;
      }

      result.command.uses++
    });
  }
}

module.exports = new CommandService();
