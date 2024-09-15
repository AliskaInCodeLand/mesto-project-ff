const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-22',
    headers: {
      authorization: '01217dbc-ee2b-4dc6-9d81-207ca6262af2',
      'Content-Type': 'application/json'
    }
  }

//реализация обработки ответа сервера
const handleResponse = (response) => {
if (response.ok) {
    return response.json();
}
return Promise.reject(`Ошибка: ${res.status}`)
};

// получение массива объектов(информации о карте)
export const getInitialCards = () => {
return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
    })
    .then(handleResponse);
} 


// получение моих данных
export const getInitialProfile = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
        })
        .then(handleResponse);
} 

export const getEditProfile = (name, job) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: job
        })
    })
    .then(handleResponse);
} 

export const getEditAvatar = (urlAvatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: urlAvatar,
        })
    })
    .then(handleResponse);
} 


export const addNewPlace = (place, url) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: place,
            link: url
        })
    })
    .then(handleResponse);
} 

export const deletePlace = (card) => {
    return fetch(`${config.baseUrl}/cards/${card._id}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(handleResponse);
} 

export const putHandleLike = (likedCardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${likedCardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then(handleResponse)
} 


export const putHandleDisLike = (disLikedCardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${disLikedCardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(handleResponse)
} 
