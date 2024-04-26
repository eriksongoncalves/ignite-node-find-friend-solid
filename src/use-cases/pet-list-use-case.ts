import { Pet } from '@prisma/client'

import { PetRepository } from '@/repositories/pet-repository-interface'

type PeListUseCaseFilters = {
  city: string
  size_id?: number
  age_id?: number
  level_energy_id?: number
  enviroment_id?: number
  level_independence_id?: number
}

export class PetListUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(filters: PeListUseCaseFilters): Promise<Pet[]> {
    return await this.petRepository.findMany({
      size_id: filters?.size_id,
      age_id: filters?.age_id,
      level_energy_id: filters?.level_energy_id,
      enviroment_id: filters?.enviroment_id,
      level_independence_id: filters?.level_independence_id,
      org: {
        address: {
          city: {
            startsWith: filters.city
          }
        }
      }
    })
  }
}
