import { Card } from "../../types/types";
import { getHtmlCode } from "../../utils/htmlHelper";
import { PlayingCard, Wrapper } from "./Card.style";

type Props = {
    card: Card
}

const CardComponent: React.FC<Props> = ({ card }) => {
    if (!card?.value) return <></>;
    return (
        <Wrapper key={`${card.value}_${card.suit}`}>
            <PlayingCard className={'card'} dangerouslySetInnerHTML={{ __html: getHtmlCode(card)! }} suit={card.suit}></PlayingCard>
        </Wrapper>
    );
}

export default CardComponent;