<template>
  <table class="table table-condensed">
    <thead>
      <tr>
        <th>Visit Date</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="visit in pet.visits" :key="visit.id">
        <td>{{ visit.date }}</td>
        <td>{{ visit.description }}</td>
        <td>
          <router-link :to="{ name: 'edit visit', params: { visitId: visit.id } }"
            class="btn btn-sm btn-outline-success me-2">
            Edit
          </router-link>
          <button class="btn btn-sm btn-outline-danger" @click="deleteVisit(visit.id)">
            Delete
          </button>
        </td>
      </tr>
      <tr v-if="!pet.visits || pet.visits.length === 0">
        <td colspan="2" class="text-muted">No visits found for this pet.</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
//import { useRoute, useRouter } from 'vue-router';
import api from '@/services/api';

const props = defineProps({
  // owner: Object,
  pet: Object
});

const pet = props.pet;
//const owner = props.owner;

//const route = useRoute();
//const router = useRouter();

const deleteVisit = async (visitId) => {
  const confirmDelete = confirm('Are you sure you want to delete this visit?');
  if (!confirmDelete) {
    return;
  }
  try {
    await api.deleteVisit(visitId);
    pet.visits = pet.visits.filter(visit => visit.id !== visitId);
  } catch (error) {
    console.error('Error deleting visit:', error);
  }
};

</script>

<style scoped>
/* Aligning Definition Lists to look like the Angular PetClinic */

dl.row {
  margin-bottom: 0;
}

dt {
  font-weight: bold;
}
</style>
