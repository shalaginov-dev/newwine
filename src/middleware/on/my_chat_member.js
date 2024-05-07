const bot = require("../../connection/token");
const messageSending = require("../../service/messageSending");
const {Composer} = require("grammy");

module.exports = new Composer().use(
    bot.on('my_chat_member', ctx => {
        if (ctx.update.my_chat_member.new_chat_member.status === 'kicked') {
            messageSending.stopSending(ctx.update.my_chat_member.from.id)
        }
    })
)
