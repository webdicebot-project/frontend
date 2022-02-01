<template>
  <div>
    <CCard class="mb-4">
      <CCardBody>
        <h4>Awesome Scripts</h4>

        <CListGroup>
          <CListGroupItem v-for="url in urls" :key="url.title">
            <span
              class="copy text-primary"
              v-clipboard:copy="url.url"
              v-clipboard:success="onCopy"
            >
              {{ url.title }}
              <CIcon name="cil-copy" />
            </span>
          </CListGroupItem>
        </CListGroup>

        <p class="pt-4">
          Make by
          <a href="https://facebook.com/ttluan" target="_blank">
            Truong Trieu Luan
          </a>
        </p>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
export default {
  data() {
    return {
      urls: [
        {
          title: 'allTatic.lua',
          url: 'https://raw.githubusercontent.com/webdicebot-project/awesome-scripts/master/allTatic.lua',
        },
        {
          title: 'bet-boom.lua',
          url: 'https://raw.githubusercontent.com/webdicebot-project/awesome-scripts/master/bet-boom.lua',
        },
        {
          title: 'clean.lua',
          url: 'https://raw.githubusercontent.com/webdicebot-project/awesome-scripts/master/clean.lua',
        },
        {
          title: 'forDuck.lua',
          url: 'https://raw.githubusercontent.com/webdicebot-project/awesome-scripts/master/forDuck.lua',
        },
        {
          title: 'makecolor.lua',
          url: 'https://raw.githubusercontent.com/webdicebot-project/awesome-scripts/master/makecolor.lua',
        },
        {
          title: 'new-style.lua',
          url: 'https://raw.githubusercontent.com/webdicebot-project/awesome-scripts/master/new-style.lua',
        },
        {
          title: 'newAI.lua',
          url: 'https://raw.githubusercontent.com/webdicebot-project/awesome-scripts/master/newAI.lua',
        },
        {
          title: 'newStardy.lua',
          url: 'https://raw.githubusercontent.com/webdicebot-project/awesome-scripts/master/newStardy.lua',
        },
        {
          title: 'newVersion.lua',
          url: 'https://raw.githubusercontent.com/webdicebot-project/awesome-scripts/master/newVersion.lua',
        },
        {
          title: 'noCacularBet.lua',
          url: 'https://raw.githubusercontent.com/webdicebot-project/awesome-scripts/master/noCacularBet.lua',
        },
        {
          title: 'risk.lua',
          url: 'https://raw.githubusercontent.com/webdicebot-project/awesome-scripts/master/risk.lua',
        },
        {
          title: 'smartBet.lua',
          url: 'https://raw.githubusercontent.com/webdicebot-project/awesome-scripts/master/smartBet.lua',
        },
        {
          title: 'taticNew.lua',
          url: 'https://raw.githubusercontent.com/webdicebot-project/awesome-scripts/master/taticNew.lua',
        },
      ],
    }
  },
}
</script>

<style></style>
