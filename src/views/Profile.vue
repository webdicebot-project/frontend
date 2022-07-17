<template>
  <div class="vld-parent">
    <loading :active="isLoading" />

    <CCard class="mb-3">
      <CListGroup flush>
        <CListGroupItem>
          <CIcon name="cil-user" />
          MemberID: {{ user.idUser }}
        </CListGroupItem>
        <!-- <CListGroupItem>
          <CBadge color="secondary">
            {{ getPermission(user.permission) }}
          </CBadge>
        </CListGroupItem> -->
      </CListGroup>
      <CCardFooter>
        <CIcon name="cil-history" />
        Joined at: {{ $options.moment(user.createdAt).format('DD/MM/YYYY') }}
      </CCardFooter>
    </CCard>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  moment,
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      user: {
        idUser: '0',
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

<style>
</style>
