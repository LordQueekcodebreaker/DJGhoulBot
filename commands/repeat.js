const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('repeat')
    .setDescription('🔁 Sets a song or playlist to loop!'),

  async execute (interaction, player) {
    await interaction.reply('lets do the time warp again')
  }
}
