import { addUser, deleteUser, getUserAll, searchUser, updateUser } from '@/api/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserHandler = defineStore('user', () => {
  const users = ref('')
  const error = ref({})

  const errorMessage = ref('')
  const selectedUser = ref({
    id: '',
    name: '',
    email: '',
    gender: '',
    status: '',
  })

  const user = ref({
    id: '',
    name: '',
    email: '',
    gender: '',
    status: '',
  })

  const isModalOpen = ref(false)

  const getUsersHandler = async () => {
    try {
      const response = await getUserAll()
      users.value = response.data
    } catch (errors) {
      console.log(errors)
    }
  }

  const deleteUserHandler = async (param) => {
    try {
      const response = await deleteUser(param)
      getUsersHandler()
      isModalOpen.value = false
      return response
    } catch (errors) {
      console.log(errors)
    }
  }

  const updateUserHandler = async (data, param) => {
    try {
      const response = await updateUser(data, param)
      getUsersHandler()
      isModalOpen.value = false
      return response
    } catch (errors) {
      const errorHandling = errors.response.data
      error.value = {}
      for (const err of errorHandling) {
        error.value[err.field] = err.message
      }
    }
  }

  const addUserHandler = async (data) => {
    try {
      const response = await addUser(data)
      getUsersHandler()
      isModalOpen.value = false
      resetUser()
      return response
    } catch (errors) {
      const errorHandling = errors.response.data
      error.value = {}
      for (const err of errorHandling) {
        error.value[err.field] = err.message
      }
    }
  }

  // const errorFormHandler = async (data) => {}

  const resetUser = () => {
    user.value = {
      id: '',
      name: '',
      email: '',
      gender: '',
      status: '',
    }
  }

  const fetchUser = async (query) => {
    if (!query) {
      user.value = ''
      getUsersHandler() // Clear results if input is empty
    }

    errorMessage.value = ''

    try {
      const response = await searchUser(query)
      users.value = response.data // Store API response
    } catch (error) {
      errorMessage.value = 'Error fetching users. Please try again.'
      console.error(error)
    }
  }

  return {
    selectedUser,
    getUsersHandler,
    isModalOpen,
    deleteUserHandler,
    updateUserHandler,
    addUserHandler,
    resetUser,
    fetchUser,
    users,
    user,
    error,
  }
})
