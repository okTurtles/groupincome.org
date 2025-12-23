import type { App } from 'vue'
import { resolvePath, imgPathToSrcSet } from '@/utils/helpers.js'
import { useTranslation } from '@/i18n/utils'
import I18n from '@/i18n/i18n.vue'

const isNode = typeof globalThis.window === 'undefined' && typeof globalThis.document === 'undefined'
const getLang = () => {
  return isNode
    ? (globalThis as any).locale || ''
    : document.body.dataset.translation || ''
}
const setResolvedPathToAttr = (attrName: string, el: HTMLElement, relPath: string, useLocale: boolean = false) => {
  el.setAttribute(attrName, resolvePath(relPath, useLocale ? getLang() : '') || '')
}

export default (app: App) => {
  // custom-directives
  app.directive('src', (el, binding) => {
    setResolvedPathToAttr('src', el, binding.value, binding.modifiers.locale)
  })
  app.directive('srcset', (el, binding) => {
    el.setAttribute(
      'srcset',
      imgPathToSrcSet(binding.value, parseInt(binding.arg || '1'))
    )
  })
  app.directive('href', (el, binding) => {
    setResolvedPathToAttr('href', el, binding.value, binding.modifiers.locale)
  })

  //  mixins
  app.mixin({
    resolvePath
  })

  // global components
  app.component('I18n', I18n)

  const locale = getLang()
  const L = useTranslation(locale)

  // global provides
  app.provide('L', L)
  app.provide('locale', locale)
}
