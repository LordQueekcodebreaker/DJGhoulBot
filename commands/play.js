const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays a song!')
    .addStringOption(option =>
      option
        .setName('query')
        .setDescription('The song you want to play')
        .setRequired(true)
    ),
  async execute (interaction) {
    await interaction.reply('test')
  }
}
