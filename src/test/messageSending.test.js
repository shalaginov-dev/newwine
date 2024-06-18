const images = require('../../public/images_full')
const cron = require('node-cron')
const bot = require('../connection/token.js')

class TestSending {
	num = 0
	testSendingMessage = userId => {
		const cronTask = cron.schedule('*/1 * * * * *', () => {
			// bot.api.sendPhoto(userId, images.album_1[this.num])
			bot.api.sendPhoto(userId, images.album_2[this.num])
			console.log(`${this.num + 1} photo: ${images.album_1[this.num]}`)
			this.num > 1000 ? (this.num = 1) : this.num++
		})
	}
}

module.exports = new TestSending()
