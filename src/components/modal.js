//Работа модальных окон

function openModal(popup){
    // popup.classList.add('popup_is-animated');
    /* Модификатор нужно добавить только один раз при загрузке страницы. Добавлять его многократно при каждом открытии попапа не имеет смысла. */
    popup.classList.add('popup_is-opened');


    document.addEventListener('keydown', keydownEscape);
    // document.addEventListener('click', clickOverlay);
    /* Слушатель кликов в оверлей необходимо устанавливать исключительно на попап, а не на весь документ. Оверлей есть только в попапе и слушать клики во всем документе избыточно. */
}

function closeModal(popup){

    document.removeEventListener('keydown', keydownEscape);
    // document.removeEventListener('click', clickOverlay);
    /* Слушатель кликов в оверлей необходимо устанавливать исключительно на попап, а не на весь документ. Оверлей есть только в попапе и слушать клики во всем документе избыточно. */

    popup.classList.remove('popup_is-opened');
};

function keydownEscape (evt){
    const key = evt.key;
    if(key === "Escape"){
        closeModal(document.querySelector('.popup_is-opened'));
    }
}

function clickOverlay (evt){
    // if (evt.target.classList.contains('popup')){
    //     console.log(evt.target.classList.contains('popup'));
    //     closeModal(document.querySelector('.popup_is-opened'));
    // }
    
    closeModal(evt.target);
    /* При клике в оверлей, закрывается именно тот попап, в оверлей которого кликнул пользователь. */
}

export {openModal, closeModal, clickOverlay};
