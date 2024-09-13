//Функции для работы с карточками проекта Mesto вынесите в файл card.js, из него должна экспортироваться функция createCard, которую вы создали раньше (у вас она может называться по-другому). Функции, обрабатывающие события лайка и удаления карточки, также должны находиться в этом файле и экспортироваться из него.
// @todo: Функция создания карточки


function createCard(cardItem, clickDeleteCard, addLike, removeLike, renderCardPopup, profile) {

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
    const myId = profile._id;

        if (cardItem.owner._id !== myId) {
            deleteButton.remove();
          }
        
        function likeUsers(userId) {
        return userId._id === myId
        }

        if(cardItem.likes.some(likeUsers)){
            likeButton.classList.add('card__like-button_is-active');
        }

        deleteButton.addEventListener("click", function () {
            clickDeleteCard(deleteButton, id);
            likeCount.textContent = cardItem.likes.length;
          });


    likeButton.addEventListener('click', 
        function (){
            if (cardItem.owner._id !== profile._id){
                if (likeButton.classList.contains('card__like-button_is-active')){
                    removeLike(likeButton, cardItem, profile);
                }
                else{
                    addLike(likeButton, cardItem, profile);
                }
            }
            likeCount.textContent = cardItem.likes.length;
        }
    ); 

    card.querySelector('.card__image').addEventListener('click', function (evt) {
        renderCardPopup(cardItem.link, cardItem.name)
    });
        
    return card;
}

export {createCard}
