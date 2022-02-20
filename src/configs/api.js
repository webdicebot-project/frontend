const api =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8000'
    : window.location.origin

// console.log(process.env.NODE_ENV)
export default api
