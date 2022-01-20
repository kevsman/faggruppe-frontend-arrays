import { Player, PlayerAction } from "../types/types";

export const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const getMaxBet = (players: Player[]) => {
    return players.reduce((max, player) => player.playerAction !== PlayerAction.fold && player.betAmount > max ? player.betAmount : max, 0);
}