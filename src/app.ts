import { fastify } from 'fastify'
import { prisma } from './lib/prisma'

export const app = fastify()

app.get('/', async (_, reply) => {
  const petAges = await prisma.petAge.findMany()

  console.log(petAges)
})
