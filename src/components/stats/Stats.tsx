import { ChangeEvent, useEffect, useState } from "react";
import { Player } from "../../types/types";
import { FilterWrapper } from "./Stats.style";

type Props = {
    players: Player[]
}

const StatsComponent: React.FC<Props> = ({ players }) => {
    const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
    const [topPlayer, setTopPlayer] = useState<Player>();
    const [searchKey, setSearchKey] = useState('');
    const [isSortedAsc, setIsSortedAsc] = useState(true);

    const getSortedPlayers = () => {
        /**
         * Oppgave 2:
         * - Sorter spillere etter hvor mye penger de har
         * - Husk å ta hensyn til stigende/synkende sortering
         */
        return filteredPlayers
    }

    const addTopPlayer = () => {
        /**
         * Oppgave 3:
         * - Finn spilleren med mest penger
         * - Skriv om fra for-løkke til reducer
         * - Her kan vi oppnå det samme med sort
         */

        let topPlayer = players[0];
        for (let i = 1; i < players.length; i++) {
            if (players[i].cash > topPlayer.cash) {
                topPlayer = players[i];
            }
        }

        setTopPlayer({ ...topPlayer });
    }

    const getCashSum = () => {
        /**
         * Oppgave 4:
         * - Finn sum av spillernes penger
         * - Skriv om fra for-løkke
         * - Det er flere måter å løse dette på, lag eksempler på to funksjoner
         */

        let sum = 0;
        for (let i = 1; i < players.length; i++) {
            sum += players[i].cash;
        }

        return sum;
    }

    const onSearchKeyChange = (event: ChangeEvent<HTMLInputElement>) => setSearchKey(event.target.value);


    const initStats = () => {
        addTopPlayer();
    }

    useEffect(() => {
        /**
         * Oppgave 5:
         * - Søk etter spillere
         * - Sjekk på spillernavn (player.name)
         */

        const filteredPlayers = players;
        setFilteredPlayers([...filteredPlayers]);
    }, [searchKey]);

    useEffect(() => {
        if (!players) return;
        initStats();
    }, [players]);

    return (
        <>
            <h4>Stats</h4>
            <div>
                <FilterWrapper>
                    <div>
                        <div>Penger i ompløp: <span>{getCashSum()}$</span></div>
                        <div>Beste spiller: {topPlayer && <span>{topPlayer.name} med {topPlayer.cash}$</span>}</div>
                        <div>Søk:<span><input onChange={(e) => onSearchKeyChange(e)}></input></span></div>
                    </div>
                    <div>
                        <button onClick={() => setIsSortedAsc(true)}>Sorter stigende</button>
                        <button onClick={() => setIsSortedAsc(false)}>Sorter synkende</button>
                    </div>
                </FilterWrapper>
                {getSortedPlayers().map((player, index) =>
                    <div key={player.name + index}>
                        <div>
                            <span>{player.name} {player.cash}$</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default StatsComponent;