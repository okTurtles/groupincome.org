<template>
<div class="video-player-container plyr_override">
  <video ref="videoEl" playsinline controls>
    <source :src="src" :type="mimeType" />
  </video>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Plyr, { type Options as PlyrOptions } from 'plyr'

interface ComponentProps {
  src: string,
  mimeType: string
}

defineProps<ComponentProps>()

const videoEl = ref<HTMLElement | null>(null)
const player = ref<any>(null)

// methods
const initPlayer = () => {
  const opts: PlyrOptions = {
    // Documentation for plyr options: https://www.npmjs.com/package/plyr#options
    debug: false
  }

  player.value = new Plyr(videoEl.value as HTMLElement, opts)
}

onMounted(() => {
  initPlayer()
})
</script>

<style lang="scss" src="../styles/components/plyr/_plyr_override.scss"></style>
