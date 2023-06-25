<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>

  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>✨ Flash Magic ✨</template>

    Flash cards are a ubiquitous learning tool, cheap, effective, and time tested - there's no reason not to use them.
    Flash cards work by forcing active recall. 
    <!-- According to one study, this kind of active recall
    <a href="https://www.science.org/doi/abs/10.1126/science.1152408?ref=brainscape.com">improves retention by 150%</a>
    when compared to studying passively. -->
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Spaced repetition</template>

    By showing you those hard flashcards more frequently, eventually they'll get easier. As the hard cards get easier, other
    moderately hard cards are now shown more frequently until all the cards are as easy as pie!
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Leitner system</template>

    A technique of spaced repetition that works by making you start over everytime you miss an answer. As you get better,
    you begin to review those harder cards more frequently while still churning through the memorized concepts!
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Three-sided cards</template>

    Sometimes the answer alone isn't enough - when you also need to know the concept and see an image or hear a sound,
    the third sides comes in clutch. Ex. 
    Hello in Korean / 안녕하세요 (annyeonghaseyo) / <ia>audio snippet</ia>

  </WelcomeItem>

</template>
