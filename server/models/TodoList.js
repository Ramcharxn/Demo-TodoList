const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoList = new Schema({
    task:{
        type:String,
        required: true,
    }
})

module.exports = mongoose.model('TodoList',TodoList)