const images = require('../public/images.js')
const cron = require('node-cron')
const bot = require('./bot.create.js')

class MessageSending {
	url_taskMap = {}
	startMorningSending(user) {
		const userId = user.id
		if (this.url_taskMap[userId]) {
			return
		} else {
			let num = 1
			const morningTask = cron.schedule('0 10 * * *', () => {
				const randomNumber = Math.floor(Math.random() * 374)
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
	}
	stopMorningSending(user) {
		const userId = user.id
		if (!this.url_taskMap[userId]) {
			return
		} else {
			this.url_taskMap[userId].stop()
			delete this.url_taskMap[userId]
		}
	}
}

module.exports = new MessageSending()
