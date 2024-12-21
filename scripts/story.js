const api_key = '50a0367a-50c3-4b25-8fe0-966d4442fdd9';

// Функция для загрузки заказов
const loadOrders = async () => {
  try {
    let response = await fetch('https://edu.std-900.ist.mospolytech.ru/labs/api/orders?api_key=' + api_key);
    let orders = await response.json();
    const ordersList = document.getElementById('orders-list');
    ordersList.innerHTML = '';  // Очищаем список перед добавлением новых элементов

    orders.forEach((order, index) => {
      const items = order.items && Array.isArray(order.items) ? order.items.join(', ') : 'Нет информации о составе';
      
      const orderElement = document.createElement('li');
      orderElement.classList.add('list-group-item');
      orderElement.innerHTML = `
        <strong>Заказ №${index + 1}</strong>
        <br>Дата оформления: ${order.date || 'Не указано'}
        <br>Состав: ${items}
        <br>Стоимость: ${order.total_price || 'Не указана'} ₽
        <br>Время доставки: ${order.delivery_time || 'Как можно скорее (с 7:00 до 23:00)'}
        <br>
        <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#orderDetailsModal" onclick="viewOrderDetails(${order.id})">Подробнее</button>
        <button class="btn btn-warning btn-sm" data-toggle="modal" data-target="#orderEditModal" onclick="editOrder(${order.id})">Редактировать</button>
        <button class="btn btn-danger btn-sm" data-toggle="modal" data-target="#orderDeleteModal" onclick="deleteOrder(${order.id})">Удалить</button>
      `;
      ordersList.appendChild(orderElement);
    });
  } catch (e) {
    alert('Ошибка при загрузке заказов: ' + e);
  }
};

// Функция для отображения деталей заказа
const viewOrderDetails = async (orderId) => {
  try {
    let response = await fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders/${orderId}?api_key=${api_key}`);
    let order = await response.json();

    // Заполнение содержимого модального окна с деталями
    const orderDetailsContent = document.getElementById('order-details-content');
    orderDetailsContent.innerHTML = `
      <p><strong>ФИО:</strong> ${order.full_name || 'Не указано'}</p>
      <p><strong>Email:</strong> ${order.email || 'Не указано'}</p>
      <p><strong>Телефон:</strong> ${order.phone || 'Не указано'}</p>
      <p><strong>Адрес доставки:</strong> ${order.delivery_address || 'Не указан'}</p>
      <p><strong>Время доставки:</strong> ${order.delivery_time || 'Не указано'}</p>
      <p><strong>Комментарий:</strong> ${order.comment || 'Не указан'}</p>
      <p><strong>Состав заказа:</strong> ${order.items ? order.items.join(', ') : 'Нет состава'}</p>
      <p><strong>Стоимость:</strong> ${order.total_price || 'Не указана'} ₽</p>
    `;
  } catch (e) {
    alert('Ошибка при загрузке деталей заказа: ' + e);
  }
};

// Функция для редактирования заказа
const editOrder = (orderId) => {
  const order = getOrderById(orderId);  // Получаем заказ по ID (заменить реальной логикой)

  // Заполнение формы редактирования данными из заказа
  document.getElementById('full_name').value = order.full_name;
  document.getElementById('email').value = order.email;
  document.getElementById('phone').value = order.phone;
  document.getElementById('delivery_address').value = order.delivery_address;
  document.getElementById('delivery_time').value = order.delivery_time;
  document.getElementById('comment').value = order.comment;

  // Сохраняем ID заказа, чтобы потом отправить изменения
  window.currentOrderId = orderId;
};

// Функция для сохранения изменений в заказе
const saveOrder = () => {
  const orderId = window.currentOrderId;
  const updatedOrder = {
    full_name: document.getElementById('full_name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    delivery_address: document.getElementById('delivery_address').value,
    delivery_time: document.getElementById('delivery_time').value,
    comment: document.getElementById('comment').value
  };

  // Отправка запроса на сервер для обновления данных заказа
  fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders/${orderId}?api_key=${api_key}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedOrder)
  })
  .then(response => response.json())
  .then(data => {
    alert('Заказ успешно обновлен!');
    loadOrders();  // Перезагружаем список заказов
    $('#orderEditModal').modal('hide');  // Закрываем модальное окно
  })
  .catch(error => {
    alert('Ошибка при обновлении заказа: ' + error);
  });
};

// Функция для удаления заказа
const deleteOrder = (orderId) => {
  // Подтверждение удаления
  if (confirm('Вы уверены, что хотите удалить этот заказ?')) {
    fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders/${orderId}?api_key=${api_key}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      alert('Заказ успешно удален!');
      loadOrders();  // Перезагружаем список заказов
    })
    .catch(error => {
      alert('Ошибка при удалении заказа: ' + error);
    });
  }
};

// Загрузка заказов при загрузке страницы
document.addEventListener('DOMContentLoaded', loadOrders);
