const { musicValidations } = require("@helpers/BotUtils");
const { EmbedBuilder } = require("discord.js");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "resume",
  description: "resumes the music player",
  category: "MUSIC",
  validations: musicValidations,
  command: {
    enabled: true,
  },
  slashCommand: {
    enabled: true,
  },

  async messageRun(client, message, args) {
    const response = resumePlayer(message);
    const embed = new EmbedBuilder()
    .setDescription(response)
    .setColor("Red")
    await message.safeReply({ embeds: [embed] });
  },

  async interactionRun(interaction) {
    const response = resumePlayer(interaction);
    const embed = new EmbedBuilder()
    .setDescription(response)
    .setColor("White")
    await interaction.followUp({ embeds: [embed] });
  },
};

/**
 * @param {import("discord.js").CommandInteraction|import("discord.js").Message} arg0
 */
function resumePlayer({ client, guildId }) {
  const player = client.musicManager.getPlayer(guildId);
  if (!player.paused) return "The player is already resumed";
  player.resume();
  return "▶️ Resumed the music player";
}
