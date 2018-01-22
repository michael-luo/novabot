import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `/api`,
    withCredentials: true
  })
}
