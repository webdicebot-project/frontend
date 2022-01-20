<template>
  <div>
    <router-link to="/my-license">
      <CButton color="secondary" class="mb-3"> Back </CButton>
    </router-link>

    <CCard class="mb-4">
      <CCardBody>
        <div class="mb-3">
          <CFormLabel>License</CFormLabel>
          <CFormInput type="text" v-model="license" />
        </div>

        <div class="d-grid gap-2">
          <CButton v-if="isLoading" disabled>
            <CSpinner size="sm" />
          </CButton>

          <CButton v-else color="primary" @click="importLicense">
            Import
          </CButton>
        </div>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      isLoading: false,
      license: '',
    }
  },
  methods: {
    async importLicense(e) {
      e.preventDefault()
      try {
        this.isLoading = true
        const { data } = await axios.get(
          '/license/import?license=' + this.license,
        )
        this.isLoading = false
        // console.log(data)
        this.notify(data)
      } catch (error) {
        this.isLoading = false
        // console.error(error)
        this.notify(error.response.data.message)
        if (
          error.response.data.message == 'jwt expired' ||
          error.response.data.message == 'jwt malformed' ||
          error.response.data.message == 'invalid signature'
        ) {
          this.notify('Session expired')
          this.logout()
        }
      }
    },
  },
}
</script>

<style></style>
