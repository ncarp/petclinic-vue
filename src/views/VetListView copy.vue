<template>
  <div class="container-fluid">
    <div class="container xd-container">
      <h2>Veterinarians</h2>

      <table id="vets" class="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialties</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="vet in vets" :key="vet.id">
            <td>{{ vet.firstName }} {{ vet.lastName }}</td>
            <td>
              <div v-if="!vet.specialties.length">none</div>
              <div v-for="spec in vet.specialties" :key="spec.id">
                {{ spec.name }}
              </div>
            </td>
            <td>
              <button class="btn btn-default" (click)="editVet(vet)">Edit Vet</button>
              <button class="btn btn-default" (click)="deleteVet(vet)">Delete Vet</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button *ngIf="isVetDataReceived" class="btn btn-default" (click)="gotoHome()">Home</button>
        <button *ngIf="isVetDataReceived" class="btn btn-default" (click)="addVet()">
          Add Vet
        </button>
      </div>
    </div>
  </div>

  <!--
  <div>
    <h1>Vets</h1>
    <el-table :data="vets" stripe empty="No data">
      <el-table-column label="Name">
        <template #default="scope"> {{ scope.row.firstName }} {{ scope.row.lastName }} </template>
      </el-table-column>
      <el-table-column label="Specialties">
        <template #default="{ row }">
          <span v-if="!row.specialties.length">none</span>
          <span v-for="spec in row.specialties" :key="spec.id">{{ spec.name }}&nbsp;</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
--></template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import { version } from 'less'

const vets = ref([])

onMounted(async () => {
  try {
    const response = await api.getVets()
    vets.value = response.data
  } catch (error) {
    console.error('Error fetching vets:', error)
  }
})
</script>

<style scoped></style>
