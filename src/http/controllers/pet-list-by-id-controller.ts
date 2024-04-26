import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makePetLisByIdFactory } from '@/use-cases/factories/make-pet-list-by-id-factory'

export const petListByIdController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const paramsSchema = z.object({
    id: z.string().uuid()
  })

  const params = paramsSchema.parse(req.params)

  try {
    const petListByIdUseCase = makePetLisByIdFactory()

    const pet = await petListByIdUseCase.execute(params.id)

    return reply.status(200).send(pet)
  } catch (err) {
    return reply.status(400).send()
  }
}
