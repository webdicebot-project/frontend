<template>
  <div class="vld-parent">
    <loading :active="isLoading" />

    <CCard class="mb-4 bg-primary text-white">
      <CCardBody>
        <div>
          <div class="balance">
            <span>
              <h2>{{ wallet.balance }} TRX</h2>
              ${{
                Number(wallet.balance * $store.state.priceTrx.usd).toFixed(2)
              }}
            </span>
          </div>

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
            <span>
              {{
                wallet.bandwidth.freeNetLimit - wallet.bandwidth.freeNetUsed
              }}/{{ wallet.bandwidth.freeNetLimit }}
            </span>
          </p>
        </div>
      </CCardBody>
    </CCard>

    <CNav variant="tabs" role="tablist">
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
          <CIcon name="cil-arrow-circle-bottom" size="lg" />
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
          <CIcon name="cil-arrow-circle-top" size="lg" />
        </CNavLink>
      </CNavItem>
    </CNav>

    <CTabContent class="mb-4">
      <CTabPane role="tabpanel" :visible="tabPaneActiveKey === 1">
        <CCard class="tab-content">
          <CCardBody class="text-center pb-0">
            <p>
              Only send TRX to this address, 1 confirmation(s) required
              <br />
              We do not accept BEP20 from Binance
            </p>

            <div class="mb-4" style="height: 200px">
              <QRCodeVue3
                :value="wallet.address"
                :width="200"
                :height="200"
                :cornersSquareOptions="{
                  type: 'square',
                }"
                :dotsOptions="{
                  type: 'square',
                }"
              />
            </div>

            <div class="mb-4">
              <span
                class="copy"
                v-clipboard:copy="wallet.address"
                v-clipboard:success="onCopy"
              >
                {{ getAddress(wallet.address) }}
                <CIcon name="cil-copy" />
              </span>
              &nbsp;
              <a
                :href="$options.explorer + 'address/' + wallet.address"
                target="_blank"
              >
                <CIcon name="cil-external-link" />
              </a>
            </div>
          </CCardBody>
        </CCard>
      </CTabPane>

      <CTabPane role="tabpanel" :visible="tabPaneActiveKey === 2">
        <CCard class="tab-content">
          <CCardBody>
            <p>
              If receiving address not activated. An extra 1.1 TRX will be
              deducted from your account to activate the receiving address
            </p>

            <div class="mb-4">
              <CFormInput
                type="text"
                placeholder="Receiving address"
                v-model="to"
              />
            </div>

            <div class="mb-4">
              <CFormInput
                type="number"
                placeholder="Withdraw amount"
                v-model="amount"
              />
            </div>

            <CInputGroup class="mb-4">
              <CInputGroupText>
                <CIcon icon="cil-lock-locked" />
              </CInputGroupText>
              <CFormInput v-model="otp" placeholder="OTP code" />
              <CButton v-if="isLoading2" class="px-4" disabled>
                <CSpinner size="sm" />
              </CButton>
              <CButton v-else color="success" @click="getOTP">
                Get OTP
              </CButton>
            </CInputGroup>

            <div class="d-grid gap-2">
              <CButton v-if="isLoading3" disabled>
                <CSpinner size="sm" />
              </CButton>

              <CButton v-else color="primary" @click="send"> Withdraw </CButton>
            </div>
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
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  components: {
    QRCodeVue3,
    Loading,
  },
  moment,
  explorer,
  data() {
    return {
      isLoading: false,
      isLoading2: false,
      isLoading3: false,
      tabPaneActiveKey: 1,
      wallet: {
        address: '',
        balance: 0,
        bandwidth: {
          freeNetLimit: 0,
          freeNetUsed: 0,
        },
      },
      to: '',
      amount: '',
      otp: '',
    }
  },
  created() {
    this.getWallet()
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
        this.wallet = data
        this.isLoading = false
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
    async getOTP() {
      try {
        this.isLoading2 = true
        const { data } = await axios.get('/user/getOTPSend')
        this.isLoading2 = false
        // console.log(data)
        this.notify(data)
      } catch (error) {
        this.isLoading2 = false
        // console.error(error)
        this.notify(error.response.data.message)
      }
    },
    async send() {
      try {
        if (!this.to || !this.amount || !this.otp)
          return this.notify('Enter Receiving address and Withdraw amount')
        this.isLoading3 = true
        const { data } = await axios.post('/user/wallet/send', {
          to: this.to,
          amount: this.amount,
          otp: this.otp,
        })
        // console.log(data)
        this.isLoading3 = false
        this.notify(data)
        this.to = ''
        this.amount = ''
        this.otp = ''
      } catch (error) {
        // console.error(error)
        this.isLoading3 = false
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

<style scoped>
.balance {
  min-height: 70px;
}

.tab-content {
  border-top: none;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
