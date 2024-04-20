import { fastify } from 'fastify'

export const app = fastify()

app.get('/', (_, reply) => {
  reply.send({ ok: true })
})
