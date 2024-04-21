import { Org, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

import { OrgRepository } from '../org-repository-interface'

export class InMemoryOrgRegister implements OrgRepository {
  private orgs: Org[] = []

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const orgData: Org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      whatsapp: data.whatsapp,
      created_at: new Date()
    }

    this.orgs.push(orgData)

    return Promise.resolve(orgData)
  }
  async findById(id: string): Promise<Org | null> {
    const orgFound = await Promise.resolve(this.orgs.find(org => org.id === id))

    return orgFound || null
  }

  async findByEmail(email: string): Promise<Org | null> {
    const orgFound = await Promise.resolve(
      this.orgs.find(org => org.email === email)
    )

    return orgFound || null
  }
}
