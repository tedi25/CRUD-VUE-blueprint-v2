import axios from 'axios'

const token = import.meta.env.VITE_TOKEN_API

const header = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
}

export function getUserAll() {
  return axios.get('https://gorest.co.in/public/v2/users?per_page=5', header)
}

export function searchUser(param) {
  return axios.get(`https://gorest.co.in/public/v2/users?name=${param}&per_page=5`, header)
}

export function deleteUser(param) {
  return axios.delete(`https://gorest.co.in/public/v2/users/${param}`, header)
}

export function updateUser(data, param) {
  return axios.put(`https://gorest.co.in/public/v2/users/${param}`, data, header)
}

export function addUser(data) {
  return axios.post('https://gorest.co.in/public/v2/users', data, header)
}
