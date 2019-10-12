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
  
  // 
  const youtuberCall = () => {
    const qw = [3840, 2560, 1920, 1280, 854, 640, 426, 256];
    const qh = [2160, 1440, 1080, 720, 480, 360, 240, 144];

    const sizeVideo = () => {
      let ww = document.documentElement.clientWidth;
      let wh = document.documentElement.clientHeight;

      for (let i = 0; i < qw.length; i++) {
        if (ww > qw[i]) {
          youtuberContainer.querySelector('iframe').style.cssText = `
            width: ${qw[i]}px;
            height: ${qh[i]}px;
          `;

          youtuberContainer.style.cssText = `
            width: ${qw[i]}px;
            height: ${qh[i]}px;
            top: ${(wh - qh[i]) / 2}px;
            left: ${(ww - qw[i]) / 2}px;
          `;
          break;
        }
      }
    }

    const youtuberItems = document.querySelectorAll('[data-youtuber]');
    const youtuberModal = document.querySelector('.youTuberModal');
    const youtuberContainer = document.getElementById('youtuberContainer');

    youtuberItems.forEach(elem => {
      elem.addEventListener('click', () => {
        const idVideo = elem.dataset.youtuber;
        youtuberModal.style.display = 'block'

        const youtuberFrame = document.createElement('iframe');
        youtuberFrame.src = `https://youtube.com/embed/${idVideo}`;
        youtuberContainer.insertAdjacentElement('beforeend', youtuberFrame);

        window.addEventListener('resize', sizeVideo);

        sizeVideo();
      })
    })

    youtuberModal.addEventListener('click', () => {
      youtuberModal.style.display = '';
      youtuberContainer.textContent = '';
      window.removeEventListener('resize', sizeVideo);
    })
  }
  
  // модальное окно
  {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="youTuberModal">
        <div id="youtuberClose">&#215;</div>
        <div id="youtuberContainer"></div>
      </div>
    `);
    
    youtuberCall();
  }
    
  // API
  {
    const API_KEY = API_KEY;
    const CLIENT_ID = CLIENT_ID;
    const LIKES_ID = LIKES_ID;
 
    // авторизация
    {
      
      const buttonAuth = document.getElementById('authorize');
      const blockAuth = document.querySelector('.auth');
      
      gapi.load("client:auth2", () => gapi.auth2.init({client_id: CLIENT_ID}) ); 
      
      const authenticate = () => gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
        .then(() => { console.log("Sign-in successful"); })
        .catch((err) => errorAuth);
      
      const loadClient = () => {
        gapi.client.setApiKey(API_KEY);
        return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
          .then(() => { console.log("GAPI client loaded for API"); })
          .then(() => blockAuth.style.display = 'none')
          .catch((err) => errorAuth);
      }
      
      buttonAuth.addEventListener('click', () => {
        authenticate().then(loadClient);
      });
      
      const errorAuth = (error) => {
        console.error(error);
        blockAuth.style.display = '';
      };
    }
    
    // request
    {
      const gloTube = document.querySelector('.logo-academy');
      const trends = document.getElementById('yt_trend');
      const likes = document.getElementById('like');
      const main = document.getElementById('main');
      const subscriptions = document.getElementById('subscriptions');
      const searchForm = document.querySelector('.search-form');
      
      const request = (options) => gapi.client.youtube[options.method]
        .list(options)
        .then((response) => response.result.items)
        .then(data => options.method === 'subscriptions' ? renderSub(data) : render(data))
        .catch((error) => console.log(error));
        
      const render = (data) => {
        const youtubeWrapper = document.getElementById('yt-wrapper');
        
        youtubeWrapper.textContent = '';
        data.forEach((item) => {
          try {
            const {
              id, 
              id:{videoId}, 
              snippet: {
                channelTitle, 
                title, 
                resourceId:{ videoId: snippetVideoId } = {}, 
                thumbnails:{ high: {url} },
              }
            } = item;
            youtubeWrapper.innerHTML += `
              <div class="yt" data-youtuber=${snippetVideoId || id || videoId}>
                <div class="yt-thumbnail" style="--aspect-ratio:16/9;">
                  <img src=${url} alt="thumbnail" class="yt-thumbnail__img">
                </div>
                <div class="yt-title">${title}</div>
                <div class="yt-channel">${channelTitle}</div>
              </div>
            `;
            console.log(container)
          } catch (error) {
            console.error(error);
          }
        });
        
        youtuberCall()
      };
      
      const renderSub = (data) => {
        const youtubeWrapper = document.getElementById('yt-wrapper');
        youtubeWrapper.textContent = '';
        
        data.forEach((item) => {
          try {
            const {
              snippet:{
                resourceId:{channelId}, 
                description, 
                title,
                thumbnails:{ high: {url} },
              }, 
            } = item;
            youtubeWrapper.innerHTML += `
              <div class="yt" data-youtuber=${channelId}>
                <div class="yt-thumbnail" style="--aspect-ratio:16/9;">
                  <img src=${url} alt="thumbnail" class="yt-thumbnail__img">
                </div>
                <div class="yt-title">${title}</div>
                <div class="yt-channel">${description}</div>
              </div>
            `;
          } catch (error) {
            console.error(error);
          }
        });
        youtubeWrapper.querySelectorAll('.yt').forEach((item) => {
          item.addEventListener('click', () => {
            request({
              method: 'search',
              part: 'snippet',
              channelId: item.dataset.youtuber,
              order: 'date',
              maxResults: 6,
            })
          })
        })
      };
      
      gloTube.addEventListener('click', () => {
        request({
          method: 'search',
          part: 'snippet',
          channelId: 'UCVswRUcKC-M35RzgPRv8qUg',
          order: 'date',
          maxResults: 6,
        })
      });
      
      trends.addEventListener('click', () => {
        request({
          method: 'videos',
          part: 'snippet',
          chart: 'mostPopular',
          maxResults: 6,
          regionCode: 'RU',
        })
      });
      
      likes.addEventListener('click', () => {
        request({
          method: 'playlistItems',
          part: 'snippet',
          playlistId: LIKES_ID,
          maxResults: 6,
        })
      });
      
      main.addEventListener('click', () => {
        request({
          method: 'playlists',
          part: 'snippet',
          maxResults: 6,
          mine: true
        })
      });
      
      subscriptions.addEventListener('click', () => {
        request({
          method: 'subscriptions',
          part: 'snippet',
          mine: true,
          maxResults: 6,
        })
      });
      
      searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const valueInput = searchForm.elements[0].value;
        
        if(!valueInput) {
          searchForm.style.border = '1px solid tomato' 
          return
        };
        
        searchForm.style.border = ''; 
        
        request({
          method: 'search',
          part: 'snippet',
          order: 'relevance',
          maxResults: 6,
          q: valueInput,          
        })
                
        searchForm.elements[0].value = '';
      })
    }
  }
})