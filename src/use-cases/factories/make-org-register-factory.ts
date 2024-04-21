import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'
import { OrgRegisterUseCase } from '../org-register-use-case'

export const makeOrgRegisterFactory = () => {
  const orgRepository = new PrismaOrgRepository()
  const orgRegisterUseCase = new OrgRegisterUseCase(orgRepository)

  return orgRegisterUseCase
}
