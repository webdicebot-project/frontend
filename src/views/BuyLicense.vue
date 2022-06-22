<template>
  <div>
    <CCard class="mb-4">
      <CCardBody>
        We has make an DApp for payment and have some discount
        <br />
        Use at:
        <a href="https://seller.webdicebot.xyz" target="_blank">
          https://seller.webdicebot.xyz
        </a>
        <br />
        Open it with
        <a href="https://tronlink.org" target="_blank">TronLink Wallet</a>
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
      discountActive: false,
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
      let licensePrice = Number(this.limit * pricePerDay + 1).toFixed(6)
      let discountPercent = 0
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
      if (this.discountActive)
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
