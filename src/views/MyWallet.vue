<template>
  <div>
    <CCard class="mb-4 bg-primary text-white">
      <CCardBody>
        <CSpinner v-if="isLoading" />

        <div v-else>
          <h2>{{ wallet.balance }} TRX</h2>

          <h6>
            ${{ Number(wallet.balance * $store.state.priceTrx.usd).toFixed(2) }}
          </h6>

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
            {{
              wallet.bandwidth.freeNetLimit - wallet.bandwidth.freeNetUsed
            }}/{{ wallet.bandwidth.freeNetLimit }}
          </p>
        </div>
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
            <CSpinner v-if="isLoading" />

            <div v-else>
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
                {{ wallet.address }}
                <CIcon name="cil-copy" />
              </span>
              <br />
              <span>
                <a
                  :href="$options.explorer + 'address/' + wallet.address"
                  target="_blank"
                >
                  View on explorer
                  <CIcon name="cil-external-link" />
                </a>
              </span>
            </div>
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
              <CButton v-if="isLoading2" disabled>
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
                  <CTableDataCell>
                    {{ item.amount }} {{ String(item.currency).toUpperCase() }}
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
import { mapActions } from 'vuex'
import axios from 'axios'
import QRCodeVue3 from 'qrcode-vue3'
import moment from 'moment'
import explorer from '@/configs/explorer'

export default {
  components: {
    QRCodeVue3,
  },
  moment,
  explorer,
  data() {
    return {
      isLoading: false,
      isLoading2: false,
      tabPaneActiveKey: 1,
      wallet: {
        address: '',
        balance: 0,
        bandwidth: {
          freeNetLimit: 0,
          freeNetUsed: 0,
        },
      },
      transactions: [],
      to: '',
      amount: '0',
    }
  },
  created() {
    this.getWallet()
    this.getTransactions()
  },
  methods: {
    ...mapActions(['getPriceTrx']),
    getAddress(address) {
      return address.slice(0, 7) + '...' + address.slice(-4)
    },
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
    async send() {
      try {
        this.isLoading2 = true
        const { data } = await axios.post('/user/wallet/send', {
          to: this.to,
          amount: this.amount,
        })
        // console.log(data)
        this.isLoading2 = false
        this.notify(data)
        this.to = ''
        this.amount = '0'
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
    async getTransactions() {
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
