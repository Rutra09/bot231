const { prefix } = require('./config.json')

module.exports = (client, aliases, callback) => {
  if (typeof aliases === 'string') {
    aliases = [aliases]
  }

  client.on('message', (message) => {
    const { content } = message

    aliases.forEach((alias) => {
      const command = `${prefix}${alias}`
      const { member, mentions } = message
      if (content.startsWith(`${command} `) || content === command) {
        console.log(`Użytkownik: ${member} Użył komendy: ${command}`)
        callback(message)
      }
      client.on("messageUpdate", (message) => {
        const { content } = message
    
        aliases.forEach((alias) => {
          const command = `${prefix}${alias}`
          const { member, mentions } = message
          if (content.startsWith(`${command} `) || content === command) {
            console.log(`Użytkownik: ${member} Użył komendy: ${command}`)
            callback(message)
          }
        })
      })
    })
  })

}
