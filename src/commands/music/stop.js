const { musicValidations } = require("@helpers/BotUtils");
const { EmbedBuilder } = require("discord.js");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "stop",
  description: "stop the music player",
  category: "MUSIC",
  validations: musicValidations,
  command: {
    enabled: true,
    aliases: ["leave", "dc"],
  },
  slashCommand: {
    enabled: true,
  },

  // async messageRun(client, message, args) {
  //   const response = await stop(message);
  //   const embed = new EmbedBuilder()
  //   .setDescription(response)
  //   .setColor("Red")
  //   await message.safeReply({ embeds: [embed] });
  // },

  // async interactionRun(interaction) {
  //   const response = await stop(interaction);
  //   const embed = new EmbedBuilder()
  //   .setDescription(response)
  //   .setColor(client.color)
  //   await interaction.followUp({ embeds: [embed] });
  // },
};

/**
 * @param {import("discord.js").CommandInteraction|import("discord.js").Message} arg0
 */
// async function stop({ client, guildId }) {
//   const player = client.musicManager.getPlayer(guildId);
//   player.disconnect();
//   await client.musicManager.destroyPlayer(guildId);
//   return "🎶 The music player is stopped and queue has been cleared";
// }
