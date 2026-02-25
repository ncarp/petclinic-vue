<template>
  <div class="container-fluid">
    <div class="container xd-container">
      <h2>{{ isEdit ? 'Edit' : 'Add' }} Specialty</h2>
      <form id="specialty" class="form-inline was-validated" @submit.prevent="save">
        <div class="form-group" hidden="true">
          <input type="text" hidden="true" class="form-control" id="id" v-model="specialty.id" name="id" />
        </div>
        <div class="form-group has-feedback">
          <div class="form-group has-feedback mb-3 row">
            <label class="col-sm-1 offset-sm-1 col-form-label">Name</label>
            <div class="col-sm-6">
              <input id="name" name="name" class="form-control" type="text" minlength="1" maxlength="80"
                pattern="^[A-Za-z0-9].{0,79}$" required v-model="specialty.name" />
              <span class="invalid-feedback" v-if="submitted && !specialty.name">Name is required</span>
            </div>
            <div class="col-sm-4">
              <button class="btn btn-primary me-2" type="submit">{{ isEdit ? 'Update' : 'Save' }}</button>
              <button class="btn btn-secondary" type="button" @click="cancel">Cancel</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from '@/services/api'

const route = useRoute()
const router = useRouter()

const specialty = ref({ id: null, name: "" });
const submitted = ref(false);

const isEdit = computed(() => !!route.params.specialtyId);

onMounted(async () => {
  try {
    if (isEdit.value) {
      const { data } = await api.getSpecialtyById(route.params.specialtyId);
      specialty.value = data;
    }
  } catch (error) {
    console.error('Error fetching specialty:', error)
  }
});

const save = async () => {
  submitted.value = true;

  if (!specialty.value.name) return;

  const save = isEdit.value ? api.updateSpecialty(specialty.value.id, specialty.value) : api.createSpecialty(specialty.value);
  save.then(() => {
    router.push({ name: 'specialties' })
  }).catch(error => {
    console.error('Error saving specialty:', error)
  })
}

const cancel = () => {
  router.push({ name: 'specialties' });
}

</script>

<style scoped></style>
