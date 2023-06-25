export class Deck {
    name!: string;
    cards!: Card[];
}

export class Card {
    question!: string;
    answer!: string;
    thirdSideType?: ThirdSideTypes;
    thirdSideAnswer?: string;
}

export enum ThirdSideTypes {
    AUDIO,
    VIDEO,
    IMAGE
}