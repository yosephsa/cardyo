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
    <v-btn class="button" @Click="addDeckInit()">+
        <v-dialog
            v-model="dialog"
            activator="parent"
            class="dialog-modal"
            >
            <v-card class="card">
                {{ deck }}
                <ModifyDeckComponent v-model="deck"></ModifyDeckComponent>
            </v-card>
            
        </v-dialog>
    </v-btn>

</template>

<style scoped>
    .button {
        background: hsla(160, 100%, 37%, 1);
    }
</style>