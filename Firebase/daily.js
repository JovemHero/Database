const Discord = require('discord.js');
const ms = require('parse-ms') //lembrando que o parse-ms tem de ser na versão 2.1.0
module.exports = {
  name: 'daily',
  async execute (client, message, args, database) {
  var daily = [
    10,
    30,
    70,
    80,
    100
  ]
  let timeout =	21600000; //1 dia em milisegundos
  let Cooldown = await database.ref(`Cooldown/${message.author.id}`).once('value'); //Diretório do cooldown
    
  if(Cooldown.val().cooldown !== null && timeout - (Date.now() - Cooldown.val().cooldown) > 0) { //se estiver dentro do cooldown
    let time = ms(timeout - (Date.now() - Cooldown.val().cooldown));
    return message.channel.send(`**Você já recebeu seu daily hoje, volte em ${time.days} dias, ${time.hours} hora(s), ${time.minutes} minutos, e ${time.seconds} segundos.**`)
  } else { //caso não estiver no cooldown
    database.ref(`Cooldown/${message.author.id}`).set({cooldown: Date.now()})
 database.ref(`Servidores/Levels/${message.guild.id}/${eu.id}`).update({
    coins: coins1
  });
  database.ref(`Servidores/Levels/${message.guild.id}/${amigo.id}`).update({
    coins: coins2
  });
  let embed = new Discord.MessageEmbed()
  .setColor('#2F3136')
  .setTimestamp()
  .setThumbnail(eu.displayAvatarURL({ size: 1024, format: 'png', dynamic: true }))
  .setTitle('Roubo!')
  .setDescription(`${eu} Roubou **1000 coins** de ${amigo}!`)
  .setFooter(`2021 © ${client.user.username}`)
  message.channel.send(embed);
  }
  },
}
