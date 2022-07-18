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

        <p>
          Run bots directly on dice sites that are prone to crash, or content
          security policies do not allow bots to be installed directly on them.
          Emulator is da best choose
        </p>

        <CListGroup>
          <CListGroupItem>
            <a href="https://webdicebot-jacksclub.mhqb365.com" target="_blank">
              jacksclub.io
            </a>
          </CListGroupItem>
          <CListGroupItem>
            <a href="https://webdicebot-primedice.mhqb365.com" target="_blank">
              primedice.com
            </a>
          </CListGroupItem>
          <CListGroupItem>
            <a href="https://webdicebot-stake.mhqb365.com" target="_blank">
              stake.com
            </a>
          </CListGroupItem>
          <CListGroupItem>
            <a href="https://webdicebot-wolf.mhqb365.com" target="_blank">
              wolf.bet
            </a>
          </CListGroupItem>
        </CListGroup>
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
