let soup_sum = 0;
let main_dish_sum = 0;
let drink_sum = 0;
let dessert_sum = 0;
let salad_sum = 0;  
let sum = 0;
let arr = null;
let soup = document.getElementById('soup_p');
let main_dish = document.getElementById('main_dish_p');
let drink = document.getElementById('drink_p');
let dessert = document.getElementById('dessert_p');
let salad = document.getElementById('salad_p');

prepare_page()

function pre_submit(){ /* Проверка зрения и адекватности клиента */
    let form = document.getElementsByTagName('form')[0]
        if (sum == 0){trigger_notification('Ничего не выбрано. Выберите блюда для заказа')} 
        else if (drink_sum == 0){trigger_notification('Выберите напиток')}
        else if (drink_sum != 0 && (soup_sum == 0 && main_dish_sum == 0)){trigger_notification('Выберите суп и/или главное блюдо')}
        else if (soup_sum != 0 && (main_dish_sum == 0 && salad_sum == 0)){trigger_notification('Выберите главное блюдо/салат/стартер')}
        else if (salad_sum != 0 && (soup_sum == 0 && main_dish_sum == 0)){trigger_notification('Выберите суп и/или главное блюдо')}
        else {
            if (form.checkValidity()){
                document.getElementsByTagName('form')[0].submit();
            }
            else {
                let inputs_htmlcollection = (document.getElementById('client-info')).getElementsByTagName('input');
                let inputs_arr = [].slice.call(inputs_htmlcollection);
                inputs_arr.forEach(input => {
                    if (input.required == true) {
                        input.reportValidity();
                    }
                })
            }
        }
}

function trigger_notification(text){ /* Уведомление о неадекватности */
    let notification = document.createElement("div")
    notification.id = "notification"
    notification.innerHTML = '<p>Это всплывающее уведомление</p><button id="notifbutton" id="closeNotification" onclick="close_notification()">Хорошо</button>'
    document.body.appendChild(notification)
    notification.getElementsByTagName('p')[0].innerHTML = text;
}

function close_notification(){
    let notif = document.getElementById('notification');
    notif.parentNode.removeChild(notif);
}

function select_dish(name, id, price, dish_name) { /* Считаем, насколько большой кошелёк */
    if (name == 'soup') {arr = soup_array}
    else if (name == 'main_dish') {arr = dishes_array}
    else if (name == 'drink') {arr = drinks_array}
    else if (name == 'salad') {arr = salads_array}
    else if (name == 'dessert') {arr = desserts_array}

    arr.forEach(el => {
        document.querySelector(`select[name='${el.category}'] option[value='${el.id}']`).removeAttribute('selected');
    });

    option = document.querySelector(`select[name='${name}'] option[value='${id}']`);
    option.setAttribute('selected', true);

    if (name == 'soup'){
        soup_sum = price;
        soup.innerHTML=`${dish_name} - ${price} рублей`;
    }
    else if (name == 'main_dish'){
        main_dish_sum = price;
        main_dish.innerHTML=`${dish_name} - ${price} рублей`;
    }
    else if (name == 'drink'){
        drink_sum = price;
        drink.innerHTML=`${dish_name} - ${price} рублей`;
    }
    else if (name == 'dessert'){
        dessert_sum = price;
        dessert.innerHTML=`${dish_name} - ${price} рублей`;
    }
    else if (name = 'salad'){
        salad_sum = price;
        salad.innerHTML=`${dish_name} - ${price} рублей`;
    }

    sum = soup_sum + main_dish_sum + drink_sum + dessert_sum + salad_sum;
    document.getElementById('order_h2').innerHTML = `Ваш заказ на сумму ${sum} рублей`;
}

window.onload = function() { /* Борьба за минимализм и пересмотр своих решений */
    let time_radio_buttons = document.getElementsByName('delivery-time-type');
    let del_time = document.getElementById('time-delivery-choice');
    let fast_button = time_radio_buttons[0].value == 1 ? time_radio_buttons[0] : time_radio_buttons[1];
    let time_required = document.getElementById('delivery-time');

    function check_as_fast() {
        if (fast_button.checked) {
            del_time.style.visibility = 'hidden';
            time_required.required = false;
        } else {
            del_time.style.visibility = 'visible';
            time_required.required = true;
        }
    }

    time_radio_buttons.forEach(radio => { /* Буп */
        radio.addEventListener('click', check_as_fast)
    });

    function reset_order() { /* Обнуление */
        soup_p.innerHTML = "--";
        main_dish_p.innerHTML = "--";
        drink_p.innerHTML = "--";
        dessert_p.innerHTML = "--";
        salad_p.innerHTML = "--";

        document.getElementById('order_h2').innerHTML = 'Корзина';
        document.getElementById('nothing_is_chosen').style.display = 'block';
        document.getElementById('order_inputs').style.display = 'none';

        arr = null;
        sum = 0;
        soup_sum = 0;
        main_dish_sum = 0;
        drink_sum = 0;
        dessert_sum = 0;
        salad_sum = 0;
    }
    let reset_button = document.getElementById('reset'); /* Обработчик */
    reset_button.addEventListener('click', reset_order);
}

function show_order_inp() { /* Не выбрано, но выбрано */
    let nothing = document.getElementById('nothing_is_chosen');
    let order_inps = document.getElementById('order_inputs');

    nothing.style.display = 'none';
    order_inps.style.display = 'block';
}