let soup_array = [];
let dishes_array = [];
let drinks_array = [];
let salads_array = [];
let desserts_array = [];

function load_arrays(res){
    let i = -1
    for(let j = 0; j < res.length; j++){
        i += 1
        dish = res[j]
        dish['select_id'] = i


        // Печать для отладки
        console.log(dish.image);

        if (dish['category'] == 'drink'){drinks_array.push(dish);}
        else if (dish['category'] == 'soup'){soup_array.push(dish)}
        else if (dish['category'] == 'main-course'){dish['category'] = 'main_dish'; dishes_array.push(dish)}
        else if (dish['category'] == 'salad'){salads_array.push(dish)}
        else {desserts_array.push(dish)}
    }

    drinks_array.sort((a, b) => a.name.localeCompare(b.name));
    soup_array.sort((a, b) => a.name.localeCompare(b.name));
    dishes_array.sort((a, b) => a.name.localeCompare(b.name));
    salads_array.sort((a, b) => a.name.localeCompare(b.name));
    desserts_array.sort((a, b) => a.name.localeCompare(b.name));

    load_all_blocks()
}