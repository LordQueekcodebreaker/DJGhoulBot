require('dotenv').config()
const guildId = process.env.GUILD_ID
const { SlashCommandBuilder } = require('@discordjs/builders')
const { QueueRepeatMode } = require('discord-player')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('repeat')
    .setDescription('🔁 Sets a song or playlist to loop!')
    .addIntegerOption(option =>
      option
        .setAutocomplete(false)
        .setName('mode')
        .setDescription('Repeat type')
        .setRequired(true)
        .addChoices(
          {
            name: 'Off',
            value: 0
          },
          {
            name: 'Track',
            value: 1
          },
          {
            name: 'Queue',
            value: 2
          }
        )
    ),

  async execute (interaction, player) {
    const loopMode = interaction.options.get('mode').value
    const queue = await player.getQueue(guildId)

    if (queue === undefined) {
      return await interaction.reply({
        content: 'No song is playing',
        ephemeral: true
      })
    } else {
      const currentmode = queue.repeatMode
      if (loopMode == currentmode) {
        return await interaction.reply({
          content: 'Selected mode is already set',
          ephemeral: true
        })
      } else {
        switch (loopMode) {
          case 0:
            queue.setRepeatMode(QueueRepeatMode.OFF)
            break
          case 1:
            queue.setRepeatMode(QueueRepeatMode.TRACK)
            break
          case 2:
            queue.setRepeatMode(QueueRepeatMode.QUEUE)
            break
        }

        return await interaction.reply({
          content: ` Updated repeat mode | current mode: ${QueueRepeatMode[loopMode]}`,
          ephemeral: true
        })
      }
    }
  }
}
