import express from 'express'
const router = express.Router()

import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

console.log(process.env.REDIS_URL)
import Redis from 'ioredis'
const client = new Redis(process.env.REDIS_URL)

router.get('/', async (req, res) => {
    const cache = await client.get('submissions')
    if(cache){
        // console.log(cache)
        return res.json(JSON.parse(cache))
    }else{
        const submissions = await prisma.submission.findMany()
        await client.set('submissions', JSON.stringify(submissions))
        await client.expire('submissions', 100)
        return res.json(submissions)
    }
})

router.post('/', async (req, res) => {
    const {username, codeLanguage, stdin, stdout, timestamp, sourceCode} = req.body
    const submission = await prisma.submission.create({data: {username, codeLanguage, stdin, stdout, timestamp, sourceCode}})
    res.json(submission)    
})

export default router