function prepare_page() {
    const url = 'http://edu.std-900.ist.mospolytech.ru/labs/api/dishes';
    const req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = 'json';
    
    req.onload = () => {
        if (req.status === 200) {
            load_arrays(req.response);
        } else {
            console.error('Ошибка запроса:', req.statusText);
        }
    };

    req.onerror = () => {
        console.error('Ошибка сети');
    };

    req.send();
}