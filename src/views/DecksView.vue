<script lang="ts">
  import { type Card, type Deck } from '../models/decks.model';
  import DeckTileComponent from '@/components/decks/DeckTileComponent.vue';
  import ModifyDeckComponent from '@/components/decks/ModifyDeckComponent.vue';
import { decksRepository } from '@/stores/storage';

  export default {
    data() {
      let decks: Deck[] = [];
      return {
        addDeckDialog: false,
        decks: decks,
        editDecks: false,
        fetchDeckError: false
      };
    },
    methods: {
      updateDeck(newDeck: Deck, deck: Deck) {
        if(newDeck == null) {
          const index = this.decks.indexOf(deck);
          this.decks.splice(index, 1);
        } else {
          deck.name = newDeck.name;
          deck.cards = newDeck.cards;
        }

        decksRepository.saveDecks(this.decks);
      },
      addDeckInit() {
        this.addDeckDialog = true;
        if(this.isLastDeckEmpty()) {
          this.decks.push({ name: 'New Deck', cards: [{} as Card]} as Deck);
        }
      },
      isLastDeckEmpty(): Boolean {
        return this.decks.length == 0 || !!this.decks[this.decks.length - 1].cards[0].question;
      }
    },
    mounted() {
      const fetchedDecks = decksRepository.fetchDecks();
      if(fetchedDecks === undefined) {
        this.decks = [];
      } else if(!fetchedDecks) {
        this.fetchDeckError = true;
      } else {
        this.decks = fetchedDecks;
      }
    },
    components: { DeckTileComponent, ModifyDeckComponent }
}

</script>

<template>
  <div class="decks">
    <v-dialog
      v-model="fetchDeckError"
      >
      <v-card class="error-card">
        <h3>Error in fetching decks. Would you like to create a new deck?</h3>
        <v-btn variant="tonal" color="green" @Click="decks = [] ; fetchDeckError=false">Yes</v-btn>
      </v-card>
    </v-dialog>

    <DeckTileComponent 
      class="deck-tile" v-bind:key="i" 
      v-for="(deck, i) in decks" 
      @update:deck="tempDeck => updateDeck(tempDeck, deck)" 
      :deck="deck">
    </DeckTileComponent>

    <ModifyDeckComponent 
      class="add-deck" v-if="addDeckDialog" 
      v-model="addDeckDialog" 
      @update:deck="tempDeck => updateDeck(tempDeck, decks[decks.length-1])" 
      :deck="decks[decks.length-1]">
    </ModifyDeckComponent>

    <v-btn class="add-deck-btn" color="primary" :variant="'tonal'" @Click="addDeckInit()">Add</v-btn>
  </div>
</template>

<style lang="scss" scoped>
  .error-card {
    h3 {
      margin-bottom: 20px;
    }
    padding: 20px;
    color: red;
  }
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
  .add-deck-btn {
    position: fixed;
    left: 50px;
    bottom: 50px;
    display: flex;
    width: 70px;
    height: 50px;
    box-shadow: 0px 0px 7px -2px rgb(123, 0, 189);
    right: 50px;
    left: unset;
  }
</style>

