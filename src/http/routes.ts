import { FastifyInstance } from 'fastify'

import { orgRegisterController } from './controllers/org-register-controller'
import { authController } from './controllers/auth-controller'
import { petRegisterController } from './controllers/pet-register-controller '

export async function appRoutes(app: FastifyInstance) {
  app.post('/org', orgRegisterController)
  app.post('/auth', authController)

  app.post('/pet', petRegisterController)
}
