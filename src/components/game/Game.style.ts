import styled from 'styled-components';
import { PlayerAction } from '../../types/types';

export const Wrapper = styled.div``;

type PlayerType = {
    playerAction: PlayerAction
}
export const PlayerWrapper = styled.div<PlayerType>`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0 1rem;

    ${props => props.playerAction === PlayerAction.fold ? `
        color: grey !important;
        .card {
            color: grey !important;
        }
    ` : ''}
`;

export const HandWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const TableWrapper = styled.div`
    display: flex;
`;

export const PlayerOuterWrapper = styled.div`
        display: flex;
`;