<template>
<svg class="parallax-bg"
     width="82" 
     height="563"
     viewbox="0 0 82 563"
     fill="none"
     xmlns="http://www.w3.org/2000/svg"
     preserveAspectRatio="xMaxYMin slice"
     :style="styles"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M0.708002 0C68.6559 112.38 96.4123 241.08 74.811 369.295C62.3559 443.261 34.5419 507.949 0.529284 563H0V0H0.708002Z"
    :fill="color">
  </path>
</svg>

</template>

<script>
export default {
  name: 'Sides',
  props: {
    color: {
      type: String,
      default: '#D0DEEA'
    },
    styles: {
      type: Object,
      default () {}
    },
    y: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/_variables";

svg {
  position: absolute;
  z-index: 1;
  pointer-events: none;
  width: 3rem;

  @include phone {
    display: none;
  }

  @include desktop {
    width: auto;
  }
}
</style>
