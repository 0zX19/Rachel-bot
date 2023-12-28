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
const { EmbedBuilder } = require("discord.js");
validateConfiguration();

// initialize client
const client = new BotClient();
client.loadCommands("src/commands");
client.loadContexts("src/contexts");
client.loadEvents("src/events");

client.on("guildMemberAdd", async (member) => {
  if (member.user.bot) return;
  if (!member && !member.guild && !member.guild.id) return;
  const guild = client.guilds.cache.get("1178931321834307636");
  const channel = guild.channels.cache.get("1189861389221756979")
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

  channel.send({ content: `Hallo selamat datang ${member}`, embeds: [welcome]}).catch(() => { })
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
