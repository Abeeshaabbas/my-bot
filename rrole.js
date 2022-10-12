const { onlyIfMatchCommand } = require("..");
module.exports = {
    name: 'rrole',
    description: "Removes the given role from the mentioned user!",
    aliases: ["roleremove", "rr"],

    async execute(message) {
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
            await message.mentions.members.first().roles.remove(role)
            message.reply("Removed the role!")
        } catch(err) {
            try {
                const role = message.mentions.roles.first().id;
                await message.mentions.members.first().roles.remove(role)
                message.reply("Removed the role!")
            } catch (error) {
                if(!message.member.permissions.has("ManageRoles")) return;
                message.reply("Invalid role provided!")
            }
        }
    }
}