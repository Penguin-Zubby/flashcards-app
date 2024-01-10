const flashcards = document.getElementsByClassName('flashcards')[0];
const createBox = document.getElementsByClassName('create-box')[0];
const question = document.getElementsById('question');
const answer = document.getElementsById('answer');
//creating and array to check if we are already using local storage.
var contentArray = sessionStorage.getItem('items')? 
JSON.parse(sessionStorage.getItem('items')) : [];

document.getElementById("addflashcard").addEventListener("click", () => {addFlashcard();});
document.getElementById("closeCreateBox").addEventListener("click", () => {closeCreateBox();});
document.getElementById("createFlashcards").addEventListener("click", () => {createFlashcards();});
document.getElementById("deleteFlashcards").addEventListener("click", () => {deleteFlashcards();});

contentArray.array.forEach(secMaker);
function secMaker(text) {
    var sec = document.createElement('section');
    var h2_question = document.createElement('h2');
    var h2_answer = document.createElement('h2');

    sec.className = 'flashcard';
    h2_question.setAttribute('style', "border-top: 1px solid red; padding:15px; margin-top: 30px");
    h2_question,innerHTML = text.user_question_;

    h2_answer.setAttribute('style', "text-align:center; display:none; color:green");
    h2_answer,innerHTML = text.user_answer_;

    sec.appendchild(h2_question);
    sec.appendChild(h2_answer);

    sec.addEventListener('click', () => {
        if(h2_answer.style.display === 'none')
          h2_answer.style.display = 'block';
        else
          h2_answer.style.display = 'none';
    });

    flashcards.appendChild(sec);
}

//this function will add a card to the screen.
addFlashcard= () => {
    var flashcard_data = {
        'user_question': question.value,
        'user_answer': answer.value
    }
    contentArray.push(flashcard_data);
    sessionStorage.setItem('items', JSON.stringify(contentArray));
    secMaker(contentArray[contentArray.length - 1]);
    question.value = '';
    answer.value = '';
}

//this function will delete the card from the screen.
deleteFlashcards = () => {
    sessionStorage.clear();
    flashcards.innerHTML = '';
    contentArray = [];
}

//this function will open the create card box on the screen.
createFlashcards= () => {
    createBox.style.display = 'block';
}

//this function will close the  Create card box.
closeCreateBox= () => {
    createBox.style.display = 'none';
}
