import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()

const app = express()
    
app.use(cors());

app.use(express.json())


app.post('/transatations', async (req, res) => {

    const transaction = await prisma.transatations.create({
        data:{
            description: req.body.description,
            type: req.body.type,
            category: req.body.category,
            price: req.body.price,
            createdAt: req.body.createdAt
        }
    })
    res.status(201).json(transaction)
})

app.get('/transatations', async (req, res) => {
    let transatations
    if(req.query.description){
        transatations = await prisma.transatations.findMany({
            where:{
               description:{
                contains: req.query.description,
                mode: 'insensitive'
            },
            }
        })
    } else {
        transatations = await prisma.transatations.findMany()
    }
        

    res.status(200).json(transatations)
})



app.put('/transatations/:id', async (req, res) => {

    await prisma.transatations.update({
        where: {
            id: req.params.id
        },
        data:{
            description: req.body.description,
            type: req.body.type,
            category: req.body.category,
            price: req.body.price
        }
    })
    res.status(200).json(req.body)
})

app.delete('/transatations/:id', async (req, res) => {
    await prisma.transatations.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({message: 'Trasanção deletada com sucesso'})
})

app.listen(3000)
