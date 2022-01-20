import { useEffect, useState } from "react";
import { Card, Game, Player, PlayerAction } from "../../types/types";
import { drawCard, initializeDeck, initializeTable, setPlayerBlinds } from "../../utils/cardUtils";
import { getDealerPosition } from "../../utils/gameUtils";
import { addPlayerActions, resetPlayer, getWinningPlayers } from "../../utils/playerUtils";
import { setPlayerRanks } from "../../utils/rankUtils";
import CardComponent from "../card/Card";
import { HandWrapper, PlayerOuterWrapper, PlayerWrapper, TableWrapper } from "./Game.style";

type Props = {
    players: Player[]
}

const GameComponent: React.FC<Props> = ({ players }) => {
    const [deck, setDeck] = useState<Card[]>([]);
    const [playersInGame, setPlayersInGame] = useState<Player[]>([]);
    const [game, setGame] = useState<Game>({ players: [], pot: 0 });
    const [dealerPosition, setDealerPosition] = useState(0);
    const [table, setTable] = useState<Card[]>([]);

    const initializePlayerHands = (deck: Card[]) => {
        /**
         * Oppgave 6
         * - Vi trenger 6 spillere
         * - Returner en ny liste med riktig antall spillere
         * - For hver nye spiller må vi resette spiller-verdier
         *      - Kall resetPlayer(player, deck)
         */
        const gamePlayers = players.slice(0, 6);
        gamePlayers.forEach(player => resetPlayer(player, deck));
        return gamePlayers;
    }

    const newGame = () => {
        const deck = initializeDeck();
        const playersInGame = initializePlayerHands(deck);
        const dealer = getDealerPosition(dealerPosition, playersInGame);
        setDealerPosition(dealer);
        setPlayerBlinds(playersInGame, dealer);

        const table = initializeTable(deck);
        setPlayerRanks(playersInGame, table); // Neste oppgave finner du her

        const game: Game = { players: playersInGame, pot: playersInGame.reduce((sum, player) => sum += player.betAmount, 0) };
        addPlayerActions(deck, playersInGame, dealer, game);

        setPlayersInGame([...playersInGame]);
        setGame({ ...game });
        setTable(table);
        setDeck([...deck]);
    }

    const getPlayersRemaining = () => {
        /**
         * Oppgave 8
         * - Finn antall gjennværende spillere
         * - Gjennværende spiller = player.playerAction !== PlayerAction.fold
         */
        return playersInGame.filter(x => x.playerAction !== PlayerAction.fold).length;
    }

    const addCardToTable = () => {
        const card = drawCard(deck);
        table.push(card);
        setTable([...table]);
        setPlayerRanks(players, table);
        addPlayerActions(deck, players, dealerPosition, game);
    }

    const isWinner = (player: Player) => {
        /**
         * Oppgave 10
         * - Sjekk om en spiller har vunnet
         * - Det holder å sjekke mot player.name 
         */
        const winners = getWinningPlayers(playersInGame);

        return winners.some(winner => winner.name === player.name);
    }

    const isGameDone = () => deck.length === 35 || getPlayersRemaining() === 1;

    const GetWinners = () => {
        const winners = getWinningPlayers(playersInGame);

        return winners.map((player, i) =>
            <span key={`winner_${player.name}_${i}`}>{player.name}|</span>)
    }

    useEffect(() => {
        newGame();
    }, []);

    return (
        <>
            <h4>Spill</h4>
            <div>
                {isGameDone() && <div>Winners {GetWinners()}</div>}
                <div>
                    {!isGameDone() && <button onClick={() => addCardToTable()}>Draw</button>}
                    {isGameDone() && <button onClick={() => newGame()}>New game</button>}
                </div>
                <PlayerOuterWrapper>
                    {game.players.map((player, i) =>
                        <div key={`${player.name}_${player.tablePosition}`}>
                            <PlayerWrapper playerAction={player.playerAction}>
                                <span>{player.name}{dealerPosition === i ? ' (D)' : ''} ${player.cash}</span>
                                <span>{player.rank?.type.type}</span>
                                <HandWrapper>
                                    {player.hand.cards.map((card, i) =>
                                        <CardComponent key={`hand_card_${i}`} card={card}></CardComponent>
                                    )}
                                </HandWrapper>
                                <HandWrapper>
                                    {isGameDone() && isWinner(player) && player.rank && player.rank.cards.map((card, i) =>
                                        <CardComponent key={`hand_card_${i}`} card={card}></CardComponent>
                                    )}
                                </HandWrapper>
                            </PlayerWrapper>
                        </div>
                    )}
                </PlayerOuterWrapper>
            </div>
            <div>
                <br />
                <TableWrapper>
                    {table.map((card, i) =>
                        <CardComponent key={`table_card_${i}`} card={card}></CardComponent>
                    )}
                    <span> Pot: {game.pot}</span>
                </TableWrapper>
            </div>
        </>
    );
}

export default GameComponent;
