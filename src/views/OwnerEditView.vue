<template>
  <div class="container-fluid">
    <div class="container xd-container">
      <h2>{{ isEditMode ? 'Owner' : 'New Owner' }}</h2>

      <form @submit.prevent="onSubmit" class="form-horizontal" id="add-owner-form">
        <div class="form-group has-feedback mb-3">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">First Name</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="owner.firstName" required minlength="2" />
            </div>
          </div>
        </div>

        <div class="form-group has-feedback mb-3">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Last Name</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="owner.lastName" required minlength="2" />
            </div>
          </div>
        </div>

        <div class="form-group has-feedback mb-3">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Address</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="owner.address" required />
            </div>
          </div>
        </div>

        <div class="form-group has-feedback mb-3">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">City</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="owner.city" required />
            </div>
          </div>
        </div>

        <div class="form-group has-feedback mb-3">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Telephone</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="owner.telephone" required pattern="\d{10,}"
                title="Telephone must be at least 10 digits" />
              <span v-if="error" class="text-danger">{{ error }}</span>
            </div>
          </div>
        </div>

        <div class="form-group row mb-3">
          <div class="offset-sm-2 col-sm-10">
            <button class="btn btn-primary me-2" type="submit">
              {{ isEditMode ? 'Update Owner' : 'Add Owner' }}
            </button>
            <button class="btn btn-secondary" type="button" @click="goBack">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/services/api';

const route = useRoute();
const router = useRouter();

// Reactive state for the form
const owner = ref({
  id: null,
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  telephone: ''
});

const error = ref('');

// Determine mode based on URL parameter
const isEditMode = computed(() => !!route.params.ownerId);

onMounted(() => {
  if (isEditMode.value) {
    fetchOwner();
  }
});

const fetchOwner = async () => {
  try {
    const response = await api.getOwnerById(route.params.ownerId);
    owner.value = response.data;
  } catch (err) {
    error.value = 'Failed to fetch owner data: ' + err.message;
  }
};

const onSubmit = async () => {
  error.value = '';
  try {
    if (isEditMode.value) {
      await api.updateOwner(route.params.ownerId, owner.value);
    } else {
      await api.createOwner(owner.value);
    }
    router.push({ name: 'owners' });
  } catch (err) {
    error.value = 'Failed to save owner data: ' + err.message;
  }
};

const goBack = () => {
  if (isEditMode.value) {
    router.push(`/owners/${owner.value.id}`);
  } else {
    router.push('/owners');
  }
};

</script>

<style scoped></style>
