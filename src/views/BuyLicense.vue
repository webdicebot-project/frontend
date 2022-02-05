<template>
  <div>
    <CCard class="mb-4">
      <CCardBody>
        <div class="mb-3">
          <CFormLabel>Days</CFormLabel>
          <CFormInput type="number" v-model="limit" />
        </div>

        <CFormLabel>Pay amount</CFormLabel>
        <CInputGroup class="mb-3">
          <CFormInput v-model="price" disabled />
          <CInputGroupText>TRX</CInputGroupText>
        </CInputGroup>

        <p>Available balance: {{ wallet.balance }} TRX</p>

        <div class="d-grid gap-2">
          <CButton v-if="isLoading" disabled>
            <CSpinner size="sm" />
          </CButton>
          <CButton v-else color="primary" @click="buy"> Buy </CButton>
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
      limit: '10',
    }
  },
  computed: {
    priceTrx() {
      return this.$store.state.priceTrx
    },
    wallet() {
      return this.$store.state.wallet
    },
    price() {
      const { usd } = this.priceTrx
      const pricePerDay = 2 / usd / 10
      return String(Number(this.limit * pricePerDay + 1).toFixed(6))
    },
  },
  methods: {
    async buy() {
      try {
        this.isLoading = true
        const { data } = await axios.get('/license/buy?limit=' + this.limit)
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
