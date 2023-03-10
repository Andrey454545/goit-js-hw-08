import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

//встановити саму бібліотеку simplelightbox через npm (npm install simplelightbox)

// пошук елементів у галереї,
// а галереї на сторонці
// . по класу
const gallery = document.querySelector('.gallery');

// створ. постий масив і туди додавати елементи
const items = [];

// перебирання масиву обєктів з файлу ./gallery-items
galleryItems.forEach((element) => {

    // створення тегу посилання
    // Створює елемент з імям "а" і повертає 
    // посилання на него, як результат свого виконання
    const galleryLink = document.createElement('a');
    // додавання класу до посилання
    galleryLink.classList.add('gallery__link');
    // додавання поточного посилання з властивості обекта ./gallery-items.js
    galleryLink.href = element.original;

    // створення тегу зображення
    // створення елемента з імям img повертає посилання 
    const galleryImage = document.createElement('img');

    // додавання класа до тега
    galleryImage.classList.add('gallery__image'); 
    // додавання малого зображення з властивості обекта ./gallery-items.js
    galleryImage.src = element.preview;

    // додавання атрибуту title з властивості обекта ./gallery-items.js
    galleryImage.setAttribute("title", element.description);

    // додавання тектсу для alt з властивості обекта ./gallery-items.js
    galleryImage.alt = element.description;

    galleryLink.append(galleryImage);     // вставлення зображення в посилання 
    items.push(galleryLink);               // вставлення посилання в масив елементів
});

// додавання створених елементів в галерею через розпилення
gallery.append(...items);

// додавання затримки для опису зображення
new SimpleLightbox('.gallery a', {
    captionDelay: 250,
});

