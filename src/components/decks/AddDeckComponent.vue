<script lang="ts">
    import { type Card, type Deck } from '@/models/decks.model';
    import ModifyDeckComponent from './ModifyDeckComponent.vue'

    export default {
        data() {
            return {
                dialog: false,
                deck: {} as Deck
            }
        },
        methods: {
            addDeckInit() {
                this.deck = {} as Deck;
                this.deck.name = '';
                this.deck.cards = [] as Card[];
                this.deck.cards.push({} as Card);
                // Initialize new deck
                
                console.log(typeof this.deck);
            }
        },
        watch:{
            dialog:function(newValue, old){
                if(!newValue && old){
                    // TODO: save new deck to deck array
                }
            }
        },
        components: { ModifyDeckComponent }
                    
    }
</script>

<template>
    <v-btn :variant="'tonal'" color="primary" class="button" @Click="addDeckInit()">
        Add
        <v-dialog
            v-model="dialog"
            activator="parent"
            class="dialog-modal"
            color="secondary"
            >
            <ModifyDeckComponent v-model="deck"></ModifyDeckComponent>
            
        </v-dialog>
    </v-btn>

</template>

<style scoped>
    .dialog-modal {
        max-width: 700px;
        max-height: 90vh;
    }
    .button {
        display: flex;
        width: 70px;
        height: 50px;
        box-shadow: 0px 0px 7px -2px rgb(123, 0, 189);
    }
</style>