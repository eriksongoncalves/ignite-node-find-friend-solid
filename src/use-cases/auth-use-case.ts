import { compareSync } from 'bcryptjs'

import { OrgRepository } from '@/repositories/org-repository-interface'
import { AuthError } from './errors/org-already-exists-error copy'

type AuthUseCaseRequest = {
  email: string
  password: string
}

type AuthUseCaseResponse = {
  id: string
  name: string
  email: string
}

export class AuthUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute(orgData: AuthUseCaseRequest): Promise<AuthUseCaseResponse> {
    const orgFound = await this.orgRepository.findByEmail(orgData.email)

    if (!orgFound) {
      throw new AuthError()
    }

    const isPasswordValid = compareSync(orgData.password, orgFound.password)

    if (!isPasswordValid) {
      throw new AuthError()
    }

    return {
      id: orgFound.id,
      name: orgFound.name,
      email: orgFound.email
    }
  }
}
