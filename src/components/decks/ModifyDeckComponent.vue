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
    <div class="card-wrapper" v-for="card in modelValue?.cards">
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
    </div>

    <v-btn color="primary" @Click="modelValue?.cards.push({} as Card)">Add Card</v-btn>
    
</template>

<style lang="scss">
    .card-wrapper {
        background-color: hsla(160, 100%, 37%, 0.036);
        margin: 40px;
    }
</style>