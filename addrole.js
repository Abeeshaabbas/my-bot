module.exports = {
    name: 'addrole',
    description: "Adds the given role to the mentioned user!",
    aliases: ["ar", "addnewrole"],
    cooldown: 2,

    async execute(message, serverDatabase) {
// console.log(prefix.prefix)
// console.log(serverProfile)
        if(!message.member.permissions.has("ManageRoles")) {
            message.react("❌")
            message.reply("You do not have MANAGE_ROLES Permission to execute this command!")
        } else {
            if(message.content) return message.reply("Provide all the necessary args!")
            if(!message.content.split(" ")[1].replace("<@1022778708060291112>").replace("<@1022778708060291112> ")) return message.reply("You have to provide a role in second argument!");
            if(!message.mentions.members.first()) return message.reply("You have to mention a user!")
        }
        try {
            const role = message.guild.roles.cache.get(message.content.split(" ")[1].replace("<@1022778708060291112>").replace("<@1022778708060291112> "))
            await message.mentions.members.first().roles.add(role)
            message.reply("Added the role!")
        } catch(err) {
            try {
                const role = message.mentions.roles.first().id;
                await message.mentions.members.first().roles.add(role)
                message.reply("Added the role!")
            } catch (error) {
                if(!message.member.permissions.has("ManageRoles")) return;
                message.reply("Invalid role provided!")
            }
        }
        // const user = message.mentions.users.first().id
    }
}