import { Suit, Card, Hand, Player } from "../types/types";
import { getRandomNumber } from "./utils";

export const generateCards = (suit: Suit) => {
    let cards: Card[] = [];
    for (let i = 2; i <= 14; i++) {
        cards.push({ value: i, suit });
    }
    return cards;
}

export const initializeDeck = () => {
    const spades = generateCards('spade');
    const clubs = generateCards('club');
    const hearts = generateCards('heart');
    const diamonds = generateCards('diamond');

    const cards = spades.concat(clubs).concat(hearts).concat(diamonds);
    return cards;
}

export const dealHand = (cards: Card[]) => {
    const first = drawCard(cards);
    const second = drawCard(cards);

    const hand: Hand = { cards: [first, second] };
    return hand;
}

export const drawCard = (cards: Card[]) => {

    /**
     * Oppgave 9
     * - For å sikre oss mot juksemakere kan vi trekke kort fra en tilfeldig
     *   plass i kortstokken.
     * - Trekk et tilfeldig kort istedenfor det øverste kortet
     * - Hint: For å generere et tilfeldig nummer kall getRandomNumber(0, cards.length - 1);
     */
    const card = cards[0];

    return card;
}

export const setPlayerBlinds = (players: Player[], dealerPosition: number) => {
    const bigBlind = 100;
    const smallBlind = bigBlind / 2;

    players.forEach((p, i) => {
        if (i === dealerPosition) {
            p.betAmount = bigBlind;

            if (dealerPosition === 0) {
                players[players.length - 1].betAmount = smallBlind;
                return;
            } else {
                players[i - 1].betAmount = smallBlind;
                return;
            }
        }
    });
}

export const initializeTable = (cards: Card[]) => {
    return [
        drawCard(cards),
        drawCard(cards),
        drawCard(cards),
    ];
}