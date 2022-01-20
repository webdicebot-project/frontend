<template>
  <div>
    <CCard class="mb-4 bg-primary text-white">
      <CCardBody>
        <h2>{{ wallet.balance }} TRX</h2>

        <h6>${{ Number(wallet.balance * priceTrx.usd).toFixed(2) }}</h6>

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
          {{ wallet.bandwidth.freeNetLimit - wallet.bandwidth.freeNetUsed }}/{{
            wallet.bandwidth.freeNetLimit
          }}
        </p>
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
            <p class="small">
              Only send TRX to this address, 1 confirmation(s) required
              <br />
              We do not accept BEP20 from Binance
            </p>

            <QRCodeVue3
              :value="wallet.address"
              :width="200"
              :height="200"
              :dotsOptions="{
                type: 'square',
              }"
              class="mb-3"
            />

            <span
              class="copy"
              v-clipboard:copy="wallet.address"
              v-clipboard:success="onCopy"
            >
              {{ wallet.address }} &#x2750;
            </span>
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

            <p class="small">
              If receiving address not activated. An extra 1.1 TRX will be
              deducted from your account to activate the receiving address
            </p>

            <div class="mb-3">
              <CFormLabel>Withdraw amount</CFormLabel>
              <CFormInput type="number" v-model="amount" />
            </div>

            <div class="d-grid gap-2">
              <CButton v-if="isLoading" disabled>
                <CSpinner size="sm" />
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
      tabPaneActiveKey: 1,
      priceTrx: JSON.parse(localStorage.getItem('priceTrx')) || {},
      wallet: JSON.parse(localStorage.getItem('wallet')) || {},
      to: '',
      amount: '0',
      transactions: [],
    }
  },
  created() {
    this.getTransaction()
    setInterval(() => {
      this.priceTrx = JSON.parse(localStorage.getItem('priceTrx'))
      this.wallet = JSON.parse(localStorage.getItem('wallet'))
      this.getTransaction()
    }, 6e4)
  },
  methods: {
    onCopy() {
      this.notify('Copy success')
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
        this.notify(data)
      } catch (error) {
        this.isLoading = false
        // console.error(error)
        this.notify(error.response.data.message)
        if (
          error.response.data.message == 'jwt expired' ||
          error.response.data.message == 'jwt malformed' ||
          error.response.data.message == 'invalid signature'
        )
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
        if (
          error.response.data.message == 'jwt expired' ||
          error.response.data.message == 'jwt malformed' ||
          error.response.data.message == 'invalid signature'
        )
          this.$router.push('/pages/login')
      }
    },
  },
}
</script>

<style></style>
