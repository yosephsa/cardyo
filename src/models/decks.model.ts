export type Deck = {
    name: string;
    cards: Card[];
}

export type Card = {
    question: string;
    answer: string;
    thirdSideType?: ThirdSideTypes;
    thirdSideAnswer?: string;
}

export enum ThirdSideTypes {
    AUDIO = 'AUDIO',
    VIDEO = 'VIDEO',
    IMAGE = 'IMAGE',
    NONE = 'NONE'
}