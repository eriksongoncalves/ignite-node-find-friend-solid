import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makePetRegisterFactory } from '@/use-cases/factories/make-pet-register-factory'

export const petRegisterController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const petSchema = z.object({
    name: z.string(),
    description: z.string(),
    org_id: z.string().uuid(),
    size_id: z.number(),
    age_id: z.number(),
    level_energy_id: z.number(),
    enviroment_id: z.number(),
    level_independence_id: z.number(),
    requirements: z.array(z.string())
  })

  const petBodyData = petSchema.parse(req.body)

  try {
    const petRegisterUseCase = makePetRegisterFactory()

    const pet = await petRegisterUseCase.execute(petBodyData)

    return reply.status(201).send(pet)
  } catch (err) {
    return reply.status(400).send()
  }
}
