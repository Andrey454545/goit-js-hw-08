
import { throttle } from 'lodash';

// пошук елементів на сторінці
const form = document.querySelector('feedback-form');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');
const LOCALSTORAGE_KEY = 'feedback-form-state'; // ключ для сховища

// додаємо слухача події input до форми
form.addEventListener(
    'input',
    throttle(e => {
        // обєкт з полями email і message, у яких зберігаються поточні значення полів форми
        const objectToSave = {email: email.value, message: message.value};

        // записування у локальне сховище обєкта з полями
        // JSON.stringify - коментування JS-значень у формат строки JSON 
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(objectToSave));
    }, 500) // оновлення сховища раз на 500 ms
);

// додаємо слухача подій submit до форми
form.addEventListener('submit', e => {

    e.preventDefault(); // відміна оновлення сторінки

    // перевірка чи заповнені всі поля форми
    if (email.value === '' || message.value === '') {
        return alert('Заповніть всі поля!');
    }

    // виведення у консоль обєкта з полями та їхніми поточними значеннями
    console.log({email: email.value, message: message.value});

    form.reset(); // очищення поля форми
    localStorage.removeItem(LOCALSTORAGE_KEY);   // очищення сховища
});

// метод load який буде абстрагувати повторюваний код перевірки помилок парса
const load = key => {
    try {
        const serializedState = localStorage.getItem(key); // ключ елемента сховища
    
        // якщо елемента немає - повернути undefined, інакше розпарсити елемент
        return serializedState === null ? undefined : JSON.parse(serializedState);
    }   catch (error) {
        // в разі помилки повернути повідомлення
        console.error('Get state error: ', error.message);
    }
};

// присвоення ключа до сховища через метод load
const storageDate = load(LOCALSTORAGE_KEY);

// перевірка стану сховища
// якщо в сховищі є збережені дані - заповнити ними поля форми 
if (storageDate) {
    email.value = storageDate.email;
    message.value = storageDate.message;
} // в іншому випадку поля будуть порожніми

