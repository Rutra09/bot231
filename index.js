const Discord = require('discord.js')
const ms = require("ms");

var os = require("os");
const fs = require('fs');
const ytdl = require("ytdl-core");

const client = new Discord.Client();

const queue = new Map();
const ping = require('minecraft-server-util')
const api = require('imageapi.js');
const { token , prefix} = require('./config.json');
client.commands = new Discord.Collection();
const commandfiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const config = require('./config.json')
const command = require('./command');
const { APIMessage, DiscordAPIError } = require('discord.js');
const { error } = require('console');
const { match } = require('assert');
const { finished } = require('stream');
const { getUnpackedSettings } = require('http2');
const { domain } = require('process');
const { verify } = require('crypto');
let powitaniekanal = JSON.parse(fs.readFileSync('./welcomechanel.json', "utf8"));
let warns = JSON.parse(fs.readFileSync('./warndata.json', "utf8"));
let powitanie = JSON.parse(fs.readFileSync('./welcomemessages.json',"utf8"));
let colorpowitanie = JSON.parse(fs.readFileSync('./welcomecolor.json',"utf8"));
let ustawieniamuterole = JSON.parse(fs.readFileSync('./muterole.json',"utf8"));
let weryfikacjakanal =  JSON.parse(fs.readFileSync('./veryficationchanel.json',"utf8"));
let weryfikacjarola = JSON.parse(fs.readFileSync('./veryficationrole.json',"utf8"));
let pożegnaniekanal = JSON.parse(fs.readFileSync('./goodbyechanel.json', "utf8"));
let pożegnaniekolor = JSON.parse(fs.readFileSync('./goodbyechanel.json', "utf8"));
let pożegnanie = JSON.parse(fs.readFileSync('./goodbye.json', "utf8"));
let propozycjekanal = JSON.parse(fs.readFileSync('./chaneltopropozycje.json',"utf8"));  
 // creates an arraylist containing phrases you want your bot to switch through.


  const Dlugip = 1


client.on("ready", () =>{
  console.log(`Zaktywowałem bota ${client.user.tag}!`)
 // console.log(client.user)



 const activities_list = [
  "Najlepszy 4FUN bot", 
  "Jestem na " + client.guilds.cache.size + " serwerach",
  
  ];

  setInterval(() => {
      const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
      client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
  }, 5000); // Runs this every 10 seconds.


});



client.once('reconnecting', () => {
 console.log('Reconnecting!');
});
client.once('disconnect', () => {
 console.log('Disconnect!');
});
// Turn bot off (destroy), then turn it back on

command(client, 'ustawienia', (message) => {
  const { msg, member, mentions, guild } = message
  const args = message.content.slice(prefix.length).trim().split(/ +/);

  var pierwszaSpacja = message.content.indexOf(" ",);
  var  drugaSpacja = message.content.indexOf(" ", pierwszaSpacja+1);
  var trzeciaSpacja = message.content.indexOf(" ", drugaSpacja+1)
if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("Nie masz uprawnień `ADMINISTRATOR`")
if(message.content == `${prefix}ustawienia`){
const Ustawienia = new Discord.MessageEmbed()
.setTitle("Ustawienia")
.addField('Mute', `Użycie ${prefix}ustawienia mute`)
.addField('Weryfikacja', `Użycie ${prefix}ustawienia weryfikacja`)
.addField(`Propozycje`, `Użycie ${prefix}ustawienia propozycje`)
.addField(`Powitanie`, `Użycie ${prefix}powitanie`)
.addField(`Pożegnanie`, `Użycie ${prefix}pożegnanie`)
message.channel.send(Ustawienia)
}

if(message.content.slice(0, prefix.length + 15) == `${prefix}ustawienia mute`){
  const text = drugaSpacja
  if(text < 0 ) return message.reply("Nie oznaczyłeś roli mute")
  console.log(text)
  message.channel.send(`Ustawiłem role na: \n`+ message.content.slice(text) )
ustawieniamuterole[guild.id] = {ustawieniamuterole: `${message.content.slice(text).replace("<","").replace(">","").replace("@&","")}`}
 fs.writeFile('./muterole.json', JSON.stringify(ustawieniamuterole), function(err, result) {
  if(err) console.log('error', err);
})
}
if(message.content.slice(0, prefix.length + 22) == `${prefix}ustawienia weryfikacja`){
  const ustawieniaeryfikacji = new Discord.MessageEmbed()
  .setTitle("Ustawienia")
  if(!weryfikacjakanal[guild.id]){
    ustawieniaeryfikacji.addField("Kanał", `Nie ustawiono`)
  }else{
    ustawieniaeryfikacji.addField("Kanał", `<#${weryfikacjakanal[guild.id].weryfikacjakanal.replace(" ","")}>`)
  }
  if(!weryfikacjarola[guild.id]){
    ustawieniaeryfikacji.addField("Rola", `Nie ustawiono`)
  }else{
    ustawieniaeryfikacji.addField("Rola", `<@&${weryfikacjarola[guild.id].weryfikacjarola}>`)
  }


if(message.content.slice(0, prefix.length + 28) == `${prefix}ustawienia weryfikacja kanal`){
  const text = trzeciaSpacja
  if(text < 0 ) return message.reply("Nie oznaczyłeś kanału")
  message.channel.send(`Ustawiłem kanał na ${message.content.slice(text)}`)
  weryfikacjakanal[guild.id] = {weryfikacjakanal: `${message.content.slice(text).replace("<","").replace(">","").replace("#","").replace(" ","")}`}
  fs.writeFile('./veryficationchanel.json', JSON.stringify(weryfikacjakanal), function(err, result) {
   if(err) console.log('error', err);
 })
}else{
  if(message.content.slice(0, prefix.length + 27) == `${prefix}ustawienia weryfikacja rola`){
    const text = trzeciaSpacja
    if(text < 0 ) return message.reply("Nie oznaczyłeś roli")
    message.channel.send(`Ustawiłem role na ${message.content.slice(text)}`)
    weryfikacjarola[guild.id] = {weryfikacjarola: `${message.content.slice(text).replace("<","").replace(">","").replace("@&","").replace(" ","")}`}
    fs.writeFile('./veryficationrole.json', JSON.stringify(weryfikacjarola), function(err, result) {
     if(err) console.log('error', err);
    })
  }else{
  message.channel.send(ustawieniaeryfikacji)
}
}
}

if(message.content.slice(0, prefix.length + 21) == `${prefix}ustawienia propozycje`){
  if(message.content.slice(0, prefix.length + 25) == `${prefix}ustawienia propozycje set`){
    const text = trzeciaSpacja
    if(text < 0 ) return message.reply("Nie zahasztagowałeś kanału")
    message.channel.send(`Ustawiłem kanał na ${message.content.slice(text)}`)
    propozycjekanal[guild.id] = {propozycjekanal: `${message.content.slice(text).replace("<","").replace(">","").replace("#","").replace(" ","")}`}
    fs.writeFile('./chaneltopropozycje.json', JSON.stringify(propozycjekanal), function(err, result) {
     if(err) console.log('error', err);
    })
  }else{
    
    const propozycjamessageustawinia = new Discord.MessageEmbed()
    .setTitle("Ustawienia")
    if(!propozycjekanal[guild.id]){
      propozycjamessageustawinia.addField("Kanał", `Nie ustawiono`)
    }else{
      propozycjamessageustawinia.addField("Kanał", `<@&${propozycjekanal[guild.id].propozycjekanal}>`)
    }
    message.channel.send(propozycjamessageustawinia)
  }

}


})


command(client, 'powitanie', (message) => {
  const { msg, member, mentions, guild } = message
  
 
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  
  var pierwszaSpacja = message.content.indexOf(" ",);
  var  drugaSpacja = message.content.indexOf(" ", pierwszaSpacja+1);
  var trzeciaSpacja = message.content.indexOf(" ", drugaSpacja+1)
if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("Nie masz uprawnień `ADMINISTRATOR`")
  if(!colorpowitanie[guild.id]) { colorpowitanie[guild.id] = {colorpowitanie: '#a2ff00'}
    fs.writeFile('./welcomecolor.json', JSON.stringify(powitanie), function(err, result) {
    if(err) console.log('error', err);
  })
}
  if(!powitanie[guild.id]) { powitanie[guild.id] = {powitanie: 'Witaj %Osoba'}
  fs.writeFile('./welcomemessages.json', JSON.stringify(powitanie), function(err, result) {
    if(err) console.log('error', err);
  })

  }
  if(message.content == `${prefix}powitanie`){

    const Domyslny = new Discord.MessageEmbed()
    .setColor(colorpowitanie[guild.id].colorpowitanie)
    .setTitle("Powitanie")
    .addField(`${prefix}powitanie set`, 'Ustawia powitanie po set, Aby oznaczyć osoba dodaj %Osoba  a żeby pokazać ilość osób na serwerze dodaj %Ilosc')
    .addField(`${prefix}powitanie color`, 'Ustawia Kolor powitania po color')
    .addField(`${prefix}powitanie kanal`, `Ustawia kanał powitania po kanal, Aby poprawnie dodać kanał zahasztaguj dany kanał`)
    .addField(`Aktualne Powitanie`, powitanie[guild.id].powitanie)
    .addField('Aktualny Kolor', colorpowitanie[guild.id].colorpowitanie + `    Kolor tej wiadomość obrazuje kolor wiadomości powitalnej` )

    if(!powitaniekanal[guild.id]) {
      Domyslny.addField(`Aktualny Kanał`, `Nie ustawiony` )
    }else{
      Domyslny.addField(`Aktualny Kanał`, `<#${powitaniekanal[guild.id].powitaniekanal.replace(" ", "")}>` )
    }

    message.channel.send(Domyslny)
  }
if(message.content.slice(0, prefix.length + 13) == `${prefix}powitanie set`){
const text = drugaSpacja
console.log(text)
if(text < 0 ) return message.reply("Nie podałeś wiadomości powitania")
if(text > 0 ) {
message.channel.send(`Ustawiłem powitanie o treści: \n`+ message.content.slice(text) )
powitanie[guild.id] = {powitanie: `${message.content.slice(text)}`}
 fs.writeFile('./welcomemessages.json', JSON.stringify(powitanie), function(err, result) {
  if(err) console.log('error', err);
})
}
}
if(message.content.slice(0, prefix.length + 15) == `${prefix}powitanie kanal`){
  const text = drugaSpacja
  if(text < 0 ) return message.reply("Nie podałeś kanału")
  powitaniekanal[guild.id] = {powitaniekanal: `${message.content.slice(text).replace("<", "").replace(">","").replace("#","").replace(" ","")}`}
  fs.writeFile('./welcomechanel.json', JSON.stringify(powitaniekanal), function(err, result) {
    if(err) console.log('error', err);
  })

  message.channel.send('Kanał powitani ustawion na' + message.content.slice(text))
}
if(message.content.slice(0, prefix.length + 15) == `${prefix}powitanie color`){
const text = drugaSpacja
if(text < 0 ) return message.reply("Nie podałeś koloru")
colorpowitanie[guild.id] = {colorpowitanie: `${message.content.slice(text)}`}
  fs.writeFile('./welcomecolor.json', JSON.stringify(colorpowitanie), function(err, result) {
    if(err) console.log('error', err);
  })

  message.channel.send('Kolor powitani ustawion na' + message.content.slice(text))
  const color = new Discord.MessageEmbed()
  .setColor(colorpowitanie[guild.id].colorpowitanie)
message.channel.send(color)
}
})

command(client, 'pożegnanie', (message) => {
  const { msg, member, mentions, guild } = message
  
 
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  
  var pierwszaSpacja = message.content.indexOf(" ",);
  var  drugaSpacja = message.content.indexOf(" ", pierwszaSpacja+1);
  var trzeciaSpacja = message.content.indexOf(" ", drugaSpacja+1)
if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("Nie masz uprawnień `ADMINISTRATOR`")
  if(!pożegnaniekolor[guild.id]) { pożegnaniekolor[guild.id] = {pożegnaniekolor: '#ff0000'}
    fs.writeFile('./goodbyecolor.json', JSON.stringify(pożegnaniekolor), function(err, result) {
    if(err) console.log('error', err);
  })
}
  if(!pożegnanie[guild.id]) { pożegnanie[guild.id] = {pożegnanie: 'Żegnaj %Osoba'}
  fs.writeFile('./goodbye.json', JSON.stringify(pożegnanie), function(err, result) {
    if(err) console.log('error', err);
  })

  }
  if(message.content == `${prefix}pożegnanie`){

    const Domyslny = new Discord.MessageEmbed()
    .setColor(pożegnaniekolor[guild.id].pożegnaniekolor)
    .setTitle("Pożegnanie")
    .addField(`${prefix}pożegnanie set`, 'Ustawia powitanie po set, Aby oznaczyć osoba dodaj %Osoba  a żeby pokazać ilość osób na serwerze dodaj %Ilosc')
    .addField(`${prefix}pożegnanie color`, 'Ustawia Kolor pożegnani po color')
    .addField(`${prefix}pożegnanie kanal`, `Ustawia kanał pożegnani po kanal, Aby poprawnie dodać kanał zahasztaguj dany kanał`)
    .addField(`Aktualne Pożegnanie`, pożegnanie[guild.id].pożegnanie)
    .addField('Aktualny Kolor', pożegnaniekolor[guild.id].pożegnaniekolor + `    Kolor tej wiadomość obrazuje kolor wiadomości pożegnalnej` )

    if(!pożegnaniekanal[guild.id]) {
      Domyslny.addField(`Aktualny Kanał`, `Nie ustawiony` )
    }else{
      Domyslny.addField(`Aktualny Kanał`, `<#${pożegnaniekanal[guild.id].pożegnaniekanal.replace(" ", "")}>` )
    }

    message.channel.send(Domyslny)
  }
if(message.content.slice(0, prefix.length + 14) == `${prefix}pożegnanie set`){
const text = drugaSpacja
console.log(text)
if(text < 0 ) return message.reply("Nie podałeś wiadomości pożegnania")
if(text > 0 ) {
message.channel.send(`Ustawiłem powitanie o treści: \n`+ message.content.slice(text) )
pożegnanie[guild.id] = {pożegnanie: `${message.content.slice(text)}`}
 fs.writeFile('./goodbye.json', JSON.stringify(pożegnanie), function(err, result) {
  if(err) console.log('error', err);
})
}
}
if(message.content.slice(0, prefix.length + 16) == `${prefix}pożegnanie kanal`){
  const text = drugaSpacja
  if(text < 0 ) return message.reply("Nie podałeś kanału")
  pożegnaniekanal[guild.id] = {pożegnaniekanal: `${message.content.slice(text).replace("<", "").replace(">","").replace("#","").replace(" ","")}`}
  fs.writeFile('./goodbyechanel.json', JSON.stringify(pożegnaniekanal), function(err, result) {
    if(err) console.log('error', err);
  })

  message.channel.send('Kanał pożegnani ustawion na' + message.content.slice(text))
}
if(message.content.slice(0, prefix.length + 16) == `${prefix}pożegnanie color`){
const text = drugaSpacja
if(text < 0 ) return message.reply("Nie podałeś koloru")
pożegnaniekolor[guild.id] = {pożegnaniekolor: `${message.content.slice(text)}`}
  fs.writeFile('./goodbyecolor.json', JSON.stringify(pożegnaniekolor), function(err, result) {
    if(err) console.log('error', err);
  })

  message.channel.send('Kolor pożegnani ustawion na' + message.content.slice(text))
  const color = new Discord.MessageEmbed()
    .setColor(pożegnaniekolor[guild.id].pożegnaniekolor)
  message.channel.send(color)
}
})

client.on('guildMemberRemove', guildMember => {
  const { member, mentions, guild } = guildMember
  if(!pożegnaniekanal[guild.id]) return

    const kanalsend = `${pożegnaniekanal[guild.id].pożegnaniekanal}`.replace(" ", "")
    const nowy = guildMember.id
    const welcomemessage = pożegnanie[guild.id].pożegnanie
  

  
  console.log("Witaj Nowy")
  let myGuild = client.guilds.cache.get("794365821719281704");
  let memberCount = guildMember.guild.memberCount; 
  const Żegnaj = welcomemessage.replace("%Osoba", `<@${nowy}>`).replace("%Ilosc", `${memberCount}`)
  const clear = new Discord.MessageEmbed()
      .setTitle("Żegnaj")  
      .setDescription(Żegnaj)
      .setColor(pożegnaniekolor[guild.id].pożegnaniekolor)

  client.channels.cache.get(kanalsend).send(clear)
  guildMember.roles.add("788331452492283904")
  guildMember.roles.add("786863157314191390")
  guildMember.roles.add("788331592791490620")
  guildMember.roles.add("788335878388580362")
  guildMember.roles.add("788331914846142494")



})
client.on('guildMemberAdd', guildMember => {
  if(!powitaniekanal[guild.id]) return
  

  const { member, mentions, guild } = guildMember
  const kanalsend = `${powitaniekanal[guild.id].powitaniekanal}`.replace(" ", "")
  const nowy = guildMember.id
  const welcomemessage = powitanie[guild.id].powitanie
  
  console.log("Witaj Nowy")
  let myGuild = client.guilds.cache.get("794365821719281704");
  let memberCount = guildMember.guild.memberCount; 
  const witaj = welcomemessage.replace("%Osoba", `<@${nowy}>`).replace("%Ilosc", `${memberCount}`)
  const clear = new Discord.MessageEmbed()
      .setTitle("Witaj")  
      .setDescription(witaj)
      .setColor(colorpowitanie[guild.id].colorpowitanie)

  client.channels.cache.get(kanalsend).send(clear)
  guildMember.roles.add("788331452492283904")
  guildMember.roles.add("786863157314191390")
  guildMember.roles.add("788331592791490620")
  guildMember.roles.add("788335878388580362")
  guildMember.roles.add("788331914846142494")




});

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const serverQueue = queue.get(message.guild.id);

  if (message.content.startsWith(`${prefix}play`)) {
    execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}skip`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}stop`)) {
    stop(message, serverQueue);
    return;
  } else {
  }
});

async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "Nie jesteś na żadnym kanale"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "Sory nie mam permisji"
    );
  }

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
   };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`${song.title} został dodany do kolejki`);
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "Nie możesz wyłaczyć muzyki!"
    );
  if (!serverQueue)
    return message.channel.send("Nie ma dalej piosenek");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "Nie możesz wyłaczyć muzyki!"
    );
    
  if (!serverQueue)
    return message.channel.send("Muzyka nie jest grana");
    
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Puszczam: **${song.title}**`);
}

command(client, 'logo', (message) => {
  message.delete()
  const logo = 'https://i.ibb.co/GQh8Kzk/logo-granko.png'
  const logoembed = new Discord.MessageEmbed()
  .setImage(logo) 
  .setTitle("Logo Serwera Granko")
  .setDescription("Autor loga: <@440099311146237953> ")
  message.channel.send(logoembed)

});

command(client, 'odbierz', (message) => {
  const { member, channel, content, mentions, guild, id } = message
  const tag = `<@${member.id}>`
  const target = message.mentions.members.first();
  const  pierwsza = message.content.indexOf("&", )+1;
  const druga = message.content.indexOf(">",pierwsza+1);
  const rola = (message.content.slice(pierwsza,druga))
  let kupa = message.guild.roles.cache.get("788333577376104468");
  let good = message.guild.roles.cache.get("788333577376104468");
  
  if(message.member.hasPermission("MANAGE_ROLES")) {
    if(!target) return message.reply("Oznacz osobę")
   
    target.roles.remove(rola)
    message.channel.send(`Ranga <@&${rola}> odbrana dla <@${target.id}>`)
  }else{
    message.channel.send("nie masz permisji ")
  }  
})





command(client, 'nadaj', (message) => {
  const { member, channel, content, mentions, guild, id } = message
  const tag = `<@${member.id}>`
  const target = message.mentions.members.first();
  const  pierwsza = message.content.indexOf("&", )+1;
  const druga = message.content.indexOf(">",pierwsza+1);
  const rola = (message.content.slice(pierwsza,druga))
  let kupa = message.guild.roles.cache.get("788333577376104468");
  let good = message.guild.roles.cache.get("788333577376104468");
  if(message.member.hasPermission("MANAGE_ROLES")) {
    if(!target) return message.reply("Oznacz osobę")
    
    target.roles.add(rola)
    message.channel.send(`Ranga <@&${rola}> nadana dla <@${target.id}>`)
  }else{
    message.channel.send("nie masz permisji ")
  }  
})


command(client, 'clear', (message) => {
  if(message.member.hasPermission("MANAGE_MESSAGES")) {

    message.channel.bulkDelete(message.content.slice(Dlugip + 5),true).then(msg=>{
      const clear = new Discord.MessageEmbed()
      
      .setTitle("Clear")
      .setDescription(`Usunąłem ${msg.size} wiadomość`)
      .setColor('00ff22')
      console.log(`Usunąłem ${msg.size} wiadomość!`)
      message.channel.send(clear)
      setTimeout(function(){ 
        message.channel.bulkDelete(1,true)
       }, 2000);
      })

  }else{ 
    message.delete()
    message.channel.send("Brak uprawnień")
  }
    })




command(client, 'zakup', (message) => {
  if(message.channel.id === '801353732268097576'){ 
  const { member, channel, content, mentions, guild, id } = message
  const tag = `<@${member.id}>`
var pierwszaSpacja = message.content.indexOf(" ",);
 var  drugaSpacja = message.content.indexOf(" ", pierwszaSpacja+1);
 var trzeciaSpacja = message.content.indexOf(" ", drugaSpacja+1);
 const Zakuptypka = new Discord.MessageEmbed()
 .setTitle("Zakup")
 .setColor("#00ff22")
 .setDescription(`Użytkownik o imnieniu ${tag} chce zakupić usługę**` + message.content.slice(pierwszaSpacja, drugaSpacja) + `**. \nJego kod psc/email/kontakt to**` + message.content.slice(drugaSpacja,trzeciaSpacja) +`** Nick tego użytkownika to **`+ message.content.slice(trzeciaSpacja) +`**`)
var kanał = client.channels.cache.get('801353918066982922');
 kanał.send(Zakuptypka)
 message.delete()
  }else{
    message.delete()
    const Nietu = new Discord.MessageEmbed()
    .setTitle("Zakup")
    .setDescription("Nie tu wysyłasz wiadomość")
    .setColor("#fc0303")

    message.channel.send(Nietu)
    setTimeout(function(){ 
      message.channel.bulkDelete(1,true)
     }, 2000);
  }
})

command(client, 'embed', (message) => {
  //strefa stałych
  const { member, channel, content, mentions, guild, id } = message
  const tag = `<@${member.id}>`
  let Graczrole = message.guild.roles.cache.find(role => role.id === "787337351541162024");
  let targetMember = guild.members.cache.get(id);
 //strefa embed
 var pierwszaSpacja = message.content.indexOf(" ",);
 var  drugaSpacja = message.content.indexOf(" ", pierwszaSpacja+1);
 var trzeciaSpacja = message.content.indexOf(" ", drugaSpacja+1);

 const EmbedBuilder = new Discord.MessageEmbed()
 .setTitle(message.content.slice(pierwszaSpacja, drugaSpacja))
 .setDescription(message.content.slice(trzeciaSpacja))
 .setColor(message.content.slice(drugaSpacja, trzeciaSpacja))

 //strefa if
 message.delete()

if(pierwszaSpacja > 0) {
  if(drugaSpacja > 0){
    if(trzeciaSpacja > 0){
      message.channel.send(EmbedBuilder)
    }else{
      message.channel.send("Podaj Opis")
      setTimeout(function(){ 
        message.channel.bulkDelete(1,true)
       }, 2000);
    }
  }else{
    message.channel.send("Podaj Kolor")
    setTimeout(function(){ 
      message.channel.bulkDelete(1,true)
     }, 2000);
  }
}else{
  message.channel.send("Podaj Tytuł")
  setTimeout(function(){ 
    message.channel.bulkDelete(1,true)
   }, 2000);
}
})

command(client, 'weryfikacja', (message) => {

  const { member, channel, content, mentions, guild, id } = message
  const tag = `<@${member.id}>`
  const veryficationkanal = client.channels.cache.get(weryfikacjakanal[guild.id].weryfikacjakanal.replace(" ",""))
  let Graczrole = message.guild.roles.cache.find(role => role.id === weryfikacjarola[guild.id].weryfikacjarola.replace(" ",""));
  let targetMember = guild.members.cache.get(id);
  //console.log(targetMember);
  if(!weryfikacjakanal[guild.id]) return message.reply("Ta funkcja nie została zkonfigurowana")
  if(!weryfikacjarola[guild.id]) return message.reply("Ta funkcja nie została zkonfigurowana")
  if(message.channel == veryficationkanal){
  let object = Math.floor(Math.random(300, 9000) * 100000000000);
  let embedr = new Discord.MessageEmbed()
  .setTitle("Weryfikacja")
  .setDescription('Przepisz tą wiadomość "`' + object +'`" \nUważaj bo jak się pomylisz to odnowa ;)')
  .setColor("#00ff22")
  message.channel.send(embedr)
  message.delete()
  setTimeout(function(){ 
  message.channel.awaitMessages(m => m.author.id == message.author.id,
    {max: 1, time: 15000}).then(collected => {
            // only accept messages by the user who sent the command
            // accept only 1 message, and return the promise after 30000ms = 30s
  
            // first (and, in this case, only) message of the collection
             if(collected.first().content.toLowerCase() == object) {
              let embedp = new Discord.MessageEmbed()
              .setTitle("Weryfikacja")
              .setDescription("Zostałeś zweryfikowany. \nZa chwile wyświętlą ci się kanały")
              .setColor("#00ff22")
              message.channel.send(embedp)

              setTimeout(function(){ 
              member.roles.add(Graczrole)
              message.channel.bulkDelete(3,true)
             }, 2000);

            } else {
              let embedl = new Discord.MessageEmbed()
              .setTitle("Weryfikacja")
              .setDescription("Weryfikacja nie powiodła się \nSpróbuj od nowa komendą `s!weryfikacja`")
              .setColor("#fc0303")
              message.channel.send(embedl)
              setTimeout(function(){ 
                message.channel.bulkDelete(3,true)
               }, 2000);
            }
 }, 10000)
})
}
});
command(client, 'zasady', (message) => {
  const { member, mentions } = message
  const tag = `<@${member.id}>`
  const perm = new Discord.MessageEmbed()
  .setTitle("Zasady")
  .setDescription("Nie masz do tego permisji")
  .setColor(10038562)
  .setTimestamp()
  const zasadyminecraft = new Discord.MessageEmbed()
  .setTitle("Zasady  Minecraft")
  .setDescription("**BedWars** \n:nie:**1.**Zabronione jest Przeklinanie na chat _(mute 10 Minut)_ \n**2.**Reklamowanie Innych serwerów Zabronione bez pisemnej zgody właścicieli organizacji solmc  _(PermBan)_ \n**3.**Wysyłanie Linków Zabronione _(Permban)_ \n**4.**Grożenie komuś zabronione _(permBanIP)_ \n**5.**Szantażowanie kogoś zabronione _(PermBanip)_ \n**6.**Korzystanie z bugów serwera zabronione _(Tempban 10 dni)_ \n**7.**Wyzywanie graczy zabronione _(mute 20 minut)_ \n**8.**Wyzywanie Administracji _(ban na zawsze)_ \n**9.**Zakaz używania cheatów oraz modyfikacji na serwerze _(ban 14 dni)_ (Oftifine BlazingPack minimap Dozwolone) \n**10.**Zakaz Spamowanie na Chat _(mute 5 minut)_ \n**11.**Zakaz nadużywania dużych liter (Caps Lock) _(mute 5 minut)_ \n \n**MegaDrop** \n**1.**Zabronione jest Przeklinanie na chat _(mute 5 Minut)_ \n**2.**Reklamowanie Innych serwerów Zabronione pisemnej zgody właścicieli organizacji solmc _(PermBan)_ \n**3.**Wysyłanie Linków Zabronione _(Permban)_ \n**4.**Grożenie Komuś zabronione _(permBanIP)_ \n**5.**Szantażowanie kogoś zabronione _(PermBanip)_ \n**6.**Korzystanie z bugów serwera zabronione _(Tempban 5 dni)_ \n**7.**Wyzywanie graczy zabronione _(mute 15 minut)_ \n**8.**Wyzywanie Administracji _(ban na zawsze)_ \n**9.**Zakaz używania cheatów oraz modyfikacji na serwerze _(ban 10 dni)_ (Oftifine BlazingPack minimap Dozwolone) \n**10.**Zakaz Spamowanie na Chat _(mute 5 minut)_ \n**11.**Zakaz nadużywania dużych liter (Caps Lock) _(mute 5 minut)_ \n**12.**Zakaz proszenia Administracji o itemy _(warn)_")
  .setColor(10038562)
  .setThumbnail("https://i.ibb.co/4Yy4xnJ/1.png")
  .setImage("https://cdn.discordapp.com/attachments/790525915200880650/790653242664943686/gd.gif")
  .setTimestamp()
  const zasadydiscord = new Discord.MessageEmbed()
  .setTitle("Zasady  Discord")
  .setDescription("**Tekstowe** \n **1.**Zakazane jest spamowanie i floodowanie.  _(10 minut Mute)_ \n**2.**Zabrania się pisania wielkimi literami. (CapsLock) _(10 minut Mute)_ \n**3.**Zakaz używania wulgaryzmów na kanałach tekstowych a także głosowych. _(mute 1h)_ \n**4.**Zakazane jest prowokowanie kłótni, dyskusji które mają negatywny wpływ na serwer. _(mute 20 minut)_ \n**5.**Zakaz wykorzystywania, oszukiwania i szantażowania innych użytkowników. _(ban)_ \n**6.**Reklamowanie jakichkolwiek serwerów zewnętrznych: gier, stron www, serwerów discord itp. bez pisemnej zgody właścicieli organizacji solmc _(ban)_ \n**7.**Podszywanie się pod graczy będzie karane kickiem, następnie banem. Podszywanie się pod administrację będzie skutkowało natychmiastowym banem. \n**9.**Zabronione jest wysyłanie linków lub plików zawierających jakiekolwiek treści wulgarne/rasistowskie/pornograficzne/religijne itp. oraz plików szkodliwych (wirusy). _(ban)_ \n**10.**Awatar  nie może zawierać treści obraźliwych/rasistowskich/wulgarnych itp _(ban aż avatar nie zostanie zmieniony)_ \n**11.**Status nie może zawierać treści Obraźliwych/rasitowskich/wulgarnych itp _(ban aż status nie zostanie zmieniony)_ \n \n**Głosowe** \n**1.**Wszystkie zasady kanałów tekstowych obowiązują także w głosowych. \n**2.**Zakaz krzyczenia i mocnego podnoszenia głosu. _(mute na kanałach glosowych 10 minut)_ \n**3.**Zakazane jest puszczanie do mikrofonu muzyki itp. _(mute na kanałach glosowych 10 minut)_")
  .setColor(10038562)
  .setThumbnail("https://i.ibb.co/4Yy4xnJ/1.png")
  .setImage("https://cdn.discordapp.com/attachments/732501123520528444/794234666722000936/fsa.gif")
  .setTimestamp()
  if(member.hasPermission('ADMINISTRATOR')) {
    message.delete()
    message.channel.send(zasadyminecraft)
    message.channel.send(zasadydiscord)
  }else{
    message.delete()
    message.member.send(zasadyminecraft)
    message.member.send(zasadydiscord)
    .catch(console.error);  
  
  } 

});
  
command(client, 'mute', async (message) => {
  const { member, mentions, guild } = message
  const tag = `<@${member.id}>`
  const muterole = ustawieniamuterole[guild.id].ustawieniamuterole.replace(" ", "")
  var pierwszaSpacja = message.content.indexOf(" ",);
  var  drugaSpacja = message.content.indexOf(" ", pierwszaSpacja+1);
  const powod = message.content.slice(drugaSpacja).replace(" ","")
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const target = message.mentions.members.first();
  const mentiontarget = `${target}`
  if(!target) return message.channel.send("Kogo mam wyciszyć?")
  if(!powod) return message.channel.send("Jaki jest tego powód?")
  const mute = new Discord.MessageEmbed()
  .setTitle("MUTE")
  .addField(`Użytkowink:`, mentiontarget, true)
  .addField(`Przez:`,tag, true)
  .addField(`Powód:`, powod)
  .setFooter(`Chcesz unmute? Napisz do administracji!`)
  message.channel.send(mute)
  target.roles.add(muterole)

})

command(client, 'unwarn', (message) =>{
  const { member, mentions } = message
  const tag = `<@${member.id}>`
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    if(!message.member.hasPermission(`MANAGE_MESSAGES`)) return message.reply(`Nie masz permisji`);
    var user = message.mentions.users.first();
    if(!user) return message.reply(`Oznacz osobę`);

    if(warns[user.id].warns == 0){
      message.reply(`ej <@${user.id}> ma już ma 0 warnów`)
    }else{
    warns[user.id].warns--;

    fs.writeFile('./warndata.json', JSON.stringify(warns), function(err, result) {
      if(err) console.log('error', err);
    });
    message.reply(`<@${user.id}> ma teraz ${warns[user.id].warns} warnów`)
  }

})
command(client, 'warn', (message) =>{
  const { member, mentions } = message
  const tag = `<@${member.id}>`
    const args = message.content.slice(prefix.length).trim().split(/ +/);
  if(!message.member.hasPermission(`MANAGE_MESSAGES`)) return message.reply(`Nie masz permisji`);

    var user = message.mentions.users.first();
    if(!user) return message.reply(`Oznacz osobę`);

    var pierwszaSpacja = message.content.indexOf(" ",);
    var  drugaSpacja = message.content.indexOf(" ", pierwszaSpacja+1);
    if(drugaSpacja < 0) return message.reply(`Podaj powód`);


    if(!warns[user.id]) { warns[user.id] = {warns: 0 }
      warns[user.id].warns++;

    fs.writeFile('./warndata.json', JSON.stringify(warns), function(err, result) {
      if(err) console.log('error', err);
    });
}else{
  warns[user.id].warns++;
  fs.writeFile('./warndata.json', JSON.stringify(warns), function(err, result) {
    if(err) console.log('error', err);
  });
}
    var log = new Discord.MessageEmbed()
    .setTitle(`Warn`)
    .setColor(10038562)
    .addField(`Użytkowink:`, user, true)
    .addField(`Przez:`,tag, true)
    .addField(`Powód:`, message.content.slice(drugaSpacja,))
    .addField(`Ilość Warnów:`, warns[user.id].warns)
    message.channel.send(log);

    var embed = new Discord.MessageEmbed()
    .setTitle(`Warn`)
    .setColor(10038562)
    .setDescription("Powód ostrzeżenia to: **"+message.content.slice(drugaSpacja,) + "**");

    try {
        user.send(embed);
    } catch(err) {
        console.warn(err);
    }

    message.channel.send(`**${user}** został ostrzeżony przez **${tag}**!`);




})


command(client, 'avatar', (message) => {
      
        
  if(message.mentions.users.size){
    let member=message.mentions.users.first()
if(member){
    const av = new Discord.MessageEmbed().
    setImage(member.displayAvatarURL())
    .setTitle("Avatar")
    .setDescription("Proszę o to zdjęcie profilowe użytkownika **"+ member.username +"**. \nCiekawe co z nim zrobisz?")
    .setColor("0033ff")
    message.channel.send(av)
    
}
else{
    message.channel.send("Sora nie znalazłem tej osóbki")

}
}else{
    message.channel.send(av)
}
})

for(const file of commandfiles){
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

client.on("message", async message =>{
  var pierwszaSpacja = message.content.indexOf(" ",);
  var  drugaSpacja = message.content.indexOf(" ", pierwszaSpacja+1);
  const { member, mentions, guild } = message
  const tag = `${member}`
  const prefix = config.prefix;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  console.log(`Użytkownik: ${member} Napisał: ${message.content.slice(0)}`)
  if(message.channel.id === '788341215984222219'){
    if(message.author.id === "794363844998332417") return
    message.delete()
    const Propozycja = new Discord.MessageEmbed()
    .setTitle(`Propozycje`)
    .setDescription(`Propozycja od ${tag}: ${message.content.slice(0).replace(".","")}`)
    .setColor("#32a83e")

    message.channel.send(Propozycja)

    setTimeout(function(){ 
const kanal =  client.channels.cache.get(propozycjekanal[guild.id].propozycjekanal)
    kanal.messages.fetch({ limit: 2 }).then(messages => { var lastMessage = messages.first();
      lastMessage.react("❎")
      lastMessage.react("✅")
      
     })
    
    }, 10);

  }


  if(message.mentions.has(client.user)) {
    const mentioned = new Discord.MessageEmbed()
.setTitle(`Wykryłem Ping`)
.setDescription(`Prefix: **`+ config.prefix +`** \nAutor: **arturm#9450** \nPrzydatne komendy pod:** `+config.prefix+`pomoc**`)
.setColor(10038562)
.setTimestamp()
    message.member.send(mentioned)
  }
  if(message.content.startsWith('wal sie') || message.content.startsWith('kurwa') || message.content.startsWith('kurw') || message.content.startsWith('fuck') || message.content.startsWith('spier') || message.content.startsWith('spierdalaj') || message.content.startsWith('jpr') || message.content.startsWith('pierdole') || message.content.startsWith('pierdol') ){ 
    message.delete(
    message.reply("Tak nie wolno")
    )
  }
if(message.channel.id === '801012718370029608'){
  message.react("👍")
  const informacjaOserwerze = new Discord.MessageEmbed()
  .setTitle("NICK")
  .setColor(5313)
  .setDescription(`Witaj ${tag} twój nick **`+message.content.slice(0) + `** został pomyślnie zajerestowany! \nChcesz już wejść na serwer? O to informacje \nWersja: **1.16.3** \nIp: **granko.ggs.onl** \nTryb: **Survival**`)
  message.member.setNickname(message.content.slice(0))
  message.member.send(informacjaOserwerze)
}

  
  if(!client.commands.has(command)){

    return
   }try{
    client.commands.get(command).execute(message, args);
  }catch(error){
    console.error(error);
    message.reply('Nie wiem co zrobić')
  }
  //if(!message.content.startWith(prefix) || message.author.bot) return;
  //const args = message.content.slice(prefix.length).trim().split(' ');
  if(message.channel.id === '801353732268097576'){
  if(message.content.startsWith('.zakup')){ 
  } else{
    message.delete()
  }
  }
});


command(client, 'cichysend', (message)=> {
  const { member, mentions } = message
  const tag = `<@${member.id}>`
  const target = mentions.users.first()
  var pierwszaSpacja = message.content.indexOf(" ",);
  var  drugaSpacja = message.content.indexOf(" ", pierwszaSpacja+1);
    const wiadomość = message.content.slice(drugaSpacja)
    const embedwiadomosc = new Discord.MessageEmbed()
    .setTitle("Wiadomość")
    .setColor(92777)
    .setDescription(`Użytkownik który chce być anonimowy wysyła do ciebie wiadomość o treści: \n${wiadomość}`)
    target.send(embedwiadomosc)
message.delete()

})


command(client, 'send', (message)=> {
  const { member, mentions } = message
  const tag = `<@${member.id}>`
  const target = mentions.users.first()
  var pierwszaSpacja = message.content.indexOf(" ",);
  var  drugaSpacja = message.content.indexOf(" ", pierwszaSpacja+1);
  message.delete()
    member.send(`Wysyłam wiadomośc do <@${target.id}>`)
    const wiadomość = message.content.slice(drugaSpacja).replace("<","").replace(">","")
    const embedwiadomosc = new Discord.MessageEmbed()
    .setTitle("Wiadomość")
    .setColor(92777)
    .setDescription(`Użytkownik ${tag} wysyła do ciebie wiadomość o treści: \n${wiadomość}`)
    .setFooter(`Chcesz też wysłać wiadomość do ${message.author.username}? Użyj .send ${tag} <treść twojej wiadomości> `)
    target.send(embedwiadomosc)


})
command(client, 'test', (message)=> {


})
command(client, 'tort', (message) => {
  const { member, mentions } = message

  const tag = `<@${member.id}>`
  message.channel.send({embed: {
    color: 12745742,
    author: {
    },
    title: ":cake:TORT:cake:  ",
    description: `:cake: :cake: :cake: :cake: `,
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
    }
  }
});
});



command(client, 'placek', (message) => {
  const { member, mentions } = message

  const tag = `<@${member.id}>`
  message.channel.send({embed: {
    color: 12745742,
    author: {
    },
    title: ":pancakes: Placek:pancakes: ",
    description: `:pancakes: :pancakes: :pancakes: :pancakes: `,
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
    }
  }
});
});


command(client, 'status reset', (message) => {
  message.delete()
  const { member, mentions } = message
  const tag = `<@${member.id}>`
  const embed2 = new Discord.MessageEmbed()
  .setTitle(`Status`)
  .setDescription(`Zresetowałem status bota`)
  .setColor(10038562)
  .setTimestamp()

  const embed = new Discord.MessageEmbed()
  .setTitle(`Status`)
  .setDescription(`Nie możesz tego zmienić ${tag}`)
  .setColor(10038562)
  .setTimestamp()

  if(message.author.id === "440099311146237953") {
    client.user.setActivity("Wpadaj na solmc.pl", {type: 'PLAYING'})
    message.channel.send(embed2);
  } else {
    if(message.author.id ===  "658434554528530435"){
      client.user.setActivity("Wpadaj na solmc.pl", {type: 'PLAYING'})
      message.channel.send(embed2);
    }else{
    message.channel.send(embed)
  } 
}
});

command(client, 'status playing', (message) => {
  message.delete()
  const { member, mentions } = message
  const tag = `<@${member.id}>`
  const statuts = (message.content.slice(17))
  const embed2 = new Discord.MessageEmbed()
  .setTitle(`Status`)
  .setDescription(`Zmnieniłem status bota na **${statuts}**`)
  .setColor(10038562)
  .setTimestamp()

  const embed = new Discord.MessageEmbed()
  .setTitle(`Status`)
  .setDescription(`Nie możesz tego zmienić ${tag}`)
  .setColor(10038562)
  .setTimestamp()


  if(message.author.id === "440099311146237953") {
    client.user.setActivity((message.content.slice(17)), {type: 'PLAYING'}); 
    message.channel.send(embed2);
  } else {
    if(message.author.id ===  "658434554528530435"){
      client.user.setActivity((message.content.slice(17)), {type: 'PLAYING'}); 
      message.channel.send(embed2);
    }else{
    message.channel.send(embed)
  } 
}
});

command(client, 'status watching', (message) => {
  message.delete()
  const { member, mentions } = message
  const tag = `<@${member.id}>`
  const statuts = (message.content.slice(17))
  const embed2 = new Discord.MessageEmbed()
  .setTitle(`Status`)
  .setDescription(`Zmnieniłem status bota na **${statuts}**`)
  .setColor(10038562)
  .setTimestamp()

  const embed = new Discord.MessageEmbed()
  .setTitle(`Status`)
  .setDescription(`Nie możesz tego zmienić ${tag}`)
  .setColor(10038562)
  .setTimestamp()

  if(message.author.id === "440099311146237953") {
    client.user.setActivity((message.content.slice(17)), {type: 'PLAYING'}); 
    message.channel.send(embed2);
  } else {
    if(message.author.id ===  "658434554528530435"){
      client.user.setActivity((message.content.slice(17)), {type: 'PLAYING'}); 
      message.channel.send(embed2);
    }else{
    message.channel.send(embed)
  } 
}
});

  command(client, 'info', (message) => {
    message.delete()
    channel = client.channels.cache.get('783006441425993770');
    const embed = new Discord.MessageEmbed()
    .setTitle(`INFO`)
    .setDescription("Wysyłam informacje w wiadomości prywatnej")
    .setColor(10038562)
    .setTimestamp()
    message.channel.send(embed);
    message.member.send({embed: {
      color: 2067276,
      author: {
      },
      title: "INFO",
      description: "",
      fields: [{
          name: "Autorzy Bota",
          value: "`arturm#9450`"
        },
        {
          name: "Prefix",
          value: ""+config.prefix +"" 
        },
        {
          name: "Informacje Ogólne",
          value: "Bot Coffee jest botem 4FUN i Moderacjnym. \nZostał stworzony przez `arturm#9450`"
        }
      ],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
      }
    }
  });
    //message.channel.send(`**⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯INFO⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯**`)
    //message.channel.send(`**⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯Autor Bota:@•🎄[ELFIK]🎄•#9866 , @arturm#9450⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯**`)
    //message.channel.send(`**⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯Ip: SolMc.pl⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯**`)
    //message.channel.send(`**⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯Tryb: BedWars⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯**`)
    //message.channel.send(`**⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯Wersja: 1.8.8⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯**`)
    //message.channel.send(`**⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯Status: OFFline⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯**`)
    //message.channel.send(`**⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯Współpraca: Brak⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯**`)
    //message.channel.send(`**⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯INFO⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯**`)
  })

  command(client, 'saym',  (message) =>{ 
    message.delete()
    channel = client.channels.cache.get('783006441425993770');
    const embed = new Discord.MessageEmbed()
    .setDescription(message.content.slice(7))
    .setColor("Blue")
    if(message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embed);
    })


  command(client, 'wazne',  (message) =>{ 
    message.delete()
    channel = client.channels.cache.get('781114242904358932');
    const embed = new Discord.MessageEmbed()
    .setTitle(`Ogłoszenie`)
    .setDescription(message.content.slice(7))
    .setColor(10038562)
    .setTimestamp()
    if(message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embed);
    })
      //});






     
  
  command(client, 'pomoc', (message) => {
    channel = client.channels.cache.get('783006441425993770');
    message.delete()
    const embed = new Discord.MessageEmbed()
    .setTitle(`HELP`)
    .setDescription("Wysyłam pomocnik w wiadomości prywatnej")
    .setColor(10038562)
    .setTimestamp()
    message.channel.send(embed);
    setTimeout(function(){ 
      message.delete()
   }, 5000);

    message.member.send({embed: {
      color: 2067276,
      author: {
      },
      title: "HELP",
      description: "",
      fields: [{
        name: "Prefix",
        value: "Mój prefix na tym serwerze to: **"+ config.prefix + "**"
      },
        {
          name: "Ban",
          value: "Banuje Gracza. Użycie: **"+ config.prefix +"ban @user**"
        },
        {
          name: "Kick",
          value: " Wyrzuca Gracza. Użycie: **"+ config.prefix +"kick @user**"
        },
        {
          name: "Mute",
          value: "Wycisza Gracza. Użycie: **"+ config.prefix +"mute @user czas tryb**"
        },
        {
          name: "Info",
          value: "Informacje o serwer minecraft. Użycie: **"+ config.prefix +"info**"
        },
        {
          name: "Wazne",
          value: "Piszesz jako bot z nagłówkiem Ogłoszenie. Użycie: **"+ config.prefix +"wazne text**"
        },
        {
          name: "Saym",
          value: "Piszesz jako bot tylko że w embed. Użycie: **"+ config.prefix +"saym text**"
        },
        {
          name: "Say",
          value: "Piszesz jako bot. Użycie: **"+ config.prefix +"say text**"
        },
        {
          name: "Tort",
          value: "Daje Tort. Użycie: **"+ config.prefix +"tort**"
        },
        {
          name: "Placek",
          value: "Daje Placka. Użycie: **"+ config.prefix +"placek**"
        },
        {
          name: "Status",
          value: "Zmienia status bota. Użycie: **"+ config.prefix +"status watching/playing text** lub **"+ config.prefix +"status reset**"
        },
        {
          name: "Zasady",
          value: "Wyświetla zasady. Użycie: **"+ config.prefix +"zasady**"
        },
        {
          name: "Avatar",
          value: "Wyświetla avatar użytkownika. Użycie: **"+ config.prefix +"avatar @użytkownik**"
        },
        {
          name: "Clear",
          value: "Usuwa wiadomość. Użycie: **"+ config.prefix +"clear ilosc**"
        },
        {
          name: "Embed",
          value: "Wysyła embed. Użycie: **"+ config.prefix +"embed <tytuł> <kolor w hex> <opis>**"
        },
      ],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
      }
    }
  });
    //message.channel.send(`**⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯HELP⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯**`)
    //message.channel.send(`**⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯Wszystkie Komendy⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯**`)
    //message.channel.send(`⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯**BAN** - Banuje Gracza. Użycie: **ban @user**⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯`)
    //message.channel.send(`⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯**KICK** - Wyrzuca Gracza. Użycie: **kick @user**⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯`)
    //message.channel.send(`⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯**MUTE** - Wycisza Gracza. Użycie: **mute @user czas tryb**⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯`)
    //message.channel.send(`⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯**INFO** - Informacje o serwer minecraft. Użycie: **info**⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯`)
    //message.channel.send(`**⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯HELP⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯**`)
  })

  command(client, 'ban', (message) => {
    channel = client.channels.cache.get('783006441425993770');
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('BAN_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.ban()
        message.channel.send({embed: {
          color: 10038562,
          author: {
          },
          title: "BAN",
          description: `**${targetMember}** został zbanowany przez **${tag}**`,
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
          }
        }
      });
      const ban = new Discord.MessageEmbed()
      .setTitle("Ban")
      .setDescription("Przykro nam że do tego doszło ale zostałeś zbanowany :(")
      .setFooter(`Chcesz unban? Napisz do administracji!`)
      } else {
        message.channel.send({embed: {
          color: 10038562,
          author: {
          },
          title: "BAN",
          description: `Poprawne użycie: _ban @user_ ${tag}`,
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
          }
        }
      });
      }
    } else {
      message.delete()
      message.channel.send("Brak uprawnień")
    }
  })



  command(client, 'kick', (message) => {
    channel = client.channels.cache.get('783006441425993770');
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('KICK_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.kick()
        message.channel.send({embed: {
          color: 10038562,
          author: {
          },
          title: "KICK",
          description: `**${targetMember}** został wyrzucony przez **${tag}**`,
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
          }
        }
      });
      } else {
        message.channel.send({embed: {
          color: 10038562,
          author: {
          },
          title: "KICK",
          description: `Poprawne użycie: _kick @user_ ${tag} `,
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
          }
        }
      })
    }
    } else {
      message.delete()
      message.channel.send("Brak uprawnień")
    };
    })

  command(client, 'say', (message) => {
      message.delete()
      if(message.member.hasPermission("MANAGE_MESSAGES")) {
        message.channel.send(message.content.slice(5))
      }else{ 
        message.channel.send("Brak uprawnień")
      }
    })
    const onJoin = async (member) => {
      const { id, guild } = member
  
      const redisClient = await redis()
      try {
        redisClient.get(`${redisKeyPrefix}${id}-${guild.id}`, (err, result) => {
          if (err) {
            console.error('Redis GET error:', err)
          } else if (result) {
            giveRole(member)
          } else {
            console.log('The user is not muted')
          }
        })
      } finally {
        redisClient.quit()
      }
    }



client.login(config.token)  
