<template>
  <div>
    <CCard class="mb-4">
      <CCardBody>
        <h4>Installer</h4>

        <div class="mb-3">
          <CFormSelect
            aria-label="Default select example"
            :options="bots"
            @change="changeBot"
          />
        </div>

        <div class="mb-3">
          <CFormTextarea rows="7" v-model="installer"></CFormTextarea>
        </div>

        <div class="d-grid gap-2">
          <CButton
            color="primary"
            v-clipboard:copy="installer"
            v-clipboard:success="onCopy"
          >
            Copy
          </CButton>
        </div>
      </CCardBody>
    </CCard>

    <CCard class="mb-4">
      <CCardBody>
        <h4>Emulator</h4>

        <CListGroup>
          <CListGroupItem>
            <a href="https://jacksclub.webdicebot.xyz" target="_blank">
              jacksclub.io
            </a>
          </CListGroupItem>
          <CListGroupItem>
            <a href="https://primedice.webdicebot.xyz" target="_blank">
              primedice.com
            </a>
          </CListGroupItem>
          <CListGroupItem>
            <a href="https://stake.webdicebot.xyz" target="_blank">
              stake.com
            </a>
          </CListGroupItem>
          <CListGroupItem>
            <a href="https://wolf.webdicebot.xyz" target="_blank"> wolf.bet </a>
          </CListGroupItem>
        </CListGroup>

        <p class="mt-3 small">
          Some dice sites not accept install bot direct (Content Security
          Policy). Emulator is the place to install bot for them
        </p>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import api from '@/configs/api'
import bots from './bots'

export default {
  data() {
    return {
      bots,
      installer: '',
    }
  },
  methods: {
    changeBot(e) {
      this.installer =
        `const BOT_API = '${api}';\n` +
        e.target.value +
        `\n(async function () {
await fetch(BOT_API + '/bot/init')
  .then((response) => response.text())
  .then((txt) => eval(txt))
})();`
    },
  },
}
</script>

<style></style>
