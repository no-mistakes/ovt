import { loadOrders, loadDishes } from "./cards.js";

let menu = await loadDishes();
let orders = await loadOrders();
orders.sort((a, b) => a.created_at < b.created_at ? 1 : -1);
console.log(orders);


let i = 1;
for (let el of orders) {
  let dishElem = document.createElement("tr");

  let num = document.createElement('td')
  num.innerHTML = i;
  dishElem.appendChild(num);

  let date = new Date (el.created_at);
  let dates = document.createElement('td');
  dates.innerHTML = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  dishElem.appendChild(dates);

  let content = document.createElement('td');
  let dishes = [];
  let summ = 0;
  for (let elem of menu) {
    if(elem.id == el.soup_id || elem.id == el.main_course_id || elem.id == el.salad_id || elem.id == el.drink_id || elem.id == el.dessert_id) {
      dishes.push(elem.name);
      summ += elem.price
    }
  }
  content.innerHTML = dishes.join(', ');
  content.style.textAlign = 'left';
  content.style.paddingLeft = '3rem';
  dishElem.appendChild(content);

  let price = document.createElement('td');
  price.innerHTML = summ + "&#8381";
  dishElem.appendChild(price);

  let time = document.createElement('td');
  if (el.delivery_type == "now") {
    time.innerHTML = "Как можно скорее (с 7:00 до 23:00)";
    dishElem.appendChild(time);
  }else {
    time.innerHTML = el.delivery_time.slice(0, 5);
    dishElem.appendChild(time);
  }

  let action = document.createElement('td');
  action.classList.add('action')

  let button1 = document.createElement('button');
  button1.classList.add('see_order');
  let eye = document.createElement('img');
  eye.classList.add('action_img');
  eye.src = '../images/icons/eye.svg';
  button1.dataset.idi = el.id;
  button1.appendChild(eye);

  let button2 = document.createElement('button');
  button2.classList.add('edit_order');
  let pencil = document.createElement('img');
  pencil.classList.add('action_img');
  pencil.src = '../images/icons/pencil.svg';
  button2.dataset.idi = el.id;
  button2.appendChild(pencil);

  let button3 = document.createElement('button');
  button3.classList.add('del_order');
  button3.dataset.idi = el.id;
  let trash = document.createElement('img');
  trash.classList.add('action_img');
  trash.src = '../images/icons/trash3.svg';
  button3.appendChild(trash);

  action.appendChild(button1);
  action.appendChild(button2);
  action.appendChild(button3);
  dishElem.appendChild(action);

  let parent = document.getElementById('order_history');
  parent.appendChild(dishElem);
  i++;
}

// кнопка Удалить
const delOrder = document.getElementsByClassName('del_order');
const modalBackDel = document.getElementsByClassName('modalBack')[0];
const yesBut = document.getElementById('yes');
for (const el of delOrder) {
  el.addEventListener('click', () => {
    modalBackDel.style.display = 'block';
    yesBut.addEventListener('click', async () => {
      try {
        let responce = await fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders/${el.dataset.idi}?api_key=50a0367a-50c3-4b25-8fe0-966d4442fdd9`, {
          method: "DELETE"
        });
        modalBackDel.style.display = 'none';
        location.reload();
      } catch (e) {
        alert(e);
      }
      setTimeout(() => {alert("Заказ успешно удален")}, 0);
    })    
  })
}

for (const cancelBut of document.getElementsByClassName('cancel')) {
  cancelBut.addEventListener('click', () => {
    modalBackDel.style.display = 'none';
    modalBackEdit.style.display = 'none';
  })
}

//кнопка просмотра
const seeOrder = document.getElementsByClassName('see_order');
const modalBackSee = document.getElementsByClassName('modalBack')[1];
for (const el of seeOrder) {
  el.addEventListener('click', async () => {
    try {
      let responce = await fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders/${el.dataset.idi}?api_key=50a0367a-50c3-4b25-8fe0-966d4442fdd9`);
      let order = await responce.json();
      let date = new Date (order.created_at);
      document.getElementById('date').innerHTML = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
      document.getElementById('name').innerHTML = order.full_name;
      document.getElementById('address').innerHTML = order.delivery_address;
      if (order.delivery_type == "now") {
        document.getElementById('time').innerHTML = "Как можно скорее (с 7:00 до 23:00)";
      } else {
        document.getElementById('time').innerHTML = order.delivery_time.slice(0, 5);
      }
      document.getElementById('phone').innerHTML = order.phone;
      document.getElementById('email').innerHTML = order.email;
      document.getElementById('comment').innerHTML = order.comment;
      let summ = 0;
      for (let elem of menu) {
        if(elem.id == order.soup_id || elem.id == order.main_course_id || elem.id == order.salad_id || elem.id == order.drink_id || elem.id == order.dessert_id) {
          document.getElementById(`${elem.category}`).innerHTML = elem.name + ' (' + elem.price + '&#8381)';
          document.getElementById(`${elem.category}-name`).style.display = 'block';
          document.getElementById(`${elem.category}`).style.display = 'block';
          summ += elem.price;
        }
      }   
      document.getElementById('price').innerHTML = "Стоимость: " + summ + "&#8381";
      modalBackSee.style.display = 'block';
    } catch (e) {
      alert(e);
    }
  })
}

const okBut = document.getElementById('ok');
okBut.addEventListener('click', () => {
  modalBackSee.style.display = 'none';
  for (let elem of menu) {
    document.getElementById(`${elem.category}`).style.display = 'none';
    document.getElementById(`${elem.category}-name`).style.display = 'none';
  }
})

//кнопка редакатировать
const editOrder = document.getElementsByClassName('edit_order');
const modalBackEdit = document.getElementsByClassName('modalBack')[2];
for (const el of editOrder) {
  el.addEventListener('click', async () => {
    let responce = await fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders/${el.dataset.idi}?api_key=50a0367a-50c3-4b25-8fe0-966d4442fdd9`);
    let order = await responce.json();
    let date = new Date (order.created_at);
    document.getElementById('date-input').innerHTML = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    document.getElementById('name-input').value = order.full_name;
    document.getElementById('address-input').value = order.delivery_address;
    if (order.delivery_type == "now") {
      document.getElementById('time-input-const').innerHTML = "Как можно скорее (с 7:00 до 23:00)";
      document.getElementById('time-input').style.display = 'none';
      document.getElementById('time-input-const').style.display = 'block';
    } else {
      document.getElementById('time-input').value = order.delivery_time;
      document.getElementById('time-input-const').style.display = 'none';
      document.getElementById('time-input').style.display = 'block';
    }
    document.getElementById('phone-input').value = order.phone;
    document.getElementById('email-input').value = order.email;
    document.getElementById('comment-input').value = order.comment;
    let summ = 0;
    for (let elem of menu) {
      if(elem.id == order.soup_id || elem.id == order.main_course_id || elem.id == order.salad_id || elem.id == order.drink_id || elem.id == order.dessert_id) {
        document.getElementById(`${elem.category}-`).innerHTML = elem.name + ' (' + elem.price + '&#8381)';
        document.getElementById(`${elem.category}-dish`).style.display = 'block';
        document.getElementById(`${elem.category}-`).style.display = 'block';
        summ += elem.price;
      }
    }   
    document.getElementById('price-input').innerHTML = "Стоимость: " + summ + "&#8381";
    modalBackEdit.style.display = 'block';
    const saveBut = document.getElementById('save');
      saveBut.addEventListener('click', async() => {
      const data = {
        full_name: document.getElementById('name-input').value,
        email: document.getElementById('email-input').value,
        phone: document.getElementById('phone-input').value,
        delivery_address: document.getElementById('address-input').value,
        delivery_time: document.getElementById('time-input').value,
        comment: document.getElementById('comment-input').value,
      }
      try {
      const formData = new FormData();
      formData.append('full_name', data.full_name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('delivery_address', data.delivery_address);
      formData.append('delivery_time', data.delivery_time);
      formData.append('comment', data.comment);
      let response = await fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders/${el.dataset.idi}?api_key=50a0367a-50c3-4b25-8fe0-966d4442fdd9`, {
        method: "PUT",
        body: formData, 
      });
      const ans = await response.json();
        if(response.status == 422) {
          throw new Error(ans.error);
        }
      }catch (e) {
        alert(e);
      }
      modalBackEdit.style.display = 'none';
      setTimeout(() => {alert("Заказ успешно изменен")}, 0);
    })
  })  
}

// кнопка крестик
for (let butX of document.getElementsByClassName('x')){
  butX.addEventListener('click', () => {
    modalBackSee.style.display = 'none';
    modalBackDel.style.display = 'none';
    modalBackEdit.style.display = 'none';
    for (let elem of menu) {
      document.getElementById(`${elem.category}`).style.display = 'none';
      document.getElementById(`${elem.category}-name`).style.display = 'none';
      document.getElementById(`${elem.category}-dish`).style.display = 'none';
      document.getElementById(`${elem.category}-`).style.display = 'none';
    }
  })
}