<script setup lang="ts">
definePageMeta({
  colorMode: 'dark',
})
const videoModalOpen = ref(false)

const { data: page } = await useAsyncData('index', () =>
  queryContent('/').findOne(),
)

const { data: code } = await useAsyncData('code', () =>
  queryContent('/code').findOne(),
)

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
  ogImage: page.value.cover,
  twitterImage: page.value.cover,
})
</script>

<template>
  <section>
    <span class="gradient" />
    <ULandingHero
      orientation="horizontal"
      :ui="{ container: 'flex lg:gap-12' }"
    >
      <div class="prose">
        <ContentRenderer :value="code" />
      </div>
      <template #title>
        <span v-html="page.hero?.title" />
      </template>
      <template #description>
        {{ page.hero?.description }}
      </template>
      <template #links>
        <UButton
          to="/getting-started"
          icon="i-ph-rocket-launch-duotone"
          size="xl"
        >
          {{ page.hero?.button }}
        </UButton>
        <UButton
          size="xl"
          color="white"
          icon="i-ph-video-duotone"
          @click="videoModalOpen = true"
        >
          What is Nuxt Cloudinary?
        </UButton>
        <UModal
          v-model="videoModalOpen"
          :ui="{ width: 'sm:max-w-[560px]' }"
        >
          <div>
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube-nocookie.com/embed/SEzrdtp-Rcw"
              title="Nuxt Cloudinary"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            />
          </div>
        </UModal>
      </template>
    </ULandingHero>

    <ULandingSection
      :title="page.features.title"
      style="padding-top: 0px"
    >
      <UPageGrid>
        <ULandingCard
          v-for="(item, index) of page.features.items"
          :key="index"
          v-bind="item"
        />
      </UPageGrid>
    </ULandingSection>
  </section>
</template>

<style scoped lang="postcss">
.gradient {
  position: fixed;
  top: 25vh;
  width: 100%;
  height: 30vh;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #00dc82 0%,
    rgba(0, 220, 130, 0) 100%
  );
  filter: blur(180px);
  opacity: 0.6;
  z-index: -1;
}

.prose {
  @apply text-white;

  :where(:deep(code)) {
    @apply text-gray-200;
  }
}
</style>
