
window.addEventListener("load", (event) => {
    console.log("page is fully loaded");

    document.getElementById('newCard').addEventListener('click', showCreateCardBox);
    document.getElementById('delCard').addEventListener('click', delFlashcards);
    document.getElementById('save').addEventListener('click', addFlashcard);
    document.getElementById('close').addEventListener('click', hideCreateBox);


    const flashcards = document.getElementsByClassName('flashcards')[0];
    const createBox = document.getElementsByClassName('create-box')[0];
    const textarea_question = document.getElementById('question');
    const textarea_answer = document.getElementById('answer');

    let contentArray = localStorage.getItem('items') ?
        JSON.parse(localStorage.getItem('items')) : [];


    contentArray.forEach(element => divMaker(element));

    function divMaker(flashcardData) {

        let div = document.createElement('div');
        let h2_question = document.createElement('h2');
        let h2_answer = document.createElement('h2');

        div.className = 'flashcard';

        h2_question.setAttribute('style'
            , 'border-top:1px solid red; padding:15px; margin-top:30px;');
        h2_question.innerHTML = flashcardData.question;

        h2_answer.setAttribute('style'
            , 'text-align:center; display:none; color:red');
        h2_answer.innerHTML = flashcardData.answer;

        div.appendChild(h2_question);
        div.appendChild(h2_answer);



        div.addEventListener('click', function () {
            if (h2_answer.style.display == 'none') {
                h2_answer.style.display = 'display'
            }
            else {
                h2_answer.style.display = 'none'
            }
        });

        flashcards.appendChild(div);
    }

    function addFlashcard() {

        let flashcard_info = {
            'question': textarea_question.value,
            'answer': textarea_answer.value

        };
        contentArray.push(flashcard_info);
        localStorage.setItem('items', JSON.stringify(contentArray));
        divMaker(contentArray[contentArray.length - 1]);
        textarea_question.value = '';
        textarea_answer.value = '';
    }

    function delFlashcards() {
        localStorage.clear();
        flashcards.innerHTML = '';
        contentArray = [];
    }

    function hideCreateBox() {
        createBox.style.display = 'none';
    }


    function showCreateCardBox() {
        createBox.style.display = 'block';
    }
});