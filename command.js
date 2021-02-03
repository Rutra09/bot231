const fs = require('fs');
let prefixguild = JSON.parse(fs.readFileSync('./prefixguild.json',"utf8"));


module.exports = (client, aliases, callback) => {
  if (typeof aliases === 'string') {
    aliases = [aliases]
  }

  client.on('message', (message) => {
    const { content, guild } = message
    
    if(!prefixguild[guild.id]){
      prefixguild[guild.id] = {prefixguild: `.`}
      fs.writeFile('./prefixguild.json', JSON.stringify(prefixguild), function(err, result) {
       if(err) console.log('error', err);
     })
    }
    const prefix = prefixguild[guild.id].prefixguild
    aliases.forEach((alias) => {
      const { member, mentions } = message
      const command = `${prefix}${alias}`
    
      if (content.startsWith(`${command} `) || content === command) {
        console.log(`Użytkownik: ${member} Użył komendy: ${command}`)
        callback(message)
      }
    })
  })

}
