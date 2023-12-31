const { musicValidations } = require("@helpers/BotUtils");
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

const levels = {
  none: 0.0,
  low: 0.1,
  medium: 0.15,
  high: 0.25,
};

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "bassboost",
  description: "set bassboost level",
  category: "MUSIC",
  validations: musicValidations,
  command: {
    aliases: ["bass"],
    enabled: false,
    minArgsCount: 1,
    usage: "<none|low|medium|high>",
  },
  slashCommand: {
    enabled: true,
    options: [
      {
        name: "level",
        description: "bassboost level",
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
          {
            name: "none",
            value: "none",
          },
          {
            name: "low",
            value: "low",
          },
          {
            name: "medium",
            value: "medium",
          },
          {
            name: "high",
            value: "high",
          },
        ],
      },
    ],
  },

  async messageRun(message, args) {
    let level = "none";
    if (args.length && args[0].toLowerCase() in levels) level = args[0].toLowerCase();
    const response = setBassBoost(message, level);
    const embed = new EmbedBuilder()
    .setDescription(response)
    .setColor("Red")
    await message.safeReply({ embeds: [embed] });
  },

  async interactionRun(interaction) {
    let level = interaction.options.getString("level");
    const response = setBassBoost(interaction, level);
    const embed = new EmbedBuilder()
    .setDescription(response)
    .setColor("White")
    await interaction.followUp({ embeds: [embed] });
  },
};

/**
 * @param {import("discord.js").CommandInteraction|import("discord.js").Message} arg0
 * @param {number} level
 */
function setBassBoost({ client, guildId }, level) {
  const player = client.musicManager.getPlayer(guildId);
  const bands = new Array(3).fill(null).map((_, i) => ({ band: i, gain: levels[level] }));
  player.setEqualizer(...bands);
  return `> Set the bassboost level to \`${level}\``;
}
