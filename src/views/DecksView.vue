<script lang="ts">
  import { type Card, type Deck } from '../models/decks.model';
  import DeckTileComponent from '@/components/decks/DeckTileComponent.vue';
  import ModifyDeckComponent from '@/components/decks/ModifyDeckComponent.vue';
import { decksRepository } from '@/stores/storage';
import ContextMenu from '@imengyu/vue3-context-menu'

  export default {
    data() {
      let decks: Deck[] = [];
      return {
        addDeckDialog: false,
        decks: decks,
        editDecks: false,
        fetchDeckError: false,
        importDialog: false,
        importFile: null as unknown as File[]
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
      exportDecks() {
        const exportUri = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.decks));
        let dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem?.setAttribute("href", exportUri);
        dlAnchorElem?.setAttribute("download", "cardyoDecks.json");
        dlAnchorElem?.click();
      },
      onImportDecks() {
        this.importFile[0].text().then((value: string) => {
          try {
            const newDecks: Deck[] = JSON.parse(value);
            this.decks = this.decks.concat(newDecks);
            decksRepository.saveDecks(this.decks);
          } catch(e) {
            this.fetchDeckError = true;
            console.error('Failed to import decks', e);
          }

          this.importDialog = false;
        });
      },
      onAddContextMenu(e : MouseEvent) {
          e.preventDefault();

        ContextMenu.showContextMenu({x: e.x, y: e.y, items: [
            {
              label: "Import", 
              onClick: () => { 
                this.importDialog = true;
              }
            },
            { 
              label: "Export", 
              onClick: () => { 
                this.exportDecks();
              }
            }
          ]
        }); 
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

    <v-dialog
      v-model="importDialog"
      >
      <v-card class="import-card">
        <h2>Import decks</h2>
        <v-file-input v-model="importFile" label="File input"></v-file-input>
        <v-btn variant="tonal" color="green" @Click="onImportDecks()" >Import</v-btn>
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

    <v-btn class="add-deck-btn" 
      color="primary" 
      :variant="'tonal'" 
      @contextmenu="onAddContextMenu($event)"
      @Click="addDeckInit()" 
      > Add 
    </v-btn>

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
.import-card {
  h2 {
    margin-bottom: 20px;
  }
  padding: 20px;
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

