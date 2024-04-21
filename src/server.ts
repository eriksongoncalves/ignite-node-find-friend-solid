import { app } from '@/app'
import { env } from '@/env'

app.listen({ host: env.HOST, port: env.PORT }, () => {
  console.log(`App is running on port ${env.PORT}`)
})
