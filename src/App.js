import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './FlashcardList';
import './app.css'
import axios from 'axios';

function App() {
  const [flashcards, setFlashcards] = useState([])
  const[categories, setCategories] = useState([])

  const categoryE1 = useRef()
  const amountE1 = useRef()
  //using react hook to handle API data from external source
  useEffect(() => {
    axios
    .get('https://opentdb.com/api_category.php')
    .then(response => {
      setCategories(response.data.trivia_categories)
    })
  }, [])

  useEffect(() => {
  }, [])
  //function to handle inner html and convert it into a string
  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }
  //function to handle submit
  function handleSubmit(event) {
    event.preventDefault()
    axios
      .get('https://opentdb.com/api.php', {
        params: {
          category: categoryE1.current.value,
          amount: amountE1.current.value
        }
      })
      //Format and set the fetched questions in state
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
    <>{/*Form for category and number of questions*/}
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
     {/*display the generated flashcards*/}
     <div className="container">
      <FlashcardList flashcards={flashcards} />
     </div>
    </>
  );
}
export default App;
