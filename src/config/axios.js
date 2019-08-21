import axios from 'axios'

const success = res => res

const error = err => {
  const codigoNaoAutorizado = 401
  if (codigoNaoAutorizado === err.response.status) {
    window.location = '/'
  } else {
    return Promise.reject(err)
  }
}

axios.interceptors.response.use(success, error)
