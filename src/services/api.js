import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL || 'http://localhost:9966/petclinic/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default {
  // Owners
  getOwners() {
    return apiClient.get('/owners')
  },
  getOwnerById(id) {
    return apiClient.get(`/owners/${id}`)
  },
  createOwner(owner) {
    return apiClient.post('/owners', owner)
  },
  updateOwner(id, owner) {
    return apiClient.put(`/owners/${id}`, owner)
  },
  deleteOwner(id) {
    return apiClient.delete(`/owners/${id}`)
  },
  // Pets
  getPets() {
    return apiClient.get('/pets')
  },
  getPetById(id) {
    return apiClient.get(`/pets/${id}`)
  },
  createPet(pet) {
    return apiClient.post('/pets', pet)
  },
  createPetForOwner(ownerId, pet) {
    return apiClient.post(`/owners/${ownerId}/pets`, pet)
  },
  updatePet(id, pet) {
    return apiClient.put(`/pets/${id}`, pet)
  },
  deletePet(id) {
    return apiClient.delete(`/pets/${id}`)
  },
  // Vets
  getVets() {
    return apiClient.get('/vets')
  },
  getVetById(id) {
    return apiClient.get(`/vets/${id}`)
  },
  createVet(vet) {
    return apiClient.post('/vets', vet)
  },
  updateVet(id, vet) {
    return apiClient.put(`/vets/${id}`, vet)
  },
  deleteVet(id) {
    return apiClient.delete(`/vets/${id}`)
  },
  // Pet Typess
  getPetTypes() {
    return apiClient.get('/pettypes')
  },
  getPetTypeById(id) {
    return apiClient.get(`/pettypes/${id}`)
  },
  createPetType(pettype) {
    return apiClient.post('/pettypes', pettype)
  },
  updatePetType(id, pettype) {
    return apiClient.put(`/pettypes/${id}`, pettype)
  },
  deletePetType(id) {
    return apiClient.delete(`/pettypes/${id}`)
  },
  // Visits
  getVisits() {
    return apiClient.get('/visits')
  },
  getVisitById(id) {
    return apiClient.get(`/visits/${id}`)
  },
  createVisit(visit) {
    return apiClient.post('/visits', visit)
  },
  updateVisit(id, visit) {
    return apiClient.put(`/visits/${id}`, visit)
  },
  deleteVisit(id) {
    return apiClient.delete(`/visits/${id}`)
  },
  // Specialties
  getSpecialties() {
    return apiClient.get('/specialties')
  },
  getSpecialtyById(id) {
    return apiClient.get(`/specialties/${id}`)
  },
  createSpecialty(specialty) {
    return apiClient.post('/specialties', specialty)
  },
  updateSpecialty(id, specialty) {
    return apiClient.put(`/specialties/${id}`, specialty)
  },
  deleteSpecialty(id) {
    return apiClient.delete(`/specialties/${id}`)
  },
}
