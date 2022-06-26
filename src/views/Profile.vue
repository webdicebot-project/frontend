<template>
  <div>
    <CCard class="mb-4">
      <CCardBody>
        <CListGroup>
          <CListGroupItem>
            MemberID: {{ user.idUser }}
            <CBadge color="secondary">
              {{ getPermission(user.permission) }}
            </CBadge>
          </CListGroupItem>
          <CListGroupItem>
            Join time:
            {{ $options.moment(user.createdAt).format('DD/MM/YYYY') }}
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
        const { data } = await axios.get('/user/profile')
        // console.log(data)
        this.user = data
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
