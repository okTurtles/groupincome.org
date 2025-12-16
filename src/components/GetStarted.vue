<template>
<div>
  <div class="c-feature-boxes">
    <div class="c-feature-box">
      <div class="c-feature-box-title">{{ L('Choose a Server') }}</div>
      <div class="c-feature-box-para" v-html="L('Use {a1_}our official server{_a}, choose from {a2_}a list of{_a} independently operated servers, or run your own!', { a1_: '<a href=\'https://groupincome.app\' class=\'is-link\'>', _a: '</a>', a2_: '<a class=\'is-link\' v-href=\'/get-started#servers\'>' })" />
    </div>

    <div class="c-feature-box">
      <div class="c-feature-box-title">{{ L('Create an account') }}</div>
      <div class="c-feature-box-para">
        {{ L("Group Income doesn't use cookies to manage user accounts.") }}
        <a href="https://shelterprotocol.net" target="_blank" class="is-display-block is-link">{{ L('Read more about our technology') }}</a>
      </div>
    </div>

    <div class="c-feature-box">
      <div class="c-feature-box-title">{{ L('Join a Group and Start Sharing!') }}</div>
      <div class="c-feature-box-para">
        {{ L('Contribute with monetary or non-monetary donations and secure everyone in your group with a basic income.') }}
      </div>
    </div>
  </div>

  <div class="c-video-wrapper">
    <hr class="c-video-divider"/>

     <iframe
      id="odysee-iframe"
      style="width:100%; aspect-ratio:16 / 9;" class="has-deep-box-shadow"
      src="https://odysee.com/%24/embed/%40okTurtles%3Ae%2Fgroup_income_intro%3A6?r=J91Yd9UJDqP36LmGQZaGwG95T1NcnzDW"
      allowfullscreen>
    </iframe>
    <!-- <iframe style="width:100%; aspect-ratio:16 / 9;" class="has-deep-box-shadow"
      src="https://www.youtube-nocookie.com/embed/bCxvP_qwTD4?si=oKRH1nhY3qtMVA4k"
      title="YouTube video player"
      frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

  </div>
</div>
</template>

<script>
// @i18n-area: get-started

import { inject } from 'vue'

export default {
  name: 'GetStarted',
  props: {
    locale: {
      type: String,
      required: false,
      default: ''
    }
  },
  setup () {
    const useTranslation = inject('useTranslation')
    return {
      useTranslation
    }
  },
  computed: {
    L () {
      return this.useTranslation(this.locale, 'get-started')
    }
  }
}
</script>

<style lang="scss" scoped>
@use "../styles/variables" as *;

.c-feature-boxes {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 5rem;
}

.c-feature-box {
  max-width: 24.5rem;
  margin: 1rem;
  position: relative;
  background-color: rgba(#E7EFF4, 0.5);
  border-radius: 1rem;
  padding: 3.3rem 1.5rem 2rem 1.5rem;
  margin-top: 2rem;
  text-align: center;

  .c-feature-box-title {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  &::after {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    top: -1rem;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    color: #fff;
  }

  &:nth-child(1)::after {
    content: '1';
    background: #0288D1;
    box-shadow: 0 0 0 0.4rem  rgba(#0288D1, 0.4);
  }

  &:nth-child(2)::after {
    content: '2';
    background: #F99201;
    box-shadow: 0 0 0 0.4rem  rgba(#F99201, 0.4);
  }

  &:nth-child(3)::after {
    content: '3';
    background: #A1D10E;
    box-shadow: 0 0 0 0.4rem  rgba(#A1D10E, 0.4);
  }

  .is-link.is-display-block {
    margin-left: auto;
    margin-right: auto;
  }
}

.c-video-wrapper {
  position: relative;
  width: calc(100% + 2rem);
  margin: 8rem auto 5rem -1rem;

  @include tablet {
    width: 100%;
    max-width: 44rem;
    margin: 8rem auto 5rem;
  }

  @include desktop {
    max-width: 50rem;
  }

  @include from(1400px) {
    max-width: 56rem;
  }

  .c-video-divider {
    border-bottom: 1px solid $divider_1;
    margin: 0 auto 6rem;
    width: 7.25rem;
    display: none;

    @include tablet {
      display: block;
      margin-bottom: 8rem;
    }
  }
}
</style>
