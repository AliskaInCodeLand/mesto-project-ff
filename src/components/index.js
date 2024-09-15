import '../pages/index.css';
import {createCard, toggleLike} from './card.js';
import {openModal, closeModal, clickOverlay} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';

import { getInitialCards, getInitialProfile, getEditProfile, addNewPlace, deletePlace, putHandleLike, putHandleDisLike, getEditAvatar} from './api.js'
// import { getInitialCards, getInitialProfile, getEditProfile, addNewPlace, deletePlace, getEditAvatar} from './api.js'

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
const popups = document.querySelectorAll('.popup');

const forms = document.querySelectorAll(validationConfig.formSelector);

const popupEdit = document.querySelector('.popup_type_edit'); 
const editProfileForm = document.forms["edit-profile"];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
        
const elementName = document.querySelector(".profile__title");
const elementJob = document.querySelector(".profile__description");

const popupNewCard = document.querySelector('.popup_type_new-card');
const newPlaceForm = document.forms["new-place"];
const placeInput = newPlaceForm.elements["place-name"];
const urlInput = newPlaceForm.elements["link"];

const popupAvatar = document.querySelector('.popup_type_avatar');
const newAvatarForm = document.forms["new-avatar"];
const elementAvatar = document.querySelector(".profile__image");
const avatarInput = document.querySelector('.popup__input_type_image');

const popupTypeImage = document.querySelector('.popup_type_image');
const renderCardCaption = document.querySelector('.popup__caption');
const renderCardimage = document.querySelector('.popup__image');



let profileId;

Promise.all([getInitialCards(), getInitialProfile()])
.then(([response1, response2]) => { 
  popups.forEach((popup) => {
    popup.classList.add('popup_is-animated');
    // Модификатор добавлен только один раз при загрузке страницы. 

    popup.addEventListener('click', clickOverlay);
    /* Попапы всегда находятся в разметке страницы и переустанавливать слушатели на них при каждом открытии попапа это напрасная трата ресурсов браузера.
Более корректным будет установить слушатель оверлея один раз, так же, как слушатель на открытии форм или сабмите форм. */
  })
  response1.forEach((cardItem) => {
    elementName.textContent = response2.name;
    elementJob.textContent = response2.about;
    profileId = response2._id;
    elementAvatar.style.backgroundImage=`url(${response2.avatar})`; 

    // const card = createCard(cardItem, clickDeleteCard, addLike, removeLike, renderCardPopup, profileId);
    const card = createCard(cardItem, clickDeleteCard, addLikeCard, removeLikeCard, renderCardPopup, profileId);
    listCards.append(card);
  })

})
.catch((err) => {
  console.log(err);
}); 

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

const countLikes = document.querySelectorAll(".card__like-count");
const buttonsLike = document.querySelectorAll("card__like-button");
// 

editButton.addEventListener('click', (evt)=>{
  editProfileForm.reset();
  clearValidation(popupEdit, validationConfig);
  openModal(popupEdit);

  nameInput.value = elementName.textContent;
  jobInput.value = elementJob.textContent;
  
  return
})
addButton.addEventListener('click', (evt)=>{

  
  
  openModal(popupNewCard);
  clearValidation(popupNewCard, validationConfig);
      
})

closeButtons.forEach((closebtn) => {
  closebtn.addEventListener('click', (evt)=>{
    const btnDelete = evt.target;
    closeModal(btnDelete.closest('.popup'));
  })
})

elementAvatar.addEventListener('click', (evt)=>{
  
  const pop = popupAvatar.querySelector('.popup__content');
  pop.classList.add("popup__content-avatar");
  openModal(popupAvatar);
  clearValidation(popupAvatar, validationConfig);
})

// buttonsLike.addEventListener('click', (evt)=>{
//   if (likeButton.classList.contains('card__like-button_is-active')){
//     putHandleDisLike(card._id)
//     .then((data)=>{
//       card.likes = data.likes;
//       toggleLike(likeButton)
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//   }
//   else{
//     putHandleLike(card._id)
//     .then((data)=>{
//       card.likes = data.likes;
//       toggleLike(likeButton)
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//   }
  

// })
  

enableValidation(validationConfig);

// function handleFormSubmit(evt) {
//   evt.preventDefault();
//   if(evt.target == editProfileForm){
//     editProfileForm.querySelector('.popup__button').textContent = "Сохранение...";

//     getEditProfile(nameInput.value, jobInput.value)
//     .then((newProfile) => {
//       elementName.textContent= newProfile.name;
//       elementJob.textContent = newProfile.about;
//       editProfileForm.querySelector('.popup__button').textContent = "Сохранить";
      
//     })
//     .then(()=> {
//       closeModal(editProfileForm.closest('.popup'));
      
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//     return
//   } 

//   if(evt.target == newAvatarForm){
//     newAvatarForm.querySelector('.popup__button').textContent = "Сохранение...";
//     getEditAvatar(avatarInput.value)
//     .then((newAvatar) => {
//       elementAvatar.style.backgroundImage=`url("${newAvatar.avatar}")`;
//       newAvatarForm.querySelector('.popup__button').textContent = "Сохранить";
//     })
//     .then(() => {
//       closeModal(newAvatarForm.closest('.popup'));
//       newAvatarForm.reset(); 
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//     return
//   } 

//   if(evt.target == newPlaceForm){
//     newPlaceForm.querySelector('.popup__button').textContent = "Сохранение...";
//     addNewPlace(placeInput.value, urlInput.value)
//     .then((newPlace) => {
//       const newCard = createCard(newPlace, clickDeleteCard, addLike, removeLike, renderCardPopup, profileId);
//       listCards.prepend(newCard);
      
//     })
//     .then(() => {
//       newPlaceForm.querySelector('.popup__button').textContent = "Сохранить";
//       newPlaceForm.reset();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
    
//     closeModal(newPlaceForm.closest('.popup'));
//   }

// }

// document.addEventListener('submit', handleFormSubmit);

function editProfile(evt) {
  evt.preventDefault();
  if(evt.target == editProfileForm){
    editProfileForm.querySelector('.popup__button').textContent = "Сохранение...";

    getEditProfile(nameInput.value, jobInput.value)
    .then((newProfile) => {
      elementName.textContent= newProfile.name;
      elementJob.textContent = newProfile.about;
      closeModal(popupEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() =>{
      editProfileForm.querySelector('.popup__button').textContent = "Сохранить";
    })
    return
  } 
}

function createAvatar(evt) {
  evt.preventDefault();
  if(evt.target == newAvatarForm){
    newAvatarForm.querySelector('.popup__button').textContent = "Сохранение...";
    getEditAvatar(avatarInput.value)
    .then((newAvatar) => {
      elementAvatar.style.backgroundImage=`url("${newAvatar.avatar}")`;
      closeModal(popupAvatar);
      newAvatarForm.reset(); 
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() =>{
      newAvatarForm.querySelector('.popup__button').textContent = "Сохранить";
    })
    return
  } 
}

function createNewPlace(evt) {
  evt.preventDefault();
  if(evt.target == newPlaceForm){
    newPlaceForm.querySelector('.popup__button').textContent = "Сохранение...";
    addNewPlace(placeInput.value, urlInput.value)
    .then((newPlace) => {
      const newCard = createCard(newPlace, clickDeleteCard,  addLikeCard, removeLikeCard, renderCardPopup, profileId);
      
      listCards.prepend(newCard);
      newPlaceForm.reset();
      closeModal(newPlaceForm.closest('.popup'));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() =>{
      newPlaceForm.querySelector('.popup__button').textContent = "Сохранить";
    })
  }

}

document.addEventListener('submit',editProfile);
document.addEventListener('submit',createAvatar);
document.addEventListener('submit',createNewPlace);




function renderCardPopup( parametrImg, parametrDescription){
  
  renderCardimage['src'] = parametrImg;
  renderCardimage['alt'] = parametrDescription;
  renderCardCaption.textContent = parametrDescription;

  openModal(popupTypeImage);
}


export function clickDeleteCard(deleteButton, card) {
  deletePlace(card)
  .then(() => {deleteButton.parentElement.remove()})
  .catch((err) => {
    console.log(err);
  })
}


export function addLikeCard(card, btn, spanLike){
  
  putHandleLike(card._id)
  .then((data)=>{
    toggleLike(btn);
    card.likes = data.likes;
    spanLike.textContent = card.likes.length;
  })
  .catch((err) => {
    console.log(err);
  })

}

export function removeLikeCard(card, btn, spanLike){
  putHandleDisLike(card._id)
  .then((data)=>{
    toggleLike(btn);
    card.likes = data.likes;
    spanLike.textContent = card.likes.length;
  })
  .catch((err) => {
    console.log(err);
  })
}

// export function addLike(button, card){
  
//   putHandleLike(card._id)
//   .then((data)=>{
//     card.likes = data.likes;
    
//   })
//   .catch((err) => {
//     console.log(err);
//   })
// }

// export function removeLike(button, card){
//   putHandleDisLike(card._id)
//   .then((data)=>{
//     card.likes = data.likes;
//     button.classList.remove('card__like-button_is-active');
//     button.nextElementSibling.textContent = card.likes.length;
//   })
//   .catch((err) => {
//     console.log(err);
//   })
// }