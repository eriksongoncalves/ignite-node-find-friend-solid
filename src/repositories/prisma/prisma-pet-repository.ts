import { Pet, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

import { PetRepository } from '../pet-repository-interface'

export class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    return await prisma.pet.create({ data })
  }

  async findMany(where: Prisma.PetWhereInput): Promise<Pet[]> {
    return await prisma.pet.findMany({
      where
    })
  }
}
