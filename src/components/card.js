//Функции для работы с карточками проекта Mesto вынесите в файл card.js, из него должна экспортироваться функция createCard, которую вы создали раньше (у вас она может называться по-другому). Функции, обрабатывающие события лайка и удаления карточки, также должны находиться в этом файле и экспортироваться из него.
// @todo: Функция создания карточки


function createCard(cardItem, clickDeleteCard, addLikeCard, removeLikeCard, renderCardPopup, profileId) {
    // function createCard(cardItem, clickDeleteCard, renderCardPopup, profileId) {

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

    const id = cardItem._id;

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
            // toggleLike(likeButton);
            removeLikeCard(cardItem, likeButton, likeCount);
            // likeCount.textContent = cardItem.likes.length;
        }
        else{
            // toggleLike(likeButton, likeCount, cardItem);
            console.log("addLike");
            addLikeCard(cardItem, likeButton, likeCount);
            // likeCount.textContent = cardItem.likes.length;
        }
        // likeCount.textContent = cardItem.likes.length;
        console.log("end");
    }
    )

// addLikeCard, removeLikeCard,

            
            // if (cardItem.owner._id !== profileId){
            //     if (likeButton.classList.contains('card__like-button_is-active')){
            //         removeLike(likeButton, cardItem);
            //         likeCount.textContent = cardItem.likes.length;
            //     }
            //     else{
            //         addLike(likeButton, cardItem);
            //         likeButton.classList.add('card__like-button_is-active');
            //         likeCount.textContent = cardItem.likes.length;
            //     }
            // likeCount.textContent = cardItem.likes.length;
        // }

    card.querySelector('.card__image').addEventListener('click', function (evt) {
        renderCardPopup(cardItem.link, cardItem.name)
    });
        
    return card;
}

function toggleLike(button){
    if (button.classList.contains('card__like-button_is-active')){
        button.classList.remove('card__like-button_is-active');
    }
    else{
        button.classList.add('card__like-button_is-active');
    }
}

// function addLike(button, card){
//     button.classList.remove('card__like-button_is-active');
//     button.nextElementSibling.textContent = card.likes.length;
// }

// function removeLike(button, card){
//     button.classList.remove('card__like-button_is-active');
//     button.nextElementSibling.textContent = card.likes.length;
// }

export {createCard, toggleLike}
