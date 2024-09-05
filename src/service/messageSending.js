const images = require('../../public/images_full.js')
const cron = require('node-cron')
const bot = require('../connection/token.js')
const { GrammyError, HttpError } = require('grammy')

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
						this.users.map(async user => {
							const randomNumber = Math.floor(Math.random() * 374)
							try {
								if (this.num % 2 === 0) {
									await bot.api.sendPhoto(user, images.album_1[randomNumber])
								} else {
									await bot.api.sendPhoto(user, images.album_2[randomNumber])
								}
							} catch (error) {
								if (error instanceof GrammyError) {
									console.error(
										`Ошибка при отправке фото: ${error.description}`
									)
									if (
										error.error_code === 403 &&
										error.description.includes('user is deactivated')
									) {
										console.log(
											`Пользователь ${user} деактивирован, удаляю из списка рассылки.`
										)
										this.stopSending(user)
									}
								} else if (error instanceof HttpError) {
									console.error('HTTP ошибка:', error)
								} else {
									console.error('Непредвиденная ошибка:', error)
								}
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
