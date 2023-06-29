<script lang="ts">
  import { type Deck } from '../models/decks.model';
  import DeckComponent from '@/components/decks/DeckComponent.vue';
  import AddDeckComponent from '@/components/decks/AddDeckComponent.vue';
  import ModifyDeckComponent from '@/components/decks/ModifyDeckComponent.vue';

  export default {
    data() {
        let decks: Deck[] = [];
        return {
            addDeckDialog: false,
            decks: decks,
            editDecks: false
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
    components: { DeckComponent, AddDeckComponent, ModifyDeckComponent }
}

</script>

<template>
  <div class="decks">

    <DeckComponent v-for="deck in decks" :deck="deck" :editMode="editDecks"></DeckComponent>

    <v-btn class="edit-decks" color="primary" :variant="editDecks ? 'outlined' : 'tonal'" @Click="editDecks = !editDecks">Edit</v-btn>

    <AddDeckComponent class="add-deck"></AddDeckComponent>
  </div>
</template>

<style lang="scss" scoped>
  .decks {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    @media (min-width: 1024px) {
        min-height: 100vh;
    }
  }

  .add-deck {
    position: absolute;
    right: 50px;
    bottom: 50px;
  }
  .edit-decks {
    position: absolute;
    left: 50px;
    bottom: 50px;
    display: flex;
    width: 70px;
    height: 50px;
    box-shadow: 0px 0px 7px -2px rgb(123, 0, 189);
  }
</style>

