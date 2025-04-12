import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const description = req.query.description;
    const result = description
      ? await prisma.transatations.findMany({
          where: {
            description: {
              contains: description,
              mode: 'insensitive'
            }
          }
        })
      : await prisma.transatations.findMany();
    return res.status(200).json(result);
  }

  if (req.method === 'POST') {
    const data = req.body;
    const transaction = await prisma.transatations.create({ data });
    return res.status(201).json(transaction);
  }

  res.status(405).end(); // Método não permitido
}