module.exports = {
    name: 'eval',
    description: "Evaluates some given piece of code!",
    aliases: ['stupid-bot', 'work-useless', 'useless-bot', 'dev', 'd'],
    async execute(message, profileData, profileSchemaTest, bot) {
        const devs = ["846641107864780820", "746946075247771679"]
        if(!devs.includes(message.author.id)) return;
        var result = message.content.split(" ").slice(1).join(" ")
                let evaled = eval(result);
                console.log(result)
        
    }
}
