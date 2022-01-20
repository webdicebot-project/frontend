<template>
  <div>
    <CCard class="mb-4">
      <CCardBody>
        <div class="mb-3">
          <CFormLabel>Days</CFormLabel>
          <CFormInput type="number" v-model="limit" />
        </div>
        <div class="mb-3">
          <CFormLabel>Pay amount</CFormLabel>
          <CFormInput type="number" v-model="price" disabled />
        </div>

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
      priceTrx: JSON.parse(localStorage.getItem('priceTrx')) || {},
      wallet: JSON.parse(localStorage.getItem('wallet')) || {},
      limit: '10',
    }
  },
  created() {
    setInterval(() => {
      this.priceTrx = JSON.parse(localStorage.getItem('priceTrx'))
      this.wallet = JSON.parse(localStorage.getItem('wallet'))
    }, 6e4)
  },
  computed: {
    price() {
      const { usd } = this.priceTrx
      const pricePerDay = 2 / usd / 10
      return String(Number(this.limit * pricePerDay + 1).toFixed(6))
    },
  },
  methods: {
    async buy(e) {
      e.preventDefault()
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
          error.response.data.message == 'jwt malformed'
        )
          this.$router.push('/pages/login')
      }
    },
  },
}
</script>

<style></style>
