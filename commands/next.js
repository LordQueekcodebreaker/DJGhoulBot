const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('next')
    .setDescription('⏭️  Skips to the next song!'),

  async execute (interaction, player) {
    await interaction.reply('lets do the time warp again')
  }
}
