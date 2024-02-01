//this var reterives data from the local storage
var contentArray = localStorage.getItem('items')? 
JSON.parse(localStorage.getItem('items')) : [];
//reteriving all the elements created in html file and assigning them functions
document.getElementById("save_card").addEventListener("click", () => {addFlashcard();});

document.getElementById("delete_cards").addEventListener("click", () => 
{localStorage.clear();
flashcards.innerHTML = '';
contentArray = [];
});

document.getElementById("show_card_box").addEventListener("click", () => {
    document.getElementById("create_card").style.display = "block";});

document.getElementById("close_card_box").addEventListener("click", () => {
    document.getElementById("create_card").style.display = "none";});

//Creating a function that will create element in the dom from div to headings.
flashcardMaker = (text, delThisIndex) => {
    const flashcard = document.createElement('div');
    const question = document.createElement('h2');
    const answer = document.createElement('h2');
    const del = document.createElement('i');

    flashcard.className = 'flashcard';
    //setting attributes for the flashcard labels
    question.setAttribute('style', "border-top: 1px solid red; padding:15px; margin-top: 30px");
    question.textContent = text.my_question;

    answer.setAttribute('style', "text-align:center; display:flex; flex-wrap:wrap; justify-content:flex-start; color:green");
    answer.textContent = text.my_answer;

    del.className = "fas fa-minus";
    del.addEventListener("click", ()=> {
        contentArray.splice(delThisIndex, 1);
        localStorage.setItem('items', JSON.stringify(contentArray));
        window.location.reload();
    })

    flashcard.appendChild(question);
    flashcard.appendChild(answer);
    flashcard.appendChild(del);

    //this function is a loop that will keep adding the empty flashcard to the screen
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
        'my_question': question.value,
        'my_answer': answer.value,
    }
    contentArray.push(flashcard_info);
    localStorage.setItem('items', JSON.stringify(contentArray));
    flashcardMaker(contentArray[contentArray.length - 1], contentArray.length - 1);
    question.value = "";
    answer.value = "";
}


