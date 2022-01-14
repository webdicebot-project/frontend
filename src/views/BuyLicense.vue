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

        <p>Available balance: {{ balance }} TRX</p>

        <div class="d-grid gap-2">
          <CButton color="primary" @click="buy">
            <CSpinner v-show="isLoading" color="light" size="sm" />
            Buy
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
      limit: '10',
      balance: 0,
      trx: {
        usd: 0,
        change24hr: 0,
      },
    }
  },
  created() {
    this.getPriceTrx()
    this.getWallet()
  },
  computed: {
    price: function () {
      const pricePerDay = 2 / this.trx.usd / 10
      return String(Number(this.limit * pricePerDay + 1).toFixed(6))
    },
  },
  methods: {
    async getPriceTrx() {
      try {
        const { data } = await axios.get('/price')
        // console.log(data)
        this.trx = data.trx
      } catch (error) {
        // console.log(error)
      }
    },
    async getWallet() {
      try {
        const { data } = await axios.get('/user/wallet')
        // console.log(data)
        this.balance = data.balance
      } catch (error) {
        // console.error(error)
        this.notify(error.response.data.message)
        if (error.response.data.message == 'jwt expired')
          this.$router.push('/pages/login')
      }
    },
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
        if (error.response.data.message == 'jwt expired')
          this.$router.push('/pages/login')
      }
    },
  },
}
</script>

<style></style>
