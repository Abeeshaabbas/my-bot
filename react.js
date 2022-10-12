const prefixSchemaTest = require('../models/prefixSchema');
module.exports = {
    name: 'react',
    description: "Play a reaction game!",
    aliases: ['react-game', 'play'],
    async execute(message) {
        message.react('👍').then(() => message.react('👎'));

        const filter = (reaction, user) => {
            return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
        };

        message.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first();

                if (reaction.emoji.name === '👍') {
                    message.reply('You reacted with a thumbs up.');
                } else {
                    message.reply('You reacted with a thumbs down.');
                }
            })
            .catch(collected => {
                message.reply('You reacted with neither a thumbs up, nor a thumbs down.');
            });
            }
}