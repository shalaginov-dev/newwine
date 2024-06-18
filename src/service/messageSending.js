const images = require('../../public/images_full.js')
const cron = require('node-cron')
const bot = require('../connection/token.js')

class MessageSending {
	url_taskMap = {}
	users = []
	num = 1
	startSending(userId) {
		if (this.users.find(user => user === userId)) {
			return
		} else {
			this.users.push(userId)
			if (this.url_taskMap['job']) {
				return
			} else {
				const cronTask = cron.schedule('0 10 * * *', () => {
					if (!this.users.length) {
						return
					} else {
						this.users.map(user => {
							const randomNumber = Math.floor(Math.random() * 374)
							if (this.num % 2 === 0) {
								bot.api.sendPhoto(user, images.album_1[randomNumber])
							} else {
								bot.api.sendPhoto(user, images.album_2[randomNumber])
							}
						})
						this.num++
					}
				})
				this.url_taskMap['job'] = cronTask
			}
		}
	}

	stopSending(userId) {
		if (!this.users.find(user => user === userId)) {
			return
		} else {
			this.users = this.users.filter(user => user !== userId)
		}
	}
}

module.exports = new MessageSending()
