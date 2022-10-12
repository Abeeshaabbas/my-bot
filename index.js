const fs = require('fs');
const path = require('node:path')
const { Client, Collection, GatewayIntentBits, EmbedBuilder, Partials, TimestampStyles } = require('discord.js');
const config = require('./config.json')
const mongoose = require('mongoose');
const { count } = require('console');
const profileSchemaTest = require('./models/profileSchema')
const prefixSchemaTest = require('./models/prefixSchema.js');
const prefixSchema = require('./models/prefixSchema.js');
const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
    allowedMentions: []
})
bot.commands = new Collection();
bot.description = new Collection();
bot.aliases = new Collection();


const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    const helpCommand = require('./help')
    if(!command.aliases) {
        bot.commands.set(command.name, command);
        bot.commands.set(helpCommand.name, helpCommand)
        bot.description.set(command.description, command);
    } else {
        bot.commands.set(command.name, command);
        bot.commands.set(helpCommand.name, helpCommand)
        bot.description.set(command.description, command);
        bot.aliases.set(command.aliases, command);
    }

}

bot.once('ready', async () => {
    await mongoose.connect(config.mongodb).then(() => {
        console.log('The database is ready!')
        console.log(`${bot.user.tag} is online!`)

    })
})


bot.on('messageCreate', async (message) => {
        if(message.author.bot) return;
        const cooldowns = new Map();
        let profileData;
        try {
            profileData = await profileSchemaTest.findOne({ userID: message.author.id })
            if(!profileData) {
                let profile = new profileSchemaTest({
                    userID: message.author.id,
                    serverID: message.guild.id,
                    fishy: 1000,
                    bank: 0,
                    banned: false,
                    blacklisted: false,
                    bancount: 0,
                })
                profile.save()
                let profileData = profile;
            }
        } catch (error) {
            console.log(error)
        }
        const serverDatabase = await prefixSchemaTest.findOne({ serverID: message.guild.id });
        if(!serverDatabase) {
            const serverDB = new prefixSchemaTest({
                serverID: message.guild.id,
                prefix: config.prefix,
            })
            serverDB.save()
        }
            if(message.content.toLowerCase().startsWith(`${serverDatabase.prefix}`)) {
                const workingtrigger = message.content.split(" ")[0].replace(`${serverDatabase.prefix}`, "")
                const values = bot.commands.map(command => command.name).join(', ')
                if(message.content.toLowerCase().replace(`${serverDatabase.prefix}`, "").startsWith("help")) {
                        const help = require('./help');
                        try {
                            help.execute(message, bot)
                        } catch (error) {
                            console.log(error)
                        }
                    
                } else {
                    const command = bot.commands.get(workingtrigger) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(workingtrigger));

	                if (!command) return;
                    try {
                        if(!cooldowns.has(command.name)) {

                            cooldowns.set(command.name, new Collection())
    
                        }
    
                        const current = Date.now()
                        const timestamp = cooldowns.get(command.name)
                        const cooldownamount = command.cooldown * 1000;

                        if(timestamp.has(message.author.id)) {
                            const expTime = timestamp.get(message.author.id) + cooldownamount;

                            if(current<expTime) {
                                const timeleft = expTime - current / 1000;
                                message.reply(`Please wait \`${timeleft.toFixed(1)}\``)
                            }
                        }
                    } catch (error) {
                        console.log(error);
                    };
                    try {
                        exports.thisserverid = message.guildId;
                        // module.exports = {
                        //     thisserverid: message.guild.id
                        // }
                        
                        await command.execute(message, profileData, profileSchemaTest, prefixSchemaTest, serverDatabase, bot);

                    } catch (error) {
                        console.error(error);
                        // const channel = bot.channels.cache.get("1025808729112854608")
                        const errortopost = error.toString()
                        bot.channels.cache.get("1025808729112854608").send(errortopost)
                        await message.reply({ content: 'There was an error while executing this command!'});
                    }
                
                }
            }
    }
)
bot.on('error', (err) => {
    const guildName = bot.guilds.cache.get("1021348374722650122").name
    console.log(err)
    bot.guilds.cache.get("1021348374722650122").channels.cache.get("1025808729112854608").send(err+" - occured in guild : "+guildName)
})

bot.on('messageReactionAdd', async (reaction) => {
    if(reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.log("Reaction could not be fetched!")
            return;
        }
        console.log(`${reaction.message.author.tag}'s message ${reaction.message.content} gained a reaction which is: ${reaction.emoji}`)
        console.log(`${reaction.count - 1} other users have reacted to this message!`)
    } else {
        console.log(`${reaction.message.author.tag}'s message ${reaction.message.content} gained a reaction which is: ${reaction.emoji}`)
        console.log(`${reaction.count - 1} other users have reacted to this message!`)
    }
})



function login(token) {
    bot.login(token)
}

login(config.token)

