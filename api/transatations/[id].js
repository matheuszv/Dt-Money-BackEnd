import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const updated = await prisma.transatations.update({
      where: { id },
      data: req.body
    });
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    await prisma.transatations.delete({ where: { id } });
    return res.status(200).json({ message: 'Transação deletada com sucesso' });
  }

  res.status(405).end();
}
