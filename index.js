const { Client, Intents } = require('discord.js')
const Discord = require('discord.js')
const config = require('./command_config.js')
const { Player } = require('discord-player')
const client = new Discord.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES
  ]
})
;(async () => {
  await config.SetBotCommands()
})()

// --------------------------------------------------------------------------------------- //
// Create a new Player (you don't need any API Key)
const player = new Player(client)

// add the trackStart event so when a song will be played this message will be sent
player.on('trackStart', (queue, track) =>
  queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`)
)
// --------------------------------------------------------------------------------------- //

// --------------------------------------------------------------------------------------- //
//create client
client.once('ready', () => {
  console.log("I'm ready !")
})
// --------------------------------------------------------------------------------------- //
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return

  // /play track:Despacito
  // will play "Despacito" in the voice channel
  if (interaction.commandName === 'play') {
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
    if (track.length == 1) {
      queue.addTrack(track)
    } else {
      queue.addTracks(track)
    }

    queue.play()

    return await interaction.followUp({
      content: `⏱️ | Loading track **${track.title}**!`
    })
  }
})

client.login(process.env.DISCORD_TOKEN)
