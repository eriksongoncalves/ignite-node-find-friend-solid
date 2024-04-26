import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { PetRegisterUseCase } from '../pet-register-use-case'

export const makePetRegisterFactory = () => {
  const petRepository = new PrismaPetRepository()
  const petRegisterUseCase = new PetRegisterUseCase(petRepository)

  return petRegisterUseCase
}
