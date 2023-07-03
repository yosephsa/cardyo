<script lang="ts">
import type { Deck } from '@/models/decks.model';
import type { PropType } from 'vue';

    export default {
        props: {
            deck: Object as PropType<Deck>,
            modelValue: Boolean
        },
        data() {
            return {
                showAnswer: false
            }
        },
        computed: {
            dialog: {
                get(): boolean { return this.modelValue },
                set(dialog: boolean) { this.$emit('update:modelValue', dialog) }
            }
        },
        emits: ['update:modelValue']
    }
</script>

<template>
    <v-dialog
    v-model="dialog"
    class="dialog-modal"
    >
        <v-card>
            <v-carousel v-on:update:model-value="showAnswer = false;" hide-delimiters>
                <v-carousel-item v-bind:key="i" v-for="(card, i) in deck?.cards" cover>
                    <div class="card-wrapper">
                        <h2 class="question">{{ card.question }}</h2>
                        <div class="answer-wrapper">
                            <button class="answer-cloak" v-if="!showAnswer" v-on:click="showAnswer = true">Show Answer</button>
                            <h3 class="answer" v-bind:class="{'hide': !showAnswer}"> {{ card.answer }}</h3>
                        </div>
                    </div>
                </v-carousel-item>
            </v-carousel>
            <v-card-actions>
                <v-btn color="primary" block @Click="dialog = false"> Close Deck </v-btn>
            </v-card-actions>            
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
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        height: calc(100% - 50px);
        z-index: 1;

        .question {
            padding: 20px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            width: 100%;
            text-align: center;
        }
        .answer-wrapper {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            .answer {
                margin: auto;

                &.hide {
                    text-shadow: 0 0 20px #000;
                    color: transparent;
                }
            }
            .answer-cloak {
                position: absolute;
                width: 100%;
                height: 100%;
            }
            
        }
        .show-answer-btn {
            background: transparent;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, 100%);
            z-index: 2;
        }
    }
</style>