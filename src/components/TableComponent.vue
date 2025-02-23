<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Gender</th>
        <th>Status</th>
        <th colspan="3">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.gender }}</td>
        <td>{{ user.status }}</td>
        <td>
          <button class="deleteBtn" @click="emit('openModal', 'delete', user)">Delete</button>
        </td>
        <td><button class="viewBtn" @click="emit('openModal', 'view', user)">View</button></td>
        <td><button class="editBtn" @click="emit('openModal', 'edit', user)">Edit</button></td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  users: Array, // Receive items from parent
})
const emit = defineEmits(['openModal'])
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

th,
td {
  border: 1px solid #ffffffaf;
  font-size: var(--font-base);
  padding: 8px;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

th {
  background-color: #04aa6d;
  color: var(--vt-c-white-soft);
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

td button {
  border: none;
  color: white;
  padding: 5px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: var(--font-lg);
  cursor: pointer;
}

.deleteBtn {
  background-color: #e70e0e; /* Green */
}

.viewBtn {
  background-color: #0265b6;
}

.editBtn {
  background-color: #cab019;
}
</style>
