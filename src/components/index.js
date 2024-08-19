import '../pages/index.css';
import initialCards from './cards.js';
import {createCard, clickDeleteCard, clickLikeCard} from './card.js';
import {openModal, closeModal} from './modal.js';


const listCards = document.querySelector('.places__list');

initialCards.forEach((cardItem) => {
    const card = createCard(cardItem, clickDeleteCard, clickLikeCard, renderCardPopup);
    listCards.append(card);
});


const popups = document.querySelectorAll('.popup');
for (let popup of popups){
    popup.classList.add('popup_is-animated');
} 

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

document.addEventListener('click', (evt)=>{
    if (evt.target == editButton){
        const popupEdit = document.querySelector('.popup_type_edit');
        openModal(popupEdit);
        nameInput.value = elementNameInput.textContent;
        jobInput.value = elementJobInput.textContent;
    }
    if (evt.target ==  addButton){
        const popupNewCard = document.querySelector('.popup_type_new-card');
        openModal(popupNewCard);
    }
    for (let closeBtn of closeButtons){
        if (evt.target == closeBtn){
            closeModal();
        }  
    } 
})


// Находим форму в DOM
let formElement = document.querySelectorAll(".popup__form");

const editProfileForm = document.forms["edit-profile"];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

        
const elementNameInput = document.querySelector(".profile__title");
const elementJobInput = document.querySelector(".profile__description");

// Находим форму добавления новой карточки в DOM 
const newPlaceForm = document.forms["new-place"];
const placeInput = newPlaceForm.elements["place-name"];
const urlInput = newPlaceForm.elements["link"];


function handleFormSubmit(evt) {

    evt.preventDefault();

    if(evt.target == editProfileForm){

        let nameInputValue = nameInput.value;
        let JobInputValue = jobInput.value;

        elementNameInput.textContent= nameInputValue;
        elementJobInput.textContent = JobInputValue;
    } 

    if(evt.target == newPlaceForm){
        
        const newCard = createCard({name: placeInput.value, link: urlInput.value}, clickDeleteCard, clickLikeCard, renderCardPopup);
        listCards.prepend(newCard);

        placeInput.value = "";
        urlInput.value = "";
    } 

    closeModal();
}


formElement.forEach((form) => {
    form.addEventListener('submit', handleFormSubmit);
});

function renderCardPopup( parametrImg, parametr){
    const renderCardimage = document.querySelector('.popup__image');
    renderCardimage['src'] = parametrImg;

    const renderCardCaption = document.querySelector('.popup__caption');
    renderCardCaption.textContent = parametr;

    const popupTypeImage = document.querySelector('.popup_type_image');
    openModal(popupTypeImage);
}

