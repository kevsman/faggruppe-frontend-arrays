import styled from 'styled-components';
import { Suit } from '../../types/types';

export const CardWrapper = styled.div`

`;

type PlayingCardType = {
    suit: Suit
}

export const Wrapper = styled.div`
`;


export const PlayingCard = styled.span<PlayingCardType>`
    font-size: 5.5rem;
    ${props => props.suit === 'club' ? 'color: black' : ''}
    ${props => props.suit === 'diamond' ? 'color: red' : ''}
    ${props => props.suit === 'heart' ? 'color: red' : ''}
    ${props => props.suit === 'spade' ? 'color: black' : ''}
`;