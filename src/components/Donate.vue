<template>
  <ul>
    <li class="c-crypto-item" v-for="crypto in cryptos" @click="copyToClipBoard(crypto.id)" :key="crypto.id">
      <label class="c-crypto-label">{{crypto.name}} ({{crypto.abreviation}})</label>
      <div class="c-crypto-field">{{crypto.id}}</div>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      isDonationBoxLoaded: false,
      cryptos: [
        {
          name: 'Bitcoin',
          abreviation: 'BTC',
          id: '39ekronaSx3pBUuftNYfuwoWbGipnFrBv6'
        }, {
          name: 'Bitcoin',
          abreviation: 'segwit',
          id: 'bc1qs4l0y8x6z5nqfm240jadxwps5epvsshy6uaw8h'
        }, {
          name: 'Etherium',
          abreviation: 'ETH',
          id: 'bc1qs4l0y8x6z5nqfm240jadxwps5epvsshy6uaw8h'
        }, {
          name: 'Litecoin',
          abreviation: 'LTC',
          id: 'LXE6qeUw6f9eALb31X31S6TheTNZ6XkduT'
        }, {
          name: 'Monero',
          abreviation: 'XMR',
          id: 'LXE6qeUw6f9eALb31X31S6TheTNZ6XkduT'
        }, {
          name: 'Zcash',
          abreviation: 'ZEC',
          id: 't1bMQVWoLt65uc9tRQn3eirQMPzAh8SDcfS'
        }
      ]
    }
  },

  methods: {
    copyToClipBoard (value) {
      navigator.clipboard.writeText(value)
    }
  }
}
</script>

<style lang="scss">
@import "../styles/_variables";
@import "../styles/_mixins";

.c-crypto-item {
  display: flex;
  height: 2.5rem;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  @include phone {
    margin-bottom: 3rem;
    flex-wrap: wrap;
  }
}

.c-crypto-label {
  min-width: 8rem;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  color: #363636;

  @include phone {
    margin-bottom: 0.6rem;
  }
}

$bg: #eceef0;
.c-crypto-field {
  display: flex;
  flex-grow: 1;
  align-items: center;
  position: relative;
  background: $bg;
  overflow: hidden;
  border: 1px solid #D0DEEA;
  border-radius: 0.5rem;
  height: 100%;
  padding: 0 .5rem;
  font-family: Lato;
  letter-spacing: -0.3px;
  color: #363636;

  &::before,
  &::after {
    content: '';
    position: absolute;
    right: 0;
    width: 3rem;
    height: 100%;
    background: linear-gradient(90deg, rgb(245 248 251 / 0%) 0%, $bg 25%);
  }
  &::after {
    background: url('/svgs/copy.svg') no-repeat right .875rem center;
  }

  &:hover {
    background: #D0DEEA;
    border-color: $bg;
    cursor: pointer;

    &::before {
      background: linear-gradient(90deg, rgb(245 248 251 / 0%) 0%, #D0DEEA 25%);
    }
  }
}

</style>