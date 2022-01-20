export type Player = {
    isDealer: boolean,
    tablePosition: number,
    hand: Hand,
    cash: number,
    name: string,
    rank?: Rank
    betAmount: number,
    betHistory: number[],
    playerActionHistory: PlayerAction[],
    playerAction: PlayerAction
}

export enum PlayerAction {
    start = 0,
    fold = 1,
    check = 2,
    call = 3,
    raise = 4
}

export type Suit =
    'spade' | 'club' | 'heart' | 'diamond'

export type Card = {
    value: number,
    suit: Suit,
}

export type Deck = {
    cards: Card[]
}

export type Hand = {
    cards: Card[]
}

export type Game = {
    players: Player[],
    pot: number
}

export type RankType =
    { type: 'straight flush', position: 1 } |
    { type: 'four of a kind', position: 2 } |
    { type: 'full house', position: 3 } |
    { type: 'flush', position: 4 } |
    { type: 'straight', position: 5 } |
    { type: 'three of a kind', position: 6 } |
    { type: 'two pairs', position: 7 } |
    { type: 'one pair', position: 8 } |
    { type: 'high card', position: 9 }

export type Rank = {
    type: RankType,
    value: number,
    cards: Card[]
}