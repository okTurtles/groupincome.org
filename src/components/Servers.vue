<template>
<div class="grid">
  <div class="grid-item" v-for="server in servers" :key="server.name">
    <div class="card">
      <div class="card-body">
        <img :src="server.img" class="card-img-top" :alt="server.name">
        <!-- <h4 class="card-category">{{ server.category }}</h4> -->
        <h4 class="card-category"></h4>
        <h3 class="card-title">{{ server.name }}</h3>
        <p class="card-text">{{ server.description }}</p>
      </div>
      <a class="button is-primary" :href="server.url">Get started</a>
    </div>
  </div>
  <div class="grid-item">
    <div class="card">
      <div class="card-body">
        <img src="/images/servers/defon-social.webp" class="card-img-top">
        <h4 class="card-category"></h4>
        <h3 class="card-title">{{ "<Your Server>" }}</h3>
        <p class="card-text">Edit the <a class="is-link" href="https://github.com/okTurtles/groupincome.org/edit/master/src/components/Servers.vue">this page on Github</a> to add your server here.</p>
      </div>
      <a class="button is-primary" href="https://github.com/okTurtles/groupincome.org/edit/master/src/components/Servers.vue">Get started</a>
    </div>
  </div>
</div>
</template>

<script setup>
import { resolvePath } from '@/utils/helpers.js'
// TODO: replace with real data
const servers = [{
  name: "Group Income",
  img: resolvePath('/images/servers/group-income.webp'),
  url: 'https://groupincome.app',
  category: "tech",
  description: "The Official GroupIncome Server."
}

// ADD YOUR SERVERS HERE !!

// {
//   name: "ClimateJustice.social",
//   img: resolvePath('/images/servers/climate-justice-social.webp'),
//   category: "tech",
//   description: "We're a server for people who like bikes, transit, and walkable cities. Let's get to know each other!"
// },
// {
//   name: "defon.social",
//   img: resolvePath('/images/servers/defon-social.webp'),
//   category: "tech",
//   description: "DEFCON.social is a place for cyberpunks and those interested in the intersection of technology & society."
// }, {
//   name: "primarycare.app",
//   img: resolvePath('/images/servers/primarycare-app.webp'),
//   category: "health",
//   description: "A place for those in the UK who work in Primary Care and their friends. Hosted by iatro.health for the good of the NHS community. #TeamGP"
// }, {
//   name: "Music.rodeo",
//   img: resolvePath('/images/servers/music-rodeo.webp'),
//   category: "music",
//   description: "The GI server is for all music fans! Feel your heart beat! GroupIncome Server."
// }, {
//   name: "Climatejustice.social",
//   img: resolvePath('/images/servers/climate-justice.webp'),
//   category: "music",
//   description: "ravenation.club is an instance for all the ravers in the universe. Anyone who listens to electronic music (or not) is welcome. "
// }, {
//   name: "computerfairi.es",
//   img: resolvePath('/images/servers/climate-justice-social.webp'),
//   category: "tech",
//   description: "Computer Fairies is a server that aims to be as queer, friendly and furry as possible. We welcome all kinds of computer fairies!"
// }, {
//   name: "primarycare.app",
//   img: resolvePath('/images/servers/primarycare-app.webp'),
//   category: "health",
//   description: "A place for those in the UK who work in Primary Care and their friends. Hosted by iatro.health for the good of the NHS community. #TeamGP"
// }
]
</script>

<style lang="scss" scoped>
.grid {
  width: 70rem;
  max-width: calc(100vw - 2rem);
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(16.6rem, 1fr));
  margin: 4rem auto 6rem auto;
  justify-content: center;
}

.grid-item {
  display: flex;
  justify-content: center;
}

.card {
  padding: 1rem;
  border: 1px solid #D0DEEA;
  background: #F6F8FB;
  border-radius: 8px;
  box-shadow: none;
  color: #000;
  margin-bottom: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
}

.card-img-top {
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  object-fit: cover;
  max-height: 12.5rem;
}

.card-category {
  font-weight: 600;
  font-size: 0.75rem;
  color: #939393;
  text-transform: uppercase;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.card-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.card-text {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.3rem;
  margin-bottom: 1.5rem;
}
</style>