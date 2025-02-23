<template>
  <NavbarComponent></NavbarComponent>

  <main>
    <div class="top-bar">
      <button class="add-item" @click.prevent="handleOpenModal(`add`)">Add User</button>
      <input type="text" v-model="searchQuery" class="search-user" placeholder="search user" />
    </div>
    <ModalComponent v-if="isModalOpen" @close="handleCloseModal()">
      <template #header
        ><p>{{ modalTitle }}</p>
      </template>
      <template #content>
        <!-- Add content -->
        <form v-if="modalType == 'add'" class="form-edit">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" v-model="user.name" />
          <span v-if="error.name != null" class="error"> name {{ error.name }}</span>

          <label for="email">email</label>
          <input type="text" id="email" name="email" v-model="user.email" />
          <span v-if="error.email != null" class="error"> email {{ error.email }}</span>

          <label for="gender">Gender</label>
          <select id="gender" name="gender" v-model="user.gender">
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
          <span v-if="error.gender != null" class="error"> gender {{ error.gender }}</span>

          <label for="status">Status</label>
          <select id="status" name="status" v-model="user.status">
            <option value="inactive">Inactive</option>
            <option value="active">Active</option>
          </select>
          <span v-if="error.status != null" class="error"> status {{ error.status }}</span>
        </form>

        <!-- Edit content -->
        <form v-else-if="modalType == 'edit'" class="form-edit">
          <label for="fname">id</label>
          <input type="text" id="id" name="id" disabled v-model="selectedUser.id" />

          <label for="name">Name</label>
          <input type="text" id="name" name="name" v-model="selectedUser.name" />
          <span v-if="error.name != null" class="error"> name {{ error.name }}</span>

          <label for="email">email</label>
          <input type="text" id="email" name="email" v-model="selectedUser.email" />
          <span v-if="error.email != null" class="error"> email {{ error.email }}</span>

          <label for="gender">Gender</label>
          <select id="gender" name="gender" v-model="selectedUser.gender">
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
          <span v-if="error.gender != null" class="error"> gender {{ error.gender }}</span>

          <label for="status">Status</label>
          <select id="status" name="status" v-model="selectedUser.status">
            <option value="inactive">Inactive</option>
            <option value="active">Active</option>
          </select>
          <span v-if="error.status != null" class="error"> status {{ error.status }}</span>
        </form>

        <!-- View content -->
        <form
          v-else-if="modalType == 'view'"
          @submit.prevent="updateUserHandler(selectedUser, selectedUser.id)"
          class="form-edit"
        >
          <label for="fname">id</label>
          <input type="text" id="id" name="id" disabled v-model="selectedUser.id" />

          <label for="name">Name</label>
          <input type="text" id="name" name="name" v-model="selectedUser.name" disabled />

          <label for="email">email</label>
          <input type="text" id="email" name="email" v-model="selectedUser.email" disabled />

          <label for="gender">Gender</label>
          <select id="gender" name="gender" v-model="selectedUser.gender" disabled>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>

          <label for="status">Status</label>
          <select id="status" name="status" v-model="selectedUser.status" disabled>
            <option value="inactive">Inactive</option>
            <option value="active">Active</option>
          </select>
        </form>

        <!-- Delete content -->
        <p v-else>Are you sure want to delete {{ selectedUser.name }}?</p>
      </template>
      <template #footer>
        <div v-if="modalType == 'add'" class="modal-footer">
          <button class="proceed" @click.prevent="addUserHandler(user)">YES</button>
          <button class="cancel" @click.prevent="handleCloseModal()">NO</button>
        </div>
        <!-- Delete footer -->
        <div v-else-if="modalType == 'delete'" class="modal-footer">
          <button class="proceed" @click.prevent="deleteUserHandler(selectedUser.id)">YES</button>
          <button class="cancel" @click.prevent="handleCloseModal()">NO</button>
        </div>

        <!-- Edit footer -->
        <div v-else-if="modalType == 'edit'" class="modal-footer">
          <input
            type="submit"
            value="Edit"
            @click.prevent="updateUserHandler(selectedUser, selectedUser.id)"
          />
        </div>

        <!-- View footer -->
        <div v-else-if="modalType == 'view'" class="modal-footer">
          <button class="cancel" @click.prevent="isModalOpen = false">Close</button>
        </div>
      </template>
    </ModalComponent>
    <TableComponent :users="users" @open-modal="handleOpenModal" />
  </main>

  <FooterComponent></FooterComponent>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import TableComponent from '@/components/TableComponent.vue'
import ModalComponent from './components/ModalComponent.vue'
import { storeToRefs } from 'pinia'
import { useUserHandler } from '@/stores/userHandler'
import { computed } from 'vue'

const modalType = ref('')
const searchQuery = ref()
let timeout = null

const store = useUserHandler()
const { users, user, isModalOpen, error, selectedUser } = storeToRefs(store)
const {
  getUsersHandler,
  deleteUserHandler,
  updateUserHandler,
  addUserHandler,
  resetUser,
  fetchUser,
} = store

watch(searchQuery, (newQuery) => {
  clearTimeout(timeout) // Clear previous timeout if the user keeps typing
  timeout = setTimeout(() => {
    fetchUser(newQuery)
  }, 500) // Waits 500ms before making an API call
})

const modalTitle = computed(() => {
  if (modalType.value == 'delete') return 'Delete Confirmation'
  if (modalType.value == 'edit') return 'Edit Info'
  if (modalType.value == 'view') return 'Info'
  return 'Confirmation'
})

const handleOpenModal = (type, user) => {
  modalType.value = type
  selectedUser.value = { ...selectedUser.value, ...user }
  isModalOpen.value = true
}

const handleCloseModal = () => {
  isModalOpen.value = false
  error.value = {} // ✅ Reset errors when closing modal
  resetUser()
}

onMounted(() => {
  getUsersHandler()
})
</script>

<style>
main {
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60vw;
  align-self: center;
}

.top-bar {
  display: flex;
  width: 60vw;
  justify-content: flex-end;
  margin-bottom: 1em;
  gap: 5px;
}

.top-bar button {
  background-color: #04aa6d; /* Green */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: var(--font-lg);
}

.top-bar input[type='text'] {
  padding: 10px 20px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-edit {
  display: flex;
  flex-direction: column;
  font-size: var(--font-xl);
}

.form-edit input[type='text'],
select {
  width: 100%;
  padding: 10px 20px;
  margin: 6px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.modal-footer {
  gap: 10px;
  display: flex;
  background-color: none;
}

.modal-footer input[type='submit'] {
  width: 100%;
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-footer input[type='submit']:hover {
  background-color: #45a049;
}

.modal-footer button {
  border: none;
  color: white;
  padding: 5px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: var(--font-lg);
  cursor: pointer;
}

.proceed {
  background-color: #04aa6d;
}

.cancel {
  background-color: #e70e0e;
}

.error {
  color: #e70e0e;
  font-size: var(--font-sm);
  font-style: italic;
}
</style>
