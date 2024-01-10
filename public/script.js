//creating and array to check if we are already using local storage.
var contentArray = sessionStorage.getItem('items')? 
JSON.parse(sessionStorage.getItem('items')) : [];

document.getElementById("save_flashcard").addEventListener("click", () => {addFlashcard();});

document.getElementById("delete_flashcards").addEventListener("click", () => 
{sessionStorage.clear();
flashcards.innerHTML = '';
contentArray = [];
});

document.getElementById("create_flashcards").addEventListener("click", () => 
{document.getElementById("create_flashcards").style.display = "block";});

document.getElementById("close_Create_Box").addEventListener("click", () => 
{document.getElementById("create_card").style.display = "none";});


flashcardMaker = (text, delThisIndex) => {
    const flashcard = document.createElement('section');
    const question = document.createElement('h2');
    const answer = document.createElement('h2');
    const del = document.createElement('i');

    flashcard.className = 'flashcard';
    question.setAttribute('style', "border-top: 1px solid red; padding:15px; margin-top: 30px");
    question.textContent = text.user_question_;

    answer.setAttribute('style', "text-align:center; display:none; color:green");
    answer.textContent = text.user_answer_;

    del.className = "fas fa-minus";
    del.addEventListener("click", ()=> {
        contentArray.splice(delThisIndex, 1);
        sessionStorage.setItem('items', JSON.stringify(contentArray));
        window.location.reload();
    });

    flashcard.appendchild(question);
    flashcard.appendChild(answer);
    flashcard.appendChild(del);

    flashcard.addEventListener('click', () => {
        if(answer.style.display === 'none')
          answer.style.display = 'block';
        else
          answer.style.display = 'none';
    });

    document.querySelector("#flashcards").appendChild(flashcard);
}
contentArray.forEach(flashcardMaker);

//this function will add a card to the screen.
addFlashcard= () => {
    const question = document.querySelector("#question");
    const answer = document.querySelector("#answer");

    var flashcard_info = {
        'user_question': question.value,
        'user_answer': answer.value
    }
    contentArray.push(flashcard_info);
    sessionStorage.setItem('items', JSON.stringify(contentArray));
    flashcardMaker(contentArray[contentArray.length - 1], contentArray.length - 1);
    question.value = '';
    answer.value = '';
}



//this function will open the create card box on the screen.
createFlashcards= () => {
    createBox.style.display = 'block';
}

//this function will close the  Create card box.
closeCreateBox= () => {
    createBox.style.display = 'none';
}
