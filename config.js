const emo = {
  giveaways: "<:haruka:1154521466843430912>"
}

module.exports = {
  OWNER_IDS: ["378960892508897281","795708124442918913"], // Bot owner ID's
  SUPPORT_SERVER: "https://discord.gg/wFTRaQM4En", // Your bot support server
  PREFIX_COMMANDS: {
    ENABLED: true, // Enable/Disable prefix commands
    DEFAULT_PREFIX: "re", // Default prefix for the bot
  },
  INTERACTIONS: {
    SLASH: true, // Should the interactions be enabled
    CONTEXT: false, // Should contexts be enabled
    GLOBAL: true, // Should the interactions be registered globally
    TEST_GUILD_ID: "xxxxxxxxxxx", // Guild ID where the interactions should be registered. [** Test you commands here first **]
  },
  EMBED_COLORS: {
    BOT_EMBED: "Red",
    TRANSPARENT: "Red",
    SUCCESS: "Red",
    ERROR: "Red",
    WARNING: "Red",
  },
  CACHE_SIZE: {
    GUILDS: 100,
    USERS: 10000,
    MEMBERS: 10000,
  },
  MESSAGES: {
    API_ERROR: "Unexpected Backend Error! Try again later or contact support server",
  },

  // PLUGINS

  AUTOMOD: {
    ENABLED: false,
    LOG_EMBED: "White",
    DM_EMBED: "White",
  },

  DASHBOARD: {
    enabled: false, // enable or disable dashboard
    baseURL: "http://localhost:8080", // base url
    failureURL: "http://localhost:8080", // failure redirect url
    port: "8080", // port to run the bot on
  },

  ECONOMY: {
    ENABLED: false,
    CURRENCY: "₪",
    DAILY_COINS: 100, // coins to be received by daily command
    MIN_BEG_AMOUNT: 100, // minimum coins to be received when beg command is used
    MAX_BEG_AMOUNT: 2500, // maximum coins to be received when beg command is used
  },

  MUSIC: {
    ENABLED: false,
    IDLE_TIME: 900000000000000000n, // Time in seconds before the bot disconnects from an idle voice channel
    MAX_SEARCH_RESULTS: 500,
    DEFAULT_SOURCE: "YT", // YT = Youtube, YTM = Youtube Music, SC = SoundCloud
    // Add any number of lavalink nodes here
    // Refer to https://github.com/freyacodes/Lavalink to host your own lavalink server
    LAVALINK_NODES: [
      {
        host: "lava.link",
        port: 80,
        password: "youshallnotpass",
        id: "Society Activity Production",
        secure: false,
      },
    ],
  },

  GIVEAWAYS: {
    ENABLED: false,
    REACTION: `${emo.giveaways}`,
    START_EMBED: "White",
    END_EMBED: "White",
  },

  IMAGE: {
    ENABLED: false,
    BASE_API: "https://strangeapi.fun/api",
  },

  INVITE: {
    ENABLED: false,
  },

  MODERATION: {
    ENABLED: false,
    EMBED_COLORS: {
      TIMEOUT: "White",
      UNTIMEOUT: "White",
      KICK: "White",
      SOFTBAN: "White",
      BAN: "White",
      UNBAN: "White",
      VMUTE: "White",
      VUNMUTE: "White",
      DEAFEN: "White",
      UNDEAFEN: "White",
      DISCONNECT: "White",
      MOVE: "White",
    },
  },

  PRESENCE: {
    ENABLED: true, // Whether or not the bot should update its status
    STATUS: "online", // The bot's status [online, idle, dnd, invisible]
    TYPE: "WATCHING", // Status type for the bot [PLAYING | LISTENING | WATCHING | COMPETING]
    MESSAGE: "{members} members in {servers} servers", // Your bot status message
  },

  STATS: {
    ENABLED: false,
    XP_COOLDOWN: 5, // Cooldown in seconds between messages
    DEFAULT_LVL_UP_MSG: "{member:tag}, You just advanced to **Level {level}**",
  },

  SUGGESTIONS: {
    ENABLED: false, // Should the suggestion system be enabled
    EMOJI: {
      UP_VOTE: "⬆️",
      DOWN_VOTE: "⬇️",
    },
    DEFAULT_EMBED: "White",
    APPROVED_EMBED: "White",
    DENIED_EMBED: "White",
  },

  TICKET: {
    ENABLED: false,
    CREATE_EMBED: "White",
    CLOSE_EMBED: "White",
  },
};
