<template>
  <div class="vld-parent">
    <CCard class="mb-4">
      <CCardBody>
        <loading :active="isLoading" />

        <p>Total: {{ totalDocs }} licenses</p>

        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li v-if="prevPage" class="page-item">
              <a class="page-link button" @click="adminGetLicenses(prevPage)">
                Prev
              </a>
            </li>
            <li class="page-item active">
              <a class="page-link button" @click="adminGetLicenses(page)">
                {{ page }}
              </a>
            </li>
            <li v-if="nextPage" class="page-item">
              <a class="page-link button" @click="adminGetLicenses(nextPage)">
                Next
              </a>
            </li>
          </ul>
        </nav>

        <table class="table table-hover">
          <thead>
            <th>Time</th>
            <th>Limit</th>
            <th>Price</th>
          </thead>
          <tbody>
            <tr v-for="doc in docs" :key="doc.idUser">
              <td>{{ $options.moment(doc.createdAt).format('DD/MM/YYYY') }}</td>
              <td>{{ doc.limit }}</td>
              <td>{{ doc.price / 1e6 }} TRX</td>
            </tr>
          </tbody>
        </table>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import moment from 'moment'

export default {
  moment,
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      totalDocs: 0,
      docs: [],
      page: 1,
      nextPage: 2,
      prevPage: null,
    }
  },
  created() {
    this.adminGetLicenses(this.page)
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
    async adminGetLicenses(p) {
      try {
        this.isLoading = true
        const { data } = await axios.get('/license?page=' + p)
        // console.log(data)
        this.totalDocs = data.totalDocs
        this.docs = data.docs
        this.page = data.page
        this.nextPage = data.nextPage
        this.prevPage = data.prevPage
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
