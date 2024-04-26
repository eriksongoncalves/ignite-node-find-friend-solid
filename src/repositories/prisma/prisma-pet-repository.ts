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

  async findById(id: string): Promise<Pet | null> {
    return await prisma.pet.findFirst({ where: { id } })
  }
}
