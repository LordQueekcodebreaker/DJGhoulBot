const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('⏹️ Stops the player!'),

  async execute (interaction) {
    await interaction.reply('stop in the name of muffins!')
  }
}
