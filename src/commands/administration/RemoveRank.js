const db = require('../../database');
const patron = require('patron.js');

class RemoveRank extends patron.Command {
  constructor() {
    super({
      names: ['removerank', 'disablerank', 'deleterank'],
      groupName: 'administration',
      description: 'Remove a rank role.',
      args: [
        new patron.Argument({
          name: 'role',
          key: 'role',
          type: 'role',
          example: 'Sicario',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    if (msg.dbGuild.roles.rank.some((role) => role.id === args.role.id) === false) {
      return msg.createErrorReply('You may not remove a rank role that has no been set.');
    }

    await db.guildRepo.upsertGuild(msg.guild.id, new db.updates.Pull('roles.rank', { id: args.role.id }));

    return msg.createReply('You have successfully removed the rank role ' + args.role + '.');
  }
}

module.exports = new RemoveRank();
