const {Composer} = require("grammy")
const bot = require("../../connection/token")


module.exports = new Composer().use(
    bot.on('message', async ctx => {
        await ctx.reply('Простите, мой хозяин еще не научил меня понимать людей 🥺')
    })
)