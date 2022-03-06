<template>
  <div>
    <CCard class="mb-4">
      <CCardBody>
        <p>From 00:00 07/03/2022 (GMT+7) to 23:59 14/03/2022 (GMT+7)</p>
        <ul class="list-group">
          <li class="list-group-item">Buy 30 days license -> discount 5%</li>
          <li class="list-group-item">Buy 180 days license -> discount 10%</li>
          <li class="list-group-item">Buy 365 days license -> discount 25%</li>
        </ul>
      </CCardBody>
    </CCard>

    <CCard class="mb-4">
      <CCardBody>
        <CSpinner v-if="isLoading" />

        <div v-else>
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
            <CButton v-if="isLoading2" disabled>
              <CSpinner size="sm" />
            </CButton>
            <CButton v-else color="primary" @click="buy"> Buy </CButton>
          </div>
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
      isLoading2: false,
      wallet: {
        address: '',
        balance: 0,
        bandwidth: {
          freeNetLimit: 0,
          freeNetUsed: 0,
        },
      },
      limit: '10',
    }
  },
  created() {
    this.getWallet()
  },
  computed: {
    price() {
      const { usd } = this.$store.state.priceTrx
      const pricePerDay = 2 / usd / 10
      let discountPercent = 0
      let licensePrice = 0
      switch (Number(this.limit)) {
        case 30:
          discountPercent = 5
          break
        case 180:
          discountPercent = 10
          break
        case 365:
          discountPercent = 25
          break
      }
      licensePrice = Number(this.limit * pricePerDay + 1).toFixed(6)
      if (discountPercent > 0)
        licensePrice = licensePrice - (licensePrice * discountPercent) / 100
      return String(licensePrice)
    },
  },
  methods: {
    async getWallet() {
      try {
        this.isLoading = true
        const { data } = await axios.get('/user/wallet')
        // console.log(data)
        this.isLoading = false
        this.wallet = data
      } catch (error) {
        // console.error(error)
        this.isLoading = false
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
    async buy() {
      try {
        this.isLoading2 = true
        const { data } = await axios.get('/license/buy?limit=' + this.limit)
        // console.log(data)
        this.isLoading2 = false
        this.notify(data)
      } catch (error) {
        // console.error(error)
        this.isLoading2 = false
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
