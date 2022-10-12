const { EmbedBuilder, embedLength } = require('@discordjs/builders')
// const serverDatabase = prefixSchemaTest.findOne({ serverID: thisserverid });
module.exports = {
  name: 'help',
  description: "Shows help info about every command!",
  async execute(message, serverDatabase, bot) {
    if(message.content.replace(`${serverDatabase.prefix}help`, "").replace(`${serverDatabase.prefix}help `, "")) {
      const fs = require('fs')
      const embed = new EmbedBuilder()
      .setTitle("Commands | Bot")
      .setTimestamp()
      const commandFiles = fs.readdirSync('./commands/').filter(h => h.endsWith(".js"))
        for(const command of commandFiles) {
          const c = require(`./commands/${command}`) 
          embed.addFields({
            name: c.name, value: `${c.description}\nAliases: ${c.aliases}`
          })
        }
      message.reply({ embeds: [embed] })
      
    } else {
      var command = message.content.toLowerCase().replace(`${serverDatabase.prefix}help `, "")
                    var realcommand = bot.commands.get(command) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))
                    if(!realcommand) return message.react('❌')
                    var cName = realcommand.name
                    var description = realcommand.description
                    if(realcommand.aliases) {
                      var aliasescommand = []
                      aliasescommand.push(realcommand.aliases)
                      const embed = new EmbedBuilder()
                      .setTitle("Command | Bot")
                      .setTimestamp()
                      .addFields({
                        name: `${cName}`, value: `${description}\nAliases: ${aliasescommand}`
                      })
                      message.reply({ embeds: [embed] })
                    }else{
                      const aliasescommand = "No Aliases For This Command!"
                      const embed = new EmbedBuilder()
                      .setTitle("Command | Bot")
                      .setTimestamp()
                      .addFields({
                        name: `${cName}`, value: `${description}\nAliases: ${aliasescommand}`
                      })
                      message.reply({ embeds: [embed] })

                    }
                    
    }

    }
    
  }