const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }; 


// Показать ошибку ввода

const showInputError = function(form, input, errorMessage)
  {
  // передача формы тут нужна для того,
  // чтобы найти элемент в котором будет отображаться текст об ошибке
  const error = form.querySelector(`.${input.id}__input-error`);
  // находим элемент в конкретной форме, который имеет класс со схожей частью,
  // как и переданное поле ввода
  input.classList.add(validationConfig.inputErrorClass);
  // добавление к переданному инпуту класса (красной полосы снизу)
  error.textContent = errorMessage;
  // заполнение текстового значения элемента об ошиибке,
  // переданной ошибкой валидации
  error.classList.add(validationConfig.errorClass);
  // присвоение класса ошибки элементу, отображающему текст ошибки,
  // который позволяет скринридерам прочитать элемент и отобразить текст элемента с ошибкой красным цветом
  
};

// Спрятать ошибку ввода

const hideInputError = function(form, input) {
  // получение формы, нужно для поиска в ней необходимых span-элементов
  const error = form.querySelector(`.${input.id}__input-error`);
  // находим для конкретной формы элемент-отображающий ошибку,
  // с классом схожим с полем ввода, что передано в функцию
  input.classList.remove(validationConfig.inputErrorClass);
  // удаление у переданного инпута класса (красной полосы снизу)
  error.classList.remove(validationConfig.errorClass);
  // удаление класса ошибки элементу, отображающему текст ошибки,
  // который скрывает элемент от скринридеров  и перестаёт отображать текст элемента с ошибкой красным цветом
  error.textContent = '';
  // удаление текстового содержания элемента с ошибкой.
};

// Проверить инпут на валидность

const isValid = function(form, input) {
  if (input.validity.patterMismatch) {
  // если значение поля ввода не соответствует атрибуту pattern

  //true, если значение не соответствует шаблону,
  //указанному в атрибуте pattern.
  // false, если значение соответствует этому шаблону.



  // Если true, элемент соответствует CSS-псевдоклассу :invalid.

  // Псевдокласс :invalid в CSS применяется к полям формы,
  // которые не прошли валидацию. Это означает,
  // что значение поля не соответствует установленным требованиям.

  // Валидация происходит автоматически, основываясь на встроенных
  // HTML-атрибутах, таких как required, pattern, type и других.



    input.setCustomValidity(input.dataset.error);
    // установка пользовательской ошибки через data-атрибут c названием error
  } else {
    // если значение поля ввода проходит проверку по атрибуту pattern
    input.setCustomValidity('');
    // отчиска пользовательского сообщения об ошибке
  }
  if (!input.validity.valid) {
    //в поле ввода есть ошибки

    //.validity - свойство, которое возвращает объект ValidityState,
  // который в свою очередь содержит несколько свойств,
  // описывающих состояние валидности элемента. 

  //Интерфейс ValidityState представляет состояния валидности,
  // в которых может находиться элемент при валидации ограничений.
  // Свойства этого объекта помогают понять, по какой именно причине значение
  // элемента не прошло валидацию. 

  // Если свойство возвращает true, значит оно отражает причину,
  // по которой значение не прошло валидацию. Исплючением является лишь
  // свойство valid, которое возвращает true, когда значение элемента
  // соответствует всем ограничениям.

    showInputError(form, input, input.validationMessage);
    // запуск функции отображения ошибки 

    //.validationMessage - свойство, которое содержит сообщение
    // об ошибке валидации для текущего элемента.
  } else {
    //поле ввода прошло валидацию
    hideInputError(form, input);
    // запуск функции удаления отображения предыдущих ошибок
  }
};

// Проверить невалидность одного из инпута
// (чтобы оценить валидность формы в целом)

const hasInvalidInput = function(inputList) {
  // передаём массив всех инпутов
  return inputList.some(function(input) {
    // возвращение результата проверки колбэк функции,
    // на наличие хотя бы 1 элемента удовлетворяющего условию


    /* Метод массива some() позволяет узнать,
    есть ли в массиве хотя бы один элемент,
    удовлетворяющий условию в функции-колбэке.
    Колбэк-функция будет вызываться для каждого элемента массива
    до тех пор, пока не вернётся true,
    либо пока не закончатся элементы массива.

    Результатом вызова метода some() будет
    boolean-значение true или false.
    Если ни один элемент в массиве не удовлетворит условию,
    то результат будет false.
    */
    return !input.validity.valid;
    // прекращение работы колбэк функции с массивом инпутов,
    // если встретился невалидный
  })
};

// Изменить кликабельность кнопки

const toggleButtonState = function(inputList, button) {
  // проверка валидности всех полей ввода
  if (hasInvalidInput(inputList)) {
    // если есть хотя бы 1 невалидное поле
    button.disabled = true;
    // блокировка кнопки
    button.classList.add('button__inactive');
    // добавление класса неактивности кнопки
  } else {
    // иначе 
    button.disabled = false;
    // разблокировать кнопку
    button.classList.remove('button__inactive');
    // удалить класс неактивности кнопки
  }
};

// Слушатели событий инпутов

const setEventListeners = function(form) {
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  // массив всех полей ввода конкретной формы
  const button = form.querySelector(validationConfig.submitButtonSelector);
  // выбор кнопки отправки конкретной формы
  inputList.forEach(function(input) {
    // перебор массива с полями ввода
    input.addEventListener('input', function() {
      // установка слушателя при наборе каждого нового символа для конкретного инпута
      isValid(form, input);
      // применение к полю ввода, которое сейчас заполняется, функции проверки на валидность
      toggleButtonState(inputList, button);
      // изменение состояния кнопки при записи значений в конкретное поле ввода 
    });
  });
};




const enableValidation = function() {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  //массив всех форм страницы
  formList.forEach(function(form) {
  // перебор форм из массива всех форм документа
    setEventListeners(form);
    // примененеие к каждой форме функции её проверки
   
  });
};


// очистка ошибок валидации вызовом clearValidation

const clearValidation = function (popup, validationConfig){
    const inputList = Array.from(popup.querySelectorAll(validationConfig.inputSelector));
    const btn = popup.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach((input) => {

      console.log(`hasInvalidInput ${hasInvalidInput(inputList)}`);
      console.log(`value ${input.value}`);
      // (input.validity.valid)
      if (hasInvalidInput(inputList))
      {
        if(input.value == "")
        {
          hideInputError(popup, input);
        }

        btn.disabled = true;
            // разблокировать кнопку
        btn.classList.add('button__inactive');
        
      }
      else{
        hideInputError(popup, input);
        btn.disabled = false;
          //   // разблокировать кнопку
        btn.classList.remove('button__inactive');
      }
    })
  }; 

  export {enableValidation, clearValidation};