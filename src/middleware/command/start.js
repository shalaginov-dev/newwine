const { Composer } = require('grammy')
const messageSending = require('../../service/messageSending.js')
const bot = require('../../connection/token.js')

module.exports = new Composer().use(
	bot.command('start', async ctx => {
		await ctx.reply(
			`Спасибо, что вы с нами🎉
Теперь каждый день в 10.00 по мск
ожидайте новое послание 💌`
		)
		messageSending.startSending(ctx.msg.from.id)
		await ctx.deleteMessage()
	})
)
