import { useState, useEffect } from 'react';
import '../css/card-grid.css';
import Card from './Card';
import CardObject from '../models/card';

interface CardGridProps {
    randomCards: CardObject[]
}

const CardGrid = ({ randomCards }: CardGridProps) => {
    const [selectedArray, setSelectedArray] = useState<typeof randomCards>([])
    const [matchedArray, setMatchedArray] = useState<typeof randomCards>([])
    const [overlayMessage, setOverlayMessage] = useState<string>('')
    const [showOverlay, setShowOverlay] = useState<true | false>(false)
    const [guessCount, setGuessCount] = useState<number>(0)

    useEffect(() => {   
        //if selectedArray has 2 cards     
        if (selectedArray.length === 2) {
            //compare same name, but not the same id (in case of double clicking)
            if (selectedArray[0].name === selectedArray[1].name && selectedArray[0].id !== selectedArray[1].id) {
                let tempCard = selectedArray[0].name;
                //remove selected array items from randomcards array, set as matched
                for (let i = 0; i < randomCards.length; i++) {
                    if (randomCards[i].name === tempCard) {
                        randomCards[i].matched = true;
                        randomCards[i].selected = false;
                    }
                }

                //add to matchedArray to track when all sets have been matched
                setMatchedArray([...matchedArray, selectedArray[0], selectedArray[1]])
                //reset selectedArray for new selections
                setSelectedArray([]);
            } else {
                //mini timeout to let card flip fully before overlay applied
                setTimeout(() => {
                    setShowOverlay(true)
                }, 200)
                setOverlayMessage('Sorry, not a match. Try again!')
                
                setTimeout(() => {
                    //reset all selected cards
                    for (let i = 0; i < randomCards.length; i++) {
                        if (randomCards[i].selected) {
                            randomCards[i].selected = false;
                        }
                    }
                    //reset selectedArray
                    setSelectedArray([]);
                    //remove overlay
                    setShowOverlay(false)
                }, 2000);
            }
        }
    }, [selectedArray])

    useEffect(() => {
        //if matched length is full
        if (matchedArray.length === randomCards.length) {
            //show overlay message
            setShowOverlay(true)
            setOverlayMessage(`You did it!! You won in ${guessCount} guesses.`)
            setTimeout(() => {
                setShowOverlay(false)
                //reset guessCount
                setGuessCount(0)
                //reset all cards
                for (let i = 0; i < randomCards.length; i++) {
                    if (randomCards[i].matched) {
                        randomCards[i].matched = false;
                    }
                }
                //reset matchedArray for next game
                setMatchedArray([])
            }, 5000);
        }
    }, [matchedArray])

    function handleSelection(id: number, isSelected: true | false) {
        //set card to selected/not-selected
        randomCards[id].selected = !isSelected
        //add guess to guessCount
        setGuessCount(guessCount + 1)

        //if selected array has less than 2 items
        if (selectedArray.length < 2) {
            //check if selected true
            if (randomCards[id].selected) {
                //if so, add card to selectedArray
                setSelectedArray([...selectedArray, randomCards[id]]);
            } else {
                //if card is not selected, remove from array
                setSelectedArray(selectedArray.filter(item => item.id === id))
            }
        }
    }
    
    return (<>
        {showOverlay && (
            <div className='overlay'>
                <div className='message'>
                    {overlayMessage}
                </div>
            </div>
        )}

        <div className="guess-count">
            Your guess count: {guessCount}
        </div>
        
        <div className={showOverlay ? 'card-grid not-matched' : 'card-grid'}>
            {randomCards?.map((card, index) => (
                <div 
                    className={card.matched ? 'card-container matched' : 'card-container'}
                    key={index}
                >
                    <Card
                        id={index}
                        name={card.name}
                        image={card.image}
                        handleSelection={handleSelection}
                        isMatched={card.matched}
                        isSelected={card.selected}
                    />
                </div>
            ))}
        </div>
    </>);
};

export default CardGrid;