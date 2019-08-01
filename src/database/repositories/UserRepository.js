const BaseRepository = require('./BaseRepository.js');
const IncMoneyUpdate = require('../updates/IncMoneyUpdate.js');
const IncPointsUpdate = require('../updates/IncPointsUpdate');
const UserQuery = require('../queries/UserQuery.js');
const User = require('../models/User.js');
const RankService = require ('../../services/RankService.js');

class UserRepository extends BaseRepository {
  anyUser(userId, guildId) {
    return this.any(new UserQuery(userId, guildId));
  }

  async getUser(userId, guildId) {
    const query = new UserQuery(userId, guildId);
    const fetchedUser = await this.findOne(query, guildId);

    return fetchedUser !== null ? fetchedUser : this.findOneAndReplace(query, new User(userId, guildId));
  }

  updateUser(userId, guildId, update) {
    return this.updateOne(new UserQuery(userId, guildId), update);
  }

  findUserAndUpdate(userId, guildId, update) {
    return this.findOneAndUpdate(new UserQuery(userId, guildId), update);
  }

  async upsertUser(userId, guildId, update) {
    if (await this.anyUser(userId, guildId)) {
      return this.updateUser(userId, guildId, update);
    }

    return this.updateOne(new User(userId, guildId), update, true);
  }

  async findUserAndUpsert(userId, guildId, update) {
    if (await this.anyUser(userId, guildId)) {
      return this.findUserAndUpdate(userId, guildId, update);
    }

    return this.findOneAndUpdate(new User(userId, guildId), update, true);
  }

  async modifyCash(dbGuild, member, change) {
    const newDbUser = await this.findUserAndUpsert(member.id, dbGuild.guildId, new IncMoneyUpdate('cash', change));

    RankService.handle(newDbUser, dbGuild, member, await this.findMany({ guildId: dbGuild.guildId }));

    return newDbUser;
  }

  async modifyHealth(dbGuild, member, change) {
    const newDbUser = await this.findUserAndUpsert(member.id, dbGuild.guildId, new IncMoneyUpdate('health', change));

    RankService.handle(newDbUser, dbGuild, member, await this.findMany({ guildId: dbGuild.guildId }));

    return newDbUser;
  }

  async modifyCashExact(dbGuild, member, change) {
    const newDbUser = await this.findUserAndUpsert(member.id, dbGuild.guildId, new IncPointsUpdate('cash', change));

    RankService.handle(newDbUser, dbGuild, member, await this.findMany({ guildId: dbGuild.guildId }));

    return newDbUser;
  }

  async modifyPoints(dbGuild, member, change) {
    const newDbUser = await this.findUserAndUpsert(member.id, dbGuild.guildId, new IncPointsUpdate('points', change));

    RankService.handle(newDbUser, dbGuild, member, await this.findMany({ guildId: dbGuild.guildId }));

    return newDbUser;
  }

  async modifyBounty(dbGuild, member, change) {
    const newDbUser = await this.findUserAndUpsert(member.id, dbGuild.guildId, new IncMoneyUpdate('bounty', change));

    RankService.handle(newDbUser, dbGuild, member, await this.findMany({ guildId: dbGuild.guildId }));

    return newDbUser;
  }

  async modifyCashAndPointsExact(dbGuild, member, changeCash, changePoints) {
    const newDbUserCash = await this.findUserAndUpsert(member.id, dbGuild.guildId, new IncPointsUpdate('cash', changeCash));
    const newDbUserPoints = await this.findUserAndUpsert(member.id, dbGuild.guildId, new IncPointsUpdate('points', changePoints));

    RankService.handle(newDbUserCash, dbGuild, member, await this.findMany({ guildId: dbGuild.guildId }));
    RankService.handle(newDbUserPoints, dbGuild, member, await this.findMany({ guildId: dbGuild.guildId }));

    await newDbUserCash;
    return newDbUserPoints;
  }

  deleteUser(userId, guildId) {
    return this.deleteOne(new UserQuery(userId, guildId));
  }

  deleteUsers(guildId) {
    return this.deleteMany({ guildId: guildId });
  }
}

module.exports = UserRepository;
