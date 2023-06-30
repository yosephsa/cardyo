<script lang="ts">
import { type Deck } from '@/models/decks.model';
import type { PropType } from 'vue/dist/vue.js';
import ModifyDeckComponent from './ModifyDeckComponent.vue'
import ViewDeckComponent from './ViewDeckComponent.vue';


    export default {
        props: {
            deck: Object as PropType<Deck>,
            editMode: Boolean,
            deleteMode: Boolean
        },
        data() {
            return {
                deck: this.$props.deck,
                dialog: false,
                showAnswer: false
            }
        },
        emits: ['update:editMode'],
        computed: {
            isDeleteMode(): Boolean {
                return !this.editMode && this.deleteMode;
            },
            editMode: {
                    get(): Boolean {
                        return this.editMode
                    },
                    set(editMode: Boolean) {
                        this.$emit('update:editMode', editMode)
                    }
                }
        },
        components: { ModifyDeckComponent, ViewDeckComponent }
    }
</script>

<template>

<v-btn v-if="deck"
      color="primary"
      :variant="editMode ? 'outlined' : 'flat'"
      @Click="dialog = true; editMode = false"
    >
    <v-icon v-if="editMode" icon="mdi-pencil"></v-icon>
    <v-icon v-if="isDeleteMode" icon="mdi-pencil"></v-icon>
    <span>&nbsp;{{ deck.name }} </span>

    <ViewDeckComponent v-if="!editMode" :deck="deck" v-model:dialog="dialog"></ViewDeckComponent>
    <ModifyDeckComponent v-if="editMode" v-model:deck="deck" v-model:dialog="dialog"></ModifyDeckComponent>
</v-btn>

</template>