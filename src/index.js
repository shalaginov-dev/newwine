const { GrammyError, HttpError } = require('grammy')
const messageSending = require('./bot.service.js')
const bot = require('./connection/token.js')
const composerStart = require('./middleware/command/start.js')
const composerStop = require('./middleware/command/stop.js')
const composerLinks = require('./middleware/command/links.js')
const composerDetox = require('./middleware/command/detox.js')
require('./bot.menu.js')
require('dotenv').config()

bot.hears(/users/i, async ctx => {
	if (
		ctx.msg.from.id.toString() !== '1898590789' &&
		ctx.msg.from.id.toString() !== '477328986'
	)
		return
	else await ctx.reply(`участники: ${messageSending.users.length}`)
})

bot.on('message', async ctx => {
	await ctx.reply('Простите, мой хозяин еще не научил меня понимать людей 🥺')
})

bot.on('my_chat_member', ctx => {
	if (ctx.update.my_chat_member.new_chat_member.status === 'kicked') {
		messageSending.stopSending(ctx.update.my_chat_member.from.id)
	}
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

bot.use(composerStart)
bot.use(composerStop)
bot.use(composerLinks)
bot.use(composerDetox)
bot.start()
