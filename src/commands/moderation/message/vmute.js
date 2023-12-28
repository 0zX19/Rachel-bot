const vmute = require("../shared/vmute");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "vmute",
  description: "mutes specified member's voice",
  category: "MODERATION",
  userPermissions: ["MuteMembers"],
  botPermissions: ["MuteMembers"],
  command: {
    enabled: true,
    usage: "<ID|@member> [reason]",
    minArgsCount: 1,
  },
  slashCommand: {
    enabled: false,
  },

  async messageRun(message, args) {
    const target = await message.guild.resolveMember(args[0], true);
    if (!target) return message.safeReply(`No user found matching ${args[0]}`);
    const reason = message.content.split(args[0])[1].trim();
    const response = await vmute(message, target, reason);
    const embed = new EmbedBuilder()
    .setColor("White")
    .setDescription(response)
    await message.safeReply({ embeds: [embed] });
  },
};
