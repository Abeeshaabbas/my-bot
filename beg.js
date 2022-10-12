const { EmbedBuilder } = require("@discordjs/builders");
const profileSchemaTest = require('../models/profileSchema')
module.exports = {
    name: 'beg',
    description: "Beg for some coins",
    cooldown: 15,
    async execute(message, profileData) {
        const userbal = profileData.fishy
        const randomNumber = Math.floor(Math.random() * 500) +1;
        const response = await profileSchemaTest.findOneAndUpdate({
            userID: message.author.id,
        }, {
            $inc: {
                fishy: randomNumber,
                },      
            }
        );
                const embed = new EmbedBuilder()
                .setTitle(`"${message.author.username}"`)
                .setDescription(`Take these ${randomNumber} this time i got yo back, from next time i won't!`);
                return message.reply({ embeds: [embed] })   
    }
}