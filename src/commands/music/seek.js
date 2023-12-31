const { musicValidations } = require("@helpers/BotUtils");
const prettyMs = require("pretty-ms");
const { durationToMillis } = require("@helpers/Utils");
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "seek",
  description: "sets the playing track's position to the specified position",
  category: "MUSIC",
  validations: musicValidations,
  command: {
    enabled: true,
    usage: "<duration>",
  },
  slashCommand: {
    enabled: true,
    options: [
      {
        name: "time",
        description: "The time you want to seek to.",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },

  // async messageRun(client, message, args) {
  //   const time = args.join(" ");
  //   const response = seekTo(message, time);
  //   const embed = new EmbedBuilder()
  //   .setDescription(response)
  //   .setColor("Red")
  //   await message.safeReply({ embeds: [embed] });
  // },

  // async interactionRun(interaction) {
  //   const time = interaction.options.getString("time");
  //   const response = seekTo(interaction, time);
  //   const embed = new EmbedBuilder()
  //   .setDescription(response)
  //   .setColor(client.color)
  //   await interaction.followUp({ embeds: [embed] });
  // },
};

/**
 * @param {import("discord.js").CommandInteraction|import("discord.js").Message} arg0
 * @param {number} time
 */
// function seekTo({ client, guildId }, time) {
//   const player = client.musicManager?.getPlayer(guildId);
//   const seekTo = durationToMillis(time);

//   if (seekTo > player.queue.current.length) {
//     return "The duration you provide exceeds the duration of the current track";
//   }

//   player.seek(seekTo);
//   return `Seeked to ${prettyMs(seekTo, { colonNotation: true, secondsDecimalDigits: 0 })}`;
// }
