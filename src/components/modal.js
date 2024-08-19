//Работа модальных окон

function openModal(popup){
    popup.classList.add('popup_is-animated');
    popup.classList.add('popup_is-opened');


    document.addEventListener('keydown', keydownEscape);
    document.addEventListener('click', keydownOverlay);
}

function closeModal(){

    document.removeEventListener('keydown', keydownEscape);
    document.removeEventListener('click', keydownOverlay);
    const element = document.querySelector('.popup_is-opened');
    element.classList.remove('popup_is-opened');
    
};

function keydownEscape (evt){
    const key = evt.key;
    if(key === "Escape"){
        document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
    }
}

function keydownOverlay (evt){
    if (evt.target.classList.contains('popup')){
        document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
    }
}

export {openModal, closeModal};
