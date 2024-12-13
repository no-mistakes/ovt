function load_soup_blocks(filter = null){ /* Все супы */

    let filter_button = document.querySelector(`div[id='soup-filters'] button[id='active']`)
    if (filter_button){ //Отмена фильтра
        if (filter_button.getAttribute('data-kind') == filter){
            filter = null;
            filter_button.removeAttribute('id');
        }
    }

    if (filter){ //Замена фильтра
        let filter_block = document.getElementById('soup-filters');
        let active_filter = filter_block.querySelector(`button[id='active']`)
        if (active_filter){active_filter.removeAttribute('id');}
        let chosen_filter = filter_block.querySelector(`button[data-kind=${filter}]`);
        chosen_filter.setAttribute('id', 'active');
    }

    let soup_block = document.getElementById('soup') //Готовка
    let soup_select_block = document.querySelector(`select[name="soup"]`);
    let div_blocks = '' //Подготовка
    let select_block = '<option value="" selected disabled hidden>--</option>'
    soup_array.forEach(dish => { //Просмотр
        if (dish.kind == filter || !filter){ 
        div_blocks += /* Карточка */ ` 
                        <div onclick="select_dish('${dish.category}', ${dish.id}, ${dish.price}, '${dish.name}'); show_order_inp()" data-dish="${dish.keyword}">
                        <img src="${dish.image}" alt="soup">
                        <p class="price">${dish.price} рублей</p>
                        <p class="name">${dish.name}</p>
                        <p class="mass">${dish.count}</p>
                        <button>Добавить</button>
                        </div>
        `}
        select_block += `<option value=${dish.id}>${dish.name} ${dish.price} рублей</option>`
    });

    if (!filter){soup_select_block.innerHTML = select_block}; //Нет фильтра
    soup_block.innerHTML = `
        <h2>Выберите суп</h2>
        <div name='food_block'>
        ${div_blocks}
        </div>
    `
}

function load_main_dish_blocks(filter = null){ /* Все основные блюда */

    let filter_button = document.querySelector(`div[id='dish-filters'] button[id='active']`)
    if (filter_button){
        if (filter_button.getAttribute('data-kind') == filter){
            filter = null;
            filter_button.removeAttribute('id');
        }
    }

    if (filter){
        let filter_block = document.getElementById('dish-filters');
        let active_filter = filter_block.querySelector(`button[id='active']`)
        if (active_filter){active_filter.removeAttribute('id');}
        let chosen_filter = filter_block.querySelector(`button[data-kind=${filter}]`);
        chosen_filter.setAttribute('id', 'active');

    }

    let main_dish_block = document.getElementById('main_dish')
    let main_dish_select_block = document.querySelector(`select[name="main_dish"]`);
    let div_blocks = ''
    let select_block = '<option value="" selected disabled hidden>--</option>'
    dishes_array.forEach(dish => {
        if (dish.kind == filter || !filter){
        div_blocks += `
                        <div onclick="select_dish('${dish.category}', ${dish.id}, ${dish.price}, '${dish.name}'); show_order_inp()" data-dish="${dish.keyword}">
                        <img src="${dish.image}" alt="soup">
                        <p class="price">${dish.price} рублей</p>
                        <p class="name">${dish.name}</p>
                        <p class="mass">${dish.count}</p>
                        <button>Добавить</button>
                        </div>
        `}
        select_block += `<option value=${dish.id}>${dish.name} ${dish.price} рублей</option>`
    });

    if (!filter){main_dish_select_block.innerHTML = select_block};
    main_dish_block.innerHTML = `
        <h2>Выберите главное блюдо</h2>
        <div name='food_block'>
        ${div_blocks}
        </div>
    `
}

function load_salads(filter = null){ /* Все салаты */

    let filter_button = document.querySelector(`div[id='salad-filters'] button[id='active']`)
    if (filter_button){
        if (filter_button.getAttribute('data-kind') == filter){
            filter = null;
            filter_button.removeAttribute('id');
        }
    }

    if (filter){
        let filter_block = document.getElementById('salad-filters');
        let active_filter = filter_block.querySelector(`button[id='active']`)
        if (active_filter){active_filter.removeAttribute('id');}
        let chosen_filter = filter_block.querySelector(`button[data-kind=${filter}]`);
        chosen_filter.setAttribute('id', 'active');

    }

    let salad_block = document.getElementById('salad')
    let salad_select_block = document.querySelector(`select[name="salad"]`);
    let div_blocks = ''
    let select_block = '<option value="" selected disabled hidden>--</option>'
    salads_array.forEach(dish => {
        if (dish.kind == filter || !filter){
        div_blocks += `
                        <div onclick="select_dish('${dish.category}', ${dish.id}, ${dish.price}, '${dish.name}'); show_order_inp()" data-dish="${dish.keyword}">
                        <img src="${dish.image}" alt="soup">
                        <p class="price">${dish.price} рублей</p>
                        <p class="name">${dish.name}</p>
                        <p class="mass">${dish.count}</p>
                        <button>Добавить</button>
                        </div>
        `}
        select_block += `<option value=${dish.id}>${dish.name} ${dish.price} рублей</option>`
    });

    if (!filter){salad_select_block.innerHTML = select_block};
    salad_block.innerHTML = `
        <h2>Выберите салат/стартер</h2>
        <div name='food_block'>
        ${div_blocks}
        </div>
    `
}

function load_beverages_blocks(filter = null){ /* Все напитки */

    let filter_button = document.querySelector(`div[id='drink-filters'] button[id='active']`)
    if (filter_button){
        if (filter_button.getAttribute('data-kind') == filter){
            filter = null;
            filter_button.removeAttribute('id');
        }
    }

    if (filter){
        let filter_block = document.getElementById('drink-filters');
        let active_filter = filter_block.querySelector(`button[id='active']`)
        if (active_filter){active_filter.removeAttribute('id');}
        let chosen_filter = filter_block.querySelector(`button[data-kind=${filter}]`);
        chosen_filter.setAttribute('id', 'active');

    }

    let drink_block = document.getElementById('drink')
    let drink_select_block = document.querySelector(`select[name="drink"]`);
    let div_blocks = ''
    let select_block = '<option value="" selected disabled hidden>--</option>'
    drinks_array.forEach(dish => {
        if (dish.kind == filter || !filter){
        div_blocks += `
                        <div onclick="select_dish('${dish.category}', ${dish.id}, ${dish.price}, '${dish.name}'); show_order_inp()" data-dish="${dish.keyword}">
                        <img src="${dish.image}" alt="soup">
                        <p class="price">${dish.price} рублей</p>
                        <p class="name">${dish.name}</p>
                        <p class="mass">${dish.count}</p>
                        <button>Добавить</button>
                        </div>
        `}
        select_block += `<option value=${dish.id}>${dish.name} ${dish.price} рублей</option>`
    });

    drink_select_block.innerHTML = select_block
    drink_block.innerHTML = `
        <h2>Выберите напиток</h2>
        <div name='food_block'>
        ${div_blocks}
        </div>
    `
}

function load_desserts(filter = null){ /* Все десерты */

    let filter_button = document.querySelector(`div[id='dessert-filters'] button[id='active']`)
    if (filter_button){
        if (filter_button.getAttribute('data-kind') == filter){
            filter = null;
            filter_button.removeAttribute('id');
        }
    }

    if (filter){
        let filter_block = document.getElementById('dessert-filters');
        let active_filter = filter_block.querySelector(`button[id='active']`)
        if (active_filter){active_filter.removeAttribute('id');}
        let chosen_filter = filter_block.querySelector(`button[data-kind=${filter}]`);
        chosen_filter.setAttribute('id', 'active');

    }

    let dessert_block = document.getElementById('dessert')
    let dessert_select_block = document.querySelector(`select[name="dessert"]`);
    let div_blocks = ''
    let select_block = '<option value="" selected disabled hidden>--</option>'
    desserts_array.forEach(dish => {
        if (dish.kind == filter || !filter){
        div_blocks += `
                        <div onclick="select_dish('${dish.category}', ${dish.id}, ${dish.price}, '${dish.name}'); show_order_inp()" data-dish="${dish.keyword}">
                        <img src="${dish.image}" alt="soup">
                        <p class="price">${dish.price} рублей</p>
                        <p class="name">${dish.name}</p>
                        <p class="mass">${dish.count}</p>
                        <button>Добавить</button>
                        </div>
        `}
        select_block += `<option value=${dish.id}>${dish.name} ${dish.price} рублей</option>`
    });
    
    if (!filter){dessert_select_block.innerHTML = select_block};
    dessert_block.innerHTML = `
        <h2>Выберите десерт</h2>
        <div name='food_block'>
        ${div_blocks}
        </div>
    `

}

function load_all_blocks(){ /* Всё грузим */
    load_soup_blocks();
    load_main_dish_blocks();
    load_salads();
    load_beverages_blocks();
    load_desserts();
}