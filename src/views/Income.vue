<template>
  <div>
    <CCard class="mb-4">
      <CCardBody>
        <CSpinner v-if="isLoading" />

        <CTable v-else responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Month</CTableHeaderCell>
              <CTableHeaderCell scope="col">Income</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow v-for="item in items" :key="item._id">
              <CTableDataCell>
                {{ item.month }}
              </CTableDataCell>
              <CTableDataCell> {{ item.income }} TRX </CTableDataCell>
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
    this.getIncome()
  },
  methods: {
    async getIncome() {
      try {
        this.isLoading = true
        const { data } = await axios.get('/license/income')
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
