<template>
<ModalTemplate modalName="NewsLetterWarningModal"
  :modal-title="modalTitle">
  <div class="c-warning-content">
    <p class="c-para-1"><I18n>Google isn't delivering our newsletter to all subscribers. They aren't even sending it to junk, just black holing it.</I18n></p>
    <p class="c-para-2"><I18n>For that reason we can't accept any Gmail addresses. We recommend one of these alternatives:</I18n></p>

    <ul class="c-url-list">
      <li v-for="link in links" :key="link.id">
        <a class="is-link" target="_blank" :href="link.url">{{ link.url }}</a>
      </li>
    </ul>
  </div>
</ModalTemplate>
</template>

<script setup lang="ts">
import ModalTemplate from './ModalTemplate.vue'
import { inject } from 'vue'

const L: any = inject('L')
const modalTitle = L('Sorry Gmail users!')
const links: any[] = [
  { id: 'tuta', url: 'https://tuta.com/' },
  { id: 'startmail', url: 'https://www.startmail.com/' },
  { id: 'proton', url: 'https://proton.me/mail' },
  { id: 'fastmail', url: 'https://www.fastmail.com/' }
]
</script>

<style lang="scss" scoped>
@use "../../styles/variables" as *;

.c-warning-content {
  position: relative;
  color: $text_0;
}

.c-para-1 {
  margin-bottom: 1.5rem;
}

.c-para-2 {
  margin-bottom: 1rem;
}

.c-url-list {
  position: relative;
  margin-left: 1.25rem;
  list-style-type: disc;

  li {
    margin-bottom: 0.25rem;

    a {
      font-size: 0.925em;
    }
  }
}
</style>
