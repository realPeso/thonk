const patron = require('patron.js');

class ModRoles extends patron.Command {
  constructor() {
    super({
      names: ['modroles', 'modrole'],
      groupName: 'general',
      description: 'View all mod roles in this guild.'
    });
  }

  async run(msg, args) {
    const modRoleList = msg.dbGuild.roles.mod.sort((a, b) => a.permissionLevel - b.permissionLevel);

    if (msg.dbGuild.roles.mod.length === 0) {
      return msg.createErrorReply('There are no mod roles yet!');
    }

    let description = '';
    for (let i = 0; i < modRoleList.length; i++) {
      const rank = msg.guild.roles.find((x) => x.id === modRoleList[i].id);

      description += rank + ': ' + (modRoleList[i].permissionLevel) + '\n';
    }

    return msg.channel.createMessage(description + '\n**Permission Levels:**\n1: Moderator\n2: Administrator\n3: Owner', { title: 'Mod Roles' });
  }
}

module.exports = new ModRoles();
