const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { EMBED_COLORS  } = require("@root/config");
const { timeformat } = require("@helpers/Utils");
const moment = require("moment");
require("moment-duration-format");
const os = require("os");
const { stripIndent } = require("common-tags");
const { OWNER_IDS } = require("@root/config");

/**
 * @param {import('@structures/BotClient')} client
 */
module.exports = (client, message) => {
// STATS
let guilds = client.guilds.cache.size;
let channels = client.channels.cache.size;
let users = client.guilds.cache.reduce((size, g) => size + g.memberCount, 0);

// CPU
let platform = process.platform.replace(/win32/g, "Windows");
let architecture = os.arch();
let cores = os.cpus().length;
let cpuUsage = `${(process.cpuUsage().user / 1024 / 1024).toFixed(2)} MB`;
let model = os.cpus()[0].model;
let speed = `${os.cpus()[0].speed} MHz`;

// RAM
let botUsed = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`;
let botAvailable = `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`;
let botUsage = `${((process.memoryUsage().heapUsed / os.totalmem()) * 100).toFixed(1)}%`;

let overallUsed = `${((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024).toFixed(2)} GB`;
let overallAvailable = `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`;
let overallUsage = `${Math.floor(((os.totalmem() - os.freemem()) / os.totalmem()) * 100)}%`;

let developer = `<@${OWNER_IDS}>`;



let desc = "";
desc += `❒ Owner: ${developer}\n`;
desc += `❒ Total guilds: ${guilds}\n`;
desc += `❒ Total users: ${users}\n`;
desc += `❒ Total channels: ${channels}\n`;
desc += `❒ Command Count : ${client.commands.map(c => c.name).length}\n`;
desc += `❒ Ping: ${client.ws.ping} ms\n`;
desc += `❒ Speed: ${speed}\n`;
desc += "\n";

  const embed = new EmbedBuilder()
    .setTitle("Bot Information")
    .setColor(EMBED_COLORS.BOT_EMBED)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(desc)
    .addFields(
      {
        name: "CPU",
        value: stripIndent`
        ❯ **OS:** ${platform} [${architecture}]
        ❯ **Cores:** ${cores}
        ❯ **Usage:** ${cpuUsage}
        `,
        inline: true,
      },
      {
        name: "Bot's RAM",
        value: stripIndent`
        ❯ **Used:** ${botUsed}
        ❯ **Available:** ${botAvailable}
        ❯ **Usage:** ${botUsage}
        `,
        inline: true,
      },
      {
        name: "Overall RAM",
        value: stripIndent`
        ❯ **Used:** ${overallUsed}
        ❯ **Available:** ${overallAvailable}
        ❯ **Usage:** ${overallUsage}
        `,
        inline: true,
      },
      {
        name: "Node.js Version",
        value: `\`${process.versions.node}\``,
        inline: true,
      },
      {
        name: "Discord.js Version",
        value: `\`${require("discord.js/package.json").version}\``,
        inline: true,
      },
            {
        name: "Bot Version",
        value: `\`v5.6.5\``,
        inline: true,
      },
      {
        name: "System",
        value: "```" + model + "```",
        inline: false,
      }
    );

  // Buttons
  const row2 = new ActionRowBuilder()
  .addComponents(new ButtonBuilder().setEmoji("<:haruka:1154521466843430912>").setURL("https://haruka-bot.my.id/").setStyle(ButtonStyle.Link))
  .addComponents(new ButtonBuilder().setEmoji("<:paypal:1148981240695885837>").setURL("https://www.paypal.com/paypalme/andrih1997").setStyle(ButtonStyle.Link))
  .addComponents(new ButtonBuilder().setEmoji("<:saweria:1151962187477299220>").setURL("https://saweria.co/andrih").setStyle(ButtonStyle.Link))
  .addComponents(new ButtonBuilder().setEmoji("<:tng:1154538432731824168>").setURL("https://discord.gg/wFTRaQM4En").setStyle(ButtonStyle.Link))
  .addComponents(new ButtonBuilder().setEmoji("<:premiercrafty:1154547620627357826>").setURL("https://premiercrafty.site/").setStyle(ButtonStyle.Link))

  return { embeds: [embed], components: [row2] };
};
