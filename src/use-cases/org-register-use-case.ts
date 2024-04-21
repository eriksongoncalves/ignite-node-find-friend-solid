import { hash } from 'bcryptjs'

import { OrgRepository } from '@/repositories/org-repository-interface'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

type DataRequest = {
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
  constructor(private privateOrgRepository: OrgRepository) {}

  async execute(orgData: DataRequest) {
    const orgFound = await this.privateOrgRepository.findByEmail(orgData.email)

    if (orgFound) {
      throw new OrgAlreadyExistsError()
    }

    const passwordHash = await hash(orgData.password, 6)

    return await this.privateOrgRepository.create({
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
