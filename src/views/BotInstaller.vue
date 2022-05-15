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
              jacksclub.io emulator
            </a>
          </CListGroupItem>
          <CListGroupItem>
            <a href="https://primedice.webdicebot.xyz" target="_blank">
              primedice.com emulator
            </a>
          </CListGroupItem>
          <CListGroupItem>
            <a href="https://stake.webdicebot.xyz" target="_blank">
              stake.com emulator
            </a>
          </CListGroupItem>
        </CListGroup>
      </CCardBody>
    </CCard>

    <CCard class="mb-4">
      <CCardBody>
        <h4>FAQ</h4>

        <CAccordion>
          <CAccordionItem :item-key="1">
            <CAccordionHeader> How to use? </CAccordionHeader>
            <CAccordionBody>
              See video:
              <a href="https://youtu.be/8gLgMJJWz-o" target="_blank">
                https://youtu.be/8gLgMJJWz-o
              </a>
              <br />
              Refresh site if have any error bot
            </CAccordionBody>
          </CAccordionItem>

          <CAccordionItem :item-key="2">
            <CAccordionHeader> What is Emulator? </CAccordionHeader>
            <CAccordionBody>
              This is the place to install bot of some sites. Because some sites
              not allow install bot direct
            </CAccordionBody>
          </CAccordionItem>

          <CAccordionItem :item-key="3">
            <CAccordionHeader> Why dice script not work? </CAccordionHeader>
            <CAccordionBody>
              Dice script must follow syntax of programming language. In Lua
              mode, your script must follow syntax of Lua v5.3
            </CAccordionBody>
          </CAccordionItem>

          <CAccordionItem :item-key="4">
            <CAccordionHeader>
              Why betfury.io alert: "Join room first"?
            </CAccordionHeader>
            <CAccordionBody>
              In betfury.io, please installer bot at main page (only betfury.io,
              not betfury.io/inhouse/dice or betfury.io/inhouse/limbo)
            </CAccordionBody>
          </CAccordionItem>

          <CAccordionItem :item-key="5">
            <CAccordionHeader>
              Why betfury.io stop after some bet?
            </CAccordionHeader>
            <CAccordionBody>
              That is rate-limit request bet by betfury. Add sleep(0.2) below
              line dobet() in your script
            </CAccordionBody>
          </CAccordionItem>

          <CAccordionItem :item-key="6">
            <CAccordionHeader>
              Why stake.com or primedice.com alert: "Get new pair of seed"?
            </CAccordionHeader>
            <CAccordionBody>
              Add 'resetseed()' function in to your script below dobet() line
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
