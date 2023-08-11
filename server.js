const express = require("express")
const axios = require("axios")
const cors = require("cors")
require("dotenv").config()

const app = express()
const port = process.env.PORT || 5000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

const apiKey = process.env.API_KEY

app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳')
})

app.get('/api/title/:keyword', async (req, res) => {
    const { keyword } = req.params
    const encodedKeyword = encodeURIComponent(keyword)
    try {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${encodedKeyword}`)
        res.status(200).json(response.data)
    }
    catch (error) {
        console.error(error)
        res.sendStatus(500).json({ error: 'Server Error!' })
    }
})

 

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})