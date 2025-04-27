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
        const people = response.data.results; // Убедись что тут results или что именно приходит
        res.render('planet', { people, title: `People from ${req.params.id}`  });

    } catch (error) {
        next(error); // передаём ошибку дальше, Express сам её обработает
    }
});


module.exports = router;
