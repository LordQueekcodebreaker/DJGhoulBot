const Discord = require('discord.js')
const { Client, Intents } = require('discord.js')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const fs = require('fs')
const { Player } = require('discord-player')
const { CLIENT_RENEG_LIMIT } = require('tls')
require('dotenv').config()

const token = process.env.DISCORD_TOKEN
const load_slash = process.argv[2] == 'load'

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES]
})

client.slashcommands = new Discord.Collection()
client.player = new Player(client, {
  ytdlOptions: {
    quality: 'highestaudio',
    highWaterMark: 1 << 25
  }
})

let commands = []

const slashfiles = fs
  .readdirSync('./slash')
  .filter(file => file.endsWith('.js'))
for (const file of slashfiles) {
  const slashcmd = require(`./slash/${file}`)
  client.slashcommands.set(slashcmd.data.name, slashcmd)
  if (load_slash) {
    commands.push(slashcmd.data.toJSON())
  }
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Ready!')
})

// Login to Discord with your client's token
client.login(token)
