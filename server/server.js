const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const TodoList = require('./models/TodoList')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

mongoose.connect('DATABASE URL')
.then(() => console.log('db connected'))
.catch(err => console.log(err.message))

app.get('/',async(req,res)=>{
    const AllTask = await TodoList.find({})
    res.send(AllTask)
})

app.post('/task',async(req,res) => {
    const { task } = req.body

    const Task = new TodoList({
        task
    })

    await Task.save()

    res.send(Task)
})

app.post('/delete/:id',async(req,res) => {
    const { id } = req.params

    console.log(id)
    
    await TodoList.findByIdAndDelete(id)
    const AllTask = await TodoList.find()
    // console.log(AllTask)
    res.send(AllTask)
})

app.listen(process.env.PORT || 5001,console.log(`running on port ${5001}`))