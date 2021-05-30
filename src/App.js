import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import Cards from './Components/cardList'
import './app.css'
function App() {
  //const [cards, setCards] = useState(SAMPLE_CARDS)
  const [cards, setCards] = useState([])
  const [categories, setCategories] = useState([])
  const categoryF = useRef()
  const refAmount = useRef()

  useEffect(()=>{
    axios.get('https://opentdb.com/api_category.php')
    .then(res =>{
      setCategories(res.data.trivia_categories)
      console.log(res.data)
    })
  },[])

  // useEffect(()=>{
  //   axios.get('https://opentdb.com/api.php?amount=50')
  //   .then(res =>{
  //     setCards(res.data.results.map((questionItem, index) =>{
  //       const answer = decodeString(questionItem.correct_answer);
  //       const options = [...questionItem.incorrect_answers.map(a => decodeString(a)), answer]
  //       return {
  //         id: `${index}-${Date.now()}`,
  //         question: decodeString(questionItem.question),
  //         answer: answer,
  //         options: options.sort(() => Math.random()-.5)
  //       }
  //     })
  //     )
  //     //console.log(res.data)
  //   })
  // },[])

  function decodeString(str){
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str;
    return textArea.value
  }

  function handleSubmit(e){
    e.preventDefault()
      axios.get('https://opentdb.com/api.php', {params:{
        amount: refAmount.current.value,
        category: categoryF.current.value
      }})
      .then(res =>{
        setCards(res.data.results.map((questionItem, index) =>{
          const answer = decodeString(questionItem.correct_answer);
          const options = [...questionItem.incorrect_answers.map(a => decodeString(a)), answer]
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random()-.5)
          }
        })
        )
        //console.log(res.data)
      })
  }

  return (
    <> 
      <form className="header" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlForm="category">Category</label>
        <select id="category" ref={categoryF}>
          {categories.map(category =>{
            return <option value={category.id} key={category.id}> {category.name} </option>
          })}
        </select>
      </div>

      <div className="form-group">
        <label htmlForm="amount">Number of questions</label>
        <input type="number" id="amount" min="1" step="1" defaultValue={10} max="50" ref={refAmount} />
      </div>

      <div className="form-group">
        <button className="btn">Generate</button>
      </div>

      </form>
      <div className="container">
        <h1>Quizz</h1>
        <Cards cards={cards}/>
      </div>
    </>
  );
}

// const SAMPLE_CARDS = [
//   {
//     id:1,
//     question: 'what is 2+2',
//     answer: '4',
//     options: ['2', '3', '4', '5']
//   },
//   {
//     id:2,
//     question: 'Question 2',
//     answer: 'Answer',
//     options: ['Answer', '3', '4', '5']
//   },
//   {
//     id:3,
//     question: 'Question 3',
//     answer: 'Answer2',
//     options: ['2', 'Asswer3', 'Answer2', '5']
//   }
// ]

export default App;
