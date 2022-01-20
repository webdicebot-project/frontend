<template>
  <div>
    <CCard class="mb-4">
      <CCardBody>
        <h4>Terms of use</h4>

        <p>
          The following user agreement is to read in its entirety prior to the
          use of WebDiceBot.Xyz's products and services. The agreement
          constitutes a legal binding between the user and all services found on
          WebDiceBot.Xyz
        </p>

        <pre>
1. You must know what is dice, dice bot, dice script
2. You must know the Lua language (v5.3) or Javascript language for make dice script
3. You must control your crypto currency in dice
4. You must have license when use WebDiceBot.Xyz
5. License can use for all account, all dice sites and all devices of you
6. Upgrade level max of security (strong password, 2FA, etc..) for your account at all dice sites
7. Updating...</pre
        >
      </CCardBody>
    </CCard>

    <CCard class="mb-4">
      <CCardBody>
        <h4>How to use?</h4>

        <pre>1. Chat with <a :href="urlTelegramBot" target="_blank">Telegram Bot</a> to create your profile then <router-link to="/pages/login">Login</router-link> and <router-link to="/buy-license">Buy License</router-link>
2. Copy installer script from <router-link to="/bot-installer">Bot Installer</router-link>
3. Paste to console tab of browser developer tool at dice site
          </pre>
      </CCardBody>
    </CCard>

    <CRow>
      <CCol md="6">
        <CCard class="mb-4">
          <CCardBody>
            <h4>Lua dice script</h4>

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
end</pre
            >
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md="6">
        <CCard class="mb-4">
          <CCardBody>
            <h4>Javascript dice script</h4>

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
}</pre
            >
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
lastBet.nonce : nonce of bets (some dice sites not have)
lastBet.id : id of bets (some dice sites not have)
lastBet.chance : win chance of last bet make
lastBet.roll : result number of last bet make
win : true is last bet make has win, false is lose
bets : bet count
wins : win count
winstreak  : streak of win count
losses : lose count
losestreak : streak of lose count
currentstreak : streak of bet count</pre
        >
      </CCardBody>
    </CCard>

    <CCard class="mb-4">
      <CCardBody>
        <h4>System functions</h4>

        <pre>
dobet() : loop betting
start() : start betting
stop() : stop betting
continuebet() : continue betting after call function stop()
resetseed() : reset seed fair
resetstats() : reset stats in round
ching() : alert with sound
checkbalance() : check current balance if new deposit
sleep(n) : play bet after n seconds (only work at lua mode)
resettime() : reset run time</pre
        >
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
export default {
  data() {
    return {
      urlTelegramBot:
        window.location.hostname == 'localhost'
          ? 'https://t.me/webdicebot_dev_bot'
          : 'https://t.me/webdicebot_bot',
    }
  },
}
</script>

<style></style>
