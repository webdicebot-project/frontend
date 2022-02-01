<template>
  <div>
    <router-link to="/import-license">
      <CButton color="secondary" class="mb-3">
        Import license from old system
      </CButton>
    </router-link>

    <CCard class="mb-4">
      <CCardBody>
        <h4>My License</h4>

        <CSpinner v-if="isLoading" component="span" aria-hidden="true" />

        <CTable v-else responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Time</CTableHeaderCell>
              <CTableHeaderCell scope="col">License</CTableHeaderCell>
              <CTableHeaderCell scope="col">Days</CTableHeaderCell>
              <CTableHeaderCell scope="col">Price</CTableHeaderCell>
              <CTableHeaderCell scope="col">Expired</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow v-for="item in items" :key="item._id">
              <CTableDataCell>
                {{
                  $options.moment(item.createdAt).format('DD/MM/YYYY HH:mm:ss')
                }}
              </CTableDataCell>
              <CTableDataCell>
                <span
                  class="copy"
                  v-clipboard:copy="item.license"
                  v-clipboard:success="onCopy"
                  >{{ item.license }}
                  <CIcon name="cil-copy" />
                </span>
              </CTableDataCell>
              <CTableDataCell>{{ item.limit }}</CTableDataCell>
              <CTableDataCell>
                {{ Number(item.price).toFixed(6) }} TRX
              </CTableDataCell>
              <CTableDataCell>
                {{
                  $options
                    .moment(item.createdAt)
                    .add(item.limit, 'day')
                    .format('DD/MM/YYYY HH:mm:ss')
                }}
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
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
      items: 0,
    }
  },
  created() {
    this.getMyLicense()
  },
  methods: {
    async getMyLicense() {
      try {
        this.isLoading = true
        const { data } = await axios.get('/license/me')
        // console.log(data)
        this.isLoading = false
        this.items = data
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
