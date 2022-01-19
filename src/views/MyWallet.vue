<template>
  <div>
    <CCard class="mb-4 bg-primary text-white">
      <CCardBody>
        <CSpinner v-if="isLoading" color="light" />

        <template v-else>
          <h2>{{ balance }} TRX</h2>

          <h6>${{ Number(balance * trx.usd).toFixed(2) }}</h6>

          <p class="mt-4 mb-0 small">
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
          </p>
        </template>
      </CCardBody>
    </CCard>

    <CNav variant="pills" role="tablist" class="mb-3">
      <CNavItem>
        <CNavLink
          href="javascript:void(0);"
          :active="tabPaneActiveKey === 1"
          @click="
            () => {
              tabPaneActiveKey = 1
            }
          "
        >
          <CIcon name="cil-arrow-circle-bottom" />
          Deposit
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
          <CIcon name="cil-arrow-circle-top" />
          Withdraw
        </CNavLink>
      </CNavItem>

      <CNavItem variant="info">
        <CNavLink
          href="javascript:void(0);"
          :active="tabPaneActiveKey === 3"
          @click="
            () => {
              tabPaneActiveKey = 3
            }
          "
        >
          <CIcon name="cil-history" />
          Transactions
        </CNavLink>
      </CNavItem>
    </CNav>

    <CTabContent class="mb-4">
      <CTabPane role="tabpanel" :visible="tabPaneActiveKey === 1">
        <CCard>
          <CCardBody class="text-center">
            <CSpinner v-if="isLoading" component="span" />

            <template v-else>
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
            </template>
          </CCardBody>
        </CCard>
      </CTabPane>

      <CTabPane role="tabpanel" :visible="tabPaneActiveKey === 2">
        <CCard>
          <CCardBody>
            <div class="mb-3">
              <CFormLabel>Receiving address</CFormLabel>
              <CFormInput type="text" v-model="to" />
            </div>

            <p>
              If receiving address not activated. An extra 1.1 TRX will be
              deducted from your account to activate the receiving address
            </p>

            <div class="mb-3">
              <CFormLabel>Withdraw amount</CFormLabel>
              <CFormInput type="number" v-model="amount" />
            </div>

            <div class="d-grid gap-2">
              <CButton v-if="isLoading2" disabled>
                <CSpinner component="span" size="sm" aria-hidden="true" />
              </CButton>

              <CButton v-else color="primary" @click="send"> Send </CButton>
            </div>
          </CCardBody>
        </CCard>
      </CTabPane>

      <CTabPane role="tabpanel" :visible="tabPaneActiveKey === 3">
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
      isFirstTime: true,
      isLoading2: false,
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
    this.isFirstTime = false
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
        if (this.isFirstTime) this.isLoading = true
        const { data } = await axios.get('/user/wallet')
        // console.log(data)
        this.isLoading = false
        this.address = data.address
        this.balance = data.balance
        this.bandwidth = data.bandwidth
      } catch (error) {
        // console.error(error)
        this.isLoading = false
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
        this.isLoading2 = true
        const { data } = await axios.post('/user/wallet/send', {
          to: this.to,
          amount: this.amount,
        })
        this.isLoading2 = false
        // console.log(data)
        this.notify(data)
      } catch (error) {
        this.isLoading2 = false
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

<style></style>
