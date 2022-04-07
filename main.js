window.addEventListener('DOMContentLoaded', () => {

    // Создадим функцию для расчета координат X,Y для плитки
    function translateIntoTiles(lat, lon, zoom) {
        const a = 6378137; // большая полуось сфероида
        const k = 0.0818191908426; // пересчетный коэффициент


        // Переводим в радианы
        let xRad = lat * Math.PI / 180
        let yRad = lon * Math.PI / 180

        let f = Math.tan(Math.PI / 4 + xRad / 2) / Math.tan(Math.PI / 4 + Math.asin(k * Math.sin(xRad)) / 2) ** k;

        // Найдём координаты точки в плоскости проекции Земли
        let flatX = Math.floor((20037508.342789 + a * yRad) * 53.5865938 / Math.pow(2, 23 - zoom));
        let flatY = Math.floor((20037508.342789 - a * Math.log(f)) * 53.5865938 / Math.pow(2, 23 - zoom));

        // Получаем координаты X,Y для плитки
        let tilesX = Math.floor(flatX / 256);
        let tilesY = Math.floor(flatY / 256);

        // Точное решение для координат 55.750626, 37.597664 :
        // let tilesX = Math.floor(flatX / 256) - 1;
        // let tilesY = Math.floor(flatY / 256) - 1;


        return [tilesX, tilesY]
    }

    // Получим все необходимые элементы на странице
    const btn = document.querySelector('#btn'),
        latitude = document.querySelector('#latitude'),
        longitude = document.querySelector('#longitude'),
        x = document.querySelector('.x'),
        y = document.querySelector('.y'),
        tile = document.querySelector('.tile');


    // По клику на кнопку выведем координаты X, Y и заменим приходящую картинку:
    btn.addEventListener('click', () => {
        const [valueX, valueY] = translateIntoTiles(latitude.value, longitude.value, 19);
        x.innerText = valueX;
        y.innerText = valueY;
        tile.src = `https://core-carparks-renderer-lots.maps.yandex.net/maps-rdr-carparks/tiles?l=carparks&x=${valueX}&y=${valueY}&z=19&scale=1&lang=ru_RU`;
    });
});