const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('▶️  Plays a song or playlist!')
    .addStringOption(option =>
      option
        .setName('query')
        .setDescription('The song you want to play')
        .setRequired(true)
    ),
  async execute (interaction, player) {
    // add the trackStart event so when a song will be played this message will be sent
    // player.on('trackStart', (queue, track) =>
    //   queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`)
    // )

    // await interaction.reply('test')

    if (!interaction.member.voice.channelId)
      return await interaction.reply({
        content: 'You are not in a voice channel!',
        ephemeral: true
      })
    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !==
        interaction.guild.me.voice.channelId
    )
      return await interaction.reply({
        content: 'You are not in my voice channel!',
        ephemeral: true
      })
    const query = interaction.options.get('query').value
    const queue = player.createQueue(interaction.guild, {
      metadata: {
        channel: interaction.channel
      }
    })

    // verify vc connection
    try {
      if (!queue.connection)
        await queue.connect(interaction.member.voice.channel)
    } catch {
      queue.destroy()
      return await interaction.reply({
        content: 'Could not join your voice channel!',
        ephemeral: true
      })
    }

    await interaction.deferReply()
    const track = await player
      .search(query, {
        requestedBy: interaction.user
      })
      .then(x => x.tracks)
    if (!track)
      return await interaction.followUp({
        content: `❌ | Track **${query}** not found!`
      })
    // if (track.length == 1) {
    //   queue.addTrack(track)
    // } else {
    queue.addTracks(track)
    //}

    queue.play()

    return await interaction.followUp({
      content: `⏱️ | Loading track **${track[0].title}**!`
    })
  }
}
