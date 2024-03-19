import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json({message: "hello, world"})
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`)
});