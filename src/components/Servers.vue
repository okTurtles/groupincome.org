<template>
<div class="grid">
  <div class="grid-item" v-for="server in servers" :key="server.name">
    <div class="card">
      <div class="card-body l-server">
        <img v-src="server.img" v-srcset:2="server.imgSrc" class="card-img-top" :alt="server.name">
        <!-- <h4 class="card-category">{{ server.category }}</h4> -->
        <h4 class="card-category"></h4>
        <h3 class="card-title">{{ server.name }}</h3>
        <p class="card-text">{{ server.description }}</p>
        <p class="card-text"><b>Admin:</b> <a class="" :href="server.adminContact">{{ server.admin }}</a></p>
      </div>
      <a class="button is-primary" :href="server.url">Get started</a>
    </div>
  </div>
  <div class="grid-item">
    <div class="card">
      <div class="card-body">
        <img v-src="'/images/servers/defon-social.webp'" v-srcset:2="'/images/servers/defon-social.png'" class="card-img-top">
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
const servers = [{
  name: "Group Income",
  img: '/images/servers/group-income.webp',
  imgSrc: '/images/servers/group-income.png',
  url: 'https://groupincome.app',
  category: 'tech',
  description: "The official Group Income Server.",
  admin: 'okTurtles Foundation Inc.',
  adminContact: 'https://okturtles.org'
}

// ADD YOUR SERVERS HERE !!
// To be listed you must supply the 'admin' and 'adminContact' properties!
]
</script>

<style lang="scss" is:global>
// slot content cannot be styled by <style scoped />: https://github.com/withastro/astro/issues/3045
@import "../styles/_variables";

.l-server {
  a {
    @extend %link-style;
  }
}
</style>

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
  align-items: stretch;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;

  .button {
    align-self: flex-start;
  }
}

.card-body {
  margin-bottom: 1.5rem;
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
}
</style>