import express from 'express'
const router = express.Router()

import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    const submissions = await prisma.submission.findMany()
    res.json(submissions)
})

router.post('/', async (req, res) => {
    const {username, codeLanguage, stdin, timestamp, sourceCode} = req.body
    const submission = await prisma.submission.create({data: {username, codeLanguage, stdin, timestamp, sourceCode}})
    res.json(submission)    
})

export default router