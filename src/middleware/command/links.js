const { Composer, InlineKeyboard } = require('grammy')
const bot = require('../../connection/token')

module.exports = new Composer().use(
	bot.command('links', async ctx => {
		const mainKeyboard = new InlineKeyboard()
			.url(
				`Instagram`,
				'https://www.instagram.com/newwwwwine?igsh=ZDZwcnA3b2F0MGNl'
			)
			.row()
			.url(`Telegram`, 'https://t.me/newwwwwine')
			.row()
			.url(`Pinterest`, 'https://pin.it/2FqNG24KD')
		const bonusKeyboard = new InlineKeyboard()
			.url('Tg. Канал «Рождество»', 'https://t.me/CHRISTmas_in_heart')
			.row()
			.url(
				'Inst. «Творцы реальности»',
				'https://www.instagram.com/prophetscall?igsh=NnNvYTZpZWxkZjNo'
			)
			.row()
			.url(
				'Inst. «Реформация»',
				'https://www.instagram.com/reformation_spirit?igsh=eXNtZWh4cTN2NDFw'
			)
		await ctx.reply(`🍷      мы в других соцсетях     👇🏼`, {
			reply_markup: mainKeyboard,
		})
		await ctx.reply(`🍷    также мы рекомендуем   👇🏼`, {
			reply_markup: bonusKeyboard,
		})
		await ctx.deleteMessage()
	})
)
