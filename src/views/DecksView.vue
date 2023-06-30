<script lang="ts">
  import { type Card, type Deck } from '../models/decks.model';
  import DeckTileComponent from '@/components/decks/DeckTileComponent.vue';
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
      addDeckInit() {
        this.addDeckDialog = true;
        console.log(JSON.stringify(this.decks[this.decks.length - 1]));
        if(this.isLastDeckPopulated()) {
          this.decks.push({ name: 'New Deck', cards: [{} as Card]} as Deck);
        }
      },
      isLastDeckPopulated(): Boolean {
        return this.decks[this.decks.length - 1].cards[0].question !== undefined;
      },
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
    components: { DeckTileComponent, ModifyDeckComponent }
}

</script>

<template>
  <div class="decks">
    <DeckTileComponent class="deck-tile" v-for="deck in decks" :deck="deck" v-model:editMode="editDecks"></DeckTileComponent>

    <ModifyDeckComponent v-model:deck="decks[decks.length-1]" v-model:dialog="addDeckDialog" class="add-deck"></ModifyDeckComponent>

    <v-btn class="decks-action left" color="primary" :variant="editDecks ? 'outlined' : 'tonal'" @Click="editDecks = !editDecks">Edit</v-btn>
    <v-btn class="decks-action right" color="primary" :variant="'tonal'" @Click="addDeckInit()">Add</v-btn>
  </div>
</template>

<style lang="scss" scoped>
  .decks {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    @media (min-width: 1024px) {
      position: relative;
      min-height: 100vh;
    }
    @media (max-width: 1024px) {
      margin-top: 20px;
    }

    .deck-tile {
      margin: 10px;
    }
  }
  .decks-action {
    position: absolute;
    left: 50px;
    bottom: 50px;
    display: flex;
    width: 70px;
    height: 50px;
    box-shadow: 0px 0px 7px -2px rgb(123, 0, 189);
    &.left {
      left: 50px;
      right: unset;
    }
    &.right {
      right: 50px;
      left: unset;
    }
  }
</style>

