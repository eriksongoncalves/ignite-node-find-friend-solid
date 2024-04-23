import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { AuthError } from '@/use-cases/errors/org-already-exists-error copy'
import { makeAuthFactory } from '@/use-cases/factories/make-auth-factory'
import { env } from '@/env'

export const authController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const authSchema = z.object({
    email: z
      .string()
      .email()
      .transform(email => email.toLowerCase()),
    password: z.string()
  })

  const authBodyData = authSchema.parse(req.body)

  try {
    const authUseCase = makeAuthFactory()

    const org = await authUseCase.execute(authBodyData)

    const token = await reply.jwtSign(
      {},
      { sign: { sub: org.id, expiresIn: env.JWT_EXPIRE } }
    )

    return reply.status(200).send({
      token,
      org
    })
  } catch (err) {
    if (err instanceof AuthError) {
      return reply.status(400).send(err.message)
    }

    return reply.status(400).send()
  }
}
