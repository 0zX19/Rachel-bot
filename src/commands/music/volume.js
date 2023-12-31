const { musicValidations } = require("@helpers/BotUtils");
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "volume",
  description: "set the music player volume",
  category: "MUSIC",
  validations: musicValidations,
  command: {
    enabled: true,
    usage: "<1-100>",
  },
  slashCommand: {
    enabled: true,
    options: [
      {
        name: "amount",
        description: "Enter a value to set [0 to 100]",
        type: ApplicationCommandOptionType.Integer,
        required: false,
      },
    ],
  },

  // async messageRun(client, message, args) {
  //   const amount = args[0];
  //   const response = await volume(message, amount);
  //   const embed = new EmbedBuilder()
  //   .setDescription(response)
  //   .setColor("Red")
  //   await message.safeReply({ embeds: [embed] });
  // },

  // async interactionRun(interaction) {
  //   const amount = interaction.options.getInteger("amount");
  //   const response = await volume(interaction, amount);
  //   const embed = new EmbedBuilder()
  //   .setDescription(response)
  //   .setColor(interaction.color)
  //   await interaction.followUp({ embeds: [embed] });
  // },
};

/**
 * @param {import("discord.js").CommandInteraction|import("discord.js").Message} arg0
 */
// async function volume({ client, guildId }, volume) {
//   const player = client.musicManager.getPlayer(guildId);

//   if (!volume) return `> The player volume is \`${player.volume}\`.`;
//   if (volume < 1 || volume > 100) return "you need to give me a volume between 1 and 100.";

//   await player.setVolume(volume);
//   return `🎶 Music player volume is set to \`${volume}\`.`;
// }
