const { SlashCommandBuilder } = require('@discordjs/builders')
require('dotenv').config()
const guildId = process.env.GUILD_ID

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('⏹️ Stops the player!'),

  async execute (interaction, player) {
    //check is command
    if (!interaction.isCommand()) return

    const queue = await player.getQueue(guildId)
    //check if playing
    if (!queue.nowPlaying()) {
      return await interaction.reply({
        content: 'No song is currently playing',
        ephemeral: true
      })
    } else {
      queue.stop()
      return await interaction.reply({
        content: 'Stopped the player',
        ephemeral: true
      })
    }

    //
    await interaction.reply('stop in the name of muffins!')
  }
}
