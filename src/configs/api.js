const api =
  process.env.NODE_ENV == 'development'
    ? 'http://localhost:8005'
    : window.location.origin

// console.log(process.env.NODE_ENV)
export default api
