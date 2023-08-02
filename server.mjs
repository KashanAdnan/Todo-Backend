import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDatabase from "./DataBase/Connection.DB.mjs"
import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    todo: {
        type: String,
        required: true
    },
    date: {
        type : String,
        required : true
    }
})

const Todo = mongoose.model("todos", todoSchema)

const app = express()

dotenv.config()

connectDatabase(process.env.MONGO_DB_URI);

app.use(express.json())
app.use(cors({ origin: "*" }))


app.get("/todos", async (req, res, next) => {
    const todos = await Todo.find({})
    res.status(200).send({
        todos
    })
})

app.post("/todo", async (req, res, next) => {
    const todo = await Todo.create({
        todo: req.body.todo
    })
    res.status(200).send({
        message: "Todo Created",
        todo
    })
})

app.get("/todo/:id", async (req, res, next) => {
    const todo = await Todo.findById({ _id: req.params.id })
    res.status(200).send({
        todo
    })
})

app.put("/todo/:id", async (req, res, next) => {
    const todo = await Todo.findByIdAndUpdate({ _id: req.params.id }, {
        todo: req.body.todo
    })
    res.status(200).send({
        message: 'Product Update',
        todo
    })
})

app.delete("/todo/:id", async (req, res, next) => {
    const todo = await Todo.findByIdAndDelete({ _id: req.params.id })
    res.status(200).send({
        message: 'Product Deleted'
    })
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is Running  on ${PORT}`);
})