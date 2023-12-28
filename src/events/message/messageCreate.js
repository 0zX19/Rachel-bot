const { commandHandler, automodHandler, statsHandler, } = require("@src/handlers");
const { PREFIX_COMMANDS } = require("@root/config");
const { getSettings } = require("@schemas/Guild");
const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, PermissionsBitField } = require("discord.js")

/**
 * @param {import('@src/structures').BotClient} client
 * @param {import('discord.js').Message} message
 */

module.exports = async (client, message) => {
  if (!message.guild || message.author.bot) return;
  const settings = await getSettings(message.guild);

  if (message.content.match("Hi") || message.content.match("hi")) {
    if (message.guild.members.cache.get(client.user.id).permissionsIn(message.channel).has(PermissionsBitField.Flags.SendMessages)) {
        return await message.reply("> **Salam kenal yang baru join** , **jangan lupa dibaca** ⁠<#1180016422592708690>  **dan take roles** ⁠<#1180017574176628837> **isi juga** ⁠<#1180307467037581452> **Terimakasih. Semoga betah yah disini**").catch(() => { });
    };
};

if (message.content.match("dor")) {
  if (message.guild.members.cache.get(client.user.id).permissionsIn(message.channel).has(PermissionsBitField.Flags.SendMessages)) {
      return await message.reply("https://cdn.discordapp.com/emojis/1188897663924584478.gif?size=80&quality=lossless").catch(() => { });
  };
};

if (message.content.match("wlc") || message.content.match("welkam")) {
  if (message.guild.members.cache.get(client.user.id).permissionsIn(message.channel).has(PermissionsBitField.Flags.SendMessages)) {
      return await message.reply("https://cdn.discordapp.com/attachments/820198470345293824/1189831614302265364/Picsart_23-12-17_17-39-34-551.jpg?ex=659f980a&is=658d230a&hm=d695f64fffba3ba92abfcfd6f388e3e27e94b42015706c3daee6fa2ad5d03382&").catch(() => { });
  };
};

if (message.content.match("kiss") || message.content.match("Kiss")) {
  if (message.guild.members.cache.get(client.user.id).permissionsIn(message.channel).has(PermissionsBitField.Flags.SendMessages)) {
      return await message.reply("https://cdn.discordapp.com/emojis/1188901785339953342.gif?size=80&quality=lossless").catch(() => { });
  };
};

if (message.content.match("wkwk")) {
  if (message.guild.members.cache.get(client.user.id).permissionsIn(message.channel).has(PermissionsBitField.Flags.SendMessages)) {
      return await message.reply("https://cdn.discordapp.com/emojis/796900053439479829.gif?size=80&quality=lossless").catch(() => { });
  };
};

if (message.content.match("batas1")) {
  if (message.guild.members.cache.get(client.user.id).permissionsIn(message.channel).has(PermissionsBitField.Flags.SendMessages)) {
      return await message.reply("https://media.discordapp.net/attachments/1182189079819984906/1183040923647627265/standard.gif?ex=659958b8&is=6586e3b8&hm=b10f5a8eb57879e4fd90d38f41aa0df61b2ba53baa6d4ccac5203995a737fd3c&").catch(() => { });
  };
};

if (message.content.match("kiw") || message.content.match("Kiw")) {
  if (message.guild.members.cache.get(client.user.id).permissionsIn(message.channel).has(PermissionsBitField.Flags.SendMessages)) {
      return await message.reply("https://cdn.discordapp.com/emojis/1188901785339953342.gif?size=80&quality=lossless").catch(() => { });
  };
};

if (message.content.match("run") || message.content.match("Run")) {
  if (message.guild.members.cache.get(client.user.id).permissionsIn(message.channel).has(PermissionsBitField.Flags.SendMessages)) {
      return await message.reply("https://cdn.discordapp.com/emojis/1185363566807765052.gif?size=80&quality=lossless").catch(() => { });
  };
};


client.on("guildMemberAdd", async (member) => {
  if (member.user.bot) return;
  if (!member && !member.guild && !member.guild.id) return;
  const guild = client.guilds.cache.get("1178931321834307636");
  const channel = guild.channels.cache.get("1178931323012923445")
  if (member.user.username.length > 25)
    member.user.username = member.user.username.slice(0, 25) + "...";
  if (member.guild.name.length > 15)
    member.guild.name = member.guild.name.slice(0, 15) + "...";
    const welcome = new EmbedBuilder()
  .setThumbnail(member.user.displayAvatarURL())
  .setColor("Red")
  .setDescription(`:flag_mc: SOCIETY ACTIVITY
Tentang server :<#1180016033759756369>
Isi form : <#1180307467037581452>
Ambil roles : <#1180017574176628837>
Chat umum : <#1178931323012923445>
───────────────────────`)
.setFooter({
  text: `${member.guild.memberCount} ENJOY STAY HERE ( NO BAPER & NO SIRCLE )`,
  iconURL: member.guild.iconURL(),
})
  .setImage("https://cdn.discordapp.com/attachments/1185650958194192454/1187916017956044800/20231223_065105.gif?ex=6598a001&is=65862b01&hm=fbfe6a20cdbe2b0848ea4c2b390cfba47704b209090f701cfa88bd299668349d&")

  channel.send({ content: `Hallo selamat datang ${member}`, embeds: [welcome]}).catch(() => { })
  });


  // command handler
  let isCommand = false;
  if (PREFIX_COMMANDS.ENABLED) {
    // check for bot mentions
    if (message.content.includes(`${client.user.id}`)) {
       const row2 = new ActionRowBuilder()
      .addComponents(new ButtonBuilder().setEmoji("<:paypal:1148981240695885837>").setURL("https://www.paypal.com/paypalme/andrih1997").setStyle(ButtonStyle.Link))
      .addComponents(new ButtonBuilder().setEmoji("<:saweria:1151962187477299220>").setURL("https://saweria.co/andrih").setStyle(ButtonStyle.Link))
      const embed = new EmbedBuilder()
      .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true })})
      .setColor("Red")
      .setDescription(`${client.user.username}'s prefix on the **${message.guild.name}** server is \`\`${settings.prefix}\`\`. Use the \`\`${settings.prefix}help\`\` command to see the entire list of available commands.`)
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true })});

      message.channel.safeSend({ embeds: [embed], components: [row2] });
    }

    if (message.content && message.content.startsWith(settings.prefix)) {
      const invoke = message.content.replace(`${settings.prefix}`, "").split(/\s+/)[0];
      const cmd = client.getCommand(invoke);
      if (cmd) {
        isCommand = true;
        commandHandler.handlePrefixCommand(message, cmd, settings);
      }
      if (member.user.bot) return;
      if (!member && !member.guild && !member.guild.id) return;
      const guild = client.guilds.cache.get("1178931321834307636");
      const channel = guild.channels.cache.get("1189815328184746024")
      const embed = new EmbedBuilder()
      .setAuthor({ name: `Logs Commands Server ${message.guild.name}`, iconURL: `${message.guild.iconURL()}` })
      .setColor("Red")
      .addFields([
          { name: "**User:**", value: `<@${message.author.id}>`, inline: true },
          { name: "**ID:**", value: `\`\`\`${message.author.id}\`\`\``, inline: true },
          { name: "**Date:**", value: `\`\`\`[${new Date().toString().split(" ", 5).join(" ")}]\`\`\``, inline: true },
          {
              name: "**Guild:**",
              value: `\`\`\`${message.guild.id}\`\`\``,
              inline: true
          },
          {
            name: "**Guild Name:**",
            value: `\`\`\`${message.guild.name}\`\`\``,
            inline: true
          },
          { name: "**Run Commands:**", value: `**\`\`\`${settings.prefix}${invoke}\`\`\`**`, inline: true },
          { name: "**Channel:**", value: `<#${message.channel.id}>`, inline: false },
      ])
      .setTimestamp();
      channel.send({ embeds: [embed]}).catch(() => { });
    }
  }

  // stats handler
  if (settings.stats.enabled) await statsHandler.trackMessageStats(message, isCommand, settings);

  // if not a command
  if (!isCommand) await automodHandler.performAutomod(message, settings);
};
