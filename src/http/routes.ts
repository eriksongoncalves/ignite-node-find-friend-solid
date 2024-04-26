import { FastifyInstance } from 'fastify'

// AUTH
import { authController } from './controllers/auth-controller'

// ORGS
import { orgRegisterController } from './controllers/org-register-controller'

// PETS
import { petRegisterController } from './controllers/pet-register-controller'
import { petListController } from './controllers/pet-list-controller'
import { petListByIdController } from './controllers/pet-list-by-id-controller'

// MIDDLEWARES
import { verifyAuthMiddleware } from './middlewares/check-auth-middleware'

export async function appRoutes(app: FastifyInstance) {
  app.post('/org', orgRegisterController)
  app.post('/auth', authController)

  app.get('/pets', petListController)
  app.get('/pet/:id', petListByIdController)
  app.post('/pet', { onRequest: [verifyAuthMiddleware] }, petRegisterController)
}
