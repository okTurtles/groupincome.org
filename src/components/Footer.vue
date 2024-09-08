<template>
<footer class="c-footer">
    <div class="c-top">
        <div class="c-wrapper"><img class="c-logo-img" v-src="'/images/group-income-icon-transparent.png'" />
            <form class="c-form" ref="emailForm"
              action="https://buttondown.email/api/emails/embed-subscribe/okturtles"
              method="post"
              target="popupwindow"
              @submit.prevent="onFormSubmit">
                <h4 class="is-title-6">{{ t('STAY UP TO DATE') }}</h4>
                <p>{{ t('Subscribe to our newsletter to be the first to know when the prototype is ready.') }}</p>

                <fieldset class="c-mail-form-field">
                  <div class="c-input">
                    <input :class="['input', { error: emailErr }]"
                      type="email" name="email" id="bd-email"
                      :placeholder="t('Your email address')"
                      v-model.trim="email" />
                    <button class="is-unstyled c-send-btn" type="submit" value="Subscribe">
                      <i class="icon-paper-plane"></i>
                    </button>
                  </div>

                  <p v-if="emailErr" class="error c-email-err">{{ emailErr }}</p>
                </fieldset>
            </form>
        </div>
        <div class="c-links">
            <div class="c-links-group">
                <h4 class="is-title-6">GROUPINCOME</h4>
                <a v-href="'/'">{{ t('Home') }}</a>
                <a v-href="'/about-us'">{{ t('About us') }}</a>
                <a v-href="'/blog'">{{ t('Blog') }}</a>
                <a v-href="'/faq'">{{ t('FAQ') }}</a>
            </div>
            <div class="c-links-group">
                <h4 class="is-title-6">{{ t('CONTRIBUTE') }}</h4>
                <a v-href="'/volunteer'">{{ t('Volunteer') }}</a>
                <a v-href="'/join-our-team'">{{ t('Join our team') }}</a>
                <a v-href="'/donate'">{{ t('Donate') }}</a>
                <a href="https://github.com/okTurtles/group-income" target="_blank" alt="Github">Github</a>
            </div>
            <div class="c-links-group">
                <h4 class="is-title-6">{{ t('SOCIAL') }}</h4>
                <a href="https://twitter.com/Group_Income" target="_blank" alt="Twitter">X/Twitter</a>
                <a href="https://crib.social/okturtles" target="_blank" alt="Fediverse">Fediverse</a>
                <a href="https://www.youtube.com/@GroupIncome" target="_blank" alt="Youtube">YouTube</a>
                <a href="https://join.slack.com/t/okturtles/shared_invite/zt-10jmpfgxj-tXQ1MKW7t8qqdyY6fB7uyQ" target="_blank" alt="Slack">Slack</a>
                <a href="https://github.com/okTurtles/group-income/discussions" target="_blank" alt="Forums">Forums</a>
            </div>
        </div>
    </div>
    <div class="c-bottom">
        <div class="c-bottom-links">
            <a v-href="'/terms-and-conditions'">{{ t('Term & Conditons') }}</a>
            <a v-href="'/privacy-policy'">{{ t('Privacy Policy') }}</a>
        </div>
        <p class="copyright">{{ copyRightText }}</p>
    </div>

    <NewsLetterWarningModal />
</footer>
</template>

<script>
import { useTranslation } from '@/i18n/utils.ts'
import NewsLetterWarningModal from '@/components/modals/NewsLetterWarningModal.vue'
import { validateEmail } from '@/utils/helpers.js'
import { openModal } from '@/store'

const EMAIL_BLACKLIST = [
  'gmail.com',
  'googlemail.com',
  'google.com'
]

export default {
  name: 'Footer',
  props: {
    lang: {
      type: String,
      default: ''
    }
  },
  components: {
    NewsLetterWarningModal
  },
  data () {
    return {
      email: '',
      emailErr: '',
      isSubmitting: false
    }
  },
  computed: {
    copyRightText () {
      const thisYear = new Date().getFullYear()
      return `Copyright © 2015-${thisYear} okTurtles Foundation`
    },
    t () {
      const query = useTranslation(this.lang, 'footer')
      return key => query(key)
    }
  },
  methods: {
    validateEmailField () {
      const getAddressSegment = str => str.split('@')[1]
      let passed = true

      if (!validateEmail(this.email)) {
        this.emailErr = this.t('Please enter correct email format.')
        passed = false
      } else if (EMAIL_BLACKLIST.includes(getAddressSegment(this.email))) {
        openModal('NewsLetterWarningModal')
        passed = false 
      }
      return passed
    },
    onFormSubmit () {
      if (this.validateEmailField()) {
        this.$refs.emailForm.submit()
        this.email = ''
      }
    }
  },
  watch: {
    email () {
      if (this.emailErr) {
        this.emailErr = ''
      }
    }
  }
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

.c-mail-form-field {
  position: relative;
  margin: 1.375rem 0;

}

.c-input {
  position: relative;

  input {
    padding-right: 2.75rem;
    border-radius: 0.5rem;
  }
}

.c-email-err {
  position: relative;
  width: 100%;
  padding-left: 2px;
}

.c-send-btn {
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  right: 0.5rem;
  transform: translateY(-50%);
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 0.5rem;
  color: $text_0;

  &:focus {
    border: 1px solid $primary_0;
    box-shadow: 0 0 0 2px $primary_1;
  }
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
