import { useState, useEffect } from 'react';
import '../css/card.css';
import backImg from '../assets/back.svg'
import bat from '../assets/bat.svg';
import cat from '../assets/cat.svg';
import crow from '../assets/crow.svg';
import rat from '../assets/rat.svg';
import snake from '../assets/snake.svg';

interface CardProps {
    id: number;
    name: string;
    image: string;
    handleSelection: (id: number, isSelected: true | false) => void;
    isMatched: true | false;
    isSelected: true | false;
}

const Card = (card: CardProps) => {
    const [cardClass, setCardClass] = useState<string>('')

    function handleCardClick(id: number, isSelected: true | false) { 
        //set card class based on isSelected
        if (isSelected) {
            setCardClass('card')
        } else {
            setCardClass('card selected') 
        }

        //send up id and isSelected
        card.handleSelection(id, isSelected)
    }

    function formattedImg(name: string) {
        let cardImg = name.toLowerCase();

        switch (cardImg) {
            case 'bat':
                return <img src={bat} alt={`${card.name}-card-graphic`} width="100%" height="100%" />
                break;
            case 'cat':
                return <img src={cat} alt={`${card.name}-card-graphic`} width="100%" height="100%" />
                break;
            case 'crow':
                return <img src={crow} alt={`${card.name}-card-graphic`} width="100%" height="100%" />
                break;
            case 'snake':
                return <img src={snake} alt={`${card.name}-card-graphic`} width="100%" height="100%" />
                break;
            case 'rat':
                return <img src={rat} alt={`${card.name}-card-graphic`} width="100%" height="100%" />
                break;
        }
    }

    useEffect(() => {
        //when change to isSelected, check that selected removed if matched or no longer selected
        if (card.isSelected && card.isMatched) {
            setCardClass('card')
        }

        if (!card.isSelected) {
            setCardClass('card')
        }
    }, [card.isSelected])

    return (
        <div 
            className={cardClass}
            onClick={() => handleCardClick(card.id, card.isSelected)}
        >
            {cardClass.includes('selected') || card.isMatched ? (
                <div className='card-image'>
                    <div className="image front">
                        {formattedImg(card.name)}
                    </div>
                </div>
            )
            : 
            (
                <div className='card-image'>
                    <div className="image back">
                        <img src={backImg} alt="back of memory card" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;