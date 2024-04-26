import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { PetListByIdUseCase } from '../pet-list-by-id-use-case'

export const makePetLisByIdFactory = () => {
  const petRepository = new PrismaPetRepository()
  const petListUseCase = new PetListByIdUseCase(petRepository)

  return petListUseCase
}
