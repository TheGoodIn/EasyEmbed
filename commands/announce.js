const Discord = require('discord.js')
const COLOR = process.env.COLOR;

 module.exports = {
    name: "announce",
    description: "announces somethin",
    run: async (client, message, args) => {
        const errorperms = new Discord.MessageEmbed()
          .setTitle('Something went wrong.')
          .setColor(COLOR)
          .setDescription('You did not have permission to run that command')


        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(errorperms)
      
          const timedoutsir = new Discord.MessageEmbed()
          .setAuthor(`The prompt has timed out.`, 'https://flyro.xyz/Aps8L9XFaJ')
          .setColor(COLOR)
          function getChannelFromMention(mention) {
            if (!mention) return;
      
            if (mention.startsWith("<#") && mention.endsWith(">")) {
                mention = mention.slice(2, -1);
      
                if (mention.startsWith("!")) {
                    mention = mention.slice(1);
                }
      
                return message.guild.channels.cache.get(mention);
            }
        }
      
        var channel = getChannelFromMention(args[0]);
        
        if(!channel) {
          const hahanubnononon = new Discord.MessageEmbed()
          .setTitle('Something went wrong.')
          .setColor(COLOR)
          .setDescription('You did not specified a channel to send the announcement!')
          return message.channel.send(hahanubnononon)
        }
      
        if (channel) {
            var filter = (m, user) => {
                return m.author.id === message.author.id;
            };
      
            var question = new Discord.MessageEmbed()
                .setTitle("Title.")
                .setColor(COLOR)
                .setDescription("What will be the announcement title?");
      
            message.channel.send(question);
      
            var msgcollector = message.channel.createMessageCollector(filter, {
                time: 120000,
            });
      
            msgcollector.on("collect", (m) => {
                msgcollector.stop();
      
                var question = new Discord.MessageEmbed()
                    .setTitle("Description.")
                    .setColor(COLOR)
                    .setDescription("Please specify the description of the announcement.");
      
                message.channel.send(question);
      
                var msgcollector2 = message.channel.createMessageCollector(filter, {
                    time: 120000,
                });
      
                msgcollector2.on("collect", (m2) => {
                    msgcollector2.stop();
      
                    var question = new Discord.MessageEmbed()
                        .setTitle("Image")
                        .setColor(COLOR)
                        .setDescription("Please upload the embed image.")
                        .setFooter('If it don\'t conatins an image please type \'skip\'')
      
                    message.channel.send(question);
      
                    var msgcollector3 = message.channel.createMessageCollector(filter, {
                        time: 120000,
                    });
      
                    msgcollector3.on("collect", (m3) => {
                        msgcollector3.stop();
      
                        var emb = new Discord.MessageEmbed()
                            .setTitle(m.content)
                            .setDescription(m2.content)
                            .setColor(COLOR)
                            .setTimestamp()
                            .setFooter(message.author.username,message.author.avatarURL())
      
                        if (m3.content.toLowerCase() != "skip") {
                            emb.setImage(m3.attachments.array()[0].url);
                        }

      
                        channel.send(emb);
                    });
      
                    msgcollector3.on("end", (collected) => {
                        if (collected.size < 1) return message.channel.send(timedoutsir);
                    });
                });
      
                msgcollector2.on("end", (collected) => {
                    if (collected.size < 1) return message.channel.send(timedoutsir);
                });
            });
      
            msgcollector.on("end", (collected) => {
                if (collected.size < 1) return message.channel.send(timedoutsir);
            });
        }
    }
 } 