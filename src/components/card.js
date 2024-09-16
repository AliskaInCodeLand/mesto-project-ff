//Функции для работы с карточками проекта Mesto вынесите в файл card.js, из него должна экспортироваться функция createCard, которую вы создали раньше (у вас она может называться по-другому). Функции, обрабатывающие события лайка и удаления карточки, также должны находиться в этом файле и экспортироваться из него.
// @todo: Функция создания карточки


function createCard(cardItem, clickDeleteCard, addLikeCard, removeLikeCard, renderCardPopup, profileId) {

    const container = document.querySelector('#card-template').content;
    const card = container.querySelector('.card').cloneNode(true);
    const deleteButton = card.querySelector('.card__delete-button');
    const likeButton = card.querySelector('.card__like-button');
    const cardImage = card.querySelector('.card__image');
    const likeCount = card.querySelector('.card__like-count');

    card.querySelector('.card__title').textContent = cardItem.name;

    cardImage.src = cardItem.link;
    cardImage.alt = cardItem.name;
    likeCount.textContent = cardItem.likes.length;

        if (cardItem.owner._id !== profileId) {
            deleteButton.remove();
          }
        
        function likeUsers(userId) {
        return userId._id === profileId
        }

        if(cardItem.likes.some(likeUsers)){
            likeButton.classList.add('card__like-button_is-active');
        }

        deleteButton.addEventListener("click", function () {
            clickDeleteCard(deleteButton, cardItem);
          });


    likeButton.addEventListener('click', function ()  {
        console.log("start");
        
        if (likeButton.classList.contains('card__like-button_is-active')){
            removeLikeCard(cardItem, likeButton, likeCount);
        }
        else{
            console.log("addLike");
            addLikeCard(cardItem, likeButton, likeCount);
        }
        console.log("end");
    }
    )

    card.querySelector('.card__image').addEventListener('click', function (evt) {
        renderCardPopup(cardItem.link, cardItem.name)
    });
        
    return card;
}

function toggleLike(button, arrayLikes, spanLike){
    if (button.classList.contains('card__like-button_is-active')){
        button.classList.remove('card__like-button_is-active');
    }
    else{
        button.classList.add('card__like-button_is-active');
    }
    spanLike.textContent = arrayLikes.length;
}

export {createCard, toggleLike}
