const { Player } = require('discord-player')

function GetPlayer (client) {
  const player = new Player(client)
  player.on('trackStart', (queue, track) =>
    queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`)
  )
  player.on('queuEnd', queue =>
    queue.metadata.channel.send('Returning to rest')
  )

  return player
}

class PlayerHandler {
  constructor (client) {
    if (!PlayerHandler.instance) {
      PlayerHandler.instance = GetPlayer(client)
    }

    return PlayerHandler.instance
  }
}

module.exports = PlayerHandler
