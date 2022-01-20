import { Player } from "../types/types";

export const getDealerPosition = (dealerPosition: number, players: Player[]) => {
    return dealerPosition < players.length - 1 ? dealerPosition + 1 : 0;
}