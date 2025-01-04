import axios from 'axios'

export const axiosImageInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 30000
})
