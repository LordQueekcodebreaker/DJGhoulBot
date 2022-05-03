const { Player } = require('discord-player')

function GetPlayer (client) {
  const player = new Player(client)
  player.on('trackStart', (queue, track) =>
    queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`)
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
