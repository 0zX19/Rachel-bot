const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "ping",
  description: "shows the current ping from the bot to the discord servers",
  category: "INFORMATION",
  command: {
    enabled: true,
  },
  slashCommand: {
    enabled: true,
    ephemeral: true,
    options: [],
  },

  async messageRun(message, args, client) {

    const embed = new EmbedBuilder()
    .setTitle('**`🏓・PONG!`**')
    .setDescription(`**\`🍯・LATENCY: ${Math.floor(message.client.ws.ping)} ms\`**`)
    .setColor("White")
    .setTimestamp()

    const btn = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setCustomId('btn')
        .setStyle(ButtonStyle.Primary)
        .setEmoji('🔁')
    )

    const msg = await message.reply({ embeds: [embed], components: [btn] })

    const collector = msg.createMessageComponentCollector()
    collector.on('collect', async i => {
        if(i.customId == 'btn') {
            i.update({ embeds: [
                new EmbedBuilder()
                .setTitle('**`🏓・PONG!`**')
                .setDescription(`**\`🍯・LATENCY: ${Math.floor(message.client.ws.ping)} ms\`**`)
                .setColor("White")
                .setTimestamp()
            ], components: [btn] })
        }
    })
  },

  async interactionRun(interaction, client) {

    const embed = new EmbedBuilder()
    .setTitle('**`🏓・PONG!`**')
    .setDescription(`**\`🍯・LATENCY: ${Math.floor(interaction.client.ws.ping)} ms\`**`)
    .setColor("White")
    .setTimestamp()

    const btn = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setCustomId('btn')
        .setStyle(ButtonStyle.Primary)
        .setEmoji('🔁')
    )

    const msg = await interaction.reply({ embeds: [embed], components: [btn] })

    const collector = msg.createMessageComponentCollector()
    collector.on('collect', async i => {
        if(i.customId == 'btn') {
            i.update({ embeds: [
                new EmbedBuilder()
                .setTitle('**`🏓・PONG!`**')
                .setDescription(`**\`🍯・LATENCY: ${Math.floor(interaction.client.ws.ping)} ms\`**`)
                .setColor("White")
                .setTimestamp()
            ], components: [btn] })
        }
    })
  },
};