import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'
import { AuthUseCase } from '../auth-use-case'

export const makeAuthFactory = () => {
  const orgRepository = new PrismaOrgRepository()
  const authUseCase = new AuthUseCase(orgRepository)

  return authUseCase
}
