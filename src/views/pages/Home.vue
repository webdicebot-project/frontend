<template>
  <div class="home pt-5 vld-parent">
    <div class="jumbotron jumbotron-fluid text-center">
      <div class="container mb-5">
        <h2 class="text-warning">
          <strong> Web DiceBot </strong>
        </h2>
        <p>Automate betting with programmer mode directly on dice sites</p>
      </div>

      <div class="container mb-5">
        <img
          :src="$options.photo"
          alt="Web DiceBot Interface"
          class="w-100 shadow-lg"
        />
      </div>

      <div class="container">
        <router-link to="/get-started">
          <button type="button" class="btn btn-warning btn-lg my-5">
            Get Started
          </button>
        </router-link>
      </div>
    </div>

    <div class="container-fuild my-5">
      <div class="container">
        <h3 class="text-center py-5">
          <strong>How it work?</strong>
        </h3>

        <div class="row text-center">
          <div class="col-sm-4">
            <h1><i class="fa-solid fa-robot text-primary"></i></h1>
            <h4>Make Interface</h4>
            <p>Bot interface maked directly on dice sites after you install</p>
          </div>
          <div class="col-sm-4">
            <h1><i class="fa-solid fa-code text-warning"></i></h1>
            <h4>Read Script</h4>
            <p>Bot will read your dice script (Lua/Javascript) on script box</p>
          </div>
          <div class="col-sm-4">
            <h1><i class="fa-solid fa-play text-success"></i></h1>
            <h4>Auto Betting</h4>
            <p>
              Betting base on dice script, earning or losing depend on your
              script
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fuild my-5">
      <div class="container">
        <h3 class="py-5 text-center">
          <strong>Support sites</strong>
        </h3>

        <div class="row">
          <div class="col-sm-6 mb-3">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-success"></i>
                <a
                  href="https://bc.game/i-1fz8gf65-n"
                  target="_blank"
                  class="footer-link"
                >
                  bc.game
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-danger"></i>
                <a
                  href="https://999dice.com"
                  target="_blank"
                  class="footer-link"
                >
                  999dice.com
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-success"></i>
                <a
                  href="https://betfury.io/?r=5f86fffc38b5653094d3206b"
                  target="_blank"
                  class="footer-link"
                >
                  betfury.io
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-success"></i>
                <a
                  href="https://bit555.io/i-58ej4axk-n/"
                  target="_blank"
                  class="footer-link"
                >
                  bit555.io
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-danger"></i>
                <a
                  href="https://betgalaxy.io"
                  target="_blank"
                  class="footer-link"
                >
                  betgalaxy.io
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-danger"></i>
                <a
                  href="https://betking.io"
                  target="_blank"
                  class="footer-link"
                >
                  betking.io
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-success"></i>
                <a
                  href="https://bitsler.com/?ref=mhqb365"
                  target="_blank"
                  class="footer-link"
                >
                  bitsler.com
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-success"></i>
                <a
                  href="https://bitvest.io/?r=134231"
                  target="_blank"
                  class="footer-link"
                >
                  bitvest.io
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-success"></i>
                <a
                  href="https://casinoroyale.bet/ref/mlgck171489"
                  target="_blank"
                  class="footer-link"
                >
                  casinoroyale.bet
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-success"></i>
                <a
                  href="https://chips.gg/?r=mhqb365"
                  target="_blank"
                  class="footer-link"
                >
                  chips.gg
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-success"></i>
                <a
                  href="https://crypto.games?i=uwGdD2TzZG"
                  target="_blank"
                  class="footer-link"
                >
                  crypto.games
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-success"></i>
                <a
                  href="https://cryptodicecasino.com/?ref=32"
                  target="_blank"
                  class="footer-link"
                >
                  cryptodicecasino.com
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-success"></i>
                <a
                  href="https://cryptoplay.io/?c=webdicebot-139"
                  target="_blank"
                  class="footer-link"
                >
                  cryptoplay.io
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-success"></i>
                <a
                  href="https://duckdice.io/?c=a8e163e934"
                  target="_blank"
                  class="footer-link"
                >
                  duckdice.io
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-success"></i>
                <a
                  href="https://faucetpay.io/?r=2102948"
                  target="_blank"
                  class="footer-link"
                >
                  faucetpay.io
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-success"></i>
                <a
                  href="https://freebitco.in/?r=38164796"
                  target="_blank"
                  class="footer-link"
                >
                  freebitco.in
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-danger"></i>
                <a
                  href="https://gigabet.com"
                  target="_blank"
                  class="footer-link"
                >
                  gigabet.com
                </a>
              </li>
            </ul>
          </div>

          <div class="col-sm-6 mb-3">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-success"></i>
                <a
                  href="https://jacksclub.io/?r=~mhqb365"
                  target="_blank"
                  class="footer-link"
                >
                  jacksclub.io
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-success"></i>
                <a
                  href="https://luckydiamond.io/r/mhqb365"
                  target="_blank"
                  class="footer-link"
                >
                  luckydiamond.io
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-success"></i>
                <a
                  href="https://megaplay.io/?c=ZNae4ChvlSSADkGsIxFf"
                  target="_blank"
                  class="footer-link"
                >
                  megaplay.io
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-success"></i>
                <a
                  href="https://nanogames.io/i-f0810ew-n/"
                  target="_blank"
                  class="footer-link"
                >
                  nanogames.io
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-danger"></i>
                <a
                  href="https://luckyfish.io"
                  target="_blank"
                  class="footer-link"
                >
                  luckyfish.io
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-danger"></i>
                <a
                  href="https://luckygames.io"
                  target="_blank"
                  class="footer-link"
                >
                  luckygames.io
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-success"></i>
                <a
                  href="https://paradice.in/?c=@mhqb365"
                  target="_blank"
                  class="footer-link"
                >
                  paradice.in
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-success"></i>
                <a
                  href="https://pasino.com/?user_id=41111"
                  target="_blank"
                  class="footer-link"
                >
                  pasino.com
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-success"></i>
                <a
                  href="https://primedice.com/?c=3e6d33fce7"
                  target="_blank"
                  class="footer-link"
                >
                  primedice.com
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-success"></i>
                <a
                  href="https://sicodice.com/?ref=mhqb365"
                  target="_blank"
                  class="footer-link"
                >
                  sicodice.com
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-success"></i>
                <a
                  href="https://stake.com/?c=1dddd271b9"
                  target="_blank"
                  class="footer-link"
                >
                  stake.com
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-success"></i>
                <a
                  href="https://starbets.io/ref=r3oaasMDgA"
                  target="_blank"
                  class="footer-link"
                >
                  starbets.io
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-danger"></i>
                <a
                  href="https://wixiplay.io"
                  target="_blank"
                  class="footer-link"
                >
                  wixiplay.io
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-success"></i>
                <a
                  href="https://windice.io/?r=mhqb365"
                  target="_blank"
                  class="footer-link"
                >
                  windice.io
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-success"></i>
                <a
                  href="https://wintomato.com/en/registration/1604"
                  target="_blank"
                  class="footer-link"
                >
                  wintomato.com
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-success"></i>
                <a
                  href="https://wolf.bet/?c=mhqb365"
                  target="_blank"
                  class="footer-link"
                >
                  wolf.bet
                </a>
              </li>
              <li class="list-group-item">
                <i class="fa-solid fa-globe text-danger"></i>
                <a
                  href="https://yolodice.com"
                  target="_blank"
                  class="footer-link"
                >
                  yolodice.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="container text-center my-5">
      <router-link to="/get-started">
        <button type="button" class="btn btn-warning btn-lg my-5">
          Get Started
        </button>
      </router-link>
    </div>

    <div class="container text-center py-5">
      <div class="row justify-content-center py-5">
        <div class="col-md-4 p-2">
          <i class="fa-brands fa-telegram text-info"></i>
          <a href="https://t.me/webdicebotchannel" target="_blank">
            Telegram Channel
          </a>
        </div>
        <div class="col-md-4 p-2">
          <i class="fa-brands fa-telegram text-info"></i>
          <a href="https://t.me/webdicebotgroup" target="_blank">
            Telegram Group
          </a>
        </div>
        <div class="col-md-4 p-2">
          <i class="fa-brands fa-github"></i>
          <a href="https://github.com/webdicebot-project" target="_blank">
            Github
          </a>
        </div>
      </div>

      <p>
        Web DiceBot / Since 2019
      </p>
    </div>
  </div>
</template>

<script>
import photo from '@/assets/webdicebot.jpg'

export default {
  photo,
}
</script>

<style scoped>
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css);
</style>
