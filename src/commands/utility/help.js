const { CommandCategory, BotClient } = require("@src/structures");
const { EMBED_COLORS, SUPPORT_SERVER } = require("@root/config.js");

const {
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  Message,
  ButtonBuilder,
  CommandInteraction,
  ApplicationCommandOptionType,
  ButtonStyle,
} = require("discord.js");
const { getCommandUsage, getSlashUsage } = require("@handlers/command");

const CMDS_PER_PAGE = 5;
const IDLE_TIMEOUT = 30;

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "help",
  description: "command help menu",
  category: "UTILITY",
  botPermissions: ["EmbedLinks"],
  command: {
    enabled: true,
    usage: "[command]",
  },
  slashCommand: {
    enabled: true,
    options: [
      {
        name: "command",
        description: "name of the command",
        required: false,
        type: ApplicationCommandOptionType.String,
      },
    ],
  },

  async messageRun(message, args, data) {
    const emo = {
      filters: "<a:playlist2:951527152967368785>",
      info: "<a:info:877158760206975026>",
      moderation: "<:moderation:877158733589905429>",
      music: "<:music:1089665091164721212>",
      owner: "<a:skdev:930330738333737031>",
      utilities: "<a:utility:877158733661237269>",
      roleplay: "<:rp:951527150203314207>",
      giveaways: "<a:Giveaways:881154991417593957>",
      radio: "<:radio:877159892299939860>",
      ticket: "<a:ticket2:877234120445550634>",
      premium: "<:rp:951527150203314207>",
      exit: "<:icon_disabled:945226710394232852>"
  }
  const embed = new EmbedBuilder()
      .setAuthor({
          name: `${message.guild.members.me.displayName} Help Command!`,
          iconURL: message.guild.iconURL({ dynamic: true }),
      })
      .setColor("Red")
      .setDescription(
          `\`\`\`js\nPrefix: ${PREFIX}\nExtra information: <> If you see any error or any kind of bug please report to us!\n\nCommands for reports are: ${PREFIX}bugreport <text>\`\`\`\n**__My Features__**
          Haruka Multipurpose bot with ${client.slashCommands.size} commands that can use for **Music**, **Giveaways** and **Moderation**, ETC.
          
          <:kanan:853461941397749802> **Command Categories:**
          ${emo.filters} **|** \`Filters\`
          ${emo.giveaways} **|** \`Giveaways\`
          ${emo.moderation} **|** \`Moderation\`
          ${emo.info} **|** \`Information\`
          ${emo.music} **|** \`Music\`
          ${emo.premium} **|** \`Premium\`
          ${emo.utilities} **|** \`Utility\`
          `
      )
      .setFooter({
          text: `© ${client.user.username} | Select A Category From The Menu Below.`,
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

     message.reply({ content: `⏰ In **__1 minutes__** the next page will close`, components: [row, row2], embeds: [embed] });
  },

  async interactionRun(interaction) {
    let cmdName = interaction.options.getString("command");

    // !help
    if (!cmdName) {
      const response = await getHelpMenu(interaction);
      const sentMsg = await interaction.followUp(response);
      return waiter(sentMsg, interaction.user.id);
    }

    // check if command help (!help cat)
    const cmd = interaction.client.slashCommands.get(cmdName);
    if (cmd) {
      const embed = getSlashUsage(cmd);
      return interaction.followUp({ embeds: [embed] });
    }

    // No matching command/category found
    await interaction.followUp("No matching command found");
  },
};

/**
 * @param {CommandInteraction} interaction
 */
async function getHelpMenu({ client }) {
  // Menu Row
  const options = [];
  for (const [k, v] of Object.entries(CommandCategory)) {
    if (v.enabled === false) continue;
    options.push({
      label: v.name,
      value: k,
      emoji: v.emoji,
    });
  }

  const menuRow = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("help-menu")
      .setPlaceholder("Choose the command category")
      .addOptions(options)
  );

  // Buttons Row
  let components = [];
  components.push(
    new ButtonBuilder().setCustomId("previousBtn").setLabel("Previous").setEmoji("⬅️").setStyle(ButtonStyle.Primary).setDisabled(true),
    new ButtonBuilder().setCustomId("nextBtn").setLabel("Next").setEmoji("➡️").setStyle(ButtonStyle.Primary).setDisabled(true),
);

  const row2 = new ActionRowBuilder()
    .addComponents(new ButtonBuilder().setEmoji("<:paypal:1148981240695885837>").setURL("https://www.paypal.com/paypalme/andrih1997").setStyle(ButtonStyle.Link))
    .addComponents(new ButtonBuilder().setEmoji("<:saweria:1151962187477299220>").setURL("https://saweria.co/andrih").setStyle(ButtonStyle.Link))


  let buttonsRow = new ActionRowBuilder().addComponents(components);
  const emo = {
    admin: "⚙️",
    information: "🪧",
    music: "🎵",
    owner: "🤴",
    utility: "🛠",
}

  const embed = new EmbedBuilder()
    .setColor(EMBED_COLORS.BOT_EMBED)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`
      <:kanan:1154667974733611068> **Command Categories:**
      ${emo.admin} **|** \`Admin\`
      ${emo.information} **|** \`Information\`
      ${emo.music} **|** \`Music\`
      ${emo.owner} **|** \`Owner\`
      ${emo.utility} **|** \`Utility\`
      `
  )
  .setFooter({
      text: `© ${client.user.username} | Select A Category From The Menu Below.`,
      iconURL: client.user.displayAvatarURL({ dynamic: true }),
  });

  return {
    content: "⏰ In **1 minutes** the next page will close",
    embeds: [embed],
    components: [menuRow, row2, buttonsRow  ],
  };
}

/**
 * @param {Message} msg
 * @param {string} userId
 * @param {string} prefix
 */
const waiter = (msg, userId, prefix) => {
  const collector = msg.channel.createMessageComponentCollector({
    filter: (reactor) => reactor.user.id === userId && msg.id === reactor.message.id,
    idle: IDLE_TIMEOUT * 1000,
    dispose: true,
    time: 5 * 60 * 1000,
  });

  let arrEmbeds = [];
  let currentPage = 0;
  let menuRow = msg.components[0];
  let row2 = msg.components[1];
  let buttonsRow = msg.components[2];
  

  collector.on("collect", async (response) => {
    if (!["help-menu", "previousBtn", "nextBtn"].includes(response.customId)) return;
    await response.deferUpdate();

    switch (response.customId) {
      case "help-menu": {
        const cat = response.values[0].toUpperCase();
        arrEmbeds = prefix ? getMsgCategoryEmbeds(msg.client, cat, prefix) : getSlashCategoryEmbeds(msg.client, cat);
        currentPage = 0;

        // Buttons Row
        let components = [];
        buttonsRow.components.forEach((button) =>
          components.push(ButtonBuilder.from(button).setDisabled(arrEmbeds.length > 1 ? false : true))
        );

        buttonsRow = new ActionRowBuilder().addComponents(components);
        msg.editable && (await msg.edit({ embeds: [arrEmbeds[currentPage]], components: [ menuRow, row2, buttonsRow] }));
        break;
      }

      case "previousBtn":
        if (currentPage !== 0) {
          --currentPage;
          msg.editable && (await msg.edit({ embeds: [arrEmbeds[currentPage]], components: [menuRow, row2, buttonsRow] }));
        }
        break;

      case "nextBtn":
        if (currentPage < arrEmbeds.length - 1) {
          currentPage++;
          msg.editable && (await msg.edit({ embeds: [arrEmbeds[currentPage]], components: [menuRow, row2, buttonsRow] }));
        }
        break;
    }
  });

  collector.on("end", () => {
    if (!msg.guild || !msg.channel) return;
    return msg.editable && msg.edit({ content: "🕐 This help menu is expired! Please retype the command to view again.", components: [] });
  });
};

/**
 * Returns an array of message embeds for a particular command category [SLASH COMMANDS]
 * @param {BotClient} client
 * @param {string} category
 */
function getSlashCategoryEmbeds(client, category) {
  let collector = "";

  // For IMAGE Category
  if (category === "IMAGE") {
    client.slashCommands
      .filter((cmd) => cmd.category === category)
      .forEach((cmd) => (collector += `\`/${cmd.name}\`\n ❯ ${cmd.description}\n\n`));

    const availableFilters = client.slashCommands
      .get("filter")
      .slashCommand.options[0].choices.map((ch) => ch.name)
      .join(", ");

    const availableGens = client.slashCommands
      .get("generator")
      .slashCommand.options[0].choices.map((ch) => ch.name)
      .join(", ");

    collector +=
      "**Available Filters:**\n" + `${availableFilters}` + `*\n\n**Available Generators**\n` + `${availableGens}`;

    const embed = new EmbedBuilder()
      .setColor(EMBED_COLORS.BOT_EMBED)
      .setThumbnail(CommandCategory[category]?.image)
      .setAuthor({ name: `${category} Commands` })
      .setDescription(collector);

    return [embed];
  }

  // For REMAINING Categories
  const commands = Array.from(client.slashCommands.filter((cmd) => cmd.category === category).values());

  if (commands.length === 0) {
    const embed = new EmbedBuilder()
      .setColor(EMBED_COLORS.BOT_EMBED)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor({ name: `${category} Commands` })
      .setDescription("No commands in this category");

    return [embed];
  }

  const arrSplitted = [];
  const arrEmbeds = [];

  while (commands.length) {
    let toAdd = commands.splice(0, commands.length > CMDS_PER_PAGE ? CMDS_PER_PAGE : commands.length);

    toAdd = toAdd.map((cmd) => {
      const subCmds = cmd.slashCommand.options?.filter((opt) => opt.type === "SUB_COMMAND");
      const subCmdsString = subCmds?.map((s) => s.name).join(", ");

      return `\`/${cmd.name}\`\n**Description**: ${cmd.description}\n ${
        !subCmds?.length ? "" : `**SubCommands [${subCmds?.length}]**: ${subCmdsString}\n`
      } `;
    });

    arrSplitted.push(toAdd);
  }

  arrSplitted.forEach((item, index) => {
    const embed = new EmbedBuilder()
      .setColor(EMBED_COLORS.BOT_EMBED)
      .setThumbnail(CommandCategory[category]?.image)
      .setAuthor({ name: `${category} Commands` })
      .setDescription(item.join("\n"))
      .setFooter({ text: `page ${index + 1} of ${arrSplitted.length}` });
    arrEmbeds.push(embed);
  });

  return arrEmbeds;
}

/**
 * Returns an array of message embeds for a particular command category [MESSAGE COMMANDS]
 * @param {BotClient} client
 * @param {string} category
 * @param {string} prefix
 */
function getMsgCategoryEmbeds(client, category, prefix) {
  let collector = "";

  // For IMAGE Category
  if (category === "IMAGE") {
    client.commands
      .filter((cmd) => cmd.category === category)
      .forEach((cmd) =>
        cmd.command.aliases.forEach((alias) => {
          collector += `\`${alias}\`, `;
        })
      );

    collector +=
      "\n\nYou can use these image commands in following formats\n" +
      `**${prefix}cmd:** Picks message authors avatar as image\n` +
      `**${prefix}cmd <@member>:** Picks mentioned members avatar as image\n` +
      `**${prefix}cmd <url>:** Picks image from provided URL\n` +
      `**${prefix}cmd [attachment]:** Picks attachment image`;

    const embed = new EmbedBuilder()
      .setColor(EMBED_COLORS.BOT_EMBED)
      .setThumbnail(CommandCategory[category]?.image)
      .setAuthor({ name: `${category} Commands` })
      .setDescription(collector);

    return [embed];
  }

  // For REMAINING Categories
  const commands = client.commands.filter((cmd) => cmd.category === category);

  if (commands.length === 0) {
    const embed = new EmbedBuilder()
      .setColor(EMBED_COLORS.BOT_EMBED)
      .setThumbnail(CommandCategory[category]?.image)
      .setAuthor({ name: `${category} Commands` })
      .setDescription("No commands in this category");

    return [embed];
  }

  const arrSplitted = [];
  const arrEmbeds = [];

  while (commands.length) {
    let toAdd = commands.splice(0, commands.length > CMDS_PER_PAGE ? CMDS_PER_PAGE : commands.length);
    toAdd = toAdd.map((cmd) => `\`${prefix}${cmd.name}\`\n <:kanan:1154667974733611068> ${cmd.description}\n`);
    arrSplitted.push(toAdd);
  }

  arrSplitted.forEach((item, index) => {
    const embed = new EmbedBuilder()
      .setColor(EMBED_COLORS.BOT_EMBED)
      .setThumbnail(CommandCategory[category]?.image)
      .setAuthor({ name: `${category} Commands` })
      .setDescription(item.join("\n"))
      .setFooter({
        text: `page ${index + 1} of ${arrSplitted.length} | Type ${prefix}help <command> for more command information`,
      });
    arrEmbeds.push(embed);
  });

  return arrEmbeds;
}
