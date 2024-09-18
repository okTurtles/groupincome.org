import type { App } from 'vue'
import { resolvePath, imgPathToSrcSet } from '@/utils/helpers.js'

const setResolvedPathToAttr = (attrName: string, el: HTMLElement, relPath: string) => {
  el.setAttribute(attrName, resolvePath(relPath) || '')
  console.log('!@# output path: ', resolvePath(relPath) || '')
}

export default (app: App) => {
  // custom-directives
  app.directive('src', (el, binding) => {
    setResolvedPathToAttr('src', el, binding.value)
  })
  app.directive('srcset', (el, binding) => {
    el.setAttribute(
      'srcset',
      imgPathToSrcSet(binding.value, parseInt(binding.arg || '1'))
    )
  })
  app.directive('href', (el, binding) => setResolvedPathToAttr('href', el, binding.value))

  // global mixins
  app.mixin({
    resolvePath
  })
}
