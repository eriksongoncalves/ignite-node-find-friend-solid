import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { createAnOrg, mockCreateOrgData } from '@/utils/tests/createAnOrg'
import { AuthUseCase } from './auth-use-case'
import { AuthError } from './errors/auth-error'

let inMemoryOrgRepository: InMemoryOrgRepository
let authUseCase: AuthUseCase

describe('AuthUseCase', () => {
  beforeEach(() => {
    inMemoryOrgRepository = new InMemoryOrgRepository()
    authUseCase = new AuthUseCase(inMemoryOrgRepository)
  })

  it('should be able to authenticate', async () => {
    await createAnOrg(inMemoryOrgRepository)

    const org = await authUseCase.execute({
      email: mockCreateOrgData.email,
      password: mockCreateOrgData.password
    })

    expect(org).toMatchObject({
      id: expect.any(String),
      name: mockCreateOrgData.name,
      email: mockCreateOrgData.email
    })
  })

  it('should not be able to authenticate when email not found', async () => {
    await createAnOrg(inMemoryOrgRepository)

    expect(async () => {
      await authUseCase.execute({
        email: 'teste@teste.com.br',
        password: mockCreateOrgData.password
      })
    }).rejects.toBeInstanceOf(AuthError)
  })

  it('should not be able to authenticate when password not found', async () => {
    await createAnOrg(inMemoryOrgRepository)

    expect(async () => {
      await authUseCase.execute({
        email: mockCreateOrgData.email,
        password: 'asdasdada'
      })
    }).rejects.toBeInstanceOf(AuthError)
  })
})
