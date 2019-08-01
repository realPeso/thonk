class Guild {
  constructor(guildId) {
    this.guildId = guildId;
    this.roles = {
      mod: [],
      rank: [],
      muted: null,
      top10: null,
      top25: null,
      top50: null
    };
    this.channels = {
      modLog: null
    };
    this.settings = {
      messageMultiplier: 1,
      prefix: '$'
    };
    this.misc = {
      caseNumber: 1
    };
  }
}

module.exports = Guild;
