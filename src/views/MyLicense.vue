<template>
  <div>
    <CCard class="mb-4">
      <CCardBody>
        <CTable responsive>
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
            <span
              v-if="isLoading"
              class="spinner-border text-secondary mt-2"
              role="status"
            ></span>

            <CTableRow v-else v-for="item in items" :key="item._id">
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
                >
                  {{ getLicense(item.license) }}
                  <CIcon name="cil-copy" />
                </span>
              </CTableDataCell>
              <CTableDataCell>{{ item.limit }}</CTableDataCell>
              <CTableDataCell>
                {{ Number(item.price / 1e6).toFixed(6) }} TRX
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
      items: [],
    }
  },
  created() {
    this.getMyLicense()
  },
  methods: {
    getLicense(license) {
      return license.slice(0, 5) + '...' + license.slice(-5)
    },
    async getMyLicense() {
      try {
        this.isLoading = true
        const { data } = await axios.get('/license/me')
        // console.log(data)
        this.items = data
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
