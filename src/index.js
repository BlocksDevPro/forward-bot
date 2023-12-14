const {bot} = require('./telegram')
const {client} = require('./whatsapp')


bot.launch()
console.log('Bot is running...')
client.initialize()
