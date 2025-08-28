const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const Book = require('./models/Books')
const cors = require('cors')

const PORT = process.env.PORT || 5001
const mongo = 'mongodb+srv://amansample22_db_user:TJMEn846YBS4n6kW@books.thekkkz.mongodb.net/niet_books?retryWrites=true&w=majority&appName=Books'

// middleware
app.use(express.json())
app.use(cors())

mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Db connected"))
    .catch((err) => console.error(err))

app.get("/", (req, res) => {
    res.send("I like books okay")
})

// Fixed: Changed status code from 201 to 200 for GET requests
app.get("/books", async (req, res) => {
    try {
        const books = await Book.find()
        return res.status(200).json(books) // ✅ Changed to 200 OK
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch books" })
    }
})

app.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        if (!book) return res.status(404).json({ message: "book not found" })
        return res.json(book)
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch book" })
    }
})

// Fixed: Added proper 201 status for resource creation
app.post("/books", async (req, res) => {
    const { title, author, year } = req.body;
    try {
        const newBook = new Book({ title, author, year })
        await newBook.save()
        return res.status(201).json(newBook) // ✅ Changed to 201 Created
    } catch (error) {
        return res.status(500).json({ message: "Failed to add book" })
    }
})

app.put("/books/:id", async (req, res) => {
    const { title, author, year } = req.body
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id, 
            { title, author, year },
            { new: true }
        )
        if (!updatedBook) return res.status(404).json({ message: "Book not found" })
        return res.json(updatedBook)
    } catch (error) {
        return res.status(500).json({ message: "Failed to update book" })
    }
})

app.delete('/books/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: "Book not found" })
        return res.json({ message: "Book deleted" })
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete book" })
    }
})

app.listen(PORT, function () {
    console.log(`App is running on ${PORT}`)
})