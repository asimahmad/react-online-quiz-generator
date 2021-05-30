import React from 'react';
import Card from './card'

function Cards({cards}) {
    return (
        <div className="card-grid">
            {cards.map(card =>{
                return <Card card={card} key={card.id} />
            })}
        </div>
    );
}

export default Cards