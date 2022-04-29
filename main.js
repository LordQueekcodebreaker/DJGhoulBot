const { Client, Intents } = require('discord.js')
require('dotenv').config()
const token = 'NDk0NDk4MTIxNDY0Njc2MzYz.W6uHQw.4_cfwygPy2VHSXysVN81moq8miw'

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Ready!')
})

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN)
