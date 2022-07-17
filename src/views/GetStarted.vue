<template>
  <div>
    <CCard class="mb-4">
      <CCardBody>
        <h4>How to use?</h4>
        <video class="w-100" :src="$options.video" controls></video>
      </CCardBody>
    </CCard>

    <CCard class="mb-4">
      <CCardBody>
        <h4>Terms of use</h4>

        <p>
          The following user agreement is to read in its entirety prior to the
          use of Web DiceBot's products and services. The agreement
          constitutes a legal binding between the user and all our services
        </p>

        <pre>
1. You must know what is dice, dice bot, dice script
2. You must know the Lua 5.3 programming language or Javascript programming language for make dice script
3. You must control your crypto currency in dice
4. You must have license when use dice bot of WebDiceBot.Xyz
5. A license can use for all account, all dice sites and all devices of you
6. Security enhancement (strong password, 2FA, etc..) for your accounts at all dice sites
7. Updating...</pre>
      </CCardBody>
    </CCard>

    <CRow>
      <CCol md="6">
        <CCard class="mb-4">
          <CCardBody>
            <h4>Lua script</h4>

            <pre>
chance=49.5
bethigh=true
basebet=0.00000001
nextbet=basebet

function dobet()
    if (win) then
        nextbet=basebet
    else
        nextbet=previousbet*2
    end
end</pre>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md="6">
        <CCard class="mb-4">
          <CCardBody>
            <h4>Javascript script</h4>

            <pre>
chance=49.5
bethigh=true
basebet=0.00000001
nextbet=basebet

function dobet() {
    if (win) {
        nextbet=basebet
    } else {
        nextbet=previousbet*2
    }
}</pre>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <CCard class="mb-4">
      <CCardBody>
        <h4>System variables</h4>

        <pre>
chance : % win change
bethigh : bet side, true is over/above, false is under/below
nextbet : bet amount for next bet make
balance : current balance
profit : total profit in round
currentprofit, lastBet.profit : profit of last bet make
previousbet, lastBet.amount : amount of last bet make
lastBet.nonce : nonce of bets (some sites not have)
lastBet.id : id of bets (some sites not have)
lastBet.chance : win chance of last bet make
lastBet.roll : result number of last bet make
win : true is last bet make has win, false is lose
bets : bet count
wins : win count
winstreak  : streak of win count
losses : lose count
losestreak : streak of lose count
currentstreak : streak of bet count</pre>
      </CCardBody>
    </CCard>

    <CCard class="mb-4">
      <CCardBody>
        <h4>System functions</h4>

        <pre>
dobet() : loop betting
start() : start betting
stop() : stop betting
continuebet() : continue betting after stop()
resetseed() : reset seed fair
resetstats() : reset stats in round
ching() : alert with sound
checkbalance() : check current balance if new deposit
sleep(n) : play bet after n seconds (only work at lua mode)
resettime() : reset run time</pre>
      </CCardBody>
    </CCard>

    <CCard class="mb-4">
      <CCardBody>
        <h4>FAQ</h4>

        <CAccordion>
          <CAccordionItem :item-key="1">
            <CAccordionHeader> Why dice script not work? </CAccordionHeader>
            <CAccordionBody>
              Dice script must clean and follow syntax of programming language. In
              Lua mode, your script must follow syntax of Lua 5.3, read docments
              of Lua 5.3 at:
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
              <a href="https://github.com/webdicebot-project/awesome-scripts" target="_blank">
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
import video from '@/assets/Video_2022-07-12_101052.mp4'

export default {
  video,
  data() {
    return {
      urlTelegramBot:
        process.env.NODE_ENV == 'development'
          ? 'https://t.me/webdicebot_dev_bot'
          : 'https://t.me/webdicebot_bot',
    }
  },
}
</script>

<style>
</style>
