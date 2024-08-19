//Работа модальных окон

function openModal(popup){
    popup.classList.add('popup_is-animated');
    popup.classList.add('popup_is-opened');


    document.addEventListener('keydown', keydownEscape);
    document.addEventListener('click', clickOverlay);
}

function closeModal(popup){

    document.removeEventListener('keydown', keydownEscape);
    document.removeEventListener('click', clickOverlay);

    popup.classList.remove('popup_is-opened');
};

function keydownEscape (evt){
    const key = evt.key;
    if(key === "Escape"){
        closeModal(document.querySelector('.popup_is-opened'));
    }
}

function clickOverlay (evt){
    if (evt.target.classList.contains('popup')){
        closeModal(document.querySelector('.popup_is-opened'));
    }
}

export {openModal, closeModal};
