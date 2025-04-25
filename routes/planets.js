const express = require('express');
const router = express.Router();
const axios = require('axios');




/* GET users listing. */
router.get('/', async (req, res) =>{
    const response = await axios.get('https://sw-api.starnavi.io/planets/');
    const planets = response.data.results;
    res.render('planets', { planets });
});

router.get('/:id', async (req, res) =>{
    const response = await axios.get(`https://sw-api.starnavi.io/planets/${req.params.id}/`);
    const planet = response.data;
    res.render('planet', { planet });
})


module.exports = router;
