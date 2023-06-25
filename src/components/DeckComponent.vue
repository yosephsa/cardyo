<script lang="ts">
import { Deck } from '@/models/decks.model';

    export default {
        props: {
            deck: Deck
        },
        data() {
            return {
                deck: this.$props.deck,
                dialog: false,
                showAnswer: false
            }
        }
    }
</script>

<template>

<v-btn v-if="deck"
      color="primary"
    >
    {{ deck.name }}

    <v-dialog
    v-model="dialog"
    activator="parent"
    class="dialog-modal"
    >
        <v-card>
            <v-carousel v-on:update:model-value="showAnswer = false;">
                <v-carousel-item v-for="card in deck.cards" cover>
                    <div class="card-wrapper">
                        <h1 class="question">{{ card.question }}</h1>
                        <div class="answer-wrapper">
                            <button class="answer-cloak" v-if="!showAnswer" v-on:click="showAnswer = true">Show Answer</button>
                            <h3 class="answer" v-bind:class="{'hide': !showAnswer}"> {{ card.answer }}</h3>
                        </div>
                    </div>
                </v-carousel-item>
            </v-carousel>
            <v-card-actions>
                <v-btn color="primary" block @click="dialog = false"> Close Deck </v-btn>
            </v-card-actions>            
        </v-card>
    </v-dialog>
</v-btn>

</template>

<style lang="scss" scoped>
    .dialog-modal {
        width: 90%;
        max-width: 700px;
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