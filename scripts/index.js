// @todo: Темплейт карточки
const listCards = document.querySelector('.places__list');

// @todo: DOM узлы

// @todo: Функция создания карточки

function createCard(cardItem, clickDeleteCard) {
    // передаётся элемент массива с информацией о карточках и колбэк
    const container = document.querySelector('#card-template').content;
    // передача контента шаблона в переменную
    const card = container.querySelector('.card').cloneNode(true);
    // создание карточки по шаблону

    card.querySelector('.card__image').src = cardItem.link;
    card.querySelector('.card__image').alt = cardItem.name;
    card.querySelector('.card__title').textContent = cardItem.name;

    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', clickDeleteCard); 
 
    return card;
}

// // @todo: Функция удаления карточки

function clickDeleteCard(){
    const el = this.parentElement;
    el.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardItem) => {
    const card = createCard(cardItem, clickDeleteCard);
    listCards.append(card);
});









// перебор массива с помощью метода foreach в параметры которой записана
// анонимная колбэк функция, которая берёт элемент из массива с
// информацией о карточках, и создаёт карточку, с помощью функции создания
// 




// Вам нужно написать функцию, которая принимает в аргументах данные одной карточки и функцию-колбэк для удаления,

// а возвращает подготовленный к выводу элемент карточки. Для этого внутри функции вам понадобится: клонировать шаблон, установить значения вложенных элементов,добавить к иконке удаления обработчик клика, по которому будет вызван переданный в аргументах колбэк.



// function clickDeleteCard(card){
//     card.remove();
// }