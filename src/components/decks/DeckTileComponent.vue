<script lang="ts">
import { type Deck } from '@/models/decks.model';
import type { PropType } from 'vue/dist/vue.js';
import ModifyDeckComponent from './ModifyDeckComponent.vue'
import ViewDeckComponent from './ViewDeckComponent.vue';
import ContextMenu from '@imengyu/vue3-context-menu'

export default {
    props: {
        deck: Object as PropType<Deck>,
    },
    data() {
        return {
            viewDialog: false,
            editDialog: false
        }
    },
    emits: ['update:deck'],
    methods: {
        onContextMenu(e : MouseEvent) {
            e.preventDefault();

            ContextMenu.showContextMenu({x: e.x, y: e.y, items: [
                { 
                    label: "View", 
                    onClick: () => { 
                        this.viewDialog = true; 
                    }
                },
                { 
                    label: "Edit", 
                    onClick: () => { 
                        this.editDialog = true;
                    }
                },
                { 
                    label: "Delete", 
                    onClick: () => { 
                        this.$emit('update:deck', null);
                    }
                },
            ]
            }); 
        }
    },
    components: { ModifyDeckComponent, ViewDeckComponent }
}
</script>

<template>
<v-btn v-if="deck"
    color="primary"
    variant="outlined"
    @Click="viewDialog = true"
    @contextmenu="onContextMenu($event)"
    >
    <span>&nbsp;{{ deck?.name }} </span>

    <ViewDeckComponent v-if="viewDialog" :deck="deck" v-model="viewDialog"></ViewDeckComponent>
    <ModifyDeckComponent v-if="editDialog" @update:deck="tempDeck => $emit('update:deck', tempDeck)" :deck="deck" v-model="editDialog"></ModifyDeckComponent>
</v-btn>

</template>