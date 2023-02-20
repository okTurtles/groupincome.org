<template>
<div class="fundraiser">
  <div class="wrapper">
    <p>Help us reach our goal! 🙏</p>
    <div class="progress-wrapper">
      <div class="progress-element progress-element--html">
        <div class="progress-container">
          <progress max="100" value="53">$5405 (53%)</progress>
        </div>
        <p class="progress-label">$5405 (53%)</p>
      </div>
    </div>
    <a href="" class="button">Donate now</a>
  </div>
</div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@import "../styles/_variables";

.fundraiser {
  background-color: #3B405C;
  padding: 1.375rem;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 59rem;
  margin: 0 auto;
  background: #fff;
  border-radius: 0.5rem;
  height: 5.8rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

progress {
  opacity: 0;
}

.progress-element {
  width: 100%;
  margin: 21px 0 0;

;
}

.progress-wrapper {
  width: 100%;
  max-width: 490px;
  border-right: 1px solid #DFE4EA;
  border-left: 1px solid #DFE4EA;
  height: 100%;
  padding: 1.34rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.progress-container {
  position: relative;
  background: #D8F1FF;
  height: .5rem;
  border-radius: .5rem;
  overflow: hidden;
}

.progress-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  background: #0288D1;
}

.progress-element--html .progress-container::before {
  animation: progress-html 1s ease-in forwards;
}

@property --num {
  syntax: "<integer>";
  initial-value: 0;
  inherits: false;
}

.progress-label::after {
  counter-reset: num var(--num);
  content: counter(num) "%";
  position: absolute;
  top: 0;
  right: 0;
}

.progress-element--html .progress-label::after {
  animation: progress-text-html 1s ease-in forwards;
}

.progress-element--css .progress-label::after {
  animation: progress-text-css 1s ease-in forwards;
}

.progress-element--javascript .progress-label::after {
  animation: progress-text-javascript 1s ease-in forwards;
}

@keyframes progress-html {
  to {
    width: 53%;
  }
}
</style>
