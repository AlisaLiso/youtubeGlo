'use strict';
document.addEventListener('DOMContentLoaded', () => {
  // экранная клавиатура
  {
    const keyboardButton = document.querySelector('.search-form__keyboard');
    const keyboard = document.querySelector('.keyboard');
    const keyboardClose = document.getElementById('close-keyboard');
    const searchInput = document.querySelector('.search-form__input');

    const toggleKeyboard = () => keyboard.style.top = keyboard.style.top ? '' : '50%';

    const typing = (event) => {
      const target = event.target;

      if (target.tagName.toLowerCase() === 'button') {
        
        if (target.id === 'keyboard-backspace') {
          searchInput.value = searchInput.value.slice(0, searchInput.value.length - 1);
        } else if (target.textContent.trim() === '') {
          searchInput.value += ' ';
        } else {
          searchInput.value += target.textContent.trim();
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