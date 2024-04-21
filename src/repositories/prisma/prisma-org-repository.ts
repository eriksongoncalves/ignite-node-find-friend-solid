import { Org, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { OrgRepository } from '../org-repository-interface'

export class PrismaOrgRepository implements OrgRepository {
  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    return await prisma.org.create({ data })
  }

  async findById(id: string): Promise<Org | null> {
    return await prisma.org.findUnique({ where: { id } })
  }

  async findByEmail(email: string): Promise<Org | null> {
    return await prisma.org.findUnique({ where: { email } })
  }
}
