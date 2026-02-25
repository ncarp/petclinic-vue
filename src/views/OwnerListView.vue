<template>
  <div class="container-fluid">
    <div class="container xd-container">
      <h2>Owners</h2>
      <!-- <form method="get" class="form-horizontal" id="search-owner-form"> -->
      <div class="form-group">
        <div class="control-group" id="lastNameGroup">
          <label class="col-sm-2 control-label">Last name </label>
          <div class="col-sm-10">
            <input class="form-control" size="30" maxlength="80" id="lastName" name="lastName" v-model="lastName"
              value="" /> <span class="help-inline"></span>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="submit" class="btn btn-primary my-2" @click="searchByLastName(lastName)">Find
            Owner</button>
        </div>
      </div>
      <!-- </form> -->

      <div v-if="!owners">No owners with LastName starting with "{{ lastName }}"</div>
      <div class="table-responsive" id="ownersTable" v-if="owners">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>City</th>
              <th>Telephone</th>
              <th>Pets</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="owner in ownersList" :key="owner.id">
              <td class="ownerFullName"><router-link :to="`/owners/${owner.id}`" routerLinkActive="active"
                  @click="onSelect(owner.id)">{{ owner.firstName }} {{ owner.lastName }}</router-link></td>
              <td>{{ owner.address }}</td>
              <td>{{ owner.city }}</td>
              <td>{{ owner.telephone }}</td>
              <td>
                <!--
                <ul>
                  <li v-for="pet in owner.pets" :key="pet.id">
                    {{ pet.name }}
                  </li>
                </ul>
                -->
                <span v-if="!owner.pets.length">none</span>
                <span v-for="(pet, idx) in owner.pets" :key="pet.id">
                  {{ pet.name }}<span v-if="idx < owner.pets.length - 1">, </span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <button class="btn btn-primary" @click="addOwner">Add Owner</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import { useRouter } from 'vue-router'

const owners = ref([])
const router = useRouter()
const ownersList = ref([])

let lastName = ''

onMounted(
  async () => {
    try {
      const response = await api.getOwners()
      owners.value = response.data
      ownersList.value = response.data
    } catch (error) {
      console.error('Error fetching owners:', error)
    }
  }
)

function onSelect(ownerId) {
  router.push({ name: 'owner details', params: { ownerId } })
}

function searchByLastName(lastName) {
  let tempOwners = this.owners;
  console.log('contador1: ' + this.owners.length)
  console.log('contador2: ' + tempOwners.length)
  console.log('inside search by last name starting with ' + (lastName));

  // if (lastName === '') {
  //   this.ownerService.getOwners()
  //     .subscribe(
  //       (owners) => {
  //         this.owners = owners;
  //       });
  // }

  if (lastName !== '') {
    tempOwners = tempOwners.filter((owner) => {
      return owner.lastName
        .toUpperCase()
        .includes(lastName.toUpperCase())
    })
  }

  // if (lastName !== '') {
  //   this.ownerService.searchOwners(lastName)
  //     .subscribe(
  //       (owners) => {

  //         this.owners = owners;
  //         console.log('this.owners ' + this.owners);

  //       },
  //       (error) => {
  //         this.owners = null;
  //       }
  //     );

  // }

  this.ownersList = tempOwners
}

function addOwner() {
  router.push({ name: 'add owner' })
}

</script>

<style scoped></style>
