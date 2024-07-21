<template>
  <section class="container c-container" id="faqContainer">
    <ul class="c-nav" id="faqNav">
      <li class="scrollingLink">
        <button class="is-unstyled" @click="scrollTo('#general')">General</button>
      </li>
      <li class="scrollingLink">
        <button class="is-unstyled" @click="scrollTo('#groups')">Groups</button>
      </li>
      <li class="scrollingLink">
        <button class="is-unstyled" @click="scrollTo('#our-philosophy')">Our Philosophy</button>
      </li>
      <li>
        <button class="is-unstyled" v-if="!expandAll" @click="toggleExpand">Expand all</button>
        <button class="is-unstyled" v-else @click="toggleExpand">Close all</button>
      </li>
    </ul>
    <div class="panel" v-for="faq, index in faqs" :key="index">
      <h2 class="c-collapse-title" :id="faq.id">{{faq.title}}</h2>
      <dl>
        <div v-for="q, qindex in faq.qa" :key="qindex">
          <dt @click="openTab(index, qindex)" :class="{active: q.active === true}" :id="`q_${index}${qindex}`">
            <p v-html="q.question"></p><i class="icon-chevron-up" v-if="q.active === true"></i><i class="icon-chevron-right" v-else></i>
          </dt>
          <dd :class="{active: q.active === true}">
            <div v-html="q.answer"></div>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script>
import GSAP from '../mixins/gsap.js'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

export default {
  name: 'FAQ',
  mixins: [GSAP],
  data () {
    return {
      faqs: [{
        title: 'General',
        id: 'general',
        qa: [{
          question: 'What is Group Income?',
          answer: 'Group income is a voluntary <strong><a class="link" href="https://www.reddit.com/r/basicincome/wiki/index" target="_blank">Basic Income</a> system</strong> for you and your friends. Our purpose is to ensure, as fairly and efficiently as possible, that all members of a group receive a minimum income (mincome), using the income streams flowing into that group.',
          active: true
        }, {
          question: 'How does Group Income work?',
          answer: 'When a group is created, the group members decide its mincome. Each month, group members volunteer their monetary contributions to the group. Throughout the month, group members can share their non-monetary contributions to the group. At the end of the month, monetary contributions are divided among the group members who have not yet crossed the mincome threshold.<br><a class="link" href="https://www.youtube.com/watch?v=KU9NGcrjXlo&list=PLRcgABNc9s2R3gSfRG7jHzb4giQdxaDB7&index=4" target="_blank">Demo</a>',
          active: false
        }, {
          question: 'What are the “Group Income Shorts”?',
          answer: 'They’re a <a class="link" href="https://www.youtube.com/watch?v=WpvyLEZmEAM&list=PLRcgABNc9s2R3gSfRG7jHzb4giQdxaDB7" target="_blank">series of videos</a> we’re creating to answer various questions about what Group Income is, how it works, and to explore various ideas related to it.',
          active: false
        }, {
          question: 'What is Basic Income?',
          answer: 'Basic income is the amount of income required to meet any individual\'s basic needs. On Group Income, the basic income will ideally be the same as the group\'s <i>mincome</i>.',
          active: false
        }, {
          question: 'What is mincome?',
          answer: 'The mincome is the minimum income that the group aims to ensure for each member. Each month, the voluntary monetary contributions are divided among the group members who have not yet crossed the mincome threshold.',
          active: false
        }, {
          question: 'Who determines what the mincome is?',
          answer: 'When the group is created, the group members will set the group\'s mincome, as well as the % of votes needed to change the group\'s mincome. The group members may vote to change the group\'s mincome at any point, according to the voting thresholds set up when the group was created.',
          active: false
        }]
      }, {
        title: 'Groups',
        id: 'groups',
        qa: [{
          question: 'What is a group?',
          answer: 'A group is a number of people who have voluntarily chosen to work to provide each other with a mincome, or a basic income.',
          active: false
        }, {
          question: 'Who can be part of a group?',
          answer: 'Any individual with a stable social relationship with the other members of a group. Members are encouraged to know each other personally and be part of the same community.<br><br>E.g.: a group of supporting creators, family members, friends, coworkers, neighbors, etc.',
          active: false
        }, {
          question: 'What if there aren\'t enough contributions to meet everyone\'s mincome?',
          answer: 'If there aren\'t enough contributions to meet every group member\'s mincome, then all group members below the mincome will be brought to the same level, as close to the mincome as possible.',
          active: false
        }, {
          question: 'What if there are more monetary pledges than are needed?',
          answer: 'If the group has more than enough monetary pledges to meet everyone\'s mincome, then only the needed amounts will be given, and pledges will be allocated proportionally to the group\'s needs.<br><br>For example, if a group needs $100 to meet everyone\'s mincome, and there are $200 in pledges, then only $100 of the pledges will be used to meet the group members\' mincomes. This means that 50% of each individual pledge will be used because only 50% of the total pledges are needed.',
          active: false
        }, {
          question: 'Why are group members able to pledge less than what the group needs to meet their mincome?',
          answer: 'Group Income is a voluntary basic income system. Therefore, group members can pledge the amount they are able and willing to contribute to others\' mincome. This ensures that the pledge will not cause the pledger\'s income to fall below the mincome. This can provide predictability and stability for all members.',
          active: false
        }, {
          question: 'What if I don\'t have money to contribute?',
          answer: 'Everyone has something to contribute, money isn\'t the only way to help a group. Besides monetary pledges, all members can support each other with non-monetary contributions. There\'s value in your time, skills, and your willingness to support the group. Are you a fantastic cook? You can contribute with cooking lessons or offer to host a group dinner party. Is a member of the group struggling as a new parent? You can offer to babysit.<br><br>There\'s immeasurable value in non-monetary contributions.',
          active: false
        }, {
          question: 'What is the minimum size for a group?',
          answer: 'There is no minimum size for a group. So long as the group can meet its mincome, two individuals can form a group.',
          active: false
        }, {
          question: 'What is the maximum size for a group?',
          answer: 'The maximum size for a group is 150 members, a decision based on Dunbar\'s Number. We recommend that members form groups with those they have a stable social relationship.',
          active: false
        }]
      }, {
        title: 'Group Income Philosophy',
        id: 'our-philosophy',
        qa: [{
          question: 'Why is Basic Income or Group Income important?',
          answer: `The importance of a <a class="link" href="http://www.reddit.com/r/basicincome/wiki/index" target="_blank">Basic Income</a> is <a class="link" href="http://www.reddit.com/r/basicincome/wiki/index" target="_blank">self-evident</a>, <a class="link" href="https://www.youtube.com/watch?v=7Pq-S557XQU" target="_blank">ever-increasing</a> in need, and therefore integral to the functioning of any modern monetary system. Group Income is a small solution to a larger scale problem.
            We're providing a tool that helps you support the ones closest to you, through a voluntary basic income system, without the need for governmental action or approval.`,
          active: false
        }, {
          question: 'Why is Group Income a voluntary system?',
          answer: `One of the primary arguments for Basic Income is the notion that it is <a class="link" href="http://www.bloomberg.com/news/articles/2013-06-03/for-fighting-poverty-cash-is-surprisingly-effective" target="_blank">better to give people money than vouchers</a> because <a class="link" href="http://www.cgdev.org/publication/cash-or-coupons-testing-impacts-cash-versus-vouchers-democratic-republic-congo-working" target="_blank">people make better decisions about what they can and should do with their money</a> than the state (or donor) can make for them. However, a government-based Basic Income program would take other people's money against their will because it, supposedly, knows better than they do what to do with it.<br><br>When in the mindset of a "net giver", even basic income advocates often ask the same questions about fairness that everyone asks upon hearing they'll be giving money to others. These questions, for some reason, aren't asked when people talk about Basic Income on a national level, because most view the issue from the reference point of a net beneficiary.<br><br>These questions of fairness can be addressed by making a voluntary basic income system. Some examples of voluntary basic income systems are:<br>
          <ul>
            <li><a href="https://en.wikipedia.org/wiki/Alaska_Permanent_Fund" class="link" target="_blank">Alaska Permanent Fund Dividend</a> (resource-based)</li>
            <li><a href="https://en.wikipedia.org/wiki/Land_value_tax" class="link" target="_blank">Land value tax</a> (resource-based)</li>
            <li>Group Income (voluntary monetization of human labor)</li>
            <li>City sales tax (where freedom of motion is feasible)</li>
          </ul>`,
          active: false
        }, {
          question: 'Why is Group Income decentralized?',
          answer: `Group Income is a project of the okTurtles Foundation, a non-profit that supports beneficial decentralization technologies. The original goal of Group Income was to make open-source software sustainable. We wanted to make it possible for developers to produce high quality, open-source software, and still be able to provide for their families.<br><br>
            We find decentralized software development vital for the future of society. We don't agree, nor want to perpetuate, the <a class="link" href="https://www.businessnewsdaily.com/10625-businesses-collecting-data.html" target="_blank">way most companies, as well as big data and data brokers</a>, are currently using data to manipulate or tamper with people's will. With a decentralized system on Group Income, groups don't need to trust a centralized "service provider". Groups will be able to be self-governing, and will also only make decisions for themselves.<br><br>
            This means that, besides helping you reach basic security, we also want you to be in control of your security and privacy online. We recognize that your data belongs to you, and we are not entitled to it.<br><br>
            <strong>Any data shared within a group will remain private to that group.</strong>`,
          active: false
        }, {
          question: 'Why would people who earn more than a basic income want to give any of it away?',
          answer: `Group members can limit their monetary contributions, so they don't need to give away more than they are comfortable giving. Group members want to help each other reach the mincome threshold because groups are better when people support each other. When other group members are miserable and struggling, that impacts the quality of life of each group member. Likewise, when the society around you is miserable, that will impact your quality of life as well.
            Let's take the example of <a class="link" href="https://www.simplypsychology.org/maslow.html" target="_blank">Maslow's Hierarchy of Needs</a>. It argues that the needs lower in the hierarchy (like food, water, warmth, security, or safety) need to be satisfied before individuals can attempt to focus on needs higher up. If basic needs aren't met, individuals will never move to the next level of needs. When someone decides to contribute to a group and help members achieve basic security, they're helping their loved ones climb the ladder and attempt to reach their full potential. This can translate into a group of altruistic, trusting, creative, and confident people that boost and improve each other's existence. Who wouldn't want to be a part of that?`,
          active: false
        }, {
          question: 'This sounds like communism.',
          answer: `This is not communism. One reason communism failed is because power was centralized, which led to a small group making decisions for everyone, and concentration/abuse of power.<br><br>
            Group Income is decentralized, which ensures that each group is making decisions only for itself and that no one will have power over that group.`,
          active: false
        }, {
          question: 'What does Group Income do or enable that the government doesn\'t?',
          answer: `It's not easy to jump-start basic income. Pilot studies don't last long. So far, there have not been any sustainable implementations providing a basic income, in part because people argue about political implementation details, like taxation.<br><br>
            <a class="link" href="https://www.investopedia.com/terms/b/basic-income.asp" target="_blank">Universal Basic Income gained momentum in 2020</a> during Andrew Yang's presidential campaign, but it still isn't in a near-term future. Group Income does not require political discussion or nationwide acceptance. It gives people the authority to choose what they wish to do with their income, rather than having a third party making decisions for them. It is also more efficient than any government system because there's no bureaucracy, no policies, and no conflicting laws.`,
          active: false
        }, {
          question: 'What about deadbeats and freeloaders?',
          answer: `Each group will have a mechanism for removing members, just as there will be a mechanism for approving new members. Additionally, Group Income is a completely voluntary system, meaning that any group member can voluntarily leave their group at any time.<br><br>
            We understand that the risk of deadbeats or freeloaders on a group may be a real concern for users. That being said, we expect this risk to be rare, as guaranteed basic income programs and <a class="link" href="https://www.researchgate.net/publication/227387994_The_Town_with_No_Poverty_The_Health_Effects_of_a_Canadian_Guaranteed_Annual_Income_Field_Experiment" target="_blank">studies have shown</a>, in contrast to public opinion, that people with a guaranteed income only slightly reduce their workload, rather than stop working at all. A <a class="link" href="https://www.newscientist.com/article/2242937-universal-basic-income-seems-to-improve-employment-and-well-being/#ixzz6fOgmRfR1" target="_blank">Finish study</a> also found that people who received the trial universal basic income reported better financial well-being, mental health, and cognitive functioning, as well as higher levels of confidence in the future.`,
          active: false
        }, {
          question: 'How do you protect against Sybil attacks?',
          answer: `The groups will be limited in size (up to 60 members). This was a decision based on Dunbar's Number as a way to prevent Sybil attacks. (link to Dunbar's Number/Sybil Attack blog post)
            Rather than forming a single larger group, multiple groups should be linked together to ensure safety.`,
          active: false
        }, {
          question: 'If the size of groups is limited, how does Group Income scale?',
          answer: 'Group Income can scale by connecting groups together. For example, a local family group may itself be a group member in a larger community group, which may be a group member in a city group, which may be a member in a countywide group, and so forth.',
          active: false
        }, {
          question: 'What\'s the end goal of Group Income?',
          answer: `Basic Income Security.<br><br>
            Our real goal with Group Income is to ensure basic security for everyone. Some societies have chosen to restrict access to such things behind money, and therefore we’re developing what is really just a bandaid to fix the damage that money creates.<br><br>
            Like clean air and clean water, everyone should have access to a clean bed and healthy food. Access to such things shouldn't rely solely on the ability to afford them.<br><br>
            <strong>That is the goal. Group Income is one of the steps on the way to that goal.</strong>`,
          active: false
        }]
      }, {
        title: 'Dev Support',
        id: 'dev-support',
        qa: [{
          question: 'Voluntary',
          answer: `We're inspired by communities that ensure each member is supported and member's value is recognized. We want to encourage this type of community, and adding our group to your group is one way to do so.
            Group Income is voluntary for members, and donations to the development team are voluntary as well. When setting up your group, you decide what mincome the dev team gets after the group's basic income is met.
            You can find the "Group Income Developers Group" on the {donate?} tab in your {user|group profile}. The "Group Income Developers Group" default mincome will be $x, but if you don't think the default is fair (too low or too high), we encourage you to change it.
            If you believe Group Income is a project that should succeed, you can reflect that in the amount you choose. The money earned will be put directly back into development and support of Group Income so we can continue providing the tools you need to just set it and forget it!`,
          active: false
        }]
      }],
      previous: [0, 0],
      expandAll: false
    }
  },

  mounted () {
    setTimeout(() => {
      this.scrollAnimation()
    }, 500)
  },

  methods: {
    openTab (index, qindex) {
      const i = [index, qindex]
      const p0 = this.previous[0]
      const p1 = this.previous[1]
      if ((p0 !== undefined && p0 !== index) || (p1 !== undefined && p1 !== qindex)) {
        this.faqs[p0].qa[p1].active = false
      }
      this.previous = i
      this.faqs[index].qa[qindex].active = !this.faqs[index].qa[qindex].active

      this.refreshScrollTrigger()
    },

    refreshScrollTrigger () {
      const scrollTriggersInstances = ScrollTrigger.getAll()

      setTimeout(() => {
        scrollTriggersInstances.forEach((el) => {
          if (el && el.refresh) {
            el.refresh()
          }
        })
      }, 500)
    },

    toggleExpand () {
      this.expandAll = !this.expandAll
      this.previous = [undefined, undefined]
      this.faqs.map((el) => {
        el.qa.map((elq) => {
          elq.active = this.expandAll
          return true
        })
        return true
      })

      this.refreshScrollTrigger()
    },

    scrollAnimation () {
      this.gsap.to('#faqNav', {
        scrollTrigger: {
          trigger: '#faqNav',
          pin: true,
          start: `2 ${document.getElementsByClassName("c-header")[0].offsetHeight}`,
          pinSpacing: false,
          pinReparent: true,
          end: 'bottom 308',
          endTrigger: '#faqContainer'
        }
      })

      const navLinks = this.gsap.utils.toArray('.scrollingLink')
      const panels = this.gsap.utils.toArray('.panel')

      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: 'top 50%',

          onEnter: () => {
            navLinks.forEach((e) => {
              e.classList.remove('active-nav')
            })
            if (navLinks.length < i) navLinks[i].classList.add('active-nav')
          },
          onEnterBack: () => {
            navLinks.forEach((e) => {
              e.classList.remove('active-nav')
            })
            if (navLinks.length < i) navLinks[i].classList.add('active-nav')
          }
        })
      })
    },

    scrollTo (el, offesetY = 300) {
      this.gsap.to(window, {
        duration: 0.5,
        scrollTo: {
          y: el,
          offsetY: offesetY
        }
      })
    }
  }
}
</script>


<style lang="scss" scoped>
@import "../styles/_variables";
@import "../styles/_mixins";

.c-nav {
  height: 3rem;
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  z-index: 2;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3.5rem;
  border-bottom: 1px solid #D0DEEA;
  border-top: 1px solid #D0DEEA;

  @include phone {
    // justify-content: center;
    flex-wrap: nowrap;
    overflow: scroll;
    height: auto;
    li {
      padding: .5rem;
    }
  }
}

.c-collapse-title {
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 30px;
}

dl {
  max-width: 50rem;
  margin: 1rem auto 4rem auto;
  z-index: 2;
  overflow: hidden;

  & > div {
    border-top: 1px solid #D0DEEA;

    &:last-child {
      border-bottom: 1px solid #D0DEEA;
    }
  }
}

dt {
  position: relative;
  height: 3.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  @include phone {
    height: auto;
    padding: 0.4rem 0;
  }

  p {
    font-size: 18px;
    line-height: 24px;
  }

  i {
    margin: .5rem;
    color: #d0deea;
  }

  &.active {
    font-weight: bold;
    &:hover {
      cursor: initial;
    }

    .close::before,
    .close::after {
      transform: rotate(180deg);
    }
  }

  &:hover:not(.active) {
    .close::before {
      transform: rotate(-90deg);
    }

    .close::after {
      transform: rotate(-0deg);
    }
  }
}

dd {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.1s cubic-bezier(0.22, 0.61, 0.36, 1);
  margin: 0;
  transition: max-height .2s ease-out;

  div:last-child {
    padding-bottom: 1.5rem;
  }

  &.active {
    max-height: 40rem;
  }
}

.active-nav button {
  font-weight: bold;
}
</style>