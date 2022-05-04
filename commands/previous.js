const { SlashCommandBuilder } = require('@discordjs/builders')
require('dotenv').config()
const guildId = process.env.GUILD_ID

module.exports = {
  data: new SlashCommandBuilder()
    .setName('previous')
    .setDescription('⏮️  Skips to previous song!'),

  async execute (interaction, player) {
    const queue = await player.getQueue(guildId)
    // await interaction.reply('Back in time!')
    if (queue === undefined) {
      return await interaction.reply({
        content: 'No song is playing',
        ephemeral: true
      })
    } else {
      if (queue.previousTracks.length <= 1) {
        return await interaction.reply({
          content: 'No song to go back to',
          ephemeral: true
        })
      } else {
        queue.back()
        return await interaction.reply({
          content: 'Going back to previous song',
          ephemeral: true
        })
      }
    }
  }
}
