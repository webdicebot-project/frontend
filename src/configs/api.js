const api =
  window.location.hostname == 'localhost'
    ? 'http://localhost:8005'
    : window.location.origin

export default api
