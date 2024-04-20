import { app } from '@/app'
import { env } from '@/env'

app.listen({ port: env.PORT }, () => {
  console.log(`App is running on port ${env.PORT}`)
})
