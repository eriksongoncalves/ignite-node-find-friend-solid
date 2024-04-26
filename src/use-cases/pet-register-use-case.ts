import { Pet, Prisma } from '@prisma/client'

import { PetRepository } from '@/repositories/pet-repository-interface'

type PetRegisterUseCaseRequest = {
  name: string
  description: string
  org_id: string
  size_id: number
  age_id: number
  level_energy_id: number
  enviroment_id: number
  level_independence_id: number
  requirements?: string[]
}

export class PetRegisterUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(petData: PetRegisterUseCaseRequest): Promise<Pet> {
    const requirements = petData.requirements || []

    const data: Prisma.PetUncheckedCreateInput = {
      name: petData.name,
      description: petData.description,
      org_id: petData.org_id,
      size_id: petData.size_id,
      age_id: petData.age_id,
      level_energy_id: petData.level_energy_id,
      enviroment_id: petData.enviroment_id,
      level_independence_id: petData.level_independence_id,
      PetRequirements: {
        create: requirements.map(item => ({
          description: item
        }))
      }
    }

    return await this.petRepository.create(data)
  }
}
