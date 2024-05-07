const { Composer, InlineKeyboard } = require('grammy')
const detoxMessage = require('../../../public/detox')
const bot = require('../../connection/token')

module.exports = new Composer().use(
	bot.command('detox', async ctx => {
		const secondPartKeyboard = new InlineKeyboard()
			.text('вторая часть', 'to-second-part')
			.row()
		await ctx.reply(detoxMessage.firstPart, {
			reply_markup: secondPartKeyboard,
		})
		await ctx.deleteMessage()
	}),

	bot.callbackQuery('to-second-part', async ctx => {
		const thirdPartKeyboard = new InlineKeyboard()
			.text('третья часть', 'to-third-part')
			.row()
		await ctx.reply(detoxMessage.secondPart, {
			reply_markup: thirdPartKeyboard,
		})
	}),

	bot.callbackQuery('to-third-part', async ctx => {
		await ctx.reply(detoxMessage.thirdPart)
	})
)
