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
        </CListGroup>
      </CCardBody>
    </CCard>

    <CCard class="mb-4">
      <CCardBody>
        <h4>FAQ</h4>

        <CAccordion>
          <CAccordionItem :item-key="2">
            <CAccordionHeader> What is Emulator? </CAccordionHeader>
            <CAccordionBody>
              - Some dice sites not accept install bot direct, emulator is the
              place to install bot for them
            </CAccordionBody>
          </CAccordionItem>

          <CAccordionItem :item-key="3">
            <CAccordionHeader> Why dice script not work? </CAccordionHeader>
            <CAccordionBody>
              - Dice script must follow syntax of programming language. In Lua
              mode, your script must follow syntax of Lua v5.3
            </CAccordionBody>
          </CAccordionItem>

          <CAccordionItem :item-key="4">
            <CAccordionHeader>
              Why stake.com or primedice.com alert: "Get new pair of seed"?
            </CAccordionHeader>
            <CAccordionBody>
              - Add 'resetseed()' function in to your script below dobet() line
              with a condition. Example:
              <pre>if (bets % 1000 = 0) then resetseed() end</pre>
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
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
