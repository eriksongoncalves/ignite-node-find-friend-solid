import { FastifyInstance } from 'fastify'

import { orgRegisterController } from './controllers/org-register-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/org', orgRegisterController)
}
