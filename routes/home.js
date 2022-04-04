const router = require('express').Router();

router.get('/', (req, res)=>{
    res.send('WELCOME TO HOME PAGE');
});

module.exports = router;