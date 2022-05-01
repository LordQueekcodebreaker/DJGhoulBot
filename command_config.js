const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { builtinModules } = require('module')
require('dotenv').config()

const commands = [
  {
    name: 'play',
    description: 'Plays a song!',
    options: [
      {
        name: 'query',
        type: 3,
        description: 'The song you want to play',
        required: true
      }
    ]
  },
  {
    name: 'stop',
    description: 'Stops the current session!'
  }
]

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN)

module.exports.SetBotCommands = async function () {
  try {
    console.log('Started refreshing application [/] commands.')

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      {
        body: commands
      }
    )

    console.log('Successfully reloaded application [/] commands.')
  } catch (error) {
    console.error(error)
  }
}
