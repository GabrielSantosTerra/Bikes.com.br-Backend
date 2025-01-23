const express = require('express');
const router = express.Router();

router.get('/message', (req, res) => {
    res.json({
        message: 'Bem-vindo ao Bikes.com!',
        status: 'success',
    });
});

module.exports = router;
