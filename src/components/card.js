//Функции для работы с карточками проекта Mesto вынесите в файл card.js, из него должна экспортироваться функция createCard, которую вы создали раньше (у вас она может называться по-другому). Функции, обрабатывающие события лайка и удаления карточки, также должны находиться в этом файле и экспортироваться из него.
// @todo: Функция создания карточки

function createCard(cardItem, clickDeleteCard, clickLikeCard, renderCardPopup) {

    const container = document.querySelector('#card-template').content;
    
    const card = container.querySelector('.card').cloneNode(true);

    const cardImage = card.querySelector('.card__image');
    const cardDescription = card.querySelector('.card__title');

    cardImage.src = cardItem.link;
    cardImage.alt = cardItem.name;
    cardDescription.textContent = cardItem.name;

    // card.querySelector('.card__image').src = cardItem.link;
    // card.querySelector('.card__image').alt = cardItem.name;
    // card.querySelector('.card__title').textContent = cardItem.name;

    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', clickDeleteCard); 

    const likeButton = card.querySelector('.card__like-button');
    likeButton.addEventListener('click', clickLikeCard); 

    card.querySelector('.card__image').addEventListener('click', function (evt) {
        renderCardPopup(cardItem.link, cardItem.name)
    });
        
    return card;
}

function clickDeleteCard(){
    const el = this.parentElement;
    el.remove();
}

function clickLikeCard(){
    this.classList.toggle('card__like-button_is-active');
}

export {createCard, clickDeleteCard, clickLikeCard}
