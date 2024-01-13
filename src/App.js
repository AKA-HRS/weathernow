import './App.css';
import React, { useState } from 'react';
import Card from './Components/Card.js';
function App() {
  const [text, setText] = useState("+");
  const [cards, setCards] = useState([]);

  const handelMouseOver = () => {
    setText("ADD City");
  };
  const handelMouseOut = () => {
    setText("+");
  };
  const handelClick = () => {
    setCards([...cards, { id: cards.length }]);
  };
  const removeCard = (cardId) => {
    setCards(cards.filter((card) => card.id !== cardId));
  };


  return (
    <div className="App">
      {cards.length ? (
        cards.map((card) => (
          <Card key={card.id} cardId={card.id} rmvCard={removeCard} />
        ))
      ) : (
        <div style={{
          display: 'grid',
          placeIitems: 'center'
        }}>
          <h3>Please press + icon to add City...</h3>
        </div>
      )}
      <div className='add-city'>
        <button id='add' onMouseOver={handelMouseOver} onMouseOut={handelMouseOut} onClick={handelClick}>{text}</button>
      </div>
    </div>
  );
}

export default App;
