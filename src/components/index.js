import '../pages/index.css';
import {createCard} from './card.js';
import {openModal, closeModal} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';

import { getInitialCards, getInitialProfile, getEditProfile, addNewPlace, deletePlace, putHandleLike, putHandleDisLike, getEditAvatar} from './api.js'

  // Валидация формы

  const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }; 

const listCards = document.querySelector('.places__list');
const forms = document.querySelectorAll(validationConfig.formSelector);

const editProfileForm = document.forms["edit-profile"];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
        
const elementNameInput = document.querySelector(".profile__title");
const elementJobInput = document.querySelector(".profile__description");

const newPlaceForm = document.forms["new-place"];
const placeInput = newPlaceForm.elements["place-name"];
const urlInput = newPlaceForm.elements["link"];

const newAvatarForm = document.forms["new-avatar"];
const elementAvatar = document.querySelector(".profile__image");
const avatarInput = document.querySelector('.popup__input_type_image');



let profileId;
let profile;
let avatarLink;

Promise.all([getInitialCards(), getInitialProfile()])
.then(([response1, response2]) => {
  response1.forEach((cardItem) => {
    elementNameInput.textContent = response2.name;
    elementJobInput.textContent = response2.about;
    profile = response2;
    profileId = response2._id;
    avatarLink = response2.avatar;
    elementAvatar.style.backgroundImage=`url(${avatarLink})`; 
    
    closeModal(editProfileForm.closest('.popup'));

    const card = createCard(cardItem, clickDeleteCard, addLike, removeLike, renderCardPopup, response2);
    listCards.append(card);
  })
  console.log(response1);
})
.catch((err) => {
  console.log(err);
}); 




const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

document.addEventListener('click', (evt)=>{
  if (evt.target == editButton){
      const popupEdit = document.querySelector('.popup_type_edit');

      nameInput.value = elementNameInput.textContent;
      jobInput.value = elementJobInput.textContent;
      
      openModal(popupEdit);

      clearValidation(popupEdit, validationConfig);
      nameInput.value = elementNameInput.textContent;
      jobInput.value = elementJobInput.textContent;

      return

  }
  if (evt.target ==  addButton){
      const popupNewCard = document.querySelector('.popup_type_new-card');
      
      openModal(popupNewCard);
      clearValidation(popupNewCard, validationConfig);
      
  }
  if (evt.target.classList.contains('popup__close')){
      const btnDelete = evt.target;
      closeModal(btnDelete.closest('.popup'));
  } 

  if (evt.target == elementAvatar){
    const popupAvatar = document.querySelector('.popup_type_avatar');
    const pop = popupAvatar.querySelector('.popup__content');
    pop.style.minHeight = 0 + 'px';
    openModal(popupAvatar);
    clearValidation(popupAvatar, validationConfig);
  } 
})

enableValidation();

function handleFormSubmit(evt) {
  evt.preventDefault();
  if(evt.target == editProfileForm){
    editProfileForm.querySelector('.popup__button').textContent = "Сохранение...";

    getEditProfile(nameInput.value, jobInput.value)
    .then((newProfile) => {
      elementNameInput.textContent= newProfile.name;
      elementJobInput.textContent = newProfile.about;
      editProfileForm.querySelector('.popup__button').textContent = "Сохранить";
    })
    .then(()=> {
      closeModal(editProfileForm.closest('.popup'));
    })
    .catch((err) => {
      console.log(err);
    });
    return
  } 

  if(evt.target == newAvatarForm){
    newAvatarForm.querySelector('.popup__button').textContent = "Сохранение...";
    getEditAvatar(avatarInput.value)
    .then((newAvatar) => {
      elementAvatar.style.backgroundImage=`url("${newAvatar.avatar}")`;
      newAvatarForm.querySelector('.popup__button').textContent = "Сохранить";
    })
    .then(() => {
      closeModal(newAvatarForm.closest('.popup'));
      newAvatarForm.reset(); 
    })
    .catch((err) => {
      console.log(err);
    });
    return
  } 

  if(evt.target == newPlaceForm){
    newPlaceForm.querySelector('.popup__button').textContent = "Сохранение...";
    addNewPlace(placeInput.value, urlInput.value)
    .then((newPlace) => {
      const newCard = createCard(newPlace, clickDeleteCard, addLike, removeLike, renderCardPopup, profile);
      listCards.prepend(newCard);
      
    })
    .then(() => {
      newPlaceForm.querySelector('.popup__button').textContent = "Сохранить";
      newPlaceForm.reset();
    })
    .catch((err) => {
      console.log(err);
    });
    
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


export function clickDeleteCard(deleteButton, id) {
  deletePlace(id)
  .then(() => {deleteButton.parentElement.remove()});
}

export function addLike(button, card){
  putHandleLike(card._id)
  .then((data)=>{
    card.likes = data.likes;
    button.classList.add('card__like-button_is-active');
    button.nextElementSibling.textContent = card.likes.length;
  })
}

export function removeLike(button, card){
  putHandleDisLike(card._id)
  .then((data)=>{
    card.likes = data.likes;
    button.classList.remove('card__like-button_is-active');
    button.nextElementSibling.textContent = card.likes.length;
  })
}