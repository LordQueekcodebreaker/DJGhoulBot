const fs = require('node:fs')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
require('dotenv').config()

const commands = []
const commandFiles = fs
  .readdirSync('./commands')
  .filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`../commands/${file}`)
  const request = command.data.toJSON()
  commands.push(request)
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN)
module.exports.deployCommands = async function () {
  try {
    await rest
      .put(
        Routes.applicationGuildCommands(
          process.env.CLIENT_ID,
          process.env.GUILD_ID
        ),
        { body: commands }
      )
      .then(() => console.log('Successfully registered application commands.'))
  } catch (error) {
    console.log(error)
  }
}
