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

        return;
    }
    if (evt.target ==  addButton){
        const popupNewCard = document.querySelector('.popup_type_new-card');
        openModal(popupNewCard);
    }
    if (evt.target.classList.contains('popup__close')){
        const btnDelete = evt.target;
        closeModal(btnDelete.closest('.popup'));
    } 
})

const forms = document.querySelectorAll(".popup__form");

const editProfileForm = document.forms["edit-profile"];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

        
const elementNameInput = document.querySelector(".profile__title");
const elementJobInput = document.querySelector(".profile__description");

const newPlaceForm = document.forms["new-place"];
const placeInput = newPlaceForm.elements["place-name"];
const urlInput = newPlaceForm.elements["link"];


function handleFormSubmit(evt) {

    evt.preventDefault();
    console.log(`evt.target: ${evt.target.classList}`)
    if(evt.target == editProfileForm){

        let nameInputValue = nameInput.value;
        let JobInputValue = jobInput.value;

        elementNameInput.textContent= nameInputValue;
        elementJobInput.textContent = JobInputValue;

        closeModal(editProfileForm.closest('.popup'));
        return;
    } 

    if(evt.target == newPlaceForm){
        
        const newCard = createCard({name: placeInput.value, link: urlInput.value}, clickDeleteCard, clickLikeCard, renderCardPopup);
        listCards.prepend(newCard);

        newPlaceForm.reset();
        closeModal(newPlaceForm.closest('.popup'));
    } 
}

document.addEventListener('submit', handleFormSubmit);

function renderCardPopup( parametrImg, parametrDescription){
    const renderCardimage = document.querySelector('.popup__image');
    renderCardimage['src'] = parametrImg;

    const renderCardCaption = document.querySelector('.popup__caption');
    renderCardCaption.textContent = parametrDescription;

    const popupTypeImage = document.querySelector('.popup_type_image');
    openModal(popupTypeImage);
}

