<template>
  <section class="container c-container" id="faqContainer">
    <ul class="c-nav">
      <li class="scrollingLink">
        <i18n tag="button" class="is-unstyled" @click="scrollTo('#general')">General</i18n>
      </li>
      <li class="scrollingLink">
        <i18n tag="button" class="is-unstyled" @click="scrollTo('#groups')">Groups</i18n>
      </li>
      <li class="scrollingLink">
        <i18n tag="button" class="is-unstyled" @click="scrollTo('#our-philosophy')">Our Philosophy</i18n>
      </li>
      <li>
        <button class="is-unstyled" @click="toggleExpand">
          {{ allItemsExpanded ? L('Close all') : L('Expand all') }}
        </button>
      </li>
    </ul>
    <div class="panel" v-for="faq, index in faqs" :key="index">
      <h2 class="c-collapse-title" :id="faq.id">{{faq.title}}</h2>
      <dl>
        <div v-for="q, qindex in faq.qa" :key="qindex">
          <dt @click="openTab(index, qindex)" :class="{active: q.active === true}" :id="`q_${index}${qindex}`">
            <p class="c-question" v-html="q.question"></p><i class="icon-chevron-up" v-if="q.active === true"></i><i class="icon-chevron-right" v-else></i>
          </dt>
          <dd :class="{active: q.active === true}">
            <div v-html="q.answer" class="l-faq"></div>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script>
import { inject } from 'vue'
import { LTags } from '@/i18n/utils'

export default {
  name: 'FAQ',
  setup () {
    const L = inject('L')
    return { L }
  },
  data () {
    const L = this.L

    return {
      faqs: [{
        title: L('General'),
        id: 'general',
        qa: [{
          question: L('What is Group Income?'),
          answer: L(
            L('Group income is a voluntary {strong_}{a_}Basic Income{_a}{_strong} system for you and your friends. Our purpose is to ensure, as fairly and efficiently as possible, that all members of a group receive a minimum income (mincome), using the income streams flowing into that group.'),
            { ...LTags('strong', 'a'), 'a_': '<a href="https://www.reddit.com/r/basicincome/wiki/index" target="_blank">' }
          ),
          active: true
        }, {
          question: L('How does Group Income work?'),
          answer: L(
            'When a group is created, the group members decide its mincome. Each month, group members volunteer their monetary contributions to the group. Throughout the month, group members can share their non-monetary contributions to the group. At the end of the month, monetary contributions are divided among the group members who have not yet crossed the mincome threshold.{br_}{a_}Demo{_a}',
            { ...LTags('a'), 'a_': '<a href="https://www.youtube.com/watch?v=KU9NGcrjXlo&list=PLRcgABNc9s2R3gSfRG7jHzb4giQdxaDB7&index=4" target="_blank">' }
          ),
          active: false
        }, {
          question: L('What are the “Group Income Shorts”?'),
          answer: L(
            `They're a {a_}series of videos{_a} we're creating to answer various questions about what Group Income is, how it works, and to explore various ideas related to it.`,
            { ...LTags('a'), 'a_': '<a href="https://www.youtube.com/watch?v=WpvyLEZmEAM&list=PLRcgABNc9s2R3gSfRG7jHzb4giQdxaDB7" target="_blank">' }
          ),
          active: false
        }, {
          question: L('What is Basic Income?'),
          answer: L(`Basic income is the amount of income required to meet any individual's basic needs. On Group Income, the basic income will ideally be the same as the group's {i_}mincome{_i}.`, { ...LTags('i') }),
          active: false
        }, {
          question: L('What is mincome?'),
          answer: L('The mincome is the minimum income that the group aims to ensure for each member. Each month, the voluntary monetary contributions are divided among the group members who have not yet crossed the mincome threshold.'),
          active: false
        }, {
          question: L('Who determines what the mincome is?'),
          answer: L(`When the group is created, the group members will set the group's mincome, as well as the percentage of votes needed to change the group's mincome. The group members may vote to change the group's mincome at any point, according to the voting thresholds set up when the group was created.`),
          active: false
        }]
      }, {
        title: L('Groups'),
        id: 'groups',
        qa: [{
          question: L('What is a group?'),
          answer: L('A group is a number of people who have voluntarily chosen to work to provide each other with a mincome, or a basic income.'),
          active: false
        }, {
          question: L('Who can be part of a group?'),
          answer: L(`Any individual with a stable social relationship with the other members of a group. Members are encouraged to know each other personally and be part of the same community.{br_}E.g.: a group of supporting creators, family members, friends, coworkers, neighbors, etc.`, { ...LTags() }),
          active: false
        }, {
          question: L("What if there aren't enough contributions to meet everyone's mincome?"),
          answer: L(`If there aren't enough contributions to meet every group member's mincome, then all group members below the mincome will be brought to the same level, as close to the mincome as possible.`),
          active: false
        }, {
          question: L('What if there are more monetary pledges than are needed?'),
          answer: L(`If the group has more than enough monetary pledges to meet everyone's mincome, then only the needed amounts will be given, and pledges will be allocated proportionally to the group's needs.{br_}For example, if a group needs $100 to meet everyone's mincome, and there are $200 in pledges, then only $100 of the pledges will be used to meet the group members' mincomes. This means that 50% of each individual pledge will be used because only 50% of the total pledges are needed.`, { ...LTags() }),
          active: false
        }, {
          question: L('Why are group members able to pledge less than what the group needs to meet their mincome?'),
          answer: L(`Group Income is a voluntary basic income system. Therefore, group members can pledge the amount they are able and willing to contribute to others' mincome. This ensures that the pledge will not cause the pledger's income to fall below the mincome. This can provide predictability and stability for all members.`),
          active: false
        }, {
          question: L("What if I don't have money to contribute?"),
          answer: L(`Everyone has something to contribute; money isn't the only way to help a group. Besides monetary pledges, all members can support each other with non-monetary contributions. There's value in your time, skills, and your willingness to support the group. Are you a fantastic cook? You can contribute with cooking lessons or offer to host a group dinner party. Is a member of the group struggling as a new parent? You can offer to babysit.{br_}{br_}There's immeasurable value in non-monetary contributions.`, { ...LTags() }),
          active: false
        }, {
          question: L('What is the minimum size for a group?'),
          answer: L('There is no minimum size for a group. So long as the group can meet its mincome, two individuals can form a group.'),
          active: false
        }, {
          question: L('What is the maximum size for a group?'),
          answer: L(`150. The maximum number of participants in monetary and non-monetary exchange is limited to {a_}Dunbar's number{_a} (150) to prevent fraud. The maximum number of members a group (regardless of whether they're actively participating in exchange) is currently also 150, although this might change in the future. We recommend that members form groups with those they have a stable social relationship.`, { ...LTags('a'), 'a_': '<a href="https://en.wikipedia.org/wiki/Dunbar\'s_number" target="_blank">' }),
          active: false
        }]
      }, {
        title: L('Group Income Philosophy'),
        id: 'our-philosophy',
        qa: [{
          question: L('Why is Basic Income or Group Income important?'),
          answer: L(`The importance of a {a1_}Basic Income{_a} is {a2_}self-evident{_a}, {a3_}ever-increasing{_a} in need, and therefore integral to the functioning of any modern monetary system. Group Income is a small solution to a larger scale problem.
            We're providing a tool that helps you support the ones closest to you, through a voluntary basic income system, without the need for governmental action or approval.`,
            { ...LTags('a'), 'a1_': '<a href="http://www.reddit.com/r/basicincome/wiki/index" target="_blank">', 'a2_': '<a href="http://www.reddit.com/r/basicincome/wiki/index" target="_blank">', 'a3_': '<a href="https://www.youtube.com/watch?v=7Pq-S557XQU" target="_blank">' }
          ),
          active: false
        }, {
          question: L('Why is Group Income a voluntary system?'),
          answer: [
            L(
              `One of the primary arguments for Basic Income is the notion that it is {a1_}better to give people money than vouchers{_a} because {a2_}people make better decisions about what they can and should do with their money{_a} than the state (or donor) can make for them.`,
              {
                ...LTags('a'),
                'a1_': '<a href="http://www.bloomberg.com/news/articles/2013-06-03/for-fighting-poverty-cash-is-surprisingly-effective" target="_blank">',
                'a2_': '<a href="http://www.cgdev.org/publication/cash-or-coupons-testing-impacts-cash-versus-vouchers-democratic-republic-congo-working" target="_blank">'
              }
            ),
            L(`However, a government-based Basic Income program would take other people's money against their will because it, supposedly, knows better than they do what to do with their money.`),
            L(`When in the mindset of a "net giver", even basic income advocates often ask the same questions about fairness that everyone asks upon hearing they'll be giving money to others.`),
            L(`These questions, for some reason, aren't asked when people talk about Basic Income on a national level, because most view the issue from the reference point of a net beneficiary.`),
            L(`{br_}{br_}These questions of fairness can be addressed by making a voluntary basic income system. Some examples of voluntary basic income systems are:{br_}`, { ...LTags('br') }),
            L(
              `{ul_}
                {li_}{a1_}Alaska Permanent Fund Dividend{_a} (resource-based){_li}
                {li_}{a2_}Land value tax{_a} (resource-based){_li}
                {li_}Group Income (voluntary monetization of human labor){_li}
                {li_}City sales tax (where freedom of motion is feasible){_li}
              {_ul}`,
              {
                ...LTags('a', 'ul', 'li'),
                'ul_': '<ul class="bullet-list">',
                'a_': '<a href="https://en.wikipedia.org/wiki/Alaska_Permanent_Fund" target="_blank">',
                'a2_': '<a href="https://en.wikipedia.org/wiki/Land_value_tax" target="_blank">'
              }
            )
          ].join(' '),
          active: false
        }, {
          question: L('Why is Group Income decentralized?'),
          answer: [
            L(`Group Income is a project of the okTurtles Foundation, a non-profit that supports beneficial decentralization technologies. The original goal of Group Income was to make open-source software sustainable. We wanted to make it possible for developers to produce high quality, open-source software, and still be able to provide for their families.{br_}{br_}`, { ...LTags() }),
            L(
              `We find decentralized software development vital for the future of society. We don't agree, nor want to perpetuate, the {a_}way most companies, as well as big data and data brokers{_a}, are currently using data to manipulate or tamper with people's will. `,
              { ...LTags('a'), 'a_': '<a href="https://www.businessnewsdaily.com/10625-businesses-collecting-data.html" target="_blank">' }
            ),
            L(
              `This means that, besides helping you reach basic security, we also want you to be in control of your security and privacy online. We recognize that your data belongs to you, and we are not entitled to it.{br_}{br_}{strong_}Any data shared within a group will remain private to that group.{_strong}`,
              { ...LTags('strong') }
            )
          ].join(''),
          active: false
        }, {
          question: L('Why would people who earn more than a basic income want to give any of it away?'),
          answer: [
            L(`Group members can limit their monetary contributions, so they don't need to give away more than they are comfortable giving.`),
            L(`Group members want to help each other reach the mincome threshold because groups are better when people support each other.`),
            L(`When other group members are miserable and struggling, that impacts the quality of life of each group member.`),
            L(
              `Likewise, when the society around you is miserable, that will impact your quality of life as well.{br_}{br_}Let's take the example of {a_}Maslow's Hierarchy of Needs{_a}.`,
              { ...LTags('a'), 'a_': '<a class="link" href="https://www.simplypsychology.org/maslow.html" target="_blank">' }
            ),
            L(`It argues that the needs lower in the hierarchy (like food, water, warmth, security, or safety) need to be satisfied before individuals can attempt to focus on needs higher up.`),
            L(`If basic needs aren't met, individuals will never move to the next level of needs. When someone decides to contribute to a group and help members achieve basic security, they're helping their loved ones climb the ladder and attempt to reach their full potential.`),
            L(`This can translate into a group of altruistic, trusting, creative, and confident people that boost and improve each other's existence. Who wouldn't want to be a part of that?`)
          ].join(' '),
          active: false
        }, {
          question: L('This sounds like communism.'),
          answer: L(`This is not communism. One reason communism failed is because power was centralized, which led to a small group making decisions for everyone, and concentration/abuse of power.{br_}{br_}
            Group Income is decentralized, which ensures that each group is making decisions only for itself and that no one will have power over that group.`, { ...LTags() }),
          active: false
        }, {
          question: L("What does Group Income do or enable that the government doesn't?"),
          answer: L(
            `It's not easy to jump-start basic income. Pilot studies don't last long. So far, there have not been any sustainable implementations providing a basic income, in part because people argue about political implementation details, like taxation.{br_}{br_}
            {a_}Universal Basic Income gained momentum in 2020{_a} during Andrew Yang's presidential campaign, but it still isn't in a near-term future. Group Income does not require political discussion or nationwide acceptance. It gives people the authority to choose what they wish to do with their income, rather than having a third party making decisions for them. It is also more efficient than any government system because there's no bureaucracy, no policies, and no conflicting laws.`,
            { ...LTags('a'), 'a_': '<a class="link" href="https://www.investopedia.com/terms/b/basic-income.asp" target="_blank">' }
          ),
          active: false
        }, {
          question: L('What about deadbeats and freeloaders?'),
          answer: [
            L(`Each group will have a mechanism for removing members, just as there will be a mechanism for approving new members. Additionally, Group Income is a completely voluntary system, meaning that any group member can voluntarily leave their group at any time.{br_}{br_}`, { ...LTags() }),
            L(
              `We understand that the risk of deadbeats or freeloaders on a group may be a real concern for users. That being said, we expect this risk to be rare, as guaranteed basic income programs and {a_}studies have shown{_a}, in contrast to public opinion, that people with a guaranteed income only slightly reduce their workload, rather than stop working at all.`,
              { ...LTags('a'), 'a_': '<a class="link" href="https://www.researchgate.net/publication/227387994_The_Town_with_No_Poverty_The_Health_Effects_of_a_Canadian_Guaranteed_Annual_Income_Field_Experiment" target="_blank">' }
            ),
            L(
              `A {a_}Finish study{_a} also found that people who received the trial universal basic income reported better financial well-being, mental health, and cognitive functioning, as well as higher levels of confidence in the future.`,
              { ...LTags('a'), 'a_': '<a class="link" href="https://www.newscientist.com/article/2242937-universal-basic-income-seems-to-improve-employment-and-well-being/#ixzz6fOgmRfR1" target="_blank">' }
            )
          ].join(' '),
          active: false
        }, {
          question: L('How do you protect against Sybil attacks?'),
          answer: L(
            `We use something called {a_}Dunbar's Number{_a} to prevent Sybil attacks. {a2_}More about this in this blog post{_a}.`,
            { ...LTags('a'), 'a_': '<a class="link" href="https://en.wikipedia.org/wiki/Dunbar\'s_number" target="_blank">', 'a2_': '<a class="link" href="https://groupincome.org/2025/06/no-eyeballs-needed/" target="_blank">' }
          ),
          active: false
        }, {
          question: L('If the size of groups is limited, how does Group Income scale?'),
          answer: L('Group Income can scale by connecting groups together. For example, a local family group may itself be a group member in a larger community group, which may be a group member in a city group, which may be a member in a countywide group, and so forth.'),
          active: false
        }, {
          question: L("What's the end goal of Group Income?"),
          answer: L(`Basic Income Security.{br_}{br_}
            Our real goal with Group Income is to ensure basic security for everyone. Some societies have chosen to restrict access to such things behind money, and therefore we're developing what is really just a bandaid to fix the damage that money creates.{br_}{br_}
            Like clean air and clean water, everyone should have access to a clean bed and healthy food. Access to such things shouldn't rely solely on the ability to afford them.{br_}{br_}
            {strong_}That is the goal. Group Income is one of the steps on the way to that goal.{_strong}`,
            { ...LTags('strong') }
          ),
          active: false
        }]
      }/*, {
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
      }*/]
    }
  },
  computed: {
    allItemsExpanded () {
      const allQuestions = this.faqs.flatMap(block => block.qa)
      return allQuestions.every(q => q.active)
    }
  },

  methods: {
    openTab (index, qindex) {
      const currVal = this.faqs[index].qa[qindex].active
      this.faqs[index].qa[qindex].active = !currVal

      if (!currVal) {
        this.scrollTo(`dt#q_${index}${qindex}`)
      }
    },
    toggleExpand () {
      const shouldFoldAll = this.allItemsExpanded

      this.faqs.forEach((block) => {
        block.qa.forEach((question) => {
          question.active = !shouldFoldAll
        })
      })

      if (shouldFoldAll) {
        this.scrollTo('.c-collapse-title#general', true)
      }
    },
    scrollTo (selector, instant = false) {
      const elScrollTo = document.querySelector(selector)

      if (elScrollTo) {
        elScrollTo.scrollIntoView({
          behavior: instant ? 'instant' : 'smooth',
          block: 'center'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@use "../styles/variables" as *;

.c-nav {
  position: sticky;
  top: var(--gi-header-height);
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
    height: auto;
    width: calc(100% + 2rem);
    margin-left: -1rem;
    font-size: 0.85rem;

    li {
      padding: .5rem;
    }
  }

  @include tablet {
    padding: 0 0.5rem;
  }
}

.c-collapse-title {
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 30px;
}

.c-question {
  cursor: pointer;
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
    max-height: 100rem;
  }
}

.active-nav button {
  font-weight: bold;
}
</style>

<style lang="scss">
@use "../styles/mixins" as m;

.l-faq {
  a {
    @include m.link-style;
  }
}
</style>
