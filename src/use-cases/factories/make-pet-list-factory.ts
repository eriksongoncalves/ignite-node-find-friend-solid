import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { PetListUseCase } from '../pet-list-use-case'

export const makePetListFactory = () => {
  const petRepository = new PrismaPetRepository()
  const petListUseCase = new PetListUseCase(petRepository)

  return petListUseCase
}
