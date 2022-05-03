const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('previous')
    .setDescription('⏮️  Skips to previous song!'),

  async execute (interaction, player) {
    await interaction.reply('Back in time!')
  }
}
