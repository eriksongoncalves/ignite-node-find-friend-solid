import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

import { PetRepository } from '../pet-repository-interface'

type Pets = Pet & {
  org?: {
    address?: {
      city: {
        starts_with: string
      }
    }
  }
}

export class InMemoryPetRepository implements PetRepository {
  private pets: Pets[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const petData: Pet = {
      id: randomUUID(),
      ...data,
      created_at: new Date()
    }

    this.pets.push(petData)

    return Promise.resolve(petData)
  }

  async findMany({
    size_id,
    age_id,
    level_energy_id,
    enviroment_id,
    level_independence_id,
    org
  }: Prisma.PetWhereInput): Promise<Pet[]> {
    const isThereOptionalsFilters =
      size_id ||
      age_id ||
      level_energy_id ||
      enviroment_id ||
      level_independence_id

    const petsFiltered = this.pets.filter(
      pet =>
        pet.org?.address?.city === org?.address?.city?.startsWith &&
        (isThereOptionalsFilters
          ? pet.size_id === size_id ||
            pet.age_id === age_id ||
            pet.level_energy_id === level_energy_id ||
            pet.enviroment_id === enviroment_id ||
            pet.level_independence_id === level_independence_id
          : true)
    )

    return Promise.resolve(petsFiltered)
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.pets.find(pet => pet.id === id)

    return await Promise.resolve(pet || null)
  }
}
