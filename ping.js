module.exports = {
    name: 'ping',
    description: "Can ping!",
    aliases: ["boop", "beep"],

    async execute(message) {
        await message.reply("Pong!")
    }
}