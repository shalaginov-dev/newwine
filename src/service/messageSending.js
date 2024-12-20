const images = require('../../public/images_full.js')
const { GrammyError, HttpError } = require('grammy')
const bot = require('../connection/token.js')
const logger = require('../utils/log.js')
const cron = require('node-cron')

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
					// const cronTask = cron.schedule('*/5 * * * * *', () => {
					if (!this.users.length) {
						return
					} else {
						this.users.map(async user => {
							const randomNumber = Math.floor(Math.random() * 374)
							try {
								if (this.num % 2 === 0) {
									await bot.api.sendPhoto(user, images.album_1[randomNumber])
									// await bot.api.sendPhoto(user, images.album_1[400])
								} else {
									await bot.api.sendPhoto(user, images.album_2[randomNumber])
								}
							} catch (error) {
								if (error instanceof GrammyError) {
									logger.error(
										`Ошибка при отправке фото: ${error.description} userid: ${error.payload.chat_id} 
										photo: ${error.payload.photo}`
									)
									if (
										error.error_code === 403 &&
										error.description.includes('user is deactivated')
									) {
										logger.error(
											`Пользователь ${user} деактивирован, удаляю из списка рассылки.`
										)
										this.stopSending(user)
									}
								} else if (error instanceof HttpError) {
									logger.error('HTTP ошибка:', error)
								} else {
									logger.error('Непредвиденная ошибка:', error)
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
