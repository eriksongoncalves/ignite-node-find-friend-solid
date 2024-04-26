import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { PetListUseCase } from './pet-list-use-case'
import { mockCreatePetData } from '@/utils/tests/createAPet'

let inMemoryPetRepository: InMemoryPetRepository
let petListUseCase: PetListUseCase

describe('PetListUseCase', () => {
  beforeEach(() => {
    inMemoryPetRepository = new InMemoryPetRepository()
    petListUseCase = new PetListUseCase(inMemoryPetRepository)
  })

  it('should be able to list pets', async () => {
    await inMemoryPetRepository.create(mockCreatePetData)

    const pets = await petListUseCase.execute({ city: 'São Paulo' })

    expect(pets.length).toBe(1)
  })

  it('should be return a empty list when there is no data', async () => {
    await inMemoryPetRepository.create(mockCreatePetData)

    const pets = await petListUseCase.execute({ city: 'Fortaleza' })

    expect(pets.length).toBe(0)
  })
})
