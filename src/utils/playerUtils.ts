import { Card, Game, Player, PlayerAction } from "../types/types";
import { dealHand } from "./cardUtils";
import { getMaxBet, getRandomNumber } from "./utils";

export const resetPlayer = (player: Player, deck: Card[]) => {
    const hand = dealHand(deck);
    player.hand = hand;
    player.betHistory = [];
    player.playerActionHistory = [];
    player.betAmount = 0;
    player.playerAction = PlayerAction.start;
    if (player.cash === 0) {
        player.cash = 100
    }
}

export const addPlayerActions = (deck: Card[], players: Player[], dealer: number, game: Game) => {
    let startIndex = dealer === players.length - 1 ? 0 : dealer + 1;
    let counter = 0
    while (counter !== players.length) {
        const player = players[startIndex];

        if (player.playerAction !== PlayerAction.fold) {
            const maxBet = getMaxBet(players);

            let actions: PlayerAction[] = [];
            if (maxBet > player.betAmount) {
                if (player.cash === 0) {
                    actions = [PlayerAction.check];
                } else {
                    actions = [PlayerAction.call, PlayerAction.fold, PlayerAction.raise];
                }
            }
            if (maxBet === player.betAmount) {
                actions = [PlayerAction.check, PlayerAction.raise];
            }

            const actionIndex = getRandomNumber(0, actions.length - 1);
            player.playerAction = actions[actionIndex];

            if (player.playerAction === PlayerAction.call) {
                const betAmount = getCallAmount(maxBet, player);
                player.betAmount += betAmount;
                player.cash -= betAmount;
                game.pot += betAmount;
                player.betHistory.push(betAmount);
            }
            if (player.playerAction === PlayerAction.raise) {
                const callAmount = getCallAmount(maxBet, player);
                const maxRaise = player.cash - callAmount;
                const bet = maxRaise < 0 ? 0 : getRandomNumber(0, maxRaise);
                const betAmount = callAmount + bet;
                player.betAmount = betAmount;
                player.cash -= player.betAmount;
                game.pot += betAmount;
                player.betHistory.push(betAmount);
            }
            player.playerActionHistory.push(player.playerAction);
        }

        counter++;
        startIndex = startIndex === players.length - 1 ? 0 : startIndex + 1;
    }

    if (players.some(x => x.playerAction === PlayerAction.raise)) {
        addPlayerActions(deck, players, dealer, game);
    } else {
        const remainingPlayers = players.filter(x => x.playerAction !== PlayerAction.fold);
        if (deck.length === 35 || remainingPlayers.length === 1) {
            const winners = getWinningPlayers(remainingPlayers);
            if (winners.length === 1) {
                winners[0].cash += game.pot;
            } else {
                let pot = game.pot;
                winners.forEach(winner => {
                    const winnerBet = winner.betHistory.reduce((sum, bet) => sum += bet, 0);
                    winner.cash += winnerBet;
                    pot -= winnerBet;
                });
                pot = pot / winners.length;
                winners.forEach(w => w.cash += pot);
            }
        }
        return;
    }
}

export const getWinningPlayers = (players: Player[], remainingPlayers: Player[] | undefined = undefined) => {
    if (!remainingPlayers) {
        remainingPlayers = players.filter(x => x.playerAction !== PlayerAction.fold);
    }
    const maxPosition = remainingPlayers.reduce((maxPosition, player) =>
        player.rank && player.rank.type.position < maxPosition ? player.rank.type.position : maxPosition
        , 100);

    const maxPlayers = remainingPlayers.filter(x => x.rank && x.rank.type.position === maxPosition);
    const maxValue = maxPlayers.reduce((maxValue, player) =>
        player.rank && player.rank.value > maxValue ? player.rank.value : maxValue
        , 0);

    const winners = maxPlayers.filter(x => x.rank && x.rank.value === maxValue);
    return winners;
}

const getCallAmount = (maxBet: number, player: Player) => {
    let betAmount = maxBet - player.betAmount
    if (betAmount > player.cash) {
        betAmount = player.cash;
    }
    return betAmount;
}