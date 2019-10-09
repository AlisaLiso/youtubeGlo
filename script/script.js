'use strict';
document.addEventListener('DOMContentLoaded', () => {
  // экранная клавиатура
  {
    const keyboardButton = document.querySelector('.search-form__keyboard');
    const keyboard = document.querySelector('.keyboard');
    const keyboardClose = document.getElementById('close-keyboard');
    const searchInput = document.querySelector('.search-form__input');

    const toggleKeyboard = () => keyboard.style.top = keyboard.style.top ? '' : '50%';

    const changeLang = (buttons, lang) => {
      const langRu = ['ё', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
        'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
        'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э',
        'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.',
        'en', ' '
      ];
      const langEn = ['`', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
        'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"',
        'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/',
        'ru', ' '
      ];
      if (lang === 'en') {
        buttons.forEach((btn, index) => {
          btn.textContent = langEn[index];
        })
      } else {
        buttons.forEach((btn, index) => {
          btn.textContent = langRu[index];
        })
      }
    }

    const typing = (event) => {
      const target = event.target;

      if (target.tagName.toLowerCase() === 'button') {
        const targetTrim = target.textContent.trim();
        const buttons = [...keyboard.querySelectorAll('button')].filter(elem => elem.style.visibility !== 'hidden');

        if (target.id === 'keyboard-backspace') {
          searchInput.value = searchInput.value.slice(0, -1);
        } else if (!targetTrim) {
          searchInput.value += ' ';
        } else if (targetTrim === 'en' || 'ru') {
          changeLang(buttons, targetTrim)
        } else {
          searchInput.value += targetTrim;
        }
      }
    }

    keyboardButton.addEventListener('click', toggleKeyboard);
    keyboardClose.addEventListener('click', toggleKeyboard);
    keyboard.addEventListener('click', typing);
  }

  // меню
  {
    const burger = document.querySelector('.spinner');
    const sideBarMenu = document.querySelector('.sidebarMenu');

    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      sideBarMenu.classList.toggle('rollUp');
    })

    sideBarMenu.addEventListener('click', (event) => {
      let target = event.target;

      target = target.closest('a[href="#"]');

      if (target) {
        const parentTarget = target.parentNode;
        sideBarMenu.querySelectorAll('li').forEach((elem) => {
          if (elem === parentTarget) {
            elem.classList.add('active')
          } else {
            elem.classList.remove('active')
          }
        })
      }
    })

  }
})