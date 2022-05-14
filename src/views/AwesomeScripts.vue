<template>
  <div>
    <CCard class="mb-4">
      <CCardBody>
        <CListGroup class="mb-3">
          <p class="small">* Click to copy link raw script from github</p>

          <CListGroupItem
            v-for="script in $options.scripts"
            :key="script.title"
          >
            <span
              class="copy text-primary"
              v-clipboard:copy="script.url"
              v-clipboard:success="onCopy"
            >
              {{ script.title }}
              <CIcon name="cil-copy" />
            </span>
          </CListGroupItem>
        </CListGroup>

        <CAlert color="primary">
          Script make by
          <a href="https://facebook.com/ttluan" target="_blank">
            Truong Trieu Luan
          </a>
        </CAlert>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import scripts from './scripts'

export default {
  scripts,
}
</script>

<style></style>
