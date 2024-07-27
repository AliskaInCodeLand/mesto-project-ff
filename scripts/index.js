// @todo: Темплейт карточки
const listCards = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
// @todo: DOM узлы
let index;
let cards = [];

// @todo: Функция создания карточки

function createCard(cardItem) {
    const container = document.querySelector('#card-template').content;
    const card = container.querySelector('.card').cloneNode(true);

    card.querySelector('.card__image').src = cardItem.link;
    card.querySelector('.card__image').alt = cardItem.name;
    card.querySelector('.card__title').textContent = cardItem.name;

    
    
    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {clickDeleteCard(card);});
 
    return card;
}

// // @todo: Функция удаления карточки

function clickDeleteCard (card){
    card.remove();
} 


// @todo: Вывести карточки на страницу
initialCards.forEach(function(cardItem){
    const card = createCard(cardItem);
    listCards.append(card);
    cards.push(card);
})
