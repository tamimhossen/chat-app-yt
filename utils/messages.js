const moment = require('moment')

function formateMessages(username, text) {
    return {
        username,
        text,
        time: moment().format('h:mm a')
    }
}

module.exports = formateMessages;