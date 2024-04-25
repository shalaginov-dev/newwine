const { Bot, GrammyError, HttpError, InlineKeyboard } = require('grammy')
const cron = require('node-cron')
const detoxMessage = require('../public/detox.js')
const images = require('../public/images.js')
require('dotenv').config()

const bot = new Bot(process.env.BOT_TOKEN)

const messageSending = {
	url_taskMap: {},
	startMorningSending(userId) {
		if (this.url_taskMap[userId]) {
			console.log('300 cron-task is already created')
			return
		} else {
			let num = 1
			console.log('201 cron-task was created')
			const morningTask = cron.schedule('0 10 * * *', () => {
				console.log('200 next crontask step is done')
				const randomNumber = Math.floor(Math.random() * 350)
				if (num % 2 === 0) {
					bot.api.sendPhoto(userId, images.album_1[randomNumber])
					num++
				} else {
					bot.api.sendPhoto(userId, images.album_2[randomNumber])
					num++
				}
			})
			this.url_taskMap[userId] = morningTask
		}
	},
	stopMorningSending(userId) {
		if (!this.url_taskMap[userId]) {
			console.log('301 cron-task is already stopped')
			return
		} else {
			console.log('202 cron-task was stopped')
			this.url_taskMap[userId].stop()
			delete this.url_taskMap[userId]
		}
	},
}

bot.api.setMyCommands([
	{
		command: 'start',
		description: 'Начать получать послания',
	},
	{
		command: 'stop',
		description: 'Приостановить получение посланий',
	},
	{
		command: 'links',
		description: 'Наши ссылки',
	},
	{
		command: 'detox',
		description: 'Детоксикация от религии',
	},
])

bot.command('start', async ctx => {
	await ctx.reply(
		`Спасибо, что вы с нами🎉
Теперь каждый день в 10.00 по мск
ожидайте новое послание 💌`
	)
	messageSending.startMorningSending(ctx.msg.from.id)
	await ctx.deleteMessage()
})

bot.command('stop', async ctx => {
	await ctx.reply(`Дорогой друг, вы всегда можете
возобновить получение посланий,
выбрав в меню команду «старт» 🙏🏻`)
	messageSending.stopMorningSending(ctx.msg.from.id)
	await ctx.deleteMessage()
})

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
	await ctx.reply(`🍷            мы в других соцсетях           👇🏼`, {
		reply_markup: mainKeyboard,
	})
	await ctx.reply(`🍷          также мы рекомендуем         👇🏼`, {
		reply_markup: bonusKeyboard,
	})
	await ctx.deleteMessage()
})

bot.command('detox', async ctx => {
	const secondPartKeyboard = new InlineKeyboard()
		.text('вторая часть', 'to-second-part')
		.row()
	await ctx.reply(detoxMessage.firstPart, { reply_markup: secondPartKeyboard })
	await ctx.deleteMessage()
})

bot.callbackQuery('to-second-part', async ctx => {
	const thirdPartKeyboard = new InlineKeyboard()
		.text('третья часть', 'to-third-part')
		.row()
	await ctx.reply(detoxMessage.secondPart, { reply_markup: thirdPartKeyboard })
})

bot.callbackQuery('to-third-part', async ctx => {
	await ctx.reply(detoxMessage.thirdPart)
})

bot.catch(err => {
	const ctx = err.ctx
	console.error(`Error while handling update ${ctx.update.update_id}:`)
	const e = err.error
	if (e instanceof GrammyError) {
		console.error('Error in request:', e.description)
	} else if (e instanceof HttpError) {
		console.error('Could not contact Telegram:', e)
	} else {
		console.error('Unknown error:', e)
	}
})

bot.start()
