const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const { EMBED_COLORS } = require("@root/config");

module.exports = async (emojilist) => {
    let i0 = 0;
    let i1 = 10;
    let page = 1;

    let description;

    description =  message.guild.emojis.cache
      .map(r => r)
      .map((r, i) => `**${i + 1})** ${r} | \\${r}`)
      .slice(i0, i1)
      .join("\n");

    let emb = new EmbedBuilder()
      .setColor(EMBED_COLORS)
      .setFooter({ text: `Page ${page}/${Math.ceil( message.guild.emojis.cache.size / 10)}` })
      .setDescription(description);

    let pages = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("⬅️")
        .setCustomId("previous_emoji"),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Secondary)
        .setLabel('❌')
        .setCustomId('home'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("➡️")
        .setCustomId("next_emoji")
    );

    let dis = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("⬅️")
        .setCustomId("previous_emoji"),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Secondary)
        .setLabel('❌')
        .setCustomId('home'),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("➡️")
        .setCustomId("next_emoji")
    );

    if ( message.guild.emojis.cache.size < 10)
      return message.channel.send({
        embeds: [emb],
        components: [dis]
      });

    let msg = await message.channel.send({
      embeds: [emb],
      components: [pages]
    });

    let filter = i => i.user.id === message.author.id ? true : false && interaction.deferUpdate();

    let collector = msg.channel.createMessageComponentCollector({ filter, time: 60000 * 5, idle: 30e3, });

    

    collector.on("collect", async i => {
      if(!i.deferred) await i.deferUpdate();
      if (i.customId === 'previous_emoji') {
          i0 = i0 - 10;
          i1 = i1 - 10;
          page = page - 1;
  
          description =  message.guild.emojis.cache
            .map(r => r)
            .map((r, i) => `**${i + 1})** ${r} | \\${r}`)
            .slice(i0, i1)
            .join("\n");
  
          emb
            .setFooter({ text: `Page ${page}/${Math.ceil( message.guild.emojis.cache.size / 10)}` })
            .setDescription(description);
  
          msg.edit({
            embeds: [emb]
          });
      } else if(i.customId == "home"){
        await i.deferUpdate().catch(() => {});
        await msg.delete();
  
      } else if (i.customId === 'next_emoji') {
          i0 = i0 + 10;
          i1 = i1 + 10;
          page = page + 1;
  
          if (i1 >  message.guild.emojis.cache.size + 10) return msg.delete();
          if (!i0 || !i1) return msg.delete();
  
          description =  message.guild.emojis.cache
            .map(r => r)
            .map((r, i) => `**${i + 1})** ${r} | \\${r}`)
            .slice(i0, i1)
            .join("\n");
  
          emb
            .setFooter({ text: `Page ${page}/${Math.ceil( message.guild.emojis.cache.size / 10)}` })
            .setDescription(description);
          msg.edit({
            embeds: [emb]
          });
      }
    });
};
