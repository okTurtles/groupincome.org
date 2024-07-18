<template>
  <ul>
    <li class="c-crypto-item" v-for="crypto in cryptos" @click="copyToClipBoard(crypto.id)" :key="crypto.id">
      <label class="c-crypto-label">{{crypto.name}} ({{crypto.abreviation}})</label>

      <div class="c-crypto-field">
        <span class="c-address-text">{{crypto.id}}</span>
      </div>

      <div class="c-copied-feedback" :class="{ 'is-active': copied === crypto.id }">Copied to clipboard!</div>
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
          name: 'Etherium',
          abreviation: 'ETH',
          id: '0x62992467ecd54d45fe5a028b4ccd082486ccc9a8'
        }, {
          name: 'Monero',
          abreviation: 'XMR',
          id: '899WAZkTAHv71bxeVu3coHcyCynEpbKWvhSfAxpRu41qXCfrMPz9cae7jzMS7mVAFb63mVxCm64NdVSFZ7Aey1nvE1Dgb7E'
        }, {
          name: 'Zcash',
          abreviation: 'ZEC',
          id: 't1Vk6YJK4g7YYPPD8ENMoHBeNDqoQ67mCHx'
        }
      ],
      copied: ''
    }
  },

  methods: {
    copyToClipBoard (value) {
      navigator.clipboard.writeText(value)

      clearTimeout(this.timeoutId)
      this.copied = value

      this.timeoutId = setTimeout(() => {
        this.copied = ''
      }, 1600)
    }
  }
}
</script>

<style lang="scss">
@import "../styles/_variables";
@import "../styles/_mixins";

.c-crypto-item {
  position: relative;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: auto 1fr;
  height: auto;
  align-items: center;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 100%;

  @include phone {
    margin-bottom: 2rem;
    grid-template-rows: auto auto;
    grid-template-columns: 1fr;
  }

  @include desktop {
    max-width: 31.25rem;
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
  align-items: center;
  position: relative;
  background: $bg;
  border: 1px solid #D0DEEA;
  border-radius: 0.5rem;
  height: 2.5rem;
  padding: 0 .5rem;
  font-family: Lato;
  letter-spacing: -0.3px;
  color: #363636;
  overflow-x: hidden;

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

.c-copied-feedback {
  position: absolute;
  display: block;
  width: max-content;
  height: auto;
  padding: 0.5rem;
  bottom: -0.5rem;
  left: 50%;
  transform: translate(-50%, 100%);
  border-radius: 0.5rem;
  background-color: #3B405C;
  color: #FFFFFF;
  font-size: 0.9em;
  pointer-events: none;
  opacity: 0;
  z-index: 2;

  &.is-active {
    opacity: 1;
    transition: opacity 200ms ease-in;
  }

  @include phone {
    font-size: 0.8em;
  }
}
</style>