const { Composer } = require('grammy')
const messageSending = require('../../bot.service.js')
const bot = require('../../connection/token.js')

module.exports = new Composer().use(
	bot.command('stop', async ctx => {
		await ctx.reply(`Дорогой друг, вы всегда можете
возобновить получение посланий,
выбрав в меню команду «старт» 🙏🏻`)
		messageSending.stopSending(ctx.msg.from.id)
		await ctx.deleteMessage()
	})
)
