<template>
<svg class="svg" width="1400" height="438" viewBox="0 0 1400 438" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
  <path d="M6.31483e-05 332C169.993 385.057 403.492 410.067 710.221 434.449C993.908 451.073 1118.38 387.937 1399.64 390.894L1399.64 102C1254.21 101.625 1233.08 103.2 1093.66 106.363C1034.93 107.696 987.651 109.083 945.92 110.307L944.675 110.344C819.261 114.03 778.616 113.293 678.309 107.415C578.002 101.538 150.668 87.953 4.83811e-05 0.499996L6.31483e-05 332Z" fill="url(#paint0_linear)" fill-opacity="0.5"></path>
  <defs>
    <linearGradient id="paint0_linear" x1="799.673" y1="334.515" x2="790.112" y2="497.951" gradientUnits="userSpaceOnUse">
      <stop stop-color="white"></stop>
      <stop offset="1" :stop-color="stopColor"></stop>
    </linearGradient>
  </defs>
</svg>
</template>

<script>
export default {
  name: 'Swoosh',
  props: {
    stopColor: {
      type: String,
      default: '#D0DEEA'
    }
  }
}
</script>

<style lang="scss" scoped>
.svg {
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: -1;
  pointer-events: none;
}
</style>
