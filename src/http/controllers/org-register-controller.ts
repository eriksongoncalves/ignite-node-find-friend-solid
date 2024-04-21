import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeOrgRegisterFactory } from '@/use-cases/factories/make-org-register-factory'

export const orgRegisterController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const orgSchema = z
    .object({
      name: z.string(),
      email: z
        .string()
        .email()
        .transform(email => email.toLowerCase()),
      password: z.string(),
      confirm_password: z.string(),
      whatsapp: z.string().min(11),
      address: z.string().min(3),
      number: z.string(),
      district: z.string().min(3),
      city: z.string().min(3),
      state: z
        .string()
        .min(2)
        .max(2)
        .transform(state => state.toUpperCase()),
      cep: z.string().min(9).max(9)
    })
    .refine(data => data.confirm_password === data.password, {
      message: 'The passwords did not match',
      path: ['confirm_password']
    })

  const orgBodyData = orgSchema.parse(req.body)

  try {
    const orgRegisterUseCase = makeOrgRegisterFactory()

    const org = await orgRegisterUseCase.execute(orgBodyData)

    return reply.status(201).send(org)
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(400).send(err.message)
    }

    return reply.status(400).send()
  }
}
