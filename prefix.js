const { EmbedBuilder } = require('@discordjs/builders');
module.exports = {
    name: 'prefix',
    description: "Change prefix of the bot for your server!",
    aliases: ['setprefix', "addprefix", 'changeprefix'],
    async execute(message, profileData, profileSchemaTest, prefixSchemaTest, serverDatabase) {
        const newprefix = message.content.split(" ")[1]
        prefixSchemaTest.findOneAndDelete({
            serverID: message.guild.id
        })
        const newdb = await new prefixSchemaTest({
            serverID: String,
            prefix: String,
        })
        newdb.save()
        await prefixSchemaTest.findOneAndUpdate({ serverID: message.guild.id }, { prefix: newprefix });

        message.reply(`Prefix changed to ${newprefix} successfully!`)
    }
}