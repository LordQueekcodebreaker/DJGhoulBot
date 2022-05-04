require('dotenv').config()
const { SlashCommandBuilder } = require('@discordjs/builders')
const guildId = process.env.GUILD_ID

module.exports = {
  data: new SlashCommandBuilder()
    .setName('next')
    .setDescription('⏭️  Skips to the next song!'),

  async execute (interaction, player) {
    const queue = await player.getQueue(guildId)
    //check if playing
    if (queue === undefined) {
      return await interaction.reply({
        content: 'No song is playing',
        ephemeral: true
      })
    } else {
      const currentTrack = queue.nowPlaying()
      const position = queue.getTrackPosition(currentTrack)
      if (position >= queue.tracks.length - 1) {
        return await interaction.reply({
          content: 'No song to skip to',
          ephemeral: true
        })
      } else {
        queue.skip()
        return await interaction.reply({
          content: 'Skipping to next track',
          ephemeral: true
        })
      }
    }
  }
}
