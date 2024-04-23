import { hash } from 'bcryptjs'
import { OrgRepository } from '@/repositories/org-repository-interface'

export const mockCreateOrgData = {
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

export async function createAnOrg(orgRepository: OrgRepository) {
  const passwordHash = await hash(mockCreateOrgData.password, 6)

  return await orgRepository.create({
    name: mockCreateOrgData.name,
    email: mockCreateOrgData.email,
    password: passwordHash,
    whatsapp: mockCreateOrgData.whatsapp,
    address: {
      create: {
        address: mockCreateOrgData.address,
        cep: mockCreateOrgData.cep,
        city: mockCreateOrgData.city,
        district: mockCreateOrgData.district,
        number: mockCreateOrgData.number,
        state: mockCreateOrgData.state
      }
    }
  })
}
