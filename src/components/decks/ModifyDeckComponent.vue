<script lang="ts">
import { ThirdSideTypes, type Card } from '@/models/decks.model';
import { type Deck } from '../../models/decks.model'
import type { PropType } from 'vue/dist/vue.js';

export default {
    props: {
        deck: Object as PropType<Deck>,
        modelValue: Boolean
    },
    data() {
        return { 
            ThirdSideTypes: ThirdSideTypes,
            tempDeck: undefined as unknown as Deck
        }
    },
    computed: {
        dialog: {
            get(): boolean {
                return this.$props.modelValue
            },
            set(value: boolean) {
                this.$emit('update:modelValue', value)
            }
        }
    },
    mounted() {
        this.tempDeck = JSON.parse(JSON.stringify(this.$props.deck)) as Deck
    },
    emits: ['update:deck', 'update:modelValue'],
}
</script>

<template>
    <v-dialog
            v-model="dialog"
            class="dialog-modal"
            color="secondary"
            v-if="tempDeck"
            >
        <v-card class="card-wrapper">
            <div class="title-wrapper">
                <v-text-field label="Title" v-model="tempDeck.name"></v-text-field>
            </div>
            <v-card-item class="card-item-wrapper" v-bind:key="i" v-for="(card, i) in tempDeck.cards">
                <v-text-field class="compact" label="Question" v-model="card.question"></v-text-field>
                <v-text-field class="compact" label="Answer"  v-model="card.answer"></v-text-field>
                <v-radio-group class="compact" inline v-model="card.thirdSideType" label="Radio group label">
                        <v-radio v-bind:key="j" v-for="(constO, option, j) in ThirdSideTypes" v-bind:label="option" v-bind:value="option" ></v-radio>
                </v-radio-group>
                <v-text-field
                    class="compact"
                    v-if="card.thirdSideType && card.thirdSideType !== ThirdSideTypes.NONE"
                    v-bind:label="'Enter link to ' + card.thirdSideType.toString().toLocaleLowerCase()"
                    v-model="card.thirdSideAnswer"
                ></v-text-field>
            </v-card-item>
            <v-card class="buttons-wrapper">
                <v-btn class="btn" color="primary" :variant="'outlined'" @Click="$emit('update:deck', tempDeck); dialog = false">Save</v-btn>
                <v-btn class="btn" color="primary" :variant="'tonal'" @Click="tempDeck.cards.push({} as Card)">Add Card</v-btn>
            </v-card>
        </v-card>
    </v-dialog>
</template>

<style lang="scss" scoped>
    .dialog-modal {
        width: 90%;
        max-width: 700px;
        max-height: 80vh;
    }
    .card-wrapper {
        padding: 40px 0;
        position: relative;
        padding-top: 0;
    }
    .card-item-wrapper {
        margin: 0 40px;
    }
    .title-wrapper {
        display: flex;
        padding-bottom: 10px;
        width: 100%;
    }
    .buttons-wrapper {
        display: flex;
        position: fixed;
        bottom: 0;
        box-shadow: 0 -3px 3px rgba(64, 64, 64, 0.4);
        width: 100%;
        .btn {
            flex-grow: 1;
            border-radius: 0;
            margin: 5px;
        }
    }
</style>