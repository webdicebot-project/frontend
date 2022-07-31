<template>
  <div>
    <CCard class="mb-4">
      <CCardBody>
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
        <h4>
          <strong>FAQ</strong>
        </h4>

        <CAccordion>
          <CAccordionItem :item-key="1">
            <CAccordionHeader> Why dice script not work? </CAccordionHeader>
            <CAccordionBody>
              Dice script must clean and follow syntax of programming language.
              In Lua mode, your script must follow syntax of Lua 5.3, read
              docments of Lua 5.3 at:
              <a href="https://lua.org/manual/5.3" target="_blank">
                https://lua.org/manual/5.3
              </a>
            </CAccordionBody>
          </CAccordionItem>
          <CAccordionItem :item-key="2">
            <CAccordionHeader>
              Where I can get some nice dice script?
            </CAccordionHeader>
            <CAccordionBody>
              See awesome scripts at:
              <a
                href="https://github.com/webdicebot-project/awesome-scripts"
                target="_blank"
              >
                https://github.com/webdicebot-project/awesome-scripts
              </a>
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
