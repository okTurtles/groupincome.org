<template>
<footer class="c-footer">
    <div class="c-top">
        <div class="c-wrapper"><img class="c-logo-img" src="/groupincome.org/images/group-income-icon-transparent.png" />
            <form class="c-form">
                <h4 class="is-title-6">STAY UP TO DATE</h4>
                <p>Subscribe to our newsletter to be the first to know when the prototype is ready.</p>
                <div class="c-input"><input class="input" type="email" placeholder="Your email address" /></div>
            </form>
        </div>
        <div class="c-links">
            <div class="c-links-group">
                <h4 class="is-title-6">GROUPINCOME</h4>
                <a href="/groupincome.org/">Home</a>
                <a href="/groupincome.org/about-us">About us</a>
                <a href="/groupincome.org/articles">Blog</a>
                <a href="/groupincome.org/faq">FAQ</a>
            </div>
            <div class="c-links-group">
                <h4 class="is-title-6">CONTRIBUTE</h4>
                <a href="/groupincome.org/volunteer">Volunteer</a>
                <a href="/groupincome.org/join-our-team">Join our team</a>
                <a href="/groupincome.org/sponsor">Sponsor</a>
            </div>
            <div class="c-links-group">
                <h4 class="is-title-6">SOCIAL</h4><a href="https://twitter.com/Group_Income" target="_blank" alt="Twitter">Twitter</a>
                <a href="https://mstdn.io/@okturtles" target="_blank" alt="Mastodon">Mastodon</a>
                <a href="https://www.youtube.com/@GroupIncome" target="_blank" alt="Youtube">YouTube</a>
                <a href="https://www.reddit.com/r/groupincome/" target="_blank" alt="Reddit">Reddit</a>
            </div>
        </div>
    </div>
    <div class="c-bottom">
        <div class="c-bottom-links">
            <a href="/groupincome.org/terms-and-conditions">Term & Conditons</a>
            <a href="/groupincome.org/privacy-policy">Privacy Policy</a>
        </div>
        <p class="copyright">Copyright © 2015-2021 okTurtles Foundation</p>
    </div>
</footer>

</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
@import "../styles/_variables";
.c-footer {
  max-width: $maxDesktop;
  margin: 2rem auto 0 auto;
  padding: 2rem;
  text-align: center;
  // border-top: 1px solid #D0DEEA;

  @include desktop {
    margin: 4rem auto 2rem auto;
    padding: 4rem 1rem 0 1rem;
    text-align: left;
  }
}

.c-top {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @include until($desktop) {
    flex-direction: column;
  }
}

.c-wrapper {
  display: flex;

  @include until($desktop) {
    flex-direction: column;
    align-items: center;
  }
}

.c-form {
  max-width: 100%;
  width: 100%;

  @include tablet {
    width: 40rem;
  }

  @include desktop {
    width: 20rem;
  }
}

.c-input {
  margin: 1.375rem 0;
}

.c-logo-img {
  width: 3.25rem;
  height: 3.25rem;
  margin-right: 1.875rem;

  @include until($desktop) {
    margin-bottom: 1rem;
    margin-right: 0;
  }
}

.c-links-group {
  display: flex;
  flex-direction: column;
  min-width: 11.5rem;

  @include phone {
    margin-bottom: 1rem;
  }
}

.is-title-6 {
  font-weight: 600;
  line-height: 1.625rem;
}

.c-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
  line-height: 2rem;
  margin-top: 2rem;
  padding: 0 2rem;

  @include desktop {
    justify-content: space-between;
    margin-left: 5.2rem;
    margin-top: 0;
    padding: 0;
  }
}

.c-bottom {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top: 1px solid #D0DEEA;
  padding: 2rem 0 0rem 0;
  margin-top: 2rem;

  @include desktop {
    flex-direction: row;
    padding: 3.125rem 0 0rem 5rem;
    margin-top: 4.375rem;
  }
}

.c-bottom-links {

  a:last-child::before {
    content: '-';
    padding: 0 .4rem 0 .5rem;
  }
}
</style>
