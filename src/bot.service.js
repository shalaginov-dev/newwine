const images = require('../public/images.js')
const cron = require('node-cron')
const bot = require('./bot.create.js')

class MessageSending {
    url_taskMap = {}
    users = []
    num = 1
    startMorningSending(user) {
        const userId = user.id
        if (this.users.find(user => user === userId)) {
            return
        } else {
            this.users.push(userId)
            if (this.url_taskMap['job']){
                return
            } else {
                const morningTask = cron.schedule('0 10 * * *', () => {
                    if(!this.users.length){
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
                        this.num > 1000 ? this.num = 1 : this.num ++
                    }
                })
                this.url_taskMap['job'] = morningTask
            }

        }
    }

    stopMorningSending(user) {
        const userId = user.id
        if (!this.users.find(user => user === userId)) {
            return
        } else {
            this.users = this.users.filter(user => user !== userId)
        }
    }
}

module.exports = new MessageSending()
