const Discord = require('discord.js');
const ms = require('parse-ms') //lembrando que o parse-ms tem de ser na versão 2.1.0
module.exports = {
  name: 'daily',
  async execute (client, message, args, database) {
  var getDaily = [
    10,
    30,
    70,
    80,
    100
  ];
  let Daily = getDaily[Math.floor(Math.random() * getDaily.length)]; //random money
  let Timeout =	21600000; //1 dia em milisegundos
  let Cooldown = await database.ref(`Cooldown/${message.author.id}`).once('value'); //Diretório do cooldown
  let Dailyon = await database.ref(`Coins/${message.author.id}`).once('value'); //Diretório do Coin
  
  if(Cooldown.val() == null) {
  database.ref(`Cooldown/${message.author.id}`).set({cooldown: Date.now()})
    
  if(Dailyon.val() == null) {
  database.ref(`Coins/${message.author.id}`).set({coins: Number(Daily)})
  }
    
  if(Dailyon.val() != null) {
  database.ref(`Coins/${message.author.id}`).update({coins: Number(Daily + Dailyon.val().coins)})
  }
    
  let emoglobina = new Discord.MessageEmbed()
  .setColor('#2F3136')
  .setTimestamp()
  .setThumbnail(message.author.displayAvatarURL({ size: 1024, format: 'png', dynamic: true }))
  .setTitle('Daily!')
  .setDescription(`Você coletou **${Daily} coins**! Agora você possui ${Number(Daily) + Number(Dailyon.val().coins)}`)
  .setFooter(`2021 © ${client.user.username}`)
  return message.reply(emoglobina)
  }
  
  if(Cooldown.val().cooldown !== null && Timeout - (Date.now() - Cooldown.val().cooldown) > 0) { //se estiver dentro do cooldown
    let time = ms(Timeout - (Date.now() - Cooldown.val().cooldown));
    return message.channel.send(`**Você já recebeu seu daily hoje, volte em ${time.days} dias, ${time.hours} hora(s), ${time.minutes} minutos, e ${time.seconds} segundos.**`)
  
  } else { //caso não estiver no cooldown
  
    database.ref(`Cooldown/${message.author.id}`).set({cooldown: Date.now()}); //setando a data atual no cooldown
    
    database.ref(`Coins/${message.author.id}`).update({coins: Number(Dailyon.val().coins) + Number(Daily)}); //adicionando o daily a sua conta monetária
    
  let embed = new Discord.MessageEmbed()
  .setColor('#2F3136')
  .setTimestamp()
  .setThumbnail(message.author.displayAvatarURL({ size: 1024, format: 'png', dynamic: true }))
  .setTitle('Daily!')
  .setDescription(`Você coletou **${Daily} coins**! Agora você possui ${Number(Daily) + Number(Dailyon.val().coins)}`)
  .setFooter(`2021 © ${client.user.username}`)
  
  message.reply(embed);
  
  }
  
  },
}
