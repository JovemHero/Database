const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms'); //lembrando que o parse-ms tem de ser na versão 2.1.0
module.exports = { 
	name: 'daily',
	async execute (client, message, args) { 
		var getDaily = [ 10, 30, 70, 80, 100 ]; 
		let Daily = getDaily[Math.floor(Math.random() * getDaily.length)]; //random money 
let Timeout =	21600000; //1 dia em milisegundos 
let Cooldown = await db.get(`${message.author.id}.tempo.cooldown`) //Diretório do cooldown 
let Dailyon = await db.get(`${message.author.id}.balance.coins`) //Diretório do Coin 

   if(Cooldown == null) { 
	db.set(`${message.author.id}.tempo.cooldown`, Date.now())
   
   if(Dailyon == null) { 
   	db.set(`${message.author.id}.balance.coins`, Number(Daily))
   	}
   	
   	if(Dailyon != null) { 
   		db.set(`${message.author.id}.balance.coins`, Number(Dailyon + Daily)
   		}
   		
   		let emoglobina = new Discord.MessageEmbed() 
       .setColor('#2F3136') 
       .setTimestamp() 
       .setThumbnail(message.author.displayAvatarURL({ size: 1024, format: 'png', dynamic: true })) 
       .setTitle('Daily!') .setDescription(`Você coletou **${Daily} coins**! Agora você possui ${Number(Daily) + Number(Dailyon)}`) 
       .setFooter(`2021 © ${client.user.username}`) 
       return message.reply(emoglobina) 
       }
       
       if(Cooldown !== null && Timeout - (Date.now() - Cooldown) > 0) { //se estiver dentro do cooldown 
       let time = ms(Timeout - (Date.now() - Cooldown)); 
       
       return message.channel.send(`**Você já recebeu seu daily hoje, volte em ${time.days} dias, ${time.hours} hora(s), ${time.minutes} minutos, e ${time.seconds} segundos.**`) 
       
       } else { //caso não estiver no cooldown 
       
       db.set(`${message.author.id}.tempo.cooldown`, Date.now()) //setando a data atual no cooldown 
       
        db.set(`${message.author.id}.balance.coins`, Number(Dailyon + Daily)) //adicionando o daily a sua conta monetária
        
       let embed = new Discord.MessageEmbed() 
       .setColor('#2F3136') 
       .setTimestamp() 
       .setThumbnail(message.author.displayAvatarURL({ size: 1024, format: 'png', dynamic: true })) 
       .setTitle('Daily!') 
       .setDescription(`Você coletou **${Daily} coins**! Agora você possui ${Number(Daily) + Number(Dailyon)}`) 
       .setFooter(`2021 © ${client.user.username}`) 
       message.reply(embed); 
       } 
       },
       }
