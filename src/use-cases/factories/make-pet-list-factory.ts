import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { PetListByIdUseCase } from '../pet-list-by-id-use-case'

export const makePetListByIdFactory = () => {
  const petRepository = new PrismaPetRepository()
  const petListByIdUseCase = new PetListByIdUseCase(petRepository)

  return petListByIdUseCase
}
