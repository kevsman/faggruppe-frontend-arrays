import { useEffect, useState } from "react";
import { Player, PlayerAction } from "../../types/types";
import { getRandomNumber } from "../../utils/utils";
import GameComponent from "../game/Game";
import StatsComponent from "../stats/Stats";
import { Wrapper } from "./Overview.style";

type Props = {

}

const initPlayers = () => {
    const players: Player[] = [];
    for (let i = 0; i < 20; i++) {
        const player: Player = {
            cash: getRandomNumber(100, 1000),
            name: `Player ${i + 1}`,
            isDealer: i === 0,
            tablePosition: i,
            hand: { cards: [] },
            betAmount: 0,
            betHistory: [],
            playerActionHistory: [],
            playerAction: PlayerAction.start
        }
        players.push(player);
    }

    return players;
}

const OverviewComponent: React.FC = (props) => {
    const [players, setPlayers] = useState<Player[]>(initPlayers());
    const [selectedView, setSelectedView] = useState<'game' | 'stats'>('stats');

    return (
        <>
            <Wrapper>
                <div>
                    <h3>Oversikt</h3>
                    <div>
                        <button onClick={() => setSelectedView('game')}>Spill</button>
                        <button onClick={() => setSelectedView('stats')}>Stats</button>
                    </div>
                </div>
                <div>
                    {selectedView === 'game' && <GameComponent players={players}></GameComponent>}
                    {selectedView === 'stats' && <StatsComponent players={players}></StatsComponent>}
                </div>
            </Wrapper>
        </>
    );
}

export default OverviewComponent;