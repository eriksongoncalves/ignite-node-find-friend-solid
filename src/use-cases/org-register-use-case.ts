import { hash } from 'bcryptjs'
import { Org } from '@prisma/client'

import { OrgRepository } from '@/repositories/org-repository-interface'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

type OrgRegisterUseCaseRequest = {
  name: string
  email: string
  password: string
  whatsapp: string
  address: string
  number: string
  district: string
  city: string
  state: string
  cep: string
}

export class OrgRegisterUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute(orgData: OrgRegisterUseCaseRequest): Promise<Org> {
    const orgFound = await this.orgRepository.findByEmail(orgData.email)

    if (orgFound) {
      throw new OrgAlreadyExistsError()
    }

    const passwordHash = await hash(orgData.password, 6)

    return await this.orgRepository.create({
      name: orgData.name,
      email: orgData.email,
      password: passwordHash,
      whatsapp: orgData.whatsapp,
      address: {
        create: {
          address: orgData.address,
          cep: orgData.cep,
          city: orgData.city,
          district: orgData.district,
          number: orgData.number,
          state: orgData.state
        }
      }
    })
  }
}
