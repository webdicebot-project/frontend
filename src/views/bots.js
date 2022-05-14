import api from '@/configs/api'

const bots = [
  {
    label: 'Select bot you need',
    value: 'Not have installer in this select',
  },
  {
    label: 'betfury.io - dice',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'betfury-dice'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'betfury.io - limbo',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'betfury-limbo'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'bitdice.me - dice',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'bitdice'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'bitsler.com - boom',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'bitsler-boom'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'bitsler.com - dice',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'bitsler-dice'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'bitsler.com - twist',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'bitsler-twist'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'bitvest.io - dice',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'bitvest'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'casinoroyale.bet - dice classic',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'casinoroyale-dice-classic'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'chips.gg - dice',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'chips-dice'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'crypto.games - dice',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'crypto-games-dice'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'cryptodicecasino.com - dice',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'cryptodicecasino-dice'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'cryptoplay.io - dice classic',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'cryptoplay-dice'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'cryptoplay.io - limbo',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'cryptoplay-limbo'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'duckdice.io - bonuses',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'duckdice-bonuses'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'duckdice.io - easter',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'duckdice-easter'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'duckdice.io - faucet',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'duckdice-faucet'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'duckdice.io - main',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'duckdice-main'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'duckdice.io - xmas',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'duckdice-xmas'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'faucetpay.io - dice',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'faucetpay-dice'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'faucetpay.io - limbo',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'faucetpay-limbo'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'freebitco.in',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'freebitco'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'jacksclub.io - blaze (work on emulator)',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'jacksclub-blaze'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'jacksclub.io - dice (work on emulator)',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'jacksclub-dice'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/inite'
document.body.appendChild(script)`,
  },
  {
    label: 'jacksclub.io - wheel (work on emulator)',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'jacksclub-wheel'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'luckydiamond.io - dice',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'luckydiamond-dice'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'luckydiamond.io - limbo',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'luckydiamond-limbo'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'megaplay.io - dice',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'megaplay-dice'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'megaplay.io - limbo',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'megaplay-limbo'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'paradice.in - dice',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'paradice'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/paradice'
document.body.appendChild(script)`,
  },
  {
    label: 'pasino.com - hash dice',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'pasino-hash-dice'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'pasino.com - limbo',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'pasino-limbo'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'primedice.com',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'primedice'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'primedice.com (work on emulator)',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'primdice-emulator'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'sicodice.com',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'sicodice'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'stake.com - dice',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'stake-dice'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'stake.com - dice (work on emulator)',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'stake-dice-emulator'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'stake.com - limbo',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'stake-limbo'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'stake.com - limbo (work on emulator)',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'stake-limbo-emulator'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'trustdice.win - dice',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'trustdice-dice'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'windice.io - dice',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'windice-dice'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'wintomato.com - dice',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'wintomato-dice'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'wolf.bet - dice',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'wolf-dice'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
  {
    label: 'wolf.bet - limbo',
    value: `const BOT_URL = '${api}'
const BOT_SITE = 'wolf-limbo'
const script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL + '/bot/init'
document.body.appendChild(script)`,
  },
]

export default bots
