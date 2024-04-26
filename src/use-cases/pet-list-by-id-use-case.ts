import { Pet } from '@prisma/client'

import { PetRepository } from '@/repositories/pet-repository-interface'

export class PetListByIdUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(id: string): Promise<Pet | null> {
    return await this.petRepository.findById(id)
  }
}
