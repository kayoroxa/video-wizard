import axios from 'axios'

const axiosApi = axios.create({
  baseURL: 'http://localhost:4011/',
  // headers: {
  //   Authorization: 'Bearer ' + localStorage.getItem('token'),
  // },
})

export { axiosApi }
