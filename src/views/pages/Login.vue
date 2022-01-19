<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit="login">
                  <h1>Login</h1>

                  <p class="text-medium-emphasis">
                    <a :href="urlTelegramBot" target="_blank"> Telegram Bot </a>
                    have your Login Info
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
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      v-model="password"
                    />
                  </CInputGroup>

                  <CRow>
                    <CCol :xs="6">
                      <CButton v-if="isLoading" class="px-4" disabled>
                        <CSpinner size="sm" />
                      </CButton>
                      <CButton v-else color="primary" class="px-4">
                        Login
                      </CButton>

                      <vue-telegram-login
                        mode="callback"
                        telegram-login="webdicebot_xyz"
                        @callback="yourCallbackFunction"
                      />
                    </CCol>
                  </CRow>
                </CForm>
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
import { vueTelegramLogin } from 'vue-telegram-login'

export default {
  name: 'Login',
  data() {
    return {
      isLoading: false,
      idUser: '',
      password: '',
      urlTelegramBot:
        window.location.hostname == 'localhost'
          ? 'https://t.me/webdicebotxyz_dev_bot'
          : 'https://t.me/webdicebotxyz_bot',
    }
  },
  methods: {
    yourCallbackFunction(user) {
      // gets user as an input
      // id, first_name, last_name, username,
      // photo_url, auth_date and hash
      console.log(user)
    },
    async login(e) {
      // console.log(e)
      e.preventDefault()
      try {
        this.isLoading = true
        const { data } = await axios.post('/user/login', {
          idUser: this.idUser,
          password: this.password,
        })
        this.isLoading = false
        // console.log(data)
        localStorage.setItem('token', data.token)
        this.notify('Welcome back')
        if (data.token) window.location.href = '/'
      } catch (error) {
        this.isLoading = false
        // console.error(error)
        this.notify(error.response.data.message)
      }
    },
  },
}
</script>
