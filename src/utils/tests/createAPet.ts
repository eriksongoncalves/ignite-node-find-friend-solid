import { PetRepository } from '@/repositories/pet-repository-interface'

export const mockCreatePetData = {
  name: 'Alfredo',
  description:
    'Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
  org_id: '5ee91a38-ed3c-4d0c-bcda-641e54d4f61d',
  size_id: 1,
  age_id: 1,
  level_energy_id: 1,
  enviroment_id: 1,
  level_independence_id: 1,
  requirements: [
    'Local grande para o animal correr e brincar.',
    'Proibido apartamento',
    'Ambiente frio, pois possui muito pelo.',
    'Cão com intolerância a lactose.'
  ],
  org: {
    address: {
      city: 'São Paulo'
    }
  }
}

export async function createAPet(petRepository: PetRepository) {
  return await petRepository.create(mockCreatePetData)
}
