<script lang="ts">
  import { Deck } from '../models/decks.model';
  import DeckComponent from '@/components/DeckComponent.vue';

  export default {
    data() {
        let decks: Deck[] = [];
        return {
            dialog: false,
            decks: decks
        };
    },
    methods: {
        getDecks(): Deck[] {
            return [
                {
                    name: "Sample Deck",
                    cards: [
                        {
                            question: "How do you say hello in arabic?",
                            answer: "السلام وعليكم (Salaam wa Alaikum)"
                        },
                        {
                            question: "How do you say thank you in arabic?",
                            answer: "شكرا (Shukran)"
                        },
                        {
                            question: "How do you say you are welcome in arabic?",
                            answer: "عفوا"
                        }
                    ]
                }
            ];
        }
    },
    beforeMount() {
        this.$data.decks = this.getDecks();
    },
    components: { DeckComponent }
}

</script>

<template>
  <div class="decks">
    <h1>This is the Decks page</h1>

    <DeckComponent v-for="deck in decks" v-bind:deck="deck"></DeckComponent>
  </div>
</template>

<style lang="scss">
  .decks {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    @media (min-width: 1024px) {
        min-height: 100vh;
    }
  }
</style>
