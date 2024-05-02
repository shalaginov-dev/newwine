const images = require('../public/images.js')
const cron = require('node-cron')
const bot = require('./bot.create.js')

class MessageSending {
	constructor(url_taskMap) {
		this.url_taskMap = {}
	}
	startMorningSending(user) {
		const userId = user.id
		console.log(userId)
		if (this.url_taskMap[userId]) {
			console.log('300 cron-task is already created')
			return
		} else {
			let num = 1
			console.log('201 cron-task was created')
			const morningTask = cron.schedule('* * * * *', () => {
				console.log(`200 next cron-task step is done (${user.username})`)
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
			console.log('301 cron-task is already stopped')
			return
		} else {
			console.log('202 cron-task was stopped')
			this.url_taskMap[userId].stop()
			delete this.url_taskMap[userId]
		}
	}
}

module.exports = new MessageSending()
