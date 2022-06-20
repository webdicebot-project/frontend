<template>
  <div>
    <CCard class="mb-4">
      <CCardBody>
        <CSpinner v-if="isLoading" />

        <div v-else>
          <div class="mb-3">
            <CFormLabel>MemberID</CFormLabel>
            <CFormInput type="text" v-model="idUser" />
          </div>

          <div class="mb-3">
            <CFormLabel>Days</CFormLabel>
            <CFormInput type="number" v-model="limit" />
          </div>

          <CFormLabel>Pay amount</CFormLabel>
          <CInputGroup class="mb-3">
            <CFormInput v-model="price" disabled />
            <CInputGroupText>TRX</CInputGroupText>
          </CInputGroup>

          <p>Available balance: {{ balance }} TRX</p>

          <div class="d-grid gap-2">
            <CButton v-if="isLoading2" disabled>
              <CSpinner size="sm" />
            </CButton>
            <CButton v-else color="primary" @click="createBuy"> Buy </CButton>
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
      idUser: '',
      balance: 0,
      discountActive: false,
      limit: '10',
      transaction: { idTransaction: '', price: 0, limit: '10' },
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
        if (!tronWeb.defaultAddress.base58)
          return this.notify('Plese unlock your wallet, then refresh site')
        this.isLoading = true
        let balance = await tronWeb.trx.getBalance(
          tronWeb.defaultAddress.base58,
        )
        balance = tronWeb.fromSun(balance)
        // console.log(balance)
        this.balance = balance
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        console.error(error)
        this.isLoading = false
      }
    },
    async createBuy() {
      try {
        this.isLoading2 = true
        const { data } = await axios.get(
          '/license/createBuy?limit=' + this.limit,
        )
        console.log(data)
        this.isLoading2 = false
        // this.notify(data)
        this.transaction = data
        this.makePayment()
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
    async makePayment() {
      try {
        const amount = Number(this.transaction.price).toFixed(6)
        const resposne = await tronWeb.trx.sendTransaction(
          'TLA1pR3nNXgxuvn47dLYP6shhK88GAmhqb',
          tronWeb.toSun(amount),
        )
        console.log(resposne)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style></style>
