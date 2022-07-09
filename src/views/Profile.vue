<template>
  <div>
    <CCard class="mb-4">
      <CCardBody>
        <CListGroup>
          <CListGroupItem>
            MemberID:
            <span
              v-if="isLoading"
              class="spinner-border spinner-border-sm text-secondary"
              role="status"
            ></span>
            <span v-else>
              {{ user.idUser }}
              <CBadge color="secondary">
                {{ getPermission(user.permission) }}
              </CBadge>
            </span>
          </CListGroupItem>
          <CListGroupItem>
            Join time:
            <span
              v-if="isLoading"
              class="spinner-border spinner-border-sm text-secondary"
              role="status"
            ></span>
            <span v-else>
              {{ $options.moment(user.createdAt).format('DD/MM/YYYY') }}
            </span>
          </CListGroupItem>
        </CListGroup>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  moment,
  data() {
    return {
      isLoading: false,
      user: {
        idUser: '',
        createdAt: Date.now(),
        permission: 0,
      },
    }
  },
  created() {
    this.getProfile()
  },
  methods: {
    getPermission(permission) {
      switch (permission) {
        case 0:
          return 'Member'
        case 1:
          return 'Mod'
        case 2:
          return 'Admin'
      }
    },
    async getProfile() {
      try {
        this.isLoading = true
        const { data } = await axios.get('/user/profile')
        // console.log(data)
        this.user = data
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
  },
}
</script>

<style></style>
