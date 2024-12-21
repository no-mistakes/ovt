import { bin } from "../scripts/order.js";

const notific = document.getElementById('notific');
const notific_text = document.getElementById('notific_text');
const notific_button = document.getElementById('notific_button');
const butElem = document.getElementById('submit_button');


export const notificFoo = (e) => {
  if (bin["soup"] == "1") {
    if (bin["main-course"] == "1") {
      if (bin["salad"] == "1") {
        if (bin["drink"] == "") {
          e.preventDefault();
          notific_text.innerHTML = 'Выберите напиток';
          notific.style.display = 'flex';
          return false;
        }
      } else {
        if(bin["drink"] == "") {
          e.preventDefault();
          notific_text.innerHTML = 'Выберите напиток';
          notific.style.display = 'flex';
          return false;
        }
      }
    } else {
      if (bin["salad"] == "1") {
        if (bin["drink"] == "") {
          e.preventDefault();
          notific_text.innerHTML = 'Выберите напиток';
          notific.style.display = 'flex';
          return false;
        }
      } else {
          e.preventDefault();
          notific_text.innerHTML = 'Выберите главное блюдо или салат/стартер';
          notific.style.display = 'flex';
          return false;
      }
    }
  }   
  else {
    if (bin["main-course"] == "1") {
      if (bin["salad"] == "1") {
        if (bin["drink"] == "") {
          e.preventDefault();
          notific_text.innerHTML = 'Выберите напиток';
          notific.style.display = 'flex';
          return false;
        }
      } else {
        if(bin["drink"] == "") {
          e.preventDefault();
          notific_text.innerHTML = 'Выберите напиток';
          notific.style.display = 'flex';
          return false;
        }
      }
    } else {
      if (bin["salad"] == "1") {
          e.preventDefault();
          notific_text.innerHTML = 'Выберите главное блюдо или суп';
          notific.style.display = 'flex';
          return false;
      } else {
        if(bin["drink"] == "") {
          e.preventDefault();
          notific_text.innerHTML = 'Ничего не выбрано';
          notific.style.display = 'flex';
          return false;
        } else {
          e.preventDefault();
          notific_text.innerHTML = 'Выберите главное блюдо';
          notific.style.display = 'flex';
          return false;
        }
      }
    }
  }
  return true;
}

notific_button.addEventListener('click', () => {
  notific.style.display = 'none';
})

