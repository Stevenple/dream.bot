const Discord = require('discord.js');
const bot = new Discord.Client();
const token = require("./token.json")
const prefix = "&"


bot.on("ready", async () =>{
    console.log("Le bot Fonctionne")
    bot.user.setStatus("online")
    bot.user.setActivity("développer son Bot", {type: 'PLAYING'})
})

bot.login(process.env.TOKEN);


// Welcome Message
bot.on("guildMemberAdd", member => {
    let embed = new Discord.RichEmbed ()
        .setDescription("Bienvenue" + member.user + "viens de rejoindre le serveur discord")
        .setFooter("Nous sommes maintenant" + member.guild.memberCount + "sur le serveur")
        .setColor("RANDOM")
        .setImage("https://media.giphy.com/media/hIi2KUxTgV9QJjM4IE/giphy.gif")
        .setTimestamp()
    member.guild.channels.get('840157828999020584').sendMessage(embed)
});


bot.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    if(message.member.hasPermission("ADMINISTRATOR")){
        if(message.content.startsWith(prefix + "ban")){
            let mention = message.mentions.members.first();
            if(mention == undefined){
                message.reply("**Membre non ou mal mentionné.⚠️**");
            }
            else {
                if(mention.bannable){
                    mention.ban();
                    message.channel.send(mention.displayName + "**A été banni avec succés.✅**");
                }
                else {
                    message.reply("**Impossible de bannir ce membre.❌**");
                }
            }
        }
        else if(message.content.startsWith(prefix + "kick")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("**Membre non ou mal mentionné.⚠️**");
            }
            else {
                if(mention.kickable){
                    mention.kick();
                    message.channel.send(mention.displayName + "**A été kick avec succés.✅**");
                }
                else {
                    message.reply("**Impossible de kick ce membre.❌**");
                }
            }
        }
    }
});






