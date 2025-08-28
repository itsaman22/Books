const express = require('express')
const app = express()

// middleware
app.use(express.json()) // why is this line needed??


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.get("/user/:id",(req,res)=>{  // :/id
//     const userId = req.params.id
//     res.send(`User id is : ${userId}`)
// })

app.get('/user/:id',(req,res)=>{
  const userId = req.params.id
  res.send(`The user id is : ${userId}`)
})

app.post("/data",(req,res)=>{
    const {movie,actor} = req.body
    res.send(`The ${movie} of the ${actor} is too good`)
})

app.get("/data",(req,res)=>{
    const {movie,actor} = req.body
    res.send(`The ${movie} of the ${actor} is too good`)
    console.log(req.body.movie)
})

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})
