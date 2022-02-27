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
          <CFormTextarea rows="5" v-model="installer"></CFormTextarea>
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
              <a href="https://youtu.be/taZAgwbN9rk" target="_blank">
                How to use WebDiceBot.Xyz?
              </a>
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
              Why betfury.io have error Join room first?
            </CAccordionHeader>
            <CAccordionBody>
              In betfury.io, please installer bot at main page (only betfury.io,
              not betfury.io/inhouse/dice or betfury.io/inhouse/limbo)
            </CAccordionBody>
          </CAccordionItem>

          <CAccordionItem :item-key="5">
            <CAccordionHeader>
              Why betfury.io have stop after some bet?
            </CAccordionHeader>
            <CAccordionBody>
              That is rate-limit request bet by betfury. Add sleep(0.2) below
              line dobet() in your script
            </CAccordionBody>
          </CAccordionItem>

          <CAccordionItem :item-key="6">
            <CAccordionHeader>
              Why stake.com or primedice.com show alert: "get new pair of seed"?
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

export default {
  data() {
    return {
      bots: [
        {
          label: 'Select bot you need',
          value: 'Not have installer in this select',
        },
        {
          label: 'betfury.io - dice',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/betfury-dice'
document.body.appendChild(script)`,
        },
        {
          label: 'betfury.io - limbo',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/betfury-limbo'
document.body.appendChild(script)`,
        },
        {
          label: 'betgalaxy.io - dice',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/betgalaxy.io-dice'
document.body.appendChild(script)`,
        },
        {
          label: 'betking.io',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/betking.io'
document.body.appendChild(script)`,
        },
        {
          label: 'bitdice.me - dice',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/bitdice'
document.body.appendChild(script)`,
        },
        {
          label: 'bitsler.com - boom',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/bitsler-boom'
document.body.appendChild(script)`,
        },
        {
          label: 'bitsler.com - dice',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/bitsler-dice'
document.body.appendChild(script)`,
        },
        {
          label: 'bitsler.com - twist',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/bitsler.com-twist'
document.body.appendChild(script)`,
        },
        {
          label: 'bitvest.io - dice',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/bitvest'
document.body.appendChild(script)`,
        },
        {
          label: 'casinoroyale.bet - dice classic',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/casinoroyale-dice-classic'
document.body.appendChild(script)`,
        },
        {
          label: 'crypto.games - dice',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/crypto-games-dice'
document.body.appendChild(script)`,
        },
        {
          label: 'cryptodicecasino.com - dice',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/cryptodicecasino.com-dice'
document.body.appendChild(script)`,
        },
        {
          label: 'cryptoplay.io - dice classic',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/cryptoplay-dice'
document.body.appendChild(script)`,
        },
        {
          label: 'cryptoplay.io - limbo',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/cryptoplay-limbo'
document.body.appendChild(script)`,
        },
        {
          label: 'duckdice.io - bonuses',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/duckdice.io-bonuses'
document.body.appendChild(script)`,
        },
        {
          label: 'duckdice.io - faucet',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/duckdice.io-faucet'
document.body.appendChild(script)`,
        },
        {
          label: 'duckdice.io - main',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/duckdice.io-main'
document.body.appendChild(script)`,
        },
        {
          label: 'duckdice.io - xmas',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/duckdice.io-xmas'
document.body.appendChild(script)`,
        },
        {
          label: 'faucetpay.io - dice',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/faucetpay.io-dice'
document.body.appendChild(script)`,
        },
        {
          label: 'faucetpay.io - limbo',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/faucetpay.io-limbo'
document.body.appendChild(script)`,
        },
        {
          label: 'freebitco.in',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/freebitco'
document.body.appendChild(script)`,
        },
        {
          label: 'jacksclub.io - blaze (work on emulator)',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/jacksclub.io-blaze'
document.body.appendChild(script)`,
        },
        {
          label: 'jacksclub.io - dice (work on emulator)',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/jacksclub.io-dice'
document.body.appendChild(script)`,
        },
        {
          label: 'jacksclub.io - wheel (work on emulator)',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/jacksclub.io-wheel'
document.body.appendChild(script)`,
        },
        {
          label: 'luckydiamond.io - dice',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/luckydiamond.io-dice'
document.body.appendChild(script)`,
        },
        {
          label: 'luckydiamond.io - limbo',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/luckydiamond.io-limbo'
document.body.appendChild(script)`,
        },
        {
          label: 'paradice.in - dice',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/paradice'
document.body.appendChild(script)`,
        },
        {
          label: 'pasino.com - hash dice',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/pasino.com-hash-dice'
document.body.appendChild(script)`,
        },
        {
          label: 'pasino.com - limbo',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/pasino.com-limbo'
document.body.appendChild(script)`,
        },
        {
          label: 'primedice.com',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/primedice'
document.body.appendChild(script)`,
        },
        {
          label: 'primedice.com (work on emulator)',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/primdice.com-emulator'
document.body.appendChild(script)`,
        },
        {
          label: 'stake.com - dice',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/stake-dice'
document.body.appendChild(script)`,
        },
        {
          label: 'stake.com - dice (work on emulator)',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/stake-dice-emulator'
document.body.appendChild(script)`,
        },
        {
          label: 'stake.com - limbo',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/stake-limbo'
document.body.appendChild(script)`,
        },
        {
          label: 'stake.com - limbo (work on emulator)',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/stake-limbo-emulator'
document.body.appendChild(script)`,
        },
        {
          label: 'trustdice.win - dice',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/trustdice-dice'
document.body.appendChild(script)`,
        },
        {
          label: 'windice.io - dice',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/windice.io-dice'
document.body.appendChild(script)`,
        },
        {
          label: 'wolf.bet - dice',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/wolf-dice'
document.body.appendChild(script)`,
        },
        {
          label: 'wolf.bet - limbo',
          value: `const BOT_URL = '${api}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/wolf-limbo'
document.body.appendChild(script)`,
        },
      ],
      installer: '',
    }
  },
  methods: {
    changeBot(e) {
      this.installer = e.target.value
    },
  },
}
</script>

<style></style>
