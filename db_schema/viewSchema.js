const mongoose = require('mongoose')

const userViewSchema = new mongoose.Schema({
    userId: String,
    productId: String,
    viewDate: Date
})

const UserView = mongoose.model('user_views', userViewSchema)
module.exports = UserView