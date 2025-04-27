const express = require('express');
const router = express.Router();
const axios = require('axios');




/* GET users listing. */
router.get('/', async (req, res) =>{
    const response = await axios.get('https://sw-api.starnavi.io/planets/');
    const planets = response.data.results;
    res.render('planets', { planets, title: 'Главная страница' });
});

router.get('/:id', async (req, res, next) => {
    try {
        const response = await axios.get(`https://sw-api.starnavi.io/people/?homeworld=${req.params.id}`);
        const people = response.data.results;
        res.render('planet', { people, title: `People from ${req.params.id}`  });

    } catch (error) {
        next(error); // передаём ошибку дальше, Express сам её обработает
    }
});

router.get('/people/:name', async (req, res, next) => {
    try {
        // Отправляем запрос, используя имя персонажа
        const response = await axios.get(`https://sw-api.starnavi.io/people/?name=${req.params.name}`);
        const pers = response.data.results;  // Извлекаем результаты

        // Маппинг имен персонажей к изображениям
        const characterImages = {
            "Luke Skywalker": "luke-skywalker.jpg",
            "Darth Vader": "darth-vader.jpg",
            "Han Solo": "han-solo.jpg",
            // добавь остальные персонажи
        };

        // Добавляем картинку в данные персонажа
        const personWithImage = pers.map(person => {
            return {
                ...person,
                image: characterImages[person.name] || "default-image.jpg"
            };
        });
        res.render('pers', { pers: personWithImage, title: `Person: ${req.params.name}` });
    } catch (error) {
        next(error);
    }
});


module.exports = router;
