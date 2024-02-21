require("dotenv").config();
require("module-alias/register");

// register extenders
require("@helpers/extenders/Message");
require("@helpers/extenders/Guild");
require("@helpers/extenders/GuildChannel");

const { checkForUpdates } = require("@helpers/BotUtils");
const { initializeMongoose } = require("@src/database/mongoose");
const { BotClient } = require("@src/structures");
const { validateConfiguration } = require("@helpers/Validator");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
validateConfiguration();

const express = require('express');
const app = express();
const port = 443;
app.get('/', (req, res) => res.send('SERVER READY !'));
app.listen(port, () => console.log(`App is listening at http://localhost:${port}`));

// initialize client
const client = new BotClient();
client.loadCommands("src/commands");
client.loadContexts("src/contexts");
client.loadEvents("src/events");

//Welcome General
client.on("guildMemberAdd", async (member) => {
      const row = new ActionRowBuilder()
      .addComponents(new ButtonBuilder().setLabel("Rules").setEmoji("📃").setURL("https://discord.com/channels/1178931321834307636/1180016422592708690").setStyle(ButtonStyle.Link))
      .addComponents(new ButtonBuilder().setLabel("Selfroles").setEmoji("🔖").setURL("https://discord.com/channels/1178931321834307636/1180017574176628837").setStyle(ButtonStyle.Link))
      .addComponents(new ButtonBuilder().setLabel("About").setEmoji("🔎").setURL("https://discord.com/channels/1178931321834307636/1180016033759756369").setStyle(ButtonStyle.Link))
      .addComponents(new ButtonBuilder().setLabel("Assignment").setEmoji("📇").setURL("https://discord.com/channels/1178931321834307636/1180017791420600410").setStyle(ButtonStyle.Link))
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
  .setDescription(`:flag_mc: **SOCIETY ACTIVITY**
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

  channel.send({ content: `Hallo selamat datang ${member}`, embeds: [welcome], components: [row]}).catch(() => { })
  });

//Welcome Gateway
  client.on("guildMemberAdd", async (member) => {
    if (member.user.bot) return;
    if (!member && !member.guild && !member.guild.id) return;
    const guild = client.guilds.cache.get("1178931321834307636");
    const channel = guild.channels.cache.get("1178966180661317753")
    if (member.user.username.length > 25)
      member.user.username = member.user.username.slice(0, 25) + "...";
    if (member.guild.name.length > 15)
      member.guild.name = member.guild.name.slice(0, 15) + "...";
      const welcome = new EmbedBuilder()
    .setThumbnail(member.user.displayAvatarURL())
    .setColor("Red")
    .setDescription(`──────────────────────────────────
Selamat Datang DI :flag_mc: **SOCIETY ACTIVITY** ${member}
Baca rules terlebih dahulu ya : ⁠<#1180016422592708690>
Isi form : ⁠<#1180307467037581452>
Silahkan ambil role disini ⁠: ⁠<#1180017574176628837>
Chatting umum ⁠: <#1178931323012923445>
──────────────────────────────────`)
    .setImage("https://media.discordapp.net/attachments/1182189079819984906/1182586377938944060/20231208_143546.gif?ex=65a0ebe3&is=658e76e3&hm=090865a34fbbcb249d095c62e4741e06d09353ad7a83406add4f021f9a24b472&=&width=400&height=224")
  
    channel.send({ embeds: [welcome]}).catch(() => { })
    });


  //Welcome GoodBye
  client.on("guildMemberRemove", async (member) => {
    if (member.user.bot) return;
    if (!member && !member.guild && !member.guild.id) return;
    const guild = client.guilds.cache.get("1178931321834307636");
    const channel = guild.channels.cache.get("1178966180661317753")
    if (member.user.username.length > 25)
      member.user.username = member.user.username.slice(0, 25) + "...";
    if (member.guild.name.length > 15)
      member.guild.name = member.guild.name.slice(0, 15) + "...";
      const welcome = new EmbedBuilder()
    .setThumbnail(member.user.displayAvatarURL())
    .setColor("Red")
    .setDescription(`──────────────────────────────────
Selamat tinggal DI ${member} kembali lagi di lain waktu kawan
──────────────────────────────────`)
    .setImage("https://media.discordapp.net/attachments/1182189079819984906/1182586377938944060/20231208_143546.gif?ex=65a0ebe3&is=658e76e3&hm=090865a34fbbcb249d095c62e4741e06d09353ad7a83406add4f021f9a24b472&=&width=400&height=224")
  
    channel.send({ embeds: [welcome]}).catch(() => { })
    });


// find unhandled promise rejections
process.on("unhandledRejection", (err) => client.logger.error(`Unhandled exception`, err));

(async () => {
  // check for updates
  await checkForUpdates();

  // start the dashboard
  if (client.config.DASHBOARD.enabled) {
    client.logger.log("Launching dashboard");
    try {
      const { launch } = require("@root/dashboard/app");

      // let the dashboard initialize the database
      await launch(client);
    } catch (ex) {
      client.logger.error("Failed to launch dashboard", ex);
    }
  } else {
    // initialize the database
    await initializeMongoose();
  }

  // start the client
  await client.login(process.env.BOT_TOKEN);
})();
