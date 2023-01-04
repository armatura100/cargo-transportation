import * as flsFunctions from './modules/functions.js';
flsFunctions.isWebp();

import { langsArr } from './modules/languages.js';
const allLangs = ['ru', 'en', 'fr'];
const langElements = document.querySelectorAll('.languages__link');

langElements.forEach(el => {
    el.addEventListener('click', () => {
        const langValue = el.dataset.lang;
        location = window.location.pathname + '#' + langValue;
        location.reload();
    });
});

function changeLanguage() {
    let hash = location.hash;
    hash = hash.substring(1);

    if (hash === '') {
        document.querySelector(`.languages__link[data-lang="ru"]`).classList.add('active');
    } else {
        if (!allLangs.includes(hash)) {
            location = window.location.pathname + '#ru';
            location.reload();
        }

        document.documentElement.lang = hash;
        document.querySelector('title').innerText = langsArr.pageTitle[hash];
        for (let key in langsArr) {
            const elements = document.querySelectorAll(`[data-lang-${key}]`);
            if (elements.length > 0) {
                elements.forEach(el => {
                    el.innerText = langsArr[key][hash];
                })
            }
        }
        document.querySelector(`.languages__link[data-lang="${hash}"]`).classList.add('active');
    }
}

changeLanguage();

// showcase slider
import Swiper, { Navigation, EffectFade, Autoplay } from 'swiper';
const showcaseSlider = new Swiper('.showcase__slider', {
    modules: [Navigation, EffectFade, Autoplay],
    navigation: {
        nextEl: '.showcase__slider .swiper-button-next',
        prevEl: '.showcase__slider .swiper-button-prev',
    },
    speed: 500,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    autoplay: true,
    loop: true,
    autoHeight: true
})

// header and scrolls
const header = document.querySelector('.header');

const checkScroll = () => {
    let scrollPos = window.scrollY;
    if (scrollPos > 50) {
        header.classList.add('scrolled');
        document.body.style.setProperty('--header-pad', '70px')
    } else {
        header.classList.remove('scrolled');
        document.body.style.setProperty('--header-pad', '145px')
    }
}

window.addEventListener('scroll', checkScroll);
document.addEventListener('DOMContentLoaded', checkScroll);

// burger menu
const menuBtn = document.querySelector('.menu__button');
const menuList = document.querySelector('.menu__list');
const menuLinks = document.querySelectorAll('.menu__link');
const body = document.body;

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    menuList.classList.toggle('active');
    body.classList.toggle('lock');
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        menuList.classList.remove('active');
        body.classList.remove('lock');
    });
});

// append header items that don't fit into header to the burger menu
const headerLocation = document.querySelector('.header__location-link');
const appendedListItem = `
    <li class="menu__item">
        <a class="menu__link" href="${headerLocation.getAttribute('href')}">
            ${headerLocation.innerText}
        </a>
    </li>
`;
if (window.matchMedia('(max-width: 26.25rem)').matches) {
    menuList.insertAdjacentHTML('beforeend', appendedListItem);
}

// animate on scroll
const animatableItems = document.querySelectorAll('[data-animatable]');
const onScrollObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('animated');
        onScrollObserver.unobserve(entry.target);
    });
}, { rootMargin: '0px 0px -100px 0px' });

animatableItems.forEach(item => onScrollObserver.observe(item));