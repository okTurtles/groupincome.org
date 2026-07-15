<template>
<div class="video-player-container plyr_override">
  <video ref="videoEl" playsinline controls :poster="resolvedPoster">
    <source :src="resolvedSrc" :type="mimeType" />
  </video>
</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { resolvePath } from '@/utils/helpers.js'

interface ComponentProps {
  src: string,
  mimeType: string,
  poster?: string
}

const props = defineProps<ComponentProps>()

const videoEl = ref<HTMLElement | null>(null)
const player = ref<any>(null)

const resolvedSrc = computed(() => resolvePath(props.src))
const resolvedPoster = computed(() => props.poster ? resolvePath(props.poster) : undefined)

onMounted(async () => {
  const { default: Plyr } = await import('plyr')
  player.value = new Plyr(videoEl.value as HTMLElement, {
    // Documentation for plyr options: https://www.npmjs.com/package/plyr#options
    debug: false
  })
})
</script>

<style lang="scss" src="../styles/components/plyr/_plyr_override.scss"></style>
