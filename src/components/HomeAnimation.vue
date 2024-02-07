<template>
  <div class="c-wrapper" ref="wrapper">
    <Sides color="#5DC9F1"
      :styles="{ 'top': '40rem', 'right': 0, 'transform': 'rotate(-180deg)' }"
      class="right-side"></Sides>
    <Sides color="#F89202" :styles="{ 'top': '120rem' }"></Sides>
    <Sides color="#A1D10E"
      :styles="{ 'top': '250rem', 'transform': 'rotate(-180deg)', 'right': 0, 'transform': 'rotate(-180deg)' }"
      class="right-side"></Sides>

    <div class="graphic-wrapper">
      <div class="c-faces" ref="faces">
        <div class="c-face" v-for="i in 8" :id="`face-${i}`" :key="i">
          <img class="c-face-img" v-src="`/images/faces/${i}.jpg`" />
          <span class="c-name" v-if="name[i]">{{ name[i] }}</span>
          <div class="c-pledge-card" v-if="contribution[i]"
              :style="{'box-shadow': `4px 4px 0px ${color[i]}`}"><img class="c-pledge-image"
              v-src="`/images/faces/${i}.jpg`" />
            <div class="c-pledge-content">
              <div class="c-pledge-name">{{ name[i] }} Pledge</div>
              <div class="c-pledge-price">{{ contribution[i] }}</div>
            </div>
          </div>
        </div>
      </div>

      <section class="container c-main-container">
        <div class="c-main-wrapper" id="header1">
          <div class="is-posttitle">GROUP INCOME</div>
          <h1 class="is-title-1 c-main-title">
            Basic Income for your
            friends and family.
          </h1>
          <p class="is-subtitle c-main-para">Group income makes it easy for small communities to
            voluntarily provide a financial safety net for their members.</p>
          <a class="c-navbar-item button is-big is-primary" v-href="'/get-started'" data-test="getStartedLink'">Get
            started</a><i class="icon-chevron-bottom" @click="scrollTo('#container2')"></i>
        </div>
      </section>

      <section class="container span-container c-container" id="container2">
        <div class="span-2" id="circle-graph"><img class="c-container-image" v-src="'/images/temp/homepage-panel2.jpg'"
            ref="panel1Circle" /><img class="c-graph-circle" v-src="'/images/temp/graph-circle.jpg'" /><svg
            id="circle-graph-circle" :height="panel1CirclePos.width" :width="panel1CirclePos.width">
            <circle class="circleGraphCircle" id="circleGraphCircle" :cx="`${panel1CirclePos.middle}`"
              :cy="`${panel1CirclePos.middle}`" :r="panel1CirclePos.middle" stroke="D0DEEA" stroke-width="1.5"></circle>
            <circle class="circleGraphCircle" :cx="`${panel1CirclePos.middle}`" :cy="`${panel1CirclePos.middle}`"
              :r="panel1CirclePos.width / 4" stroke="D0DEEA" stroke-width="1.5"></circle>
          </svg>
        </div>

        <div class="span-2" id="header2">
          <div class="is-title-3 c-container-posttitle">What is Group Income?</div>
          <p class="is-title-2 c-container-title">A simple way to encourage basic financial security.</p>
          <p class="c-container-para">The goal of Basic Income is to guarantee that everyone gets access to enough money
            to meet their fundamental needs, independent of their life circumstances.</p>
          <a class="c-container-link is-link" v-href="'/faq'">Learn more about Basic Income</a>
        </div>
      </section>

      <div class="sections-container" id="freeze-wrapper">
        <section class="container span-container" id="container3">
          <div class="span-2"><img class="c-container-image" v-src="'/images/temp/homepage-panel3.jpg'" ref="graph1" />
          </div>
          <div class="span-2 c-container-header" id="header3">
            <div class="is-title-3 c-container-posttitle">Why it matters</div>
            <p class="is-title-2 c-container-title">Every individual is valuable.</p>
            <p class="c-container-para">Many people contribute to our lives and our society, but are often not
              financially rewarded. From students to unpaid careers, from volunteers to care givers, from unemployed
              people to unwell.<br />Basic Income can improve the quality of life for millions of people, simply through
              providing them with basic financial security and the peace of mind that goes with it.</p>
          </div>
        </section>

        <section class="container span-container" id="container4">
          <div class="span-2"><img class="c-container-image" ref="gif" v-src="'/images/temp/homepage-panel4.jpg'" />
            <div class="c-line"></div>
          </div>
          <div class="span-2 c-container-header" id="header4">
            <div class="is-title-3 c-container-posttitle">Mincome</div>
            <p class="is-title-2 c-container-title">The minimum amount each one should receive.</p>
            <p class="c-container-para">The mincome is the agreed value that a group sets as the amount each member
              needs to live a productive and healthy life. Each month, group members contribute to help those who
              haven't crossed the mincome threshold.</p>
          </div>
        </section>

        <section class="container span-container" id="container5">
          <div class="span-2"><img class="c-container-image" v-src="'/images/temp/homepage-panel6.jpg'" ref="gif2"/></div>
          <div class="span-2 c-container-header" id="header5">
            <div class="is-title-3 c-container-posttitle">With Group Income</div>
            <p class="is-title-2 c-container-title">Share your income with your friends and family.</p>
            <p class="c-container-para">Create stronger communities and ensure basic financial security for the people
              you care about.</p>
          </div>
        </section>
      </div>

      <section class="container span-container span-reverse" id="contribute">
        <div class="span-2">
          <img class="c-container-image" v-src="'/images/temp/homepage-panel5.jpg'" />
        </div>

        <div class="span-2">
          <div class="is-title-3 c-container-posttitle">Contribute</div>
          <p class="is-title-2 c-container-title">Each member can contribute to the group.</p>
          <p class="c-container-para">Members of the group can contribute with monetary or non-monetary donations,
            securing everyone in your group with an basic income, independent of employment.</p>
        </div>
      </section>

      <section class="container span-container c-container" id="container6">
        <div class="span-2">
          <img class="c-container-image" ref="gif" v-src="'/images/temp/homepage-panel8.jpg'" />
        </div>
        <div class="span-2 c-container-header" id="header6">
          <div class="is-title-3 c-container-posttitle">Stay Safe</div>
          <p class="is-title-2 c-container-title">Security & Privacy</p>
          <p class="c-container-para">
            Group Income is built on top of an end-to-end encrypted protocol called 
            <a class="is-link" href="https://shelterprotocol.net" target="_blank">Shelter Protocol</a>.
            Your data is stored in encrypted form on servers, and decrypted locally on your device.
            The keys to decrypt that data are derived from your password and are also stored on your device. 
          </p>
          <a class="c-container-link is-link" v-href="'/privacy-policy'">Read more about our privacy and security</a>
        </div>
      </section>

      <Swoosh />
    </div>

    <section class="container c-get-started">
      <h3 class="is-title-2 c-container-title">Group Income is end-to-end encrypted and self-hosted.</h3>
      <div class="is-title-3 c-container-posttitle">Here’s how to get started:</div>

      <GetStarted />
    </section>

    <div class="graphic-wrapper swoosh-dark-blue">
      <section class="container span-container">
        <div class="span-2">
          <div class="c-phone-wrapper"><img class="c-container-image" v-src="'/images/temp/homepage-panel7.png'" /></div>
        </div>

        <div class="span-2">
          <div class="is-title-3 c-container-posttitle">Contribute</div>
          <p class="is-title-2 c-container-title">Basic Income for your friends and family.</p>

          <div class="c-buttons">
            <a class="c-navbar-item button is-big is-primary" v-href="'/get-started'">Get started</a>
            <a class="c-navbar-item button is-big is-outlined" v-href="'/sponsor'">Sponsor</a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { resolvePath, debounceSimple } from '@/utils/helpers.js'
import Swoosh from './graphics/Swoosh.vue'
import Sides from './graphics/Sides.vue'
import Browser from './graphics/Browser.vue'
import GetStarted from './GetStarted.vue'
import GSAP from '../mixins/gsap.js'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

export default {
  mixins: [GSAP],
  components: {
    Swoosh,
    Browser,
    Sides,
    GetStarted
  },

  data() {
    return {
      config: {
        resizeHandler: debounceSimple(this.reset, 50)
      },
      name: {
        1: 'Jess',
        3: 'Matt',
        4: 'William',
        6: 'Alice',
        8: 'Rachel'
      },
      contribution: {
        1: '$350 🤑',
        3: '$100 + Dog Walks! 🐶',
        4: '$150 📈',
        6: 'French Lessons 🥖🇫🇷',
        8: 'Homemade cookies 🍪'
      },
      color: {
        1: '#F48579',
        3: '#FFD43D',
        4: '#A1D211',
        6: '#F99201',
        8: '#5DC8F0'
      },
      panel1CirclePos: {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        middle: 0
      },
      positions: [],
      positions2: [],
      tl: null
    }
  },

  mounted() {
    if (window.innerWidth >= '1200') {
      setTimeout(() => {
        if (this.tl === null) {
          this.initAnimation()
          this.animateOnScroll()
        }
      }, 500)
    } else {
      setTimeout(() => {
        if (this.tl === null) {
          this.animateOnScrollMobile()
        }
      }, 500)
    }

    window.addEventListener('resize', this.config.resizeHandler);
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.config.resizeHandler);
  },

  methods: {
    reset () {
      location.reload()
    },
    scrollTo(el) {
      this.gsap.to(window, {
        duration: 0.5,
        scrollTo: {
          y: el,
          offsetY: 170
        }
      })
    },

    getPos(name) {
      const { top, left, width, height } = this.$refs[name].getBoundingClientRect()
      return { top, left, width, height }
    },

    initAnimation() {
      // Get top and left offset
      const toptop = this.getPos('wrapper').top
      const wrapperLeft = this.getPos('faces').left

      // Get first panel positions
      let { top, left, width, height } = this.getPos('panel1Circle')
      // Factor just make the size smaller compare to original graph
      const factor = 0.77
      width = width * factor
      height = height * factor

      // Remove offset wrapper
      left -= wrapperLeft
      // Remove offset menu
      top -= toptop

      // Save position to create circles
      this.panel1CirclePos = { top, left, width, height, middle: width / 2 }
      let r = width / 2
      const middleX = left + r
      const middleY = top + r

      for (let i = 0; i < 5; i++) {
        const angle = 5 / 4
        const position = {
          left: r * Math.cos(i * angle) + middleX,
          top: r * Math.sin(i * angle) + middleY,
          left2: r * Math.cos((i - angle) * angle) + middleX,
          top2: r * Math.sin((i - angle) * angle) + middleY
        }
        this.positions.push(position)
      }

      r = width / 4
      for (let i = 0; i < 2; i++) {
        const angle = 3
        const position = {
          left: r * Math.cos(i * angle) + middleX,
          top: r * Math.sin(i * angle) + middleY,
          left2: r * Math.cos((i - angle) * angle) + middleX,
          top2: r * Math.sin((i - angle) * angle) + middleY
        }
        this.positions2.push(position)
      }

      const graph1 = this.getPos('graph1')

      for (let i = 0; i < 5; i++) {
        this.positions[i].top3 = graph1.top
        this.positions[i].left3 = graph1.left
        this.positions[i].top4 = graph1.top + graph1.height - toptop - 52
        this.positions[i].left4 = i * graph1.width / 5 - wrapperLeft + graph1.left + 100
      }
    },
    animateOnScroll() {
      this.gsap.to('.parallax-bg', {
        scrollTrigger: {
          scrub: true
        },
        y: (i, target) => -2000, ease: 'none'
      })

      // Header 1 animation
      this.gsap.to('#header1 *', {
        opacity: 0,
        y: '-30px',
        ease: 'Power1.easeInOut',
        scrollTrigger: {
          trigger: '.main-wrapper',
          stagger: 1,
          pin: true,
          start: '0',
          end: '+=100',
          scrub: true
        }
      })

      // Header 2 animation
      this.gsap.from('#header2 *', {
        opacity: 0,
        y: '+30px',
        ease: 'Power1.easeInOut',
        scrollTrigger: {
          trigger: '#container2',
          stagger: 1,
          start: '-150%',
          end: '0',
          scrub: true
        }
      })

      // Circles animations
      this.gsap.from('.circleGraphCircle', {
        opacity: '0',
        'stroke-dashoffset': '-400px',
        ease: 'Power1.easeInOut',
        scrollTrigger: {
          trigger: '#container2',
          stagger: 1,
          start: '-500',
          end: '0',
          scrub: true
        }
      })

      let faces = ['#face-1', '#face-4', '#face-8', '#face-3', '#face-6']
      const tl = this.gsap.timeline()
      faces.forEach((face, i) => {
        // Faces animation from hero page to panel 1
        tl.to(face, {
          ease: 'Power1.easeInOut',
          motionPath: {
            path: [{
              left: this.positions[i].left,
              top: this.panel1CirclePos.top,
              scale: (i + 1) * 0.1 * (Math.random() < 0.5 ? -1 : 1) + 1
            }, {
              left: this.positions[i].left,
              top: this.positions[i].top,
              scale: (i + 1) * 0.1 * (Math.random() < 0.5 ? -1 : 1) + 1
            }, {
              left: this.positions[i].left2,
              top: this.positions[i].top2,
              scale: 1
            }],
            curviness: 1.2,
            alignOrigin: [0.5, 0.5]
          },
          scrollTrigger: {
            trigger: '.main-wrapper',
            start: '0%',
            end: '9%',
            scrub: true
          }
        })

        // Faces animation from panel 1 page to panel 2
        tl.fromTo(face, {
          left: this.positions[i].left2,
          top: this.positions[i].top2,
          scale: 1
        }, {
          immediateRender: false,
          ease: 'Power1.easeInOut',
          motionPath: {
            path: [{
              left: this.positions[i].left3,
              top: this.positions[i].top3
              // scale: 0.3
            }, {
              left: this.positions[i].left4,
              top: this.positions[i].top4
              // scale: 0.5
            }],
            curviness: 1.2
          },
          scrollTrigger: {
            trigger: '.main-wrapper',
            start: '18%',
            end: '30%',
            scrub: true
          }
        })

        tl.to(face + ' img', {
          immediateRender: false,
          ease: 'Power1.easeInOut',
          width: 50,
          scrollTrigger: {
            trigger: '.main-wrapper',
            start: '18%',
            end: '30%',
            scrub: true
          }
        })
      })

      faces = ['#face-5', '#face-7']
      faces.forEach((face, i) => {
        this.gsap.to(face, {
          ease: 'Power1.easeInOut',
          motionPath: {
            path: [{
              left: this.positions2[i].left,
              top: this.panel1CirclePos.top,
              scale: (i + 1) * 0.1 * (Math.random() < 0.5 ? -1 : 1) + 1
            }, {
              left: this.positions2[i].left,
              top: this.positions2[i].top,
              scale: (i + 1) * 0.1 * (Math.random() < 0.5 ? -1 : 1) + 1
            }, {
              left: this.positions2[i].left2,
              top: this.positions2[i].top2,
              scale: 1
            }],
            curviness: 1.2,
            alignOrigin: [0.5, 0.5]
          },
          scrollTrigger: {
            trigger: '.main-wrapper',
            stagger: 1,
            start: '0%',
            end: '8%',
            scrub: true
          }
        })
      })

      faces = ['#face-2']
      this.gsap.to(faces, {
        ease: 'Power1.easeInOut',
        motionPath: {
          path: [{
            left: this.positions2[1].left,
            top: this.panel1CirclePos.top,
            scale: 0
          }],
          curviness: 1.2,
          alignOrigin: [0.5, 0.5]
        },
        scrollTrigger: {
          trigger: '.main-wrapper',
          stagger: 1,
          start: '0%',
          end: '8%',
          scrub: true
        }
      })

      tl.to('#freeze-wrapper', {
        immediateRender: false,
        scrollTrigger: {
          trigger: '.main-wrapper',
          pin: true,
          start: '25%',
          end: '70%'
        }
      })

      // this.gsap.set('.c-container-header *', {
      //   opacity: 0,
      //   y: '+=30'
      // })

      // Headers animation
      const titles = ['#header3', '#header4', '#header5']
      let pourcent = 0
      titles.forEach((title, i) => {
        // const trigger = {
        //   trigger: '#freeze-wrapper',
        //   start: `${pourcent}% top`,
        //   end: '+=20%',
        //   stagger: 1,
        //   scrub: true
        // }

        this.gsap.from('#freeze-wrapper', {
          scrollTrigger: {
            trigger: '#freeze-wrapper',
            start: `${pourcent + 20}% top`,
            end: '+=400%',
            scrub: true,
            toggleClass: {
              targets: this.$refs.wrapper,
              className: `graph-stage-${i}`
            }
          }
        })

        // this.gsap.to(`${title} *`, {
        //   opacity: 1,
        //   y: '0',
        //   ease: 'Power1.easeInOut',
        //   scrollTrigger: trigger
        // })

        // pourcent += 80

        // trigger.start = `${pourcent}% top`

        // if (title !== '#header5') {
        //   this.gsap.to(`${title} *`, {
        //     immediateRender: false,
        //     opacity: 0,
        //     y: '-30px',
        //     ease: 'Power1.easeInOut',
        //     scrollTrigger: trigger
        //   })
        // }

        // pourcent += 20
        pourcent += 100
      })
      this.tl = tl
    },
    animateOnScrollMobile() {
      ScrollTrigger.create({
        trigger: "#container4",
        // start: "top top",
        endTrigger: "#container5",
        // end: "bottom",
        onToggle: self => {
          this.$refs.gif.src = resolvePath("/images/temp/homepage-panel3.gif")
        }
      });

      ScrollTrigger.create({
        trigger: "#container5",
        // start: "top top",
        endTrigger: "#contribute",
        // end: "bottom",
        onToggle: self => {
          this.$refs.gif2.src = resolvePath("/images/temp/homepage-panel5.gif")
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/_variables";

@include desktop {

  #circle-graph .c-container-image,
  #container3 .c-container-image,
  #container4 .c-container-image,
  #container5 .c-container-image {
    opacity: 0;
  }
}

// Rpevent rendering glitch
.right-side {
  right: 0;
}

#circle-graph {
  position: relative;
  margin: 0 auto;

  @include desktop {
    margin-top: 2rem;
    margin-bottom: -4rem;
  }
}

.c-graph-circle {
  display: none;
  // top: -100px;
  // left: -15px;

  @include desktop {
    display: block;
    position: absolute;
    z-index: -1;
    left: -70px;
    top: -59px;
  }
}

#circle-graph-circle {
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
  fill: none;

  @include desktop {
    left: 0px;
    transform: translateX(0);
  }
}

.circleGraphCircle {
  fill: none;
  stroke: #D0DEEA;
  stroke-width: 1.5;
  stroke-dasharray: 12;
  transform-origin: 50%;
}

.c-wrapper {
  padding-bottom: 2rem;
}

.container {
  margin: 0 auto;
  padding: 4rem 1rem;
  display: flex;
  flex-direction: column;

  @include tablet {
    padding: 6rem 1rem;
  }
}

.graphic-wrapper {
  position: relative;
  padding-bottom: 4rem;
  margin-bottom: 4rem;
  overflow: hidden;

  // @include tablet {
  //   padding-bottom: 8rem;
  //   margin-bottom: 8rem;
  // }

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

#header5,
#header4,
#header3 {
  @include desktop {
    opacity: 0;
    transform: translateY(2rem);
    transition: opacity ease-out .3s, transform ease-out .3s;
  }
}

.graph-stage-0 {
  #header3 {
    opacity: 1;
    transform: translateY(0);
  }

  #face-1 {

    &::before,
    &::after {
      height: 235px;
    }
  }

  #face-3 {

    &::before,
    &::after {
      height: 235px;
    }
  }

  #face-4 {

    &::before,
    &::after {
      height: 86px;
    }
  }

  #face-6 {

    &::before,
    &::after {
      height: 12px;
    }
  }

  #face-8 {

    &::before,
    &::after {
      height: 310px;
    }
  }

  .c-name {
    opacity: 1;
  }
}

.graph-stage-1 {
  #header3 {
    opacity: 0;
    transform: translateY(-2rem);
  }
  #header4 {
    opacity: 1;
    transition-delay: .5s;
    transform: translateY(0);
  }

  .c-line {
    opacity: 1;

    &::after {
      width: 100%;
    }
  }

  #face-4::before {
    height: 102px;
    transition-delay: .3s;
  }

  #face-6::before {
    height: 102px;
    transition-delay: .6s;
  }
}

.graph-stage-2 {
  #header4 {
    opacity: 0;
    // transition-delay: 0;
    transform: translateY(-2rem);
  }
  #header5 {
    opacity: 1;
    transition-delay: .5s;
    transform: translateY(0);
  }
  .c-face {
    transition-duration: 1s;
  }

  #face-1::after,
  #face-3::after,
  #face-8::after {
    border: 2px solid #fff;
    margin-left: -2px;
    width: 58px;
  }

  #face-1 {
    z-index: 5;

    &::after {
      height: 200px;
      transition-delay: 5000ms;
    }
  }

  #face-3 {
    z-index: 5;

    &::after {
      height: 200px;
      transition-delay: 5000ms;
    }

    .c-pledge-card {
      animation-delay: 1000ms;
    }
  }

  #face-4 {
    z-index: 5;

    &::after {
      height: 102px;
      transition-delay: 5000ms;
    }

    .c-pledge-card {
      animation-delay: 2000ms;
    }
  }

  #face-8 {
    z-index: 3;

    &::after {
      height: 270px;
      transition-delay: 5000ms;
    }

    .c-pledge-card {
      animation-delay: 3000ms;
    }
  }

  #face-6 {
    z-index: 5;

    &::after {
      height: 102px;
      transition-delay: 5000ms;
    }

    .c-pledge-card {
      animation-delay: 4000ms;
    }
  }

  .c-pledge-card {
    animation: elevation 3s;
  }
}

@keyframes elevation {
  0% {
    opacity: 0;
    transform: translate3d(-50%, 2rem, 0);
  }

  20% {
    opacity: 1;
    transform: translate3d(-50%, 0, 0);
  }

  80% {
    opacity: 0;
    transform: translate3d(-50%, -2rem, 0);
  }

  100% {
    opacity: 0;
    transform: translate3d(-50%, -2rem, 0);
  }
}

.c-name {
  opacity: 0;
  margin-top: 10px;
  margin-bottom: 0;
  margin-left: -50px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  font-weight: 500;
  transition: opacity ease-out .3s;
}

#face-1,
#face-4,
#face-8,
#face-3,
#face-6 {

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: -27px;
    bottom: 93px;
    width: 54px;
    height: 0;
    border-radius: 4px;
    transition: height ease-out .3s;
  }

  &::before {
    background: #D0DEEA;
  }
}

#face-1 {
  top: 76vh;
  left: 17%;

  @include tablet {
    top: 70vh;
    left: 24%;
  }

  @include desktop {
    top: 72vh;
    left: 19%;
    transform: scale(.8);
  }

  &::after {
    background-color: #F48579;
  }
}

#face-2 {
  top: 68vh;
  left: 1%;

  @include tablet {
    top: 54vh;
    left: 7%;
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

  &::after {
    background-color: #FFD43D;
  }
}

#face-4 {
  top: 74vh;
  left: 63%;

  @include tablet {
    top: 65vh;
    left: 73%;
  }

  @include desktop {
    top: 69vh;
    left: 84%;
    transform: scale(1.2);
  }

  &::after {
    background-color: #A1D211;
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
  top: 59vh;
  left: 80%;

  @include tablet {
    top: 47vh;
    left: 89%;
  }

  @include desktop {
    top: 45vh;
    left: 97%;
  }

  &::after {
    background-color: #F99201;
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
  top: 8vh;
  left: 75%;

  @include tablet {
    top: 6vh;
    left: 87%;
  }

  @include tall {
    top: 22vh;
    left: 79%;
  }

  @include desktop {
    top: 21vh;
    left: 92%;
    transform: scale(1.2);
  }

  &::after {
    background-color: #5DC8F0;
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

.full-container {
  max-width: $maxDesktop;
  text-align: center;

  @include desktop {
    text-align: left;
  }
}

.icon-chevron-bottom {
  height: 2.5rem;
  width: 2.5rem;
  display: flex;
  background-color: #EFF2F5;
  border-radius: 4rem;
  margin-left: calc(50% - 1.25rem);
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  margin-bottom: -3rem;
  cursor: pointer;

  &:hover {
    background-color: #D0DEEA;
  }

  @include phone {
    display: none;
  }
}

.span-container {
  flex-direction: column;
  max-width: $maxDesktop;
  text-align: center;

  @include until($desktop) {
    flex-direction: column-reverse;

    .c-container-title {
      margin: 1rem auto 3rem auto;
    }

    .c-container-image {
      margin: 3rem auto 0 auto;
    }
  }

  @include desktop {
    text-align: left;
    justify-content: space-between;
    flex-direction: row-reverse;
  }

  &.span-reverse {
    @include desktop {
      margin-bottom: 10vh;
      flex-direction: row;
    }
  }
}

// #container2 {
//   @include until($desktop) {
//   flex-direction: column-reverse;

//   .c-container-title {
//     margin: 3rem auto;
//   }

//   .c-container-image {
//     margin: 3rem auto 0 auto;
//   }
//   }
// }

.span-2 {
  position: relative;

  @include desktop {
    width: 30rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.sections-container {
  @include desktop {
    position: relative;
    height: 80vh;

    section {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
      height: 100%;
      display: flex;
      align-items: center;
    }
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
  }
}

.c-main-container {
  text-align: center;
  // background: url('/images/temp/homepage-panel1.jpg') no-repeat center #fff;
  background: url('/images/faces/shapes.png') no-repeat center #fff;
  background-size: 100% auto;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  min-height: calc(100vh - #{$headerHeightMobile});

  @include tablet {
    min-height: calc(100vh - #{$headerHeightTablet});
  }

  @include desktop {
    min-height: calc(100vh - #{$headerHeight});
    background-size: auto;
  }
}

.c-main-wrapper {
  margin-top: -1.6rem;
  position: relative;
}

.c-main-title {
  max-width: 47rem;
  margin: 1.5rem auto;

  @include phone {
    max-width: 30rem;
  }
}

.c-main-para {
  max-width: 34rem;
  margin: 0 auto 1rem auto;
}

.swoosh-dark-blue {
  background: #363B55;
  color: #fff;
  padding-bottom: 2rem;
  margin-bottom: -4rem;

  @include desktop {
    padding-bottom: 0;
    margin-bottom: 0;
    background: url('/images/swoosh-dark-blue.svg') no-repeat center #fff;
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
  // background: url('/images/phone.svg') no-repeat center;
  // background-size: contain;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;

  @include desktop {
    min-height: 44.6rem;
    margin-bottom: 0;
  }
}

.c-pledge-card {
  position: absolute;
  left: 0;
  top: -22rem;
  z-index: 2;
  transform: translate3d(-50%, -3rem, 0);
  display: flex;
  align-items: center;
  padding: 6px 12px 6px 7px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #D0DEEA;
  box-shadow: 4px 4px 0px #5DC8F0;
  width: max-content;
  opacity: 0;
}

.c-pledge-image {
  width: 42px;
  margin-right: 7px;
}

.c-pledge-name {
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 15px;
  color: rgba(0, 0, 0, 0.5);
}

.c-pledge-price {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  color: #000000;
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
</style>
