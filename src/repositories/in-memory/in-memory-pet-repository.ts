import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

import { PetRepository } from '../pet-repository-interface'

export class InMemoryPetRepository implements PetRepository {
  private pets: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const petData: Pet = {
      id: randomUUID(),
      ...data,
      created_at: new Date()
    }

    this.pets.push(petData)

    return Promise.resolve(petData)
  }
}
