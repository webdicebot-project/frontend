<template>
  <div>
    <CCard class="mb-4 bg-primary text-white">
      <CCardBody>
        <div>
          <div class="balance">
            <span
              v-if="isLoading2"
              class="spinner-border text-secondary"
              role="status"
            ></span>
            <span v-else>
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
            <span
              v-if="isLoading2"
              class="spinner-border spinner-border-sm text-secondary"
              role="status"
            ></span>
            <span v-else>
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
          <CCardBody class="text-center">
            <div>
              <p class="small">
                Only send TRX to this address, 1 confirmation(s) required
                <br />
                We do not accept BEP20 from Binance
              </p>

              <div class="mb-3" style="height: 200px">
                <QRCodeVue3
                  :value="wallet.address"
                  :width="200"
                  :height="200"
                  :dotsOptions="{
                    type: 'square',
                  }"
                />
              </div>

              <div class="mb-3">
                <span
                  v-if="isLoading2"
                  class="spinner-border spinner-border-sm text-secondary"
                  role="status"
                ></span>
                <span v-else>
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
                </span>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CTabPane>

      <CTabPane role="tabpanel" :visible="tabPaneActiveKey === 2">
        <CCard class="tab-content">
          <CCardBody>
            <div class="mb-3">
              <CFormLabel>Receiving address</CFormLabel>
              <CFormInput type="text" v-model="to" />
            </div>

            <div class="mb-3">
              <CFormLabel>Withdraw amount</CFormLabel>
              <CFormInput type="number" v-model="amount" />
            </div>

            <CFormLabel>OTP code</CFormLabel>
            <CInputGroup class="mb-3">
              <CInputGroupText>
                <CIcon icon="cil-lock-locked" />
              </CInputGroupText>
              <CFormInput v-model="otp" />
              <CButton v-if="isLoading3" class="px-4" disabled>
                <CSpinner size="sm" />
              </CButton>
              <CButton v-else color="success" @click="getOTP">
                Get OTP
              </CButton>
            </CInputGroup>

            <div class="d-grid gap-2">
              <CButton v-if="isLoading" disabled>
                <CSpinner size="sm" />
              </CButton>

              <CButton v-else color="primary" @click="send"> Send </CButton>
            </div>

            <p class="mt-3 small">
              If receiving address not activated. An extra 1.1 TRX will be
              deducted from your account to activate the receiving address
            </p>
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
      amount: '0',
      otp: '',
    }
  },
  created() {
    this.getWallet()

    setTimeout(() => {
      this.getWallet()
    }, 6e4)
  },
  methods: {
    ...mapActions(['getPriceTrx']),
    getAddress(address) {
      return address.slice(0, 7) + '...' + address.slice(-4)
    },
    async getWallet() {
      try {
        this.isLoading2 = true
        const { data } = await axios.get('/user/wallet')
        // console.log(data)
        this.wallet = data
        this.isLoading2 = false
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
    async getOTP() {
      try {
        this.isLoading3 = true
        const { data } = await axios.get('/user/getOTPSend')
        this.isLoading3 = false
        // console.log(data)
        this.notify(data)
      } catch (error) {
        this.isLoading3 = false
        // console.error(error)
        this.notify(error.response.data.message)
      }
    },
    async send() {
      try {
        if (!this.to || !this.amount || !this.otp)
          return this.notify('Enter receiving address and amount')
        this.isLoading = true
        const { data } = await axios.post('/user/wallet/send', {
          to: this.to,
          amount: this.amount,
          otp: this.otp,
        })
        // console.log(data)
        this.isLoading = false
        this.notify(data)
        this.to = ''
        this.amount = '0'
        this.otp = ''
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
