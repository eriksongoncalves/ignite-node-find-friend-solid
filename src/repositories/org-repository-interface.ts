import { Prisma, Org } from '@prisma/client'

export interface OrgRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>
  findById(id: string): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
}
