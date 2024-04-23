import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { mockCreateOrgData } from '@/utils/tests/createAnOrg'
import { OrgRegisterUseCase } from './org-register-use-case'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let inMemoryOrgRepository: InMemoryOrgRepository
let orgRegisterUseCase: OrgRegisterUseCase

describe('OrgRegisterUseCase', () => {
  beforeEach(() => {
    inMemoryOrgRepository = new InMemoryOrgRepository()
    orgRegisterUseCase = new OrgRegisterUseCase(inMemoryOrgRepository)
  })

  it('should be able to register', async () => {
    const org = await orgRegisterUseCase.execute(mockCreateOrgData)

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to register with the same email', async () => {
    await orgRegisterUseCase.execute(mockCreateOrgData)

    expect(async () => {
      await orgRegisterUseCase.execute(mockCreateOrgData)
    }).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
