import './App.css';

import Header from './components/Header';
import CardGrid from './components/CardGrid';
import CardObject from './models/card'

const allCardObjects: CardObject[] = [
  {
      name: 'Cat',
      image: 'cat.svg',
      matched: false,
      selected: false,
      id: 0,
  },
  {
      name: 'Bat',
      image: 'bat.svg',
      matched: false,
      selected: false,
      id: 0,
  },
  {
      name: 'Crow',
      image: 'crow.svg',
      matched: false,
      selected: false,
      id: 0,
  },
  {
    name: 'Rat',
    image: 'rat.svg',
    matched: false,
    selected: false,
    id: 0,
  },
  {
    name: 'Snake',
    image: 'snake.svg',
    matched: false,
    selected: false,
    id: 0,
  },
]

let availableCards: CardObject[] = JSON.parse(JSON.stringify([...allCardObjects.concat(allCardObjects)]));
for (let i = 0; i < availableCards.length; i++) {
  availableCards[i].id = i;
}

let randomCards: CardObject[] = availableCards.sort(() => Math.random() - 0.5);

const App = () => (
    <>
      <Header />
      <CardGrid randomCards={randomCards} />
    </>
)

export default App
