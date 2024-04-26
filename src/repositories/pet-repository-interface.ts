import { Prisma, Pet } from '@prisma/client'

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findMany(where: Prisma.PetWhereInput): Promise<Pet[]>
}
