import type { App } from 'vue'
import { resolvePath } from '@/utils/helpers.js'

const updateAttr = (attrName, el, relPath) => {
  el.setAttribute(attrName, resolvePath(relPath))
}

export default (app: App) => {
  // custom-directives
  app.directive('src', (el, binding) => updateAttr('src', el, binding.value))
  app.directive('href', (el, binding) => updateAttr('href', el, binding.value))

  // global mixins
  app.mixin({
    resolvePath
  })
}
