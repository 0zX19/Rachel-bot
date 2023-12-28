const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "restart",
  description: "restart bot",
  category: "OWNER",
  botPermissions: ["EmbedLinks"],
  command: {
    enabled: true,
  },
  slashCommand: {
    enabled: false,
    options: [
      {
        name: "expression",
        description: "content to evaluate",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },

  async messageRun(message, args) {
    const embed = new EmbedBuilder().setDescription(`\`🤖\` | Bot is: \`Restarting\``).setColor("White");

    await message.safeReply({ embeds: [embed] });

    process.exit();
  },

  async interactionRun(interaction) {
    const embed = new EmbedBuilder().setDescription(`\`🤖\` | Bot is: \`Restarting\``).setColor("White");

    await interaction.safeReply({ embeds: [embed] });

    process.exit();
  },
};
