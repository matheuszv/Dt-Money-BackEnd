import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  // Adiciona CORS manualmente
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Responde a requisição OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const { id } = req.query

  if (req.method === 'PUT') {
    const updated = await prisma.transatations.update({
      where: { id },
      data: req.body
    })
    return res.status(200).json(updated)
  }

  if (req.method === 'DELETE') {
    await prisma.transatations.delete({ where: { id } })
    return res.status(200).json({ message: 'Transação deletada com sucesso' })
  }

  return res.status(405).end()
}
