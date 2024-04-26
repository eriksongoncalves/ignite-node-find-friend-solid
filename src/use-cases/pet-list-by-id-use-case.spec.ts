import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { PetListByIdUseCase } from './pet-list-by-id-use-case'
import { mockCreatePetData } from '@/utils/tests/createAPet'

let inMemoryPetRepository: InMemoryPetRepository
let petListByIdUseCase: PetListByIdUseCase

describe('PetListByIdUseCase', () => {
  beforeEach(() => {
    inMemoryPetRepository = new InMemoryPetRepository()
    petListByIdUseCase = new PetListByIdUseCase(inMemoryPetRepository)
  })

  it('should be able to find a pet by id', async () => {
    const petCreated = await inMemoryPetRepository.create(mockCreatePetData)

    const pet = await petListByIdUseCase.execute(petCreated.id)

    expect(pet).toMatchObject(petCreated)
  })

  it('should be return null when there is no data', async () => {
    await inMemoryPetRepository.create(mockCreatePetData)

    const pet = await petListByIdUseCase.execute('123456')

    expect(pet).toBeNull()
  })
})
