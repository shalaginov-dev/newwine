const bot = require("../connection/token");
const composerStart = require("./command/start");
const composerStop = require("./command/stop");
const composerLinks = require("./command/links");
const composerDetox = require("./command/detox");
const composerUsersCount = require("./hears/usersCount");
const composerOnMessage = require("./on/message");
const composerOnMyChatMember = require("./on/my_chat_member");


module.exports = bot.use(
    composerStart,
    composerStop,
    composerLinks,
    composerDetox,
    composerUsersCount,
    composerOnMessage,
    composerOnMyChatMember,
)
