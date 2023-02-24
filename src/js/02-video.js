
import Player  from '@vimeo/player';
import { throttle } from 'lodash';

// пошук елементів на сторінці iframe
const iframe = document.querySelector('iframe');

// створення екземпляра
const player = new Player(iframe);

// відстеження подій timeupdate  - оновлення часу відтворення
player.on('timeupdate', throttle(e => {

    //збереження часу відтворення у локальне сховище
    localStorage.setItem('videoplayer-current-time', e.seconds);
    }, 1000)    // час відтворення оновлюється у сховищі не частіше, ніж раз на секунду
);

//відновлення відтворення зі збереженої позиції під час перзавантаження сторінки
// якщо пустий localStorage - getItem повертає null  Засетиться 0
player.setCurrentTime(localStorage.getItem('videoplayer-current-time') || 0);