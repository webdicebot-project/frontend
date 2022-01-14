<template>
  <div>
    <CCard class="mb-4 bg-primary text-white">
      <CCardBody>
        <h2>{{ balance }} TRX</h2>

        <h6>${{ Number(balance * trx.usd).toFixed(2) }}</h6>

        <CRow class="small mt-4">
          <CCol>
            <CBadge
              color="light"
              shape="rounded-pill"
              v-c-tooltip="
                'Transactions of triggering and creating smart contracts consume Energy, which can be obtained by freezing TRX'
              "
              class="copy text-dark"
            >
              ?
            </CBadge>
            Energy:
            {{ bandwidth.energyLimit - bandwidth.energyUsed }}/{{
              bandwidth.energyLimit
            }}
          </CCol>

          <CCol>
            <CBadge
              color="light"
              shape="rounded-pill"
              v-c-tooltip="
                'All transactions except for queries consume Bandwidth. Each account can get 1,500 Bandwidth a day for free'
              "
              class="copy text-dark"
            >
              ?
            </CBadge>
            Bandwidth:
            {{ bandwidth.freeNetLimit - bandwidth.freeNetUsed }}/{{
              bandwidth.freeNetLimit
            }}
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>

    <CNav variant="pills" role="tablist" class="mb-3">
      <CNavItem variant="info">
        <CNavLink
          href="javascript:void(0);"
          :active="tabPaneActiveKey === 1"
          @click="
            () => {
              tabPaneActiveKey = 1
            }
          "
        >
          <CIcon name="cil-loop-circular" />
          Transactions
        </CNavLink>
      </CNavItem>

      <CNavItem>
        <CNavLink
          href="javascript:void(0);"
          :active="tabPaneActiveKey === 2"
          @click="
            () => {
              tabPaneActiveKey = 2
            }
          "
        >
          <CIcon name="cil-arrow-circle-bottom" />
          Receive
        </CNavLink>
      </CNavItem>

      <CNavItem>
        <CNavLink
          href="javascript:void(0);"
          :active="tabPaneActiveKey === 3"
          @click="
            () => {
              tabPaneActiveKey = 3
            }
          "
        >
          <CIcon name="cil-arrow-circle-top" />
          Send
        </CNavLink>
      </CNavItem>
    </CNav>

    <CTabContent class="mb-4">
      <CTabPane role="tabpanel" :visible="tabPaneActiveKey === 1">
        <CCard>
          <CCardBody>
            <CTable responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Time</CTableHeaderCell>
                  <CTableHeaderCell scope="col">From</CTableHeaderCell>
                  <CTableHeaderCell scope="col">To</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Currency</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="item in transactions" :key="item.time">
                  <CTableDataCell>
                    {{
                      $options
                        .moment(new Date(item.time))
                        .format('DD/MM/YYYY HH:mm:ss')
                    }}
                  </CTableDataCell>
                  <CTableDataCell>{{ getAddress(item.from) }}</CTableDataCell>
                  <CTableDataCell>{{ getAddress(item.to) }}</CTableDataCell>
                  <CTableDataCell>{{ item.amount }}</CTableDataCell>
                  <CTableDataCell>
                    {{ String(item.currency).toUpperCase() }}
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CTabPane>

      <CTabPane role="tabpanel" :visible="tabPaneActiveKey === 2">
        <CCard class="mb-4">
          <CCardBody class="text-center">
            <p>
              Only send TRX to this address, 1 confirmation(s) required
              <br />
              We do not accept BEP20 from Binance
            </p>

            <QRCodeVue3
              :value="address"
              :width="200"
              :height="200"
              :dotsOptions="{
                type: 'square',
              }"
              class="mb-3"
            />

            <span
              class="copy"
              v-clipboard:copy="address"
              v-clipboard:success="onCopy"
            >
              {{ address }} &#x2750;
            </span>
          </CCardBody>
        </CCard>
      </CTabPane>

      <CTabPane role="tabpanel" :visible="tabPaneActiveKey === 3">
        <CCard class="mb-4">
          <CCardBody>
            <div class="mb-3">
              <CFormLabel>Receiving account</CFormLabel>
              <CFormInput type="text" v-model="to" />
            </div>

            <p>
              If receiving account has not been activated. An extra 1.1 TRX will
              be deducted from your account to activate the receiving account
            </p>

            <div class="mb-3">
              <CFormLabel>Transfer amount</CFormLabel>
              <CFormInput type="number" v-model="amount" />
            </div>

            <div class="d-grid gap-2">
              <CButton color="primary" @click="send">
                <CSpinner v-show="isLoading" color="light" size="sm" />
                Send
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      </CTabPane>
    </CTabContent>
  </div>
</template>

<script>
import axios from 'axios'
import QRCodeVue3 from 'qrcode-vue3'
import moment from 'moment'

export default {
  components: {
    QRCodeVue3,
  },
  moment,
  data() {
    return {
      isLoading: false,
      trx: {
        usd: 0,
        change24hr: 0,
      },
      tabPaneActiveKey: 1,
      balance: 0,
      address: '',
      transactions: [],
      to: '',
      amount: '0',
      bandwidth: {
        energyLimit: 0,
        energyUsed: 0,
        freeNetLimit: 0,
        freeNetUsed: 0,
      },
    }
  },
  async created() {
    this.getPriceTrx()
    await this.getWallet()
    this.getTransaction()
    setInterval(async () => {
      await this.getWallet()
      this.getTransaction()
    }, 6e4)
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
        this.address = data.address
        this.balance = data.balance
        this.bandwidth = data.bandwidth
      } catch (error) {
        // console.error(error)
        this.notify(error.response.data.message)
        if (error.response.data.message == 'jwt expired')
          this.$router.push('/pages/login')
      }
    },
    async getTransaction() {
      try {
        const { data } = await axios.get('/user/wallet/transaction')
        // console.log(data)
        this.transactions = data
      } catch (error) {
        // console.error(error)
        this.notify(error.response.data.message)
        if (error.response.data.message == 'jwt expired')
          this.$router.push('/pages/login')
      }
    },
    getAddress(address) {
      return address.slice(0, 7) + '...' + address.slice(-4)
    },
    async send(e) {
      e.preventDefault()
      try {
        this.isLoading = true
        const { data } = await axios.post('/user/wallet/send', {
          to: this.to,
          amount: this.amount,
        })
        this.isLoading = false
        // console.log(data)
        alert(data)
      } catch (error) {
        this.isLoading = false
        // console.error(error)
        this.notify(error.response.data.message)
        if (error.response.data.message == 'jwt expired')
          this.$router.push('/pages/login')
      }
    },
    onCopy() {
      this.notify('Copy success')
    },
  },
}
</script>

<style>
.balance {
  background: linear-gradient(140deg, #321fdb, #68a9d4 120%);
  color: white;
}

.copy {
  cursor: pointer;
}
</style>
