<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <h1>Login</h1>

                <p class="text-medium-emphasis">
                  Get MemberID at
                  <a :href="urlTelegramBot" target="_blank"> Telegram Bot </a>
                </p>

                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput placeholder="MemberID" v-model="idUser" />
                </CInputGroup>

                <CInputGroup class="mb-4">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput placeholder="OTP" v-model="otp" />
                  <CButton v-if="isLoading" class="px-4" disabled>
                    <CSpinner size="sm" />
                  </CButton>
                  <CButton v-else color="success" @click="getOTP">
                    Get OTP
                  </CButton>
                </CInputGroup>

                <CRow>
                  <CCol :xs="6">
                    <CButton v-if="isLoading2" class="px-4" disabled>
                      <CSpinner size="sm" />
                    </CButton>
                    <CButton v-else color="primary" class="px-4" @click="login">
                      Login
                    </CButton>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      isLoading: false,
      isLoading2: false,
      idUser: '',
      otp: '',
      urlTelegramBot:
        window.location.hostname == 'localhost'
          ? 'https://t.me/webdicebot_dev_bot'
          : 'https://t.me/webdicebot_bot',
    }
  },
  methods: {
    async getOTP(e) {
      // console.log(e)
      e.preventDefault()
      try {
        this.isLoading = true
        const { data } = await axios.post('/user/getOTP', {
          idUser: this.idUser,
        })
        this.isLoading = false
        // console.log(data)
        this.notify(data)
      } catch (error) {
        this.isLoading = false
        // console.error(error)
        this.notify(error.response.data.message)
      }
    },
    async login(e) {
      // console.log(e)
      e.preventDefault()
      try {
        this.isLoading2 = true
        const { data } = await axios.post('/user/login', {
          idUser: this.idUser,
          otp: this.otp,
        })
        this.isLoading2 = false
        // console.log(data)
        localStorage.setItem('token', data.token)
        this.notify('Welcome back')
        if (data.token) setTimeout((window.location.href = '/'), 1e3)
      } catch (error) {
        this.isLoading2 = false
        // console.error(error)
        this.notify(error.response.data.message)
      }
    },
  },
}
</script>
