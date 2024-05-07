const { Bot } = require('grammy')
require('dotenv').config()

module.exports = new Bot(process.env.BOT_TOKEN)
