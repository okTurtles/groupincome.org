import type { App } from 'vue'
import { resolvePath, imgPathToSrcSet } from '@/utils/helpers.js'
import { useTranslation } from '@/i18n/utils'

const setResolvedPathToAttr = (attrName: string, el: HTMLElement, relPath: string, lang: string = '') => {
  el.setAttribute(attrName, resolvePath(relPath, lang) || '')
}

export default (app: App) => {
  // custom-directives
  app.directive('src', (el, binding) => {
    setResolvedPathToAttr('src', el, binding.value, binding.arg || '')
  })
  app.directive('srcset', (el, binding) => {
    el.setAttribute(
      'srcset',
      imgPathToSrcSet(binding.value, parseInt(binding.arg || '1'))
    )
  })
  app.directive('href', (el, binding) => {
    setResolvedPathToAttr('href', el, binding.value, binding.arg || '')
  })

  //  mixins
  app.mixin({
    resolvePath
  })

  // global provide
  app.provide('useTranslation', useTranslation)
}
