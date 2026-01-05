## 1. L() function and I18n components
Any strings that we want to display in multiple languages must be wrapped with either L('...') or <i18n>...</i18n> components.
They both take optional arguments to dynamically replace parts of the string. Below are some example usages:

* Simple string:
  - I18n component:
  <i18n>Hello world!</i18n>

  - L()
  const str = L('Hello world!')

* Strings with args for dynamic replacements:
  - I18n.vue
    <i18n :args='{ name: yourName }'>
      Hello {name}
    </i18n>
  - L()
    ```js
    const greeting = L('Nice to meet you, {name}', { name: yourName })
    ```

* Strings with HTML markup inside:
  Use LTags('..') utility function to easily create variables for HTML opening/closing tags.

```html
  <I18n tag="p"
    args="{ ...LTags('strong', 'a'), 'a_': '<a class="is-link" href="https://github.com/okTurtles/group-income/discussions" target="_blank">'}">
    If {strong_}your question{_strong} wasn't answered on this page, please ask it on {a_}our community forums{_a}.
  </I18n>
```


## 2. Difference between `i18n.vue` and `i18n.astro` components
There are two I18n components. `I18n.vue` for Vue context (eg. Inside other .vue file) and I18n.astro for all other .astro files where it can be useful.
As shown in the above examples, dynamic replacement variables are wrapped with curly braces ({}) when used with `I18n.vue` component.
But In JSX, curly braces are a special syntax used to embed JavaScript expressions within the HTML-like markup, so we can't use it for dynamic string replacements.
So instead of that, we use pipe character('|') for variables in `I18n.astro` components. See below examples:

* I18n.vue component:
```html
  <i18n :args='{ name: yourName }'>
    Hello {name}!
  </i18n>

  <I18n tag="p"
    :args="{ ...LTags('strong', 'a'), 'a_': '<a class="is-link" href="https://github.com/okTurtles/group-income/discussions" target="_blank">'}">
    If {strong_}your question{_strong} wasn't answered on this page, please ask it on {a_}our community forums{_a}.
  </I18n>
```

* I18n.astro component versions:

```html
  <i18n args={{ name: yourName }}>
    Hello |name|!
  </i18n>

  <I18n tag="p"
    args={{ ...LTags('strong', 'a'), 'a_': '<a class="is-link" href="https://github.com/okTurtles/group-income/discussions" target="_blank">'}}>
    If |strong_|your question|_strong| wasn't answered on this page, please ask it on |a_|our community forums|_a|.
  </I18n>
```


## 3. How to use `L()` functions in `.vue` and `.astro` files
Unlike SPA application, where making certain utility globally available to all components trees is relatively easy, we need a small manual step to use L() function in a file.

* In .vue file - use `inject('L')`
L function is passed to all Vue islands with global provide/inject(refer to _app.ts file) along with other tranlsation related infos. So, import it using inject() function:

```js
import { inject } from 'vue'

...

const L = inject('L')
const textMap = {
  'opt1': L('...', { ... })
}
```

* In .astro file
`Astro.locals` is the object to store any data that we need to make globally available to all `.astro` components. But unfortunately this doesn't take functions. So we only store 'locale' information here instead and then pass this locale to `useTranslation()` function (imported from 'src/i18n/utils.ts') to create `L()` function where we need it:

```js
---
import { useTranslation } from '@/i18n/utils'

const { locale } = Astro.locals
const L = useTranslation(locale)

...

const title = L('What is Group Income?')
---
```


## 4. Generating translation tables (`en.json`, `ko.json` ...)
When the source-code is updated with more L() and i18n component usage, the new string entries need to be added to the translation tables.
run `npm run prepare-translation` command. It executes `prepare-translation.js` script which captures all strings wrapped either with `L(...)` or `<i18n>...</i18n>` tag that are missing in the tables. Below is an example piece of translation table:

```json
{ 
  ...
  "Stock donations": "Stock donations",
  "Donate time": "Donate time",
  "__________src/components/Donate.vue__________": "",
  "Copied to clipboard!": "Copied to clipboard!",
  "__________src/components/FAQ.vue__________": "",
  "Close all": "Close all",
  "Expand all": "Expand all",
  ...
}
```

The entry where the key string is the same as the value means it's untranslated yet. Go ahead and update them with your own translation.

### 4-1. `translation.config.js` file
Contains some configuration for `npm run prepare-translation` command. (eg. language codes to generate translation tables for, file extensions to scan etc.) Please refer to the inline comments for each option in the file.

Manually updating the translation tables ourselves is quite tedious and time-consuming process. So there is an *optional* step to use *LLM* to complete the missing translations in the table. It uses [OpenRouter API](https://openrouter.ai/docs/quickstart) to talk to LLM models, which requires us to sign up and get an API key.

Set `llmTranslation.enabled` option to `true` to enable this step and choose/specify a model to use for translation. Create an `.env` file in the root folder and store your OpenRouter API key as `OPENROUTER_API_KEY` there. You can just specify the API key in the config file directly but don't forget to remove it before commiting to GH if you do so.
