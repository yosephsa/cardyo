import type { Deck } from "@/models/decks.model";

const decksKey = 'cardyo.decks'

export const decksRepository = {

    saveDecks(decks: Deck[]) {
        localStorage.setItem(decksKey, JSON.stringify(decks));
    },
    /**
     * @returns The decks array from local storage, or null for an error, or undefined for no decks in storage
     */
    fetchDecks(): Deck[] | null | undefined {
        try {
            const decksRaw = localStorage.getItem(decksKey);
            if(!decksRaw) {
                return undefined;
            }
            return JSON.parse(decksRaw);
        } catch (e) {
            console.error('failed fetching decks from local storage', e)
            return null;
        }
    }
}
