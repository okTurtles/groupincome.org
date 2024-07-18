<template>
  <div class="panel">
    <dl v-for="item, index in list" :key="index">
      <dt @click="toggleTab(index)" :class="{active: item.active === true}">
        <h2 class="c-collapse-title" :id="item.id">{{item.title}}</h2>
        <i v-if="item.active === true">
          <img class="c-icon" src="/svgs/minus-circle.svg" />
        </i>
        <i v-else>
          <img class="c-icon" src="/svgs/plus-circle.svg" />
        </i>
      </dt>
      <dd :class="{active: item.active === true}">
        <div class="description" v-html="item.description"></div>
        
        <a class="button is-primary" :href="item.link" v-if="item.link">{{ item.linkCopy }}</a>
      </dd>
  </dl>
</div>
</template>

<script>
export default {
  name: 'Accordion',
  data () {
    return {
      list: [{
        title: 'Github',
        id: 'github',
        description: 'Are you an expert at JavaScript? Know the language and tools inside-out? Been programming for at least 4 years? Know several programming languages? Great! You might be a fit for this position. 🙂',
        link: 'https://github.com/sponsors/okTurtles',
        linkCopy: 'Donate',
        active: true
      }, {
        title: 'Car donation',
        id: 'car-donation',
        description: 'Are you an expert at JavaScript? Know the language and tools inside-out? Been programming for at least 4 years? Know several programming languages? Great! You might be a fit for this position. 🙂',
        link: 'https://github.com/sponsors/okTurtles',
        linkCopy: 'Donate'
      }, {
        title: 'Check',
        id: 'check',
        description: 'Are you an expert at JavaScript? Know the language and tools inside-out? Been programming for at least 4 years? Know several programming languages? Great! You might be a fit for this position. 🙂',
        link: 'https://github.com/sponsors/okTurtles',
        linkCopy: 'Donate'
      }, {
        title: 'Paypal',
        id: 'paypal',
        description: 'Are you an expert at JavaScript? Know the language and tools inside-out? Been programming for at least 4 years? Know several programming languages? Great! You might be a fit for this position. 🙂',
        link: 'https://github.com/sponsors/okTurtles',
        linkCopy: 'Donate'
      }, {
        title: 'Online purchases',
        id: 'online-purchases',
        description: 'Are you an expert at JavaScript? Know the language and tools inside-out? Been programming for at least 4 years? Know several programming languages? Great! You might be a fit for this position. 🙂',
        link: 'https://github.com/sponsors/okTurtles',
        linkCopy: 'Donate'
      }, {
        title: 'Stock donations',
        id: 'stock-donations',
        description: 'Are you an expert at JavaScript? Know the language and tools inside-out? Been programming for at least 4 years? Know several programming languages? Great! You might be a fit for this position. 🙂',
        link: 'https://github.com/sponsors/okTurtles',
        linkCopy: 'Donate'
      }, {
        title: 'Donate time',
        id: 'donate-time',
        description: 'Are you an expert at JavaScript? Know the language and tools inside-out? Been programming for at least 4 years? Know several programming languages? Great! You might be a fit for this position. 🙂',
        link: 'https://github.com/sponsors/okTurtles',
        linkCopy: 'Donate'
      }],
      previous: 0
    }
  },
  methods: {
    toggleTab (index) {
      if (index !== this.previous) this.list[this.previous].active = false
      this.previous = index
      this.list[index].active = !this.list[index].active
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/_variables";
@import "../styles/_mixins";

.panel {
  display: grid;
  justify-content: center;
  padding: 0 2rem;
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
  z-index: 2;
  overflow: hidden;
  border-bottom: 1px solid #DFE4EA;

  &:last-child {
    border-bottom: none;
  }
}

dt {
  position: relative;
  height: 5.25rem;
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
    color: $primary_0
  }

  &.active {
    font-weight: bold;

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
  transition: max-height 0.5s ease-out;
  margin: 0;

  div:last-child {
    padding-bottom: 1.5rem;
  }

  &.active {
    max-height: 40rem;
  }

  .description {
    color: #989898;
    padding-bottom: 1.5rem;
  }

  .button {
    margin-bottom: 1.5rem;
  }
}
</style>
