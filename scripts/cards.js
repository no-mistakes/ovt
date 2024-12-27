export const loadDishes = async () => {
  try {
    let response = await fetch('https://edu.std-900.ist.mospolytech.ru/labs/api/dishes');
    let menu = await response.json();
    return menu;
  } catch (e) {
    alert(e);
  }
}

const api_key = '50a0367a-50c3-4b25-8fe0-966d4442fdd9';

export const loadServer = async (params) => {
  try {
    const formData = new FormData();
    formData.append('full_name', params.full_name);
    formData.append('email', params.email);
    formData.append('phone', params.phone);
    formData.append('delivery_address', params.delivery_address);
    formData.append('delivery_type', params.delivery_type);
    formData.append('delivery_time', params.delivery_time);
    formData.append('comment', params.comment);
    formData.append('soup_id', params.soup_id);
    formData.append('main_course_id', params.main_course_id);
    formData.append('salad_id', params.salad_id);
    formData.append('drink_id', params.drink_id);
    formData.append('dessert_id', params.dessert_id);

    let response = await fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders?api_key=${api_key}`, {
      method: "POST",
      body: formData, 
    });
    const ans = await response.json();
    if(response.status == 422) {
      throw new Error(ans.error);
    }
    localStorage.clear();
    return ans;
  }
  catch (e) {
    alert(e);
  }
};

export const loadOrders = async () => {
  try{
    let response = await fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders?api_key=${api_key}`)
    let orders = await response.json();
    return orders;
  } catch (e) {
    alert(e);
  }
};
