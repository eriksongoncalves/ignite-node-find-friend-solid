import { FastifyInstance } from 'fastify'

import { orgRegisterController } from './controllers/org-register-controller'
import { authController } from './controllers/auth-controller'
import { petRegisterController } from './controllers/pet-register-controller'
import { petListController } from './controllers/pet-list-controller'
import { verifyAuthMiddleware } from './middlewares/check-auth-middleware'

export async function appRoutes(app: FastifyInstance) {
  app.post('/org', orgRegisterController)
  app.post('/auth', authController)

  app.get('/pets', petListController)
  app.post('/pet', { onRequest: [verifyAuthMiddleware] }, petRegisterController)
}
