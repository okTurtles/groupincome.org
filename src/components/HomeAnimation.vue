<template>
  <div class="c-wrapper" ref="wrapper">
    <Sides color="#5DC9F1"
      :styles="{ 'top': '40rem', 'right': 0, 'transform': 'rotate(-180deg)' }"
      class="right-side c-side-blue"></Sides>
    <Sides color="#F89202" :styles="{ 'top': '120rem' }"></Sides>
    <Sides color="#A1D10E"
      :styles="{ 'top': '180rem', 'transform': 'rotate(-180deg)', 'right': 0, 'transform': 'rotate(-180deg)' }"
      class="right-side"></Sides>

    <div class="graphic-wrapper">
      <section class="container c-main-container">
        <div class="c-faces" ref="faces">
          <div class="c-face" v-for="i in 8" :id="`face-${i}`" :key="i">
            <img class="c-face-img" v-src="`/images/faces/${i}.jpg`" v-srcset:2="`/images/faces/${i}.jpg`" />
          </div>
        </div>

        <div class="c-main-wrapper" id="header1">
          <h1 class="is-font-poppin c-page-title">Group Income</h1>
          <!-- <h1 class="is-title-1 c-main-title">
            Basic Income for your
            friends and family.
          </h1> -->

          <div class="c-video-wrapper">
            <!-- <VideoPlayer class="has-deep-box-shadow"
              src='https://okturtles.org/videos/group_income_ending_big_tech_control.mp4'
              mimeType='video/mp4' /> -->

            <iframe id="odysee-iframe" style="width:100%; aspect-ratio:16 / 9;"
              class="has-deep-box-shadow"
              src="https://odysee.com/%24/embed/%40groupIncome%3Ac%2Fgroup_income_animation_v2-%281080p%29%3A9?r=J91Yd9UJDqP36LmGQZaGwG95T1NcnzDW"
              allowfullscreen></iframe>

            <!-- <iframe class="has-deep-box-shadow" style="width:100%; aspect-ratio:16 / 9;"
              src="https://www.youtube-nocookie.com/embed/md54gZAtWA8?si=QH8HqnBwWWHVeKOf"
              title="YouTube video player"
              frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->
          </div>

          <I18n tag="p" class="is-subtitle c-main-para" area="home">Private community software with a financial safety net, so you can focus on what matters.</I18n>

          <div class="scroll-btn-container">
            <ScrollDownArrow targetSelector="#container2 .c-container-title" />
          </div>
        </div>
      </section>

      <section class="container span-container c-container" id="container2">
        <div class="span-2" id="header2">
          <div class="is-title-3 c-container-posttitle">{{ L('What is Group Income?') }}</div>
          <p class="is-title-2 c-container-title">{{ L('A safe space to financially support each other.') }}</p>
          <p class="c-container-para">{{ L('Help guarantee access to fundamental needs, independent of life circumstances in a safe and private environment thanks to end-to-end encryption.') }}</p>
          <a class="c-container-link is-link" v-href="'/faq'">{{ L('Learn more about Basic Income.') }}</a>
          <a class="is-link" v-href="'/privacy-policy'">{{ L('Read more about our privacy and security.') }}</a>
        </div>

        <div class="span-2" id="circle-graph">
          <img class="c-container-image" v-src="'/images/temp/homepage-panel2.jpg'" ref="panel1Circle" />
        </div>
      </section>

      <div class="sections-container" id="freeze-wrapper">
        <section class="container span-container" id="container3">
          <div class="span-2 c-container-header" id="header3">
            <div class="is-title-3 c-container-posttitle">{{ L('Why it matters') }}</div>
            <p class="is-title-2 c-container-title">{{ L('Every individual is valuable.') }}</p>
            <p class="c-container-para">{{ L('Many people contribute to our lives and our society, but are often not financially rewarded. From students to unpaid careers, from volunteers to care givers, from unemployed people to unwell.') }}</p>
            <p class="c-container-para c-mt-16">{{ L('Basic Income can improve the quality of life for millions of people, simply through providing them with basic financial security and the peace of mind that goes with it.') }}</p>
            <a class="c-container-link is-link" v-href="'/faq'">{{ L('Learn more about Basic Income.') }}</a>
          </div>

          <div class="span-2">
            <img class="c-container-image" v-src="'/images/temp/homepage-panel3.png'" ref="graph1" />
          </div>
        </section>

        <section class="container span-container" id="container4">
          <div class="span-2 c-container-header" id="header4">
            <div class="is-title-3 c-container-posttitle">{{ L('Set a "mincome" floor') }}</div>
            <p class="is-title-2 c-container-title">{{ L('Create your own financial safety net.') }}</p>
            <p class="c-container-para">{{ L(`Create stronger communities and ensure basic financial security for the people you care about — set a minimum income floor ("mincome"). Each month, group members help those who haven't crossed the mincome threshold.`) }}</p>
            <a class="c-container-link is-link" href="https://groupincome.org/simulator/">{{ L('Try out the payments simulator.') }}</a>
          </div>

          <div class="span-2">
            <img class="c-container-image" v-src="'/images/temp/homepage-panel4.png'" />
            <div class="c-line"></div>
          </div>
        </section>

        <section class="container span-container span-reverse" id="contribute">
          <div class="span-2">
            <div class="is-title-3 c-container-posttitle">{{ L('Non-monetary Contributions') }}</div>
            <p class="is-title-2 c-container-title">{{ L('Everyone has something to offer.') }}</p>
            <p class="c-container-para">{{ L('Members of the group can contribute with monetary or non-monetary donations, securing everyone in your group with a basic income, independent of employment.') }}</p>
          </div>

          <div class="span-2">
            <img class="c-container-image" v-src="'/images/temp/homepage-panel5_2x.jpg'" />
          </div>
        </section>

        <section class="container span-container c-chat-section" id="container5">
          <div class="span-2 c-container-header" id="header5">
            <div class="is-title-3 c-container-posttitle">{{ L('Empower Your Community') }}</div>
            <p class="is-title-2 c-container-title">{{ L('The best private chat for your community.') }}</p>
            <p class="c-container-para">{{ L('A powerful community chat with emoji reactions, polls, file attachments, and more — all completely private and end-to-end encrypted.') }}</p>
          </div>

          <div class="c-chat-img-container">
            <img class="c-chat-image has-deep-box-shadow" v-src="'/images/temp/groupincome-chat-screenshot.jpeg'" />
          </div>
        </section>
      </div>

      <section class="container span-container c-container span-reverse" id="container6">
        <div class="span-2 c-container-header" id="header6">
          <div class="is-title-3 c-container-posttitle">{{ L('Stay Safe') }}</div>
          <p class="is-title-2 c-container-title">{{ L('Security & Privacy') }}</p>
          <p class="c-container-para">
            <span v-html="L('Group Income is built on top of an end-to-end encrypted protocol called {a_}Shelter Protocol{_a}.', { a_: '<a class=\'is-link\' href=\'https://shelterprotocol.net\' target=\'_blank\'>', _a: '</a>' })"></span>
            {{ L('Your data is stored in encrypted form on servers, and decrypted locally on your device. The keys to decrypt that data are derived from your password and are also stored on your device.') }}
          </p>
          <a class="c-container-link is-link" v-href="'/privacy-policy'">{{ L('Read more about our privacy and security.') }}</a>
        </div>

        <div class="span-2">
          <img class="c-container-image" v-src="'/images/temp/homepage-panel8_2x.jpg'" />
        </div>
      </section>

      <Swoosh />
    </div>

    <section class="container c-get-started">
      <h3 class="is-title-2 c-container-title">{{ L('Group Income is end-to-end encrypted and self-hosted.') }}</h3>
      <div class="is-title-3 c-container-posttitle">{{ L("Here's how to get started:") }}</div>

      <GetStarted />
    </section>

    <div class="graphic-wrapper swoosh-dark-blue">
      <section class="container span-container">
        <div class="span-2">
          <div class="is-title-3 c-container-posttitle">GROUP INCOME</div>
          <p class="is-title-2 c-container-title">{{ L('Basic Income for your friends and family.') }}</p>

          <div class="c-buttons">
            <a class="c-navbar-item button is-big is-primary" v-href.locale="'/get-started'">{{ L('Get started') }}</a>
            <a class="c-navbar-item button is-big is-outlined" v-href="'/donate'">{{ L('Donate') }}</a>
          </div>
        </div>

        <div class="span-2">
          <div class="c-phone-wrapper"><img class="c-container-image" v-src="'/images/temp/homepage-panel7.png'" /></div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
// @i18n-area: home

import { inject } from 'vue'
import Swoosh from './graphics/Swoosh.vue'
import Sides from './graphics/Sides.vue'
import Browser from './graphics/Browser.vue'
import GetStarted from './GetStarted.vue'
import ScrollDownArrow from './ScrollDownArrow.vue'
// import VideoPlayer from './VideoPlayer.vue'

export default {
  components: {
    Swoosh,
    Browser,
    Sides,
    GetStarted,
    ScrollDownArrow
    // VideoPlayer
  },
  setup () {
    const useTranslation = inject('useTranslation')
    return {
      useTranslation
    }
  },
  computed: {
    L () {
      return this.useTranslation('home')
    }
  }
}
</script>

<style lang="scss" scoped>
@use "../styles/variables" as *;

@mixin phone_narrow {
  @media screen and (max-width: 430px) {
    @content;
  }
}

// Rpevent rendering glitch
.right-side {
  right: 0;
}

.c-side-blue {
  z-index: 3;
}

#circle-graph {
  position: relative;
  margin: 0 auto;

  @include desktop {
    margin-top: 2rem;
    margin-bottom: -4rem;
  }
}

.c-wrapper {
  position: relative;
  padding-bottom: 2rem;
}

.container {
  position: relative;
  z-index: 2; // A fix for the bug where Sides.vue covers the page content.
  margin: 0 auto;
  padding: 4rem 1rem;
  display: flex;
  flex-direction: column;

  @include tablet {
    padding: 6rem 1rem;
  }
}

.span-container.c-chat-section {
  .c-chat-img-container {
    position: relative;
    display: flex;
    justify-content: flex-end;
    margin-top: 2.75rem;
    transform: translateX(1rem);

    .c-chat-image {
      position: relative;
      width: 90vw;
      height: auto;
      flex-shrink: 0;
      border-radius: 0.5rem;
    }
  }

  @include desktop {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: max-content;
    max-width: unset;
    padding: 6rem 0;

    .c-container-header {
      width: max-content;
      max-width: 36vw;
      flex-shrink: 0;
      margin-right: 1.25rem;
    }

    .c-chat-img-container {
      display: block;
      transform: translateX(3rem);
      width: max-content;
      margin-top: 0;

      .c-chat-image {
        width: 50vw;
      }
    }
  }
}

.graphic-wrapper {
  position: relative;
  padding-bottom: 4rem;
  margin-bottom: 4rem;
  overflow: hidden;


  @include desktop {
    padding-bottom: 2rem;
    margin-bottom: 4rem;
  }
}

.c-faces {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  width: 100%;
  z-index: 1;
  pointer-events: none;

  @include desktop {
    width: 1280px;
  }
}

.c-line {
  opacity: 0;
  width: 105%;
  height: 1px;
  position: absolute;
  left: 0;
  top: 110px;
  z-index: -1;
  transition: opacity ease-out .3s;

  &::before,
  &::after {
    content: '';
    position: absolute;
    transition: all ease-in .3s;
    top: 100px;
  }

  &::before {
    content: "$500";
    background-image: url("data:image/svg+xml,%3Csvg width='56' height='24' viewBox='0 0 56 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M46.0002 23.9995L4.00024 23.9995C1.7911 23.9995 0.000244141 22.2087 0.000244141 19.9995V3.99951C0.000244141 1.79037 1.79111 -0.000488281 4.00024 -0.000488281L46.0002 -0.000488281L56.0002 11.9995L46.0002 23.9995Z' fill='%23D0DEEA'/%3E%3C/svg%3E");
    display: flex;
    justify-content: center;
    align-items: center;
    width: 56px;
    height: 24px;
    margin-top: -12px;
    padding-right: 6px;
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 12px;
    z-index: 2;
  }

  &::after {
    background: #D0DEEA;
    width: 0%;
    height: 1px;
  }
}

#face-1 {
  top: 78vh;
  left: 20%;

  @include tablet {
    top: 74vh;
    left: 10%;
  }

  @include desktop {
    top: 72vh;
    left: 19%;
    transform: scale(.8);
  }
}

#face-2 {
  top: 68vh;
  left: 1%;

  @include tablet {
    top: 45vh;
    left: 4%;
  }

  @include desktop {
    top: 59vh;
    left: 4%;
  }
}

#face-3 {
  top: 6vh;
  left: 4%;

  @include tablet {
    top: 13vh;
    left: 8%;
  }

  @include tall {
    top: 20vh;
  }

  @include desktop {
    top: 35vh;
    left: 6%;
    transform: scale(.8);
  }
}

#face-4 {
  top: 79vh;
  left: 56%;

  @include tablet {
    left: 73%;
    transform: scale(0.8);
  }

  @include desktop {
    top: 69vh;
    left: 84%;
    transform: scale(1.1);
  }
}

#face-5 {
  top: 3vh;
  left: 39%;

  @include tablet {
    top: 5vh;
    left: 29%;
  }

  @include tall {
    top: 24vh;
  }

  @include desktop {
    top: 15vh;
    left: 16%;
  }
}

#face-6 {
  top: 72vh;
  left: 82%;

  @include tablet {
    top: 47vh;
    left: 89%;
  }

  @include desktop {
    top: 45vh;
    left: 97%;
  }
}

#face-7 {
  top: 1.5vh;
  left: 61%;

  @include tablet {
    top: 4vh;
    left: 73%;
  }

  @include tall {
    top: 12vh;
    left: 57%;
  }

  @include desktop {
    top: 46vh;
    left: 85%;
  }
}

#face-8 {
  top: 10vh;
  left: 75%;

  @include phone_narrow {
    top: 8vh;
    left: 72%;
    transform: scale(0.4);
  }

  @include tablet {
    top: 12vh;
    left: 87%;
  }

  @include tall {
    top: 22vh;
    left: 79%;
  }

  @include desktop {
    top: 24vh;
    left: 92%;
    transform: scale(1.2);
  }
}

.c-face {
  position: absolute;

  @include phone {
    transform: scale(.5);
  }
}

.c-face-img {
  border-radius: 100%;
  margin-top: -50%;
  max-width: fit-content;

  @include desktop {
    margin-left: -50%;
  }
}

.scroll-btn-container {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  @include tablet {
    margin-top: 3rem;
  }
}

.icon-chevron-bottom {
  display: inline-flex;
  height: 2.25rem;
  width: 2.25rem;
  border-radius: 50%;

  @include tablet {
    height: 2.5rem;
    width: 2.5rem;
  }
}

.span-container {
  flex-direction: column;
  max-width: $maxDesktop;
  text-align: center;

  @include until($desktop) {
    .c-container-title {
      margin: 1rem auto 3rem auto;
    }

    .c-container-image {
      margin: 3rem auto 0 auto;
      width: 100%;
      max-width: 30rem;
    }
  }

  @include desktop {
    text-align: left;
    justify-content: space-between;
    flex-direction: row;
  }

  &.span-reverse {
    @include desktop {
      flex-direction: row-reverse;
    }
  }
}

.span-2 {
  position: relative;

  @include desktop {
    width: 30rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.c-container {
  &-image {
    max-width: 80%;
    margin: 0 auto 3rem auto;

    @include desktop {
      max-width: 100%;
      margin: 0;
    }
  }

  &-title {
    margin: 1rem auto;
    max-width: 34rem;

    @include desktop {
      margin: 1.2rem 0 1rem 0;
    }
  }

  &-posttitle {
    color: $text_0;
  }

  &-para {
    line-height: 1.5rem;
    max-width: 34rem;
    margin: 0 auto;

    @include desktop {
      margin-right: 25%;
    }
  }

  &-link {
    margin-top: 1.6rem;
    display: block;
    width: max-content;

    @include until($desktop) {
      margin-left: auto;
      margin-right: auto;
    }

    + .is-link {
      width: max-content;
    }
  }
}

.c-main-container {
  text-align: center;
  background: url(/images/faces/shapes.svg) no-repeat center #fff;
  background-size: 100% auto;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - var(--gi-header-height));
  padding-left: 0;
  padding-right: 0;

  @include desktop {
    background-size: auto;
  }
}

.c-main-wrapper {
  position: relative;
  z-index: 2;
  width: 100vw;
}

.c-page-title {
  font-weight: 600;
  font-size: 1.7rem;

  @include tablet {
    font-size: 2rem;
  }

  @include desktop {
    font-size: 2.4rem;
  }
}

.c-video-wrapper {
  position: relative;
  width: 100%;
  max-width: 34rem;
  margin: 1.5rem auto 2.75rem;

  @include tablet {
    margin: 3rem auto 4rem;
    padding: 0;
  }

  @include desktop {
    max-width: 40rem;
  }
}

.c-main-para {
  margin: 0 auto 1rem auto;
  padding: 0 1rem;

  @include tablet {
    max-width: 34rem;
  }
}

.c-main-title {
  max-width: 47rem;
  margin: 1.5rem auto;

  @include phone {
    max-width: 30rem;
  }
}

.swoosh-dark-blue {
  background: #363B55;
  color: #fff;
  padding-bottom: 2rem;
  margin-bottom: -4rem;

  @include desktop {
    padding-bottom: 0;
    margin-bottom: 0;
    background: url(/images/swoosh-dark-blue.svg) no-repeat center #fff;
    background-size: cover;
    background-size: 100% 100%;
  }

  .span-container {
    align-items: center;
    padding-bottom: 0;
    margin-top: 2rem;
  }

  .is-outlined {
    background: transparent;
    border-color: $primary_0;
    color: #fff;
  }

  .c-container-posttitle {
    color: #fff;
  }

  .c-buttons {
    .button {
      margin: -2rem 1rem 4rem 1rem;

      @include desktop {
        margin: 2rem 1rem;
      }

      &:first-child {
        margin-left: 0;
      }
    }
  }
}

.c-phone-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;

  @include desktop {
    min-height: 44.6rem;
    margin-bottom: 0;
  }
}

.c-get-started {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  .c-container-title {
    max-width: 46rem;
    margin-bottom: 2rem;
  }
}

.c-mt-16 {
  margin-top: 1.6rem;
}
</style>
