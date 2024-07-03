<template>
<div class="fundraiser" v-if="$isFundraiserOpen">
  <div class="wrapper">
    <b class="c-help">{{ t('Help us reach our goal!') }} 🙏</b>
    <div class="progress-wrapper">
      <div class="progress-element">
        <div class="progress-container">
          <progress max="100" :value="progress">${{ current }} ({{ pourcent }})</progress>
        </div>
        <p class="progress-label">${{ current }} ({{ pourcent }})</p>
      </div>
    </div>
    <a :href="resolvePath('/donate')" class="button">{{ t('Donate now') }}</a>
    <i class="icon-times icon-button c-close-btn has-shallow-box-shadow"
      tabindex="0"
      @click="closeFundraiser"
    ></i>
  </div>
</div>
</template>

<script setup>
import { isFundraiserOpen, closeFundraiser } from '../store.ts';
import { useStore } from '@nanostores/vue';
import { resolvePath } from '@/utils/helpers.js'
import { useTranslation } from '@/i18n/utils.ts';

const props = defineProps({
  lang: {
    type: String,
    default: ''
  }
})
const t = useTranslation(props.lang, 'fundraiser')
const $isFundraiserOpen = useStore(isFundraiserOpen);

const total = 10000
const current = 5405
const progress = Math.round((current / total) * 100)
const pourcent = `${progress}%`

</script>

<style lang="scss" scoped>
@import "../styles/_variables";
@property --num {
  syntax: "<integer>";
  initial-value: 0;
  inherits: false;
}

.fundraiser {
  background-color: #3B405C;
  padding: 1.375rem;
}

.open-nav .fundraiser {
  display: none;
}

b {
  font-size: 1.125rem;
}

.button {
  font-size: 1rem;
  border-radius: .5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  min-height: 2.5rem;
  margin-left: 1rem;
}

.wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  max-width: 59rem;
  margin: 0 auto;
  background: #fff;
  border-radius: 0.5rem;
  padding: 1rem;

  @include tablet {
    flex-direction: row;
    height: 5.8rem;
    padding-top: 0;
    padding-bottom: 0;
  }
}

.c-help {
  padding-right: 1rem;
}

.c-close-btn {
  position: absolute;
  top: 0;
  right: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
  transform: translate(35%, -35%);
}

progress {
  opacity: 0;
}

.progress {
  &-element {
    width: 100%;
    margin: 1rem 0 .5rem 0;

    @include tablet {
      margin: 21px 0 0;
    }
  }

  &-wrapper {
    width: 100%;
    max-width: 490px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @include tablet {
      border-right: 1px solid #DFE4EA;
      border-left: 1px solid #DFE4EA;
      padding: 1.34rem;
    }
  }

  &-container {
    position: relative;
    background: #D8F1FF;
    height: .5rem;
    border-radius: .5rem;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 0;
      background: #0288D1;
      animation: progress 1s ease-in forwards;
    }
  }

  &-label {
    position: relative;
    font-size: 0.75rem;
    padding-top: .4rem;
    color: #585858;

    &::after {
      counter-reset: num var(--num);
      content: "$"counter(num);
      position: absolute;
      top: .4rem;
      right: 0;
      animation: progress-text 1s ease-in forwards;
    }
  }
}

@keyframes progress {
  to {
    width: v-bind(pourcent);
  }
}

@keyframes progress-text {
  to {
    --num: v-bind(total);
  }
}
</style>
