<script lang="ts">
import { ThirdSideTypes, type Card } from '@/models/decks.model';
import { type Deck } from '../../models/decks.model'
import type { PropType } from 'vue/dist/vue.js';

export default {
    props: {
        modelValue: Object as PropType<Deck>
    },
    data() {
        return { 
            ThirdSideTypes: ThirdSideTypes
        }
    },
    emits: ['update:modelValue']
}
</script>

<template>
    <v-card class="card-wrapper">
        <v-card-item class="card-item-wrapper" v-for="card in modelValue?.cards">
            <v-text-field class="compact" label="Question" v-model="card.question"></v-text-field>
            <v-text-field class="compact" label="Answer"  v-model="card.answer"></v-text-field>
            <v-radio-group class="compact" inline v-model="card.thirdSideType" label="Radio group label">
                    <v-radio v-for="option in ThirdSideTypes" v-bind:label="option.toString()" v-bind:value="option.toString()" ></v-radio>
            </v-radio-group>
            <v-text-field
                class="compact"
                v-if="card.thirdSideType && card.thirdSideType !== ThirdSideTypes.NONE"
                v-bind:label="'Enter link to ' + card.thirdSideType.toString().toLocaleLowerCase()"
                v-model="card.thirdSideAnswer"
            ></v-text-field>
        </v-card-item>

        <v-card class="buttons-wrapper">
            <v-btn class="btn" color="primary" :variant="'outlined'" @Click="modelValue?.cards.push({} as Card)">Save</v-btn>
            <v-btn class="btn" color="primary" :variant="'tonal'" @Click="modelValue?.cards.push({} as Card)">Add Card</v-btn>
        </v-card>
    </v-card>
    
    
    
</template>

<style lang="scss">
    .card-wrapper {
        padding: 40px 0;
    }
    .card-item-wrapper {
        margin: 0 40px;
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