import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './FlashcardList';
import './app.css'
import axios from 'axios';

function App() {
  const [flashcards, setFlashcards] = useState([])
  const[categories, setCategories] = useState([])

  const categoryE1 = useRef()
  const amountE1 = useRef()

  useEffect(() => {
    axios
    .get('https://opentdb.com/api_category.php')
    .then(response => {
      setCategories(response.data.trivia_categories)
    })
  }, [])

  useEffect(() => {
  }, [])

  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  function handleSubmit(event) {
    event.preventDefault()
    axios
      .get('https://opentdb.com/api.php', {
        params: {
          category: categoryE1.current.value,
          amount: amountE1.current.value
        }
      })
      .then(response => {
        setFlashcards(response.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer)
          const options = [...questionItem.incorrect_answers.map(a => decodeString(a)), answer]
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - 0.5)
          }
        }))  
      })
  }
  return(
    <>
     <form className="header" onSubmit={handleSubmit}>
     <h1>Quiz generator</h1>
       <div className="form-group">
        <label htmlFor="category">Category</label>
        <select id="category" ref={categoryE1}>
          {categories.map(category => {
            return <option key={category.id} value={category.id}>{category.name}</option>
          })}
        </select>
       </div>
       <div className="form-group">
        <label htmlFor="amount">Number of Questions</label>
        <input id="amount" type="number" min="1" step="1" defaultValue={10} ref={amountE1} />
       </div>
       <div className="form-group">
        <button type="submit" className="btn">Generate</button>
       </div>
     </form>
     <div className="container">
      <FlashcardList flashcards={flashcards} />
     </div>
    </>
  );
}
export default App;
