const {
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { readdirSync } = require("fs");
const { supportUrl, inviteUrl, harukaUrl, paypal } = require("../../../settings/config.js");
const GPrefix = require('../../../settings/models/Prefix.js');


module.exports = {
  name: "help",
  description: "Display all commands of the bot.",
  category: "Information",
  aliases: ["h", "halp"],
  owner: false,
  run: async (client, message, args) => {
      let PREFIX = client.prefix;
      const GuildPrefix = await GPrefix.findOne({ guild: message.guild.id });
      if(GuildPrefix && GuildPrefix.prefix) PREFIX = GuildPrefix.prefix;
      const row2 = new ActionRowBuilder()
          .addComponents(new ButtonBuilder().setLabel("Support").setURL(supportUrl).setStyle(ButtonStyle.Link))
          .addComponents(new ButtonBuilder().setLabel("Invite").setURL(inviteUrl).setStyle(ButtonStyle.Link))
          .addComponents(new ButtonBuilder().setLabel("Invite Haruka Music").setURL(harukaUrl).setStyle(ButtonStyle.Link))
          .addComponents(new ButtonBuilder().setLabel("Paypal").setURL(paypal).setStyle(ButtonStyle.Link));

      if (!args[0]) {
          const categories = readdirSync("./commands/Slash/");
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
              .setColor(client.color)
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

          const row = new ActionRowBuilder().addComponents([
              new StringSelectMenuBuilder()
                  .setCustomId("help-category")
                  .setPlaceholder(`Select Menu Category Commands`)
                  .setMaxValues(1)
                  .setMinValues(1)
                  .setOptions(
                      categories.map((category) => {
                          return new StringSelectMenuOptionBuilder().setLabel(category).setValue(category);
                      })
                  ),
          ]);

          message.reply({ content: `⏰ In **__1 minutes__** the next page will close`, components: [row, row2], embeds: [embed] }).then(async (msg) => {
              let filter = (i) => i.isStringSelectMenu() && i.user && i.message.author.id == client.user.id;
              let collector = await msg.createMessageComponentCollector({
                  filter,
                  time: 60000,
              });
              collector.on("collect", async (m) => {
                  if (m.isStringSelectMenu()) {
                      if (m.customId === "help-category") {
                          await m.deferUpdate();
                          let [directory] = m.values;

                          const embed = new EmbedBuilder()
                              .setAuthor({
                                  name: `${message.guild.members.me.displayName} Help Command!`,
                                  iconURL: message.guild.iconURL({ dynamic: true }),
                              })
                              .setDescription(
                                  `These are all available commands for this category to use. Try adding [\`/\` & \`${PREFIX}\`] before the commands or you can just click these commands below.\n\n**❯ ${
                                      directory.slice(0, 1).toUpperCase() + directory.slice(1)
                                  }:**\n${client.slashCommands
                                      .filter((c) => c.category === directory)
                                      .map((c) => `\`${c.name}\` : *${c.description}*`)
                                      .join("\n")}`
                              )
                              .setColor(client.color)
                              .setFooter({
                                  text: `© ${client.user.username} | Total Commands: ${
                                      client.slashCommands.filter((c) => c.category === directory).size
                                  }`,
                                  iconURL: client.user.displayAvatarURL({ dynamic: true }),
                              })
                              .setTimestamp();

                          msg.edit({ embeds: [embed] });
                      }
                  }
              });

              collector.on("end", async (collected, reason) => {
                  if (reason === "time") {
                      const timed = new EmbedBuilder()
                          .setAuthor({
                              name: `${message.guild.members.me.displayName} Help Command!`,
                              iconURL: message.guild.iconURL({ dynamic: true }),
                          })
                          .setDescription(
                              `Help Command Menu was timed out, try using \`/help\` & \`${PREFIX}help\` to show the help command menu again. Enjoying using **${client.user}**?\n\nThank You. 🤍`
                          )
                          .setColor(client.color)
                          .setFooter({
                              text: `© ${client.user.username} | Total Commands: ${client.slashCommands.size}`,
                              iconURL: client.user.displayAvatarURL({ dynamic: true }),
                          })
                          .setTimestamp();

                      msg.edit({ content: "🕐 This help menu is expired! Please retype the command to view again.", embeds: [timed], components: [row2] });
                  }
              });
          });
      }
  },
};
