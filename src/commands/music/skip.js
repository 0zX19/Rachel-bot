const { musicValidations } = require("@helpers/BotUtils");
const { EmbedBuilder } = require("discord.js");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "skip",
  description: "skip the current song",
  category: "MUSIC",
  validations: musicValidations,
  command: {
    enabled: true,
    aliases: ["next"],
  },
  slashCommand: {
    enabled: true,
  },

  async messageRun(client, message, args) {
    const response = skip(message);
    const embed = new EmbedBuilder()
    .setDescription(response)
    .setColor("Red")
    await message.safeReply({ embeds: [embed] });
  },

  async interactionRun(interaction) {
    const response = skip(interaction);
    const embed = new EmbedBuilder()
    .setDescription(response)
    .setColor(client.color)
    await interaction.followUp({ embeds: [embed] });
  },
};

/**
 * @param {import("discord.js").CommandInteraction|import("discord.js").Message} arg0
 */
function skip({ client, guildId }) {
  const player = client.musicManager.getPlayer(guildId);

  // check if current song is playing
  if (!player.queue.current) return "⏩ There is no song currently being played";

  const { title } = player.queue.current;
  return player.queue.next() ? `⏩ ${title} was skipped.` : "⏩ There is no song to skip.";
}
