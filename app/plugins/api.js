import axios from 'axios'

export default ({ app, redirect }, inject) => {
  const defaultOptions = {
    reqHandleFunc: (config) => { return config },
    reqErrorFunc: error => Promise.reject(error),
    resHandleFunc: response => response,
    resErrorFunc: (error) => { return Promise.reject(error) },
    baseURL: process.env.SITE_API_HOST
  }

  const initOptions = {
    ...defaultOptions
  }

  const service = axios.create(initOptions)

  service.interceptors.request.use(
    config => initOptions.reqHandleFunc(config),
    error => initOptions.reqErrorFunc(error)
  )
  service.interceptors.response.use(
    response => initOptions.resHandleFunc(response),
    error => initOptions.resErrorFunc(error)
  )
  function action (opt) {
    return service(opt)
  }
  const $http = {
    token: null,
    loginRedirect: true,
    get: (url, data, options) => {
      const axiosOpt = {
        ...options,
        ...{
          method: 'get',
          url,
          params: data
        }
      }
      return action(axiosOpt)
    },
    post: (url, data, options) => {
      const axiosOpt = {
        ...options,
        ...{
          method: 'post',
          url,
          data
        }
      }
      return action(axiosOpt)
    }
  }
  inject('http', $http)
}
