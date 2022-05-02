const fs = require('node:fs')
const { Client, Collection, Intents } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS] })
const deploy = require('./deploy-commands.js')
require('dotenv').config()

client.commands = new Collection()
const commandfiles = fs
  .readdirSync('./commands')
  .filter(file => file.endsWith('js'))

for (const file in commandfiles) {
  const command = require(`./commands/${commandfiles[file]}`)
  client.commands.set(command.data.name, command)
}

;(async () => {
  await deploy.deployCommands()
})()

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return

  const command = client.commands.get(interaction.commandName)

  if (!command) return

  try {
    await command.execute(interaction)
  } catch (error) {
    console.error(error)
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true
    })
  }
})

client.once('ready', () => {
  console.log('Ready to test!')
})

client.login(process.env.DISCORD_TOKEN)
