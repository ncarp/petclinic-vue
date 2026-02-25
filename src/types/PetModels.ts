// 1. Define the simple sub-types first
export interface PetType {
  id: number
  name: string
}

export interface Owner {
  id: number
  firstName: string
  lastName: string
}

// 2. Define the main type using the sub-types
export interface Pet {
  id: number
  name: string
  birthDate: string // Format: YYYY-MM-DD
  type: PetType // nesting the interface here
  ownerId: number // referencing the owner by ID
}

export interface Visit {
  id: number
  date: string // YYYY-MM-DD
  description: string
  petId: number
}
