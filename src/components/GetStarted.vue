<template>
<div>
  <div class="c-feature-boxes">
    <div class="c-feature-box">
      <div class="c-feature-box-title">Choose a Server</div>
      <div class="c-feature-box-para">
        Use
        <a href="https://groupincome.app" class="is-link">our official server</a>
        , choose from a community of independently operated servers, or run your own!
      </div>
    </div>

    <div class="c-feature-box">
      <div class="c-feature-box-title">Create an account</div>
      <div class="c-feature-box-para">
        Group Income doesn't use cookies to manage user accounts.
        <a href="https://shelterprotocol.net" target="_blank" class="is-display-block is-link">Read more about our technology</a>
      </div>
    </div>

    <div class="c-feature-box">
      <div class="c-feature-box-title">Join a Group and Start Sharing!</div>
      <div class="c-feature-box-para">
        Contribute with monetary or non-monetary donations and secure everyone in your group with a basic income.
      </div>
    </div>
  </div>

  <div class="video-wrapper">
    <iframe
      id="odysee-iframe"
      style="width:100%; aspect-ratio:16 / 9;"
      src="https://odysee.com/%24/embed/%40okTurtles%3Ae%2Fgroup_income_intro%3A6?r=J91Yd9UJDqP36LmGQZaGwG95T1NcnzDW"
      allowfullscreen>
    </iframe>
  </div>
</div>
</template>

<style lang="scss" scoped>
@import "../styles/_variables";
.c-feature-boxes {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 5rem;
}

.c-feature-box {
  max-width: 24.5rem;
  margin: 1rem;
  position: relative;
  background-color: rgba(#E7EFF4, 0.5);
  border-radius: 1rem;
  padding: 3.3rem 1.5rem 2rem 1.5rem;
  margin-top: 2rem;
  text-align: center;

  &::after {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    top: -1rem;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    color: #fff;
  }

  &:nth-child(1)::after {
    content: '1';
    background: #0288D1;
    box-shadow: 0 0 0 0.4rem  rgba(#0288D1, 0.4);
  }

  &:nth-child(2)::after {
    content: '2';
    background: #F99201;
    box-shadow: 0 0 0 0.4rem  rgba(#F99201, 0.4);
  }

  &:nth-child(3)::after {
    content: '3';
    background: #A1D10E;
    box-shadow: 0 0 0 0.4rem  rgba(#A1D10E, 0.4);
  }

  .is-link.is-display-block {
    margin-left: auto;
    margin-right: auto;
  }
}

.video-wrapper {
  margin-top: 5rem;
  margin-bottom: 2rem;
  width: 100vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-left: 0;
  margin-right: 0;

  @include tablet {
    width: 44rem;
    max-width: 90vw;
    position: static;
    left: auto;
    transform: none;
    margin-left: auto;
    margin-right: auto;
  }

  @include desktop {
    width: 50rem;
    max-width: 85vw;
  }

  @media (min-width: 1400px) {
    width: 56rem;
    max-width: 80vw;
  }
}
</style>
