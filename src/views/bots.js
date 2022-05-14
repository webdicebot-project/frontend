import api from '@/configs/api'

const bots = [
  {
    label: 'Select bot you need',
    value: 'Not have installer in this select',
  },
  {
    label: 'betfury.io - dice',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'betfury-dice';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'betfury.io - limbo',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'betfury-limbo';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'bitdice.me - dice',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'bitdice';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'bitsler.com - boom',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'bitsler-boom';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'bitsler.com - dice',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'bitsler-dice';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'bitsler.com - twist',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'bitsler-twist';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'bitvest.io - dice',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'bitvest';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'casinoroyale.bet - dice classic',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'casinoroyale-dice-classic';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'chips.gg - dice',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'chips-dice';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'crypto.games - dice',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'crypto-games-dice';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'cryptodicecasino.com - dice',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'cryptodicecasino-dice';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'cryptoplay.io - dice classic',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'cryptoplay-dice';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'cryptoplay.io - limbo',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'cryptoplay-limbo';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'duckdice.io - bonuses',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'duckdice-bonuses';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'duckdice.io - easter',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'duckdice-easter';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'duckdice.io - faucet',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'duckdice-faucet';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'duckdice.io - main',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'duckdice-main';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'duckdice.io - xmas',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'duckdice-xmas';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'faucetpay.io - dice',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'faucetpay-dice';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'faucetpay.io - limbo',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'faucetpay-limbo';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'freebitco.in',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'freebitco';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'jacksclub.io - blaze (work on emulator)',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'jacksclub-blaze';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'jacksclub.io - dice (work on emulator)',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'jacksclub-dice';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'jacksclub.io - wheel (work on emulator)',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'jacksclub-wheel';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'luckydiamond.io - dice',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'luckydiamond-dice';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'luckydiamond.io - limbo',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'luckydiamond-limbo';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'megaplay.io - dice',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'megaplay-dice';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'megaplay.io - limbo',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'megaplay-limbo';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'paradice.in - dice',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'paradice';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'pasino.com - hash dice',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'pasino-hash-dice';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'pasino.com - limbo',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'pasino-limbo';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'primedice.com',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'primedice';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'primedice.com (work on emulator)',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'primdice-emulator';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'sicodice.com',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'sicodice';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'stake.com - dice',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'stake-dice';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'stake.com - dice (work on emulator)',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'stake-dice-emulator';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'stake.com - limbo',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'stake-limbo';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'stake.com - limbo (work on emulator)',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'stake-limbo-emulator';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'trustdice.win - dice',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'trustdice-dice';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'windice.io - dice',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'windice-dice';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'wintomato.com - dice',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'wintomato-dice';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'wolf.bet - dice',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'wolf-dice';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
  {
    label: 'wolf.bet - limbo',
    value: `const BOT_API = '${api}';
const DICE_SITE = 'wolf-limbo';
(async function () {
  await fetch(BOT_API + '/bot/init')
    .then((response) => response.text())
    .then((txt) => eval(txt))
})();`,
  },
]

export default bots
