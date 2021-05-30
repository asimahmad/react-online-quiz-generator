import React, {useState, useEffect, useRef} from 'react';

function Card({card}) {
    const [flip, setFlip] = useState(false)
    const [height, setHeight] = useState('initial')
    const refF = useRef();
    const refB = useRef();

    function setMaxHeight(){
        const frontHeight = refF.current.getBoundingClientRect().height;
        const backHeight = refB.current.getBoundingClientRect().height;
        setHeight(Math.max(frontHeight, frontHeight, 100))
    }
    useEffect(setMaxHeight, [card.question, card.answer, card.options])
    useEffect(()=>{
        window.addEventListener('resize', setMaxHeight)
        return () => window.removeEventListener('resize', setMaxHeight)
    },[])

    return (
        <div className={`card ${flip ? 'flip':''}`} style={{height: height}} onClick={() => setFlip(!flip)}>
            <div className="front" ref={refF}>
                {card.question}
                <div className="card-options">
                    {card.options.map(option =>{
                        return <div className="card-option" key={option}>{option}</div>
                    })}
                </div>
            </div>
            <div className="back" ref={refB}>
                    {card.answer}
            </div>      
            {/* {flip ? card.answer: card.question} */}
        </div>
    );
}

export default Card;