const { EmbedBuilder } = require('@discordjs/builders');
module.exports = {
    name: 'bal',
    description: "Check Your Balance",
    aliases: ["money", "currency"],
    cooldown: 4,
    async execute(message, profileData) {
        try{
            const embed = new EmbedBuilder()
            .setTitle(`${message.author.tag}'s balance!`)
            .setDescription(`
            Wallet: ${profileData.fishy}
            Bank: ${profileData.bank}
            Net Worth: ${profileData.fishy + profileData.bank}
            `)
            .setTimestamp()
            message.channel.send({ embeds: [embed] })
        } catch(err) {
            console.log(err)
        }
    }
}