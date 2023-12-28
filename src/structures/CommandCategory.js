const config = require("@root/config");

module.exports = {
  ADMIN: {
    name: "Admin",
    emoji: "⚙️",
  },
  AUTOMOD: {
    name: "Automod",
    enabled: config.AUTOMOD.ENABLED,
    image: "https://cdn.discordapp.com/attachments/1102585584117088318/1135067846108516422/0d9c648b23dc8ba34d076d6ac43d8045.png",
    emoji: "🤖",
  },
  GIVEAWAY: {
    name: "Giveaway",
    enabled: config.GIVEAWAYS.ENABLED,
    image: "https://cdn.discordapp.com/attachments/1102585584117088318/1135067846108516422/0d9c648b23dc8ba34d076d6ac43d8045.png",
    emoji: "🎉",
  },
  INVITE: {
    name: "Invite",
    enabled: config.INVITE.ENABLED,
    image: "https://cdn.discordapp.com/attachments/1102585584117088318/1135067846108516422/0d9c648b23dc8ba34d076d6ac43d8045.png",
    emoji: "📨",
  },
  IMAGE: {
    name: "Image",
    enabled: config.IMAGE.ENABLED,
    image: "https://cdn.discordapp.com/attachments/1102585584117088318/1135067846108516422/0d9c648b23dc8ba34d076d6ac43d8045.png",
    emoji: "🖼️",
  },
  INFORMATION: {
    name: "Information",
    image: "https://cdn.discordapp.com/attachments/1102585584117088318/1135067846108516422/0d9c648b23dc8ba34d076d6ac43d8045.png",
    emoji: "🪧",
  },
  MODERATION: {
    name: "Moderation",
    enabled: config.MODERATION.ENABLED,
    image: "https://cdn.discordapp.com/attachments/1102585584117088318/1135067846108516422/0d9c648b23dc8ba34d076d6ac43d8045.png",
    emoji: "🔨",
  },
  MUSIC: {
    name: "Music",
    enabled: config.MUSIC.ENABLED,
    emoji: "🎵",
  },
  OWNER: {
    name: "Owner",
    image: "https://cdn.discordapp.com/attachments/1102585584117088318/1135067846108516422/0d9c648b23dc8ba34d076d6ac43d8045.png",
    emoji: "🤴",
  },
  SUGGESTION: {
    name: "Suggestion",
    enabled: config.SUGGESTIONS.ENABLED,
    image: "https://cdn.discordapp.com/attachments/1102585584117088318/1135067846108516422/0d9c648b23dc8ba34d076d6ac43d8045.png",
    emoji: "📝",
  },
  TICKET: {
    name: "Ticket",
    enabled: config.TICKET.ENABLED,
    image: "https://cdn.discordapp.com/attachments/1102585584117088318/1135067846108516422/0d9c648b23dc8ba34d076d6ac43d8045.png",
    emoji: "🎫",
  },
  STATS: {
    name: "Statistics",
    enabled: config.STATS.ENABLED,
    image: "https://cdn.discordapp.com/attachments/1102585584117088318/1135067846108516422/0d9c648b23dc8ba34d076d6ac43d8045.png",
    emoji: "📈",
  },
  UTILITY: {
    name: "Utility",
    emoji: "🛠",
  },
};
