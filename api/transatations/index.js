import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    if (req.method === 'GET') {
      const description = req.query.description
      const transatations = description
        ? await prisma.transatations.findMany({
            where: {
              description: {
                contains: description,
                mode: 'insensitive',
              },
            },
          })
        : await prisma.transatations.findMany()
      return res.status(200).json(transatations)
    }

    if (req.method === 'POST') {
      const { description, type, category, price, createdAt } = req.body
      const transaction = await prisma.transatations.create({
        data: { description, type, category, price, createdAt },
      })
      return res.status(201).json(transaction)
    }

    return res.status(405).json({ error: 'Método não permitido' })
  } catch (error) {
    console.error('Erro interno:', error)
    return res.status(500).json({ error: 'Erro interno no servidor' })
  }
}
