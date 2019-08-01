const db = require('../database');
const Random = require('../utility/Random.js');

class GangService {
  async leave(client, member) {
    const gang = await db.gangRepo.findGangByLeader(member.id, member.guild.id);
    if (gang !== null) {
      if (gang.members.length > 0) {
        const newLeader = await Random.arrayElement(gang.members);
        const guild = client.guilds.get(gang.guildId);
        const grabLeader = member.guild.members.get(newLeader);
        await db.gangRepo.updateGang(gang.leaderId, member.guild.id, { $pull: { members: grabLeader.id } });
        await db.gangRepo.updateGang(gang.leaderId, member.guild.id, { $set: { leaderId: grabLeader.id } });
        await newLeader.tryDM('The leader of your gang has left the server, so you\'re granted owner of the gang.', { guild: member.guild });
      } else {
        await db.gangRepo.deleteGang(gang.leaderId, member.guild.id);
      }
    }
  }
}

module.exports = new GangService();
