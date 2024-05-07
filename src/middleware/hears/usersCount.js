const {Composer} = require("grammy");
const bot = require("../../connection/token");
const messageSending = require("../../service/messageSending");


module.exports = new Composer().use(
    bot.hears(/users/i, async ctx => {
        if (
            ctx.msg.from.id.toString() !== '1898590789' &&
            ctx.msg.from.id.toString() !== '477328986'
        )
            return
        else await ctx.reply(`участники: ${messageSending.users.length}`)
    })
)