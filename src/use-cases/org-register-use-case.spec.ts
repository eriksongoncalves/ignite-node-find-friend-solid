import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgRegister } from '@/repositories/in-memory/in-memory-org-register'
import { OrgRegisterUseCase } from './org-register-use-case'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let inMemoryOrgRegister: InMemoryOrgRegister
let orgRegisterUseCase: OrgRegisterUseCase

const mockOrgData = {
  name: 'Org 1',
  email: 'org1@gmail.com',
  password: '123456',
  confirm_password: '123456',
  whatsapp: '11989767791',
  address: 'Rua XPTO',
  number: '80',
  district: 'Vila Xpto',
  city: 'São Paulo',
  state: 'SP',
  cep: '01234-060'
}

describe('OrgRegisterUseCase', () => {
  beforeEach(() => {
    inMemoryOrgRegister = new InMemoryOrgRegister()
    orgRegisterUseCase = new OrgRegisterUseCase(inMemoryOrgRegister)
  })

  it('should be able to register', async () => {
    const org = await orgRegisterUseCase.execute(mockOrgData)

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to register with the same email', async () => {
    await orgRegisterUseCase.execute(mockOrgData)

    expect(async () => {
      await orgRegisterUseCase.execute(mockOrgData)
    }).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
