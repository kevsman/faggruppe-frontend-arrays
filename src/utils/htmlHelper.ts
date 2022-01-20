import { Card } from "../types/types";

export const getHtmlCode = (card: Card) => {
    if (card.value === 2) {
        if (card.suit === 'club') return '&#127186;';
        if (card.suit === 'diamond') return '&#127170;';
        if (card.suit === 'heart') return '&#127154;';
        if (card.suit === 'spade') return '&#127138;';
    }
    if (card.value === 3) {
        if (card.suit === 'club') return '&#127187;';
        if (card.suit === 'diamond') return '&#127171;';
        if (card.suit === 'heart') return '&#127155;';
        if (card.suit === 'spade') return '&#127139;';
    }
    if (card.value === 4) {
        if (card.suit === 'club') return '&#127188;';
        if (card.suit === 'diamond') return '&#127172;';
        if (card.suit === 'heart') return '&#127156;';
        if (card.suit === 'spade') return '&#127140;';
    }
    if (card.value === 5) {
        if (card.suit === 'club') return '&#127189;';
        if (card.suit === 'diamond') return '&#127173;';
        if (card.suit === 'heart') return '&#127157;';
        if (card.suit === 'spade') return '&#127141;';
    }
    if (card.value === 6) {
        if (card.suit === 'club') return '&#127190;';
        if (card.suit === 'diamond') return '&#127174;';
        if (card.suit === 'heart') return '&#127158;';
        if (card.suit === 'spade') return '&#127142;';
    }
    if (card.value === 7) {
        if (card.suit === 'club') return '&#127191;';
        if (card.suit === 'diamond') return '&#127175;';
        if (card.suit === 'heart') return '&#127159;';
        if (card.suit === 'spade') return '&#127143;';
    }
    if (card.value === 8) {
        if (card.suit === 'club') return '&#127192;';
        if (card.suit === 'diamond') return '&#127176;';
        if (card.suit === 'heart') return '&#127160;';
        if (card.suit === 'spade') return '&#127144;';
    }
    if (card.value === 9) {
        if (card.suit === 'club') return '&#127193;';
        if (card.suit === 'diamond') return '&#127177;';
        if (card.suit === 'heart') return '&#127161;';
        if (card.suit === 'spade') return '&#127145;';
    }
    if (card.value === 10) {
        if (card.suit === 'club') return '&#127194;';
        if (card.suit === 'diamond') return '&#127178;';
        if (card.suit === 'heart') return '&#127162;';
        if (card.suit === 'spade') return '&#127146;';
    }
    if (card.value === 11) {
        if (card.suit === 'club') return '&#127195;';
        if (card.suit === 'diamond') return '&#127179;';
        if (card.suit === 'heart') return '&#127163;';
        if (card.suit === 'spade') return '&#127147;';
    }
    if (card.value === 12) {
        if (card.suit === 'club') return '&#127197;';
        if (card.suit === 'diamond') return '&#127181;';
        if (card.suit === 'heart') return '&#127165;';
        if (card.suit === 'spade') return '&#127149;';
    }
    if (card.value === 13) {
        if (card.suit === 'club') return '&#127198;';
        if (card.suit === 'diamond') return '&#127182;';
        if (card.suit === 'heart') return '&#127166;';
        if (card.suit === 'spade') return '&#127150;';
    }
    if (card.value === 14) {
        if (card.suit === 'club') return '&#127185;';
        if (card.suit === 'diamond') return '&#127169;';
        if (card.suit === 'heart') return '&#127153;';
        if (card.suit === 'spade') return '&#127137;';
    }
}
