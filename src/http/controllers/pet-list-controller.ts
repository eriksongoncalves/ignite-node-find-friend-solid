import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makePetListFactory } from '@/use-cases/factories/make-pet-list-factory'

export const petListController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const filtersSchema = z.object({
    city: z.string(),
    size_id: z.coerce.number().optional(),
    age_id: z.coerce.number().optional(),
    level_energy_id: z.coerce.number().optional(),
    enviroment_id: z.coerce.number().optional(),
    level_independence_id: z.coerce.number().optional()
  })

  const filters = filtersSchema.parse(req.query)

  try {
    const petListUseCase = makePetListFactory()

    const pets = await petListUseCase.execute(filters)

    return reply.status(200).send(pets)
  } catch (err) {
    return reply.status(400).send()
  }
}
