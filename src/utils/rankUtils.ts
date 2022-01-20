import { Card, Player, Rank } from "../types/types";

export const setPlayerRanks = (players: Player[], table: Card[]) => {
    players.forEach(player => player.rank = getRank(player.hand.cards.concat(table)));
    return players;
}

const getValueOfCards = (cards: Card[]) => {
    /**
     * Oppgave 7
     * - Finn verdien av kortene en spiller har på hånden.
     * - Verdien er lik summen av kort-verdi for de 5 kortene med høyest verdi. 
     * - Antall kort kan være 5-7, vi må derfor hente ut de 5 kortene med høyest verdi og summere.
     * - Hint: Dette kan gjøres med 1 kodelinje og 3 array funksjoner
     */
    return cards.sort((a, b) => a.value - b.value).slice(0, 5).reduce((value, card) => value += card.value, 0);
}

const getRank = (cards: Card[]): Rank => {
    const isFlush = hasFlush(cards);
    const isStraight = hasStraight(cards);

    if (isFlush && isStraight) {
        return { type: { type: 'straight flush', position: 1 }, value: getValueOfCards(isFlush), cards: isFlush };
    }
    const isFourOfAKind = hasFourOfAKind(cards);
    if (isFourOfAKind) {
        return { type: { type: 'four of a kind', position: 2 }, value: getValueOfCards(isFourOfAKind), cards: isFourOfAKind };
    }

    const isFullHouse = hasFullHouse(cards);
    if (isFullHouse) {
        return { type: { type: 'full house', position: 3 }, value: getValueOfCards(isFullHouse), cards: isFullHouse };
    }
    if (isFlush) {
        return { type: { type: 'flush', position: 4 }, value: getValueOfCards(isFlush), cards: isFlush };
    }
    if (isStraight) {
        return { type: { type: 'straight', position: 5 }, value: getValueOfCards(isStraight), cards: isStraight };
    }

    const isThreeOfAKind = hasThreeOfAKind(cards);
    if (isThreeOfAKind) {
        return { type: { type: 'three of a kind', position: 6 }, value: getValueOfCards(isThreeOfAKind), cards: isThreeOfAKind };
    }

    const isTwoPairs = hasTwoPairs(cards);
    if (isTwoPairs) {
        return { type: { type: 'two pairs', position: 7 }, value: getValueOfCards(isTwoPairs), cards: isTwoPairs };
    }

    const isPair = hasPair(cards);
    if (isPair) {
        return { type: { type: 'one pair', position: 8 }, value: getValueOfCards(isPair), cards: isPair };
    }

    const filteredCards = cards.sort((a, b) => b.value - a.value).slice(0, 5);
    return { type: { type: 'high card', position: 9 }, value: getValueOfCards(filteredCards), cards: filteredCards };
}

const hasPair = (cards: Card[]) => {
    const numbers = getNumberOccurences(cards);
    let highestTwos = 0;
    Object.keys(numbers).forEach(key => {
        if (numbers[key] >= 2) {
            if (highestTwos < +key) {
                highestTwos = +key;
            }
        }
    });

    if (highestTwos > 0) {
        const filteredCards = cards.filter(x => x.value === highestTwos).slice(0, 2);
        return filteredCards.concat(cards.filter(x => x.value !== highestTwos).sort((a, b) => b.value - a.value).slice(0, 3));
    }
}

const hasTwoPairs = (cards: Card[]) => {
    const numbers = getNumberOccurences(cards);
    let number1 = 0;
    let number2 = 0;
    Object.keys(numbers).forEach(key => {
        if (numbers[key] >= 2) {
            if (number1 < +key) {
                number1 = +key;
            }
        }
    });

    const filteredNumber = getNumberOccurences(cards.filter(x => x.value !== number1));
    Object.keys(filteredNumber).forEach(key => {
        if (filteredNumber[key] >= 2) {
            if (number2 < +key) {
                number2 = +key;
            }
        }
    });

    if (number1 > 0 && number2 > 0) {
        const number1s = cards.filter(x => x.value === number1).slice(0, 2);
        const number2s = cards.filter(x => x.value === number2).slice(0, 2);
        const lastCard = cards.filter(x => x.value !== number1 && x.value !== number2).sort((a, b) => a.value - b.value).pop();
        number2s.push(lastCard!)
        return number1s.concat(number2s);
    }

}

const hasThreeOfAKind = (cards: Card[]) => {
    const numbers = getNumberOccurences(cards);

    let highestThrees = 0;
    Object.keys(numbers).forEach(key => {
        if (numbers[key] === 3) {
            if (highestThrees < +key) {
                highestThrees = +key;
            }
        }
    });

    if (highestThrees > 0) {
        return cards.filter(x => x.value === highestThrees).concat(cards.filter(x => x.value !== highestThrees).sort((a, b) => b.value - a.value).slice(0, 2));
    }

}

const hasFullHouse = (cards: Card[]) => {
    const numbers = getNumberOccurences(cards);

    let highestThrees = 0;

    Object.keys(numbers).forEach(key => {
        if (numbers[key] === 3) {
            if (highestThrees < +key) {
                highestThrees = +key;
            }
        }
    });

    let highestTwos = 0;
    if (highestThrees > 0) {
        const filteredNumbers = getNumberOccurences(cards.filter(x => x.value !== highestThrees));
        Object.keys(filteredNumbers).forEach(key => {
            if (filteredNumbers[key] >= 2) {
                if (highestTwos < +key) {
                    highestTwos = +key;
                }
            }
        });

        if (highestTwos > 0) {
            return cards.filter(x => x.value === highestThrees).concat(cards.filter(x => x.value === highestTwos).slice(0, 2));
        }
    }

}

const getNumberOccurences = (cards: Card[]) => {
    const numbers = cards.reduce((dict, card) => {
        dict[`${card.value}`] ? dict[`${card.value}`] = dict[`${card.value}`] + 1 : dict[`${card.value}`] = 1;
        return dict;
    }, {} as any);

    return numbers;
}

const hasFourOfAKind = (cards: Card[]) => {
    const numbers = getNumberOccurences(cards);

    let number: number | undefined = undefined;
    Object.keys(numbers).forEach(key => {
        if (numbers[key] === 4) {
            number = +key;
        }
    });

    if (number) {
        const filteredCards = cards.filter(x => x.value === number);
        filteredCards.push(cards.filter(x => x.value !== number).sort((a, b) => a.value - b.value).pop()!);
        return filteredCards;
    }
}

const hasFlush = (cards: Card[]) => {
    const spades = cards.filter(c => c.suit === 'spade').sort((a, b) => a.value - b.value);
    const clubs = cards.filter(c => c.suit === 'club').sort((a, b) => a.value - b.value);
    const diamonds = cards.filter(c => c.suit === 'diamond').sort((a, b) => a.value - b.value);
    const hearts = cards.filter(c => c.suit === 'heart').sort((a, b) => a.value - b.value);

    if (spades.length >= 5) return spades;
    if (clubs.length >= 5) return clubs;
    if (diamonds.length >= 5) return diamonds;
    if (hearts.length >= 5) return hearts;
}

const hasStraight = (cards: Card[]) => {
    const orderedCards = cards.sort((a, b) => a.value - b.value);
    const findSequence = (cards: Card[]) => {
        for (let i = cards.length - 1; i > 0; i--) {
            if (cards[i].value - cards[i - 1].value !== 1) {
                return;
            }
        }

        return cards;
    }


    if (orderedCards.length === 5) {
        return findSequence(orderedCards);
    }
    if (orderedCards.length === 6) {
        let sequence = findSequence(cards.slice(1, 6));
        if (!sequence) {
            sequence = findSequence(cards.slice(0, 5));
        }
        if (sequence) return sequence;
    }
    if (orderedCards.length === 7) {
        let sequence = findSequence(cards.slice(2, 7));
        if (!sequence) {
            sequence = findSequence(cards.slice(1, 6));
        }
        if (!sequence) {
            sequence = findSequence(cards.slice(0, 5));
        }
        if (sequence) return sequence;
    }
}