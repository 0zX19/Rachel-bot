const { musicValidations } = require("@helpers/BotUtils");
const { EmbedBuilder } = require("discord.js");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "shuffle",
  description: "shuffle the queue",
  category: "MUSIC",
  validations: musicValidations,
  command: {
    enabled: true,
  },
  slashCommand: {
    enabled: true,
  },

  async messageRun(client, message, args) {
    const response = shuffle(message);
    const embed = new EmbedBuilder()
    .setDescription(response)
    .setColor(client.color)
    await message.safeReply({ embeds: [embed] });
  },

  async interactionRun(interaction) {
    const response = shuffle(interaction);
    const embed = new EmbedBuilder()
    .setDescription(response)
    .setColor("Red")
    await interaction.followUp({ embeds: [embed] });
  },
};

/**
 * @param {import("discord.js").CommandInteraction|import("discord.js").Message} arg0
 */
function shuffle({ client, guildId }) {
  const player = client.musicManager.getPlayer(guildId);
  player.queue.shuffle();
  return "🎶 Queue has been shuffled";
}
